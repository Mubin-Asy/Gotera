import { useState } from 'react';
import { Download, ShieldCheck, TrendingUp, Building2, ArrowUpRight, Layers } from 'lucide-react';

export default function ReportsAnalytics({
  inventoryItems = [],
  warehouses = [],
  collections = [],
  distributions = []
}) {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Total metrics
  const totalVolumeNum = inventoryItems.reduce((acc, curr) => acc + (curr.unit === 't' ? Number(curr.quantity || 0) : 0), 0) || 82393;
  const totalCapacityNum = warehouses.reduce((acc, curr) => acc + Number(curr.totalCapacity || 0), 0) || 166000;
  const utilizationPercent = Math.min(100, Math.round((totalVolumeNum / totalCapacityNum) * 100));

  // Commodity breakdown
  const commodityGroups = [
    { name: 'Durum Wheat & Bread Flour', volume: 25430, threshold: 30000, color: '#00875a', category: 'Cereals' },
    { name: 'White Milled Rice', volume: 18200, threshold: 22000, color: '#059669', category: 'Cereals' },
    { name: 'Yellow Maize & Corn Grain', volume: 12800, threshold: 16000, color: '#d97706', category: 'Cereals' },
    { name: 'White Magna Teff', volume: 8400, threshold: 10000, color: '#0d9488', category: 'Cereals' },
    { name: 'Emergency Pulses (Haricot & Chickpeas)', volume: 8600, threshold: 10000, color: '#2563eb', category: 'Pulses' },
    { name: 'Corn Soya Blend (CSB+) & Cooking Oil', volume: 4440, threshold: 6000, color: '#7c3aed', category: 'Supplementary' },
  ];

  const filteredCommodities = commodityGroups.filter(c => selectedCategory === 'All' || c.category === selectedCategory);

  const filteredWarehouses = warehouses.filter(w => selectedRegion === 'All' || w.region === selectedRegion);

  const handleExportCSV = () => {
    const reportDate = new Date().toISOString().split('T')[0];
    const headers = ['Report Category', 'Metric / Item', 'Regional Location / Depot', 'Value / Volume', 'Unit / Metric', 'Benchmark / Target', 'Status Assessment'];
    
    const rows = [
      ['Strategic National Buffer', 'Total Strategic Food Reserves', 'National (8 Depots)', totalVolumeNum, 'Tonnes (t)', '100,000 t Target', 'Adequate (72%)'],
      ['Strategic Coverage Duration', 'Emergency Ration Days', 'National Baseline', '142 Days', 'Days of Coverage', '90 Days Minimum', 'Secure'],
      ['Monthly Inflow Velocity', 'Shipment Quality Intake', 'National Ports & Farms', collections.length * 95, 'Tonnes (t)', '10,000 t / mo', 'Nominal'],
      ['Monthly Outflow Velocity', 'Humanitarian Dispatches', 'Relief Zones', distributions.reduce((a, c) => a + Number(c.quantity || 0), 0) || 590, 'Tonnes (t)', '8,000 t / mo', 'Managed'],
      ...warehouses.map(w => [
        'Regional Depot Utilization',
        w.name,
        w.region,
        w.currentStock,
        w.unit,
        w.totalCapacity,
        `${w.capacityUsedPercent}% Capacity (${w.status})`
      ]),
      ...inventoryItems.map(i => [
        'Reserve Inventory Item',
        i.name,
        i.warehouse,
        i.quantity,
        i.unit,
        i.category,
        i.status
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n')].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `Gotera_National_Food_Reserve_Report_${reportDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-analytics-root">
      {/* 1. Header Toolbar */}
      <div className="page-title-row" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="page-headline">National Reserve Balance & Analytics</h2>
          <p className="page-subheadline">
            Macro food balance sheets, strategic buffer depletion gauges, and regional logistical readiness
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select
            className="filter-select"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            aria-label="Filter Report by Region"
          >
            <option value="All">All Regions</option>
            <option value="Oromia Region">Oromia Region</option>
            <option value="Tigray Region">Tigray Region</option>
            <option value="Amhara Region">Amhara Region</option>
            <option value="Somali Region">Somali Region</option>
            <option value="Dire Dawa Admin">Dire Dawa Admin</option>
            <option value="Sidama Region">Sidama Region</option>
            <option value="Gambella Region">Gambella Region</option>
          </select>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleExportCSV}
            title="Download formatted national balance sheet"
          >
            <Download size={16} />
            <span>Download Balance Sheet (CSV)</span>
          </button>
        </div>
      </div>

      {/* 2. Top-Line KPI Cards */}
      <div className="stat-cards-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">TOTAL STRATEGIC GRAIN</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#e6f7ef', color: '#00875a' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="stat-card-value">{totalVolumeNum.toLocaleString()} t</div>
          <div className="stat-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#059669' }}>
            <ArrowUpRight size={14} />
            <span>+4.2% intake from domestic harvests</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">DAYS OF BUFFER COVERAGE</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="stat-card-value">142 Days</div>
          <div className="stat-card-meta">Exceeds national 90-day minimum emergency mandate</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">DEPOT UTILIZATION</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
              <Building2 size={18} />
            </div>
          </div>
          <div className="stat-card-value">{utilizationPercent}%</div>
          <div className="stat-card-meta">83,393 t / 166,000 t capacity across 8 hubs</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">MONTHLY RELIEF NET</span>
            <div className="stat-card-icon" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
              <Layers size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: '#00875a' }}>+4,350 t</div>
          <div className="stat-card-meta">14,200 t intake vs 9,850 t dispatches</div>
        </div>
      </div>

      {/* 3. Grid Row: Commodity Volumes & Humanitarian Allocation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Column 1: Commodity Reserves Breakdown */}
        <div className="data-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-main)', margin: 0 }}>
                Strategic Commodity Volume & Target Benchmarks
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Stock levels versus national famine prevention thresholds
              </span>
            </div>
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              aria-label="Filter commodity breakdown"
            >
              <option value="All">All Categories</option>
              <option value="Cereals">Cereals Only</option>
              <option value="Pulses">Pulses Only</option>
              <option value="Supplementary">Nutrition & Oils</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredCommodities.map(c => {
              const pct = Math.min(100, Math.round((c.volume / c.threshold) * 100));
              return (
                <div key={c.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.84rem' }}>
                    <span style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{c.name}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                      <strong>{c.volume.toLocaleString()} t</strong> / {c.threshold.toLocaleString()} t ({pct}%)
                    </span>
                  </div>
                  <div style={{ height: '8px', width: '100%', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        backgroundColor: c.color,
                        borderRadius: '9999px',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Humanitarian Allocation Outflow Share */}
        <div className="data-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>
            Humanitarian Distribution Share
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '1.5rem' }}>
            Allocation of emergency dispatches by humanitarian program
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: '#f8faf9', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#dc2626' }}></span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Drought & Famine Relief</span>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#dc2626' }}>42% (248 t)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: '#f8faf9', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#2563eb' }}></span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Child & Maternal Malnutrition</span>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#2563eb' }}>24% (142 t)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: '#f8faf9', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#059669' }}></span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>IDP & Refugee Operations</span>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#059669' }}>18% (106 t)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: '#f8faf9', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#d97706' }}></span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>School Feeding Buffers</span>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#d97706' }}>16% (94 t)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Regional Depot Readiness Matrix */}
      <div className="data-card">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-main)', margin: 0 }}>
              Regional Warehouse Readiness & Capacity Utilization Matrix
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
            Live status from 8 Ethiopian Strategic Depots
          </span>
        </div>

        <div className="data-table-container">
          <table className="gotera-table">
            <caption className="sr-only">Regional Depot Readiness and Stock Utilization Table</caption>
            <thead>
              <tr>
                <th scope="col">STRATEGIC DEPOT</th>
                <th scope="col">REGION</th>
                <th scope="col">CURRENT STOCK</th>
                <th scope="col">TOTAL CAPACITY</th>
                <th scope="col">UTILIZATION</th>
                <th scope="col">FACILITY MANAGER</th>
                <th scope="col">READINESS STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredWarehouses.map(w => {
                const percent = w.capacityUsedPercent || Math.min(100, Math.round((w.currentStock / w.totalCapacity) * 100));
                const barColor = percent >= 95 ? '#dc2626' : percent >= 80 ? '#d97706' : '#059669';
                return (
                  <tr key={w._id || w.name}>
                    <td>
                      <strong>{w.name}</strong>
                    </td>
                    <td>{w.region}</td>
                    <td>
                      <strong>{Number(w.currentStock).toLocaleString()}</strong> {w.unit || 't'}
                    </td>
                    <td>{Number(w.totalCapacity).toLocaleString()} {w.unit || 't'}</td>
                    <td style={{ minWidth: '160px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${percent}%`, backgroundColor: barColor, borderRadius: '9999px' }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', minWidth: '32px' }}>{percent}%</span>
                      </div>
                    </td>
                    <td>
                      <div>{w.manager}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{w.contact}</div>
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backgroundColor: w.status === 'Operational' ? '#e6f7ef' : '#fef3c7',
                        color: w.status === 'Operational' ? '#00875a' : '#d97706'
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: w.status === 'Operational' ? '#00875a' : '#d97706' }}></span>
                        {w.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
