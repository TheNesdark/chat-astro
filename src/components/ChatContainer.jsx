
import UserMessage from "./Messages/UserMessage.jsx";
import OtherUserMessage from "./Messages/OtherUserMessage.jsx";
import useMessages from "../hooks/useMessages.js";
import "@styles/ChatContainer.css";


export default function ChatContainer() {

 const currentUser = "user";
    const { messages } = useMessages();

    return (
        <section className="container">
            {messages.length === 0 ? (
                <div className="noMessages">
                    No hay mensajes aún...
                </div>
            ) : (
                messages.slice().reverse().map((message, index) => {
                    if (message.username === currentUser) {
                        return <UserMessage key={index} message={message} />;
                    } else {
                        return <OtherUserMessage key={index} message={message} />;
                    }
                })
            )}
        </section>
    );
}
