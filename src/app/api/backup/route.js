import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// Armazenamento temporário para backups
// Em produção, isso seria substituído por um banco de dados
const backups = new Map();

export async function GET(req) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(JSON.stringify({ error: 'Não autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const url = new URL(req.url);
  const backupId = url.searchParams.get('id');
  const userId = session.user.email;
  
  if (!backupId) {
    // Listar todos os backups do usuário
    const userBackups = [];
    backups.forEach((value, key) => {
      if (key.startsWith(`${userId}:`)) {
        userBackups.push({
          id: key.split(':')[1],
          timestamp: value.timestamp,
          size: Object.keys(value.data).length
        });
      }
    });
    
    return new Response(JSON.stringify({ backups: userBackups }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Obter backup específico
  const backup = backups.get(`${userId}:${backupId}`);
  
  if (!backup) {
    return new Response(JSON.stringify({ error: 'Backup não encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify(backup), {
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
    const { userId, data, timestamp } = body;
    
    if (!userId || !data || !timestamp) {
      return new Response(JSON.stringify({ error: 'Dados incompletos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Verificar se o usuário está autorizado
    if (userId !== session.user.email) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Gerar ID único para o backup
    const backupId = `${Date.now()}`;
    const key = `${userId}:${backupId}`;
    
    // Armazenar backup
    backups.set(key, { data, timestamp });
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Backup criado com sucesso',
      backupId
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erro ao processar backup:', error);
    return new Response(JSON.stringify({ error: 'Erro ao processar backup' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
