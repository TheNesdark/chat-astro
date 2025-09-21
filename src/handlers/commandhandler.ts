import { send } from "@services/SocketService";
const commandHandler = (message: any) => {
    const args = message.message.slice(1).split(" ");
    const command = args.shift()?.toLowerCase();
    const prompt = args.join(" ");

    switch (command) {
        case "clear":
            send("clearChat", null);
            break;
        case "ask":
            send("ask", { message, prompt });
            break;
        case "image":
            send("image", { message, prompt });
            break;
            
        default:
            console.log(`Unknown command: ${command}`);
            break;
    }
};

export default commandHandler;