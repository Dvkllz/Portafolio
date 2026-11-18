 'use client';
import { ArrowUpRight, Bot, Clock3, FileText, Sparkles } from 'lucide-react';
import type { Project } from '@/data/portfolio';
import { useSiteSettings } from './LocaleThemeProvider';

export default function ProjectArt({ kind }: { kind: Project['illustration'] }) {
  const { locale } = useSiteSettings();
  if (kind === 'cuentai')
    return (
      <div className="project-art art-cuentai" aria-hidden="true">
        <div className="invoice-back">
          <FileText size={24} />
          <div />
          <div />
          <div />
        </div>
        <div className="invoice-app">
          <div className="mini-top">
            <span>
              <Sparkles size={13} /> CuentAI
            </span>
            <span>↗</span>
          </div>
          <div className="mini-hello">
            {locale === 'es' ? 'Tus cuentas.' : 'Your invoices.'}
            <br />
            <b>{locale === 'es' ? 'Un poco más claras.' : 'A little clearer.'}</b>
          </div>
          <div className="invoice-row">
            <span className="invoice-icon">
              <FileText size={17} />
            </span>
            <span>
              {locale === 'es' ? 'Una factura' : 'One invoice'}
              <br />
              <small>{locale === 'es' ? 'Muchas posibilidades' : 'Many possibilities'}</small>
            </span>
            <span>✓</span>
          </div>
          <div className="mini-bars">
            {[32, 55, 42, 68, 58, 85, 64].map((v, i) => (
              <i key={i} style={{ height: `${v}%` }} />
            ))}
          </div>
          <div className="mini-foot">
            {locale === 'es' ? 'MENOS CAOS. MÁS CLARIDAD.' : 'LESS CHAOS. MORE CLARITY.'}
            <ArrowUpRight size={14} />
          </div>
        </div>
        <span className="art-label">{locale === 'es' ? 'ILUSTRACIÓN CONCEPTUAL' : 'CONCEPTUAL ILLUSTRATION'}</span>
      </div>
    );
  if (kind === 'assistant')
    return (
      <div className="project-art art-assistant" aria-hidden="true">
        <div className="assistant-window">
            <div className="window-dots">
            <i />
            <i />
            <i />
            <span>{locale === 'es' ? 'un compañero diferente' : 'a different companion'}</span>
          </div>
          <div className="assistant-bubble">
            {locale === 'es' ? 'Hola, mundo.' : 'Hello, world.'}
            <Sparkles size={14} />
          </div>
          <img className="pet-image" src="/projects/siamese.png" alt="" />
          <div className="assistant-input">
            <span>{locale === 'es' ? '¿Qué construimos hoy?' : 'What are we building today?'}</span>
            <ArrowUpRight size={15} />
          </div>
        </div>
        <span className="floating-symbol">
          <Bot size={22} />
        </span>
        <span className="art-label">{locale === 'es' ? 'SPRITE ORIGINAL DEL PROYECTO' : 'ORIGINAL PROJECT SPRITE'}</span>
      </div>
    );
  if (kind === 'nebula')
    return (
      <div className="project-art art-nebula" aria-hidden="true">
        <img src="/projects/nebula.png" alt="" />
        <div className="nebula-overlay">
          <span>{locale === 'es' ? 'UNA AVENTURA ENTRE MUNDOS' : 'AN ADVENTURE BETWEEN WORLDS'}</span>
          <strong>
            {locale === 'es' ? 'Ecos de' : 'Echoes of'}
            <br />
            {locale === 'es' ? 'Nébula' : 'Nebula'}<span>✧</span>
          </strong>
        </div>
        <span className="art-label">{locale === 'es' ? 'CAPTURA DEL PROYECTO' : 'PROJECT CAPTURE'}</span>
      </div>
    );
  return (
    <div className="project-art art-chronometer" aria-hidden="true">
      <div className="chronometer-card">
        <div className="mini-top">
          <span>
            <Clock3 size={14} /> MASTER CHRONOMETER
          </span>
          <span>PYTHON</span>
        </div>
        <div className="chronometer-dial">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} style={{ transform: `rotate(${i * 30}deg)` }} />
          ))}
          <span className="chrono-number chrono-twelve">12</span>
          <span className="chrono-number chrono-three">3</span>
          <span className="chrono-number chrono-six">6</span>
          <span className="chrono-number chrono-nine">9</span>
          <span className="chrono-logo">RELOJPRO</span>
          <span className="chrono-subdial sub-left" />
          <span className="chrono-subdial sub-right" />
          <span className="chrono-subdial sub-bottom" />
          <span className="chrono-hand hour" />
          <span className="chrono-hand minute" />
          <span className="chrono-hand second" />
          <span className="chrono-pin" />
        </div>
        <div className="mini-foot">
          {locale === 'es' ? 'PRECISIÓN VISUAL. TIEMPO EN MOVIMIENTO.' : 'VISUAL PRECISION. TIME IN MOTION.'}
          <ArrowUpRight size={14} />
        </div>
      </div>
      <span className="art-label">{locale === 'es' ? 'REPRESENTACIÓN DEL PROYECTO' : 'PROJECT REPRESENTATION'}</span>
    </div>
  );
}
