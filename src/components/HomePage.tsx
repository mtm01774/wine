'use client';

import { useTranslations } from 'next-intl';
import { Locale } from '@/i18n.config';
import { Hero } from './Hero';
import { Plans } from './Plans';

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const t = useTranslations('Index');

  return (
    <>
      <Hero />
      <div className="text-[#ECE5D5] text-center pt-24">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl">{t('description')}</p>
      </div>
      <Plans />
    </>
  );
}