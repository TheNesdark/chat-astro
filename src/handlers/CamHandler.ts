import FileManager from "@modules/FileManager";
import { getBlob } from "@utils/FileConverter";

const modal = document.getElementById('camModal') as HTMLDialogElement;
const video = document.getElementById('camVideo') as HTMLVideoElement;
const canvas = document.getElementById('camCanvas') as HTMLCanvasElement;
const btnCapture = document.getElementById('btnCapture') as HTMLLabelElement;
const camControls = document.getElementById('camControls') as HTMLDivElement;
const btnClose = document.getElementById('btnClose') as HTMLLabelElement;
const btnBack = document.getElementById('btnBack') as HTMLLabelElement;
const btnSend = document.getElementById('btnSend') as HTMLLabelElement;
let stream: MediaStream | null = null; 

if (btnClose) btnClose.addEventListener('click', closeCamera);
if (btnCapture) btnCapture.addEventListener('click', capturePhoto);
if (btnBack) btnBack.addEventListener('click', showCameraMode);
if (btnSend) btnSend.addEventListener('click', sendPhoto);
if (modal) modal.addEventListener('close', closeCamera);


async function camHandler() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();
    modal.showModal();
    showCameraMode(); 
  } catch (error) {
    console.error('Error accediendo a la cámara:', error);
    alert('No se pudo acceder a la cámara. Verifica permisos.');
  }
}


function closeCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null; 
  }
  if (video) {
    video.pause();
    video.srcObject = null;
    video.src = '';
  }
  if (modal) 
    modal.close();
}

function capturePhoto() {
  if (!video || !canvas || video.videoWidth <= 0) return;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
  showPreviewMode();
}

async function sendPhoto(): Promise<void> {
  if (!canvas) return;
  const blob = await getBlob(canvas);
  if (!blob) {
    console.error('No se pudo generar el blob.');
    return;
  }
  const filename = `photo_${Date.now()}.jpg`;
  const fileData = new File([blob], filename, { type: blob.type || 'image/jpeg' });
  FileManager.setFile(fileData);
  closeCamera();
}

function showPreviewMode() {
  if (camControls) camControls.style.display = 'flex';
  if (btnBack) btnBack.hidden = false;
  if (video) video.hidden = true;
  if (canvas) canvas.hidden = false;
  if (btnCapture) btnCapture.style.display = 'none';

}

function showCameraMode() {
  if (video) video.hidden = false;
  if (canvas) canvas.hidden = true;
  if (btnCapture) btnCapture.style.display = 'block';
  if (camControls) camControls.style.display = 'none';

}


export default camHandler;