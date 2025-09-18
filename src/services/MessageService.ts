import type { Message } from "@/types";
import SocketManager from "@/modules/SocketManager";

const messageService = {
    sendMessage: (message: Message) => { SocketManager.send("newMessage", message);
    },
    deleteMessage: (messageId: string) => { SocketManager.send("deleteMessage", messageId);
    },
    clearChat: () => { SocketManager.send("clearChat", null);
    },
    generateImage: (prompt: string) => { SocketManager.send("generateImage", prompt);
    },
    ask: (prompt: string) => { SocketManager.send("askAI", prompt);
    },
};

export default messageService;
