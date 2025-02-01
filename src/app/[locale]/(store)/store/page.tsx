'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { WineType } from '@/types/wine';
import { WineCard } from '@/components/WineCard';
import { Search, Wine, Filter } from 'lucide-react';

export default function StorePage() {
  const t = useTranslations('Store');
  const params = useParams();
  const locale = params.locale as string;

  const [wines, setWines] = useState<WineType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedRegion, setSelectedRegion] = useState('todas');
  const [selectedPrice, setSelectedPrice] = useState('todos');

  useEffect(() => {
    loadWines();
  }, [locale, selectedType, selectedRegion, selectedPrice]);

  async function loadWines() {
    try {
      let url = `/${locale}/api/wines?`;
      
      if (selectedType !== 'todos') url += `&type=${selectedType}`;
      if (selectedRegion !== 'todas') url += `&region=${selectedRegion}`;
      
      if (selectedPrice !== 'todos') {
        const [min, max] = selectedPrice.split('-');
        if (min) url += `&minPrice=${min}`;
        if (max) url += `&maxPrice=${max}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to load wines');
      
      const data = await response.json();
      setWines(data.wines);
    } catch (err) {
      setError('Error loading wines');
      console.error('Error loading wines:', err);
    } finally {
      setLoading(false);
    }
  }

  // Filter wines based on search term
  const filteredWines = wines.filter(wine => {
    const translation = wine.translations.find(t => t.locale === locale) || wine.translations[0];
    return translation.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#1A393E] pt-24">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Wine size={32} className="text-[#F7EC73]" />
          <h1 className="text-4xl font-bold text-[#ECE5D5]">{t('title')}</h1>
        </div>

        <p className="text-[#ECE5D5]/80 max-w-2xl mb-12">{t('description')}</p>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ECE5D5]/60" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-12 pr-4 py-3 bg-[#0D1C1F] border border-[#ECE5D5]/20 rounded-lg text-[#ECE5D5] placeholder-[#ECE5D5]/60 focus:outline-none focus:border-[#F7EC73]"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-[#0D1C1F] border border-[#ECE5D5]/20 rounded-lg text-[#ECE5D5] focus:outline-none focus:border-[#F7EC73]"
            >
              <option value="todos">{t('filters.type.all')}</option>
              <option value="red">{t('filters.type.red')}</option>
              <option value="white">{t('filters.type.white')}</option>
              <option value="rose">{t('filters.type.rose')}</option>
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-3 bg-[#0D1C1F] border border-[#ECE5D5]/20 rounded-lg text-[#ECE5D5] focus:outline-none focus:border-[#F7EC73]"
            >
              <option value="todos">{t('filters.price.all')}</option>
              <option value="0-20">{t('filters.price.upTo20')}</option>
              <option value="20-50">{t('filters.price.20to50')}</option>
              <option value="50-100">{t('filters.price.50to100')}</option>
              <option value="100+">{t('filters.price.above100')}</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-[#F7EC73] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Wines Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWines.map(wine => {
              const translation = wine.translations.find(t => t.locale === locale) || wine.translations[0];
              return (
                <WineCard
                  key={wine.id}
                  wine={{
                    id: wine.id,
                    name: translation.name,
                    region: wine.region,
                    price: Number(wine.price),
                    image: wine.image || '/images/wine-placeholder.jpg'
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 