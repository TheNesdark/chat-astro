import { useState } from 'react';  
import styles from '@styles/UserMessage.module.css';  
import messageService from '@services/MessageService';

export default function MessageMenu({ messageId }) {  
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();  
    const newOpen = !isOpen;  
    setIsOpen(newOpen); 

    if (newOpen) {
      const openDetails = document.querySelectorAll('details[open]');
      openDetails.forEach(detail => {
        if (detail !== e.currentTarget.closest('details')) { 
          detail.open = false;
        }
      });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault(); 
    messageService.deleteMessage(messageId);  
    const openDetails = document.querySelectorAll('details[open]');
    openDetails.forEach(detail => detail.open = false);
    setIsOpen(false); 
  };



  return (
    <details 
      open={isOpen}  
      className={styles.messageMenu} 
      role="menu" 
      aria-label="Opciones del mensaje"
      onClick={handleToggle}  
    >
      <summary 
        className={styles.messageMenuButton} 
        aria-expanded={isOpen} 
        aria-haspopup="true"
      >
        ⋮  
      </summary>
      <div className={styles.menuDropdown} role="menu">
        <button 
          className={styles.menuOptionDelete} 
          onClick={handleDelete}
          role="menuitem"
          aria-label="Eliminar mensaje"
        >
          Eliminar
        </button>
      </div>
    </details>
  );
}