import { createInitialUser } from '../src/lib/auth';

async function main() {
  try {
    await createInitialUser();
    console.log('Usuário inicial criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar usuário inicial:', error);
  }
  process.exit(0);
}

main(); 