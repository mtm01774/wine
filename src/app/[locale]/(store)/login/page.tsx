import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import LoginForm from './login-form';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Auth' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Error loading messages:', error);
    // Fallback to default messages if there's an error
    messages = (await import('@/messages/pt.json')).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LoginForm />
    </NextIntlClientProvider>
  );
} 