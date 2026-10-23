import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare, FileText, AlertTriangle, CheckCircle2,
  XCircle, Filter, Download, Calculator, Sparkles,
  Building, Users, ShieldAlert, BookOpen, Layers
} from 'lucide-react';
import './ComplianceCheckerPage.css';

const handbookRules = [
  {
    id: 'APH-INFRA-01',
    domain: 'Infrastructure',
    rule: 'Minimum Land Requirement in Mega/Metro or Rural Areas',
    section: 'APH 2026, Section 4.1',
    norm: 'Engineering UG: ≥ 4.0 Acres (Metro) or ≥ 7.5 Acres (Other areas)',
    weight: 'Critical',
    status: 'Compliant',
    evidence: 'Deed No. 894/2018 registered in name of society. Area: 12.5 Acres confirmed via Revenue Portal.',
  },
  {
    id: 'APH-INFRA-02',
    domain: 'Infrastructure',
    rule: 'Instructional Built-Up Area per Student Ratio',
    section: 'APH 2026, Section 4.3',
    norm: 'Minimum 4.0 sq.m per student enrolled in technical disciplines',
    weight: 'Critical',
    status: 'Compliant',
    evidence: 'Submitted architectural carpet area: 24,500 sq.m against required 19,200 sq.m.',
  },
  {
    id: 'APH-FACULTY-01',
    domain: 'Faculty',
    rule: 'Faculty-to-Student Ratio (FSR) for Engineering UG',
    section: 'APH 2026, Section 5.1',
    norm: 'Prescribed ratio of 1:15 for UG Engineering & Technology programs',
    weight: 'Critical',
    status: 'Deficiency Noted',
    evidence: 'Total Faculty: 142 against required 160 for 2,400 students. Shortfall of 18 faculty positions in CSE & ECE.',
  },
  {
    id: 'APH-FACULTY-02',
    domain: 'Faculty',
    rule: 'Cadre Ratio (Professor : Associate Prof : Assistant Prof)',
    section: 'APH 2026, Section 5.2',
    norm: 'Cadre ratio of 1 : 2 : 6 for accredited departments',
    weight: 'Major',
    status: 'Partially Compliant',
    evidence: 'Professor cadre met in 4 of 6 branches. Shortfall of 2 Professors in Mechanical Engineering.',
  },
  {
    id: 'APH-SAFETY-01',
    domain: 'Safety',
    rule: 'Fire Safety Certificate from Competent State Authority',
    section: 'APH 2026, Section 6.1',
    norm: 'Valid Fire NOC issued by Chief Fire Officer covering all academic blocks',
    weight: 'Critical',
    status: 'Compliant',
    evidence: 'Fire NOC TS/FSC/2026/09842 verified online. Valid until 13-Mar-2027.',
  },
  {
    id: 'APH-SAFETY-02',
    domain: 'Safety',
    rule: 'Disabled-Friendly (Divyangjan) Barrier-Free Infrastructure',
    section: 'RPwD Act 2016 & APH 2026',
    norm: 'Ramps with handrails, Braille lifts, disabled-friendly restrooms on every floor',
    weight: 'Major',
    status: 'Compliant',
    evidence: '3 geo-tagged elevator photographs and barrier-free audit report submitted.',
  },
  {
    id: 'APH-STAT-01',
    domain: 'Statutory',
    rule: 'Constitution of Anti-Ragging Committee and Squad',
    section: 'UGC & AICTE Regulations 2009',
    norm: 'Committee notifications, helpline displays, and online student undertaking submissions',
    weight: 'Critical',
    status: 'Compliant',
    evidence: '100% student anti-ragging undertakings verified via national anti-ragging web portal.',
  },
  {
    id: 'APH-FIN-01',
    domain: 'Financial',
    rule: 'Technical Education Regulatory (TER) Charges Payment',
    section: 'APH 2026, Section 3.1',
    norm: 'Full processing fee paid through payment gateway without default',
    weight: 'Critical',
    status: 'Compliant',
    evidence: 'TER Receipt #AICTE-PAY-88219 (Amount: Rs. 2,00,000) verified via SBI Collect.',
  },
];

export default function ComplianceCheckerPage() {
  const [rules, setRules] = useState(handbookRules);
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Interactive Norm Calculator State
  const [programType, setProgramType] = useState('Engineering UG');
  const [totalIntake, setTotalIntake] = useState(600);
  const [currentFaculty, setCurrentFaculty] = useState(36);

  // Dynamic calculations based on APH norms
  const requiredFaculty = Math.ceil(totalIntake / 15);
  const facultyShortfall = Math.max(0, requiredFaculty - currentFaculty);
  const requiredBuiltUpArea = totalIntake * 4.5; // sq.m
  const requiredLabs = Math.ceil(totalIntake / 60) * 2;

  const filteredRules = rules.filter(r => {
    const matchDomain = selectedDomain === 'all' || r.domain === selectedDomain;
    const matchSearch = !search ||
      r.rule.toLowerCase().includes(search.toLowerCase()) ||
      r.section.toLowerCase().includes(search.toLowerCase()) ||
      r.evidence.toLowerCase().includes(search.toLowerCase());
    return matchDomain && matchSearch;
  });

  const compliantCount = rules.filter(r => r.status === 'Compliant').length;
  const compliancePct = Math.round((compliantCount / rules.length) * 100);

  return (
    <div className="compliance-page">
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
          <h1 className="page-title">APH 2026 Regulatory Compliance Engine</h1>
          <p className="page-subtitle">
            Automated scrutiny of institutional parameters against statutory norms of the AICTE Approval Process Handbook (2026-27)
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Generating APH Compliance Deficiency Report (PDF)... 8 rules checked, 2 deficiencies flagged.')}>
          <Download size={14} />
          Export Compliance Deficiency Report
        </button>
      </div>

      {/* Top Interactive Norms Calculator Card */}
      <div className="card calculator-card">
        <div className="calculator-header">
          <div className="calc-title-box">
            <Calculator size={20} className="text-primary" />
            <div>
              <h3>Interactive AICTE Requirement Calculator</h3>
              <p>Simulate intake scenarios to calculate mandatory faculty, area, and laboratory requirements</p>
            </div>
          </div>
          <span className="badge badge-accent">Handbook Formula Engine</span>
        </div>

        <div className="calc-controls-grid">
          <div className="calc-control-group">
            <label>Discipline / Program</label>
            <select
              value={programType}
              onChange={e => setProgramType(e.target.value)}
              className="calc-select"
            >
              <option value="Engineering UG">Engineering & Technology (UG) — 1:15 FSR</option>
              <option value="Engineering PG">Engineering & Technology (PG) — 1:12 FSR</option>
              <option value="Management">Management (MBA/PGDM) — 1:20 FSR</option>
              <option value="MCA">Computer Applications (MCA) — 1:15 FSR</option>
            </select>
          </div>

          <div className="calc-control-group">
            <label>Approved Student Intake: <strong>{totalIntake}</strong></label>
            <input
              type="range"
              min={120}
              max={2400}
              step={60}
              value={totalIntake}
              onChange={e => setTotalIntake(Number(e.target.value))}
              className="calc-range"
            >
            </input>
          </div>

          <div className="calc-control-group">
            <label>Reported Available Faculty: <strong>{currentFaculty}</strong></label>
            <input
              type="range"
              min={10}
              max={160}
              step={2}
              value={currentFaculty}
              onChange={e => setCurrentFaculty(Number(e.target.value))}
              className="calc-range"
            >
            </input>
          </div>
        </div>

        {/* Real-time Calculation Result Bar */}
        <div className="calc-results-row">
          <div className="calc-res-box">
            <span className="calc-res-k">Required Faculty</span>
            <span className="calc-res-v">{requiredFaculty}</span>
            <span className="calc-res-sub">Ratio 1:15</span>
          </div>

          <div className="calc-res-box">
            <span className="calc-res-k">Faculty Deficit</span>
            <span className={`calc-res-v ${facultyShortfall > 0 ? 'text-danger' : 'text-success'}`}>
              {facultyShortfall > 0 ? `-${facultyShortfall}` : '0 (Met)'}
            </span>
            <span className="calc-res-sub">{facultyShortfall > 0 ? 'Deficiency Alert' : 'Compliant'}</span>
          </div>

          <div className="calc-res-box">
            <span className="calc-res-k">Mandatory Built-Up Area</span>
            <span className="calc-res-v font-mono">{requiredBuiltUpArea.toLocaleString()} sq.m</span>
            <span className="calc-res-sub">Instructional & Admin</span>
          </div>

          <div className="calc-res-box">
            <span className="calc-res-k">Min Required Labs</span>
            <span className="calc-res-v">{requiredLabs} Labs</span>
            <span className="calc-res-sub">Equipment Standard</span>
          </div>
        </div>
      </div>

      {/* Domain Filters & Search */}
      <div className="compliance-filter-bar">
        <div className="compliance-domain-tabs">
          {['all', 'Infrastructure', 'Faculty', 'Safety', 'Statutory', 'Financial'].map(d => (
            <button
              key={d}
              className={`comp-tab ${selectedDomain === d ? 'active' : ''}`}
              onClick={() => setSelectedDomain(d)}
            >
              {d === 'all' ? 'All Handbooks Norms' : d}
            </button>
          ))}
        </div>

        <div className="compliance-search">
          <input
            type="text"
            placeholder="Search regulations, sections, evidence..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Rules Table */}
      <div className="card compliance-list-card">
        <div className="card-header">
          <div>
            <h3>Regulatory Norms Scrutiny Table</h3>
            <p>Showing {filteredRules.length} evaluated norms</p>
          </div>
          <span className="badge badge-success">Overall Compliance: {compliancePct}%</span>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Rule ID & Title</th>
                <th>APH Section</th>
                <th>Domain</th>
                <th>Severity</th>
                <th>Evaluation Status</th>
                <th>Evidence & Deficiency Findings</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map(rule => (
                <tr key={rule.id}>
                  <td>
                    <div className="rule-title-bold">{rule.rule}</div>
                    <div className="rule-norm-desc">{rule.norm}</div>
                  </td>
                  <td className="font-mono text-primary" style={{ fontSize: '0.8rem' }}>
                    {rule.section}
                  </td>
                  <td>
                    <span className="badge badge-info">{rule.domain}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${rule.weight === 'Critical' ? 'danger' : 'warning'}`}>
                      {rule.weight}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${rule.status === 'Compliant' ? 'success' : rule.status === 'Deficiency Noted' ? 'danger' : 'warning'}`}>
                      {rule.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', maxWidth: '300px' }}>
                    {rule.evidence}
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
