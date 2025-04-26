import { getAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { google } from 'googleapis';

export async function GET(req) {
  const authOptions = getAuthOptions();
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(JSON.stringify({ error: 'Não autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const url = new URL(req.url);
  const calendarId = url.searchParams.get('calendarId');
  const timeMin = url.searchParams.get('timeMin') || new Date().toISOString();
  const timeMax = url.searchParams.get('timeMax') || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
  
  if (!calendarId) {
    return new Response(JSON.stringify({ error: 'ID do calendário não fornecido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    
    oauth2Client.setCredentials({
      access_token: session.accessToken
    });
    
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const response = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    return new Response(JSON.stringify({ events: response.data.items }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erro ao obter eventos:', error);
    return new Response(JSON.stringify({ error: 'Erro ao obter eventos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(req) {
  const authOptions = getAuthOptions();
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(JSON.stringify({ error: 'Não autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const body = await req.json();
    const { calendarId, event } = body;
    
    if (!calendarId || !event) {
      return new Response(JSON.stringify({ error: 'Dados incompletos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    
    oauth2Client.setCredentials({
      access_token: session.accessToken
    });
    
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });
    
    return new Response(JSON.stringify({ event: response.data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return new Response(JSON.stringify({ error: 'Erro ao criar evento' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
