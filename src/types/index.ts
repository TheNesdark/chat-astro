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

export interface Alert {
    id: number;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

export interface User {
    email: string;
    password: string;
    username: string;
    publicUrl: string | null;
}

export interface FileRenderProps {
    fileUrl: string;
    fileType: string;
    fileName?: string;
}

export interface AlertProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
  }
  