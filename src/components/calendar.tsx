import React from 'react';
import { GoogleCalendarEvent } from '../types/calendar';

// Componentes para a funcionalidade de agendamento
export const CalendarComponents = {
  // Componente para exibir um evento de agendamento
  AppointmentCard: ({ 
    appointment,
    onShare,
    onEdit,
    onDelete
  }: { 
    appointment: GoogleCalendarEvent,
    onShare: () => void,
    onEdit: () => void,
    onDelete: () => void
  }) => (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{appointment.title}</h3>
          <p className="text-gray-600">{appointment.date} às {appointment.time}</p>
          <p className="mt-2"><span className="font-semibold">Valor:</span> R$ {appointment.value}</p>
          <p><span className="font-semibold">Sinal:</span> R$ {appointment.deposit}</p>
          {appointment.description && (
            <div className="mt-2">
              <p className="font-semibold">Descrição:</p>
              <p className="text-gray-700">{appointment.description}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <button 
            onClick={onShare}
            className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Compartilhar
          </button>
          <button 
            onClick={onEdit}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Editar
          </button>
          <button 
            onClick={onDelete}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  ),

  // Componente para o formulário de agendamento
  AppointmentForm: ({
    onSubmit,
    initialValues = {
      title: '',
      date: '',
      time: '',
      value: '',
      deposit: '',
      description: '',
      calendar: 'SP'
    }
  }: {
    onSubmit: (data: Record<string, string>) => void,
    initialValues?: {
      title: string,
      date: string,
      time: string,
      value: string,
      deposit: string,
      description: string,
      calendar: 'SP' | 'PP'
    }
  }) => {
    const [formData, setFormData] = React.useState(initialValues);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Cliente <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Data <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Horário <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
              Valor do Projeto <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="value"
              name="value"
              required
              min="0"
              step="0.01"
              value={formData.value}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          
          <div>
            <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 mb-1">
              Sinal <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="deposit"
              name="deposit"
              required
              min="0"
              step="0.01"
              value={formData.deposit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição do Projeto
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        
        <div>
          <label htmlFor="calendar" className="block text-sm font-medium text-gray-700 mb-1">
            Agenda <span className="text-red-500">*</span>
          </label>
          <select
            id="calendar"
            name="calendar"
            required
            value={formData.calendar}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="SP">SP</option>
            <option value="PP">PP</option>
          </select>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Salvar Agendamento
          </button>
        </div>
      </form>
    );
  }
};
