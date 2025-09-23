import FileManager from "@modules/FileManager";
import chatUI from "@ui/chatUI";

class MicrophoneHandler {
  private isRecording: boolean = false;
  private attachButton: HTMLElement | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;

  constructor() {
    this.initializeElements();
  }

  private initializeElements() {
    this.attachButton = document.getElementById('attachButton');
  }

  async startRecording() {
    if (this.isRecording) return;
    
    const audioChunks: Blob[] = [];
    
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };
      
      this.mediaRecorder.onstop = () => {
        this.stopStream();
        
        if (audioChunks.length > 0) {
          const blob = new Blob(audioChunks, { type: 'audio/webm' });
          const filename = `audio_${Date.now()}.webm`;
          const file = new File([blob], filename, { type: 'audio/webm' });
          FileManager.setFile(file);
        }
        
        this.isRecording = false;
        chatUI.updateButtonRecording(false);
      };
      
      this.mediaRecorder.start(100);
      this.isRecording = true;
      chatUI.updateButtonRecording(true);
      
      if (this.attachButton) {
        this.attachButton.addEventListener('click', () => {
          this.stopRecording();
        }, { once: true });
      }
      
    } catch (error) {
      console.error('Error en micrófono:', error);
      alert('No se pudo acceder al micrófono.');
      this.isRecording = false;
      chatUI.updateButtonRecording(false);
    }
  }

  private stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
    }
  }

  private stopStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }
}

// Crear instancia única
const microphoneHandler = new MicrophoneHandler();

// Exportar función que usa la instancia
export default () => microphoneHandler.startRecording();