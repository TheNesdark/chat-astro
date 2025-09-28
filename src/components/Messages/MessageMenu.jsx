import { useState, useEffect, useRef } from 'react';  
import styles from '@styles/UserMessage.module.css';  
import { send } from '@services/SocketService';

export default function MessageMenu({ messageId }) {  
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const openDetails = document.querySelectorAll('details[open]');
      openDetails.forEach(detail => {
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
      className={styles.messageMenu} 
      onToggle={(e) => setIsOpen(e.target.open)}
    >
      <summary 
        className={styles.messageMenuButton} 
        aria-label="Opciones del mensaje"
      >
        ⋮  
      </summary>
      <div className={styles.menuDropdown}>
        <button 
          className={styles.menuOptionDelete} 
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </details>
  );
}