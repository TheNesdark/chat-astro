import socketEvents from "./events/socketEvents";
import { connect } from "./services/SocketService";


window.addEventListener("ReactReady", () => {
    socketEvents();
    connect();
});