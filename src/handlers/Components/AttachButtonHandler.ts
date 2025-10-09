import CamHandler from "@/handlers/Files/CamHandler";
import MicHandler from "@/handlers/Files/MicHandler";
import FileHandler from "@/handlers/Files/FileHandler";

class AttachButtonHandler {
  private attachButton: HTMLElement | null = null;
  private details: HTMLDetailsElement | null = null;
  private fileInput: HTMLInputElement | null = null;
  private btnMicrophone: HTMLElement | null = null;
  private btnCamera: HTMLElement | null = null;

  constructor() {
    this.initializeElements();
    this.attachEventListeners();
  }

  private initializeElements() {
    this.attachButton = document.getElementById('attachButton');
    this.details = this.attachButton?.querySelector('details') as HTMLDetailsElement;
    this.fileInput = this.attachButton?.querySelector('input[type="file"]') as HTMLInputElement;
    this.btnMicrophone = this.attachButton?.querySelector('#BtnMicrophone') as HTMLElement;
    this.btnCamera = this.attachButton?.querySelector('#BtnCamera') as HTMLElement;
  }

  private attachEventListeners() {
    if (this.attachButton && this.details && this.fileInput && this.btnMicrophone && this.btnCamera) {
      // Cerrar details al hacer click fuera
      document.addEventListener('click', (e) => {
        if (!this.attachButton?.contains(e.target as Node)) {
          this.details!.open = false;
        }
      });

      // Event listeners para cada handler
      this.btnMicrophone.addEventListener('click', () => {
        MicHandler.startRecording((isRecording: boolean) => {
          if (this.attachButton) {
            this.attachButton.classList.toggle('recording', isRecording);
          }
        });
      });

      this.btnCamera.addEventListener('click', () => {
        CamHandler.open();
      });

      this.fileInput.addEventListener('change', (event: Event) => {
        FileHandler.handleFileSelection(event);
      });
    }
  }

  // Método para cerrar el details programáticamente
  closeDetails(): void {
    if (this.details) {
      this.details.open = false;
    }
  }

  // Método para obtener el estado del details
  isDetailsOpen(): boolean {
    return this.details?.open || false;
  }
}

// Crear instancia única
const attachButtonHandler = new AttachButtonHandler();

// Exportar la instancia para uso externo si es necesario
export default attachButtonHandler;