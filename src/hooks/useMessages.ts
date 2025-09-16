import { useState, useEffect } from "react";
import { getSocket } from "@modules/socket.ts";

export interface Message {
    id: string;
    username: string;
    message: string;
}

function useMessages() {
    const [messages, setMessages] = useState<any[]>([]);

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
        const socket = getSocket();
        if (!socket) {
            throw new Error("Socket no inicializado");
        }
        socket.on("newMessage", newMessage);
        socket.on("loadMessages", loadMessages);
        socket.on("clearChat", clearMessages);
        socket.on("deleteMessage", deleteMessage);

        window.dispatchEvent(new Event("ReactReady"));

        return () => {
            socket.off("newMessage", newMessage);
            socket.off("loadMessages", loadMessages);
            socket.off("clearMessages", clearMessages);
            socket.off("deleteMessage", deleteMessage);
        };

    }, []);

    return { messages };
}

export default useMessages;
