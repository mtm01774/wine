import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      include: {
        translations: {
          select: {
            locale: true,
            name: true,
            description: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transformar as traduções em um objeto mais fácil de usar no frontend
    const formattedPlans = plans.map(plan => {
      const translations = plan.translations.reduce((acc, trans) => {
        acc[trans.locale] = {
          name: trans.name,
          description: trans.description,
        };
        return acc;
      }, {} as Record<string, { name: string; description: string | null }>);

      // Parse features from JSON string to array
      const features = JSON.parse(plan.features) as string[];

      return {
        ...plan,
        translations,
        features,
      };
    });

    return NextResponse.json(formattedPlans);
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 