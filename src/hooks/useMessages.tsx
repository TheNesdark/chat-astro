import { useState, useEffect } from "react";
import type { Message , MessageData} from "@/types";
import { on, off, send } from "@services/SocketService";
import FileManager from "@/modules/FileManager";
import { actions } from "astro:actions";
import commandHandler from "@/handlers/commandhandler";
import useAlerts from "./useAlerts";

function useMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState("");
    const { addAlert } = useAlerts();

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

    const sendMessage = async () => {
        if (!messageInput && !FileManager.hasFile()) return;

        if (messageInput.startsWith("/")) {
            commandHandler(messageInput);
        }

        let messageData: MessageData = {
            content: messageInput,
            file_url: null,
            file_type: null,
            file_name: null,
        };

        if (FileManager.hasFile()) {
            const file = FileManager.getFile();
            const FileForm = new FormData
            FileForm.append("file", file);
            const { data , error } = await actions.uploadFile(FileForm);
            if (error) {
                addAlert("Error al subir el archivo", "error");
                return;
            }
            messageData.file_url = data.publicUrl;
            messageData.file_type = data.type;
            messageData.file_name = data.name;
        }

        
        send("sendMessage", messageData);
        setMessageInput("");
        addAlert("Mensaje enviado", "success" );
        FileManager.clearFile();
    };

    useEffect(() => {
        on("newMessage", newMessage);
        on("loadMessages", loadMessages);
        on("clearChat", clearMessages);
        on("messageDeleted", deleteMessage);
        on("systemMessage", newMessage);

        const event = new Event("ReactReady");
        window.dispatchEvent(event);
        
        return () => {
            off("newMessage", newMessage);
            off("loadMessages", loadMessages);
            off("clearChat", clearMessages);
            off("messageDeleted", deleteMessage);
            off("systemMessage", newMessage);
        };
    }, []);

    return { messages, messageInput, setMessageInput, sendMessage };
}

export default useMessages;
