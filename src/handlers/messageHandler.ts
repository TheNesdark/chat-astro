import FileManager from "@modules/FileManager";
import messageService from "@services/MessageService";
import commandHandler from "./commandhandler";

const form = document.getElementById("messageForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const message = target.message.value.trim();
  if (!message && !FileManager.hasFile()) return;

    const messageData: any = {
    username: "user",
    message: message,
    file: null,
  };

  if (message.startsWith("/")) {
    commandHandler(messageData);
    target.message.value = "";
    return;
  }

  if (FileManager.hasFile()) {
     messageData.file = await FileManager.getFileAsBuffer();
 
  }

  messageService.sendMessage(messageData);

  target.message.value = "";
  FileManager.clearFile();
});
