'use client';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useSiteSettings } from '@/components/LocaleThemeProvider';

export default function SignalContact() {
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);
  const { locale } = useSiteSettings();
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim(),
      email = String(data.get('email')).trim(),
      message = String(data.get('message')).trim();
    if (!name || !message) {
      setStatus(locale === 'es' ? 'Escribe un nombre y un mensaje; los espacios en blanco no cuentan.' : 'Write a name and a message; blank spaces do not count.');
      return;
    }
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(locale === 'es' ? `Nueva señal de ${name}` : `New signal from ${name}`)}&body=${encodeURIComponent(`${locale === 'es' ? 'Hola David' : 'Hi David'},\n\n${message}\n\n${name}\n${email}`)}`;
    setStatus(locale === 'es' ? 'Borrador preparado. Revísalo y envíalo desde tu aplicación de correo. Si no se abrió, usa el correo de contacto.' : 'Draft prepared. Review and send it from your email app. If it did not open, use the contact email.');
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      setStatus(`${locale === 'es' ? 'Puedes copiar el correo directamente' : 'You can copy the email directly'}: ${profile.email}`);
    }
  }
  return (
    <section id="sig-contacto" className="sig-section sig-contact">
      <div className="sig-section-top">
        <span>{locale === 'es' ? '05 / CANAL ABIERTO' : '05 / OPEN CHANNEL'}</span>
        <span>{locale === 'es' ? 'LAS BUENAS IDEAS EMPIEZAN CON UN HOLA.' : 'GOOD IDEAS START WITH A HELLO.'}</span>
      </div>
      <div className="sig-contact-layout">
        <div>
          <span className="sig-contact-asterisk">✳</span>
          <h2>
            {locale === 'es' ? '¿ESTAMOS EN' : 'ARE WE ON THE'}
            <br />
            {locale === 'es' ? 'LA MISMA' : 'SAME'}
            <br />
            <em>{locale === 'es' ? 'FRECUENCIA?' : 'FREQUENCY?'}</em>
          </h2>
          <p>
            {locale === 'es' ? 'Cuéntame qué quieres construir.' : 'Tell me what you want to build.'}
            <br />
            {locale === 'es' ? 'Yo pongo la curiosidad.' : 'I bring the curiosity.'}
          </p>
          <div className="sig-email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button
              aria-label={copied ? (locale === 'es' ? 'Correo copiado' : 'Email copied') : locale === 'es' ? 'Copiar correo de David' : 'Copy David email'}
              onClick={copy}
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>
          <span role="status" className="sr-only">
            {copied ? (locale === 'es' ? 'Correo copiado' : 'Email copied') : ''}
          </span>
        </div>
        <form onSubmit={prepare} className="sig-contact-form">
          <div className="sig-form-caption">
            <span>{locale === 'es' ? 'TRANSMISIÓN ENTRANTE' : 'INCOMING TRANSMISSION'}</span>
            <i />
          </div>
          <label>
            <span>{locale === 'es' ? '01 / TU NOMBRE' : '01 / YOUR NAME'}</span>
            <input
              name="name"
              autoComplete="name"
              placeholder={locale === 'es' ? '¿Quién está al otro lado?' : 'Who is on the other side?'}
              required
              maxLength={120}
            />
          </label>
          <label>
            <span>{locale === 'es' ? '02 / TU CORREO' : '02 / YOUR EMAIL'}</span>
            <input
              name="email"
              autoComplete="email"
              type="email"
              placeholder="hola@tucorreo.com"
              required
              maxLength={200}
            />
          </label>
          <label>
            <span>{locale === 'es' ? '03 / TU IDEA' : '03 / YOUR IDEA'}</span>
            <textarea name="message" placeholder={locale === 'es' ? 'La idea es…' : 'The idea is…'} required rows={3} maxLength={3000} />
          </label>
          <button type="submit" className="sig-button sig-button-lime">
            {locale === 'es' ? 'PREPARAR TRANSMISIÓN' : 'PREPARE TRANSMISSION'} <ArrowUpRight size={21} />
          </button>
          <p>
            {locale === 'es' ? 'Se abre un borrador en tu aplicación de correo.' : 'A draft opens in your email app.'}
            <br />
            {locale === 'es' ? 'Tú decides cuándo enviarlo.' : 'You decide when to send it.'}
          </p>
          <p className="sig-form-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
