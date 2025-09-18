import styles from '@styles/UserMessage.module.css';
import FileRender from '@utils/FileRender';
import MessageMenu from './MessageMenu'; 

export default function UserMessage({ message }) {
  return (
    <div className={`${styles.message}`}>
      <MessageMenu messageId={message.id} />
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