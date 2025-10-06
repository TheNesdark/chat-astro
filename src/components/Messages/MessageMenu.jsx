import { useState, useEffect, useRef } from 'react';  
import '@/styles/components/messages/UserMessage.css';  
import { send } from '@services/SocketService';

export default function MessageMenu({ messageId }) {  
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const openDetails = document.querySelectorAll('details[open]');
      openDetails.forEach((detail) => {
        if (detail !== detailsRef.current) {
          detail.open = false;
        }
      });
    }
  }, [isOpen]);

  const handleDelete = () => {
    send("deleteMessage", messageId);  
    setIsOpen(false);
  };

  return (
    <details 
      ref={detailsRef}
      open={isOpen}  
      className="message-menu" 
      onToggle={(e) => setIsOpen(e.target.open)}
    >
      <summary 
        className="message-menu-button" 
        aria-label="Opciones del mensaje"
      >
        ⋮  
      </summary>
      <div className="menu-dropdown">
        <button 
          className="menu-option-delete" 
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </details>
  );
}