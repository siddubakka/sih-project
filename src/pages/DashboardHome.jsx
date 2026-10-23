import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  FileText, FileCheck, AlertTriangle, Clock, TrendingUp, Zap,
  ArrowUpRight, ArrowDownRight, Eye, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { generateApplications, getDashboardStats, getChartData, getAlerts, STATUS_COLORS } from '../data/mockData';
import './DashboardHome.css';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

function KPICard({ icon: Icon, title, value, subtitle, trend, trendUp, color }) {
  return (
    <motion.div className={`kpi-card kpi-card-${color}`} variants={item}>
      <div className="kpi-header">
        <div className={`kpi-icon kpi-icon-${color}`}>
          <Icon size={22} strokeWidth={1.8} />
        </div>
        {trend && (
          <div className={`kpi-trend ${trendUp ? 'kpi-trend-up' : 'kpi-trend-down'}`}>
            {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </div>
        )}
      </div>
      <div className="kpi-value font-display">{value}</div>
      <div className="kpi-title">{title}</div>
      {subtitle && <div className="kpi-subtitle font-mono">{subtitle}</div>}
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="chart-tooltip-item">
          <span className="chart-tooltip-dot" style={{ background: p.color }} />
          <span>{p.name}: <strong>{p.value}</strong></span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardHome() {
  const navigate = useNavigate();
  const { showToast } = useAuth();

  const applications = useMemo(() => generateApplications(12), []);
  const stats = useMemo(() => getDashboardStats(applications), [applications]);
  const chartData = useMemo(() => getChartData(), []);
  const alerts = useMemo(() => getAlerts(), []);

  return (
    <div className="dashboard-home">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Executive Scrutiny Dashboard</h1>
          <p className="page-subtitle">Governance command center for AICTE Extension of Approval (EoA) 2026-27 cycle</p>
        </div>
        <div className="page-header-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => showToast('Generated Comprehensive Regional Scrutiny Digest (PDF)')}
          >
            <FileText size={14} />
            Generate Regional Summary
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div className="kpi-grid" variants={container} initial="hidden" animate="show">
        <KPICard
          icon={FileText}
          title="Total Applications"
          value={stats.applications.total}
          subtitle="Current 2026-27 cycle"
          trend="12%"
          trendUp={true}
          color="primary"
        />
        <KPICard
          icon={FileCheck}
          title="Verified & Approved"
          value={stats.applications.verified}
          subtitle={`${stats.documents.verified} documents verified`}
          trend="8%"
          trendUp={true}
          color="success"
        />
        <KPICard
          icon={AlertTriangle}
          title="Flagged Anomalies"
          value={stats.applications.flagged}
          subtitle={`${stats.documents.flagged} discrepancies noted`}
          trend="3%"
          trendUp={false}
          color="danger"
        />
        <KPICard
          icon={TrendingUp}
          title="Automation Rate"
          value={stats.automationRate}
          subtitle={`${stats.verificationAccuracy} accuracy`}
          trend="5%"
          trendUp={true}
          color="accent"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Application Trend */}
        <motion.div className="chart-card chart-card-wide" variants={item} initial="hidden" animate="show">
          <div className="chart-header">
            <h3>Approval Processing Trends</h3>
            <div className="chart-legend-inline">
              <span><span className="legend-dot" style={{ background: '#046A38' }} /> Received</span>
              <span><span className="legend-dot" style={{ background: '#068A4A' }} /> Processed</span>
              <span><span className="legend-dot" style={{ background: '#E34222' }} /> Flagged</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData.applicationTrend}>
              <defs>
                <linearGradient id="gradReceived" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#046A38" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#046A38" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradProcessed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#068A4A" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#068A4A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#DBCBB1" />
              <XAxis dataKey="month" tick={{ fill: '#6E7C72', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6E7C72', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="received" stroke="#046A38" fill="url(#gradReceived)" strokeWidth={2.5} name="Received" />
              <Area type="monotone" dataKey="processed" stroke="#068A4A" fill="url(#gradProcessed)" strokeWidth={2} name="Processed" />
              <Area type="monotone" dataKey="flagged" stroke="#E34222" fill="transparent" strokeWidth={2} strokeDasharray="4 4" name="Flagged" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Verification Methods Pie */}
        <motion.div className="chart-card" variants={item} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
          <div className="chart-header">
            <h3>Verification Gateways</h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={chartData.verificationMethods}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.verificationMethods.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {chartData.verificationMethods.map((m, i) => (
              <div key={i} className="pie-legend-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="legend-dot" style={{ background: m.color }} />
                  <span>{m.name}</span>
                </div>
                <span className="pie-legend-value">{m.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Applications + Alerts Feed */}
      <div className="bottom-row">
        {/* Recent Applications Table */}
        <motion.div className="chart-card chart-card-wide" variants={item} initial="hidden" animate="show" transition={{ delay: 0.25 }}>
          <div className="chart-header">
            <div>
              <h3>Recent Institutional Applications</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Click any row to open full AI Scrutiny Studio</p>
            </div>
            <button className="btn btn-secondary btn-xs" onClick={() => navigate('/dashboard/applications')}>
              View All 12 <ChevronRight size={13} />
            </button>
          </div>
          <div className="table-container" style={{ border: 'none' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Institution</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Documents</th>
                  <th>Risk Tier</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 5).map(app => (
                  <tr key={app.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/dashboard/applications/${app.id}`)}>
                    <td><span className="font-mono text-emerald" style={{ fontWeight: 700 }}>{app.id}</span></td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.86rem' }}>{app.institution.name}</div>
                      <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>{app.institution.code} • {app.institution.state}</div>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{app.category}</td>
                    <td><span className={`badge badge-${STATUS_COLORS[app.status]}`}>{app.status}</span></td>
                    <td>
                      <div className="progress-bar" style={{ width: 80, display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }}>
                        <div className="progress-bar-fill" style={{ width: `${app.summary.documentCompletionPct}%` }} />
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{app.summary.verifiedDocuments}/{app.summary.totalDocuments}</span>
                    </td>
                    <td>
                      <span className={`badge badge-${app.priority === 'High' ? 'danger' : app.priority === 'Medium' ? 'warning' : 'success'}`}>
                        {app.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Alerts Panel */}
        <motion.div className="chart-card alerts-panel" variants={item} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
          <div className="chart-header">
            <h3>Urgent Forensic Alerts</h3>
            <span className="badge badge-danger font-mono">{alerts.filter(a => !a.read).length} New</span>
          </div>
          <div className="alerts-feed">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-feed-item ${!alert.read ? 'alert-feed-unread' : ''}`}>
                <div className={`status-dot status-dot-${alert.type === 'danger' ? 'danger' : alert.type === 'warning' ? 'warning' : 'info'}`} />
                <div>
                  <div className="alert-feed-title">{alert.title}</div>
                  <div className="alert-feed-msg">{alert.message}</div>
                  <div className="alert-feed-time font-mono">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
