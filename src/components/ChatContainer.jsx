import UserMessage from "./Messages/UserMessage.jsx";
import OtherUserMessage from "./Messages/OtherUserMessage.jsx";
import useMessages from "../hooks/useMessages.tsx";
import SystemMessage from "./Messages/SystemMessage.jsx";
import styles from "@styles/ChatContainer.module.css";


export default function ChatContainer({user}) {
    const { messages } = useMessages();
    const userID = user?.id || "";

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

