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
}

export default chatUI;