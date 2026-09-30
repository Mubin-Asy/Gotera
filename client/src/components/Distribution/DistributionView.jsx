import { useState } from 'react';
import { Search, Plus, Download, Eye, CheckCircle, Trash2, Truck, Send, MapPin } from 'lucide-react';
import StatusBadge from '../Common/StatusBadge';

export default function DistributionView({
  distributions = [],
  warehousesList = [],
  onAddDistribution,
  onViewDistribution,
  onUpdateStatus,
  onDeleteDistribution,
  globalSearch = ''
}) {
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [warehouseFilter, setWarehouseFilter] = useState('All');

  const query = (localSearch || globalSearch).toLowerCase().trim();

  const filteredDistributions = distributions.filter(d => {
    const matchStatus = statusFilter === 'All' || d.status?.toLowerCase() === statusFilter.toLowerCase();
    const matchWh = warehouseFilter === 'All' || d.sourceWarehouse?.toLowerCase() === warehouseFilter.toLowerCase();
    const matchSearch = !query ||
      d.distributionId?.toLowerCase().includes(query) ||
      d.item?.toLowerCase().includes(query) ||
      d.destination?.toLowerCase().includes(query) ||
      d.sourceWarehouse?.toLowerCase().includes(query) ||
      d.carrier?.toLowerCase().includes(query);
    return matchStatus && matchWh && matchSearch;
  });

  // Calculate Metrics
  const totalTonnage = distributions.reduce((acc, curr) => acc + (curr.unit === 't' ? Number(curr.quantity || 0) : 0), 0);
  const inTransitCount = distributions.filter(d => d.status === 'In Transit').length;
  const deliveredCount = distributions.filter(d => d.status === 'Delivered').length;
  const corridorsCount = new Set(distributions.map(d => d.destination)).size;

  const handleExportCSV = () => {
    const headers = ['Dispatch ID', 'Commodity', 'Quantity', 'Unit', 'Source Depot', 'Destination Relief Zone', 'Dispatch Date', 'Carrier', 'Priority', 'Status', 'Notes'];
    const rows = filteredDistributions.map(d => [
      `"${d.distributionId || ''}"`,
      `"${d.item || ''}"`,
      d.quantity || 0,
      `"${d.unit || 't'}"`,
      `"${d.sourceWarehouse || ''}"`,
      `"${d.destination || ''}"`,
      `"${d.dispatchDate ? new Date(d.dispatchDate).toISOString().split('T')[0] : ''}"`,
      `"${d.carrier || ''}"`,
      `"${d.priority || 'High'}"`,
      `"${d.status || ''}"`,
      `"${(d.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `Gotera_Distribution_Manifest_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="distribution-view-root">
      {/* 1. Stat Indicator Cards */}
      <div className="stat-cards-grid" style={{ marginBottom: '1.75rem' }}>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">TOTAL RELIEF DISPATCHED</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#e6f7ef', color: '#00875a' }}>
              <Send size={18} />
            </div>
          </div>
          <div className="stat-card-value">{totalTonnage.toLocaleString()} t</div>
          <div className="stat-card-meta">Emergency grain buffer releases</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">CONVOYS IN TRANSIT</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
              <Truck size={18} />
            </div>
          </div>
          <div className="stat-card-value">{inTransitCount}</div>
          <div className="stat-card-meta">Active regional logistics corridors</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">DELIVERIES CONFIRMED</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
              <CheckCircle size={18} />
            </div>
          </div>
          <div className="stat-card-value">{deliveredCount}</div>
          <div className="stat-card-meta">Arrived at target feeding points</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">RELIEF DESTINATIONS</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#faf5ff', color: '#7e22ce' }}>
              <MapPin size={18} />
            </div>
          </div>
          <div className="stat-card-value">{corridorsCount}</div>
          <div className="stat-card-meta">Vulnerable zones & feeding hubs</div>
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
                placeholder="Search dispatch ID, commodity, destination..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                aria-label="Search distributions"
              />
            </div>
          </div>

          <div className="toolbar-right">
            {/* Status Filter */}
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by Status"
            >
              <option value="All">Status: All</option>
              <option value="Dispatched">Dispatched</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>

            {/* Warehouse Filter */}
            <select
              className="filter-select"
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              aria-label="Filter by Source Warehouse"
            >
              <option value="All">Depot: All</option>
              {warehousesList.map(w => (
                <option key={w._id || w.name} value={w.name}>{w.name}</option>
              ))}
            </select>

            {/* Export CSV */}
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleExportCSV}
              title="Download dispatch manifest as CSV"
            >
              <Download size={15} />
              <span>Manifest</span>
            </button>

            {/* New Dispatch */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={onAddDistribution}
            >
              <Plus size={16} />
              <span>Dispatch Supplies</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="data-table-container">
          <table className="gotera-table">
            <caption className="sr-only">Food Relief Distribution and Dispatch Records</caption>
            <thead>
              <tr>
                <th scope="col">DISPATCH ID</th>
                <th scope="col">COMMODITY</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">SOURCE DEPOT</th>
                <th scope="col">DESTINATION / BENEFICIARY</th>
                <th scope="col">DATE</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredDistributions.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
                    No distribution dispatches found matching your search filters.
                  </td>
                </tr>
              ) : (
                filteredDistributions.map(d => (
                  <tr key={d._id || d.distributionId}>
                    <td>
                      <div style={{ fontWeight: '700', color: 'var(--color-text-main)', fontSize: '0.85rem' }}>
                        {d.distributionId}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                        {d.carrier || 'National Freight'}
                      </div>
                    </td>
                    <td>
                      <div className="item-cell">
                        <span className="item-name">{d.item}</span>
                        <span className="item-notes">{d.priority} Priority</span>
                      </div>
                    </td>
                    <td>
                      <strong>{Number(d.quantity).toLocaleString()}</strong> {d.unit || 't'}
                    </td>
                    <td>{d.sourceWarehouse}</td>
                    <td>
                      <div style={{ fontWeight: '600' }}>{d.destination}</div>
                    </td>
                    <td>
                      {d.dispatchDate ? new Date(d.dispatchDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      <StatusBadge status={d.status} />
                    </td>
                    <td>
                      <div className="action-buttons-group">
                        {d.status !== 'Delivered' && (
                          <button
                            type="button"
                            className="btn-icon"
                            title="Mark as Delivered"
                            style={{ color: '#059669' }}
                            onClick={() => onUpdateStatus(d, 'Delivered')}
                            aria-label={`Mark dispatch ${d.distributionId} as delivered`}
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-icon"
                          title="View Dispatch Details"
                          onClick={() => onViewDistribution(d)}
                          aria-label={`View details of ${d.distributionId}`}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon"
                          title="Delete Record"
                          style={{ color: '#e11d48' }}
                          onClick={() => onDeleteDistribution(d)}
                          aria-label={`Delete record ${d.distributionId}`}
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
