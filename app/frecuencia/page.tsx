import type { Metadata } from 'next';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import SignalPortfolio from '@/components/signal/SignalPortfolio';
import './signal.css';

export const metadata: Metadata = {
  title: 'FRECUENCIA — David Velez',
  description:
    'Software, inteligencia artificial y hardware en otra frecuencia. Explora la estación creativa de David Velez.',
  icons: { icon: '/signal-icon.svg' },
};

export default function FrequencyPage() {
  return <SignalPortfolio />;
}
