export interface Message {
    id: string;
    username: string;
    message: string;
    file?: File;
    timestamp: number;
}

export interface File {
    buffer: ArrayBuffer;
    type: string;
    name: string;
}
