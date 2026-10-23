import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, Search, User, ChevronDown, Check, Shield,
  UserCheck, Building2, LogOut, Settings, Sparkles, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAlerts } from '../data/mockData';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, roleId, switchRole, roles } = useAuth();

  const [showAlerts, setShowAlerts] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [alertsList, setAlertsList] = useState(getAlerts());

  const alertRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = alertsList.filter(a => !a.read).length;

  // Click outside listener to close dropdowns cleanly
  useEffect(() => {
    function handleClickOutside(event) {
      if (alertRef.current && !alertRef.current.contains(event.target)) {
        setShowAlerts(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setAlertsList(prev => prev.map(a => ({ ...a, read: true })));
  };

  return (
    <header className="dashboard-header">
      {/* Global Search Bar */}
      <div className="header-search">
        <Search size={18} className="header-search-icon" />
        <input
          type="text"
          className="input header-search-input"
          placeholder="Search applications, institutions, documents, rules..."
        />
      </div>

      <div className="header-actions">
        {/* Notifications Wrapper */}
        <div className="header-notification-wrapper" ref={alertRef}>
          <button
            className={`header-icon-btn ${showAlerts ? 'active' : ''}`}
            onClick={() => {
              setShowAlerts(!showAlerts);
              setShowProfileMenu(false);
            }}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showAlerts && (
            <div className="alerts-dropdown">
              <div className="alerts-header">
                <div className="alerts-header-left">
                  <h4>Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="badge badge-danger font-mono">{unreadCount} New</span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button className="mark-read-btn" onClick={handleMarkAllRead}>
                    Mark all read
                  </button>
                )}
              </div>
              <div className="alerts-list">
                {alertsList.map(alert => (
                  <div key={alert.id} className={`alert-item ${!alert.read ? 'alert-unread' : ''}`}>
                    <div className={`status-indicator status-${alert.type}`} />
                    <div className="alert-content">
                      <div className="alert-title">{alert.title}</div>
                      <div className="alert-message">{alert.message}</div>
                      <div className="alert-time font-mono">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile & Dynamic Role Switcher Wrapper */}
        <div className="header-user-wrapper" ref={profileRef}>
          <div
            className={`header-user ${showProfileMenu ? 'active' : ''}`}
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowAlerts(false);
            }}
          >
            <div className="header-avatar font-mono">
              {currentUser.avatar}
            </div>
            <div className="header-user-info">
              <span className="header-username">{currentUser.name}</span>
              <span className="header-role font-mono">{currentUser.roleName}</span>
            </div>
            <ChevronDown size={14} className={`header-chevron ${showProfileMenu ? 'rotate' : ''}`} />
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown-menu">
              {/* User Overview Box */}
              <div className="profile-menu-header">
                <div className="p-avatar-large font-mono">{currentUser.avatar}</div>
                <div>
                  <div className="p-name">{currentUser.name}</div>
                  <div className="p-title">{currentUser.title}</div>
                  <span className="badge badge-success font-mono" style={{ marginTop: '0.35rem' }}>
                    {currentUser.badge}
                  </span>
                </div>
              </div>

              {/* Role Switcher Section */}
              <div className="role-switch-section">
                <span className="role-section-label font-mono">
                  SWITCH PORTAL ROLE:
                </span>
                <div className="role-options-list">
                  {Object.values(roles).map(role => (
                    <button
                      key={role.id}
                      className={`role-option-btn ${roleId === role.id ? 'active-role' : ''}`}
                      onClick={() => {
                        switchRole(role.id);
                        setShowProfileMenu(false);
                      }}
                    >
                      <div className="role-opt-left">
                        {role.id === 'admin' ? <Shield size={16} className="text-emerald" /> :
                         role.id === 'verifier' ? <UserCheck size={16} className="text-emerald" /> :
                         <Building2 size={16} className="text-vermilion" />}
                        <div className="role-opt-text">
                          <span className="role-opt-name">{role.roleName}</span>
                          <span className="role-opt-person">{role.name}</span>
                        </div>
                      </div>
                      {roleId === role.id && <Check size={16} className="text-emerald" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Links */}
              <div className="profile-menu-footer">
                <button
                  className="profile-footer-btn"
                  onClick={() => {
                    navigate('/dashboard/settings');
                    setShowProfileMenu(false);
                  }}
                >
                  <Settings size={15} />
                  Regulatory Settings
                </button>
                <button
                  className="profile-footer-btn text-vermilion"
                  onClick={() => navigate('/')}
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
