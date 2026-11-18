/** Fuente de contenido. null oculta enlaces que aún no se han proporcionado. */
export const profile = {
  name: 'David Velez',
  initials: 'DV',
  role: 'Ingeniería de software · IA · Hardware',
  description:
    'Conecto software, inteligencia artificial y hardware para convertir problemas en soluciones. Una idea, una pieza y una línea de código a la vez.',
  about:
    'Soy David Velez, estudiante de quinto semestre de Ingeniería de Software. Me gusta entender cómo funcionan las cosas: desde el código que las mueve hasta los componentes que les dan vida. Tengo conocimientos en machine learning, inteligencia artificial, C, Python y Java, además de experiencia en mantenimiento, reparación y construcción de hardware.',
  location: null as string | null,
  education: 'Ingeniería de software · 5.º semestre',
  email: 'josue.guerrerov@campusucc.edu.co',
  github: 'https://github.com/Dvkllz',
  linkedin: null as string | null,
  cvUrl: '/cv-david-velez.pdf',
  photoUrl: '/david-velez.jpg',
  personalized: true,
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: 'Inteligencia artificial' | 'Software';
  description: string;
  tags: string[];
  color: string;
  illustration: 'cuentai' | 'assistant' | 'nebula' | 'chronometer';
  problem: string;
  process: string[];
  learning: string;
  repository: string;
  demo: string | null;
  platform: string;
  isExample: boolean;
};

export const projects: Project[] = [
  {
    id: 'cuentai',
    number: '01',
    title: 'CuentAI',
    category: 'Inteligencia artificial',
    description:
      'Facturas en orden. Una app que conecta documentos, vencimientos e inteligencia artificial.',
    tags: ['TypeScript', 'React', 'IA', 'Android'],
    color: 'sage',
    illustration: 'cuentai',
    problem:
      'Organizar facturas y obligaciones en pesos colombianos, con una forma más sencilla de registrar y consultar la información.',
    process: [
      'Captura de documentos y extracción con IA, seguida de revisión antes de guardar.',
      'Calendario, búsqueda, registro de pagos y visualización de categorías.',
      'Almacenamiento local, respaldo y una versión Android con Capacitor.',
    ],
    learning:
      'La información extraída se revisa antes de guardarse. El registro manual sigue disponible y la aplicación distingue los datos de ejemplo de los reales.',
    repository: 'https://github.com/Dvkllz/CuentAI',
    demo: null,
    platform: 'Web y Android',
    isExample: false,
  },
  {
    id: 'assistant',
    number: '02',
    title: 'Asistente Virtual',
    category: 'Inteligencia artificial',
    description:
      'Un compañero de escritorio con personalidad, voz y un pequeño mundo de interacciones.',
    tags: ['Python', 'PyQt6', 'IA'],
    color: 'lavender',
    illustration: 'assistant',
    problem:
      'Explorar una interacción más cercana con un asistente: una mascota que vive en el escritorio y acompaña las sesiones de trabajo.',
    process: [
      'Ventana transparente y personajes animados con Python y PyQt6.',
      'Física, arrastre, caricias y estados de reposo o movimiento.',
      'Conversación, voz, elección de mascota y modo de concentración.',
    ],
    learning:
      'Las interacciones locales funcionan sin llamadas a IA. Cada mascota tiene su propia personalidad y conserva las preferencias compartidas.',
    repository: 'https://github.com/Dvkllz/AsistenteVirtual',
    demo: null,
    platform: 'Escritorio · Windows',
    isExample: false,
  },
  {
    id: 'nebula',
    number: '03',
    title: 'Ecos de Nébula',
    category: 'Inteligencia artificial',
    description: 'Una aventura 3D de memoria, runas y mundos suspendidos, construida en Unity.',
    tags: ['Unity', 'C#', 'IA'],
    color: 'midnight',
    illustration: 'nebula',
    problem:
      'Conectar exploración, memoria y combate en una aventura con patrones generados y un modo local sin conexión.',
    process: [
      'Escenarios y mecánicas de juego en Unity con C#.',
      'Runas, guardianes, expediciones y progresión guardada localmente.',
      'Puente de IA con validación de respuestas y retorno al generador local.',
    ],
    learning:
      'Las reglas validan los patrones de la IA y calculan la solución en código. El juego mantiene una alternativa local si la generación no está disponible.',
    repository: 'https://github.com/Dvkllz/JuegoDefinitivo',
    demo: null,
    platform: 'Videojuego · Windows',
    isExample: false,
  },
  {
    id: 'chronometer',
    number: '04',
    title: 'Master Chronometer',
    category: 'Software',
    description:
      'Un cronógrafo analógico interactivo con telemetría, calendario y relojes mundiales.',
    tags: ['Python', 'Streamlit', 'JavaScript', 'CSS'],
    color: 'peach',
    illustration: 'chronometer',
    problem:
      'Construir una experiencia de alta relojería digital que represente el tiempo con precisión y una interfaz visual detallada.',
    process: [
      'Interfaz principal y panel de telemetría construidos con Python y Streamlit.',
      'Cronógrafo renderizado con HTML, CSS y SVG, incluyendo bisel, subesferas y 300 marcas.',
      'Movimiento continuo de manecillas con JavaScript y estaciones globales calculadas con zonas horarias.',
    ],
    learning:
      'La geometría, la animación y los datos pueden trabajar juntos para convertir una interfaz técnica en una experiencia visual.',
    repository: 'https://github.com/Dvkllz/reloj1',
    demo: null,
    platform: 'Aplicación web · Streamlit',
    isExample: false,
  },
];

export const projectEnglish: Record<string, Pick<Project, 'description' | 'problem' | 'process' | 'learning' | 'platform'>> = {
  cuentai: {
    description: 'Invoices in order. An app that connects documents, due dates and artificial intelligence.',
    problem: 'Organize invoices and obligations in Colombian pesos with a simpler way to record and consult information.',
    process: [
      'Document capture and AI extraction, followed by a review before saving.',
      'Calendar, search, payment records and category views.',
      'Local storage, backup and an Android version powered by Capacitor.',
    ],
    learning: 'Extracted information is reviewed before it is saved. Manual entry remains available and the app distinguishes sample data from real data.',
    platform: 'Web and Android',
  },
  assistant: {
    description: 'A desktop companion with personality, voice and a small world of interactions.',
    problem: 'Explore a closer interaction with an assistant: a pet that lives on the desktop and accompanies work sessions.',
    process: [
      'Transparent window and animated characters with Python and PyQt6.',
      'Physics, dragging, petting and idle or moving states.',
      'Conversation, voice, pet selection and focus mode.',
    ],
    learning: 'Local interactions work without AI calls. Each pet has its own personality and keeps shared preferences.',
    platform: 'Desktop · Windows',
  },
  nebula: {
    description: 'A 3D adventure of memory, runes and suspended worlds, built in Unity.',
    problem: 'Connect exploration, memory and combat in an adventure with generated patterns and an offline local mode.',
    process: [
      'Scenes and game mechanics in Unity with C#.',
      'Runes, guardians, expeditions and locally saved progression.',
      'AI bridge with response validation and fallback to the local generator.',
    ],
    learning: 'Rules validate AI patterns and calculate the solution in code. The game keeps a local alternative when generation is unavailable.',
    platform: 'Video game · Windows',
  },
  chronometer: {
    description: 'An interactive analog chronograph with telemetry, calendar and world clocks.',
    problem: 'Build a high-watchmaking digital experience that represents time with precision and a detailed visual interface.',
    process: [
      'Main interface and telemetry panel built with Python and Streamlit.',
      'Chronograph rendered with HTML, CSS and SVG, including bezel, subdials and 300 markers.',
      'Continuous hand movement with JavaScript and global stations calculated with time zones.',
    ],
    learning: 'Geometry, animation and data can work together to turn a technical interface into a visual experience.',
    platform: 'Web application · Streamlit',
  },
};

export type Experience = {
  title: string;
  organization: string;
  dates: string;
  description: string;
};
export const experience: { academic: Experience[]; work: Experience[] } = {
  academic: [
    {
      title: 'Ingeniería de software',
      organization: 'Formación universitaria',
      dates: '5.º semestre · En curso',
      description:
        'Desarrollo de software, programación y exploración de soluciones con inteligencia artificial.',
    },
  ],
  work: [
    {
      title: 'IEPF',
      organization: 'Experiencia laboral',
      dates: '20 de febrero de 2025 — Actualidad',
      description: 'Experiencia laboral en curso.',
    },
  ],
};
export type Testimonial = { name: string; relation: string; text: string; textEn?: string; initials: string };
export const testimonials: Testimonial[] = [
  {
    name: 'Juan Esteban Cabrera',
    relation: 'Ingeniero de Sistemas',
    initials: 'JEC',
    textEn: 'I have had the opportunity to accompany Josué David throughout his academic training in Software Engineering, where he has shown a constant interest in acquiring new knowledge and strengthening both his technical and professional skills. Throughout this process, he has stood out for his curiosity, commitment to learning and willingness to take on new challenges.\n\nHe is a proactive, creative and persevering student, with a special interest in software development, technological innovation and finding solutions to real problems. His initiative to explore new tools, develop projects and put his knowledge into practice reflects his motivation to grow professionally. I believe these qualities, together with his adaptability and desire to improve, will be fundamental to his performance and development as a future software engineer.',
    text: 'He tenido la oportunidad de acompañar a Josué David durante su proceso de formación académica en Ingeniería de Software, donde ha demostrado un interés constante por adquirir nuevos conocimientos y fortalecer sus habilidades tanto técnicas como profesionales. A lo largo de este proceso, se ha destacado por su curiosidad, compromiso con el aprendizaje y disposición para enfrentar nuevos retos.\n\nSe caracteriza por ser un estudiante proactivo, creativo y perseverante, con especial interés en el desarrollo de software, la innovación tecnológica y la búsqueda de soluciones a problemas reales. Su iniciativa para explorar nuevas herramientas, desarrollar proyectos y llevar sus conocimientos a la práctica refleja su motivación por crecer profesionalmente. Considero que estas cualidades, junto con su capacidad de adaptación y deseo de superación, serán fundamentales para su desempeño y desarrollo como futuro ingeniero de software.',
  },
  {
    name: 'Melina Nahiara Hopchak',
    relation: 'Ingeniera de Sistemas',
    initials: 'MNH',
    textEn: 'During the time I have accompanied Josué David in his training as a Software Engineering student, I have noticed that he always shows interest in learning new things and continuing to improve his knowledge. He stands out as a curious, responsible person who wants to grow, with a positive attitude toward learning and facing new challenges.\n\nI also consider him a creative, persevering student with initiative of his own. He has a particular interest in programming, software development and new technologies. He is eager to try new tools, build projects and apply what he learns to practical situations. I believe his commitment, desire to keep growing and ability to adapt will help him develop into a strong professional in Software Engineering.',
    text: 'Durante el tiempo que he podido acompañar a Josué David en su formación como estudiante de Ingeniería de Software, he notado que siempre muestra interés por aprender cosas nuevas y seguir mejorando sus conocimientos. Se destaca por ser una persona curiosa, responsable y con ganas de superarse, además de tener buena predisposición para aprender y enfrentar nuevos desafíos.\n\nTambién considero que es un estudiante creativo, perseverante y con iniciativa propia. Tiene un interés particular por la programación, el desarrollo de software y las nuevas tecnologías. Se muestra interesado en probar nuevas herramientas, realizar proyectos y aplicar lo que va aprendiendo en situaciones prácticas. Creo que su compromiso, sus ganas de seguir creciendo y su capacidad para adaptarse a diferentes situaciones son cualidades importantes que le van a permitir desarrollarse y convertirse en un buen profesional dentro del área de Ingeniería de Software.',
  },
  {
    name: 'Álvaro Ivan Guerrero',
    relation: 'Ingeniero Civil',
    initials: 'AIG',
    textEn: 'Josué David has demonstrated a way of thinking oriented toward analysis, creativity and problem solving. His interest in understanding how technologies work and exploring different ways to apply them shows an investigative attitude and a vision that goes beyond simply completing academic activities.\n\nOne of his most notable qualities is the initiative he shows when turning ideas into concrete projects, facing challenges with determination and constantly seeking new learning opportunities. His ability to question, propose and experiment with different solutions reflects a profile with strong potential in software engineering. I am convinced that his autonomy, critical thinking and enthusiasm for technology will allow him to contribute meaningfully to the academic and professional environments in which he participates.',
    text: 'Josué David ha demostrado una manera de pensar orientada al análisis, la creatividad y la resolución de problemas. Su interés por comprender el funcionamiento de las tecnologías y explorar diferentes alternativas para aplicarlas evidencia una actitud investigativa y una visión que va más allá del cumplimiento de las actividades académicas.\n\nUno de sus aspectos más destacables es la iniciativa que demuestra al transformar sus ideas en proyectos concretos, enfrentando los desafíos con determinación y buscando constantemente nuevas oportunidades de aprendizaje. Su capacidad para cuestionar, proponer y experimentar con distintas soluciones refleja un perfil con potencial para desenvolverse en el campo de la ingeniería de software. Estoy convencido de que su autonomía, pensamiento crítico y entusiasmo por la tecnología le permitirán aportar de manera significativa a los entornos académicos y profesionales en los que participe.',
  },
];

export const navigation = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'experiencia', label: 'Trayectoria' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'laboratorio', label: 'Laboratorio' },
];
