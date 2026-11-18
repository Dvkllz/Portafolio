'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Box, BrainCircuit, Code2, Cpu, GraduationCap, Wrench } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useSiteSettings } from './LocaleThemeProvider';
const tools = [
  {
    title: 'Código',
    icon: Code2,
    detail:
      'C, Python y Java: distintas herramientas para pensar, estructurar y resolver problemas.',
  },
  {
    title: 'Inteligencia artificial',
    icon: BrainCircuit,
    detail:
      'Conocimientos en machine learning e IA, aplicados a experiencias como CuentAI y Asistente Virtual.',
  },
  {
    title: 'Hardware',
    icon: Cpu,
    detail:
      'Mantenimiento, reparación y construcción de equipos. Entender un sistema también es conocer sus componentes.',
  },
];

export default function About() {
  const [selected, setSelected] = useState(0);
  const { t, locale } = useSiteSettings();
  const localizedTools = locale === 'en'
    ? [
        { title: 'Code', icon: Code2, detail: 'C, Python and Java: different tools to think, structure and solve problems.' },
        { title: 'Artificial intelligence', icon: BrainCircuit, detail: 'Knowledge of machine learning and AI, applied to experiences such as CuentAI and Virtual Assistant.' },
        { title: 'Hardware', icon: Cpu, detail: 'Maintenance, repair and building equipment. Understanding a system also means knowing its components.' },
      ]
    : tools;
  const aboutText = locale === 'en'
    ? 'I am David Velez, a fifth-semester Software Engineering student. I like understanding how things work: from the code that moves them to the components that bring them to life. I work with machine learning, artificial intelligence, C, Python and Java, plus hardware maintenance, repair and construction.'
    : profile.about;
  return (
    <section className="section page-width about-section" id="sobre-mi">
      <div className="section-label">
        <span>{t('aboutLabel')}</span>
        <span>
          {t('aboutHint')} <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="about-layout">
        <div className="about-portrait">
          <div className="portrait-photo-frame">
            <Image
              className="portrait-photo"
              src={profile.photoUrl}
              alt={locale === 'es' ? 'Retrato de David Velez' : 'Portrait of David Velez'}
              fill
              sizes="(max-width: 700px) 82vw, 340px"
            />
          </div>
          <div className="portrait-grid" />
          <span className="portrait-label">PLAYER_01</span>
          <div className="portrait-bottom">
            <span>DAVID VELEZ</span>
            <span>LVL. ∞</span>
          </div>
          <div className="portrait-sticker">
            <Wrench size={15} /> {locale === 'es' ? 'siempre aprendiendo' : 'always learning'}
          </div>
        </div>
        <div className="about-copy">
          <h2>
            {t('aboutTitle')}
            <br />
            <span className="muted-heading">{t('curiosity')}</span>
          </h2>
          <p>{aboutText}</p>
          <div className="about-facts">
            <span>
              <GraduationCap size={16} /> {t('semester')}
            </span>
            <span>
              <Box size={16} /> {t('experienceYear')}
            </span>
          </div>
          <div className="tool-select" aria-label={t('exploreSkills')}>
            {localizedTools.map((tool, i) => (
              <button
                key={tool.title}
                aria-pressed={selected === i}
                className={selected === i ? 'selected' : ''}
                onClick={() => setSelected(i)}
              >
                <tool.icon size={18} />
                {tool.title}
              </button>
            ))}
          </div>
          <p className="tool-detail" aria-live="polite">
            {localizedTools[selected].detail}
          </p>
        </div>
      </div>
    </section>
  );
}
