import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/700.css';
import './globals.css';


export const metadata: Metadata = {
  title: 'CREST - Learn | Build | Compete',
  description: 'Robotics & Artificial Intelligence Club exploring Real-world Technology.',
};

import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-inter bg-black text-white antialiased selection:bg-cyan-500/30">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
