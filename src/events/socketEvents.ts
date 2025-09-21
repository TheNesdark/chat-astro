import  chatUI  from "../ui/chatUI";
import { on, off } from "../services/SocketService";

const socketEvents = () => {
    const handleConnect = () => {
        chatUI.updateConnectionStatus(true);
    }
    const handleDisconnect = () => {
        chatUI.updateConnectionStatus(false);
    }
    const handleUserCount = (counter: number) => {
        chatUI.updateUserCounter(counter);
        console.log("Usuarios conectados:", counter);
    }
    on("connect", handleConnect);
    on("disconnect", handleDisconnect);
    on("userCount", handleUserCount);

    return () => {
        off("connect", handleConnect);
        off("disconnect", handleDisconnect);
        off("userCount", handleUserCount);
    }

}


export default socketEvents;
