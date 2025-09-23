import FileManager from "@modules/FileManager";
import { send } from "@services/SocketService";
import commandHandler from "../commandhandler";
import type { MessageData } from "@/types";
import { actions } from "astro:actions";

const form = document.getElementById("messageForm");
const input = form.querySelector("input[name='message']") as HTMLInputElement;
const comands = form.querySelector(".comands")

input.addEventListener("change", () => {
  const message = input.value.trim();
  if (message.startsWith("/")) {
    comands.style
  }
})

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const message = target.message.value.trim();
  if (!message && !FileManager.hasFile()) return;

    const messageData: MessageData = {
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
     const formData = new FormData();
     formData.append("file", fileData);
     const { data , error} = await actions.uploadFile( formData);
     if (error) {
       console.error(error);
       return;
     }
     messageData.file_url = data.publicUrl;
     messageData.file_type = data.type;
     messageData.file_name = data.name;
  }


  send("sendMessage", messageData);

  target.message.value = "";
  FileManager.clearFile();
});
