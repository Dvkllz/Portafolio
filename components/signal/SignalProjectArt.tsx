 'use client';
import { ArrowUpRight, FileText, Sparkles } from 'lucide-react';
import type { Project } from '@/data/portfolio';
import { useSiteSettings } from '@/components/LocaleThemeProvider';

export default function SignalProjectArt({ project }: { project: Project }) {
  const { locale } = useSiteSettings();
  if (project.id === 'cuentai')
    return (
      <div className="sig-project-art sig-art-cuentai" aria-hidden="true">
        <span className="sig-art-caption">{locale === 'es' ? 'DOCUMENTOS → INFORMACIÓN' : 'DOCUMENTS → INSIGHT'}</span>
        <div className="sig-receipt">
          <span>CUENTAI / {locale === 'es' ? 'ARCHIVO DIGITAL' : 'DIGITAL ARCHIVE'}</span>
          <FileText size={26} />
          <strong>
            {locale === 'es' ? 'TODO' : 'EVERYTHING'}
            <br />
            {locale === 'es' ? 'EN ORDEN.' : 'IN ORDER.'}
          </strong>
          <div className="sig-receipt-lines">
            <i />
            <i />
            <i />
          </div>
          <div className="sig-barcode" />
          <small>{locale === 'es' ? 'UNA FACTURA. MENOS FRICCIÓN.' : 'ONE INVOICE. LESS FRICTION.'}</small>
        </div>
        <div className="sig-ai-stamp">
          <Sparkles size={21} />
          <span>
            {locale === 'es' ? 'LEER' : 'READ'}
            <br />
            {locale === 'es' ? 'ENTENDER' : 'UNDERSTAND'}
            <br />
            {locale === 'es' ? 'ORGANIZAR' : 'ORGANIZE'}
          </span>
        </div>
        <div className="sig-document-node">
          AI
          <ArrowUpRight size={22} />
        </div>
        <span className="sig-art-disclaimer">{locale === 'es' ? 'REPRESENTACIÓN CONCEPTUAL' : 'CONCEPTUAL REPRESENTATION'}</span>
      </div>
    );
  if (project.id === 'assistant')
    return (
      <div className="sig-project-art sig-art-assistant" aria-hidden="true">
        <div className="sig-pet-orbits">
          <i />
          <i />
          <i />
        </div>
        <span className="sig-art-caption">{locale === 'es' ? 'UN POCO DE COMPAÑÍA. MUCHA PERSONALIDAD.' : 'A LITTLE COMPANY. A LOT OF PERSONALITY.'}</span>
        <div className="sig-chat-fragment">
          <span>ASISTENTE_VIRTUAL.py</span>
          <p>
            {locale === 'es' ? '¿Y si tu escritorio' : 'What if your desktop'}
            <br />
            {locale === 'es' ? 'tuviera vida?' : 'had a life?'}
          </p>
          <div>● ● ●</div>
        </div>
        <img src="/projects/siamese.png" alt="" width="500" height="500" loading="lazy" />
        <div className="sig-pet-tag">
          <i /> PYTHON + {locale === 'es' ? 'PERSONALIDAD' : 'PERSONALITY'}
        </div>
        <span className="sig-art-disclaimer">{locale === 'es' ? 'SPRITE ORIGINAL DEL PROYECTO' : 'ORIGINAL PROJECT SPRITE'}</span>
      </div>
    );
  if (project.id === 'nebula')
    return (
      <div className="sig-project-art sig-art-nebula" aria-hidden="true">
        <img src="/projects/nebula.png" alt="" width="1600" height="900" loading="lazy" />
        <div className="sig-nebula-reticle">
          <i />
          <i />
        </div>
        <div className="sig-nebula-label">
          <span>{locale === 'es' ? 'MEMORIA / EXPLORACIÓN / IA' : 'MEMORY / EXPLORATION / AI'}</span>
          <strong>
            {locale === 'es' ? 'ECOS DE' : 'ECHOES OF'}
            <br />
            {locale === 'es' ? 'NÉBULA' : 'NEBULA'}
          </strong>
        </div>
        <span className="sig-art-disclaimer">{locale === 'es' ? 'CAPTURA DEL PROYECTO · UNITY' : 'PROJECT CAPTURE · UNITY'}</span>
      </div>
    );
  return (
    <div className="sig-project-art sig-art-auto" aria-hidden="true">
      <span className="sig-art-caption">{locale === 'es' ? 'PRECISIÓN QUE SE PUEDE VER.' : 'PRECISION YOU CAN SEE.'}</span>
      <svg viewBox="0 0 600 340">
        <defs>
          <pattern id="sigChronoGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" stroke="#b8c7a8" opacity=".16" fill="none" />
          </pattern>
        </defs>
        <rect width="600" height="340" fill="url(#sigChronoGrid)" />
        <g fill="none" stroke="#d4f776">
          <circle cx="300" cy="170" r="129" strokeWidth="13" opacity=".12" />
          <circle cx="300" cy="170" r="122" strokeWidth="1.2" />
          <circle cx="300" cy="170" r="103" strokeWidth=".7" strokeDasharray="2 5" />
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={i}
              x1="300"
              y1="62"
              x2="300"
              y2="52"
              strokeWidth="3"
              transform={`rotate(${i * 30} 300 170)`}
            />
          ))}
          <circle cx="253" cy="176" r="25" opacity=".65" />
          <circle cx="347" cy="176" r="25" opacity=".65" />
          <circle cx="300" cy="225" r="25" opacity=".65" />
          <path d="M300 170L264 106M300 170l70-45M300 170l-5 93" strokeWidth="3" />
          <circle cx="300" cy="170" r="7" fill="#d4f776" />
          <path d="M168 170H73M432 170h95M300 41V15M300 299v26" strokeWidth="1" />
        </g>
        <g fontFamily="monospace" fill="#d4f776" textAnchor="middle">
          <text x="95" y="163" fontSize="8" letterSpacing="2">
            STREAMLIT
          </text>
          <text x="505" y="163" fontSize="8" letterSpacing="2">
            60 FPS
          </text>
          <text x="300" y="96" fontSize="10" letterSpacing="3">
            RELOJPRO
          </text>
          <text x="300" y="317" fontSize="8" letterSpacing="2">
            MASTER CHRONOMETER / PYTHON
          </text>
        </g>
      </svg>
      <span className="sig-art-disclaimer">{locale === 'es' ? 'REPRESENTACIÓN DEL PROYECTO' : 'PROJECT REPRESENTATION'}</span>
    </div>
  );
}
