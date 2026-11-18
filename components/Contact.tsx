'use client';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { profile } from '@/data/portfolio';
import { useSiteSettings } from './LocaleThemeProvider';
export default function Contact() {
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);
  const { t, locale } = useSiteSettings();
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      setStatus(`${locale === 'es' ? 'Puedes copiar el correo' : 'You can copy the email'}: ${profile.email}`);
    }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim(),
      email = String(data.get('email')).trim(),
      message = String(data.get('message')).trim();
    if (!name || !message) {
      setStatus(locale === 'es' ? 'Escribe tu nombre y un mensaje; los espacios en blanco no cuentan.' : 'Write your name and a message; blank spaces do not count.');
      return;
    }
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(locale === 'es' ? `Una idea de ${name}` : `An idea from ${name}`)}&body=${encodeURIComponent(`${locale === 'es' ? 'Hola David' : 'Hi David'},\n\n${message}\n\n${name}\n${email}`)}`;
    setStatus(
      locale === 'es' ? 'Borrador preparado en tu aplicación de correo. Revísalo y pulsa Enviar allí. Si no se abrió, puedes escribir al correo de la izquierda.' : 'Draft prepared in your email app. Review it and press Send there. If it did not open, email the address on the left.',
    );
  }
  return (
    <section id="contacto" className="section page-width contact-section">
      <div className="section-label">
        <span>{t('contactLabel')}</span>
        <span>
          {locale === 'es' ? 'LA SIGUIENTE IDEA PUEDE SER NUESTRA' : 'THE NEXT IDEA COULD BE OURS'} <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="contact-layout">
        <div>
          <span className="contact-spark">✳</span>
          <h2>
            {locale === 'es' ? '¿Construimos' : 'Should we build'}
            <br />
            <span>{locale === 'es' ? 'algo juntos?' : 'something together?'}</span>
          </h2>
          <p>
            {locale === 'es' ? 'Una idea, un reto o simplemente un hola.' : 'An idea, a challenge or simply a hello.'}
            <br />
            {locale === 'es' ? 'La conversación empieza aquí.' : 'The conversation starts here.'}
          </p>
          <div className="email-line">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button
              onClick={copyEmail}
              className="icon-button"
              aria-label={copied ? t('copiedEmail') : t('copyEmail')}
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>
          <div className="social-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={17} /> GitHub <ArrowUpRight size={14} />
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} />
              </a>
            )}
          </div>
          <span className="sr-only" role="status">
            {copied ? t('copiedEmail') : ''}
          </span>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="form-top">
            <Mail size={20} />
            <span>{locale === 'es' ? 'DE TU IDEA A MI BANDEJA' : 'FROM YOUR IDEA TO MY INBOX'}</span>
          </div>
          <div className="form-row">
            <label>
              {locale === 'es' ? 'Tu nombre' : 'Your name'}
              <input
                autoComplete="name"
                name="name"
                placeholder={locale === 'es' ? '¿Cómo te llamas?' : 'What is your name?'}
                required
                maxLength={120}
              />
            </label>
            <label>
              {locale === 'es' ? 'Tu correo' : 'Your email'}
              <input
                autoComplete="email"
                type="email"
                name="email"
                placeholder="hello@youremail.com"
                required
                maxLength={200}
              />
            </label>
          </div>
          <label>
            {locale === 'es' ? '¿Qué tienes en mente?' : 'What are you thinking about?'}
            <textarea
              name="message"
              placeholder={locale === 'es' ? 'Tengo una idea que empieza así…' : 'I have an idea that starts like this…'}
              required
              rows={4}
              maxLength={3000}
            />
          </label>
          <button className="button primary" type="submit">
            {t('sendMessage')} <Send size={16} />
          </button>
          <p className="form-note">
            {locale === 'es' ? 'Se abrirá tu aplicación de correo para que revises y envíes el mensaje.' : 'Your email app will open so you can review and send the message.'}
          </p>
          <p className="form-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
