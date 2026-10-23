import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, FileText, CheckCircle2, AlertTriangle, Shield,
  Search, Eye, RefreshCw, Sparkles, Database, Check, X,
  FileCheck, ArrowRight, Layers, Cpu
} from 'lucide-react';
import { DOC_TYPES } from '../data/mockData';
import './DocumentValidatorPage.css';

const sampleScans = [
  {
    type: 'Fire Safety Certificate',
    file: 'Fire_Safety_NOC_2026.pdf',
    size: '2.4 MB',
    extracted: {
      institutionName: 'National Institute of Technology, Warangal',
      certNumber: 'TS/FSC/2026/09842',
      issuingAuthority: 'Telangana State Disaster Response & Fire Services',
      issueDate: '14-Mar-2026',
      validUntil: '13-Mar-2027',
      signatory: 'Chief Fire Officer, Warangal Zone',
      buildingArea: '45,200 sq. meters',
      fireHydrants: '32 units verified',
    },
    confidence: 96.2,
    tamperRisk: 'Low',
    digiLockerMatch: true,
    anomalies: [],
  },
  {
    type: 'Building Plan Approval',
    file: 'Approved_Floor_Plan_Bld4.pdf',
    size: '5.1 MB',
    extracted: {
      institutionName: 'National Institute of Technology, Warangal',
      certNumber: 'KUDA/BPA/ENGG/2024/77',
      issuingAuthority: 'Kakatiya Urban Development Authority',
      issueDate: '22-Aug-2024',
      validUntil: 'Permanent / Approved',
      signatory: 'Town Planning Officer',
      buildingArea: '68,500 sq. meters built-up',
      carpetArea: '52,100 sq. meters',
    },
    confidence: 91.5,
    tamperRisk: 'Low',
    digiLockerMatch: true,
    anomalies: [],
  },
  {
    type: 'NAAC Accreditation Certificate',
    file: 'NAAC_Grade_Certificate_2022.pdf',
    size: '1.8 MB',
    extracted: {
      institutionName: 'National Institute of Technology, Warangal',
      certNumber: 'NAAC/A&A/2022/TS-089',
      issuingAuthority: 'National Assessment and Accreditation Council',
      issueDate: '10-Jul-2022',
      validUntil: '09-Jul-2027',
      signatory: 'Director, NAAC',
      grade: 'A+ (CGPA 3.42)',
      cycle: 'Cycle 3',
    },
    confidence: 98.4,
    tamperRisk: 'Low',
    digiLockerMatch: true,
    anomalies: [],
  },
  {
    type: 'Affidavit / Undertaking',
    file: 'AICTE_Statutory_Affidavit_2026.pdf',
    size: '3.1 MB',
    extracted: {
      institutionName: 'National Institute of Technology, Warangal',
      certNumber: 'NOTARY/TS/2026/5541',
      issuingAuthority: 'First Class Judicial Magistrate / Notary',
      issueDate: '15-May-2026',
      validUntil: 'AY 2026-27',
      signatory: 'Adv. K. Ramesh (Notary Govt of India)',
      stampDuty: 'Rs. 100 Non-Judicial Stamp',
      antiRagging: 'Affirmed under Clause 4.2',
    },
    confidence: 84.0,
    tamperRisk: 'Medium',
    digiLockerMatch: false,
    anomalies: ['Font substitution detected on stamp paper serial line'],
  },
];

export default function DocumentValidatorPage() {
  const [selectedScan, setSelectedScan] = useState(sampleScans[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleSimulateUpload = (docType) => {
    setIsAnalyzing(true);
    setVerificationFeedback(null);
    setTimeout(() => {
      const match = sampleScans.find(s => s.type === docType) || {
        type: docType,
        file: `${docType.toLowerCase().replace(/[^a-z0-9]/g, '_')}_scan.pdf`,
        size: '2.8 MB',
        extracted: {
          institutionName: 'National Institute of Technology, Warangal',
          certNumber: `REF/AICTE/${Math.floor(10000 + Math.random() * 90000)}`,
          issuingAuthority: 'Competent Authority',
          issueDate: '01-Feb-2026',
          validUntil: '31-Jan-2028',
          signatory: 'Authorized Signatory',
        },
        confidence: Math.round(85 + Math.random() * 12),
        tamperRisk: 'Low',
        digiLockerMatch: true,
        anomalies: [],
      };
      setSelectedScan(match);
      setIsAnalyzing(false);
      setVerificationFeedback('Document parsed successfully! Key fields matched with APH 2026 schema.');
    }, 1200);
  };

  const handleRealFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setIsAnalyzing(true);
    setVerificationFeedback(null);

    // Simulate AI scanning with the real filename
    setTimeout(() => {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const confidence = Math.round(88 + Math.random() * 10);
      const newScan = {
        type: 'Uploaded Document',
        file: file.name,
        size: `${sizeMB} MB`,
        extracted: {
          institutionName: 'National Institute of Technology, Warangal',
          certNumber: `REF/AICTE/${Math.floor(10000 + Math.random() * 90000)}`,
          issuingAuthority: 'Detected via OCR — Issuing Authority Extraction',
          issueDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          validUntil: 'Pending Confirmation',
          signatory: 'Extracted via Digital Signature Analysis',
        },
        confidence,
        tamperRisk: confidence >= 92 ? 'Low' : 'Medium',
        digiLockerMatch: confidence >= 90,
        anomalies: confidence < 92 ? ['Minor metadata inconsistency — manual review recommended'] : [],
      };
      setSelectedScan(newScan);
      setIsAnalyzing(false);
      setVerificationFeedback(`"${file.name}" (${sizeMB} MB) scanned. AI confidence: ${confidence}%. OCR fields extracted and cross-checked.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1800);
  };

  return (
    <div className="doc-validator-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Document Validator & OCR Scrutiny</h1>
          <p className="page-subtitle">
            Upload institutional certificates, letters, and affidavits for multi-engine OCR extraction, tamper analysis, and DigiLocker validation
          </p>
        </div>
        <div className="validator-header-badge">
          <Cpu size={16} />
          <span>OCR Engine: Tesseract + Vision AI (Active)</span>
        </div>
      </div>

      {/* Upload & Selector Bar */}
      <div className="card upload-strip-card">
        <div
          className={`dropzone ${dragOver ? 'dropzone-active' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file) {
              setUploadedFileName(file.name);
              handleSimulateUpload('Fire Safety Certificate');
            }
          }}
        >
          {/* Hidden real file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".pdf,.jpg,.jpeg,.png,.tiff,image/*"
            onChange={handleRealFileUpload}
          />
          <div className="dropzone-content">
            <div className="dropzone-icon">
              <Upload size={24} />
            </div>
            <div>
              <h4>Drop PDF / Image Scans Here or Click to Upload</h4>
              <p>Supports PDFs, Scanned JPEGs, TIFFs up to 25MB. Automatically classifies document type & checks seals.</p>
              {uploadedFileName && (
                <p style={{ color: 'var(--color-emerald-green)', fontWeight: 700, marginTop: '0.3rem' }}>
                  Last uploaded: {uploadedFileName}
                </p>
              )}
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? <RefreshCw size={14} className="spin-anim" /> : <Upload size={14} />}
            {isAnalyzing ? 'AI Scanning Document...' : 'Browse & Upload File'}
          </button>
        </div>

        {/* Quick select presets */}
        <div className="quick-presets">
          <span className="preset-label">Test Samples:</span>
          {sampleScans.map(s => (
            <button
              key={s.type}
              className={`preset-btn ${selectedScan.type === s.type ? 'active' : ''}`}
              onClick={() => { setSelectedScan(s); setVerificationFeedback(null); }}
            >
              <FileText size={13} />
              {s.type}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Result Banner */}
      {verificationFeedback && (
        <motion.div
          className="card validator-feedback-banner"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles size={18} className="text-accent" />
          <span>{verificationFeedback}</span>
        </motion.div>
      )}

      {/* Main Scrutiny Split View */}
      <div className="validator-split">
        {/* Left: Document Visual / Preview */}
        <div className="card doc-viewer-card">
          <div className="card-header">
            <div className="viewer-title">
              <FileCheck size={18} className="text-primary" />
              <h3>{selectedScan.file}</h3>
            </div>
            <span className="badge badge-info">{selectedScan.size}</span>
          </div>

          <div className="doc-preview-pane">
            <div className="sim-paper">
              <div className="paper-seal">
                <Shield size={36} />
                <span>OFFICIAL EMBLEM</span>
              </div>
              <h2 className="paper-title">{selectedScan.type.toUpperCase()}</h2>
              <div className="paper-sub">GOVERNMENT OF INDIA / STATE REGULATORY AUTHORITY</div>

              <div className="paper-rule-divider" />

              <div className="paper-body-text">
                <p>
                  THIS IS TO CERTIFY that institutional records for <strong>{selectedScan.extracted.institutionName}</strong> have been formally examined and verified in connection with approval proceedings.
                </p>
                <div className="paper-key-details">
                  <div><strong>Certificate Ref No:</strong> {selectedScan.extracted.certNumber}</div>
                  <div><strong>Issuing Authority:</strong> {selectedScan.extracted.issuingAuthority}</div>
                  <div><strong>Date of Issue:</strong> {selectedScan.extracted.issueDate}</div>
                  <div><strong>Valid Up to:</strong> {selectedScan.extracted.validUntil}</div>
                  {selectedScan.extracted.grade && <div><strong>Accreditation Grade:</strong> {selectedScan.extracted.grade}</div>}
                  {selectedScan.extracted.buildingArea && <div><strong>Inspected Area:</strong> {selectedScan.extracted.buildingArea}</div>}
                </div>
                <p>
                  Issued with the concurrence of the Competent Technical Scrutiny Division under Chapter IV of Regulations.
                </p>
              </div>

              <div className="paper-signature-block">
                <div className="signature-line" />
                <div className="signature-name">{selectedScan.extracted.signatory}</div>
                <div className="signature-stamp">SEAL OF COMPETENT AUTHORITY</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Extracted OCR Data & Forensics */}
        <div className="validator-right-col">
          {/* AI Metrics Card */}
          <div className="card metric-breakdown-card">
            <h3>AI Extraction & Forensic Verdict</h3>
            <div className="metric-bars-grid">
              <div className="metric-box">
                <span className="metric-box-title">OCR Confidence</span>
                <span className="metric-box-num text-success">{selectedScan.confidence}%</span>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${selectedScan.confidence}%` }} />
                </div>
              </div>

              <div className="metric-box">
                <span className="metric-box-title">Tamper Risk</span>
                <span className={`metric-box-num ${selectedScan.tamperRisk === 'Low' ? 'text-success' : 'text-danger'}`}>
                  {selectedScan.tamperRisk}
                </span>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: selectedScan.tamperRisk === 'Low' ? '20%' : '75%',
                      background: selectedScan.tamperRisk === 'Low' ? 'var(--color-success)' : 'var(--color-danger)'
                    }}
                  />
                </div>
              </div>

              <div className="metric-box">
                <span className="metric-box-title">DigiLocker Match</span>
                <span className={`metric-box-num ${selectedScan.digiLockerMatch ? 'text-success' : 'text-warning'}`}>
                  {selectedScan.digiLockerMatch ? 'Verified' : 'Unconfirmed'}
                </span>
                <span className="metric-box-sub">Repository Check</span>
              </div>
            </div>

            {selectedScan.anomalies.length > 0 && (
              <div className="anomaly-warning-box">
                <AlertTriangle size={18} />
                <div>
                  <strong>Suspected Manipulation Detected:</strong>
                  {selectedScan.anomalies.map((a, i) => (
                    <div key={i}>{a}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Structured OCR Fields */}
          <div className="card ocr-fields-card">
            <div className="card-header">
              <h3>Parsed Institutional Metadata</h3>
              <span className="badge badge-success">Schema Valid</span>
            </div>

            <div className="ocr-keyvalues">
              {Object.entries(selectedScan.extracted).map(([key, val]) => (
                <div key={key} className="ocr-row">
                  <span className="ocr-key-name">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="ocr-val-text">{val}</span>
                </div>
              ))}
            </div>

            <div className="ocr-card-actions">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setVerificationFeedback('Initiated DigiLocker cross-verification ping... verified matching hash.')}
              >
                <Database size={14} />
                Verify DigiLocker Hash
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setVerificationFeedback('Document marked as APPROVED and linked to institution file.')}
              >
                <Check size={14} />
                Accept & Sign Off
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
