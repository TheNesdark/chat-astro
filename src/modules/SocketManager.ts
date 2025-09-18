import { io, Socket } from "socket.io-client";
import socketEvents from "../events/socketEvents.ts";

class SocketManager {
    private static socket: Socket | null = null;

    public static init(user: string): Socket {
        if (this.socket) {
            console.warn("Socket ya inicializado; usando existente.");
            return this.socket!;
        }

        this.socket = io("chat-socket.railway.internal", {
            auth: { user },
            autoConnect: false,
        });

        socketEvents(this.socket);

        return this.socket;
    }

    public static connect(): void {
        if (!this.socket) {
            throw new Error("Socket no inicializado. Llama init() primero.");
        }
        if (!this.socket.connected) {
            this.socket.connect();
        }
    }

    public static getSocket(): Socket | null {
        if (!this.socket) {
            throw new Error("Socket no inicializado. Llama init() primero.");
        }
        return this.socket;
    }

    public static disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    public static send(event: string, data: any): void {
        if (!this.socket) {
            console.warn("Socket no inicializado. Llama init() primero.");
            return;
        }
        this.socket?.emit(event, data);
    }
}

export default SocketManager;