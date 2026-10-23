import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, CheckCircle2, AlertTriangle, ArrowRight,
  Sparkles, FileText, Globe, Fingerprint, Target,
  Cpu, Building, User, Calendar, MapPin, Award,
  Check, X, RefreshCw, Layers, ShieldCheck
} from 'lucide-react';
import { useScrollReveal, useCountUp, useMousePosition } from '../hooks/useAnimations';
import './LandingPage.css';

// ----- Tranquil Floating Spheres and Graphic Motifs -----
function EditorialArtCanvas() {
  const mouse = useMousePosition();

  return (
    <div className="editorial-canvas-decor">
      {/* Gentle Vermilion Sphere 1 */}
      <motion.div
        className="art-sphere art-sphere-vermilion-lg"
        animate={{
          y: [-10, 10, -10],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transform: `translate(${mouse.x * 12}px, ${mouse.y * 12}px)`,
        }}
      >
        <div className="sphere-concentric-rings" />
        <div className="sphere-inner-iris" />
      </motion.div>

      {/* Gentle Vermilion Sphere 2 */}
      <motion.div
        className="art-sphere art-sphere-vermilion-sm"
        animate={{
          y: [8, -8, 8],
          rotate: [2, -2, 2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        style={{
          transform: `translate(${mouse.x * -8}px, ${mouse.y * -8}px)`,
        }}
      >
        <div className="sphere-concentric-rings" />
      </motion.div>

      {/* Deep Emerald Accent Ring */}
      <motion.div
        className="art-ring-emerald"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Decorative Starbursts */}
      <motion.span
        className="art-star star-1 text-vermilion font-display"
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✦
      </motion.span>
      <motion.span
        className="art-star star-2 text-emerald font-display"
        animate={{ scale: [1.1, 0.85, 1.1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        ✧
      </motion.span>
      <motion.span
        className="art-star star-3 text-vermilion font-display"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        ✦
      </motion.span>
    </div>
  );
}

// ----- Interactive Dossier Specimen (Soothing, High-Touch) -----
function EditorialDocumentDossier() {
  const [specimenMode, setSpecimenMode] = useState('authentic'); // 'authentic' | 'altered'
  const [isVerifying, setIsVerifying] = useState(false);

  const handleToggle = (mode) => {
    setSpecimenMode(mode);
    setIsVerifying(true);
    setTimeout(() => setIsVerifying(false), 900);
  };

  return (
    <div className="editorial-dossier-wrapper">
      {/* Top Dossier Controller */}
      <div className="dossier-controller">
        <div className="dossier-tab-group">
          <button
            className={`dossier-tab ${specimenMode === 'authentic' ? 'active-emerald' : ''}`}
            onClick={() => handleToggle('authentic')}
          >
            <span className="dot dot-emerald" />
            Authentic Institutional Filing
          </button>
          <button
            className={`dossier-tab ${specimenMode === 'altered' ? 'active-vermilion' : ''}`}
            onClick={() => handleToggle('altered')}
          >
            <span className="dot dot-vermilion" />
            Flagged Specimen (Tampered)
          </button>
        </div>
        <span className="dossier-reg-num font-mono">APH-REF: 2026/IND-4491</span>
      </div>

      {/* Parchment Dossier Card */}
      <div className="dossier-parchment-sheet">
        {/* Soothing Verification Scan Wash */}
        <AnimatePresence>
          {isVerifying && (
            <motion.div
              className={`dossier-scan-wash ${specimenMode === 'authentic' ? 'wash-emerald' : 'wash-vermilion'}`}
              initial={{ opacity: 0, top: '0%' }}
              animate={{ opacity: 0.8, top: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        {/* Header Block */}
        <div className="dossier-sheet-head">
          <div className="dossier-emblem-seal">
            <Shield size={26} strokeWidth={1.7} />
          </div>
          <div>
            <div className="dossier-gov-tag font-mono">ALL INDIA COUNCIL FOR TECHNICAL EDUCATION</div>
            <h3 className="dossier-cert-title font-editorial">
              Institutional Extension of Approval (EoA) Scrutiny
            </h3>
          </div>
        </div>

        <div className="dossier-rule-divider" />

        {/* Content Rows */}
        <div className="dossier-fields-grid">
          <div className="dossier-field">
            <span className="df-label">Institution</span>
            <span className="df-val font-display">National Institute of Technology, Warangal</span>
          </div>

          <div className="dossier-field">
            <span className="df-label">Sanctioned Intake</span>
            <span className="df-val font-mono">2,400 Students • 8 Engineering Disciplines</span>
          </div>

          <div className={`dossier-field ${specimenMode === 'altered' ? 'df-tampered' : ''}`}>
            <span className="df-label">Fire & Life Safety NOC Validity</span>
            <span className="df-val font-mono">
              {specimenMode === 'authentic' ? '14-MAR-2026 to 13-MAR-2027 (VALID)' : '14-MAR-2025 -> 14-MAR-2026 [METADATA ALTERED]'}
            </span>
          </div>

          <div className="dossier-field">
            <span className="df-label">DigiLocker Cryptographic Hash</span>
            <span className="df-val font-mono text-emerald">
              SHA-256: 9b2d88c...44a7f0 (MATCH CONFIRMED)
            </span>
          </div>
        </div>

        {/* Seal Stamp Footer */}
        <div className="dossier-sheet-footer">
          <div className="dossier-officer-sign">
            <div className="sign-line" />
            <span className="sign-label">Regional Scrutiny Director</span>
          </div>

          {/* Vermilion or Emerald Wax Seal */}
          <motion.div
            key={specimenMode}
            className={`dossier-wax-seal ${specimenMode === 'authentic' ? 'seal-emerald' : 'seal-vermilion'}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            <div className="wax-seal-inner">
              <span className="wax-seal-org">AICTE</span>
              <span className="wax-seal-state font-mono">
                {specimenMode === 'authentic' ? 'APPROVED' : 'FLAGGED'}
              </span>
              <span className="wax-seal-year font-mono">2026-27</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ----- Stat Counter in Warm Ivory -----
function EditorialStat({ number, suffix = '', label }) {
  const [ref, count] = useCountUp(number, 2000);
  return (
    <div ref={ref} className="editorial-stat-item">
      <div className="stat-number font-editorial">
        {count}{suffix}
      </div>
      <div className="stat-label font-mono">{label}</div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="editorial-landing-page">
      {/* Top Banner Ticker */}
      <div className="editorial-top-ticker">
        <div className="ticker-inner">
          <span>✦ ALL INDIA COUNCIL FOR TECHNICAL EDUCATION</span>
          <span className="ticker-dot">•</span>
          <span>APPROVAL PROCESS HANDBOOK (APH 2026-27)</span>
          <span className="ticker-dot">•</span>
          <span>AUTONOMOUS SCRUTINY & REPOSITORY AUTHENTICATION</span>
          <span className="ticker-dot">•</span>
          <span>MINISTRY OF EDUCATION, GOVT OF INDIA</span>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="editorial-header">
        <div className="editorial-header-inner">
          <div className="editorial-brand">
            <div className="brand-crest">
              <Shield size={20} />
            </div>
            <div className="brand-titles">
              <span className="brand-title-main font-display">SmartApproval</span>
              <span className="brand-badge-seal font-mono">AICTE</span>
            </div>
          </div>

          <nav className="editorial-nav-links">
            <a href="#perspective">Perspective</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#architecture">Architecture</a>
            <a href="#handbook">Handbook Norms</a>
          </nav>

          <div className="editorial-header-cta">
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/login')}>
              Officer Login
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard')}>
              <span>Launch Platform</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section — Inspired by "Change of Perspective" Graphic Artwork */}
      <section className="editorial-hero-section" id="perspective">
        {/* Subtle Canvas Spheres in Warm Ivory, Emerald, and Vermilion */}
        <EditorialArtCanvas />

        <div className="hero-editorial-grid">
          {/* Left Column: Bold Graphic Headline & Overview */}
          <div className="hero-text-block">
            <div className="hero-kicker-tag font-mono">
              <span className="kicker-star text-vermilion">✦</span>
              <span>AICTE DECISION-SUPPORT INITIATIVE • 2026</span>
            </div>

            <h1 className="hero-title-isometric font-editorial">
              A Change of <br />
              <span className="text-emerald">Perspective</span> in <br />
              <span className="text-vermilion">Institutional</span> Scrutiny.
            </h1>

            <p className="hero-lead-text">
              Transforming the Extension of Approval (EoA) cycle through autonomous document validation,
              live issuing authority confirmation, and forensic anomaly detection—keeping final statutory authority with human leaders.
            </p>

            <div className="hero-action-cluster">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
                <span>( → ) Explore Scrutiny Console</span>
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/login')}>
                <span>Role Gateway</span>
              </button>
            </div>

            {/* Editorial Stats Row */}
            <div className="hero-stats-band">
              <EditorialStat number={45000} suffix="+" label="APPLICATIONS FILED" />
              <EditorialStat number={78} suffix="%" label="SCRUTINY AUTOMATION" />
              <EditorialStat number={99} suffix=".4%" label="AUTHENTICATION ACCURACY" />
            </div>
          </div>

          {/* Right Column: Editorial Side Banner + Interactive Dossier */}
          <div className="hero-visual-block">
            {/* Editorial Side Statement (Referencing the Image typography) */}
            <div className="editorial-vertical-statement font-mono text-vermilion">
              <span>WE</span>
              <span>ALL</span>
              <span>LEARN</span>
              <span>THROUGH</span>
              <span>THE</span>
              <span>PROCESS</span>
              <span>OF</span>
              <span>CHANGE</span>
            </div>

            {/* Interactive Dossier Simulator */}
            <EditorialDocumentDossier />
          </div>
        </div>
      </section>

      {/* Section 2: Core Capabilities (Editorial Grid) */}
      <section className="editorial-section" id="capabilities">
        <div className="editorial-section-head">
          <div className="section-label-pill font-mono">
            <span className="text-vermilion">✦</span> PILLARS OF SCRUTINY
          </div>
          <h2 className="section-heading font-editorial">
            Engineered with <span className="text-emerald">Absolute Fidelity</span> to the Approval Process Handbook
          </h2>
          <p className="section-sub-desc">
            Combining rigorous statutory checklist compliance with cutting-edge computer vision and direct repository pings.
          </p>
        </div>

        <div className="editorial-cards-grid">
          {/* Card 1 */}
          <div className="editorial-card card-emerald-accent">
            <div className="card-top-row">
              <span className="card-num font-mono">01</span>
              <div className="card-icon-circle emerald">
                <FileText size={22} />
              </div>
            </div>
            <h3 className="card-title font-editorial">Multi-Format Document OCR</h3>
            <p className="card-body-text">
              Automated classification and key-field extraction for 16+ approval documents. Resolves registration numbers, issuing authorities, and date ranges.
            </p>
            <div className="card-foot-tag font-mono text-emerald">
              <span>TESSERACT + VISION AI</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="editorial-card card-vermilion-accent">
            <div className="card-top-row">
              <span className="card-num font-mono">02</span>
              <div className="card-icon-circle vermilion">
                <Fingerprint size={22} />
              </div>
            </div>
            <h3 className="card-title font-editorial">Forensic Anomaly Detection</h3>
            <p className="card-body-text">
              Deep binary and metadata inspection detecting font substitutions, digital signature chain invalidations, and cross-application duplicate submissions.
            </p>
            <div className="card-foot-tag font-mono text-vermilion">
              <span>ZERO-TOLERANCE INTEGRITY</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="editorial-card card-emerald-accent">
            <div className="card-top-row">
              <span className="card-num font-mono">03</span>
              <div className="card-icon-circle emerald">
                <Globe size={22} />
              </div>
            </div>
            <h3 className="card-title font-editorial">Issuing Authority Gateways</h3>
            <p className="card-body-text">
              Direct, encrypted verification pipelines connecting DigiLocker, affiliating universities, state technical directorates, and disaster management portals.
            </p>
            <div className="card-foot-tag font-mono text-emerald">
              <span>DIGILOCKER 256-BIT SYNC</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="editorial-card card-vermilion-accent">
            <div className="card-top-row">
              <span className="card-num font-mono">04</span>
              <div className="card-icon-circle vermilion">
                <Target size={22} />
              </div>
            </div>
            <h3 className="card-title font-editorial">APH 2026 Regulatory Engine</h3>
            <p className="card-body-text">
              Automated evaluation of mandatory land area, built-up instructional space, faculty cadre ratios (1:15), and barrier-free infrastructure standards.
            </p>
            <div className="card-foot-tag font-mono text-vermilion">
              <span>FORMULA NORMS CALCULATOR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Architecture & Decision Flow */}
      <section className="editorial-section section-bg-tint" id="architecture">
        <div className="editorial-section-head">
          <div className="section-label-pill font-mono">
            <span className="text-emerald">✦</span> SYSTEM PIPELINE
          </div>
          <h2 className="section-heading font-editorial">
            How SmartApproval <span className="text-vermilion">Accelerates</span> Administrative Due Diligence
          </h2>
        </div>

        <div className="editorial-pipeline-row">
          <div className="pipe-box">
            <div className="pipe-step font-mono">STEP 01</div>
            <h4 className="font-editorial">Institutional Ingestion</h4>
            <p>Institution submits EoA documentation. System generates immutable audit block.</p>
          </div>

          <div className="pipe-divider">→</div>

          <div className="pipe-box">
            <div className="pipe-step font-mono">STEP 02</div>
            <h4 className="font-editorial">Vision OCR & Forensics</h4>
            <p>Metadata heuristics scan for alteration traces and parse institutional fields.</p>
          </div>

          <div className="pipe-divider">→</div>

          <div className="pipe-box">
            <div className="pipe-step font-mono">STEP 03</div>
            <h4 className="font-editorial">External Authority Match</h4>
            <p>Automated handshake checks certificate hashes against national repositories.</p>
          </div>

          <div className="pipe-divider">→</div>

          <div className="pipe-box">
            <div className="pipe-step font-mono">STEP 04</div>
            <h4 className="font-editorial">Scrutiny Officer Decision</h4>
            <p>Officer reviews compliance findings and grants approval or mandates EVC inspection.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Final Editorial Invitation */}
      <section className="editorial-cta-section">
        <div className="editorial-cta-card">
          <div className="cta-left">
            <span className="hero-kicker-tag font-mono" style={{ color: '#F9EBD7' }}>
              <span className="kicker-star text-vermilion">✦</span> READY FOR PRODUCTION
            </span>
            <h2 className="cta-title font-editorial">
              Elevate Technical Education Governance Today
            </h2>
            <p className="cta-desc">
              Experience the comprehensive AICTE scrutiny workspace equipped with live document validation, forensic triggers, and APH 2026 rule engines.
            </p>
          </div>
          <div className="cta-right">
            <button className="btn btn-accent btn-lg" onClick={() => navigate('/dashboard')}>
              <span>Launch Scrutiny Console</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="editorial-footer">
        <div className="footer-inner">
          <div className="footer-col-brand">
            <div className="brand-crest">
              <Shield size={20} />
            </div>
            <span className="font-editorial footer-brand-name">AICTE SmartApproval AI</span>
            <p className="footer-tagline">
              Ministry of Education • Government of India • Smart India Hackathon 2026
            </p>
          </div>

          <div className="footer-col-right font-mono">
            <span>WARM IVORY (#F9EBD7) • EMERALD GREEN (#046A38) • VERMILION (#E34222)</span>
            <span className="copyright-line">© 2026 ALL INDIA COUNCIL FOR TECHNICAL EDUCATION. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
