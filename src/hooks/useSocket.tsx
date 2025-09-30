import { useEffect } from 'react';

export const useSocket = () => {
  useEffect(() => {
    const initializeSocket = async () => {
      try {
        // Dynamic imports to handle TypeScript modules
        const { default: socketHandler } = await import('../handlers/SocketHandler');
        const { connect } = await import('../services/SocketService');
        
        // Initialize socket connection and handlers
        socketHandler();
        connect();
        
        console.log('Socket initialized');
      } catch (error) {
        console.error('Error initializing socket:', error);
      }
    };

    // Listen for React ready event
    const handleReactReady = () => {
      initializeSocket();
    };

    window.addEventListener("ReactReady", handleReactReady, { once: true });
    
    // Also initialize immediately if React is already ready
    if (document.readyState === 'complete') {
      initializeSocket();
    }

    return () => {
      window.removeEventListener("ReactReady", handleReactReady);
    };
  }, []);
};