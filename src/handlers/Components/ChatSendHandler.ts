import FileManager from "@modules/FileManager";
import { send } from "@services/SocketService";
import commandHandler from "../commandhandler";

const form = document.getElementById("messageForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const message = target.message.value.trim();
  if (!message && !FileManager.hasFile()) return;

    const messageData: any = {
    content: message,
    file_url: null,
    file_type: null,
    file_name: null,
  };

  if (message.startsWith("/")) {
    commandHandler(messageData);
    target.message.value = "";
    return;
  }

  if (FileManager.hasFile()) {
     const fileData = FileManager.getFile()
     const File = new FormData();
     File.append('file', fileData);
     const response = await fetch('/api/uploadFile', {
       method: 'POST',
       body: File
     });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error uploading file:', errorText);
        return;
      }

      const { publicUrl, type, name } = await response.json();
      messageData.file_url = publicUrl;
      messageData.file_type = type;
      messageData.file_name = name;
  }


  send("sendMessage", messageData);

  target.message.value = "";
  FileManager.clearFile();
});
