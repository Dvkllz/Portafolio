'use client';
import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ExternalLink, Layers3 } from 'lucide-react';
import { projects, projectEnglish, type Project } from '@/data/portfolio';
import { Github } from '@/components/BrandIcons';
import Dialog from '@/components/Dialog';
import SignalProjectArt from './SignalProjectArt';
import { useSiteSettings } from '@/components/LocaleThemeProvider';

function ProjectTransmission({ project, onClose }: { project: Project; onClose: () => void }) {
  const [view, setView] = useState<'idea' | 'process'>('idea');
  const { locale } = useSiteSettings();
  const copy = locale === 'en' ? projectEnglish[project.id] : project;
  return (
    <Dialog title={locale === 'en' && project.id === 'nebula' ? 'Echoes of Nebula' : project.title} onClose={onClose}>
      <p className="sig-modal-platform">
        CANAL {project.number} / {project.platform}
      </p>
      <div className="sig-modal-tabs">
        <button aria-pressed={view === 'idea'} onClick={() => setView('idea')}>
        {locale === 'es' ? '01. La idea' : '01. The idea'}
        </button>
        <button aria-pressed={view === 'process'} onClick={() => setView('process')}>
        {locale === 'es' ? '02. La ingeniería' : '02. The engineering'}
        </button>
      </div>
      {view === 'idea' ? (
        <>
          <SignalProjectArt project={project} />
          <p className="sig-modal-problem">{copy.problem}</p>
          <div className="sig-project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </>
      ) : (
        <div className="sig-modal-process">
          <span className="sig-mono">{locale === 'es' ? 'DESCOMPOSICIÓN DE LA SEÑAL' : 'SIGNAL BREAKDOWN'}</span>
          <ol>
            {copy.process.map((step, i) => (
              <li key={step}>
                <span>0{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <div>
            <Layers3 size={20} />
            <p>{copy.learning}</p>
          </div>
        </div>
      )}
      <div className="sig-modal-links">
        <a
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="sig-button sig-button-lime"
        >
          <Github size={16} /> {locale === 'es' ? 'Explorar código' : 'Explore code'} <ArrowUpRight size={17} />
        </a>
        {project.demo ? (
          <a
            className="sig-text-link"
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            {locale === 'es' ? 'Demo en vivo' : 'Live demo'} <ExternalLink size={15} />
          </a>
        ) : (
          <span>{locale === 'es' ? 'Demo pública por añadir' : 'Public demo coming soon'}</span>
        )}
      </div>
    </Dialog>
  );
}

export default function SignalProjects() {
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<Project | null>(null);
  const { locale } = useSiteSettings();
  const visible = projects.filter((project) => filter === 'Todos' || project.category === filter);
  const titleFor = (project: Project) => locale === 'en' && project.id === 'nebula' ? 'Echoes of Nebula' : project.title;
  return (
    <section id="sig-proyectos" className="sig-section sig-projects">
      <div className="sig-section-top">
        <span>{locale === 'es' ? '02 / TRABAJO SELECCIONADO' : '02 / SELECTED WORK'}</span>
        <span>{locale === 'es' ? '4 PROYECTOS. DIFERENTES LONGITUDES DE ONDA.' : '4 PROJECTS. DIFFERENT WAVELENGTHS.'}</span>
      </div>
      <div className="sig-section-title">
        <h2>
          {locale === 'es' ? 'MENOS RUIDO.' : 'LESS NOISE.'}
          <br />
          <em>{locale === 'es' ? 'MÁS SEÑAL.' : 'MORE SIGNAL.'}</em>
        </h2>
        <div>
          <ArrowDownRight size={55} strokeWidth={1} />
          <p>
            {locale === 'es' ? 'Ideas que salieron de la cabeza' : 'Ideas that left my head'}
            <br />{locale === 'es' ? 'y encontraron su lugar en el código.' : 'and found their place in code.'}
          </p>
        </div>
      </div>
      <div className="sig-project-toolbar">
        <div role="group" aria-label={locale === 'es' ? 'Filtrar proyectos de Frecuencia' : 'Filter Frecuencia projects'}>
          {(locale === 'es' ? ['Todos', 'Inteligencia artificial', 'Software'] : ['All', 'Artificial intelligence', 'Software']).map((label) => {
            const item = label === 'All' ? 'Todos' : label === 'Artificial intelligence' ? 'Inteligencia artificial' : label;
            return (
            <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
              {item === 'Todos'
                ? locale === 'es' ? 'TODOS / 04' : 'ALL / 04'
                : item === 'Software'
                  ? 'SOFTWARE'
                  : locale === 'es' ? 'INTELIGENCIA ARTIFICIAL' : 'ARTIFICIAL INTELLIGENCE'}
            </button>
            );
          })}
        </div>
        <span aria-live="polite">{String(visible.length).padStart(2, '0')} {locale === 'es' ? 'EN ESTA FRECUENCIA' : 'ON THIS FREQUENCY'}</span>
      </div>
      <div className="sig-project-grid grid grid-cols-1 md:grid-cols-2">
        {visible.map((project) => (
          <article className="sig-project" key={project.id}>
            <div className="sig-project-index">
              <span>EXP. {project.number}</span>
              <span>{(locale === 'en' ? projectEnglish[project.id].platform : project.platform).toUpperCase()}</span>
            </div>
            <button
              className="sig-project-preview"
              aria-label={locale === 'es' ? `Abrir proyecto ${project.title}` : `Open ${titleFor(project)} project`}
              onClick={() => setSelected(project)}
            >
              <SignalProjectArt project={project} />
              <span className="sig-project-arrow">
                <ArrowUpRight size={26} />
              </span>
            </button>
            <div className="sig-project-info">
              <div>
                <button onClick={() => setSelected(project)}>
                  <h3>{titleFor(project)}</h3>
                </button>
                <p>{locale === 'en' ? projectEnglish[project.id].description : project.description}</p>
              </div>
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locale === 'es' ? `Código de ${project.title} en GitHub` : `${titleFor(project)} code on GitHub`}
              >
                <Github size={20} />
              </a>
            </div>
            <div className="sig-project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      {selected && (
        <ProjectTransmission
          key={selected.id}
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
