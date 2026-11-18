'use client';
import { useEffect, useRef, useState } from 'react';
import { AudioLines, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import Scope, { type WaveShape } from './Scope';
import { useSiteSettings } from '@/components/LocaleThemeProvider';

export default function SignalLab({ paused }: { paused: boolean }) {
  const [frequency, setFrequency] = useState(3);
  const [gain, setGain] = useState(65);
  const [shape, setShape] = useState<WaveShape>('sine');
  const [frozen, setFrozen] = useState(false);
  const [sound, setSound] = useState(false);
  const [notice, setNotice] = useState('');
  const { locale } = useSiteSettings();
  const audio = useRef<{
    context: AudioContext;
    oscillator: OscillatorNode;
    gain: GainNode;
  } | null>(null);
  const hz = Math.round(80 + frequency * 40);
  useEffect(() => {
    const a = audio.current;
    if (a) {
      a.oscillator.frequency.setTargetAtTime(hz, a.context.currentTime, 0.05);
      a.oscillator.type = shape;
      a.gain.gain.setTargetAtTime((gain / 100) * 0.035, a.context.currentTime, 0.03);
    }
  }, [hz, shape, gain]);
  useEffect(() => {
    const stopWhenHidden = () => {
      if (!document.hidden) return;
      if (audio.current) {
        audio.current.oscillator.stop();
        void audio.current.context.close();
        audio.current = null;
      }
      setSound(false);
    };
    document.addEventListener('visibilitychange', stopWhenHidden);
    return () => {
      document.removeEventListener('visibilitychange', stopWhenHidden);
      if (audio.current) {
        audio.current.oscillator.stop();
        void audio.current.context.close();
        audio.current = null;
      }
    };
  }, []);
  async function toggleAudio() {
    if (audio.current) {
      audio.current.oscillator.stop();
      void audio.current.context.close();
      audio.current = null;
      setSound(false);
      return;
    }
    try {
      const context = new AudioContext();
      await context.resume();
      const oscillator = context.createOscillator(),
        volume = context.createGain();
      oscillator.type = shape;
      oscillator.frequency.value = hz;
      volume.gain.value = (gain / 100) * 0.035;
      oscillator.connect(volume);
      volume.connect(context.destination);
      oscillator.start();
      audio.current = { context, oscillator, gain: volume };
      setSound(true);
      setNotice('');
    } catch {
      setNotice(
        locale === 'es' ? 'El audio no está disponible en este navegador. La visualización sigue funcionando.' : 'Audio is not available in this browser. The visualization still works.',
      );
    }
  }
  function reset() {
    setFrequency(3);
    setGain(65);
    setShape('sine');
    setFrozen(false);
    if (audio.current) {
      audio.current.oscillator.stop();
      void audio.current.context.close();
      audio.current = null;
    }
    setSound(false);
    setNotice('');
  }
  return (
    <section id="sig-laboratorio" className="sig-section sig-lab">
      <div className="sig-section-top">
        <span>{locale === 'es' ? '06 / EXPERIMENTO ABIERTO' : '06 / OPEN EXPERIMENT'}</span>
        <span>{locale === 'es' ? 'NO TODO SE EXPLICA. ALGUNAS COSAS SE PRUEBAN.' : 'NOT EVERYTHING IS EXPLAINED. SOME THINGS ARE TESTED.'}</span>
      </div>
      <div className="sig-lab-layout">
        <div className="sig-lab-intro">
          <span className="sig-kicker">
            <AudioLines size={14} /> {locale === 'es' ? 'TOMA EL CONTROL' : 'TAKE CONTROL'}
          </span>
          <h2>
            {locale === 'es' ? 'HAZ UN POCO' : 'MAKE SOME'}
            <br />
            {locale === 'es' ? <>DE <em>RUIDO.</em></> : <><em>NOISE.</em></>}
          </h2>
          <p>
            {locale === 'es' ? 'De una fórmula a una señal. Cambia la frecuencia, transforma la onda y escucha lo que acabas de crear.' : 'From a formula to a signal. Change the frequency, shape the wave and listen to what you just created.'}
          </p>
          <div className="sig-lab-note">
            <span>↳</span>
            <p>
              {locale === 'es' ? 'Un experimento de código en tiempo real.' : 'A real-time code experiment.'}
              <br />
              {locale === 'es' ? 'Sin micrófono. Sin grabaciones.' : 'No microphone. No recordings.'}
            </p>
          </div>
        </div>
        <div className="sig-lab-machine">
          <div className="sig-machine-heading">
            <span>
              <i /> SIGNAL GENERATOR / DV–02
            </span>
            <button aria-label={locale === 'es' ? 'Restablecer sintetizador' : 'Reset synthesizer'} onClick={reset}>
              <RotateCcw size={15} />
            </button>
          </div>
          <div className="sig-lab-screen">
            <Scope
              compact
              frequency={frequency}
              gain={gain}
              shape={shape}
              paused={paused || frozen}
            />
            <span>
              {hz} Hz <small>TONO GENERADO</small>
            </span>
          </div>
          <div className="sig-wave-types" aria-label={locale === 'es' ? 'Forma de onda' : 'Waveform'}>
            {(
              [
                { id: 'sine', name: 'Senoidal', symbol: '∿' },
                { id: 'triangle', name: 'Triangular', symbol: '⋀' },
                { id: 'square', name: 'Cuadrada', symbol: '⊓' },
              ] as const
            ).map((item) => (
              <button
                aria-pressed={shape === item.id}
                key={item.id}
                onClick={() => setShape(item.id)}
              >
              <b>{item.symbol}</b>
                {locale === 'en' ? item.id === 'sine' ? 'Sine' : item.id === 'triangle' ? 'Triangle' : 'Square' : item.name}
              </button>
            ))}
          </div>
          <div className="sig-sliders">
            <label>
              <span>
                {locale === 'es' ? 'FRECUENCIA' : 'FREQUENCY'} <output>{hz} Hz</output>
              </span>
              <input
                type="range"
                min="1"
                max="8"
                step=".1"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
              />
            </label>
            <label>
              <span>
                {locale === 'es' ? 'AMPLITUD' : 'AMPLITUDE'} <output>{gain}%</output>
              </span>
              <input
                type="range"
                min="10"
                max="100"
                value={gain}
                onChange={(e) => setGain(Number(e.target.value))}
              />
            </label>
          </div>
          <div className="sig-lab-actions">
            <button aria-pressed={sound} onClick={toggleAudio}>
              {sound ? <VolumeX size={15} /> : <Volume2 size={15} />}{' '}
              {sound ? (locale === 'es' ? 'Silenciar' : 'Mute') : locale === 'es' ? 'Escuchar señal' : 'Listen to signal'}
            </button>
            <button aria-pressed={frozen} onClick={() => setFrozen(!frozen)}>
              {frozen ? <Play size={14} /> : <Pause size={14} />}{' '}
              {frozen ? (locale === 'es' ? 'Continuar onda' : 'Resume wave') : locale === 'es' ? 'Congelar onda' : 'Freeze wave'}
            </button>
          </div>
          <p className="sig-audio-note" role="status">
            {notice || (locale === 'es' ? 'El sonido solo se activa si lo eliges. Volumen inicial bajo.' : 'Sound only activates when you choose it. Low initial volume.')}
          </p>
        </div>
      </div>
    </section>
  );
}
