import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Filter, FileText, ChevronRight, ArrowUpDown, Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { generateApplications, STATUS_COLORS, APP_CATEGORIES } from '../data/mockData';
import './ApplicationsPage.css';

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const { showToast } = useAuth();
  const applications = useMemo(() => generateApplications(12), []);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const statuses = [...new Set(applications.map(a => a.status))];

  const filtered = applications.filter(app => {
    const matchSearch = !search ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.institution.name.toLowerCase().includes(search.toLowerCase()) ||
      app.institution.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchCategory = categoryFilter === 'all' || app.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <div className="applications-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Applications</h1>
          <p className="page-subtitle">{applications.length} applications in current approval cycle</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => showToast('Generating Applications Summary Report (CSV/PDF)... Download will begin shortly.')}>
          <Download size={14} />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filter-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by ID, institution..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={14} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {APP_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: 0, overflow: 'hidden' }}
      >
        <div className="table-container" style={{ border: 'none' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Institution</th>
                <th>Category</th>
                <th>Status</th>
                <th>Documents</th>
                <th>Compliance</th>
                <th>Risk</th>
                <th>Assigned</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, i) => (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="app-row"
                  onClick={() => navigate(`/dashboard/applications/${app.id}`, { state: { application: app } })}
                >
                  <td>
                    <span className="app-id">{app.id}</span>
                  </td>
                  <td>
                    <div className="app-inst-name">{app.institution.name}</div>
                    <div className="app-inst-meta">{app.institution.code} • {app.institution.state}</div>
                  </td>
                  <td className="app-category">{app.category}</td>
                  <td>
                    <span className={`badge badge-${STATUS_COLORS[app.status]}`}>{app.status}</span>
                  </td>
                  <td>
                    <div className="app-docs-progress">
                      <div className="progress-bar" style={{ width: 80 }}>
                        <div className="progress-bar-fill" style={{ width: `${app.summary.documentCompletionPct}%` }} />
                      </div>
                      <span>{app.summary.verifiedDocuments}/{app.summary.totalDocuments}</span>
                    </div>
                  </td>
                  <td>
                    <div className="app-compliance-score">
                      <span className={app.summary.compliancePct >= 80 ? 'compliance-good' : app.summary.compliancePct >= 60 ? 'compliance-warn' : 'compliance-bad'}>
                        {app.summary.compliancePct}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${app.priority === 'High' ? 'danger' : app.priority === 'Medium' ? 'warning' : 'success'}`}>
                      {app.priority}
                    </span>
                  </td>
                  <td className="app-assigned">{app.assignedTo.split(' ').slice(-1)[0]}</td>
                  <td>
                    <ChevronRight size={16} className="app-chevron" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <FileText size={48} strokeWidth={1} />
          <h3>No applications match your filters</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
