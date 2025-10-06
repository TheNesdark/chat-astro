import FileManager from "@modules/FileManager";

class MicrophoneHandler {
  private static isRecording = false;
  private static mediaRecorder: MediaRecorder | null = null;
  private static stream: MediaStream | null = null;
  private static audioChunks: Blob[] = [];

  public static async startRecording(setIsRecording: (value: boolean) => void) {
    if (this.isRecording) return;
    const attachButton = document.getElementById('attachButton');

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.audioChunks.push(e.data);
      };

      this.mediaRecorder.onstop = () => {
        this.stopRecording();
        setIsRecording(false);
      };

      this.mediaRecorder.start(100);
      this.isRecording = true;
      setIsRecording(true);

      attachButton?.addEventListener('click', () => {
        this.mediaRecorder?.stop();
      }, { once: true });

    } catch (error) {
      console.error('Error en micrófono:', error);
      alert('No se pudo acceder al micrófono.');
      this.isRecording = false;
      setIsRecording(false);
    }
  }

  private static stopRecording() {
    this.mediaRecorder = null;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioChunks.length > 0) {
      const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
      const filename = `audio_${Date.now()}.webm`;
      const file = new File([blob], filename, { type: 'audio/webm' });
      FileManager.setFile(file);
      this.audioChunks = [];
    }
    this.isRecording = false;
  }

}

export default MicrophoneHandler;