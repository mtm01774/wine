import { Pathnames } from 'next-intl/navigation';

export const defaultLocale = 'pt';
export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];

// Add pathnames for the supported routes
export const pathnames = {
  '/': '/',
  '/about': '/about',
  '/store': '/store',
  '/contact': '/contact',
  '/cart': '/cart',
  '/login': '/login'
} satisfies Pathnames<typeof locales>;

export default {
  defaultLocale,
  locales,
  localePrefix: 'always',
  pathnames
} as const;