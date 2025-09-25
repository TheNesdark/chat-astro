import "@styles/ChatSend.css"
import useMessages from "@hooks/useMessages.ts"
import { useState } from "react"


export default function ChatForm() {
    const { messageInput, setMessageInput, sendMessage } = useMessages()
    const [showCommands, setShowCommands] = useState(false)
    
    const handleInputChange = (e) => {
        const value = e.target.value
        setMessageInput(value)
        setShowCommands(value.startsWith("/"))

    }

    return (
        <form className="form" onSubmit={sendMessage}>
            {showCommands && (
                <div className="commands-panel">
                    <h3>Comandos disponibles:</h3>
                    <ul>
                        <li><code>/ask</code> - Pregunta algo</li>
                        <li><code>/help</code> - Muestra ayuda</li>
                        <li><code>/clear</code> - Limpia el chat</li>
                    </ul>
                </div>
            )}
            
            <input
                className="input"
                name="message"
                type="text"
                onChange={handleInputChange}
                value={messageInput}
                autoComplete="off"
                autoFocus
                placeholder="Escribe un mensaje..."
            />
            
            <button 
                className="send"
                type="submit"
            >
                <img src="/src/assets/icons/send.svg" alt="send" className="icon" />
            </button>
        </form>
    );
}