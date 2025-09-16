import type { Message } from "@/types";
import { getSocket } from "@modules/socket.ts";
const socket = getSocket();
const messageService = {
    sendMessage: (message: Message) => {
        socket.emit("newMessage", message);
    },
    deleteMessage: (id: string) => {
        socket.emit("deleteMessage", id);
    },
};

export default messageService;
