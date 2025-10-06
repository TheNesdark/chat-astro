import '@/styles/components/messages/UserMessage.css';
import FileRender from './FileRender.tsx';
import MessageMenu from './MessageMenu'; 

export default function UserMessage({ message }) {
  return (
    <div className="user-message">
      <MessageMenu messageId={message.id} />
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