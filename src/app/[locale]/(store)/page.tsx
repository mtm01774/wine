import { Locale } from '@/i18n.config';
import { HomePage } from '@/components';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: Locale };
};

export default async function StorePage({ params }: Props) {
  setRequestLocale(params.locale);
  return <HomePage locale={params.locale} />;
} 