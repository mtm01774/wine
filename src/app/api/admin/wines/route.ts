import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Listar vinhos
export async function GET() {
  try {
    const wines = await prisma.wine.findMany({
      include: {
        translations: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ wines });
  } catch (error) {
    console.error('Erro ao listar vinhos:', error);
    return NextResponse.json(
      { message: 'Erro ao listar vinhos' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Criar vinho
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { translations, ...wineData } = data;

    // Criar o vinho
    const wine = await prisma.wine.create({
      data: {
        ...wineData,
        translations: {
          create: Object.entries(translations).map(([locale, translation]: [string, any]) => ({
            locale,
            name: translation.name,
            description: translation.description,
          })),
        },
      },
      include: {
        translations: true,
      },
    });

    return NextResponse.json({ wine });
  } catch (error) {
    console.error('Erro ao criar vinho:', error);
    return NextResponse.json(
      { message: 'Erro ao criar vinho' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 