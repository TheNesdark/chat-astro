import { useState, useEffect, useRef } from "react";

export interface Alert {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export default function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const idCounter = useRef(0)
  const addAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = idCounter.current++;
    setAlerts(prevAlerts => [...prevAlerts, { id, message, type }]);

    setTimeout(() => {
      removeAlert(id);
    }, 3000);

    return id;
  };

  const removeAlert = (id: number) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  useEffect(() => {
    window.addEventListener('alert', (event: CustomEvent<Alert>) => {
      const alert = event.detail;
      addAlert(alert.message, alert.type);
    });
  }, []);

  return { alerts, addAlert };
}