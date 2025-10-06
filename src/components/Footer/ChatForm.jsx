import useMessages from "@hooks/useMessages.tsx"
import { useState } from "react"
import sendIcon from '@/assets/icons/send.svg';

export default function ChatForm() {
    const { messageInput, setMessageInput, sendMessage } = useMessages()
    const [showCommands, setShowCommands] = useState(false)
    
    const handleInputChange = (e) => {
        const value = e.target.value
        if (value.startsWith("/")) {
            setShowCommands(true)
        } else {
            setShowCommands(false)
        }
        setMessageInput(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
        setShowCommands(false);
    }

    return (
        <form className="chat-form" onSubmit={handleSubmit}>
            {showCommands && (
                <div className="chat-commands-panel">
                    <h3>Comandos disponibles:</h3>
                    <ul>
                        <li><code>/ask</code> - Pregunta algo</li>
                        <li><code>/help</code> - Muestra ayuda</li>
                        <li><code>/clear</code> - Limpia el chat</li>
                    </ul>
                </div>
            )}
            
            <input
                className="chat-input"
                name="message"
                type="text"
                onChange={handleInputChange}
                value={messageInput}
                autoComplete="off"
                autoFocus
                placeholder="Escribe un mensaje..."
            />
            
            <button 
                className="chat-send-button"
                type="submit"
            >
                <img src={sendIcon.src} alt="send" className="icon" />
            </button>
        </form>
    );
}