import chatUI from "../utils/chatUI";
import { on, off } from "../services/SocketService";

const socketHandler = () => {
    const handleConnect = () => {
        chatUI.updateConnectionStatus(true);
        chatUI.addAlert("Conectado al servidor", "success");
    }
    const handleDisconnect = () => {
        chatUI.updateConnectionStatus(false);
        chatUI.addAlert("Desconectado del servidor", "danger");
    }
    const handleUserCount = (counter: number) => {
        chatUI.updateUserCounter(counter);
        console.log("Usuarios conectados:", counter);
    }

    const handleError = (error: any) => {
        chatUI.addAlert("Error: " + error, "danger");
    }
    on("connect", handleConnect);
    on("disconnect", handleDisconnect);
    on("userCount", handleUserCount);
    on("messageError", handleError)

    return () => {
        off("connect", handleConnect);
        off("disconnect", handleDisconnect);
        off("userCount", handleUserCount);
        off("messageError", handleError)
    }

}


export default socketHandler;
