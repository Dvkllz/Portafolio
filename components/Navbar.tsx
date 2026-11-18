'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Box, Menu, X } from 'lucide-react';
import { navigation } from '@/data/portfolio';
import DesignSwitcher from '@/components/DesignSwitcher';
import LocaleThemeControls from './LocaleThemeControls';
import { useSiteSettings } from './LocaleThemeProvider';

export default function Navbar() {
  const { t } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    );
    navigation.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#inicio" className="brand" aria-label="David Velez, volver al inicio">
          <span className="brand-cube">
            <Box size={21} strokeWidth={1.8} />
          </span>
          <span>
            david<span className="brand-dot">.</span>
            <small>{t('worldBuilding')}</small>
          </span>
        </a>
        <nav
          className={`navigation ${open ? 'is-open' : ''}`}
          id="main-navigation"
          aria-label={t('mainNavigation')}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false);
              document.getElementById('menu-toggle')?.focus();
            }
          }}
        >
          {navigation.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? 'active' : ''}
              aria-current={active === link.id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {t(`nav${link.id === 'inicio' ? 'Home' : link.id === 'sobre-mi' ? 'About' : link.id === 'proyectos' ? 'Projects' : link.id === 'testimonios' ? 'Testimonials' : link.id === 'experiencia' ? 'Experience' : link.id === 'contacto' ? 'Contact' : 'Lab'}`)}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <LocaleThemeControls />
          <DesignSwitcher />
          <a href="#contacto" className="header-contact">
            {t('talk')} <ArrowUpRight size={16} />
          </a>
          <button
            id="menu-toggle"
            className="menu-toggle icon-button"
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
