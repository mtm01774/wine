'use client';

import { Link } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Wine } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();

  return (
    <footer className="bg-[#1A393E] text-[#ECE5D5] py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h4 className="text-h3 font-bold mb-6">{t('about.title')}</h4>
            <p className="text-[#ECE5D5]/80 text-sm leading-relaxed">
              {t('about.description')}
            </p>
          </div>

          <div>
            <h4 className="text-h3 font-bold mb-6">{t('quickLinks.title')}</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/store" className="text-[#ECE5D5]/80 hover:text-[#F7EC73] transition-colors duration-200 text-sm">
                  {t('quickLinks.store')}
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-[#ECE5D5]/80 hover:text-[#F7EC73] transition-colors duration-200 text-sm">
                  {t('quickLinks.plans')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#ECE5D5]/80 hover:text-[#F7EC73] transition-colors duration-200 text-sm">
                  {t('quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#ECE5D5]/80 hover:text-[#F7EC73] transition-colors duration-200 text-sm">
                  {t('quickLinks.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-h3 font-bold mb-6">{t('contact.title')}</h4>
            <ul className="space-y-4">
              <li className="text-[#ECE5D5]/80 text-sm">
                {t('contact.email')}
              </li>
              <li className="text-[#ECE5D5]/80 text-sm">
                {t('contact.phone')}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-h3 font-bold mb-6">{t('newsletter.title')}</h4>
            <p className="text-[#ECE5D5]/80 text-sm mb-4">
              {t('newsletter.description')}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-2 bg-[#ECE5D5]/10 border border-[#ECE5D5]/20 rounded-lg text-[#ECE5D5] text-sm focus:outline-none focus:border-[#F7EC73] transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#F7EC73] text-[#1A393E] rounded-lg font-medium text-sm hover:bg-[#F7EC73]/90 transition-colors"
              >
                {t('newsletter.submit')}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#ECE5D5]/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <Wine size={32} className="text-[#F7EC73]" />
              <span className="font-display text-[1.25rem] font-bold text-[#ECE5D5] leading-none">Vinial</span>
            </Link>
            <p className="text-[#ECE5D5]/60 text-sm">
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}