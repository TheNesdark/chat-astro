import styles from "@styles/OtherUserMessage.module.css";
import FileRender from "@utils/FileRender";

export default function OtherUserMessage({ message }) {
  return (
    <div className={`${styles.message} ${styles.messageOther}`}>
      <header className={styles.messageHeader}>
        <div className={styles.messageUsername}>{message.username}</div>
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
