import { useEffect } from 'react';
import { useSyncedState } from './useSyncedState';

export function useBackupManager(userId) {
  // Usar estado sincronizado para configurações
  const [settings, setSettings] = useSyncedState(`settings-${userId}`, {
    lastBackup: null,
    autoBackup: true,
    backupInterval: 24 * 60 * 60 * 1000, // 24 horas em milissegundos
  });

  // Função para criar backup manual
  const createBackup = async () => {
    try {
      // Coletar todos os dados do localStorage
      const backupData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`${userId}:`)) {
          backupData[key] = localStorage.getItem(key);
        }
      }

      // Enviar para o servidor
      const response = await fetch('/api/backup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          data: backupData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Atualizar configurações com timestamp do último backup
        setSettings({
          ...settings,
          lastBackup: new Date().toISOString(),
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      return false;
    }
  };

  // Função para restaurar backup
  const restoreBackup = async (backupId) => {
    try {
      const response = await fetch(`/api/backup?id=${backupId}`);
      if (response.ok) {
        const { data } = await response.json();
        
        // Restaurar dados no localStorage
        Object.entries(data).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      return false;
    }
  };

  // Configurar backup automático
  useEffect(() => {
    if (!settings.autoBackup) return;

    const checkAndBackup = async () => {
      const now = new Date();
      const lastBackup = settings.lastBackup ? new Date(settings.lastBackup) : null;
      
      // Verificar se é hora de fazer backup
      if (!lastBackup || (now - lastBackup) > settings.backupInterval) {
        await createBackup();
      }
    };

    // Verificar ao montar o componente
    checkAndBackup();
    
    // Configurar verificação periódica
    const intervalId = setInterval(checkAndBackup, 60 * 60 * 1000); // Verificar a cada hora
    
    return () => clearInterval(intervalId);
  }, [settings]);

  // Função para atualizar configurações de backup
  const updateBackupSettings = (newSettings) => {
    setSettings({
      ...settings,
      ...newSettings,
    });
  };

  return {
    settings,
    createBackup,
    restoreBackup,
    updateBackupSettings,
  };
}
