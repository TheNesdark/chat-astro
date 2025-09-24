import styles from "@styles/OtherUserMessage.module.css";
import FileRender from "@/components/Messages/FileRender";

export default function OtherUserMessage({ message }) {
  return (
    <div className={`${styles.message} ${styles.messageOther}`}>
      <header className={styles.messageHeader}>
        <div className={styles.messageUsername}>{message.username}</div>
      </header>
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
