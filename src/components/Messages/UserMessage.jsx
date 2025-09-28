import styles from '@styles/UserMessage.module.css';
import FileRender from './FileRender.tsx';
import MessageMenu from './MessageMenu'; 

export default function UserMessage({ message }) {
  return (
    <div className={`${styles.message}`}>
      <MessageMenu messageId={message.id} />
      <div className={styles.messageContent}>
        <div className={styles.messageText}>{message.content}</div>
        <div className={styles.messageMedia}>
          <FileRender
            fileUrl={message.file_url}
            fileType={message.file_type}
            fileName={message.file_name}
          />
        </div>
      </div>
      
      <div className={styles.messageTime}>
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}