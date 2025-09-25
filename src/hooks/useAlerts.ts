import { useState, useEffect } from "react";

export interface Alert {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export default function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Date.now();
    setAlerts(prevAlerts => [...prevAlerts, { id, message, type }]);

    return id;
  };

  useEffect(() => {
    window.addEventListener('alert', (event: CustomEvent<Alert>) => {
      const alert = event.detail;
      addAlert(alert.message, alert.type);
    });
  }, []);

  return { alerts, addAlert };
}