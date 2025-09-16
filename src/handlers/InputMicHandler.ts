import FileManager from "@modules/FileManager";
import  chatUI  from "@ui/chatUI"
let isRecording = false;
const micInput = document.getElementById("micInput") as HTMLInputElement;
const attachButton = document.querySelector(".attachButton")!;
micInput.addEventListener("click", async () => {
    if (isRecording) return;
    const audioChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
    });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/webm" });
        const file = new File([blob], "audio.webm", { type: "audio/webm" });
        FileManager.setFile(file);
    };

    mediaRecorder.start();
    isRecording = true;
    chatUI.updateButtonRecording(true);
    attachButton.addEventListener("click", () => {
        mediaRecorder.stop();
        isRecording = false;
        chatUI.updateButtonRecording(false);
        
    }, { once: true });

});