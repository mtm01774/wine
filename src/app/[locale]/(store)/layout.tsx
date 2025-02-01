'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/contexts/CartContext';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
} 