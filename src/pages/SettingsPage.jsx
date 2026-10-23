import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Sliders, Shield, Key, Users, Save,
  CheckCircle2, Sparkles, Database, Lock, RefreshCw
} from 'lucide-react';
import './SettingsPage.css';

export default function SettingsPage() {
  const [ocrThreshold, setOcrThreshold] = useState(80);
  const [anomalySensitivity, setAnomalySensitivity] = useState('High');
  const [handbookVersion, setHandbookVersion] = useState('APH 2026-27 (Latest Gazette)');
  const [autoVerifyDigiLocker, setAutoVerifyDigiLocker] = useState(true);
  const [requireDualSignoff, setRequireDualSignoff] = useState(true);
  const [toast, setToast] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setToast('Configuration settings updated and pushed to AICTE Scrutiny Cluster.');
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="settings-page">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="detail-toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Sparkles size={16} />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="page-header">
        <div>
          <h1 className="page-title">Regulatory & System Settings</h1>
          <p className="page-subtitle">
            Configure algorithmic confidence thresholds, external API gateways, Approval Process Handbook editions, and audit rules
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={handleSave}>
          <Save size={14} />
          Save Configurations
        </button>
      </div>

      <div className="settings-grid">
        {/* Card 1: AI & OCR Decision Engine Thresholds */}
        <div className="card settings-section-card">
          <div className="settings-card-head">
            <Sliders size={20} className="text-primary" />
            <div>
              <h3>AI Decision & OCR Scrutiny Thresholds</h3>
              <p>Parameters governing automated preliminary validation and flag sensitivity</p>
            </div>
          </div>

          <div className="settings-form-body">
            <div className="form-group">
              <label>
                Minimum OCR Confidence Score Cutoff: <strong>{ocrThreshold}%</strong>
              </label>
              <input
                type="range"
                min={60}
                max={95}
                step={5}
                value={ocrThreshold}
                onChange={e => setOcrThreshold(Number(e.target.value))}
                className="calc-range"
              />
              <span className="field-hint">Documents scoring below this threshold require officer manual verification.</span>
            </div>

            <div className="form-group">
              <label>Forensic Tamper Detection Sensitivity</label>
              <select
                value={anomalySensitivity}
                onChange={e => setAnomalySensitivity(e.target.value)}
                className="input"
              >
                <option value="Standard">Standard — Flags font substitutions & missing dates</option>
                <option value="High">High — Deep PDF metadata, compression artifacts & glyph inspection (Recommended)</option>
                <option value="Ultra-Strict">Ultra-Strict — Flags any metadata timestamp variance over 5 minutes</option>
              </select>
            </div>

            <div className="form-check-group">
              <input
                type="checkbox"
                id="autoDigi"
                checked={autoVerifyDigiLocker}
                onChange={e => setAutoVerifyDigiLocker(e.target.checked)}
              />
              <label htmlFor="autoDigi">
                <strong>Automatic DigiLocker Resolution</strong>
                <span>Directly query DigiLocker repository for instant verification upon document ingestion</span>
              </label>
            </div>

            <div className="form-check-group">
              <input
                type="checkbox"
                id="dualSign"
                checked={requireDualSignoff}
                onChange={e => setRequireDualSignoff(e.target.checked)}
              />
              <label htmlFor="dualSign">
                <strong>Mandatory Dual Sign-Off for EoA Grant</strong>
                <span>Requires both AI validation clearance and Regional Officer digital signature before EoA issue</span>
              </label>
            </div>
          </div>
        </div>

        {/* Card 2: Handbook Edition & Regulatory Framework */}
        <div className="card settings-section-card">
          <div className="settings-card-head">
            <Shield size={20} className="text-accent" />
            <div>
              <h3>Regulatory Baseline & Handbook Rules</h3>
              <p>Active rule engine specifications and statutory reference standards</p>
            </div>
          </div>

          <div className="settings-form-body">
            <div className="form-group">
              <label>Active AICTE Approval Process Handbook (APH)</label>
              <select
                value={handbookVersion}
                onChange={e => setHandbookVersion(e.target.value)}
                className="input"
              >
                <option value="APH 2026-27 (Latest Gazette)">APH 2026-27 (Gazetted Version — Active)</option>
                <option value="APH 2025-26 (Legacy Cycle)">APH 2025-26 (Legacy Appeals & Arrears)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Inspection Mandate Policy</label>
              <input
                type="text"
                readOnly
                value="Auto-schedule EVC for any institution with ≥ 2 Critical Non-Compliances"
                className="input"
                style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}
              />
            </div>

            <div className="form-group">
              <label>National Academic Depository (NAD) Sync</label>
              <input
                type="text"
                readOnly
                value="Active • Connected to ABC (Academic Bank of Credits)"
                className="input"
                style={{ background: 'var(--color-surface)', color: 'var(--color-success)' }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: External Authority API Keys */}
        <div className="card settings-section-card">
          <div className="settings-card-head">
            <Key size={20} className="text-warning" />
            <div>
              <h3>API Gateway Credentials</h3>
              <p>Secure tokens for DigiLocker, University Registrar, and State Portals</p>
            </div>
          </div>

          <div className="settings-form-body">
            <div className="form-group">
              <label>DigiLocker Client ID</label>
              <input
                type="text"
                readOnly
                value="DL-GOV-AICTE-PROD-99841"
                className="input font-mono"
              />
            </div>

            <div className="form-group">
              <label>API Secret Key</label>
              <input
                type="password"
                readOnly
                value="••••••••••••••••••••••••••••••••"
                className="input font-mono"
              />
            </div>

            <div className="form-group">
              <label>Webhook Callback URL</label>
              <input
                type="text"
                readOnly
                value="https://smartapproval.aicte-india.org/api/v1/callbacks/authority"
                className="input font-mono"
              />
            </div>
          </div>
        </div>

        {/* Card 4: RBAC & User Administration */}
        <div className="card settings-section-card">
          <div className="settings-card-head">
            <Users size={20} className="text-primary" />
            <div>
              <h3>Role-Based Access Control (RBAC)</h3>
              <p>Current session authority and assigned scrutiny jurisdictions</p>
            </div>
          </div>

          <div className="settings-form-body">
            <div className="user-role-summary-box">
              <div className="role-avatar">
                <Users size={20} />
              </div>
              <div>
                <h4>Dr. Priya Sharma</h4>
                <p>Regional Director & Scrutiny Officer (Southern Region)</p>
                <span className="badge badge-success" style={{ marginTop: '0.4rem' }}>Class-A DSC Authenticated</span>
              </div>
            </div>

            <div className="jurisdiction-tags">
              <span className="doc-pill">Telangana</span>
              <span className="doc-pill">Andhra Pradesh</span>
              <span className="doc-pill">Tamil Nadu</span>
              <span className="doc-pill">Karnataka</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
