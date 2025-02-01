import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from '@/i18n.config';

async function loadMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // Fallback to default locale if message loading fails
    return (await import(`../../messages/${defaultLocale}.json`)).default;
  }
}

export default getRequestConfig(async ({ locale }) => {
  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
    timeZone: 'Europe/Lisbon',
    now: new Date()
  };
});