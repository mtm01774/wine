import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales } from '@/i18n.config';
import '@/app/globals.css';

async function getMessages(locale: string) {
  try {
    if (!locales.includes(locale as any)) {
      notFound();
    }
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const messages = await getMessages(locale);

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Lisbon">
          <main className="min-h-screen bg-[#1A393E] font-sans antialiased">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}