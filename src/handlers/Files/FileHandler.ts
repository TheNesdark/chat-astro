import FileManager from "@modules/FileManager";

class FileHandler {
  private fileInput: HTMLInputElement | null = null;

  constructor() {
    this.initializeElements();
  }

  private initializeElements() {
    this.fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  }

  handleFileSelection(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    
    if (file) {
      FileManager.setFile(file);
    } else {
      console.warn('No se seleccionó ningún archivo');
    }
  }

  // Método para resetear el input después de seleccionar
  resetInput(): void {
    if (this.fileInput) {
      this.fileInput.value = '';
    }
  }

  // Método para obtener el input actual
  getFileInput(): HTMLInputElement | null {
    return this.fileInput;
  }
}

// Crear instancia única
const fileHandler = new FileHandler();

// Exportar función que usa la instancia
export default (event: Event) => fileHandler.handleFileSelection(event);