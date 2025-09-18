import SocketManager from "./modules/SocketManager";

const username = "Andres";
SocketManager.init(username);

window.addEventListener("ReactReady", SocketManager.connect.bind(SocketManager));