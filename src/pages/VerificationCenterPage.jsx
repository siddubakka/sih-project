import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Shield, CheckCircle2, AlertTriangle, RefreshCw,
  Server, Zap, Database, ArrowRight, Play, Terminal,
  Building, Check, X, Sparkles, Activity
} from 'lucide-react';
import './VerificationCenterPage.css';

const initialAuthorities = [
  {
    id: 'digilocker',
    name: 'DigiLocker National Gateway',
    category: 'National Repository',
    endpoint: 'https://api.digitallocker.gov.in/v3/certificates/verify',
    status: 'Operational',
    latency: '185ms',
    uptime: '99.98%',
    totalQueries: '14,290',
    successRate: '98.2%',
    docTypes: ['Affidavits', 'Land Deeds', 'PAN/GST', 'Birth Certificates'],
  },
  {
    id: 'university',
    name: 'National University Affiliation Network',
    category: 'Higher Education API',
    endpoint: 'https://affiliation.ugc.ac.in/api/v2/institutes/status',
    status: 'Operational',
    latency: '310ms',
    uptime: '99.4%',
    totalQueries: '8,410',
    successRate: '95.6%',
    docTypes: ['Course Affiliation', 'Sanctioned Intake', 'Academic NOC'],
  },
  {
    id: 'state_noc',
    name: 'State Directorate of Technical Education',
    category: 'State Government Portal',
    endpoint: 'https://dte.state.gov.in/api/noc/verify',
    status: 'Operational',
    latency: '420ms',
    uptime: '98.7%',
    totalQueries: '5,180',
    successRate: '93.4%',
    docTypes: ['State NOC', 'Land Classification Certificate'],
  },
  {
    id: 'fire_safety',
    name: 'State Disaster & Fire Safety Gateway',
    category: 'Emergency Services',
    endpoint: 'https://fireservice.state.gov.in/v1/compliance/check',
    status: 'Degraded',
    latency: '890ms',
    uptime: '94.2%',
    totalQueries: '3,890',
    successRate: '88.1%',
    docTypes: ['Fire Safety Certificate', 'Occupancy NOC'],
  },
  {
    id: 'naac_nba',
    name: 'NAAC / NBA Accreditation Ledger',
    category: 'Accreditation Authority',
    endpoint: 'https://naac.gov.in/api/accreditation/validate',
    status: 'Operational',
    latency: '240ms',
    uptime: '99.9%',
    totalQueries: '6,720',
    successRate: '99.1%',
    docTypes: ['NAAC Grade', 'NBA Programme Accreditation'],
  },
];

const initialLogs = [
  { time: '11:48:22', auth: 'DigiLocker', req: 'GET /v3/cert/TS-LAND-2024-889', status: '200 OK', latency: '192ms', result: 'Match Confirmed' },
  { time: '11:47:05', auth: 'University Portal', req: 'POST /v2/affiliation/check', status: '200 OK', latency: '315ms', result: 'Valid Up to AY 2026-27' },
  { time: '11:45:33', auth: 'Fire Safety Gateway', req: 'GET /v1/fsc/DL-FIRE-9941', status: '404 Not Found', latency: '920ms', result: 'Certificate Not Found in DB' },
  { time: '11:43:18', auth: 'NAAC Registry', req: 'GET /api/grade/TS-089', status: '200 OK', latency: '230ms', result: 'Grade A+ Confirmed' },
  { time: '11:40:02', auth: 'DigiLocker', req: 'GET /v3/affidavit/NOTARY-5541', status: '200 OK', latency: '180ms', result: 'Digital Signature Verified' },
];

export default function VerificationCenterPage() {
  const [authorities, setAuthorities] = useState(initialAuthorities);
  const [logs, setLogs] = useState(initialLogs);
  const [isVerifyingBatch, setIsVerifyingBatch] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleRunBatchVerification = () => {
    setIsVerifyingBatch(true);
    showToast('Dispatching automated batch verification to 5 issuing authority endpoints...');

    setTimeout(() => {
      const newLog = {
        time: new Date().toLocaleTimeString(),
        auth: 'DigiLocker',
        req: 'POST /v3/batch/verify-all (12 documents)',
        status: '200 OK',
        latency: '340ms',
        result: '11 Verified, 1 Mismatch Flagged',
      };
      setLogs(prev => [newLog, ...prev]);
      setIsVerifyingBatch(false);
      showToast('Batch verification cycle finished. 11/12 certificates cryptographically authenticated.');
    }, 2200);
  };

  return (
    <div className="verification-center-page">
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
          <h1 className="page-title">Issuing Authority Verification Center</h1>
          <p className="page-subtitle">
            Secure, encrypted microservice gateways querying original issuing authorities directly to eliminate paper fraud and delays
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={handleRunBatchVerification}
          disabled={isVerifyingBatch}
        >
          {isVerifyingBatch ? <RefreshCw size={14} className="spin-anim" /> : <Play size={14} />}
          {isVerifyingBatch ? 'Running Live Batch Query...' : 'Run Automated Batch Verification'}
        </button>
      </div>

      {/* Gateway Status Cards */}
      <div className="gateway-cards-grid">
        {authorities.map(auth => (
          <div key={auth.id} className="card gateway-card">
            <div className="gateway-top">
              <div className="gateway-icon-box">
                <Globe size={22} />
              </div>
              <div className="gateway-title-box">
                <h3 className="gateway-name">{auth.name}</h3>
                <span className="gateway-cat">{auth.category}</span>
              </div>
              <span className={`badge badge-${auth.status === 'Operational' ? 'success' : 'warning'}`}>
                {auth.status}
              </span>
            </div>

            <div className="endpoint-code font-mono">{auth.endpoint}</div>

            <div className="gateway-stats-row">
              <div className="g-stat">
                <span className="g-stat-k">Latency</span>
                <span className="g-stat-v">{auth.latency}</span>
              </div>
              <div className="g-stat">
                <span className="g-stat-k">Uptime</span>
                <span className="g-stat-v">{auth.uptime}</span>
              </div>
              <div className="g-stat">
                <span className="g-stat-k">Queries</span>
                <span className="g-stat-v">{auth.totalQueries}</span>
              </div>
              <div className="g-stat">
                <span className="g-stat-k">Match Rate</span>
                <span className="g-stat-v text-success">{auth.successRate}</span>
              </div>
            </div>

            <div className="gateway-footer">
              <div className="doc-tags-wrap">
                {auth.docTypes.map(d => (
                  <span key={d} className="doc-pill">{d}</span>
                ))}
              </div>
              <button
                className="btn btn-ghost btn-xs"
                onClick={() => showToast(`Handshake successful: ${auth.name} responding in ${auth.latency}`)}
              >
                Test Ping
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Transaction Logs */}
      <div className="card log-terminal-card">
        <div className="card-header">
          <div className="log-header-left">
            <Terminal size={18} className="text-primary" />
            <h3>Real-Time Authority Verification Log Stream</h3>
          </div>
          <span className="badge badge-info">Encrypted TLS 1.3 Transport</span>
        </div>

        <div className="table-container">
          <table className="table font-mono" style={{ fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Issuing Authority</th>
                <th>Request Endpoint</th>
                <th>HTTP Status</th>
                <th>Latency</th>
                <th>Authentication Verdict</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--color-text-muted)' }}>{log.time}</td>
                  <td style={{ color: 'var(--color-primary-400)', fontWeight: 600 }}>{log.auth}</td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{log.req}</td>
                  <td>
                    <span className={`badge badge-${log.status.startsWith('200') ? 'success' : 'danger'}`}>
                      {log.status}
                    </span>
                  </td>
                  <td>{log.latency}</td>
                  <td style={{ color: log.status.startsWith('200') ? 'var(--color-success)' : 'var(--color-danger)' }}>
                    {log.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
