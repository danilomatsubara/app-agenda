import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function MonthlyCalendar({ onDateClick, events }) {
  const handleDateClick = (info) => {
    onDateClick(info.date);
  };

  return (
    <div className="monthly-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="pt-br"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        }}
        events={events}
        dateClick={handleDateClick}
        height="auto"
      />
    </div>
  );
}
