'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Wine, Award, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('About');

  const features = [
    {
      icon: Wine,
      title: t('features.selection.title'),
      description: t('features.selection.description'),
    },
    {
      icon: Award,
      title: t('features.quality.title'),
      description: t('features.quality.description'),
    },
    {
      icon: Users,
      title: t('features.community.title'),
      description: t('features.community.description'),
    },
    {
      icon: Globe,
      title: t('features.worldwide.title'),
      description: t('features.worldwide.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A393E] pt-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#ECE5D5] mb-4">{t('title')}</h1>
            <p className="text-[#ECE5D5]/80 max-w-2xl mx-auto">{t('description')}</p>
          </div>

          {/* Story Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[#ECE5D5] mb-4">{t('story.title')}</h2>
            <p className="text-[#ECE5D5]/80">{t('story.content')}</p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <span className="block text-[#F7EC73] text-3xl font-bold mb-2">10+</span>
              <span className="text-[#ECE5D5]/60 text-sm">{t('stats.years')}</span>
            </div>
            <div className="text-center">
              <span className="block text-[#F7EC73] text-3xl font-bold mb-2">5000+</span>
              <span className="text-[#ECE5D5]/60 text-sm">{t('stats.clients')}</span>
            </div>
            <div className="text-center">
              <span className="block text-[#F7EC73] text-3xl font-bold mb-2">500+</span>
              <span className="text-[#ECE5D5]/60 text-sm">{t('stats.wines')}</span>
            </div>
            <div className="text-center">
              <span className="block text-[#F7EC73] text-3xl font-bold mb-2">20+</span>
              <span className="text-[#ECE5D5]/60 text-sm">{t('stats.regions')}</span>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#0D1C1F] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#ECE5D5] mb-3">{t('features.selection.title')}</h3>
              <p className="text-[#ECE5D5]/80">{t('features.selection.description')}</p>
            </div>
            <div className="bg-[#0D1C1F] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#ECE5D5] mb-3">{t('features.quality.title')}</h3>
              <p className="text-[#ECE5D5]/80">{t('features.quality.description')}</p>
            </div>
            <div className="bg-[#0D1C1F] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#ECE5D5] mb-3">{t('features.community.title')}</h3>
              <p className="text-[#ECE5D5]/80">{t('features.community.description')}</p>
            </div>
            <div className="bg-[#0D1C1F] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#ECE5D5] mb-3">{t('features.worldwide.title')}</h3>
              <p className="text-[#ECE5D5]/80">{t('features.worldwide.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 