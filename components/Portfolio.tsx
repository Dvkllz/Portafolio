'use client';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Experience from './Experience';
import Contact from './Contact';
import Skills from './Skills';
import Footer from './Footer';
import { useSiteSettings } from './LocaleThemeProvider';

export default function Portfolio() {
  const { t } = useSiteSettings();
  return (
    <>
      <a className="skip-link" href="#proyectos">
        {t('skipProjects')}
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Experience />
        <Contact />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
