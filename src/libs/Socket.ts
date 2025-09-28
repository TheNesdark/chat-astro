import { io, Socket} from "socket.io-client";
 
const URL_SERVER = import.meta.env.PUBLIC_SERVER_URL;

const createPlaceholderSocket = (): Socket => ({
    connect: () => {},
    disconnect: () => {},
    emit: () => {},
    on: () => {},
    off: () => {},
} as any);

let socket: Socket;

if (typeof window !== 'undefined') {
    socket = io(URL_SERVER, {
        withCredentials: true,
        autoConnect: false,
    });
} else {
    socket = createPlaceholderSocket();
}

export default socket;
export type { Socket };