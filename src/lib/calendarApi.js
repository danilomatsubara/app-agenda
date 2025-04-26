import { google } from 'googleapis';

// Função para listar eventos
export async function listEvents(auth, calendarId, timeMin, timeMax) {
  const calendar = google.calendar({ version: 'v3', auth });
  const response = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
  });
  return response.data.items;
}

// Função para criar evento
export async function createEvent(auth, calendarId, event) {
  const calendar = google.calendar({ version: 'v3', auth });
  const response = await calendar.events.insert({
    calendarId,
    resource: event,
  });
  return response.data;
}

// Função para atualizar evento
export async function updateEvent(auth, calendarId, eventId, event) {
  const calendar = google.calendar({ version: 'v3', auth });
  const response = await calendar.events.update({
    calendarId,
    eventId,
    resource: event,
  });
  return response.data;
}

// Função para excluir evento
export async function deleteEvent(auth, calendarId, eventId) {
  const calendar = google.calendar({ version: 'v3', auth });
  await calendar.events.delete({
    calendarId,
    eventId,
  });
  return true;
}
