import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { message: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Verificar tipo do arquivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'Arquivo deve ser uma imagem' },
        { status: 400 }
      );
    }

    // Gerar nome único para o arquivo
    const buffer = await file.arrayBuffer();
    const ext = file.type.split('/')[1];
    const fileName = `${Date.now()}.${ext}`;
    
    // Salvar arquivo
    const path = join(process.cwd(), 'public/uploads', fileName);
    await writeFile(path, Buffer.from(buffer));
    
    // Retornar URL do arquivo
    const url = `/uploads/${fileName}`;
    
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    return NextResponse.json(
      { message: 'Erro ao fazer upload do arquivo' },
      { status: 500 }
    );
  }
} 