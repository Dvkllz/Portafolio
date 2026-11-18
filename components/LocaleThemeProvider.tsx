'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export type Locale = 'es' | 'en';
export type Theme = 'light' | 'dark';

const messages: Record<string, { es: string; en: string }> = {
  skipProjects: { es: 'Saltar a los proyectos', en: 'Skip to projects' },
  navHome: { es: 'Inicio', en: 'Home' },
  navAbout: { es: 'Sobre mí', en: 'About me' },
  navProjects: { es: 'Proyectos', en: 'Projects' },
  navTestimonials: { es: 'Testimonios', en: 'Testimonials' },
  navExperience: { es: 'Trayectoria', en: 'Journey' },
  navContact: { es: 'Contacto', en: 'Contact' },
  navLab: { es: 'Laboratorio', en: 'Lab' },
  talk: { es: 'Hablemos', en: "Let's talk" },
  design: { es: 'Diseño', en: 'Design' },
  language: { es: 'Idioma', en: 'Language' },
  theme: { es: 'Cambiar tema', en: 'Change theme' },
  light: { es: 'Modo claro', en: 'Light mode' },
  dark: { es: 'Modo oscuro', en: 'Dark mode' },
  heroEyebrow: { es: 'HOLA, SOY DAVID VELEZ', en: "HI, I'M DAVID VELEZ" },
  heroLine1: { es: 'Las ideas', en: 'Ideas' },
  heroLine2: { es: 'se hacen', en: 'become real' },
  heroLine3: { es: 'construyendo', en: 'by building' },
  exploreProjects: { es: 'Explorar proyectos', en: 'Explore projects' },
  downloadCv: { es: 'Descargar CV', en: 'Download CV' },
  software: { es: 'Software', en: 'Software' },
  ai: { es: 'Inteligencia artificial', en: 'Artificial intelligence' },
  hardware: { es: 'Hardware', en: 'Hardware' },
  scrollExplore: { es: 'DESLIZA PARA EXPLORAR', en: 'SCROLL TO EXPLORE' },
  madeOf: { es: 'HECHO DE CURIOSIDAD, CAFÉ Y CÓDIGO', en: 'MADE OF CURIOSITY, COFFEE AND CODE' },
  aboutLabel: { es: '01 / SOBRE MÍ', en: '01 / ABOUT ME' },
  aboutHint: { es: 'CONOCE AL CONSTRUCTOR', en: 'MEET THE BUILDER' },
  aboutTitle: { es: 'Detrás de cada pieza,', en: 'Behind every piece,' },
  curiosity: { es: 'hay curiosidad.', en: 'there is curiosity.' },
  semester: { es: '5.º semestre', en: '5th semester' },
  experienceYear: { es: '1 año de experiencia', en: '1 year of experience' },
  exploreSkills: { es: 'Explorar habilidades', en: 'Explore skills' },
  projectLabel: { es: '02 / PROYECTOS', en: '02 / PROJECTS' },
  all: { es: 'Todos', en: 'All' },
  projectCount: { es: 'PROYECTOS', en: 'PROJECTS' },
  openProject: { es: 'Explorar proyecto', en: 'Explore project' },
  seeCode: { es: 'Ver código', en: 'View code' },
  result: { es: 'El resultado', en: 'The result' },
  process: { es: 'Cómo está hecho', en: 'How it works' },
  experienceLabel: { es: '04 / TRAYECTORIA', en: '04 / JOURNEY' },
  academic: { es: 'Académica', en: 'Academic' },
  work: { es: 'Laboral', en: 'Work' },
  contactLabel: { es: '05 / CONTACTO', en: '05 / CONTACT' },
  copyEmail: { es: 'Copiar correo', en: 'Copy email' },
  copiedEmail: { es: 'Correo copiado', en: 'Email copied' },
  sendMessage: { es: 'Preparar mensaje', en: 'Prepare message' },
  labLabel: { es: '06 / EL LABORATORIO', en: '06 / THE LAB' },
  creativeMode: { es: 'MODO CREATIVO', en: 'CREATIVE MODE' },
  lightMode: { es: 'Activar modo claro', en: 'Switch to light mode' },
  darkMode: { es: 'Activar modo oscuro', en: 'Switch to dark mode' },
  worldBuilding: { es: 'MI MUNDO EN CONSTRUCCIÓN', en: 'MY WORLD UNDER CONSTRUCTION' },
  mainNavigation: { es: 'Navegación principal', en: 'Main navigation' },
  openMenu: { es: 'Abrir menú', en: 'Open menu' },
  closeMenu: { es: 'Cerrar menú', en: 'Close menu' },
};

type SettingsContextValue = {
  locale: Locale;
  theme: Theme;
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
  t: (key: string) => string;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function useSiteSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useSiteSettings must be used inside SiteSettingsProvider');
  return value;
}

export default function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>('es');
  const [theme, setTheme] = useState<Theme>(pathname.startsWith('/frecuencia') ? 'dark' : 'light');

  useEffect(() => {
    const savedLocale = window.localStorage.getItem('portfolio-locale');
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedLocale === 'es' || savedLocale === 'en') setLocaleState(savedLocale);
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-locale', locale);
    window.localStorage.setItem('portfolio-theme', theme);
  }, [locale, theme]);

  const value = useMemo<SettingsContextValue>(
    () => ({
      locale,
      theme,
      setLocale: setLocaleState,
      toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
      t: (key) => messages[key]?.[locale] ?? key,
    }),
    [locale, theme],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
