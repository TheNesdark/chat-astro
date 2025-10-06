import useStatus from '@/hooks/useStatus';
import '@/styles/components/ChatHeader.css';

export default function ChatHeader({ user }) {
  const { userCount, status, handleLogout } = useStatus();

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

