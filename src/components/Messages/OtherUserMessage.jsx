import '@/styles/components/messages/OtherUserMessage.css';
import FileRender from '@/components/Messages/FileRender.tsx';

export default function OtherUserMessage({ message }) {
  return (
    <div className="other-user-message">
      <header className="message-header">
        <div className="message-username">{message.username}</div>
      </header>
      <div className="message-content">
      <div className="message-text">{message.content}</div>
      <div className="message-media">
          <FileRender
            fileUrl={message.file_url}
            fileType={message.file_type}
            fileName={message.file_name}
          />
      </div>
      </div>
      <div className="message-time">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}
