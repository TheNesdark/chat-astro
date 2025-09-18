import FileManager from "@modules/FileManager";
import  chatUI  from "@ui/chatUI"
let isRecording = false;
const attachButton = document.getElementById('attachButton')!;

async function MicHandler() {
  if (isRecording) return;
  
  const audioChunks: Blob[] = []; 
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data);  
    };
    
    mediaRecorder.onstop = () => {

      stream.getTracks().forEach(track => track.stop());
      
      if (audioChunks.length > 0) {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        const filename = `audio_${Date.now()}.webm`; 
        const file = new File([blob], filename, { type: 'audio/webm' });
        FileManager.setFile(file);
      }
      
      isRecording = false;
      chatUI.updateButtonRecording(false);
    };
    
    mediaRecorder.start(100); 
    isRecording = true;
    chatUI.updateButtonRecording(true);
    
    attachButton.addEventListener('click', () => {
      mediaRecorder.stop();  
    }, { once: true });
    
  } catch (error) {
    console.error('Error en micrófono:', error);
    alert('No se pudo acceder al micrófono.');
    isRecording = false;
  }
}
export default MicHandler;