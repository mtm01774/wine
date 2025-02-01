import { ReactNode } from 'react';
import { Header } from './Header';

type PageWrapperProps = {
  children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
} 