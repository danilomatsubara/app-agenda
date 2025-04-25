export interface GoogleCalendarEvent {
  id?: string;
  title: string;
  date: string;
  time: string;
  value: string;
  deposit: string;
  description?: string;
  calendar: 'SP' | 'PP';
}
