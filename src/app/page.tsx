import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Dani Tattoos - Agendamento</h1>
        <p className="text-center mb-4">Aplicativo de agendamento para tatuadores</p>
        
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Funcionalidades em desenvolvimento:</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Integração com Google Calendar</li>
              <li>Agendamento de clientes</li>
              <li>Geração de comprovantes em PNG</li>
              <li>Compartilhamento via WhatsApp</li>
              <li>Sincronização entre dispositivos</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
