import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eric Swasey | CX & Operations Leader',
  description: 'Customer Experience and Operations leader with a track record of building high-performing support teams, AI-native systems, and measurable improvements in CSAT and efficiency.',
  openGraph: {
    title: 'Eric Swasey | CX & Operations Leader',
    description: 'I build AI products that convert customer signal into measurable impact.',
    type: 'website',
    url: 'https://swasey.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eric Swasey | CX & Operations Leader',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
