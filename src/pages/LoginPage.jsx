import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, Lock, Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';
import './LoginPage.css';

const ROLES = [
  { id: 'admin', label: 'Administrator', desc: 'Full access to all modules', color: '#3373f6' },
  { id: 'verifier', label: 'Verification Officer', desc: 'Document review & verification', color: '#2dd4bf' },
  { id: 'institution', label: 'Institution User', desc: 'Submit & track applications', color: '#8b5cf6' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('admin@aicte.gov.in');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-bg-grid" />
      <div className="login-bg-glow" />

      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Panel */}
        <div className="login-brand-panel">
          <div className="login-brand-content">
            <div className="login-logo">
              <Shield size={36} strokeWidth={1.5} />
            </div>
            <h1>SmartApproval <span className="login-ai-badge">AI</span></h1>
            <p>AICTE's Intelligent Approval Processing Platform</p>

            <div className="login-features">
              {[
                'AI-Powered Document Validation',
                'Real-time Anomaly Detection',
                'Automated Compliance Checks',
                'Issuing Authority Verification',
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  className="login-feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Zap size={14} />
                  <span>{feat}</span>
                </motion.div>
              ))}
            </div>

            <div className="login-brand-footer">
              <span>Ministry of Education, Government of India</span>
            </div>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="login-form-panel">
          <div className="login-form-header">
            <h2>Welcome Back</h2>
            <p>Select your role and sign in to continue</p>
          </div>

          {/* Role Selector */}
          <div className="role-selector">
            {ROLES.map(role => (
              <button
                key={role.id}
                className={`role-card ${selectedRole === role.id ? 'role-card-active' : ''}`}
                onClick={() => setSelectedRole(role.id)}
                style={{ '--role-color': role.color }}
              >
                <User size={18} />
                <div>
                  <div className="role-label">{role.label}</div>
                  <div className="role-desc">{role.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  className="input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg login-submit">
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="login-demo-note">
            Demo mode — click Sign In with any password to explore the platform.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
