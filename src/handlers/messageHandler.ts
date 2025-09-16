import { getSocket } from "@modules/socket.ts";
import FileManager from "@modules/FileManager.ts";
import messageService from "@services/MessageService.ts";

const form = document.getElementById("messageForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const message = target.message.value.trim();
  if (!message && !FileManager.hasFile()) return;

  const socket = getSocket();
  
  const messageData: any = {
    username: "user",
    message: message,
    file: null,
  };

  if (FileManager.hasFile()) {
     messageData.file = await FileManager.getFileAsBuffer();
 
  }

  messageService.sendMessage(messageData);

  target.message.value = "";
  FileManager.clearFile();
});
