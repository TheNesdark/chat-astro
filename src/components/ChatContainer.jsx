import UserMessage from "./Messages/UserMessage.jsx";
import OtherUserMessage from "./Messages/OtherUserMessage.jsx";
import useMessages from "../hooks/useMessages.js";
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
                messages.slice().reverse().map((message, index) => {
                    if (message.user_id === userID) {
                        return <UserMessage key={index} message={message} />;
                    } else if (message.username === "System") {
                        return <SystemMessage key={index} message={message} />;
                    } else {
                        return <OtherUserMessage key={index} message={message} />;
                    }
                })
            )}
        </section>
    );
}

