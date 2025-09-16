import { initSocket, connectSocket } from "./modules/socket.ts";
import socketEvents from "./events/socketEvents.ts";
const socket = initSocket("Andres");

window.addEventListener("ReactReady", () => {
  connectSocket();
});
