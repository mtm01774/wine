'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/navigation';

export function Providers({
  locale,
  messages,
  children
}: {
  locale: string;
  messages: any;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      onError={(error) => {
        if (error.code === 'MISSING_MESSAGE') {
          console.warn('Missing message:', error.message);
          return error.message;
        }
        throw error;
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
} 