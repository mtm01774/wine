'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { Locale } from '@/i18n.config';

type LocaleProviderProps = {
  locale: Locale;
  messages: Record<string, any>;
  children: ReactNode;
};

export function LocaleProvider({ locale, messages, children }: LocaleProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}