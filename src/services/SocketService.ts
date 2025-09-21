import socket from "@/libs/Socket";

let isConnected: boolean = false;

const eventHandlers = new Map<string, ((data: any) => void)[]>();

export function connect() {
    if (!isConnected) {
        socket.connect();
        isConnected = true;
        console.log("Socket conectado");
    }
}

export function disconnect() {
    if (isConnected) {
        socket.disconnect();
        isConnected = false;
        console.log("Socket desconectado");
    }
}

export function send(event: string, data: any) {
    if (isConnected) {
        socket.emit(event, data);
    } else {
        console.warn("Socket no está conectado. Llama a connect() primero");
    }
}

export function on(event: string, callback: (data: any) => void) {
    socket.on(event, callback);

    if (!eventHandlers.has(event)) {
        eventHandlers.set(event, []);
    }
    eventHandlers.get(event)?.push(callback);
}

export function off(event: string, callback?: (data: any) => void) {
    if (callback) {
        socket.off(event, callback);
        const handlers = eventHandlers.get(event);
        if (handlers) {
            const index = handlers.indexOf(callback);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    } else {

        socket.off(event);
        eventHandlers.delete(event);
    }
}

export function Status() {
    return isConnected;
}