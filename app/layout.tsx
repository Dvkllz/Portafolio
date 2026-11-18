import type { Metadata } from 'next';
import './globals.css';
import './design-switch.css';
import SiteSettingsProvider from '@/components/LocaleThemeProvider';

export const metadata: Metadata = {
  title: 'David Velez · Software, IA y Hardware',
  description:
    'El mundo de David Velez: ingeniería de software, inteligencia artificial y hardware. Explora proyectos, habilidades e ideas, bloque a bloque.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <SiteSettingsProvider>{children}</SiteSettingsProvider>
      </body>
    </html>
  );
}
