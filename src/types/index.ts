export interface Message {
    id: string;
    username: string;
    message: string;
    file?: File;
    timestamp: number;
}
export interface fileData {
    buffer: ArrayBuffer;
    type: string;
    name: string;
}
