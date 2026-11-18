'use client';
import { useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { experience } from '@/data/portfolio';
import { useSiteSettings } from './LocaleThemeProvider';
export default function Experience() {
  const [kind, setKind] = useState<'academic' | 'work'>('academic');
  const { t, locale } = useSiteSettings();
  return (
    <section id="experiencia" className="section experience-section">
      <div className="page-width">
        <div className="section-label">
          <span>{t('experienceLabel')}</span>
          <span>
            {locale === 'es' ? 'CADA ETAPA SUMA' : 'EVERY STEP COUNTS'} <ArrowUpRight size={14} />
          </span>
        </div>
        <div className="experience-layout">
          <div>
            <h2>
              {locale === 'es' ? 'Un camino que' : 'A path that'}
              <br />
              <span className="muted-heading">{locale === 'es' ? 'sigue creciendo.' : 'keeps growing.'}</span>
            </h2>
            <p className="experience-intro">
              {locale === 'es' ? 'Aprender. Probar. Equivocarse.' : 'Learn. Try. Make mistakes.'}
              <br />
              {locale === 'es' ? 'Entender. Volver a construir.' : 'Understand. Build again.'}
            </p>
            <div className="segmented" aria-label="Tipo de experiencia">
              <button aria-pressed={kind === 'academic'} onClick={() => setKind('academic')}>
                <GraduationCap size={16} /> {t('academic')}
              </button>
              <button aria-pressed={kind === 'work'} onClick={() => setKind('work')}>
                <BriefcaseBusiness size={16} /> {t('work')}
              </button>
            </div>
          </div>
          <div className="timeline" aria-live="polite">
            {experience[kind].map((item) => (
              <article className="timeline-item" key={item.title}>
                <span className="timeline-node">
                  {kind === 'academic' ? (
                    <GraduationCap size={18} />
                  ) : (
                    <BriefcaseBusiness size={18} />
                  )}
                </span>
                <span className="eyebrow">{locale === 'en' ? kind === 'academic' ? '5th semester · In progress' : 'February 20, 2025 — Present' : item.dates}</span>
                <h3>{locale === 'en' && kind === 'academic' ? 'Software engineering' : item.title}</h3>
                <span className="timeline-organization">{locale === 'en' ? kind === 'academic' ? 'University training' : 'Work experience' : item.organization}</span>
                <p>{locale === 'en' ? (kind === 'academic' ? 'University training in software development, programming and AI solutions.' : 'Current professional experience.') : item.description}</p>
              </article>
            ))}
            <div className="timeline-next">
              <span /> {locale === 'es' ? 'El próximo capítulo está por construir.' : 'The next chapter is waiting to be built.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
