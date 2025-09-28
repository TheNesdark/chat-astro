import socketHandler from "./handlers/SocketHandler";
import { connect } from "./services/SocketService";


window.addEventListener("ReactReady", () => {
    socketHandler();
    connect();
}, { once: true });