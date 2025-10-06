import FileManager from "@modules/FileManager";

class FileHandler {
  public static handleFileSelection(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    
    if (file) {
      FileManager.setFile(file);
    } else {
      console.warn('No se seleccionó ningún archivo');
    }
  }
}

export default FileHandler;