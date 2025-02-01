'use client';

import { usePathname, useRouter } from '@/navigation';
import { locales } from '@/i18n.config';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const currentLocale = locales.find(locale => pathname.startsWith(`/${locale}`)) || 'pt';

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        <Globe size={20} />
        <span className="uppercase">{currentLocale}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg ${
              locale === currentLocale ? 'bg-primary/10 text-primary' : ''
            }`}
          >
            {locale === 'pt' ? 'Português' : 'English'}
          </button>
        ))}
      </div>
    </div>
  );
} 