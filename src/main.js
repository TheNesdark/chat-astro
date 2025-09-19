import SocketManager from "./modules/SocketManager";

const username = "andres"
SocketManager.init(username);

window.addEventListener("ReactReady", () => {
    SocketManager.connect();
});