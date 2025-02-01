import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import prisma from '@/lib/prisma';
import WineForm from '@/components/admin/WineForm';

interface WineDetailPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default async function WineDetailPage({ params }: WineDetailPageProps) {
  setRequestLocale(params.locale);
  
  if (params.id === 'new') {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">New Wine</h1>
        <WineForm locale={params.locale} />
      </div>
    );
  }

  const wine = await prisma.wine.findUnique({
    where: { id: params.id },
    include: {
      translations: true
    }
  });

  if (!wine) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Wine</h1>
      <WineForm wine={wine} locale={params.locale} />
    </div>
  );
} 