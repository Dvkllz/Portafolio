'use client';
import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  BrainCircuit,
  Check,
  Code2,
  Cpu,
  Gamepad2,
  Plus,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { projects } from '@/data/portfolio';
import { useSiteSettings } from './LocaleThemeProvider';
const ingredients = [
  { id: 'python', name: 'Python', icon: Code2 },
  { id: 'ia', name: 'Inteligencia artificial', icon: BrainCircuit },
  { id: 'hardware', name: 'Hardware', icon: Cpu },
  { id: 'java', name: 'Java', icon: Code2 },
  { id: 'juegos', name: 'Videojuegos', icon: Gamepad2 },
];
const recipes: Record<string, { title: string; description: string; project?: string }> = {
  'ia+python': {
    title: 'Un compañero con personalidad.',
    description:
      'Python + IA se encuentran en Asistente Virtual: una mascota de escritorio con conversación y voz.',
    project: 'assistant',
  },
  'ia+juegos': {
    title: 'Un mundo que responde.',
    description:
      'En Ecos de Nébula, la IA genera patrones y pistas dentro de una aventura construida en Unity.',
    project: 'nebula',
  },
  'hardware+python': {
    title: 'Instrumentación que cobra vida.',
    description:
      'Python y la lógica de un instrumento se encuentran en Master Chronometer: tiempo, telemetría y movimiento en una sola interfaz.',
    project: 'chronometer',
  },
  'hardware+java': {
    title: 'Sistemas que encajan.',
    description:
      'Una combinación para explorar cómo modelar componentes y sus relaciones. Idea de laboratorio; sin proyecto asociado todavía.',
  },
  'ia+java': {
    title: 'Inteligencia con estructura.',
    description:
      'Una idea para explorar aplicaciones Java conectadas a modelos de IA. Combinación experimental; sin proyecto asociado todavía.',
  },
  'juegos+python': {
    title: 'La lógica también juega.',
    description:
      'Una combinación para explorar simulaciones y mecánicas con Python. Idea de laboratorio; sin proyecto publicado todavía.',
  },
};
export default function Skills() {
  const { locale } = useSiteSettings();
  const ingredientNames: Record<string, string> = locale === 'en' ? { python: 'Python', ia: 'Artificial intelligence', hardware: 'Hardware', java: 'Java', juegos: 'Video games' } : {};
  const localizedIngredients = ingredients.map((item) => ({ ...item, name: ingredientNames[item.id] ?? item.name }));
  const [selected, setSelected] = useState<string[]>(['python']);
  const key = [...selected].sort().join('+');
  const recipe =
    selected.length === 2
      ? (recipes[key] ?? {
          title: 'Una nueva posibilidad.',
          description:
            'Estas piezas abren una ruta de exploración. Es una idea de laboratorio, aún sin un proyecto asociado.',
        })
      : null;
  const linked = recipe?.project ? projects.find((p) => p.id === recipe.project) : null;
  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length === 2
          ? [prev[1], id]
          : [...prev, id],
    );
  }
  const labels = locale === 'en'
    ? { section: '06 / THE LAB', hint: 'CURIOSITY IS INTERACTIVE', mode: 'CREATIVE MODE', title: 'Mix pieces.', title2: 'Find ideas.', intro: 'Skills become more interesting', intro2: 'when they start working together.', choose: 'Choose two skills.', discover: 'Discover what they can build.', table: 'CRAFTING TABLE', discovered: 'COMBINATION DISCOVERED', oneMore: 'ONE MORE PIECE…', next: 'Your next piece', starts: 'Everything starts by connecting.', select: 'Select two skills to explore a combination. You can change them whenever you want.' }
    : { section: '06 / EL LABORATORIO', hint: 'LA CURIOSIDAD ES INTERACTIVA', mode: 'MODO CREATIVO', title: 'Mezcla piezas.', title2: 'Encuentra ideas.', intro: 'Las habilidades se vuelven más interesantes', intro2: 'cuando empiezan a trabajar juntas.', choose: 'Elige dos habilidades.', discover: 'Descubre qué pueden construir.', table: 'MESA DE CONSTRUCCIÓN', discovered: 'COMBINACIÓN DESCUBIERTA', oneMore: 'UNA PIEZA MÁS…', next: 'Tu siguiente pieza', starts: 'Todo empieza conectando.', select: 'Selecciona dos habilidades para explorar una combinación. Puedes cambiarlas cuando quieras.' };
  return (
    <section id="laboratorio" className="section lab-section">
      <div className="page-width">
        <div className="section-label">
          <span>{labels.section}</span>
          <span>
            {labels.hint} <Sparkles size={14} />
          </span>
        </div>
        <div className="lab-layout">
          <div>
            <div className="lab-badge">
              <Box size={13} /> {labels.mode}
            </div>
            <h2>
              {labels.title}
              <br />
              <span>{labels.title2}</span>
            </h2>
            <p>
              {labels.intro}
              <br className="desktop-break" /> {labels.intro2}
            </p>
            <div className="lab-instruction">
              <span>01</span> {labels.choose}
              <br />
              <span>02</span> {labels.discover}
            </div>
          </div>
          <div className="crafting-table">
            <div className="crafting-heading">
              <span>{labels.table}</span>
              <button aria-label={locale === 'es' ? 'Reiniciar combinación' : 'Reset combination'} onClick={() => setSelected([])}>
                <RotateCcw size={15} />
              </button>
            </div>
            <div className="ingredients">
              {localizedIngredients.map((item) => (
                <button
                  key={item.id}
                  aria-pressed={selected.includes(item.id)}
                  onClick={() => toggle(item.id)}
                >
                  <item.icon size={19} />
                  {item.name}
                  {selected.includes(item.id) ? <Check size={13} /> : <Plus size={13} />}
                </button>
              ))}
            </div>
            <div className="craft-slots">
              {[0, 1].map((slot) => (
                <div className={`craft-slot ${selected[slot] ? 'filled' : ''}`} key={slot}>
                  {slot === 1 && <Plus className="slot-plus" size={16} />}
                  <Box size={26} />
                  <span>
                    {localizedIngredients.find((i) => i.id === selected[slot])?.name ?? labels.next}
                  </span>
                </div>
              ))}
              <ArrowRight className="craft-arrow" size={22} />
              <span className={`craft-result-icon ${recipe ? 'ready' : ''}`}>
                <Sparkles size={27} />
              </span>
            </div>
            <div className="recipe-result" aria-live="polite">
              <span className="eyebrow">
                {recipe ? labels.discovered : labels.oneMore}
              </span>
              <h3>{recipe ? locale === 'en' ? ({
                'ia+python': 'A companion with personality.',
                'ia+juegos': 'A world that responds.',
                'hardware+python': 'Instrumentation comes alive.',
                'hardware+java': 'Systems that fit together.',
                'ia+java': 'Intelligence with structure.',
                'juegos+python': 'Logic can play too.',
              } as Record<string, string>)[key] ?? 'A new possibility.' : recipe.title : locale === 'es' ? 'Todo empieza conectando.' : 'Everything starts by connecting.'}</h3>
              <p>
                {recipe ? locale === 'en' ? ({
                  'ia+python': 'Python + AI meet in Virtual Assistant: a desktop pet with conversation and voice.',
                  'ia+juegos': 'In Echoes of Nebula, AI generates patterns and clues inside an adventure built in Unity.',
                  'hardware+python': 'Python and instrument logic meet in Master Chronometer: time, telemetry and motion in one interface.',
                  'hardware+java': 'A combination to explore how to model components and their relationships. Lab idea; no project attached yet.',
                  'ia+java': 'An idea for exploring Java applications connected to AI models. Experimental combination; no published project yet.',
                  'juegos+python': 'A combination to explore simulations and mechanics with Python. Lab idea; no published project yet.',
                } as Record<string, string>)[key] ?? 'These pieces open a path for exploration.' : recipe.description : labels.select}
              </p>
              {linked && (
                <a
                  className="text-link"
                  href={linked.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'es' ? 'Explorar' : 'Explore'} {locale === 'en' && linked.id === 'nebula' ? 'Echoes of Nebula' : linked.title}
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
