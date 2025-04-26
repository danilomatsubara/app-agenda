import { useState, useEffect } from 'react';

export function useSyncedState(key, initialValue, syncInterval = 60000) {
  // Usar localStorage para persistência local
  const [localValue, setLocalValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao recuperar ${key} do localStorage:`, error);
      return initialValue;
    }
  });
  
  // Função para atualizar o valor localmente e no servidor
  const setValue = async (value) => {
    try {
      // Permitir que value seja uma função
      const valueToStore = value instanceof Function ? value(localValue) : value;
      
      // Salvar estado local
      setLocalValue(valueToStore);
      
      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      
      // Sincronizar com o servidor
      await syncToServer(key, valueToStore);
    } catch (error) {
      console.error(`Erro ao salvar ${key}:`, error);
    }
  };
  
  // Função para sincronizar com o servidor
  const syncToServer = async (key, value) => {
    try {
      await fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
          value,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      console.error('Erro ao sincronizar com o servidor:', error);
    }
  };
  
  // Função para buscar dados do servidor
  const fetchFromServer = async () => {
    try {
      const response = await fetch(`/api/sync?key=${key}`);
      if (response.ok) {
        const data = await response.json();
        if (data.value) {
          // Atualizar localStorage e estado local
          window.localStorage.setItem(key, JSON.stringify(data.value));
          setLocalValue(data.value);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados do servidor:', error);
    }
  };
  
  // Sincronizar com o servidor periodicamente
  useEffect(() => {
    // Sincronizar ao montar o componente
    fetchFromServer();
    
    // Configurar sincronização periódica
    const intervalId = setInterval(fetchFromServer, syncInterval);
    
    // Limpar intervalo ao desmontar
    return () => clearInterval(intervalId);
  }, [key, syncInterval]);
  
  return [localValue, setValue];
}
