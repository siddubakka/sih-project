import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, Search, Filter, ShieldCheck, Download,
  CheckCircle2, AlertTriangle, FileText, User, Cpu,
  RefreshCw, Lock, Sparkles
} from 'lucide-react';
import './AuditTrailPage.css';

const globalAuditLogs = [
  {
    id: 'TXN-8849-001',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    timestamp: '23-Oct-2026, 11:42:10',
    actor: 'AI Forensics Engine',
    actorType: 'ai',
    appId: 'AICTE-EoA-2026-44912',
    action: 'Metadata Anomaly Flagged',
    details: 'Flagged PDF Producer Photoshop alteration in Fire Safety Certificate for VIT-VLR-002',
    status: 'Alert Logged',
  },
  {
    id: 'TXN-8849-002',
    hash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    timestamp: '23-Oct-2026, 11:38:45',
    actor: 'DigiLocker Integration Service',
    actorType: 'system',
    appId: 'AICTE-EoA-2026-38104',
    action: 'Cryptographic Document Match',
    details: 'Verified Land Document registry hash against Telangana Registration Department',
    status: 'Verified',
  },
  {
    id: 'TXN-8849-003',
    hash: '3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
    timestamp: '23-Oct-2026, 11:15:20',
    actor: 'Dr. Priya Sharma (Scrutiny Officer)',
    actorType: 'human',
    appId: 'AICTE-EoA-2026-72810',
    action: 'Extension of Approval Granted',
    details: 'Digitally signed EoA approval order for DTU Delhi after 100% compliance verified',
    status: 'Approved',
  },
  {
    id: 'TXN-8849-004',
    hash: '2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6',
    timestamp: '23-Oct-2026, 10:55:04',
    actor: 'Institution Registrar',
    actorType: 'institution',
    appId: 'AICTE-EoA-2026-90412',
    action: 'Revised Evidentiary Upload',
    details: 'Uploaded updated barrier-free lift compliance certificate and geo-tagged images',
    status: 'Submitted',
  },
  {
    id: 'TXN-8849-005',
    hash: '18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4',
    timestamp: '23-Oct-2026, 10:20:12',
    actor: 'Compliance Rules Engine',
    actorType: 'system',
    appId: 'AICTE-EoA-2026-55421',
    action: 'Faculty Cadre Deficit Identified',
    details: 'Shortfall of 3 Assistant Professors in AI & Data Science department vs APH 2026 norms',
    status: 'Deficiency Noted',
  },
  {
    id: 'TXN-8849-006',
    hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    timestamp: '23-Oct-2026, 09:40:00',
    actor: 'Mr. Rakesh Verma (AICTE Regional Officer)',
    actorType: 'human',
    appId: 'AICTE-EoA-2026-44912',
    action: 'Hearing Summon Issued',
    details: 'Issued notice for Standing Hearing Committee (SHC) regarding document discrepancy',
    status: 'Summoned',
  },
];

export default function AuditTrailPage() {
  const [logs, setLogs] = useState(globalAuditLogs);
  const [search, setSearch] = useState('');
  const [actorFilter, setActorFilter] = useState('all');

  const filteredLogs = logs.filter(log => {
    const matchSearch = !search ||
      log.appId.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.id.toLowerCase().includes(search.toLowerCase());
    const matchActor = actorFilter === 'all' || log.actorType === actorFilter;
    return matchSearch && matchActor;
  });

  return (
    <div className="audit-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Immutable Audit Trail & Ledger</h1>
          <p className="page-subtitle">
            Cryptographically sealed, chronological audit trail recording all AI classifications, external API queries, and human officer decisions
          </p>
        </div>

        <button className="btn btn-primary btn-sm">
          <Download size={14} />
          Export Signed Audit Ledger (PDF)
        </button>
      </div>

      {/* Top Banner: Tamper Proof Assurance */}
      <div className="card audit-security-card">
        <div className="security-info-left">
          <div className="security-icon-wrap">
            <Lock size={22} className="text-accent" />
          </div>
          <div>
            <h3>Cryptographic Integrity Verified</h3>
            <p>Every event is anchored with a SHA-256 hash chaining back to the previous block. No records can be deleted or backdated.</p>
          </div>
        </div>
        <div className="security-status-badge">
          <ShieldCheck size={16} className="text-success" />
          <span>Ledger State: Clean & Synced</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="audit-filters-bar">
        <div className="audit-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by Txn ID, Application ID, Officer, Action..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="actor-filter-pills">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'ai', label: 'AI Engine' },
            { id: 'system', label: 'API Integrations' },
            { id: 'human', label: 'Scrutiny Officers' },
            { id: 'institution', label: 'Institutions' },
          ].map(tab => (
            <button
              key={tab.id}
              className={`pill-btn ${actorFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActorFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card audit-table-card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Txn ID & Hash</th>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Application ID</th>
                <th>Action & Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td>
                    <div className="log-tx-id font-mono">{log.id}</div>
                    <div className="log-hash font-mono" title={log.hash}>
                      {log.hash.slice(0, 16)}...
                    </div>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                    {log.timestamp}
                  </td>
                  <td>
                    <div className="log-actor-name">
                      {log.actorType === 'ai' ? <Cpu size={14} className="text-accent" /> :
                       log.actorType === 'human' ? <User size={14} className="text-primary" /> :
                       <ShieldCheck size={14} className="text-success" />}
                      <span>{log.actor}</span>
                    </div>
                  </td>
                  <td>
                    <span className="log-app-id font-mono">{log.appId}</span>
                  </td>
                  <td style={{ maxWidth: '380px' }}>
                    <div className="log-action-title">{log.action}</div>
                    <div className="log-details-text">{log.details}</div>
                  </td>
                  <td>
                    <span className={`badge badge-${log.status === 'Verified' || log.status === 'Approved' ? 'success' : log.status === 'Alert Logged' ? 'danger' : 'info'}`}>
                      {log.status}
                    </span>
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
