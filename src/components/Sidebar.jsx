import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, LayoutDashboard, FileText, FileSearch, AlertTriangle,
  Globe, CheckSquare, Clock, Settings, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/dashboard/applications', icon: FileText, label: 'Applications' },
  { path: '/dashboard/documents', icon: FileSearch, label: 'Document Validator' },
  { path: '/dashboard/anomalies', icon: AlertTriangle, label: 'Anomaly Detection' },
  { path: '/dashboard/verification', icon: Globe, label: 'Verification Center' },
  { path: '/dashboard/compliance', icon: CheckSquare, label: 'Compliance' },
  { path: '/dashboard/audit', icon: Clock, label: 'Audit Trail' },
  { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, currentUser } = useAuth();
  const location = useLocation();

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <Shield size={24} strokeWidth={1.7} />
        </div>
        {!sidebarCollapsed && (
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name font-display">SmartApproval</span>
            <span className="nav-brand-badge font-mono">AI</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              {isActive && (
                <motion.div
                  className="sidebar-active-bg"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon size={20} strokeWidth={1.8} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <NavLink to="/" className="sidebar-link sidebar-logout">
          <LogOut size={20} strokeWidth={1.8} />
          {!sidebarCollapsed && <span>Exit to Portal</span>}
        </NavLink>
      </div>

      {/* Collapse Toggle */}
      <button
        className="sidebar-collapse-btn"
        onClick={toggleSidebar}
        title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
