import React, { useState } from 'react';

export default function AppointmentForm({ selectedDate, onSubmit, calendarType }) {
  const [formData, setFormData] = useState({
    clientName: '',
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
    time: '10:00',
    projectValue: '',
    deposit: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateRemaining = () => {
    const projectValue = parseFloat(formData.projectValue) || 0;
    const deposit = parseFloat(formData.deposit) || 0;
    return (projectValue - deposit).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Criar objeto de evento para o Google Calendar
    const event = {
      summary: formData.clientName, // Nome do cliente como título
      description: formData.description,
      start: {
        dateTime: `${formData.date}T${formData.time}:00`,
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: `${formData.date}T${formData.time}:00`,
        timeZone: 'America/Sao_Paulo',
      },
      extendedProperties: {
        private: {
          projectValue: formData.projectValue,
          deposit: formData.deposit,
          remaining: calculateRemaining(),
          calendarType: calendarType // SP ou PP
        }
      }
    };
    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Novo Agendamento</h2>
      <div className="form-group">
        <label htmlFor="clientName">Nome do Cliente:</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Data:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="time">Horário:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectValue">Valor do Projeto (R$):</label>
        <input
          type="number"
          id="projectValue"
          name="projectValue"
          value={formData.projectValue}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="deposit">Sinal (R$):</label>
        <input
          type="number"
          id="deposit"
          name="deposit"
          value={formData.deposit}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
      </div>
      <div className="form-group">
        <label>Valor Restante (R$):</label>
        <div className="calculated-value">{calculateRemaining()}</div>
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição do Projeto:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        ></textarea>
      </div>
      <button type="submit" className="submit-button">Salvar Agendamento</button>
    </form>
  );
}
