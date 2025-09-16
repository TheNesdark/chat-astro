import  chatUI from "@/ui/chatUI";

export interface fileData {
    buffer: ArrayBuffer;
    type: string;
    name: string;
}

class FileManager {
    private static file: File | null = null;

    public static setFile(file: File) {
        this.file = file;
        chatUI.updateFileStatus(this.hasFile());
    }

    public static getFile() {
        return this.file;
    }

    public static async getFileAsBuffer(): Promise<fileData | null> {
        try {
            const file = this.getFile();
            if (!file) return null;
            
            const buffer = await file.arrayBuffer();

            return {
                buffer: buffer,
                type: file.type,
                name: file.name,
            };

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public static clearFile() {
        this.file = null;
        chatUI.updateFileStatus(this.hasFile());
    }

    public static hasFile() {
        return this.file !== null;
    }

}

export default FileManager;
