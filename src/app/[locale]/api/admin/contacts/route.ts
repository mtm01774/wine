import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json();
    const { status } = await request.json();

    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Erro ao atualizar contato:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Contato excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 