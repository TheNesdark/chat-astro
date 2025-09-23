import FileManager from "@modules/FileManager";
import { getBlob } from "@utils/FileConverter";

class CameraHandler {
  private modal: HTMLDialogElement | null = null;
  private video: HTMLVideoElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private btnCapture: HTMLLabelElement | null = null;
  private camControls: HTMLDivElement | null = null;
  private btnClose: HTMLLabelElement | null = null;
  private btnBack: HTMLLabelElement | null = null;
  private btnSend: HTMLLabelElement | null = null;
  private stream: MediaStream | null = null;
  private isRecording: boolean = false;

  constructor() {
    this.initializeElements();
    this.attachEventListeners();
  }

  private initializeElements() {
    this.modal = document.getElementById('camModal') as HTMLDialogElement;
    this.video = document.getElementById('camVideo') as HTMLVideoElement;
    this.canvas = document.getElementById('camCanvas') as HTMLCanvasElement;
    this.btnCapture = document.getElementById('btnCapture') as HTMLLabelElement;
    this.camControls = document.getElementById('camControls') as HTMLDivElement;
    this.btnClose = document.getElementById('btnClose') as HTMLLabelElement;
    this.btnBack = document.getElementById('btnBack') as HTMLLabelElement;
    this.btnSend = document.getElementById('btnSend') as HTMLLabelElement;
  }

  private attachEventListeners() {
    if (this.btnClose) this.btnClose.addEventListener('click', () => this.close());
    if (this.btnCapture) this.btnCapture.addEventListener('click', () => this.capturePhoto());
    if (this.btnBack) this.btnBack.addEventListener('click', () => this.showCameraMode());
    if (this.btnSend) this.btnSend.addEventListener('click', () => this.sendPhoto());
    if (this.modal) this.modal.addEventListener('close', () => this.close());
  }

  async open() {
    if (this.isRecording) {
      return;
    }
    
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.video) {
        this.video.srcObject = this.stream;
        await this.video.play();
      }
      this.isRecording = true;
      if (this.modal) this.modal.showModal();
      this.showCameraMode();
    } catch (error) {
      console.error('Error accediendo a la cámara:', error);
      alert('No se pudo acceder a la cámara. Verifica permisos.');
    }
  }

  close() {
    if (!this.isRecording) {
      return;
    }
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    if (this.video) {
      this.video.pause();
      this.video.srcObject = null;
      this.video.src = '';
    }
    
    if (this.modal) {
      this.modal.close();
      this.isRecording = false;
    }
  }

  private capturePhoto() {
    if (!this.isRecording) {
      return;
    }
    if (!this.video || !this.canvas || this.video.videoWidth <= 0)  return;
    
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    }
    this.showPreviewMode();
  }

  private async sendPhoto(): Promise<void> {
    if (!this.isRecording) {
      return;
    }
    if (!this.canvas) return;
    
    const blob = await getBlob(this.canvas);
    if (!blob) {
      console.error('No se pudo generar el blob.');
      return;
    }
    
    const filename = `photo_${Date.now()}.jpg`;
    const fileData = new File([blob], filename, { type: blob.type || 'image/jpeg' });
    FileManager.setFile(fileData);
    this.close();
  }

  private showPreviewMode() {
    if (!this.isRecording) {
      return;
    }
    if (this.camControls) this.camControls.style.display = 'flex';
    if (this.btnBack) this.btnBack.hidden = false;
    if (this.video) this.video.hidden = true;
    if (this.canvas) this.canvas.hidden = false;
    if (this.btnCapture) this.btnCapture.style.display = 'none';
  }

  private showCameraMode() {
    if (!this.isRecording) {
      return;
    }
    if (this.video) this.video.hidden = false;
    if (this.canvas) this.canvas.hidden = true;
    if (this.btnCapture) this.btnCapture.style.display = 'block';
    if (this.camControls) this.camControls.style.display = 'none';
  }
}

// Crear instancia única
const cameraHandler = new CameraHandler();

// Exportar función que usa la instancia
export default () => cameraHandler.open();