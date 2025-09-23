import { io, Socket} from "socket.io-client";
 
const URL_SERVER = import.meta.env.PUBLIC_SERVER_URL
let socket: Socket | null = null;

if (typeof window !== 'undefined') {
    socket = io(URL_SERVER, {
        withCredentials: true,
        autoConnect: false,
    });
}


export default socket;
export type { Socket } 