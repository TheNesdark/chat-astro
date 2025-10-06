import { useEffect } from "react";
import Alert from "@/components/Alerts/Alert";
import useAlerts from "@hooks/useAlerts";
import '@/styles/components/alerts/Alert.css';

export default function AlertContainer() {
  const { alerts, addAlert } = useAlerts();

  useEffect(() => {
    addAlert("Sistema de alertas funcionando!");
  }, []);

  return (
    <div className="alert-container">
      {alerts.map((alert) => (
        <Alert 
          key={alert.id} 
          message={alert.message} 
          type={alert.type} />
      ))}
    </div>
  );
}