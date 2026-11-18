import { ArrowUpRight, MessageSquareQuote, Plus } from 'lucide-react';
import { testimonials } from '@/data/portfolio';
import { useSiteSettings } from './LocaleThemeProvider';
export default function Testimonials() {
  const { locale } = useSiteSettings();
  return (
    <section id="testimonios" className="section page-width">
      <div className="section-label">
        <span>{locale === 'es' ? '03 / TESTIMONIOS' : '03 / TESTIMONIALS'}</span>
        <span>
          {locale === 'es' ? 'CONSTRUIR TAMBIÉN ES COMPARTIR' : 'BUILDING ALSO MEANS SHARING'} <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="section-heading">
        <h2>
          {locale === 'es' ? 'Las voces' : 'The voices'}
          <br />
          <span className="muted-heading">{locale === 'es' ? 'del camino.' : 'along the way.'}</span>
        </h2>
        <p>
          {locale === 'es' ? 'La perspectiva de quienes' : 'Perspectives from those'}
          <br />
          {locale === 'es' ? 'han construido a mi lado.' : 'who built alongside me.'}
        </p>
      </div>
      <div className="testimonial-grid">
        {testimonials.length
          ? testimonials.map((t) => (
              <figure className="testimonial-card" key={t.name}>
                <MessageSquareQuote size={25} />
                <blockquote>{locale === 'en' ? t.textEn ?? t.text : t.text}</blockquote>
                <figcaption>
                  <span className="initial-avatar">{t.initials}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{locale === 'en' ? t.relation.replace('Ingeniero de Sistemas', 'Systems Engineer').replace('Ingeniera de Sistemas', 'Systems Engineer').replace('Ingeniero Civil', 'Civil Engineer') : t.relation}</small>
                  </span>
                </figcaption>
              </figure>
            ))
          : (locale === 'es' ? ['Compañeros de equipo', 'Profesores y mentores', 'Colaboradores'] : ['Teammates', 'Teachers and mentors', 'Collaborators']).map((role, i) => (
              <div className="testimonial-card placeholder-testimonial" key={role}>
                <span className="quote-placeholder">“</span>
                <span className="eyebrow">{locale === 'es' ? 'PRÓXIMAMENTE' : 'COMING SOON'} · 0{i + 1}</span>
                <h3>{role}</h3>
                <p>{locale === 'es' ? 'Un espacio reservado para una recomendación real.' : 'A space reserved for a real recommendation.'}</p>
                <span className="testimonial-add">
                  <Plus size={15} /> {locale === 'es' ? 'Testimonio pendiente' : 'Testimonial pending'}
                </span>
              </div>
            ))}
      </div>
    </section>
  );
}
