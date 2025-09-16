import type { Socket } from "socket.io-client";
import  chatUI  from "../ui/chatUI.ts";

const socketEvents = (socket: Socket) => {
    socket.on("connect", () => {
        chatUI.updateConnectionStatus(true);
    });

    socket.on("disconnect", () => {
        chatUI.updateConnectionStatus(false);
    })
    
    socket.on("userCount", (counter: number) => {
        chatUI.updateUserCounter(counter);
    });

}


export default socketEvents;
