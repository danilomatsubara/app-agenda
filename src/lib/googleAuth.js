import { google } from 'googleapis';

// Configure o cliente OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Função para gerar URL de autorização
export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar']
  });
}

// Função para obter tokens de acesso
export async function getTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

// Função para configurar cliente com tokens
export function setCredentials(tokens) {
  oauth2Client.setCredentials(tokens);
  return oauth2Client;
}
