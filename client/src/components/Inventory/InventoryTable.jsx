/**
 * InventoryTable.jsx
 * Aligned with 'HTML5 Design Patterns' (Semantic Tables)
 * and 'Learning React' (Banks & Porcello)
 */

import React, { useState } from 'react';
import { Search, Plus, Download, Eye, Pencil, Trash2, Filter } from 'lucide-react';
import StatusBadge from '../Common/StatusBadge';

export default function InventoryTable({
  items,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onViewItem,
  categoryFilter,
  setCategoryFilter,
  warehouseFilter,
  setWarehouseFilter,
  searchQuery,
  setSearchQuery,
  warehousesList,
}) {
  const categories = ['All', 'Cereals', 'Fats & Oils', 'Minerals', 'Supplementary', 'Pulses', 'Dairy'];

  // Format date helper: e.g. Sep 08, 2026
  const formatDate = (dateVal) => {
    if (!dateVal) return 'Sep 08, 2026';
    const d = new Date(dateVal);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  // Format quantity helper: e.g. 25,430 t or 1,240 L
  const formatQuantity = (qty, unit) => {
    return `${Number(qty).toLocaleString()} ${unit || 't'}`;
  };

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(items, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `Gotera_Food_Inventory_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section className="data-card" aria-label="Food Inventory Registry">
      {/* Table Toolbar with Search and Filters */}
      <div className="table-toolbar">
        <h2 className="table-title">All Items</h2>

        <div className="table-actions">
          {/* Table Search */}
          <div className="table-search-box">
            <Search className="table-search-icon" aria-hidden="true" />
            <input
              type="search"
              className="table-search-input"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter food inventory by name or category"
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={14} style={{ color: 'var(--color-text-secondary)' }} aria-hidden="true" />
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by Food Category"
            >
              <option value="All">Category: All</option>
              {categories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Warehouse Filter */}
          <select
            className="filter-select"
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            aria-label="Filter by Warehouse Location"
          >
            <option value="All">Warehouse: All</option>
            {warehousesList?.map(w => (
              <option key={w._id || w.name} value={w.name}>{w.name}</option>
            ))}
          </select>

          {/* Export Action */}
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleExport}
            title="Export inventory records as JSON/CSV"
          >
            <Download size={15} />
            <span>Export</span>
          </button>

          {/* Add Food Item Primary Action */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddItem}
          >
            <Plus size={16} />
            <span>Add Food Item</span>
          </button>
        </div>
      </div>

      {/* Semantic Accessible Data Table */}
      <div className="data-table-container">
        <table className="gotera-table">
          <caption className="sr-only" style={{ display: 'none' }}>
            National Reserve Food Inventory Items Listing
          </caption>
          <thead>
            <tr>
              <th scope="col">ITEM</th>
              <th scope="col">CATEGORY</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">WAREHOUSE</th>
              <th scope="col">STATUS</th>
              <th scope="col">LAST UPDATED</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
                  No inventory records match your search criteria.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="item-cell">
                      <span className="item-name">{item.name}</span>
                      <span className="item-sub">{item.subCategory || item.category}</span>
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td style={{ fontWeight: '600' }}>{formatQuantity(item.quantity, item.unit)}</td>
                  <td>{item.warehouse}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem' }}>
                    {formatDate(item.lastUpdated || item.updatedAt)}
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        type="button"
                        className="btn-icon view-btn"
                        onClick={() => onViewItem(item)}
                        aria-label={`View details for ${item.name}`}
                        title="View Details"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon edit-btn"
                        onClick={() => onEditItem(item)}
                        aria-label={`Edit ${item.name}`}
                        title="Edit Item"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon delete-btn"
                        onClick={() => onDeleteItem(item)}
                        aria-label={`Delete ${item.name}`}
                        title="Delete Item"
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
    </section>
  );
}
