'use client';

import { Plans } from "@/components/Plans";
import { useTranslations } from 'next-intl';

export default function PlansPage() {
  const t = useTranslations('Products');

  return (
    <div className="min-h-screen bg-[#1A393E] pt-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#ECE5D5] mb-4">{t('title')}</h1>
          <p className="text-[#ECE5D5]/80 max-w-2xl mx-auto">{t('description')}</p>
        </div>
        <Plans />
      </div>
    </div>
  );
} 