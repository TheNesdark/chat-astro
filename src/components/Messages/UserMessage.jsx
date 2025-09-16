import styles from '@styles/UserMessage.module.css';
import FileRender from '@utils/FileRender';
import messageService from '@services/MessageService';

export default function UserMessage({ message }) {

  return (
    <div className={`${styles.message}`}>
      <header>
        <span>{message.username}</span>
        <details className={styles.messageMenu}>
        <summary className={styles.messageMenuButton}>⋮</summary>
        <div className={styles.menuDropdown}>
          <button className={styles.menuOptionDelete} onClick={() => messageService.deleteMessage(message.id)}>
            Eliminar
          </button>
        </div>
      </details>
      </header>

      <div className={styles.messageContent}>
        <div className={styles.messageText}>{message.message}</div>
        <div className={styles.messageMedia}>
          {FileRender.renderMedia(message.file)}
        </div>
      </div>
      
      <div className={styles.messageTime}>
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}