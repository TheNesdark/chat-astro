import { useEffect, useState } from 'react';
import { on, off } from "@/services/SocketService";
import { actions } from 'astro:actions';

export default function useStatus() {
  const [userCount, setUserCount] = useState(0);
  const [status, setStatus] = useState('loading');

  const handleConnect = () => {
    setStatus('online');
  };

  const handleDisconnect = () => {
    setStatus('offline');
  };

  const handleUserCounter = (count: number) => {
    setUserCount(count);
  };

  const handleLogout = async () => {
    try {
      await actions.logout({});
      window.location.href = '/Login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    on("connect", handleConnect);
    on("disconnect", handleDisconnect);
    on("userCount", handleUserCounter);

    return () => {
      off("connect", handleConnect);
      off("disconnect", handleDisconnect);
      off("userCount", handleUserCounter);
    };
  }, []);

  return {
    userCount,
    status,
    handleLogout,
  };
}
