import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <Header />
      <main className="pt-[72px] min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
} 