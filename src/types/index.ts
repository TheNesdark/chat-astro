export interface Message {
    id: string;
    user_id: string;
    username: string;
    content: string;
    file_url: string;
    file_type: string;
    file_name: string;
    timestamp: number;
}

export interface MessageData {
    content: string;
    file_url: string | null;
    file_type: string | null;
    file_name: string | null;
}
