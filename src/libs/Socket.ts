import { io, Socket} from "socket.io-client";
import { getCookie } from "../utils/Helper";
 
const URL_SERVER = import.meta.env.PUBLIC_SERVER_URL
let socket: Socket | null = null;

if (typeof window !== 'undefined') {

    const token = getCookie("sb-access-token");
    socket = io(URL_SERVER, {
        auth: {
            token: token,
        },
        autoConnect: false,
    });
}


export default socket;
export type { Socket } 