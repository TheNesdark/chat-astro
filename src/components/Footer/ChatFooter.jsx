import '@/styles/components/ChatFooter.css';
import AttachButton from './AttachButton.jsx';
import ChatForm from './ChatForm.jsx';

const ChatFooter = () => {
  return (
    <footer className="chat-footer">
      <AttachButton />
      <ChatForm />
    </footer>
  );
};

export default ChatFooter;