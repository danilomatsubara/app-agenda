import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// Armazenamento temporário para dados sincronizados
// Em produção, isso seria substituído por um banco de dados
const syncedData = new Map();

export async function GET(req) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(JSON.stringify({ error: 'Não autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const url = new URL(req.url);
  const key = url.searchParams.get('key');
  
  if (!key) {
    return new Response(JSON.stringify({ error: 'Chave não fornecida' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Criar uma chave única por usuário
  const userKey = `${session.user.email}:${key}`;
  
  // Obter dados sincronizados
  const data = syncedData.get(userKey) || { value: null, timestamp: null };
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(JSON.stringify({ error: 'Não autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const body = await req.json();
    const { key, value, timestamp } = body;
    
    if (!key || value === undefined) {
      return new Response(JSON.stringify({ error: 'Dados incompletos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Criar uma chave única por usuário
    const userKey = `${session.user.email}:${key}`;
    
    // Verificar se já existe um valor mais recente
    const existingData = syncedData.get(userKey);
    if (existingData && existingData.timestamp && new Date(existingData.timestamp) > new Date(timestamp)) {
      // Manter o valor mais recente
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Dados existentes mais recentes mantidos',
        data: existingData
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Armazenar novos dados
    syncedData.set(userKey, { value, timestamp });
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Dados sincronizados com sucesso' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erro ao processar sincronização:', error);
    return new Response(JSON.stringify({ error: 'Erro ao processar sincronização' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
