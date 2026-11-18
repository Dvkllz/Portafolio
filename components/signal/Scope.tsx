'use client';

import { useEffect, useRef } from 'react';
import { useSiteSettings } from '@/components/LocaleThemeProvider';

export type WaveShape = 'sine' | 'triangle' | 'square';
export default function Scope({
  frequency = 3,
  gain = 60,
  shape = 'sine',
  paused = false,
  compact = false,
}: {
  frequency?: number;
  gain?: number;
  shape?: WaveShape;
  paused?: boolean;
  compact?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { locale } = useSiteSettings();
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const ctx = element.getContext('2d');
    if (!ctx) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0,
      observerVisible = true,
      visible = !document.hidden;
    let reduced = media.matches;
    const width = 800,
      height = compact ? 270 : 500;
    element.width = width;
    element.height = height;
    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#111a12';
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#263825';
      for (let x = 0; x <= width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.strokeStyle = '#385031';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      const phase = paused || reduced ? 0 : time / 1700;
      for (let layer = 2; layer >= 0; layer--) {
        ctx.beginPath();
        ctx.strokeStyle = layer === 0 ? '#d4f776' : layer === 1 ? '#5e8b4a' : '#2b452a';
        ctx.lineWidth = layer === 0 ? 2.7 : 1.3;
        ctx.shadowBlur = layer === 0 ? 12 : 0;
        ctx.shadowColor = '#c4ff70';
        for (let x = 0; x <= width; x += 2) {
          const value = (x / width) * Math.PI * 2 * frequency + phase + layer * 0.12;
          const wave =
            shape === 'square'
              ? Math.tanh(Math.sin(value) * 14)
              : shape === 'triangle'
                ? (Math.asin(Math.sin(value)) * 2) / Math.PI
                : Math.sin(value);
          const envelope = 0.55 + 0.45 * Math.sin((Math.PI * x) / width);
          const y = height / 2 + wave * (height * 0.38) * (gain / 100) * envelope + layer * 9;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      const sweep = (((phase * 125) % width) + width) % width;
      if (!paused && !reduced) {
        ctx.fillStyle = '#d9ff8308';
        ctx.fillRect(sweep, 0, 32, height);
      }
    }
    function tick(time: number) {
      draw(time);
      if (!paused && !reduced && observerVisible && visible) frame = requestAnimationFrame(tick);
    }
    function restart() {
      cancelAnimationFrame(frame);
      draw(0);
      if (!paused && !reduced && observerVisible && visible) frame = requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver((entries) => {
      observerVisible = entries[0].isIntersecting;
      restart();
    });
    observer.observe(element);
    const onVisibility = () => {
      visible = !document.hidden;
      restart();
    };
    const onMotion = () => {
      reduced = media.matches;
      restart();
    };
    document.addEventListener('visibilitychange', onVisibility);
    media.addEventListener('change', onMotion);
    restart();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      media.removeEventListener('change', onMotion);
    };
  }, [frequency, gain, shape, paused, compact]);
  return (
    <canvas
      className="sig-scope-canvas"
      ref={canvas}
      role="img"
      aria-label={locale === 'es'
        ? `Osciloscopio: onda ${shape === 'sine' ? 'senoidal' : shape === 'square' ? 'cuadrada' : 'triangular'}, ${frequency.toFixed(1)} ciclos por pantalla, amplitud ${gain} por ciento.`
        : `Oscilloscope: ${shape === 'sine' ? 'sine' : shape === 'square' ? 'square' : 'triangle'} wave, ${frequency.toFixed(1)} cycles per screen, ${gain} percent amplitude.`}
    />
  );
}
