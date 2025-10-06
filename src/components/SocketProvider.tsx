import { useEffect } from "react";
import { initSocket, connect } from "@/services/SocketService";

export default function SocketProvider(){

    useEffect(() => {
        initSocket();

        window.addEventListener("ReactReady", () => {
            connect();
        });

        return () => {
            window.removeEventListener("ReactReady", () => {
                connect();
            });
        };
    }, []);

    return null
}