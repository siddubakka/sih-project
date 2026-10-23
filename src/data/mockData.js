// ===== Mock Data & Services for AICTE SmartApproval AI =====

// ----- Application Statuses -----
export const STATUS = {
  PENDING: 'Pending Review',
  IN_PROGRESS: 'In Progress',
  VERIFIED: 'Verified',
  FLAGGED: 'Flagged',
  REJECTED: 'Rejected',
  APPROVED: 'Approved',
  MISMATCH: 'Mismatch Detected',
  EXPIRED: 'Expired',
  MANUAL_REVIEW: 'Manual Review Required',
  SOURCE_UNAVAILABLE: 'Source Unavailable',
};

export const STATUS_COLORS = {
  [STATUS.PENDING]: 'warning',
  [STATUS.IN_PROGRESS]: 'info',
  [STATUS.VERIFIED]: 'success',
  [STATUS.FLAGGED]: 'danger',
  [STATUS.REJECTED]: 'danger',
  [STATUS.APPROVED]: 'success',
  [STATUS.MISMATCH]: 'danger',
  [STATUS.EXPIRED]: 'warning',
  [STATUS.MANUAL_REVIEW]: 'warning',
  [STATUS.SOURCE_UNAVAILABLE]: 'info',
};

// ----- Application Categories -----
export const APP_CATEGORIES = [
  'Extension of Approval (EoA)',
  'New Institution',
  'New Programme/Course',
  'Increase in Intake',
  'Change in Site/Location',
  'Closure of Institution',
  'Conversion of Management',
  'Merger of Institutions',
];

// ----- Document Types -----
export const DOC_TYPES = [
  'Affidavit/Undertaking',
  'Land Documents',
  'Building Plan Approval',
  'Fire Safety Certificate',
  'NOC from State Government',
  'University Affiliation Letter',
  'Accreditation Certificate (NAAC/NBA)',
  'Faculty Details & Qualifications',
  'Audited Financial Statement',
  'Infrastructure Photographs',
  'Floor Plan Layout',
  'Equipment & Lab Inventory',
  'Student Enrollment Records',
  'TER Payment Receipt',
  'Previous EoA Copy',
  'Anti-Ragging Compliance',
];

// ----- Sample Institutions -----
const institutions = [
  { name: 'National Institute of Technology, Warangal', code: 'NIT-WGL-001', state: 'Telangana', type: 'Government', university: 'Autonomous' },
  { name: 'Vellore Institute of Technology', code: 'VIT-VLR-002', state: 'Tamil Nadu', type: 'Private', university: 'Deemed University' },
  { name: 'Birla Institute of Technology, Mesra', code: 'BIT-MSR-003', state: 'Jharkhand', type: 'Private', university: 'Deemed University' },
  { name: 'Delhi Technological University', code: 'DTU-DEL-004', state: 'Delhi', type: 'Government', university: 'State University' },
  { name: 'PSG College of Technology', code: 'PSG-CBE-005', state: 'Tamil Nadu', type: 'Private', university: 'Anna University' },
  { name: 'IIIT Hyderabad', code: 'IIIT-HYD-006', state: 'Telangana', type: 'PPP', university: 'Autonomous' },
  { name: 'Manipal Institute of Technology', code: 'MIT-MLP-007', state: 'Karnataka', type: 'Private', university: 'MAHE' },
  { name: 'SRM Institute of Science & Technology', code: 'SRM-CHN-008', state: 'Tamil Nadu', type: 'Private', university: 'Deemed University' },
  { name: 'Jadavpur University', code: 'JU-KOL-009', state: 'West Bengal', type: 'Government', university: 'State University' },
  { name: 'Thapar Institute of Engineering', code: 'TIE-PTL-010', state: 'Punjab', type: 'Private', university: 'Deemed University' },
  { name: 'COEP Technological University', code: 'COEP-PUN-011', state: 'Maharashtra', type: 'Government', university: 'Autonomous' },
  { name: 'Amity University, Noida', code: 'AMT-NOI-012', state: 'Uttar Pradesh', type: 'Private', university: 'Private University' },
];

// ----- Generate Applications -----
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateApplicationId() {
  const year = '2026';
  const num = String(Math.floor(10000 + Math.random() * 90000));
  return `AICTE-EoA-${year}-${num}`;
}

function generateDocuments(applicationId) {
  const numDocs = 6 + Math.floor(Math.random() * 8);
  const shuffled = [...DOC_TYPES].sort(() => 0.5 - Math.random());
  const selectedDocs = shuffled.slice(0, numDocs);

  return selectedDocs.map((docType, i) => {
    const statuses = [STATUS.VERIFIED, STATUS.VERIFIED, STATUS.VERIFIED, STATUS.PENDING, STATUS.FLAGGED, STATUS.EXPIRED, STATUS.MISMATCH];
    const status = randomChoice(statuses);
    const confidenceScore = status === STATUS.VERIFIED
      ? 85 + Math.random() * 15
      : status === STATUS.FLAGGED
        ? 20 + Math.random() * 35
        : 40 + Math.random() * 40;

    const anomalies = [];
    if (status === STATUS.FLAGGED) {
      anomalies.push(
        randomChoice([
          'Metadata inconsistency detected: creation date after modification date',
          'Font mismatch detected in institution name field',
          'Suspicious editing artifacts found in certificate number region',
          'Document appears to be a duplicate of another application',
          'Digital signature validation failed',
          'Inconsistent header formatting compared to template',
          'Registration number format does not match issuing authority pattern',
        ])
      );
    }
    if (status === STATUS.MISMATCH) {
      anomalies.push(
        randomChoice([
          'Certificate number not found in issuing authority database',
          'Name mismatch between submitted document and DigiLocker record',
          'Date of issue does not match university records',
          'Accreditation grade differs from NAAC portal data',
        ])
      );
    }
    if (status === STATUS.EXPIRED) {
      anomalies.push('Document has expired. Valid until: ' +
        randomDate(new Date('2024-01-01'), new Date('2025-12-31')).toLocaleDateString('en-IN'));
    }

    return {
      id: `DOC-${applicationId}-${String(i + 1).padStart(3, '0')}`,
      type: docType,
      status,
      confidenceScore: Math.round(confidenceScore * 10) / 10,
      uploadedAt: randomDate(new Date('2026-06-01'), new Date('2026-10-20')).toISOString(),
      verifiedAt: status === STATUS.VERIFIED ? randomDate(new Date('2026-06-05'), new Date('2026-10-22')).toISOString() : null,
      verificationSource: status === STATUS.VERIFIED ? randomChoice(['DigiLocker', 'University Portal', 'State Government API', 'NAAC Database', 'Manual Verification']) : null,
      anomalies,
      ocrExtracted: {
        institutionName: null,
        certificateNumber: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
        dateOfIssue: randomDate(new Date('2020-01-01'), new Date('2026-06-01')).toLocaleDateString('en-IN'),
        issuingAuthority: randomChoice(['State Government', 'University Registrar', 'NAAC', 'Fire Department', 'Revenue Authority']),
        validUntil: randomDate(new Date('2026-01-01'), new Date('2029-12-31')).toLocaleDateString('en-IN'),
      },
      fileInfo: {
        name: `${docType.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.pdf`,
        size: `${(0.5 + Math.random() * 4).toFixed(1)} MB`,
        pages: Math.floor(1 + Math.random() * 12),
      },
    };
  });
}

function generateComplianceChecks(category) {
  const checks = [
    { rule: 'Land area ≥ prescribed minimum for institution type', category: 'Infrastructure', handbook: 'APH 2026, Section 4.2', weight: 'Critical' },
    { rule: 'Built-up area meets programme-wise requirements', category: 'Infrastructure', handbook: 'APH 2026, Section 4.3', weight: 'Critical' },
    { rule: 'Faculty-student ratio within prescribed limits', category: 'Faculty', handbook: 'APH 2026, Section 5.1', weight: 'Critical' },
    { rule: 'All faculty possess minimum prescribed qualifications', category: 'Faculty', handbook: 'APH 2026, Section 5.2', weight: 'Major' },
    { rule: 'Library with prescribed number of titles and volumes', category: 'Infrastructure', handbook: 'APH 2026, Section 4.5', weight: 'Major' },
    { rule: 'Laboratory equipment as per curriculum requirements', category: 'Infrastructure', handbook: 'APH 2026, Section 4.6', weight: 'Major' },
    { rule: 'Fire safety certificate valid and current', category: 'Safety', handbook: 'APH 2026, Section 6.1', weight: 'Critical' },
    { rule: 'Anti-ragging measures and committee in place', category: 'Compliance', handbook: 'UGC Regulations 2009', weight: 'Critical' },
    { rule: 'Grievance redressal mechanism established', category: 'Compliance', handbook: 'APH 2026, Section 7.3', weight: 'Major' },
    { rule: 'TER payment up to date', category: 'Financial', handbook: 'APH 2026, Section 3.1', weight: 'Critical' },
    { rule: 'Accreditation status valid (NAAC/NBA)', category: 'Quality', handbook: 'APH 2026, Section 8.1', weight: 'Major' },
    { rule: 'Disabled-friendly infrastructure provisions', category: 'Infrastructure', handbook: 'RPwD Act 2016', weight: 'Major' },
    { rule: 'IT infrastructure and internet connectivity', category: 'Infrastructure', handbook: 'APH 2026, Section 4.8', weight: 'Minor' },
    { rule: 'Student amenities (hostel, canteen, sports)', category: 'Infrastructure', handbook: 'APH 2026, Section 4.9', weight: 'Minor' },
    { rule: 'NOC from affiliating university', category: 'Approval', handbook: 'APH 2026, Section 2.3', weight: 'Critical' },
    { rule: 'NOC from state government', category: 'Approval', handbook: 'APH 2026, Section 2.4', weight: 'Critical' },
  ];

  return checks.map(check => {
    const statuses = ['Compliant', 'Compliant', 'Compliant', 'Non-Compliant', 'Partially Compliant', 'Evidence Pending', 'Inspection Required'];
    const status = randomChoice(statuses);
    return {
      ...check,
      status,
      evidence: status === 'Compliant' ? 'Document verified' : status === 'Non-Compliant' ? 'Deficiency identified' : 'Awaiting verification',
      lastChecked: randomDate(new Date('2026-09-01'), new Date('2026-10-22')).toISOString(),
    };
  });
}

export function generateApplications(count = 12) {
  return institutions.slice(0, count).map((inst, index) => {
    const appId = generateApplicationId();
    const category = randomChoice(APP_CATEGORIES);
    const documents = generateDocuments(appId);
    const compliance = generateComplianceChecks(category);

    const verifiedDocs = documents.filter(d => d.status === STATUS.VERIFIED).length;
    const flaggedDocs = documents.filter(d => d.status === STATUS.FLAGGED || d.status === STATUS.MISMATCH).length;
    const totalDocs = documents.length;
    const completionPct = Math.round((verifiedDocs / totalDocs) * 100);

    const complianceMet = compliance.filter(c => c.status === 'Compliant').length;
    const complianceTotal = compliance.length;
    const compliancePct = Math.round((complianceMet / complianceTotal) * 100);

    let overallStatus;
    if (flaggedDocs > 2) overallStatus = STATUS.FLAGGED;
    else if (completionPct === 100 && compliancePct > 80) overallStatus = STATUS.VERIFIED;
    else if (completionPct > 70) overallStatus = STATUS.IN_PROGRESS;
    else overallStatus = STATUS.PENDING;

    return {
      id: appId,
      institution: inst,
      category,
      status: overallStatus,
      submittedAt: randomDate(new Date('2026-06-01'), new Date('2026-10-15')).toISOString(),
      lastUpdated: randomDate(new Date('2026-10-01'), new Date('2026-10-22')).toISOString(),
      documents,
      compliance,
      summary: {
        totalDocuments: totalDocs,
        verifiedDocuments: verifiedDocs,
        flaggedDocuments: flaggedDocs,
        pendingDocuments: totalDocs - verifiedDocs - flaggedDocs,
        documentCompletionPct: completionPct,
        complianceMet,
        complianceTotal,
        compliancePct,
        riskScore: flaggedDocs > 2 ? 'High' : flaggedDocs > 0 ? 'Medium' : 'Low',
      },
      assignedTo: randomChoice(['Dr. Priya Sharma', 'Mr. Rakesh Verma', 'Dr. Anjali Patel', 'Mr. Suresh Kumar']),
      priority: flaggedDocs > 2 ? 'High' : flaggedDocs > 0 ? 'Medium' : 'Low',
    };
  });
}

// ----- Dashboard Stats -----
export function getDashboardStats(applications) {
  const total = applications.length;
  const verified = applications.filter(a => a.status === STATUS.VERIFIED || a.status === STATUS.APPROVED).length;
  const flagged = applications.filter(a => a.status === STATUS.FLAGGED).length;
  const pending = applications.filter(a => a.status === STATUS.PENDING || a.status === STATUS.IN_PROGRESS).length;

  const totalDocs = applications.reduce((sum, a) => sum + a.documents.length, 0);
  const verifiedDocs = applications.reduce((sum, a) => sum + a.documents.filter(d => d.status === STATUS.VERIFIED).length, 0);
  const flaggedDocs = applications.reduce((sum, a) => sum + a.documents.filter(d => d.status === STATUS.FLAGGED || d.status === STATUS.MISMATCH).length, 0);

  return {
    applications: { total, verified, flagged, pending },
    documents: { total: totalDocs, verified: verifiedDocs, flagged: flaggedDocs, pending: totalDocs - verifiedDocs - flaggedDocs },
    avgProcessingTime: '3.2 days',
    automationRate: '78%',
    verificationAccuracy: '96.4%',
  };
}

// ----- Audit Trail -----
export function generateAuditTrail(applicationId) {
  const actions = [
    { action: 'Application Submitted', actor: 'Institution', type: 'submission' },
    { action: 'Auto-validation initiated', actor: 'System', type: 'system' },
    { action: 'OCR extraction completed for 8 documents', actor: 'System', type: 'system' },
    { action: 'Document completeness check: 2 missing documents identified', actor: 'System', type: 'alert' },
    { action: 'Anomaly detected: Metadata inconsistency in Fire Safety Certificate', actor: 'AI Engine', type: 'alert' },
    { action: 'DigiLocker verification initiated for Land Documents', actor: 'System', type: 'verification' },
    { action: 'DigiLocker verification successful: Land Documents verified', actor: 'System', type: 'verification' },
    { action: 'University affiliation cross-check completed', actor: 'System', type: 'verification' },
    { action: 'Compliance check completed: 12/16 rules met', actor: 'System', type: 'compliance' },
    { action: 'Case flagged for manual review', actor: 'System', type: 'alert' },
    { action: 'Manual review initiated by Dr. Priya Sharma', actor: 'Dr. Priya Sharma', type: 'review' },
    { action: 'Additional documents requested from institution', actor: 'Dr. Priya Sharma', type: 'action' },
    { action: 'Institution uploaded revised Fire Safety Certificate', actor: 'Institution', type: 'submission' },
    { action: 'Re-verification initiated for Fire Safety Certificate', actor: 'System', type: 'verification' },
  ];

  return actions.map((item, i) => ({
    ...item,
    id: `AUDIT-${applicationId}-${String(i + 1).padStart(3, '0')}`,
    timestamp: new Date(Date.now() - (actions.length - i) * 3600000 * (2 + Math.random() * 6)).toISOString(),
  }));
}

// ----- Chart Data -----
export function getChartData() {
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  return {
    applicationTrend: months.map(month => ({
      month,
      received: Math.floor(80 + Math.random() * 60),
      processed: Math.floor(60 + Math.random() * 50),
      flagged: Math.floor(5 + Math.random() * 20),
    })),
    verificationMethods: [
      { name: 'DigiLocker', value: 34, color: '#059669' },
      { name: 'University Portal', value: 22, color: '#064E3B' },
      { name: 'State Govt API', value: 18, color: '#E34234' },
      { name: 'Manual Review', value: 15, color: '#D97706' },
      { name: 'QR / Digital Sig', value: 11, color: '#10B981' },
    ],
    complianceByCategory: [
      { category: 'Infrastructure', compliant: 78, nonCompliant: 22 },
      { category: 'Faculty', compliant: 85, nonCompliant: 15 },
      { category: 'Safety', compliant: 72, nonCompliant: 28 },
      { category: 'Financial', compliant: 91, nonCompliant: 9 },
      { category: 'Quality', compliant: 68, nonCompliant: 32 },
      { category: 'Approval', compliant: 88, nonCompliant: 12 },
    ],
    anomalyTypes: [
      { type: 'Metadata Inconsistency', count: 23 },
      { type: 'Font/Format Mismatch', count: 15 },
      { type: 'Duplicate Document', count: 11 },
      { type: 'Expired Certificate', count: 19 },
      { type: 'Signature Mismatch', count: 8 },
      { type: 'ID Format Error', count: 6 },
    ],
  };
}

// ----- Alerts -----
export function getAlerts() {
  return [
    { id: 'ALT-001', type: 'danger', title: 'Suspected Forgery', message: 'Fire Safety Certificate for NIT-WGL-001 shows editing artifacts. Immediate review required.', time: '12 min ago', read: false },
    { id: 'ALT-002', type: 'warning', title: 'Document Expired', message: 'NAAC Accreditation for VIT-VLR-002 expired on 15-Aug-2025. Institution notified.', time: '1 hr ago', read: false },
    { id: 'ALT-003', type: 'info', title: 'Verification Complete', message: 'DigiLocker verification completed for 5 applications. All land documents verified.', time: '2 hrs ago', read: true },
    { id: 'ALT-004', type: 'warning', title: 'Compliance Gap', message: 'DTU-DEL-004 does not meet faculty-student ratio for M.Tech programmes.', time: '3 hrs ago', read: false },
    { id: 'ALT-005', type: 'danger', title: 'Duplicate Submission', message: 'Same financial statement submitted by SRM-CHN-008 and AMT-NOI-012. Cross-check required.', time: '4 hrs ago', read: false },
    { id: 'ALT-006', type: 'info', title: 'Batch Processing', message: '24 applications auto-validated. 18 passed, 4 flagged, 2 require manual review.', time: '5 hrs ago', read: true },
  ];
}
