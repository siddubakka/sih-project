import { createContext, useContext, useState } from 'react';

export const ROLES = {
  admin: {
    id: 'admin',
    name: 'Dr. Priya Sharma',
    title: 'Chief Scrutiny Officer & Regional Director',
    roleName: 'Administrator',
    badge: 'Administrator',
    avatar: 'PS',
    jurisdiction: 'AICTE Headquarters & Southern Region',
    dscValid: true,
    description: 'Executive authority: Approves EoA, schedules Expert Visits (EVC), configures AI threshold policies.',
  },
  verifier: {
    id: 'verifier',
    name: 'Mr. Rakesh Verma',
    title: 'Senior Scrutiny Inspector (Forensics)',
    roleName: 'Verification Officer',
    badge: 'Scrutiny Officer',
    avatar: 'RV',
    jurisdiction: 'Regional Scrutiny Committee',
    dscValid: true,
    description: 'Technical scrutiny: Evaluates OCR metadata, investigates forensic anomaly flags, queries DigiLocker.',
  },
  institution: {
    id: 'institution',
    name: 'Prof. K. Sundaram',
    title: 'Registrar, NIT Warangal',
    roleName: 'Institution User',
    badge: 'Institution User',
    avatar: 'KS',
    jurisdiction: 'NIT-WGL-001 (Telangana)',
    dscValid: false,
    description: 'Institutional applicant: Submits EoA 2026-27, uploads statutory certificates, views AI pre-validation scores.',
  },
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [roleId, setRoleId] = useState('admin');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [institutionDocs, setInstitutionDocs] = useState([
    {
      id: 'NIT-DOC-001',
      name: 'Fire_Safety_Certificate_2026.pdf',
      type: 'Fire Safety Certificate',
      uploadedAt: '23-Oct-2026, 10:15 AM',
      size: '2.4 MB',
      status: 'Flagged',
      aiScore: 72,
      anomalies: ['Font substitution in validity date', 'Photoshop metadata markers'],
    },
    {
      id: 'NIT-DOC-002',
      name: 'Land_Deed_Title_894.pdf',
      type: 'Land Documents',
      uploadedAt: '22-Oct-2026, 04:30 PM',
      size: '4.8 MB',
      status: 'Verified',
      aiScore: 98,
      anomalies: [],
    },
    {
      id: 'NIT-DOC-003',
      name: 'NAAC_Grade_Certificate.pdf',
      type: 'Accreditation Certificate (NAAC)',
      uploadedAt: '21-Oct-2026, 02:15 PM',
      size: '1.9 MB',
      status: 'Verified',
      aiScore: 99,
      anomalies: [],
    },
  ]);

  const currentUser = ROLES[roleId] || ROLES.admin;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const switchRole = (newRole) => {
    if (ROLES[newRole]) {
      setRoleId(newRole);
      showToast(`Switched perspective to ${ROLES[newRole].roleName} (${ROLES[newRole].name})`);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const addInstitutionDoc = (newDoc) => {
    setInstitutionDocs(prev => [newDoc, ...prev]);
    showToast(`AI Ingestion Complete: "${newDoc.name}" scanned and pre-validated (${newDoc.aiScore}% confidence)`);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      roleId,
      switchRole,
      roles: ROLES,
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebar,
      institutionDocs,
      addInstitutionDoc,
      toastMessage,
      showToast,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
