import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AICopilotDrawer from './components/AICopilotDrawer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardHome from './pages/DashboardHome';
import ApplicationsPage from './pages/ApplicationsPage';
import ApplicationDetailPage from './pages/ApplicationDetailPage';
import DocumentValidatorPage from './pages/DocumentValidatorPage';
import AnomalyDetectionPage from './pages/AnomalyDetectionPage';
import VerificationCenterPage from './pages/VerificationCenterPage';
import ComplianceCheckerPage from './pages/ComplianceCheckerPage';
import AuditTrailPage from './pages/AuditTrailPage';
import SettingsPage from './pages/SettingsPage';
import { Sparkles } from 'lucide-react';

function DashboardLayout() {
  const { sidebarCollapsed, toastMessage } = useAuth();

  return (
    <div className={`dashboard-layout ${sidebarCollapsed ? 'sidebar-collapsed-layout' : ''}`}>
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      {/* Floating AICTE Neural Scrutiny Copilot */}
      <AICopilotDrawer />

      {/* Global Toast */}
      {toastMessage && (
        <div className="detail-toast">
          <Sparkles size={16} className="text-vermilion" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Subsystem */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="applications/:id" element={<ApplicationDetailPage />} />
        <Route path="documents" element={<DocumentValidatorPage />} />
        <Route path="anomalies" element={<AnomalyDetectionPage />} />
        <Route path="verification" element={<VerificationCenterPage />} />
        <Route path="compliance" element={<ComplianceCheckerPage />} />
        <Route path="audit" element={<AuditTrailPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
