import './globals.css';

export const metadata = {
  title: 'Quiz App',
  description: 'A fun PWA quiz built with Next.js',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="apple-touch-icon" href="#" />
      </head>
      <body>{children}</body>
    </html>
  );
}
