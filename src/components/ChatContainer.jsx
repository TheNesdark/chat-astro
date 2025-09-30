import { useEffect } from "react";
import UserMessage from "./Messages/UserMessage.jsx";
import OtherUserMessage from "./Messages/OtherUserMessage.jsx";
import useMessages from "../hooks/useMessages.tsx";
import SystemMessage from "./Messages/SystemMessage.jsx";
import { useSocket } from "../hooks/useSocket.tsx";
import styles from "@styles/ChatContainer.module.css";


export default function ChatContainer({user}) {
    const { messages } = useMessages();
    const userID = user?.id || "";
    
    // Initialize socket connection
    useSocket();

    useEffect(() => {
        // Disparar evento cuando el componente principal esté montado
        const event = new CustomEvent('ReactReady');
        window.dispatchEvent(event);
    }, []);

    return (
        <section className={styles.container}>
            {messages.length === 0 ? (
                <div className={styles.noMessages}>
                    No hay mensajes aún...
                </div>
            ) : (
                messages.slice().reverse().map((message) => {
                    if (message.user_id === userID) {
                        return <UserMessage key={message.id} message={message} />;
                    } else if (message.username === "System") {
                        return <SystemMessage key={message.id} message={message} />;
                    } else {
                        return <OtherUserMessage key={message.id} message={message} />;
                    }
                })
            )}
        </section>
    );
}

