import FileManager from "@modules/FileManager";

function FileHandler(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
        FileManager.setFile(file);
    } else {
        return;
    }
};

export default FileHandler;