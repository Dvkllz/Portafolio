'use client';
import { useState } from 'react';
import { ArrowUp, Box, Pause, Play } from 'lucide-react';
import { Github } from './BrandIcons';
import { profile, navigation } from '@/data/portfolio';
import { useSiteSettings } from './LocaleThemeProvider';
export default function Footer() {
  const [paused, setPaused] = useState(false);
  const { t, locale } = useSiteSettings();
  function toggle() {
    setPaused(!paused);
    document.documentElement.classList.toggle('reduce-motion', !paused);
  }
  return (
    <footer className="footer">
      <div className="page-width">
        <div className="footer-top">
          <a href="#inicio" className="brand">
            <span className="brand-cube">
              <Box size={20} />
            </span>
            <span>
              david<span className="brand-dot">.</span>
              <small>{locale === 'es' ? 'SIEMPRE EN CONSTRUCCIÓN.' : 'ALWAYS UNDER CONSTRUCTION.'}</small>
            </span>
          </a>
          <p>
            {locale === 'es' ? 'El mejor proyecto siempre' : 'The best project is always'}
            <br />
            {locale === 'es' ? 'es el que viene.' : 'the next one.'}
          </p>
            <a href="#inicio" className="back-top">
            {locale === 'es' ? 'Volver arriba' : 'Back to top'}{' '}
            <span>
              <ArrowUp size={18} />
            </span>
          </a>
        </div>
        <nav className="footer-nav" aria-label={locale === 'es' ? 'Enlaces del pie de página' : 'Footer links'}>
          {navigation.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {t(`nav${link.id === 'inicio' ? 'Home' : link.id === 'sobre-mi' ? 'About' : link.id === 'proyectos' ? 'Projects' : link.id === 'testimonios' ? 'Testimonials' : link.id === 'experiencia' ? 'Experience' : link.id === 'contacto' ? 'Contact' : 'Lab'}`)}
            </a>
          ))}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="David en GitHub"
          >
            <Github size={16} />
          </a>
        </nav>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} David Velez</span>
          <span>
            {locale === 'es' ? 'Hecho con Next.js + Tailwind' : 'Built with Next.js + Tailwind'} <span className="orange">✳</span>
          </span>
          <button onClick={toggle} aria-pressed={paused}>
            {paused ? <Play size={12} /> : <Pause size={12} />}{' '}
            {paused ? (locale === 'es' ? 'Activar movimiento' : 'Enable motion') : locale === 'es' ? 'Reducir movimiento' : 'Reduce motion'}
          </button>
        </div>
      </div>
    </footer>
  );
}
