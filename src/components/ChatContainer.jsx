import UserMessage from "./Messages/UserMessage.jsx";
import OtherUserMessage from "./Messages/OtherUserMessage.jsx";
import useMessages from "../hooks/useMessages.tsx";
import SystemMessage from "./Messages/SystemMessage.jsx";
import '@/styles/components/ChatContainer.css';


export default function ChatContainer({user}) {
    const { messages } = useMessages();
    const userID = user?.id || "";
    
    return (
        <section className="chat-container">
            {messages.length === 0 ? (
                <div className="no-messages">
                    No hay mensajes aún...
                </div>
            ) : (
                messages.slice().reverse().map((message, index) => {
                    const key = message.id || `msg-${index}`;
                    if (message.user_id === userID) {
                        return <UserMessage key={key} message={message} />;
                    } else if (message.username === "System") {
                        return <SystemMessage key={key} message={message} />;
                    } else {
                        return <OtherUserMessage key={key} message={message} />;
                    }
                })
            )}
        </section>
    );
}

