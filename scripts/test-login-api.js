const fetch = require('node-fetch');

async function testLoginApi() {
  try {
    console.log('Testando API de login...');
    
    const response = await fetch('http://localhost:3000/pt/api/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'luidanielcunha@gmail.com',
        password: 'Daniel91'
      })
    });

    const data = await response.json();
    
    console.log('Status da resposta:', response.status);
    console.log('Dados da resposta:', data);
  } catch (error) {
    console.error('Erro ao testar API:', error);
  }
}

testLoginApi(); 