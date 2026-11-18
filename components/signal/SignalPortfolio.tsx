'use client';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  CircuitBoard,
  Code2,
  Download,
  Menu,
  Minus,
  Pause,
  Play,
  Plus,
  Radio,
  X,
} from 'lucide-react';
import { profile, experience, testimonials } from '@/data/portfolio';
import { Github, Linkedin } from '@/components/BrandIcons';
import Scope from './Scope';
import SignalProjects from './SignalProjects';
import SignalLab from './SignalLab';
import SignalContact from './SignalContact';
import DesignSwitcher from '@/components/DesignSwitcher';
import LocaleThemeControls from '@/components/LocaleThemeControls';
import { useSiteSettings } from '@/components/LocaleThemeProvider';

const links = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'experiencia', label: 'Trayectoria' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'laboratorio', label: 'Laboratorio' },
];
const channels = [
  {
    label: 'SOFTWARE',
    description: 'Lógica que se convierte en soluciones.',
    frequency: 2.5,
    icon: Code2,
  },
  {
    label: 'INTELIGENCIA ARTIFICIAL',
    description: 'Curiosidad que aprende nuevos patrones.',
    frequency: 4.2,
    icon: BrainCircuit,
  },
  {
    label: 'HARDWARE',
    description: 'Entender cada pieza. Conectar el sistema.',
    frequency: 1.4,
    icon: CircuitBoard,
  },
];

function SignalHeader({
  paused,
  active,
  onPause,
}: {
  paused: boolean;
  active: string;
  onPause: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { t, locale } = useSiteSettings();
  const localizedLinks = links.map((link) => ({
    ...link,
    label:
      link.id === 'sobre-mi'
        ? t('navAbout')
        : link.id === 'proyectos'
          ? t('navProjects')
          : link.id === 'testimonios'
            ? t('navTestimonials')
            : link.id === 'experiencia'
              ? t('navExperience')
              : link.id === 'contacto'
                ? t('navContact')
                : t('navLab'),
  }));
  return (
    <header className="sig-header">
      <a href="#sig-inicio" className="sig-brand" aria-label={locale === 'es' ? 'Frecuencia de David, ir al inicio' : 'David Frequency, go home'}>
        <span>
          <AudioLines size={25} />
        </span>
        DV<span className="sig-brand-slash">/</span>
        <small>
          FRECUENCIA
          <br />
          PERSONAL ENGINEERING
        </small>
      </a>
      <nav
        id="sig-navigation"
        className={open ? 'is-open' : ''}
        aria-label={locale === 'es' ? 'Navegación de Frecuencia' : 'Frecuencia navigation'}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setOpen(false);
            document.getElementById('sig-menu')?.focus();
          }
        }}
      >
        {localizedLinks.map((link) => (
          <a
            key={link.id}
            href={`#sig-${link.id}`}
            onClick={() => setOpen(false)}
            aria-current={active === link.id ? 'location' : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="sig-header-tools">
        <LocaleThemeControls />
        <DesignSwitcher />
        <button
          className="sig-motion-button"
          onClick={onPause}
          aria-pressed={paused}
          aria-label={paused ? (locale === 'es' ? 'Activar animaciones' : 'Enable animation') : locale === 'es' ? 'Pausar animaciones' : 'Pause animation'}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
        <a
          className="sig-header-github"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={locale === 'es' ? 'GitHub de David' : 'David on GitHub'}
        >
          <Github size={18} />
        </a>
        <button
          className="sig-menu"
          id="sig-menu"
          aria-expanded={open}
          aria-controls="sig-navigation"
          aria-label={open ? (locale === 'es' ? 'Cerrar navegación' : 'Close navigation') : locale === 'es' ? 'Abrir navegación' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  );
}

function Receiver({ paused }: { paused: boolean }) {
  const [channel, setChannel] = useState(0);
  const [gain, setGain] = useState(64);
  const { locale } = useSiteSettings();
  const receiver = useRef<HTMLDivElement>(null);
  const knobPointer = useRef<number | null>(null);
  const active = channels[channel];
  const activeDescription = locale === 'en'
    ? ['Logic turned into solutions.', 'Curiosity that learns new patterns.', 'Understand every piece. Connect the system.'][channel]
    : active.description;

  function changeGain(next: number) {
    setGain(Math.max(20, Math.min(100, Math.round(next))));
  }

  function tuneKnob(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = (Math.atan2(event.clientX - centerX, centerY - event.clientY) * 180) / Math.PI;
    const limitedAngle = Math.max(-135, Math.min(135, angle));
    changeGain(20 + ((limitedAngle + 135) / 270) * 80);
  }
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (paused || event.pointerType === 'touch') return;
    const element = receiver.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty('--sig-tilt-x', `${(-y * 4).toFixed(2)}deg`);
    element.style.setProperty('--sig-tilt-y', `${(x * 5).toFixed(2)}deg`);
    element.style.setProperty('--sig-glare-x', `${(x + 0.5) * 100}%`);
    element.style.setProperty('--sig-glare-y', `${(y + 0.5) * 100}%`);
  }
  function resetTilt() {
    receiver.current?.style.removeProperty('--sig-tilt-x');
    receiver.current?.style.removeProperty('--sig-tilt-y');
    receiver.current?.style.removeProperty('--sig-glare-x');
    receiver.current?.style.removeProperty('--sig-glare-y');
  }
  return (
    <div className="sig-receiver" ref={receiver} onPointerMove={tilt} onPointerLeave={resetTilt}>
      <div className="sig-receiver-cap">
        <span>DV® / {locale === 'es' ? 'PENSAMIENTO ANÁLOGO. CREACIÓN DIGITAL.' : 'ANALOG THINKING. DIGITAL MAKING.'}</span>
        <span>MODEL 02—26</span>
      </div>
      <div className="sig-receiver-body">
        <div className="sig-receiver-glare" aria-hidden="true" />
        <i className="sig-screw screw-tl" />
        <i className="sig-screw screw-tr" />
        <i className="sig-screw screw-bl" />
        <i className="sig-screw screw-br" />
        <div className="sig-receiver-top">
          <span>
            <i /> {locale === 'es' ? 'SEÑAL ENCONTRADA' : 'SIGNAL FOUND'}
          </span>
          <Radio size={17} />
          <span>CH.0{channel + 1}</span>
        </div>
        <div className="sig-screen">
          <Scope frequency={active.frequency} gain={gain} paused={paused} />
          <div className="sig-screen-top">
            <span>DV / {locale === 'en' && active.label === 'INTELIGENCIA ARTIFICIAL' ? 'ARTIFICIAL INTELLIGENCE' : active.label}</span>
            <span>{paused ? 'HOLD' : 'LIVE'} ●</span>
          </div>
          <div className="sig-screen-bottom">
            <span>
              {active.frequency.toFixed(1)}
              <small>{locale === 'es' ? 'CICLOS / PANTALLA' : 'CYCLES / SCREEN'}</small>
            </span>
            <span>
              {locale === 'es' ? 'AMPLITUD' : 'AMPLITUDE'}
              <br />
              {gain}%
            </span>
          </div>
          <div className="sig-screen-glass" />
        </div>
        <div className="sig-tuning-scale">
          {Array.from({ length: 31 }, (_, i) => (
            <i key={i} className={i % 5 === 0 ? 'large' : ''} />
          ))}
          <span style={{ left: `${14 + channel * 36}%` }} />
        </div>
        <div className="sig-receiver-controls">
          <div className="sig-channel-buttons">
            <span>{locale === 'es' ? 'SINTONIZA UNA IDEA' : 'TUNE AN IDEA'}</span>
            <div>
              {channels.map((item, i) => (
                <button
                  key={item.label}
                  aria-label={`${locale === 'es' ? 'Sintonizar' : 'Tune'} ${item.label.toLowerCase()}`}
                  aria-pressed={channel === i}
                  onClick={() => setChannel(i)}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          </div>
          <div
            className="sig-knob"
            style={{ transform: `rotate(${-135 + ((gain - 20) / 80) * 270}deg)` }}
            role="slider"
            tabIndex={0}
            aria-label={locale === 'es' ? 'Ganancia de la señal' : 'Signal gain'}
            aria-valuemin={20}
            aria-valuemax={100}
            aria-valuenow={gain}
            aria-valuetext={`${gain} ${locale === 'es' ? 'por ciento' : 'percent'}`}
            title={locale === 'es' ? 'Arrastra, gira la rueda o usa las flechas' : 'Drag, scroll or use the arrow keys'}
            onPointerDown={(event) => {
              knobPointer.current = event.pointerId;
              event.currentTarget.setPointerCapture(event.pointerId);
              tuneKnob(event);
            }}
            onPointerMove={(event) => {
              if (knobPointer.current === event.pointerId) tuneKnob(event);
            }}
            onPointerUp={(event) => {
              if (knobPointer.current !== event.pointerId) return;
              knobPointer.current = null;
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerCancel={() => {
              knobPointer.current = null;
            }}
            onWheel={(event) => {
              event.preventDefault();
              changeGain(gain + (event.deltaY < 0 ? 4 : -4));
            }}
            onKeyDown={(event) => {
              const changes: Partial<Record<string, number>> = {
                ArrowUp: 4,
                ArrowRight: 4,
                ArrowDown: -4,
                ArrowLeft: -4,
                PageUp: 12,
                PageDown: -12,
              };
              if (event.key === 'Home' || event.key === 'End') {
                event.preventDefault();
                changeGain(event.key === 'Home' ? 20 : 100);
                return;
              }
              const change = changes[event.key];
              if (change === undefined) return;
              event.preventDefault();
              changeGain(gain + change);
            }}
          >
            <i />
          </div>
          <div className="sig-gain">
            <span>{locale === 'es' ? 'GANANCIA' : 'GAIN'}</span>
            <div>
              <button
                aria-label={locale === 'es' ? 'Reducir ganancia' : 'Decrease gain'}
                disabled={gain <= 20}
                onClick={() => setGain((v) => Math.max(20, v - 12))}
              >
                <Minus size={13} />
              </button>
              <output>{gain}</output>
              <button
                aria-label={locale === 'es' ? 'Aumentar ganancia' : 'Increase gain'}
                disabled={gain >= 100}
                onClick={() => setGain((v) => Math.min(100, v + 12))}
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
        </div>
        <div className="sig-receiver-footer" aria-live="polite">
          <active.icon size={15} />
          <span>{activeDescription}</span>
          <i />
        </div>
      </div>
      <div className="sig-receiver-foot left" />
      <div className="sig-receiver-foot right" />
      <div className="sig-device-note">
        <span>↖</span> {locale === 'es' ? 'sí, puedes tocar los controles.' : 'yes, you can touch the controls.'}
      </div>
    </div>
  );
}

function SignalRail({ active }: { active: string }) {
  const { locale } = useSiteSettings();
  const allLinks = [{ id: 'inicio', label: locale === 'es' ? 'Inicio' : 'Home' }, ...links.map((link) => ({ ...link, label: locale === 'es' ? link.label : ({ 'sobre-mi': 'About me', proyectos: 'Projects', testimonios: 'Testimonials', experiencia: 'Journey', contacto: 'Contact', laboratorio: 'Lab' } as Record<string, string>)[link.id] ?? link.label }))];
  const activeIndex = Math.max(
    0,
    allLinks.findIndex((link) => link.id === active),
  );
  return (
    <aside className="sig-rail" aria-label={locale === 'es' ? 'Progreso del portafolio' : 'Portfolio progress'}>
      <span className="sig-rail-counter">
        {String(activeIndex + 1).padStart(2, '0')} / {String(allLinks.length).padStart(2, '0')}
      </span>
      <div>
        {allLinks.map((link) => (
          <a
            key={link.id}
            href={`#sig-${link.id}`}
            aria-label={locale === 'es' ? `Ir a ${link.label}` : `Go to ${link.label}`}
            aria-current={active === link.id ? 'location' : undefined}
          >
            <i />
          </a>
        ))}
      </div>
      <span className="sig-rail-name">{allLinks[activeIndex].label}</span>
    </aside>
  );
}

function SignalAbout() {
  const [discipline, setDiscipline] = useState(0);
  const { locale } = useSiteSettings();
  const items = [
    {
      name: locale === 'en' ? 'Software' : 'Software',
      number: '01',
      icon: Code2,
      description:
        locale === 'en' ? 'C, Python and Java. I break down problems, connect ideas and build useful solutions.' : 'C, Python y Java. Descompongo problemas, conecto ideas y construyo soluciones que se puedan usar.',
    },
    {
      name: locale === 'en' ? 'Artificial intelligence' : 'Inteligencia artificial',
      number: '02',
      icon: BrainCircuit,
      description:
        locale === 'en' ? 'Machine learning and AI as tools to explore, learn and give new capabilities to my projects.' : 'Machine learning e IA como herramientas para explorar, aprender y dar nuevas capacidades a mis proyectos.',
    },
    {
      name: 'Hardware',
      number: '03',
      icon: CircuitBoard,
      description:
        locale === 'en' ? 'Equipment maintenance, repair and building. What happens outside the screen matters too.' : 'Mantenimiento, reparación y construcción de equipos. Porque lo que ocurre fuera de la pantalla también importa.',
    },
  ];
  return (
    <section id="sig-sobre-mi" className="sig-section sig-about">
      <div className="sig-section-top">
          <span>{locale === 'es' ? '01 / EL OPERADOR' : '01 / THE OPERATOR'}</span>
        <span>{locale === 'es' ? 'HAY UNA PERSONA DETRÁS DE LA SEÑAL.' : 'THERE IS A PERSON BEHIND THE SIGNAL.'}</span>
      </div>
      <div className="sig-about-layout">
        <div className="sig-identity">
          <div className="sig-id-head">
            <span>{locale === 'es' ? 'IDENTIFICACIÓN DEL OPERADOR' : 'OPERATOR IDENTIFICATION'}</span>
            <ArrowUpRight size={15} />
          </div>
          <div className="sig-id-portrait">
            <Image
              className="sig-id-photo"
              src={profile.photoUrl}
              alt={locale === 'es' ? 'Retrato de David Velez' : 'Portrait of David Velez'}
              fill
              sizes="(max-width: 760px) 82vw, 360px"
            />
            <div className="sig-id-orbit" />
            <div className="sig-id-cross horizontal" />
            <div className="sig-id-cross vertical" />
            <span className="sig-id-coord">
              D / V<br />
              SOFTWARE
              <br />
              HARDWARE
            </span>
          </div>
          <div className="sig-id-name">
            <strong>DAVID VELEZ</strong>
            <span>{locale === 'es' ? 'INGENIERÍA DE SOFTWARE' : 'SOFTWARE ENGINEERING'}</span>
          </div>
          <div className="sig-id-bottom">
            <div className="sig-barcode" />
            <span>
              ID / DVKLLZ
              <br />
              {locale === 'es' ? 'CURIOSIDAD SIN FRECUENCIA FIJA' : 'CURIOSITY WITHOUT A FIXED FREQUENCY'}
            </span>
          </div>
        </div>
        <div className="sig-about-copy">
          <span className="sig-kicker">{locale === 'es' ? 'HOLA, SOY DAVID.' : "HI, I'M DAVID."}</span>
          <h2>
            {locale === 'es' ? 'ME GUSTA SABER' : 'I LIKE TO KNOW'}
            <br />
            {locale === 'es' ? <>QUÉ PASA <em>DENTRO.</em></> : <>WHAT HAPPENS <em>INSIDE.</em></>}
          </h2>
          <p>{locale === 'es' ? profile.about : 'I am David Velez, a fifth-semester Software Engineering student. I like understanding how things work, from the code that moves them to the components that bring them to life. I work with machine learning, artificial intelligence, C, Python and Java, plus hardware maintenance, repair and construction.'}</p>
          <div className="sig-about-stats">
            <div>
              <b>
                05<span>º</span>
              </b>
              <span>
                {locale === 'es' ? 'SEMESTRE DE' : 'SEMESTER OF'}
                <br />
                {locale === 'es' ? 'INGENIERÍA DE SOFTWARE' : 'SOFTWARE ENGINEERING'}
              </span>
            </div>
            <div>
              <b>01</b>
              <span>
                {locale === 'es' ? 'AÑO DE' : 'YEAR OF'}
                <br />
                {locale === 'es' ? 'EXPERIENCIA LABORAL' : 'WORK EXPERIENCE'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="sig-disciplines" role="group" aria-label={locale === 'es' ? 'Explorar áreas de conocimiento' : 'Explore knowledge areas'}>
        {items.map((item, i) => (
          <button
            key={item.number}
            onClick={() => setDiscipline(i)}
            aria-pressed={discipline === i}
          >
            <span>{item.number}</span>
            <item.icon size={25} />
            <strong>{item.name}</strong>
            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>
      <div className="sig-discipline-detail" aria-live="polite">
        <span>↳</span>
        <p>{items[discipline].description}</p>
      </div>
    </section>
  );
}

function SignalTestimonials() {
  const { locale } = useSiteSettings();
  return (
    <section id="sig-testimonios" className="sig-section sig-voices">
      <div className="sig-section-top">
        <span>{locale === 'es' ? '03 / OTRAS VOCES' : '03 / OTHER VOICES'}</span>
        <span>{locale === 'es' ? 'EL TRABAJO TAMBIÉN SE ESCUCHA DESDE AFUERA.' : 'THE WORK CAN ALSO BE HEARD FROM OUTSIDE.'}</span>
      </div>
      <div className="sig-voices-heading">
        <h2>
          {locale === 'es' ? 'AL OTRO LADO' : 'ON THE OTHER SIDE'}
          <br />
          <em>{locale === 'es' ? 'DE LA SEÑAL.' : 'OF THE SIGNAL.'}</em>
        </h2>
        <p>
          {locale === 'es' ? 'Perspectivas de quienes' : 'Perspectives from people'}
          <br />
          {locale === 'es' ? 'han compartido el camino.' : 'who shared the journey.'}
        </p>
      </div>
      <div className="sig-voices-grid">
        {testimonials.length
          ? testimonials.map((t, index) => (
              <figure key={t.name}>
                <div className="sig-voice-meta">
                  <span>VOZ / 0{index + 1}</span>
                  <AudioLines size={18} />
                </div>
                <span className="sig-quote" aria-hidden="true">
                  “
                </span>
                <blockquote>{locale === 'en' ? t.textEn ?? t.text : t.text}</blockquote>
                <figcaption>
                  <b>{t.initials}</b>
                  <span>
                    {t.name}
                    <small>{locale === 'en' ? t.relation.replace('Ingeniero de Sistemas', 'Systems Engineer').replace('Ingeniera de Sistemas', 'Systems Engineer').replace('Ingeniero Civil', 'Civil Engineer') : t.relation}</small>
                  </span>
                </figcaption>
              </figure>
            ))
          : (locale === 'es' ? ['COMPAÑEROS', 'MENTORES', 'COLABORADORES'] : ['TEAMMATES', 'MENTORS', 'COLLABORATORS']).map((role, i) => (
              <div className="sig-voice-pending" key={role}>
                <div>
                  <span>VOZ / 0{i + 1}</span>
                  <AudioLines size={20} />
                </div>
                <h3>{role}</h3>
                <p>
                  {locale === 'es' ? 'Este canal espera una' : 'This channel is waiting for a'}
                  <br />
                  {locale === 'es' ? 'recomendación real.' : 'real recommendation.'}
                </p>
                <span className="sig-pending">
                  <i /> {locale === 'es' ? 'TESTIMONIO POR AÑADIR' : 'TESTIMONIAL TO BE ADDED'}
                </span>
              </div>
            ))}
      </div>
    </section>
  );
}

function SignalExperience() {
  const { locale } = useSiteSettings();
  return (
    <section id="sig-experiencia" className="sig-section sig-experience">
      <div className="sig-section-top">
        <span>{locale === 'es' ? '04 / REGISTRO DE ACTIVIDAD' : '04 / ACTIVITY LOG'}</span>
        <span>{locale === 'es' ? 'APRENDER ES MANTENERSE EN MOVIMIENTO.' : 'LEARNING MEANS STAYING IN MOTION.'}</span>
      </div>
      <div className="sig-experience-layout">
        <h2>
          {locale === 'es' ? 'NUNCA EN' : 'NEVER IN'}
          <br />
          <em>{locale === 'es' ? 'MODO ESPERA.' : 'STANDBY MODE.'}</em>
        </h2>
        <div className="sig-log">
          {[
            ...experience.academic.map((item) => ({ ...item, type: locale === 'es' ? 'FORMACIÓN' : 'EDUCATION' })),
            ...experience.work.map((item) => ({ ...item, type: locale === 'es' ? 'EXPERIENCIA' : 'EXPERIENCE' })),
          ].map((item, i) => (
            <article key={item.title}>
              <span className="sig-log-number">0{i + 1}</span>
              <div>
                <span className="sig-log-type">
                  {item.type} / {locale === 'en' && item.type === 'EDUCATION' ? '5th semester · In progress' : locale === 'en' && item.type === 'EXPERIENCE' ? 'February 20, 2025 — Present' : item.dates}
                </span>
                <h3>{locale === 'en' && item.title === 'Ingeniería de software' ? 'Software engineering' : item.title}</h3>
                <span className="sig-log-organization">{locale === 'en' && item.organization === 'Formación universitaria' ? 'University training' : locale === 'en' && item.organization === 'Experiencia laboral' ? 'Work experience' : item.organization}</span>
                <p>{locale === 'en' ? item.type === 'EDUCATION' ? 'Software development, programming and exploration of artificial intelligence solutions.' : 'Current professional experience.' : item.description}</p>
              </div>
              <ArrowUpRight size={18} />
            </article>
          ))}
          <div className="sig-log-next">
            <i /> {locale === 'es' ? 'EL SIGUIENTE CAPÍTULO SIGUE ABIERTO.' : 'THE NEXT CHAPTER IS STILL OPEN.'}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SignalPortfolio() {
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState('inicio');
  const { locale } = useSiteSettings();
  const activeRef = useRef('inicio');
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPaused(media.matches);
    const sectionIds = ['inicio', ...links.map((link) => link.id)];
    const sections = sectionIds
      .map((id) => document.getElementById(`sig-${id}`))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        const value = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
        if (progress.current) progress.current.style.transform = `scaleX(${value})`;
        const marker = window.innerHeight * 0.38;
        const current = sections.reduce((match, section) => {
          return section.getBoundingClientRect().top <= marker ? section : match;
        }, sections[0]);
        const currentId = current?.id.replace('sig-', '') ?? 'inicio';
        if (currentId !== activeRef.current) {
          activeRef.current = currentId;
          setActive(currentId);
        }
      });
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    const syncHash = () => {
      const hashId = window.location.hash.replace('#sig-', '');
      if (sectionIds.includes(hashId) && hashId !== activeRef.current) {
        activeRef.current = hashId;
        setActive(hashId);
      }
      updateProgress();
    };
    window.addEventListener('hashchange', syncHash);
    const initialSync = window.setTimeout(syncHash, 120);
    updateProgress();
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('hashchange', syncHash);
      window.clearTimeout(initialSync);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className={`signal-page ${paused ? 'sig-paused' : ''}`}>
      <div className="sig-page-progress" ref={progress} aria-hidden="true" />
      <a href="#sig-proyectos" className="sig-skip">
        {locale === 'es' ? 'Saltar a los proyectos' : 'Skip to projects'}
      </a>
      <SignalHeader active={active} paused={paused} onPause={() => setPaused(!paused)} />
      <SignalRail active={active} />
      <main>
        <section id="sig-inicio" className="sig-hero">
          <div className="sig-hero-meta">
            <span>
              <i /> DAVID VELEZ / {locale === 'es' ? 'INGENIERÍA DE SOFTWARE' : 'SOFTWARE ENGINEERING'}
            </span>
            <span>{locale === 'es' ? 'PORTAFOLIO INDEPENDIENTE — VOL. 02' : 'INDEPENDENT PORTFOLIO — VOL. 02'}</span>
          </div>
          <div className="sig-hero-grid">
            <div className="sig-hero-copy">
              <div className="sig-hero-tag">{locale === 'es' ? 'LA CURIOSIDAD NO VIENE CON MANUAL.' : 'CURIOSITY DOES NOT COME WITH A MANUAL.'}</div>
              <h1>
                {locale === 'es' ? 'EN OTRA' : 'ON ANOTHER'}
                <br />
                <em>{locale === 'es' ? 'FRECUENCIA.' : 'FREQUENCY.'}</em>
                <span className="sig-title-star">✳</span>
              </h1>
              <p>
                {locale === 'es' ? 'Entre líneas de código, redes neuronales' : 'Between lines of code, neural networks'}
                <br className="sig-desktop-br" /> {locale === 'es' ? 'y circuitos. Ahí es donde conecto las ideas.' : 'and circuits. That is where I connect ideas.'}
              </p>
              <div className="sig-hero-actions">
                <a className="sig-button sig-button-lime" href="#sig-proyectos">
                  {locale === 'es' ? 'EXPLORAR PROYECTOS' : 'EXPLORE PROJECTS'} <ArrowDownRight size={19} />
                </a>
                <a className="sig-cv-link" href={profile.cvUrl} download>
                  {locale === 'es' ? 'MI CV' : 'MY CV'} <Download size={15} />
                </a>
              </div>
              <div className="sig-hero-signature">
                <span className="sig-signature-lines">|||||||||||</span>
                <span>{locale === 'es' ? 'PENSAR. CONECTAR. HACER.' : 'THINK. CONNECT. MAKE.'}</span>
              </div>
              <div className="sig-live-status">
                <i />
                <span>{locale === 'es' ? 'CANAL ABIERTO' : 'OPEN CHANNEL'}</span>
                <span>{locale === 'es' ? 'DISPONIBLE PARA NUEVAS IDEAS' : 'AVAILABLE FOR NEW IDEAS'}</span>
              </div>
            </div>
            <Receiver paused={paused} />
          </div>
          <div className="sig-hero-bottom">
            <a href="#sig-sobre-mi">
              <ArrowDown size={15} /> {locale === 'es' ? 'SIGUE LA SEÑAL' : 'FOLLOW THE SIGNAL'}
            </a>
            <span>
            SOFTWARE <b>+</b> {locale === 'es' ? 'INTELIGENCIA ARTIFICIAL' : 'ARTIFICIAL INTELLIGENCE'} <b>+</b> HARDWARE
            </span>
            <span>{locale === 'es' ? 'DESLIZA PARA DESCUBRIR' : 'SCROLL TO DISCOVER'}</span>
          </div>
        </section>
        <div className="sig-ticker" aria-hidden="true">
          <div>
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i}>
                {locale === 'es' ? 'LA CURIOSIDAD ES EL SISTEMA OPERATIVO' : 'CURIOSITY IS THE OPERATING SYSTEM'} <b>✳</b> {locale === 'es' ? 'IDEAS QUE CONECTAN' : 'IDEAS THAT CONNECT'} <b>✳</b>{' '}
              </span>
            ))}
          </div>
        </div>
        <div className="sig-body">
          <SignalAbout />
          <SignalProjects />
          <SignalTestimonials />
          <SignalExperience />
          <SignalContact />
          <SignalLab paused={paused} />
        </div>
      </main>
      <footer className="sig-footer">
        <div className="sig-footer-top">
          <span>
            {locale === 'es' ? 'FIN DE LA PÁGINA.' : 'END OF PAGE.'}
            <br />
            {locale === 'es' ? 'INICIO DE ALGO.' : 'START OF SOMETHING.'}
          </span>
          <a href="#sig-inicio">
            {locale === 'es' ? 'VOLVER A SINTONIZAR' : 'TUNE AGAIN'} <ArrowUp size={17} />
          </a>
        </div>
        <div className="sig-footer-word" aria-hidden="true">
          FRECUENCIA<span>®</span>
        </div>
        <div className="sig-footer-bottom">
          <span>© {new Date().getFullYear()} DAVID VELEZ</span>
          <div>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GITHUB <ArrowUpRight size={12} />
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={13} /> LINKEDIN
              </a>
            )}
            <a href={`mailto:${profile.email}`}>
              EMAIL <ArrowUpRight size={12} />
            </a>
          </div>
          <span>NEXT.JS + TAILWIND / {locale === 'es' ? 'HECHO CON INTENCIÓN.' : 'MADE WITH INTENTION.'}</span>
        </div>
      </footer>
    </div>
  );
}
