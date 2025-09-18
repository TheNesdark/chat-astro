import { useState, useEffect } from "react";
import type { Message } from "@/types";
import SocketManager from "@/modules/SocketManager";


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
        const socket = SocketManager.getSocket();
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
