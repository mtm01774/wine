import { prisma } from '@/lib/prisma';
import { WineDetails } from '@/components/WineDetails';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const wine = await prisma.wine.findUnique({
    where: { id: params.id },
    include: { translations: true }
  });

  if (!wine) return { title: 'Wine Not Found' };

  const translation = wine.translations.find(t => t.locale === params.locale) || wine.translations[0];

  return {
    title: `${translation.name} | Vinial`,
    description: translation.description
  };
}

export default async function WineDetailsPage({ params }: PageProps) {
  const wine = await prisma.wine.findUnique({
    where: { id: params.id },
    include: { translations: true }
  });

  if (!wine) {
    notFound();
  }

  return <WineDetails wine={wine} locale={params.locale} />;
} 