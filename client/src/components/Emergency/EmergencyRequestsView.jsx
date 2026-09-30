import { useState } from 'react';
import { Search, Plus, Download, Eye, Check, CheckCheck, XCircle, Trash2, AlertTriangle, Users, Database, Clock } from 'lucide-react';
import StatusBadge from '../Common/StatusBadge';

export default function EmergencyRequestsView({
  requests = [],
  onAddRequest,
  onViewRequest,
  onUpdateStatus,
  onDeleteRequest,
  globalSearch = ''
}) {
  const [localSearch, setLocalSearch] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const query = (localSearch || globalSearch).toLowerCase().trim();

  const filteredRequests = requests.filter(r => {
    const matchUrgency = urgencyFilter === 'All' || r.urgency?.toLowerCase() === urgencyFilter.toLowerCase();
    const matchStatus = statusFilter === 'All' || r.status?.toLowerCase() === statusFilter.toLowerCase();
    const matchSearch = !query ||
      r.requestId?.toLowerCase().includes(query) ||
      r.authority?.toLowerCase().includes(query) ||
      r.region?.toLowerCase().includes(query) ||
      r.item?.toLowerCase().includes(query) ||
      r.assignedWarehouse?.toLowerCase().includes(query);
    return matchUrgency && matchStatus && matchSearch;
  });

  // Calculate Metrics
  const criticalCount = requests.filter(r => r.urgency === 'Critical').length;
  const totalBeneficiaries = requests.reduce((acc, curr) => acc + Number(curr.affectedPopulation || 0), 0);
  const totalTonnageRequested = requests.reduce((acc, curr) => acc + Number(curr.quantity || 0), 0);
  const pendingCount = requests.filter(r => r.status === 'Pending Review').length;

  const handleExportCSV = () => {
    const headers = ['Request ID', 'Requesting Authority', 'Region', 'Affected Population', 'Commodity', 'Quantity', 'Unit', 'Urgency', 'Status', 'Assigned Depot', 'Request Date', 'Details'];
    const rows = filteredRequests.map(r => [
      `"${r.requestId || ''}"`,
      `"${r.authority || ''}"`,
      `"${r.region || ''}"`,
      r.affectedPopulation || 0,
      `"${r.item || ''}"`,
      r.quantity || 0,
      `"${r.unit || 't'}"`,
      `"${r.urgency || 'High'}"`,
      `"${r.status || 'Pending Review'}"`,
      `"${r.assignedWarehouse || 'Pending Allocation'}"`,
      `"${r.requestDate ? new Date(r.requestDate).toISOString().split('T')[0] : ''}"`,
      `"${(r.details || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(row => row.join(',')).join('\n')].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `Gotera_Emergency_Requisitions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getUrgencyBadge = (urgency) => {
    if (urgency === 'Critical') {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.25rem 0.65rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '700',
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
          border: '1px solid #fca5a5'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#dc2626' }}></span>
          Critical
        </span>
      );
    }
    if (urgency === 'High') {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.25rem 0.65rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '700',
          backgroundColor: '#ffedd5',
          color: '#c2410c',
          border: '1px solid #fed7aa'
        }}>
          High
        </span>
      );
    }
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.25rem 0.65rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '700',
        backgroundColor: '#f1f5f9',
        color: '#475569',
        border: '1px solid #cbd5e1'
      }}>
        Moderate
      </span>
    );
  };

  return (
    <div className="emergency-view-root">
      {/* 1. Stat Indicator Cards */}
      <div className="stat-cards-grid" style={{ marginBottom: '1.75rem' }}>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">CRITICAL EMERGENCIES</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: '#dc2626' }}>{criticalCount}</div>
          <div className="stat-card-meta">Immediate relief intervention required</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">AFFECTED POPULATION</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
              <Users size={18} />
            </div>
          </div>
          <div className="stat-card-value">{totalBeneficiaries.toLocaleString()}</div>
          <div className="stat-card-meta">Citizens facing acute consumption gaps</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">REQUISITIONED BUFFER</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#e6f7ef', color: '#00875a' }}>
              <Database size={18} />
            </div>
          </div>
          <div className="stat-card-value">{totalTonnageRequested.toLocaleString()} t</div>
          <div className="stat-card-meta">Total grain buffer requested</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">PENDING REVIEW</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className="stat-card-value">{pendingCount}</div>
          <div className="stat-card-meta">Awaiting Disaster Risk Council decree</div>
        </div>
      </div>

      {/* 2. Main Data Card */}
      <div className="data-card">
        {/* Toolbar */}
        <div className="table-toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrapper">
              <Search className="search-icon" aria-hidden="true" />
              <input
                type="search"
                className="search-input"
                placeholder="Search requisition, authority, region, crop..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                aria-label="Search emergency requests"
              />
            </div>
          </div>

          <div className="toolbar-right">
            {/* Urgency Filter */}
            <select
              className="filter-select"
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              aria-label="Filter by Urgency Tier"
            >
              <option value="All">Urgency: All</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
            </select>

            {/* Status Filter */}
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by Review Status"
            >
              <option value="All">Status: All</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Approved">Approved</option>
              <option value="Allocated">Allocated</option>
              <option value="Declined">Declined</option>
            </select>

            {/* Export CSV */}
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleExportCSV}
              title="Download emergency requests roster"
            >
              <Download size={15} />
              <span>Export Roster</span>
            </button>

            {/* Submit Request */}
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: '#dc2626', borderColor: '#b91c1c' }}
              onClick={onAddRequest}
            >
              <Plus size={16} />
              <span>Submit Requisition</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="data-table-container">
          <table className="gotera-table">
            <caption className="sr-only">Emergency Food Allocation Requisitions Listing</caption>
            <thead>
              <tr>
                <th scope="col">REQUISITION ID</th>
                <th scope="col">AUTHORITY & REGION</th>
                <th scope="col">COMMODITY & TONNAGE</th>
                <th scope="col">AFFECTED POPULATION</th>
                <th scope="col">URGENCY</th>
                <th scope="col">STATUS</th>
                <th scope="col">ASSIGNED DEPOT</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
                    No emergency requests found matching current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRequests.map(r => (
                  <tr key={r._id || r.requestId}>
                    <td>
                      <div style={{ fontWeight: '700', color: 'var(--color-text-main)', fontSize: '0.85rem' }}>
                        {r.requestId}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                        {r.requestDate ? new Date(r.requestDate).toLocaleDateString() : 'Recent'}
                      </div>
                    </td>
                    <td>
                      <div className="item-cell">
                        <span className="item-name">{r.authority}</span>
                        <span className="item-notes">{r.region}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '600' }}>{r.item}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-brand-forest)' }}>
                        <strong>{Number(r.quantity).toLocaleString()}</strong> {r.unit || 't'}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '600' }}>
                        <Users size={14} color="#64748b" />
                        <span>{Number(r.affectedPopulation).toLocaleString()}</span>
                      </div>
                    </td>
                    <td>
                      {getUrgencyBadge(r.urgency)}
                    </td>
                    <td>
                      <StatusBadge status={r.status} />
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        {r.assignedWarehouse || 'Pending Allocation'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-group">
                        {r.status === 'Pending Review' && (
                          <button
                            type="button"
                            className="btn-icon"
                            title="Approve Requisition"
                            style={{ color: '#059669' }}
                            onClick={() => onUpdateStatus(r, 'Approved')}
                            aria-label={`Approve ${r.requestId}`}
                          >
                            <Check size={15} />
                          </button>
                        )}
                        {r.status === 'Approved' && (
                          <button
                            type="button"
                            className="btn-icon"
                            title="Allocate Stock from Depot"
                            style={{ color: '#2563eb' }}
                            onClick={() => onUpdateStatus(r, 'Allocated')}
                            aria-label={`Allocate stock for ${r.requestId}`}
                          >
                            <CheckCheck size={15} />
                          </button>
                        )}
                        {r.status !== 'Declined' && (
                          <button
                            type="button"
                            className="btn-icon"
                            title="Decline Request"
                            style={{ color: '#94a3b8' }}
                            onClick={() => onUpdateStatus(r, 'Declined')}
                            aria-label={`Decline ${r.requestId}`}
                          >
                            <XCircle size={15} />
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-icon"
                          title="View Requisition Details"
                          onClick={() => onViewRequest(r)}
                          aria-label={`View details of ${r.requestId}`}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon"
                          title="Delete Request"
                          style={{ color: '#e11d48' }}
                          onClick={() => onDeleteRequest(r)}
                          aria-label={`Delete ${r.requestId}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
