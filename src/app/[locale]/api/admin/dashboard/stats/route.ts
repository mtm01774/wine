import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Buscar totais
    const [totalWines, totalPlans, totalContacts, recentContacts] = await Promise.all([
      prisma.wine.count(),
      prisma.plan.count(),
      prisma.contact.count(),
      prisma.contact.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          subject: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      totalWines,
      totalPlans,
      totalContacts,
      recentContacts,
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 