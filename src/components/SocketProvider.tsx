import { useEffect } from "react";
import { initSocket, connect, disconnect } from "@/services/SocketService";

export default function SocketProvider() {
  useEffect(() => {
    initSocket();
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return null;
}