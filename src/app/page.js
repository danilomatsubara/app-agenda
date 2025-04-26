"use client";

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <div className="logo-container">
          <img src="/logo.png" alt="Dani Tattoos Logo" className="logo" />
          <h1>Dani Tattoos</h1>
        </div>
      </header>
      
      <main>
        <section className="hero">
          <h2>Aplicativo de Agendamento</h2>
          <p>Gerencie seus agendamentos de tatuagem de forma simples e eficiente.</p>
          <Link href="/agenda" className="cta-button">
            Acessar Agenda
          </Link>
        </section>
        
        <section className="features">
          <h3>Funcionalidades</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <h4>Integração com Google Calendar</h4>
              <p>Sincronize seus agendamentos com o Google Calendar</p>
            </div>
            <div className="feature-card">
              <h4>Agendamento de Clientes</h4>
              <p>Interface intuitiva para agendar novos clientes</p>
            </div>
            <div className="feature-card">
              <h4>Comprovantes em PNG</h4>
              <p>Gere comprovantes personalizados para cada agendamento</p>
            </div>
            <div className="feature-card">
              <h4>Compartilhamento via WhatsApp</h4>
              <p>Compartilhe comprovantes diretamente pelo WhatsApp</p>
            </div>
            <div className="feature-card">
              <h4>Múltiplas Agendas</h4>
              <p>Suporte para agendas SP e PP</p>
            </div>
            <div className="feature-card">
              <h4>Sincronização entre Dispositivos</h4>
              <p>Acesse seus agendamentos em qualquer dispositivo</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Dani Tattoos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
