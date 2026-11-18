'use client';

import { Moon, Sun } from 'lucide-react';
import { useSiteSettings } from './LocaleThemeProvider';

export default function LocaleThemeControls() {
  const { locale, theme, setLocale, toggleTheme, t } = useSiteSettings();
  return (
    <div className="locale-theme-controls" aria-label={`${t('language')} y ${t('theme')}`}>
      <div className="locale-switch" role="group" aria-label={t('language')}>
        <button aria-pressed={locale === 'es'} onClick={() => setLocale('es')}>
          ES
        </button>
        <span>/</span>
        <button aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>
          EN
        </button>
      </div>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? t('darkMode') : t('lightMode')}
        title={theme === 'light' ? t('darkMode') : t('lightMode')}
      >
        {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
      </button>
    </div>
  );
}
