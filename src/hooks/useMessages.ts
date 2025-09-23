import { useState, useEffect } from "react";
import type { Message } from "@/types";
import { on, off } from "@services/SocketService";


function useMessages() {
    const [messages, setMessages] = useState<Message[]>([]);

    const loadMessages = (messages: Message[]) => {
        setMessages(messages);
    };

    const newMessage = (message: Message) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const clearMessages = () => {
        setMessages([]);
    };

    const deleteMessage = (id: string) => {
        setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
    };


    useEffect(() => {
        on("newMessage", newMessage);
        on("loadMessages", loadMessages);
        on("clearChat", clearMessages);
        on("messageDeleted", deleteMessage);
        on("systemMessage", newMessage);

        window.dispatchEvent(new Event("ReactReady"));

        return () => {
            off("newMessage", newMessage);
            off("loadMessages", loadMessages);
            off("clearChat", clearMessages);
            off("messageDeleted", deleteMessage);
            off("systemMessage", newMessage);
        };

    }, []);

    return { messages };
}

export default useMessages;
