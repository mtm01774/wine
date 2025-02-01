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
  '/login': '/login',
  '/api/auth/login': '/api/auth/login'
} satisfies Pathnames<typeof locales>;

// Configuração do next-intl
export const i18nConfig = {
  defaultLocale,
  locales,
  localePrefix: 'always',
  pathnames,
  // Adiciona suporte a rotas da API
  routes: {
    api: {
      auth: {
        login: '/api/auth/login'
      }
    }
  }
} as const;

export default i18nConfig;