import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obter um vinho específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const wine = await prisma.wine.findUnique({
      where: { id: params.id },
      include: {
        translations: true,
      },
    });

    if (!wine) {
      return NextResponse.json(
        { message: 'Vinho não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ wine });
  } catch (error) {
    console.error('Erro ao buscar vinho:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar vinho' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Atualizar um vinho
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { translations, ...wineData } = data;

    // Atualizar o vinho
    const wine = await prisma.wine.update({
      where: { id: params.id },
      data: {
        ...wineData,
        translations: {
          deleteMany: {},
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
    console.error('Erro ao atualizar vinho:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar vinho' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Excluir um vinho
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.wine.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Vinho excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir vinho:', error);
    return NextResponse.json(
      { message: 'Erro ao excluir vinho' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 