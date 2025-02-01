import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { locales } from './config/i18n';
import {requestLocale} from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = await requestLocale();
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'America/Sao_Paulo'
  };
}); 