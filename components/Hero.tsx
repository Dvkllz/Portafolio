'use client';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, Sparkles } from 'lucide-react';
import { profile } from '@/data/portfolio';
import World from './World';
import { useSiteSettings } from './LocaleThemeProvider';

export default function Hero() {
  const { t, locale } = useSiteSettings();
  const description = locale === 'en'
    ? 'I connect software, artificial intelligence and hardware to turn problems into solutions. One idea, one component and one line of code at a time.'
    : profile.description;
  return (
    <section id="inicio" className="hero-section">
      <div className="hero page-width">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="status-dot" /> {t('heroEyebrow')}{' '}
            <span className="hello-wave">✳</span>
          </div>
          <h1>
            {t('heroLine1')}
            <br />
            {t('heroLine2')}
            <br />
            <span>
              {t('heroLine3')}
              <svg viewBox="0 0 500 16" aria-hidden="true">
                <path
                  d="M4 10Q240-4 494 8M26 14Q250 5 465 13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>
            <span className="hero-period">.</span>
          </h1>
          <p className="hero-description">{description}</p>
          <div className="hero-actions">
            <a className="button primary" href="#proyectos">
              {t('exploreProjects')} <ArrowUpRight size={18} />
            </a>
            <a className="button secondary" href={profile.cvUrl} download>
              {t('downloadCv')} <Download size={16} />
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <span className="tiny-cross">+</span> {t('software')}
            </span>
            <span>
              <span className="tiny-cross">+</span> {t('ai')}
            </span>
            <span>
              <span className="tiny-cross">+</span> {t('hardware')}
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <World />
          <div className="scene-note">
            <Sparkles size={15} />
            <span>{locale === 'en' ? 'Everything starts with a piece.' : 'Todo empieza con una pieza.'}</span>
            <ArrowDownRight size={22} />
          </div>
        </div>
      </div>
      <div className="hero-bottom page-width">
        <a href="#sobre-mi">
          <span className="scroll-icon">
            <ArrowDown size={14} />
          </span>{' '}
          {t('scrollExplore')}
        </a>
        <span>
          {t('madeOf')} <span>✳</span>
        </span>
      </div>
    </section>
  );
}
