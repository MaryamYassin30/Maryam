import './globals.css';
import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'You need, I can',
  description: 'Local help. Real people. Prices upfront.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <footer className="border-t border-gray-200 bg-white mt-10">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 grid gap-2 md:flex md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} You need, I can</div>
            <div className="flex gap-4">
              <a className="hover:underline" href="#">Terms</a>
              <a className="hover:underline" href="#">Privacy</a>
              <a className="hover:underline" href="#">Safety</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}