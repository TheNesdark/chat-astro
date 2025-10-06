<<<<<<< HEAD
import '@/styles/components/ChatFooter.css';
=======
import '../../styles/ChatFooter.css';
>>>>>>> f078b9f9eede162aaba107090a524feb4955d5fe
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