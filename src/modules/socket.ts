
import { io , Socket } from "socket.io-client";
import socketEvents from "../events/socketEvents.ts";

let socket : Socket

export function initSocket(user: string) {
    if (socket) return
    
    socket = io(`https://senachat.up.railway.app/`, {
        auth: { user },
        autoConnect: false,
    }); 

    socketEvents(socket);

    return socket;
}

export function connectSocket() {
    if (!socket) {
        throw new Error("Socket no inicializado");
    }
    socket.connect();
}
export function getSocket() {
    return socket;
}
