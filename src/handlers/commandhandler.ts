import { send } from "@services/SocketService";
const commandHandler = (message: any) => {
    const args = message.slice(1).split(" ");
    const command = args.shift()?.toLowerCase();
    const prompt = args.join(" ");

    switch (command) {
        case "ask":
            send("ask", prompt );
            break;
        default:
            console.log(`Unknown command: ${command}`);
            break;
    }
};

export default commandHandler;