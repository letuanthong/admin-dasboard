import { useState } from 'react';
import "./navbar.scss";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/authentication';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  
  const handleSettingsClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Thực hiện hành động logout ở đây
    const token = sessionStorage.getItem('token') ?? '';
    logout(token);
    console.log('Logged out');
    setShowMenu(false);
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>ADMIN DASHBOARD</span>
      </div>
      <div className="icons">
        <div className="settings" onClick={handleSettingsClick}>
          <img src="/settings.svg" alt="" className="icon" />
          {showMenu && (
            <div className="settings-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
