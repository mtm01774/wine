import createNextIntlPlugin from 'next-intl/plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001']
    }
  }
};

export default withNextIntl(nextConfig);
