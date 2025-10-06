import '@/styles/components/messages/SystemMessage.css';

export default function SystemMessage({ message }) {
  return (
    <div className="system-message">
      {message.message}
    </div>
  );
}