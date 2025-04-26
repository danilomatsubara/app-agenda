import React from 'react';

export default function ShareButton({ imageUrl, clientName }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        // Obter o blob da imagem
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `comprovante-${clientName.replace(/\s+/g, '-')}.png`, { type: 'image/png' });
        
        // Compartilhar via API Web Share
        await navigator.share({
          title: 'Comprovante de Agendamento',
          text: `Comprovante de agendamento para ${clientName}`,
          files: [file]
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
        // Fallback para WhatsApp direto se a API Web Share falhar
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Comprovante de agendamento para ${clientName}`)}`;
        window.open(whatsappUrl, '_blank');
      }
    } else {
      // Fallback para navegadores que não suportam a API Web Share
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Comprovante de agendamento para ${clientName}`)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <button onClick={handleShare} className="share-button">
      Compartilhar via WhatsApp
    </button>
  );
}
