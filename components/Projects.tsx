'use client';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Box, Code2, ExternalLink, Layers3 } from 'lucide-react';
import { Github } from './BrandIcons';
import { projects, projectEnglish, type Project } from '@/data/portfolio';
import ProjectArt from './ProjectArt';
import Dialog from './Dialog';
import { useSiteSettings } from './LocaleThemeProvider';

function ProjectDetail({ project, close }: { project: Project; close: () => void }) {
  const [view, setView] = useState<'result' | 'process'>('result');
  const { t, locale } = useSiteSettings();
  const copy = locale === 'en' ? projectEnglish[project.id] : project;
  return (
    <Dialog title={locale === 'en' && project.id === 'nebula' ? 'Echoes of Nebula' : project.title} onClose={close}>
      <div className="detail-tags">
        {project.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="segmented detail-tabs" aria-label={locale === 'es' ? 'Vista del proyecto' : 'Project view'}>
        <button aria-pressed={view === 'result'} onClick={() => setView('result')}>
          <Box size={15} /> {t('result')}
        </button>
        <button aria-pressed={view === 'process'} onClick={() => setView('process')}>
          <Layers3 size={15} /> {t('process')}
        </button>
      </div>
      {view === 'result' ? (
        <div className="detail-result">
          <ProjectArt kind={project.illustration} />
          <h3>{locale === 'es' ? 'La idea' : 'The idea'}</h3>
          <p>{copy.problem}</p>
          <p className="platform-note">{copy.platform}</p>
        </div>
      ) : (
        <div className="process-view">
          <span className="eyebrow">{locale === 'es' ? 'PIEZA A PIEZA' : 'PIECE BY PIECE'}</span>
          <ol>
            {copy.process.map((step, i) => (
              <li key={step}>
                <span>0{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <div className="learning">
            <Code2 size={20} />
            <div>
              <h3>{locale === 'es' ? 'Una decisión que importa' : 'A decision that matters'}</h3>
              <p>{copy.learning}</p>
            </div>
          </div>
        </div>
      )}
      <div className="detail-links">
        <a
          className="button primary"
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={17} /> {t('seeCode')} <ArrowUpRight size={16} />
        </a>
        {project.demo ? (
          <a
            className="button secondary"
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            {locale === 'es' ? 'Demo en vivo' : 'Live demo'} <ExternalLink size={16} />
          </a>
        ) : (
          <span className="demo-pending">{locale === 'es' ? 'Demo pública por añadir' : 'Public demo coming soon'}</span>
        )}
      </div>
    </Dialog>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<Project | null>(null);
  const { t, locale } = useSiteSettings();
  const filters = locale === 'en' ? ['All', 'Artificial intelligence', 'Software'] : ['Todos', 'Inteligencia artificial', 'Software'];
  const filterValue = (label: string) => label === 'All' || label === 'Todos' ? 'Todos' : label === 'Artificial intelligence' ? 'Inteligencia artificial' : label;
  const titleFor = (project: Project) => locale === 'en' && project.id === 'nebula' ? 'Echoes of Nebula' : project.title;
  const visible = projects.filter((p) => filter === 'Todos' || p.category === filter);
  return (
    <section id="proyectos" className="section projects-section">
      <div className="page-width">
        <div className="section-label">
          <span>{t('projectLabel')}</span>
          <span>
            {locale === 'es' ? 'DEL «¿Y SI…?» AL «AQUÍ ESTÁ»' : 'FROM «WHAT IF…?» TO «HERE IT IS»'} <ArrowUpRight size={14} />
          </span>
        </div>
        <div className="section-heading">
          <div>
            <h2>
              {locale === 'es' ? 'Ideas que ya' : 'Ideas that already'}
              <br />
              <span className="muted-heading">{locale === 'es' ? 'tienen forma.' : 'have shape.'}</span>
            </h2>
          </div>
          <div className="projects-intro">
            <p>
              {locale === 'es' ? 'Cuatro maneras de conectar lo que sé' : 'Four ways to connect what I know'}
              <br className="desktop-break" /> {locale === 'es' ? 'con lo que me gusta construir.' : 'with what I like to build.'}
            </p>
            <a
              className="text-link"
              href="https://github.com/Dvkllz"
              target="_blank"
              rel="noopener noreferrer"
            >
              {locale === 'es' ? 'Mi universo en GitHub' : 'My universe on GitHub'} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="project-toolbar">
          <div className="filters" aria-label={locale === 'es' ? 'Filtrar proyectos' : 'Filter projects'}>
            {filters.map((label) => (
              <button key={label} onClick={() => setFilter(filterValue(label))} aria-pressed={filter === filterValue(label)}>
                {label}
                {filterValue(label) === 'Todos' && <span>04</span>}
              </button>
            ))}
          </div>
          <span className="project-count" aria-live="polite">
            {String(visible.length).padStart(2, '0')} {t('projectCount')}
          </span>
        </div>
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2">
          {visible.map((project) => (
            <article className={`project-card ${project.color}`} key={project.id}>
              <button
                className="project-image-button"
                aria-label={locale === 'es' ? `Explorar ${project.title}` : `Explore ${titleFor(project)}`}
                onClick={() => setSelected(project)}
              >
                <ProjectArt kind={project.illustration} />
                <span className="project-open">
                  <ArrowUpRight size={22} />
                </span>
              </button>
              <div className="project-card-content">
                <div className="project-title">
                  <h3>
                    <button onClick={() => setSelected(project)}>{titleFor(project)}</button>
                  </h3>
                  <span>{project.number}</span>
                </div>
                <p>{locale === 'en' ? projectEnglish[project.id].description : project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-card-footer">
                  <button onClick={() => setSelected(project)}>
                    {t('openProject')} <ArrowRight size={15} />
                  </button>
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={locale === 'es' ? `Repositorio de ${project.title} en GitHub` : `${titleFor(project)} repository on GitHub`}
                  >
                    <Github size={17} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selected && (
        <ProjectDetail key={selected.id} project={selected} close={() => setSelected(null)} />
      )}
    </section>
  );
}
