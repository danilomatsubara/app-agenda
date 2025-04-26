"use client";

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import MonthlyCalendar from '@/components/MonthlyCalendar';
import AppointmentForm from '@/components/AppointmentForm';
import CalendarSelector from '@/components/CalendarSelector';
import ReceiptGenerator from '@/components/ReceiptGenerator';

export default function AgendaPage() {
  const { data: session, status } = useSession();
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [calendarType, setCalendarType] = useState('SP');
  const [showForm, setShowForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  // Verificar autenticação
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('google');
    }
  }, [status]);

  // Carregar eventos quando o calendário for selecionado
  useEffect(() => {
    if (session && selectedCalendar) {
      fetchEvents();
    }
  }, [session, selectedCalendar]);

  // Buscar eventos do Google Calendar
  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/events?calendarId=${selectedCalendar}`);
      const data = await response.json();
      // Formatar eventos para o FullCalendar
      const formattedEvents = data.events.map(event => ({
        id: event.id,
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        extendedProps: event.extendedProperties?.private || {}
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  // Manipular seleção de data no calendário
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
    setShowReceipt(false);
  };

  // Manipular seleção de calendário
  const handleCalendarSelect = (calendarId, type) => {
    setSelectedCalendar(calendarId);
    setCalendarType(type);
  };

  // Manipular envio do formulário
  const handleFormSubmit = async (eventData) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calendarId: selectedCalendar,
          event: eventData
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Extrair dados do evento para o comprovante
        const appointment = {
          clientName: eventData.summary,
          date: eventData.start.dateTime,
          time: new Date(eventData.start.dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          projectValue: eventData.extendedProperties.private.projectValue,
          deposit: eventData.extendedProperties.private.deposit,
          description: eventData.description
        };
        setCurrentAppointment(appointment);
        setShowForm(false);
        setShowReceipt(true);
        // Atualizar lista de eventos
        fetchEvents();
      }
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    }
  };

  if (status === 'loading') {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="agenda-page">
      <h1>Gerenciamento de Agendamentos</h1>
      <CalendarSelector onSelect={handleCalendarSelect} />
      {selectedCalendar && (
        <MonthlyCalendar
          onDateClick={handleDateClick}
          events={events}
        />
      )}
      {showForm && (
        <AppointmentForm
          selectedDate={selectedDate}
          onSubmit={handleFormSubmit}
          calendarType={calendarType}
        />
      )}
      {showReceipt && currentAppointment && (
        <ReceiptGenerator
          appointment={currentAppointment}
          calendarType={calendarType}
        />
      )}
    </div>
  );
}
