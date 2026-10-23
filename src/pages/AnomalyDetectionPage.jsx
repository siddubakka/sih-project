import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, ShieldAlert, FileText, CheckCircle2,
  XCircle, Search, Eye, Filter, Sparkles, RefreshCw,
  Building, User, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react';
import { getChartData } from '../data/mockData';
import './AnomalyDetectionPage.css';

const sampleAnomalies = [
  {
    id: 'ANOM-2026-081',
    institution: 'Vellore Institute of Technology',
    category: 'Metadata Alteration',
    document: 'Fire Safety Certificate',
    severity: 'High',
    detectedAt: 'Today, 09:42 AM',
    confidence: 94.8,
    details: 'PDF Producer metadata indicates document was edited with Adobe Photoshop 24.2. Creation timestamp is later than modification timestamp.',
    affectedField: 'Issue Date: 14-Aug-2025 -> 14-Aug-2026',
    status: 'Under Review',
  },
  {
    id: 'ANOM-2026-077',
    institution: 'Amity University, Noida',
    category: 'Cross-Institution Duplicate',
    document: 'Audited Financial Balance Sheet',
    severity: 'Critical',
    detectedAt: 'Yesterday, 04:15 PM',
    confidence: 98.9,
    details: 'Hash matches balance sheet filed by SRM Institute of Science & Technology for identical auditor registration number (CA-44912).',
    affectedField: 'Auditor Registration No & Balance Sheet Table',
    status: 'Hearing Summoned',
  },
  {
    id: 'ANOM-2026-069',
    institution: 'Delhi Technological University',
    category: 'Font / Glyphs Inconsistency',
    document: 'Land Registration Title Deed',
    severity: 'Medium',
    detectedAt: '21-Oct-2026',
    confidence: 86.4,
    details: 'Non-embedded glyphs detected in Survey Number field. Kerning and font weight (Arial MT Bold) deviates from issuing Sub-Registrar template (KrutiDev 010).',
    affectedField: 'Survey No. 412/A (12.5 Acres)',
    status: 'Under Review',
  },
  {
    id: 'ANOM-2026-052',
    institution: 'Thapar Institute of Engineering',
    category: 'Digital Signature Invalidation',
    document: 'University Affiliation Approval',
    severity: 'High',
    detectedAt: '20-Oct-2026',
    confidence: 91.2,
    details: 'PKCS#7 Digital signature certificate expired prior to signing date. Root CA certificate chain could not be validated against CCA India Trust Store.',
    affectedField: 'Registrar Digital Signature Block',
    status: 'Under Review',
  },
  {
    id: 'ANOM-2026-044',
    institution: 'PSG College of Technology',
    category: 'Expired Document Submitted',
    document: 'Pollution Control Board NOC',
    severity: 'Low',
    detectedAt: '18-Oct-2026',
    confidence: 99.1,
    details: 'State Pollution Control Board Consent to Operate expired on 31-Dec-2025. Renewal receipt was not attached.',
    affectedField: 'Validity Expiry Date: 31-Dec-2025',
    status: 'Resolved',
  },
];

export default function AnomalyDetectionPage() {
  const [anomalies, setAnomalies] = useState(sampleAnomalies);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnomaly, setSelectedAnomaly] = useState(sampleAnomalies[0]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleResolve = (action) => {
    setAnomalies(prev => prev.map(a =>
      a.id === selectedAnomaly.id ? { ...a, status: action } : a
    ));
    showToast(`Anomaly ${selectedAnomaly.id} marked as: ${action}`);
  };

  const filtered = anomalies.filter(a => {
    const matchSearch = !searchTerm ||
      a.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSeverity = filterSeverity === 'all' || a.severity.toLowerCase() === filterSeverity.toLowerCase();
    return matchSearch && matchSeverity;
  });

  return (
    <div className="anomaly-page">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="detail-toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Sparkles size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="page-header">
        <div>
          <h1 className="page-title">Anomaly & Forensic Detection Engine</h1>
          <p className="page-subtitle">
            AI-driven fraud prevention detecting document tampering, metadata forgery, font substitutions, and duplicate submissions
          </p>
        </div>
        <div className="anomaly-stats-pill">
          <ShieldAlert size={16} className="text-danger" />
          <span>{anomalies.filter(a => a.status !== 'Resolved').length} Active Alerts</span>
        </div>
      </div>

      {/* Top Threat Heatmap / Metrics Row */}
      <div className="threat-summary-grid">
        <div className="card threat-metric-card">
          <div className="threat-metric-top">
            <span className="threat-label">Critical Fraud Risks</span>
            <span className="badge badge-danger">High Priority</span>
          </div>
          <div className="threat-val">2</div>
          <p className="threat-desc">Suspected duplicate financial audit & digital signature spoofing</p>
        </div>

        <div className="card threat-metric-card">
          <div className="threat-metric-top">
            <span className="threat-label">Forensic Accuracy</span>
            <span className="badge badge-success">Vision + Heuristics</span>
          </div>
          <div className="threat-val">96.8%</div>
          <p className="threat-desc">Verified against historical 45,000 AICTE application baselines</p>
        </div>

        <div className="card threat-metric-card">
          <div className="threat-metric-top">
            <span className="threat-label">Average Resolution</span>
            <span className="badge badge-info">Scrutiny Cell</span>
          </div>
          <div className="threat-val">1.4 hrs</div>
          <p className="threat-desc">From AI alert generation to administrative hearing dispatch</p>
        </div>
      </div>

      {/* Main Split: Left Incident List, Right Detailed Forensic Inspector */}
      <div className="anomaly-split-layout">
        {/* Left Column: Incidents Filter & List */}
        <div className="anomaly-list-pane">
          <div className="card filter-header-card">
            <div className="search-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by institution, anomaly type..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="severity-filter-btns">
              {['all', 'critical', 'high', 'medium', 'low'].map(s => (
                <button
                  key={s}
                  className={`sev-btn ${filterSeverity === s ? 'active' : ''}`}
                  onClick={() => setFilterSeverity(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="anomaly-cards-scroll">
            {filtered.map(anom => (
              <div
                key={anom.id}
                className={`card anomaly-card-item ${selectedAnomaly.id === anom.id ? 'active-selected' : ''}`}
                onClick={() => setSelectedAnomaly(anom)}
              >
                <div className="anom-item-top">
                  <span className={`badge badge-${anom.severity === 'Critical' || anom.severity === 'High' ? 'danger' : 'warning'}`}>
                    {anom.severity}
                  </span>
                  <span className="anom-time">{anom.detectedAt}</span>
                </div>

                <h4 className="anom-inst-title">{anom.institution}</h4>
                <div className="anom-cat-badge">
                  <AlertTriangle size={13} />
                  <span>{anom.category}</span>
                </div>

                <div className="anom-item-footer">
                  <span className="anom-doc-name">{anom.document}</span>
                  <span className="anom-conf">AI Conf: {anom.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Deep Forensic Evidence Inspector */}
        <div className="anomaly-inspector-pane">
          <div className="card inspector-card">
            <div className="inspector-head">
              <div>
                <span className="inspector-case-id">{selectedAnomaly.id}</span>
                <h2 className="inspector-title">{selectedAnomaly.category}</h2>
                <span className="inspector-inst-name">{selectedAnomaly.institution}</span>
              </div>
              <span className={`badge badge-${selectedAnomaly.severity === 'Critical' ? 'danger' : 'warning'}`}>
                {selectedAnomaly.severity} Severity
              </span>
            </div>

            {/* Forensics Technical Findings */}
            <div className="forensic-findings-box">
              <h4>Forensic Analysis Findings:</h4>
              <p>{selectedAnomaly.details}</p>
              <div className="affected-field-pill">
                <strong>Flagged Segment:</strong> {selectedAnomaly.affectedField}
              </div>
            </div>

            {/* Tampering Visual Heatmap Simulation */}
            <div className="tamper-visual-preview">
              <div className="visual-preview-header">
                <span>Forensic Layer: Font Kerning & Compression Inconsistencies</span>
                <span className="text-danger font-mono font-bold">TAMPER PROBABILITY: {selectedAnomaly.confidence}%</span>
              </div>
              <div className="visual-preview-mock">
                <div className="mock-text-line clean">GOVERNMENT REGULATORY DIVISION - OFFICIAL NOTICE</div>
                <div className="mock-text-line clean">INSTITUTION CODE: REG-IND-2026-4412</div>
                <div className="mock-text-line tampered">
                  <span className="tamper-glow">{selectedAnomaly.affectedField}</span>
                  <span className="tamper-marker">MODIFIED</span>
                </div>
                <div className="mock-text-line clean">VERIFIED BY SCANNED EMBLEM & REGISTRAR SIGNATURE</div>
              </div>
            </div>

            {/* Regulatory Impact & Decision Options */}
            <div className="resolution-section">
              <h4>Scrutiny Cell Directive</h4>
              <p className="resolution-sub">Choose regulatory action in accordance with AICTE Regulations 2026:</p>

              <div className="resolution-btn-row">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleResolve('Hearing Summoned')}
                >
                  <AlertTriangle size={14} />
                  Summon for Standing Hearing Committee (SHC)
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleResolve('Physical Inspection Scheduled')}
                >
                  <Building size={14} />
                  Schedule Surprise EVC Visit
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleResolve('Cleared / False Positive')}
                >
                  <CheckCircle2 size={14} />
                  Mark as Cleared (False Positive)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
