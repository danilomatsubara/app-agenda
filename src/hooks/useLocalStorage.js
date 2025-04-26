import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Obter do localStorage pelo key
      const item = window.localStorage.getItem(key);
      // Analisar JSON armazenado ou retornar initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao recuperar ${key} do localStorage:`, error);
      return initialValue;
    }
  });
  
  // Função para atualizar o valor no localStorage
  const setValue = (value) => {
    try {
      // Permitir que value seja uma função para seguir o mesmo padrão do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salvar estado
      setStoredValue(valueToStore);
      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };
  
  return [storedValue, setValue];
}
