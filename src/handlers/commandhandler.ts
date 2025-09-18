import messageService from "../services/MessageService";
const commandHandler = (message: any) => {
    const args = message.message.slice(1).split(" ");
    const command = args.shift()?.toLowerCase();
    const prompt = args.join(" ");

    switch (command) {
        case "clear":
            messageService.clearChat();
            break;
        case "ask":
            messageService.sendMessage(message)
            messageService.ask(prompt);
            break;
        case "image":
            messageService.sendMessage(message)
            messageService.generateImage(prompt);
            break;
            
        default:
            console.log(`Unknown command: ${command}`);
            break;
    }
};

export default commandHandler;