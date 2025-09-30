import { useEffect, useState } from 'react';
import '../styles/ChatHeader.css';

const ChatHeader = ({ user }) => {
  const [userCount, setUserCount] = useState(0);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    // Aquí podrías conectar con socket.io para obtener el conteo de usuarios
    // Por ahora simulo la funcionalidad
    const updateUserCount = () => {
      // Esta lógica debería venir de tu socket handler
      setUserCount(0);
      setStatus('online');
    };

    updateUserCount();
  }, []);

  const handleLogout = () => {
    // Esta lógica debería estar en tu logout handler
    const logoutEvent = new CustomEvent('logout');
    window.dispatchEvent(logoutEvent);
  };

  return (
    <header className="header">
      <h3 className="title">Sena Chat</h3>
      <div className="header-info">
        <div className="info">
          <div id="status" className={status}></div>
          <div className="count">
            <span id="userCounter" className="count-counter">{userCount}</span> usuarios conectados
          </div>
        </div>
        <div 
          id="logoutButton" 
          className="logout-button" 
          title="Cerrar sesión"
          onClick={handleLogout}
        >
          {user.avatar ? (
            <img className="user-photo" src={user.avatar} alt="Avatar" />
          ) : (
            <span className="user-initial">{user.username.charAt(0).toUpperCase()}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;