import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DIGENTIC TECH — The DNA of AI Technology | Dinesh T',
  description:
    'DIGENTIC TECH by Dinesh T — AI Engineer and MERN Developer. Courses, digital assets, and insights on AI engineering, LangChain, and full-stack development.',
  openGraph: {
    title: 'DIGENTIC TECH — The DNA of AI Technology',
    description: 'AI Engineer + MERN Developer. Courses, digital assets, and blog by Dinesh T.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen bg-[var(--bg-base)] pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
