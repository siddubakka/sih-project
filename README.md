# AICTE EoA Intelligent Scrutiny & Automated Approval Platform
### Smart India Hackathon (SIH 2026) • Problem Statement Solution

[![React](https://img.shields.io/badge/Frontend-React_19_+_Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer_Motion-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Recharts](https://img.shields.io/badge/Analytics-Recharts-22b5bf)](https://recharts.org/)
[![Lucide](https://img.shields.io/badge/Icons-Lucide_React-F56565)](https://lucide.dev/)
[![Design System](https://img.shields.io/badge/Palette-Warm_Ivory_%E2%80%A2_Emerald_Green_%E2%80%A2_Vermilion-064e3b)](https://github.com/siddubakka/sih-project)

---

## 🏛️ Executive Summary

Every academic year, the **All India Council for Technical Education (AICTE)** processes over 10,000+ Extension of Approval (EoA) and new institutional sanction applications. Manual document scrutiny across land titles, fire safety approvals, building occupancy certificates, faculty cadre ratios, and infrastructure compliance is prone to:
1. Significant delays (weeks to months per approval cycle)
2. Inconsistent verification standards across regional scrutiny committees
3. Document tampering and forged regulatory certificates
4. Bottlenecks in tracking institutional compliance over time

**AICTE EoA Scrutiny Engine** is an end-to-end AI-powered digital regulatory platform that reduces document evaluation time from days to seconds, flagging anomalies, verifying forensic signatures, computing institutional compliance scores, and providing an immutable audit trail.

---

## ⚡ Core Features & Innovations

### 1. 🤖 AI-Powered Neural Document Scrutiny & OCR
- **Automated Text & Seal Extraction**: Scans institutional uploads (Fire NOC, Building Safety, Land Deeds, AICTE Affiliations, Audit Reports) with sub-second optical recognition.
- **Forgery & Splice Detection**: Multi-layer computer vision algorithm detects modified text blocks, altered dates, and stamp irregularities with detailed confidence scores.
- **Dynamic File Uploader**: Real-time interactive drag-and-drop file processing with immediate AI parsing and instant validation feedback.

### 2. 📊 Executive Command & Scrutiny Dashboard
- Real-time KPIs: Application processing velocity, compliance clearance rate, anomaly alerts, and regional status distribution.
- Interactive time-series throughput charts and defect categorization breakdowns.
- Instant PDF regional summary generation for committee chairs.

### 3. 👥 Multi-Role Workflow Switcher
- **AICTE Central Administrator**: National oversight, policy threshold configuration, and master system settings.
- **Regional Scrutiny Officer**: Detailed application-by-application inspection, AI verification validation, and objection raising.
- **Institution Applicant**: Real-time status tracker, deficiencies clarification, and re-submission portal.

### 4. 🧠 Interactive AI Scrutiny Copilot (Drawer)
- Floating assistant available across all pages.
- Ask questions regarding AICTE Approval Process Handbook (APH) 2026-27 norms, faculty cadre ratios, land area requirements, and document forensic queries.
- Pre-populated quick prompts for evaluating complex institutional scenarios.

### 5. 🛡️ Forensic Anomaly & Plagiarism Detection
- Multi-application cross-comparison to detect recycled land survey numbers or shared faculty profiles across distinct institutions.
- Risk matrix classification: High Severity (Fraud/Forged), Medium (Expired NOC), Low (Formatting/Resolution).

### 6. 📜 Immutable Audit Trail & Regulatory Logs
- Every officer action, AI inference, document status change, and approval decision is logged with cryptographic hashes and millisecond timestamps for CVC/court audit readiness.

---

## 🎨 Design System & Palette

Designed with an executive, soothing, and high-trust government aesthetic:
- **Warm Ivory (`#FDFBF7`, `#F8F4EC`)**: Premium backdrop reducing eye strain during hours of document evaluation.
- **Emerald Green (`#064E3B`, `#059669`)**: AICTE official authority, security, compliance, and institutional trust.
- **Vermilion Accent (`#E03E1A`)**: Critical discrepancy highlights, urgent anomaly flags, and action triggers.
- **Fluid Micro-Animations**: Smooth Framer Motion layout transitions and interactive hover effects.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/siddubakka/sih-project.git

# Navigate to project directory
cd sih-project

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📂 Project Architecture

```
sih-project/
├── public/                 # Static assets & icons
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AICopilotDrawer.jsx   # Global floating AI scrutiny assistant
│   │   ├── Header.jsx            # Top bar with role switcher & quick alerts
│   │   ├── Sidebar.jsx           # Collapsible navigation synchronized with layout
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.jsx       # State management for roles, toasts & notifications
│   ├── data/
│   │   └── mockData.js           # Comprehensive AICTE application mock dataset
│   ├── pages/
│   │   ├── LandingPage.jsx       # Scroll-animated landing experience
│   │   ├── DashboardHome.jsx     # Executive scrutiny command center
│   │   ├── ApplicationsPage.jsx  # Paginated, filterable institutional applications
│   │   ├── ApplicationDetailPage.jsx # Deep inspection with AI tabs & uploaders
│   │   ├── DocumentValidatorPage.jsx # Standalone AI document parser & validator
│   │   ├── AnomalyDetectionPage.jsx  # Risk heatmaps and fraud detection
│   │   ├── VerificationCenterPage.jsx# Officer review workflow
│   │   ├── ComplianceCheckerPage.jsx # APH rule engine compliance calculator
│   │   ├── AuditTrailPage.jsx        # Tamper-proof activity logs
│   │   └── SettingsPage.jsx          # AI threshold & regional configs
│   ├── App.jsx             # React router configuration
│   ├── index.css           # Global CSS variables, design tokens & typography
│   └── main.jsx            # React root mount
├── package.json            # Project dependencies & scripts
└── vite.config.js          # Vite build configuration
```

---

## 🏆 Smart India Hackathon Submission
- **Platform**: AICTE Extension of Approval (EoA) Intelligent Scrutiny System
- **Focus**: Transparency, automated fraud mitigation, zero-delay governance, and institutional ease of doing business.
