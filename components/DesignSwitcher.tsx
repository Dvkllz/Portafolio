'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { Check, Layers2, ArrowUpRight, X } from 'lucide-react';
import { useSiteSettings } from './LocaleThemeProvider';

export default function DesignSwitcher() {
  const path = usePathname();
  const signal = path.startsWith('/frecuencia');
  const { t, locale } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <aside
      className={`design-switch ${signal ? 'design-switch-dark' : ''}`}
      aria-label={locale === 'es' ? 'Versiones del portafolio' : 'Portfolio versions'}
      onKeyDown={(event) => {
        if (event.key === 'Escape') close();
      }}
    >
      {open && (
        <div className="design-options" id="design-options">
          <div className="design-options-top">
            <span>{locale === 'es' ? 'DOS FORMAS DE VER MI MUNDO' : 'TWO WAYS TO SEE MY WORLD'}</span>
            <button aria-label={locale === 'es' ? 'Cerrar selector de diseño' : 'Close design selector'} onClick={close}>
              <X size={16} />
            </button>
          </div>
          <Link
            href="/#inicio"
            onClick={() => setOpen(false)}
            aria-current={!signal ? 'page' : undefined}
          >
            <span className="design-thumb thumb-world">◈</span>
            <span>
              <small>{locale === 'es' ? 'OPCIÓN 01' : 'OPTION 01'}</small>
              <strong>{locale === 'es' ? 'Mundo en construcción' : 'World under construction'}</strong>
            </span>
            {!signal ? <Check size={16} /> : <ArrowUpRight size={16} />}
          </Link>
          <Link
            href="/frecuencia#sig-inicio"
            onClick={() => setOpen(false)}
            aria-current={signal ? 'page' : undefined}
          >
            <span className="design-thumb thumb-signal">∿</span>
            <span>
              <small>{locale === 'es' ? 'OPCIÓN 02' : 'OPTION 02'}</small>
              <strong>Frecuencia</strong>
            </span>
            {signal ? <Check size={16} /> : <ArrowUpRight size={16} />}
          </Link>
        </div>
      )}
      <button
        ref={trigger}
        className="design-trigger"
        aria-expanded={open}
        aria-controls={open ? 'design-options' : undefined}
        onClick={() => setOpen(!open)}
      >
        <Layers2 size={15} />
        <span>{t('design')}</span>
        <b>{signal ? '02' : '01'}</b>
      </button>
    </aside>
  );
}
