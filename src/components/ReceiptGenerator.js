import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

export default function ReceiptGenerator({ appointment, calendarType }) {
  const receiptRef = useRef(null);
  
  const generateReceipt = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current);
      const image = canvas.toDataURL('image/png');
      
      // Criar link para download
      const link = document.createElement('a');
      link.href = image;
      link.download = `comprovante-${appointment.clientName.replace(/\s+/g, '-')}.png`;
      
      // Compartilhar via menu de contexto do dispositivo
      if (navigator.share) {
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], link.download, { type: 'image/png' });
        navigator.share({
          title: 'Comprovante de Agendamento',
          text: `Comprovante de agendamento para ${appointment.clientName}`,
          files: [file]
        }).catch(error => {
          console.log('Erro ao compartilhar:', error);
          // Fallback para download direto
          link.click();
        });
      } else {
        // Fallback para download direto
        link.click();
      }
    } catch (error) {
      console.error('Erro ao gerar comprovante:', error);
    }
  };
  
  // Template para SP
  const SPTemplate = () => (
    <div className="receipt sp-receipt" ref={receiptRef}>
      <div className="receipt-header">
        <img src="/logo.png" alt="Dani Tattoos Logo" className="receipt-logo" />
        <h2>Dani Tattoos - SP</h2>
      </div>
      <div className="receipt-content">
        <div className="receipt-field">
          <span className="label">Cliente:</span>
          <span className="value">{appointment.clientName}</span>
        </div>
        <div className="receipt-field">
          <span className="label">Data:</span>
          <span className="value">{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="receipt-field">
          <span className="label">Horário:</span>
          <span className="value">{appointment.time}</span>
        </div>
        <div className="receipt-field">
          <span className="label">Valor do Projeto:</span>
          <span className="value">R$ {parseFloat(appointment.projectValue).toFixed(2)}</span>
        </div>
        <div className="receipt-field">
          <span className="label">Sinal:</span>
          <span className="value">R$ {parseFloat(appointment.deposit).toFixed(2)}</span>
        </div>
        <div className="receipt-field">
          <span className="label">Valor Restante:</span>
          <span className="value">R$ {(parseFloat(appointment.projectValue) - parseFloat(appointment.deposit)).toFixed(2)}</span>
        </div>
        <div className="receipt-description">
          <span className="label">Descrição:</span>
          <p>{appointment.description}</p>
        </div>
      </div>
      <div className="receipt-footer">
        <p>Obrigado pela preferência!</p>
        <p>Dani Tattoos - São Paulo</p>
      </div>
    </div>
  );
  
  // Template para PP
  const PPTemplate = () => (
    <div className="receipt pp-receipt" ref={receiptRef}>
      <div className="receipt-header">
        <img src="/logo.png" alt="Dani Tattoos Logo" className="receipt-logo" />
        <h2>Dani Tattoos - PP</h2>
      </div>
      <div className="receipt-content">
        <div className="receipt-field">
          <span className="label">Cliente:</span>
          <span className="value">{appointment.clientName}</span>
        </div>
        <div className="receipt-field">
          <span className="label">Data:</span>
          <span className="value">{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="receipt-field">
          <span className="label">Horário:</span>
          <span className="value">{appointment.time}</span>
        </div>
        <div className="receipt-field">
          <span className="label">Valor do Projeto:</span>
          <span className="value">R$ {parseFloat(appointment.projectValue).toFixed(2)}</span>
        </div>
        <div className="receipt-field">
          <span className="label">Sinal:</span>
          <span className="value">R$ {parseFloat(appointment.deposit).toFixed(2)}</span>
        </div>
        <div className="receipt-field">
          <span className="label">Valor Restante:</span>
          <span className="value">R$ {(parseFloat(appointment.projectValue) - parseFloat(appointment.deposit)).toFixed(2)}</span>
        </div>
        <div className="receipt-description">
          <span className="label">Descrição:</span>
          <p>{appointment.description}</p>
        </div>
      </div>
      <div className="receipt-footer">
        <p>Obrigado pela preferência!</p>
        <p>Dani Tattoos - Praia Preta</p>
      </div>
    </div>
  );
  
  return (
    <div className="receipt-generator">
      {calendarType === 'SP' ? <SPTemplate /> : <PPTemplate />}
      <button onClick={generateReceipt} className="share-button">
        Gerar e Compartilhar Comprovante
      </button>
    </div>
  );
}
