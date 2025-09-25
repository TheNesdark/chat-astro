import  chatUI from "@/utils/chatUI";


class FileManager {
    private static file: File | null = null;

    public static setFile(file: File) {
        this.file = file;
        chatUI.updateFileStatus(this.hasFile());
    }

    public static getFile() {
        return this.file;
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
