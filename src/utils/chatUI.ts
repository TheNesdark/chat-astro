const chatUI = {
    updateUserCounter: (counter: number) => {
        const counterElement = document.getElementById("userCounter")!;
        counterElement.innerText = counter.toString();
    },
    updateConnectionStatus: (status: boolean) => {
        const statusElement = document.getElementById("status")!;
        statusElement.className = status ? "online" : "offline";
    }, 
    updateFileStatus: (status: boolean) => {
        const attachButton = document.getElementById("attachButton")!;
        attachButton.classList.toggle("HasFile", status);
    },
    updateButtonRecording: (status: boolean) => {
        const attachButton = document.getElementById("attachButton")!;
        attachButton.classList.toggle("recording", status);
    },
    addAlert: (message: string, type: string) => {
        const event = new CustomEvent("alert", { detail: { message, type } });
        window.dispatchEvent(event);
    },
}

export default chatUI;