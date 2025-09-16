import FileManager from "@modules/FileManager";

const fileInput = document.getElementById("fileInput") as HTMLInputElement;
fileInput.addEventListener("change", (e) => {
    const file = fileInput.files?.[0];
    if (file) {
        FileManager.setFile(file);
    } else {
        return;
    }
});
