import { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, AlertTriangle, Clock, Shield,
  FileText, ExternalLink, RefreshCw, Send, Check, X,
  Building, User, Calendar, MapPin, Award, Search, Sparkles,
  Download, FileCheck, AlertCircle, Eye, ChevronRight
} from 'lucide-react';
import {
  generateApplications, generateAuditTrail, STATUS, STATUS_COLORS
} from '../data/mockData';
import './ApplicationDetailPage.css';

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Load application from location state or mock data
  const application = useMemo(() => {
    if (location.state?.application) return location.state.application;
    const all = generateApplications(15);
    return all.find(a => a.id === id) || all[0];
  }, [id, location.state]);

  const [activeTab, setActiveTab] = useState('documents');
  const [docs, setDocs] = useState(application.documents);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [notification, setNotification] = useState(null);
  const [actionModal, setActionModal] = useState(null); // 'approve' | 'flag' | 'reject' | 'request'

  const auditLogs = useMemo(() => generateAuditTrail(application.id), [application.id]);

  // Simulate AI Auto-Validation
  const handleAutoValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setDocs(prev => prev.map(d => {
        if (d.status === STATUS.PENDING) {
          return {
            ...d,
            status: STATUS.VERIFIED,
            confidenceScore: Math.round(88 + Math.random() * 10),
            verificationSource: 'AI Auto-Check & DigiLocker',
            verifiedAt: new Date().toISOString()
          };
        }
        return d;
      }));
      setIsValidating(false);
      showNotification('AI auto-validation complete. 3 documents verified via DigiLocker.');
    }, 1500);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDocStatusChange = (docId, newStatus) => {
    setDocs(prev => prev.map(d => d.id === docId ? { ...d, status: newStatus } : d));
    showNotification(`Document status updated to "${newStatus}"`);
  };

  const verifiedCount = docs.filter(d => d.status === STATUS.VERIFIED).length;
  const flaggedCount = docs.filter(d => d.status === STATUS.FLAGGED || d.status === STATUS.MISMATCH).length;
  const completionPct = Math.round((verifiedCount / docs.length) * 100);

  return (
    <div className="app-detail-page">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className="detail-toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Sparkles size={16} />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <div className="detail-top-nav">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard/applications')}>
          <ArrowLeft size={16} />
          Back to Applications
        </button>
        <div className="detail-top-badges">
          <span className={`badge badge-${STATUS_COLORS[application.status]}`}>
            {application.status}
          </span>
          <span className={`badge badge-${application.priority === 'High' ? 'danger' : 'warning'}`}>
            {application.priority} Priority
          </span>
        </div>
      </div>

      {/* Institution Banner Card */}
      <div className="card inst-banner-card">
        <div className="inst-banner-main">
          <div className="inst-banner-logo">
            <Building size={28} />
          </div>
          <div>
            <div className="inst-banner-sub">
              <span>{application.id}</span>
              <span className="dot">•</span>
              <span>{application.category}</span>
            </div>
            <h1 className="inst-banner-title">{application.institution.name}</h1>
            <div className="inst-meta-tags">
              <span className="meta-tag"><MapPin size={13} /> {application.institution.state}</span>
              <span className="meta-tag"><Award size={13} /> {application.institution.code}</span>
              <span className="meta-tag"><User size={13} /> Affiliation: {application.institution.university}</span>
              <span className="meta-tag"><Calendar size={13} /> Submitted: {new Date(application.submittedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="inst-banner-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleAutoValidate}
            disabled={isValidating}
          >
            <RefreshCw size={14} className={isValidating ? 'spin-anim' : ''} />
            {isValidating ? 'Validating...' : 'Run AI Scrutiny'}
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActionModal('approve')}
          >
            <Check size={14} />
            Grant Approval
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => setActionModal('flag')}
          >
            <AlertTriangle size={14} />
            Flag for Physical Inspection
          </button>
        </div>
      </div>

      {/* KPI Mini Row */}
      <div className="detail-kpi-grid">
        <div className="card detail-kpi-card">
          <span className="kpi-label">Document Scrutiny</span>
          <div className="kpi-metric-row">
            <span className="kpi-metric">{verifiedCount} / {docs.length}</span>
            <span className="kpi-tag">{completionPct}% verified</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${completionPct}%` }} />
          </div>
        </div>

        <div className="card detail-kpi-card">
          <span className="kpi-label">Handbook Compliance</span>
          <div className="kpi-metric-row">
            <span className="kpi-metric">{application.summary.compliancePct}%</span>
            <span className="badge badge-success">{application.summary.complianceMet}/{application.summary.complianceTotal} Rules</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${application.summary.compliancePct}%`, background: 'var(--color-accent-400)' }} />
          </div>
        </div>

        <div className="card detail-kpi-card">
          <span className="kpi-label">Anomaly Risk</span>
          <div className="kpi-metric-row">
            <span className={`kpi-metric ${flaggedCount > 0 ? 'text-danger' : 'text-success'}`}>
              {flaggedCount > 0 ? `${flaggedCount} Flagged` : 'Clean Record'}
            </span>
            <span className={`badge badge-${flaggedCount > 0 ? 'danger' : 'success'}`}>
              {flaggedCount > 0 ? 'Action Required' : 'Low Risk'}
            </span>
          </div>
          <p className="kpi-subtext">Automated OCR & metadata tampering scan</p>
        </div>

        <div className="card detail-kpi-card">
          <span className="kpi-label">Scrutiny Officer</span>
          <div className="kpi-metric-row">
            <span className="kpi-metric" style={{ fontSize: '1.1rem' }}>{application.assignedTo}</span>
          </div>
          <p className="kpi-subtext">AICTE Regional Scrutiny Cell</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        <button
          className={`detail-tab ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          <FileText size={16} />
          Supporting Documents ({docs.length})
        </button>
        <button
          className={`detail-tab ${activeTab === 'anomalies' ? 'active' : ''}`}
          onClick={() => setActiveTab('anomalies')}
        >
          <AlertTriangle size={16} />
          Tamper & Anomaly Flags {flaggedCount > 0 && <span className="tab-pill danger">{flaggedCount}</span>}
        </button>
        <button
          className={`detail-tab ${activeTab === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveTab('compliance')}
        >
          <CheckCircle2 size={16} />
          APH 2026 Compliance ({application.compliance.length})
        </button>
        <button
          className={`detail-tab ${activeTab === 'verification' ? 'active' : ''}`}
          onClick={() => setActiveTab('verification')}
        >
          <Shield size={16} />
          Issuing Authority APIs
        </button>
        <button
          className={`detail-tab ${activeTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          <Clock size={16} />
          Audit Trail ({auditLogs.length})
        </button>
      </div>

      {/* Tab 1: Supporting Documents */}
      {activeTab === 'documents' && (
        <div className="tab-pane">
          <div className="docs-grid">
            {docs.map((doc) => (
              <div key={doc.id} className={`card doc-card ${doc.status === STATUS.FLAGGED ? 'doc-card-flagged' : ''}`}>
                <div className="doc-card-top">
                  <div className="doc-card-icon">
                    <FileText size={20} />
                  </div>
                  <div className="doc-card-info">
                    <h3 className="doc-card-title">{doc.type}</h3>
                    <span className="doc-card-id">{doc.id}</span>
                  </div>
                  <span className={`badge badge-${STATUS_COLORS[doc.status]}`}>{doc.status}</span>
                </div>

                {doc.anomalies?.length > 0 && (
                  <div className="doc-anomaly-callout">
                    <AlertTriangle size={15} />
                    <span>{doc.anomalies[0]}</span>
                  </div>
                )}

                <div className="doc-meta-grid">
                  <div className="doc-meta-item">
                    <span className="meta-k">OCR Match</span>
                    <span className="meta-v">{doc.confidenceScore}%</span>
                  </div>
                  <div className="doc-meta-item">
                    <span className="meta-k">Verified By</span>
                    <span className="meta-v">{doc.verificationSource || 'Pending Check'}</span>
                  </div>
                  <div className="doc-meta-item">
                    <span className="meta-k">File Size</span>
                    <span className="meta-v">{doc.fileInfo.size} ({doc.fileInfo.pages} pages)</span>
                  </div>
                  <div className="doc-meta-item">
                    <span className="meta-k">Cert Number</span>
                    <span className="meta-v font-mono">{doc.ocrExtracted.certificateNumber}</span>
                  </div>
                </div>

                <div className="doc-card-footer">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <Eye size={13} /> View Extracted OCR
                  </button>
                  <div className="doc-status-actions">
                    <button
                      className="btn-status-icon approve"
                      title="Verify Document"
                      onClick={() => handleDocStatusChange(doc.id, STATUS.VERIFIED)}
                    >
                      <Check size={14} />
                    </button>
                    <button
                      className="btn-status-icon flag"
                      title="Flag Document"
                      onClick={() => handleDocStatusChange(doc.id, STATUS.FLAGGED)}
                    >
                      <AlertTriangle size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Tamper & Anomaly Flags */}
      {activeTab === 'anomalies' && (
        <div className="tab-pane">
          <div className="card anomaly-overview-card">
            <h3>Automated Anomaly & Forensics Engine</h3>
            <p>
              The system analyses uploaded documents against metadata heuristics, font inconsistencies, digital signature validity,
              and cross-application duplicates to prevent fraud before human inspection.
            </p>
          </div>

          <div className="anomalies-list">
            {docs.filter(d => d.anomalies?.length > 0).map(d => (
              <div key={d.id} className="card anomaly-item-card">
                <div className="anomaly-header">
                  <div className="anomaly-badge-wrap">
                    <AlertTriangle size={18} className="text-danger" />
                    <div>
                      <h4>{d.type}</h4>
                      <span className="doc-card-id">{d.id}</span>
                    </div>
                  </div>
                  <span className="badge badge-danger">Risk Detected</span>
                </div>

                <div className="anomaly-body">
                  <div className="anomaly-flag-desc">
                    <strong>Identified Anomaly:</strong> {d.anomalies.join('; ')}
                  </div>
                  <div className="anomaly-recommendation">
                    <strong>Recommended Action:</strong> Request original certified copy from issuing authority or summon physical records during EVC (Expert Visit Committee) inspection.
                  </div>
                </div>

                <div className="anomaly-footer">
                  <button className="btn btn-secondary btn-xs" onClick={() => setSelectedDoc(d)}>
                    Inspect Forensic Metadata
                  </button>
                  <button className="btn btn-ghost btn-xs" onClick={() => handleDocStatusChange(d.id, STATUS.VERIFIED)}>
                    Override & Mark Cleared
                  </button>
                </div>
              </div>
            ))}

            {docs.filter(d => d.anomalies?.length > 0).length === 0 && (
              <div className="empty-state">
                <CheckCircle2 size={48} className="text-success" />
                <h3>No Anomalies Detected</h3>
                <p>All scanned documents passed algorithmic metadata, font, and signature verification checks.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: APH 2026 Compliance */}
      {activeTab === 'compliance' && (
        <div className="tab-pane">
          <div className="card compliance-table-card">
            <div className="card-header">
              <div>
                <h3>AICTE Approval Process Handbook (APH 2026) Norms</h3>
                <p>Automated cross-check against institutional parameters and documentary evidence</p>
              </div>
              <span className="badge badge-info">{application.compliance.length} Rules Evaluated</span>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Rule / Requirement</th>
                    <th>Handbook Reference</th>
                    <th>Category</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Evidence State</th>
                  </tr>
                </thead>
                <tbody>
                  {application.compliance.map((c, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{c.rule}</td>
                      <td className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-primary-400)' }}>
                        {c.handbook}
                      </td>
                      <td><span className="badge badge-info">{c.category}</span></td>
                      <td>
                        <span className={`badge badge-${c.weight === 'Critical' ? 'danger' : c.weight === 'Major' ? 'warning' : 'secondary'}`}>
                          {c.weight}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${c.status === 'Compliant' ? 'success' : c.status === 'Non-Compliant' ? 'danger' : 'warning'}`}>
                          {c.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        {c.evidence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Issuing Authority Verification */}
      {activeTab === 'verification' && (
        <div className="tab-pane">
          <div className="authority-grid">
            <div className="card authority-card">
              <div className="authority-card-header">
                <div className="authority-icon digilocker">
                  <Shield size={20} />
                </div>
                <div>
                  <h4>DigiLocker Integration</h4>
                  <span className="auth-status online">Connected • Live API</span>
                </div>
              </div>
              <p className="auth-desc">Authenticates affidavits, land deeds, and municipal NOCs against national repository.</p>
              <div className="auth-stat-row">
                <span>Verified: <strong>4 documents</strong></span>
                <span>Response Time: <strong>210ms</strong></span>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '1rem' }} onClick={() => showNotification('DigiLocker handshake verified. Keys valid.')}>
                Ping DigiLocker Gateway
              </button>
            </div>

            <div className="card authority-card">
              <div className="authority-card-header">
                <div className="authority-icon university">
                  <Building size={20} />
                </div>
                <div>
                  <h4>Affiliating University Portal</h4>
                  <span className="auth-status online">Connected • {application.institution.university}</span>
                </div>
              </div>
              <p className="auth-desc">Cross-references course affiliation letters, sanctioned intake, and academic validity.</p>
              <div className="auth-stat-row">
                <span>Status: <strong>Affiliation Active</strong></span>
                <span>Valid Up to: <strong>AY 2026-27</strong></span>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '1rem' }} onClick={() => showNotification('University registrar records confirmed.')}>
                Query University Registrar
              </button>
            </div>

            <div className="card authority-card">
              <div className="authority-card-header">
                <div className="authority-icon state">
                  <Award size={20} />
                </div>
                <div>
                  <h4>State Technical Education Board</h4>
                  <span className="auth-status online">Connected • {application.institution.state}</span>
                </div>
              </div>
              <p className="auth-desc">Validates State Government NOC and land classification certifications.</p>
              <div className="auth-stat-row">
                <span>NOC Ref: <strong>STB/{application.institution.state.slice(0,3).toUpperCase()}/2026/894</strong></span>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '1rem' }} onClick={() => showNotification('State NOC record retrieved successfully.')}>
                Validate State NOC
              </button>
            </div>

            <div className="card authority-card">
              <div className="authority-card-header">
                <div className="authority-icon fire">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4>State Fire Safety Directorate</h4>
                  <span className="auth-status pending">Manual Check Needed</span>
                </div>
              </div>
              <p className="auth-desc">State Fire Department portal does not expose public API in this region.</p>
              <div className="auth-stat-row">
                <span>Mode: <strong>QR Validation / Officer Verification</strong></span>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '1rem' }} onClick={() => showNotification('Dispatched manual verification task to regional officer.')}>
                Dispatch Verification Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Audit Trail */}
      {activeTab === 'audit' && (
        <div className="tab-pane">
          <div className="card audit-card">
            <h3>Audit Trail & Accountability Ledger</h3>
            <p className="audit-sub">Immutable, timestamped record of every automated scan, officer review, and system decision</p>

            <div className="timeline">
              {auditLogs.map((log) => (
                <div key={log.id} className="timeline-item">
                  <div className={`timeline-dot timeline-dot-${log.type}`} />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="timeline-actor">{log.actor}</span>
                      <span className="timeline-time">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="timeline-action">{log.action}</div>
                    <span className="timeline-id">{log.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Document OCR & Metadata Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              className="modal-container doc-modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">{selectedDoc.type}</h3>
                  <span className="doc-card-id">{selectedDoc.id}</span>
                </div>
                <button className="btn-close" onClick={() => setSelectedDoc(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body doc-modal-body">
                <div className="doc-modal-left">
                  <h4>Extracted OCR Key Fields</h4>
                  <div className="ocr-field-list">
                    <div className="ocr-field">
                      <span className="ocr-k">Certificate / Reference No</span>
                      <span className="ocr-v font-mono">{selectedDoc.ocrExtracted.certificateNumber}</span>
                    </div>
                    <div className="ocr-field">
                      <span className="ocr-k">Issuing Authority</span>
                      <span className="ocr-v">{selectedDoc.ocrExtracted.issuingAuthority}</span>
                    </div>
                    <div className="ocr-field">
                      <span className="ocr-k">Date of Issue</span>
                      <span className="ocr-v">{selectedDoc.ocrExtracted.dateOfIssue}</span>
                    </div>
                    <div className="ocr-field">
                      <span className="ocr-k">Validity Up to</span>
                      <span className="ocr-v">{selectedDoc.ocrExtracted.validUntil}</span>
                    </div>
                    <div className="ocr-field">
                      <span className="ocr-k">OCR Match Confidence</span>
                      <span className="ocr-v">{selectedDoc.confidenceScore}%</span>
                    </div>
                  </div>

                  {selectedDoc.anomalies?.length > 0 && (
                    <div className="doc-anomaly-callout" style={{ marginTop: '1rem' }}>
                      <AlertTriangle size={16} />
                      <div>
                        <strong>Flagged Issues:</strong>
                        {selectedDoc.anomalies.map((a, i) => (
                          <div key={i}>• {a}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="doc-modal-right">
                  <h4>Document Preview (Simulated PDF Rendering)</h4>
                  <div className="doc-sim-viewer">
                    <div className="sim-cert-header">
                      <Shield size={32} />
                      <div className="sim-cert-title">GOVERNMENT OF INDIA / STATE AUTHORITY</div>
                      <div className="sim-cert-sub">{selectedDoc.type.toUpperCase()}</div>
                    </div>
                    <div className="sim-cert-body">
                      <p>This is to certify that <strong>{application.institution.name}</strong> has fulfilled the requirements under the relevant provisions of the AICTE Act 1987 and Approval Process Handbook 2026.</p>
                      <div className="sim-cert-meta">
                        <div>Ref: {selectedDoc.ocrExtracted.certificateNumber}</div>
                        <div>Date: {selectedDoc.ocrExtracted.dateOfIssue}</div>
                        <div>Status: Active & Valid</div>
                      </div>
                    </div>
                    <div className="sim-cert-footer">
                      <div className="sim-stamp">DIGITALLY SIGNED & VERIFIED</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedDoc(null)}>
                  Close
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    handleDocStatusChange(selectedDoc.id, STATUS.VERIFIED);
                    setSelectedDoc(null);
                  }}
                >
                  <Check size={14} /> Verify & Accept Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Decision Confirmation Modal */}
      <AnimatePresence>
        {actionModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActionModal(null)}
          >
            <motion.div
              className="modal-container action-modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3 className="modal-title">
                  {actionModal === 'approve' && 'Confirm Extension of Approval (EoA)'}
                  {actionModal === 'flag' && 'Flag for Physical Inspection (EVC)'}
                </h3>
                <button className="btn-close" onClick={() => setActionModal(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="modal-body">
                <p>
                  {actionModal === 'approve' &&
                    `You are about to issue Extension of Approval (EoA) 2026-27 for ${application.institution.name}. The digital approval letter will be signed and synced with the AICTE National Portal.`}
                  {actionModal === 'flag' &&
                    `This application will be scheduled for an on-site Expert Visit Committee (EVC) verification to scrutinize physical infrastructure and verify highlighted anomalies.`}
                </p>
                <div className="modal-remarks-area">
                  <label>Scrutiny Officer Remarks / Directives:</label>
                  <textarea
                    rows={3}
                    placeholder="Enter compliance notes, observations, or inspection directives..."
                    className="input"
                    style={{ width: '100%', resize: 'vertical' }}
                    defaultValue={actionModal === 'approve' ? 'All mandatory requirements of APH 2026 verified. Recommended for EoA.' : 'Discrepancy observed in fire safety certificate. Physical inspection mandated.'}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-ghost btn-sm" onClick={() => setActionModal(null)}>
                  Cancel
                </button>
                <button
                  className={`btn btn-${actionModal === 'approve' ? 'primary' : 'danger'} btn-sm`}
                  onClick={() => {
                    showNotification(actionModal === 'approve' ? 'Approval granted! EoA Letter generated.' : 'Application flagged for EVC Inspection.');
                    setActionModal(null);
                  }}
                >
                  Confirm Decision
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
