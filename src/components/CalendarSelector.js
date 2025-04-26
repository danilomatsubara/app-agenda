import React, { useState, useEffect } from 'react';

export default function CalendarSelector({ onSelect }) {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [calendarType, setCalendarType] = useState('SP'); // SP ou PP

  useEffect(() => {
    // Carregar calendários do usuário
    async function loadCalendars() {
      try {
        const response = await fetch('/api/calendars');
        const data = await response.json();
        setCalendars(data.calendars);
      } catch (error) {
        console.error('Erro ao carregar calendários:', error);
      }
    }
    loadCalendars();
  }, []);

  const handleCalendarChange = (e) => {
    setSelectedCalendar(e.target.value);
    onSelect(e.target.value, calendarType);
  };

  const handleTypeChange = (e) => {
    setCalendarType(e.target.value);
    onSelect(selectedCalendar, e.target.value);
  };

  return (
    <div className="calendar-selector">
      <div className="form-group">
        <label>Tipo de Agenda:</label>
        <select value={calendarType} onChange={handleTypeChange}>
          <option value="SP">SP</option>
          <option value="PP">PP</option>
        </select>
      </div>
      <div className="form-group">
        <label>Selecione o Calendário:</label>
        <select value={selectedCalendar} onChange={handleCalendarChange}>
          <option value="">Selecione...</option>
          {calendars.map(calendar => (
            <option key={calendar.id} value={calendar.id}>
              {calendar.summary}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
