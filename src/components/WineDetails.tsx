'use client';

import { useTranslations } from 'next-intl';
import { Star, Package, ArrowLeft, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { WineType } from '@/types/wine';

interface WineDetailsProps {
  wine: WineType;
  locale: string;
}

export function WineDetails({ wine, locale }: WineDetailsProps) {
  const t = useTranslations('Store');
  const translation = wine.translations.find(t => t.locale === locale) || wine.translations[0];

  return (
    <div className="min-h-screen bg-[#1A393E] pt-24">
      <div className="container-custom">
        {/* Back button */}
        <Link 
          href="/store"
          className="inline-flex items-center gap-2 text-[#ECE5D5] hover:text-[#F7EC73] transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={20} />
          <span>{t('backToStore')}</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0D1C1F]">
            <Image
              src={wine.image || '/images/wine-placeholder.jpg'}
              alt={translation.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover transition-opacity duration-300"
              loading="eager"
              quality={90}
            />
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Header Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#ECE5D5]/60 text-sm">{wine.type} • {wine.year}</span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-[#F7EC73] fill-[#F7EC73]" />
                  <span className="text-[#ECE5D5]/60 text-sm">{wine.rating}</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-[#ECE5D5] mb-2">{translation.name}</h1>
              <p className="text-[#ECE5D5]/60 text-lg">{wine.region}, Portugal</p>
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#0D1C1F] flex items-center justify-center">
                <Package size={24} className="text-[#F7EC73]" />
              </div>
              <div>
                <p className="text-[#ECE5D5]/60 text-sm">{t('wineDetails.stock')}</p>
                <p className="text-[#ECE5D5]">{wine.stock} {t('wineDetails.units')}</p>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <h2 className="text-xl font-bold text-[#ECE5D5] mb-3">{t('wineDetails.description')}</h2>
              <p className="text-[#ECE5D5]/80 leading-relaxed">{translation.description}</p>
            </div>

            {/* Preço e Botão */}
            <div className="flex items-center justify-between pt-6 border-t border-[#ECE5D5]/10">
              <div>
                <p className="text-[#ECE5D5]/60 text-sm mb-1">{t('wineDetails.price')}</p>
                <p className="text-[#F7EC73] text-3xl font-bold">€{Number(wine.price).toFixed(2)}</p>
              </div>
              <button 
                className="bg-[#F7EC73] text-[#1A393E] px-8 py-4 rounded-lg flex items-center gap-3 hover:bg-[#F7EC73]/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={wine.stock === 0}
              >
                <ShoppingCart size={20} />
                <span className="font-medium">
                  {wine.stock > 0 ? t('wineDetails.addToCart') : t('wineDetails.outOfStock')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 