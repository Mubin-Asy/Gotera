/**
 * App.jsx - Gotera Main Stateful Coordinator
 * Aligned with 'Learning React' by Alex Banks & Eve Porcello (Chapters 6 & 7: State Management & Hooks)
 * and 'HTML5 Design Patterns'
 */

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import StatCards from './components/Layout/StatCards';
import InventoryTable from './components/Inventory/InventoryTable';
import InventoryModal from './components/Inventory/InventoryModal';
import WarehouseGrid from './components/Warehouses/WarehouseGrid';
import WarehouseModal from './components/Warehouses/WarehouseModal';
import ReceivingTable from './components/Receiving/ReceivingTable';
import ReceivingForm from './components/Receiving/ReceivingForm';
import ReceivingModal from './components/Receiving/ReceivingModal';
import SignIn from './components/Auth/SignIn';
import CreateAccount from './components/Auth/CreateAccount';
import ConfirmDialog from './components/Common/ConfirmDialog';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('inventory');
  const [authView, setAuthView] = useState(null); // 'login' | 'register' | null
  const [currentUser, setCurrentUser] = useState({
    fullName: 'Meron Kassa',
    role: 'Warehouse Manager',
    email: 'meron.kassa@gotera.gov.et',
    avatar: 'MK',
  });

  // Data Store State
  const [inventoryItems, setInventoryItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [collections, setCollections] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filters State
  const [globalSearch, setGlobalSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [warehouseFilter, setWarehouseFilter] = useState('All');
  const [tableSearch, setTableSearch] = useState('');

  // Modals & Dialogs State
  const [inventoryModal, setInventoryModal] = useState({ isOpen: false, mode: 'add', item: null });
  const [warehouseModal, setWarehouseModal] = useState({ isOpen: false, mode: 'add', warehouse: null });
  const [receivingModal, setReceivingModal] = useState({ isOpen: false, mode: 'view', record: null });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  // 1. Data Fetching Effect (Learning React Ch. 7)
  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const [invRes, whRes, colRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/inventory`),
        fetch(`${API_BASE}/warehouses`),
        fetch(`${API_BASE}/collections`),
        fetch(`${API_BASE}/stats/overview`),
      ]);

      const [invData, whData, colData, statsData] = await Promise.all([
        invRes.json(),
        whRes.json(),
        colRes.json(),
        statsRes.json(),
      ]);

      if (invData.success) setInventoryItems(invData.data);
      if (whData.success) setWarehouses(whData.data);
      if (colData.success) setCollections(colData.data);
      if (statsData.success) setStats(statsData.data);
    } catch (err) {
      console.error('Error connecting to backend API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // 2. CRUD Operations - Inventory
  const handleSaveInventory = async (itemData) => {
    try {
      if (inventoryModal.mode === 'edit' && inventoryModal.item) {
        const id = inventoryModal.item._id;
        const res = await fetch(`${API_BASE}/inventory/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        });
        const result = await res.json();
        if (result.success) {
          setInventoryItems((prev) =>
            prev.map((i) => (String(i._id) === String(id) ? result.data : i))
          );
        }
      } else {
        const res = await fetch(`${API_BASE}/inventory`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        });
        const result = await res.json();
        if (result.success) {
          setInventoryItems((prev) => [result.data, ...prev]);
        }
      }
      setInventoryModal({ isOpen: false, mode: 'add', item: null });
      // Refresh stats
      fetch(`${API_BASE}/stats/overview`).then((r) => r.json()).then((d) => d.success && setStats(d.data));
    } catch (err) {
      console.error('Failed to save inventory item:', err);
    }
  };

  const handleDeleteInventory = (item) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Remove Food Item',
      message: `Are you sure you want to remove "${item.name}" (${item.warehouse}) from the national food reserve database?`,
      onConfirm: async () => {
        try {
          await fetch(`${API_BASE}/inventory/${item._id}`, { method: 'DELETE' });
          setInventoryItems((prev) => prev.filter((i) => String(i._id) !== String(item._id)));
          setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
          fetch(`${API_BASE}/stats/overview`).then((r) => r.json()).then((d) => d.success && setStats(d.data));
        } catch (err) {
          console.error('Delete item error:', err);
        }
      },
    });
  };

  // 3. CRUD Operations - Warehouses
  const handleSaveWarehouse = async (whData) => {
    try {
      if (warehouseModal.mode === 'edit' && warehouseModal.warehouse) {
        const id = warehouseModal.warehouse._id;
        const res = await fetch(`${API_BASE}/warehouses/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(whData),
        });
        const result = await res.json();
        if (result.success) {
          setWarehouses((prev) =>
            prev.map((w) => (String(w._id) === String(id) ? result.data : w))
          );
        }
      } else {
        const res = await fetch(`${API_BASE}/warehouses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(whData),
        });
        const result = await res.json();
        if (result.success) {
          setWarehouses((prev) => [...prev, result.data]);
        }
      }
      setWarehouseModal({ isOpen: false, mode: 'add', warehouse: null });
      fetch(`${API_BASE}/stats/overview`).then((r) => r.json()).then((d) => d.success && setStats(d.data));
    } catch (err) {
      console.error('Failed to save warehouse:', err);
    }
  };

  const handleDeleteWarehouse = (wh) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Decommission Warehouse',
      message: `Are you sure you want to decommission "${wh.name}"? Active stock allocations will require relocation.`,
      onConfirm: async () => {
        try {
          await fetch(`${API_BASE}/warehouses/${wh._id}`, { method: 'DELETE' });
          setWarehouses((prev) => prev.filter((w) => String(w._id) !== String(wh._id)));
          setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
          fetch(`${API_BASE}/stats/overview`).then((r) => r.json()).then((d) => d.success && setStats(d.data));
        } catch (err) {
          console.error('Delete warehouse error:', err);
        }
      },
    });
  };

  // 4. CRUD Operations - Receiving / Collections
  const handleLogCollection = async (collectionData) => {
    try {
      const res = await fetch(`${API_BASE}/collections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collectionData),
      });
      const result = await res.json();
      if (result.success) {
        setCollections((prev) => [result.data, ...prev]);
        fetch(`${API_BASE}/stats/overview`).then((r) => r.json()).then((d) => d.success && setStats(d.data));
      }
    } catch (err) {
      console.error('Failed to log collection record:', err);
    }
  };

  const handleUpdateCollection = async (recData) => {
    try {
      const id = receivingModal.record._id || receivingModal.record.recordId;
      const res = await fetch(`${API_BASE}/collections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recData),
      });
      const result = await res.json();
      if (result.success) {
        setCollections((prev) =>
          prev.map((c) => (String(c._id) === String(id) || c.recordId === id ? result.data : c))
        );
      }
      setReceivingModal({ isOpen: false, mode: 'view', record: null });
      fetch(`${API_BASE}/stats/overview`).then((r) => r.json()).then((d) => d.success && setStats(d.data));
    } catch (err) {
      console.error('Failed to update collection record:', err);
    }
  };

  const handleDeleteCollection = (rec) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Remove Collection Log',
      message: `Delete shipment record "${rec.recordId}" (${rec.item} from ${rec.source})?`,
      onConfirm: async () => {
        try {
          const id = rec._id || rec.recordId;
          await fetch(`${API_BASE}/collections/${id}`, { method: 'DELETE' });
          setCollections((prev) => prev.filter((c) => (c._id !== id && c.recordId !== id)));
          setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
          fetch(`${API_BASE}/stats/overview`).then((r) => r.json()).then((d) => d.success && setStats(d.data));
        } catch (err) {
          console.error('Delete collection error:', err);
        }
      },
    });
  };

  // 5. Auth Handlers
  const handleLogin = async ({ email, password }) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }
    setCurrentUser(data.user);
    setAuthView(null);
  };

  const handleRegister = async (formData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }
    setCurrentUser(data.user);
    setAuthView(null);
  };

  // Filtered Food Inventory Items
  const filteredInventory = inventoryItems.filter((item) => {
    const matchCat = categoryFilter === 'All' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchWh = warehouseFilter === 'All' || item.warehouse.toLowerCase() === warehouseFilter.toLowerCase();
    const query = (tableSearch || globalSearch).toLowerCase();
    const matchSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(query)) ||
      item.warehouse.toLowerCase().includes(query);
    return matchCat && matchWh && matchSearch;
  });

  // Render Auth screens if active
  if (authView === 'login') {
    return (
      <SignIn
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthView('register')}
        onBackToApp={() => setAuthView(null)}
      />
    );
  }

  if (authView === 'register') {
    return (
      <CreateAccount
        onRegister={handleRegister}
        onSwitchToLogin={() => setAuthView('login')}
        onBackToApp={() => setAuthView(null)}
      />
    );
  }

  // Render Main Dashboard Layout
  return (
    <div className="app-shell">
      {/* 1. Sidebar Navigation Landmark */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setAuthView('login')}
      />

      {/* 2. Main Content Landmark */}
      <main className="app-main">
        <Header
          activeTab={activeTab}
          currentUser={currentUser}
          onOpenAuth={() => setAuthView('login')}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
        />

        <div className="page-container">
          {/* Top 4 Stat Indicator Cards */}
          <StatCards activeTab={activeTab} stats={stats} />

          {/* View Tab 1: Food Inventory View */}
          {activeTab === 'inventory' && (
            <>
              <div className="page-title-row">
                <div>
                  <h2 className="page-headline">Food Inventory</h2>
                  <p className="page-subheadline">
                    1,482 line items across 128 warehouses nationwide
                  </p>
                </div>
              </div>

              <InventoryTable
                items={filteredInventory}
                onAddItem={() => setInventoryModal({ isOpen: true, mode: 'add', item: null })}
                onEditItem={(item) => setInventoryModal({ isOpen: true, mode: 'edit', item })}
                onViewItem={(item) => setInventoryModal({ isOpen: true, mode: 'view', item })}
                onDeleteItem={handleDeleteInventory}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                warehouseFilter={warehouseFilter}
                setWarehouseFilter={setWarehouseFilter}
                searchQuery={tableSearch}
                setSearchQuery={setTableSearch}
                warehousesList={warehouses}
              />
            </>
          )}

          {/* View Tab 2: Warehouses View */}
          {activeTab === 'warehouses' && (
            <WarehouseGrid
              warehouses={warehouses}
              onAddWarehouse={() => setWarehouseModal({ isOpen: true, mode: 'add', warehouse: null })}
              onEditWarehouse={(wh) => setWarehouseModal({ isOpen: true, mode: 'edit', warehouse: wh })}
              onViewWarehouse={(wh) => setWarehouseModal({ isOpen: true, mode: 'view', warehouse: wh })}
              onDeleteWarehouse={handleDeleteWarehouse}
            />
          )}

          {/* View Tab 3: Receiving / Food Collection View */}
          {activeTab === 'receiving' && (
            <>
              <div className="page-title-row">
                <div>
                  <h2 className="page-headline">Receiving & Food Collection</h2>
                  <p className="page-subheadline">
                    Incoming shipments awaiting or completing inspection
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => alert('Shipment logs exported to CSV.')}
                >
                  Export Log
                </button>
              </div>

              <div className="receiving-split-container">
                <ReceivingTable
                  records={collections}
                  onViewRecord={(rec) => setReceivingModal({ isOpen: true, mode: 'view', record: rec })}
                  onEditRecord={(rec) => setReceivingModal({ isOpen: true, mode: 'edit', record: rec })}
                  onDeleteRecord={handleDeleteCollection}
                />
                <ReceivingForm
                  warehousesList={warehouses}
                  onLogCollection={handleLogCollection}
                />
              </div>
            </>
          )}

          {/* Fallback for other navigation items */}
          {activeTab !== 'inventory' && activeTab !== 'warehouses' && activeTab !== 'receiving' && (
            <section className="data-card" style={{ padding: '3rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {activeTab.toUpperCase()} Module
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '540px', margin: '0 auto 1.5rem auto' }}>
                This operational module is linked to the Gotera core registry. You can explore the live CRUD operations in <strong>Food Inventory</strong>, <strong>Warehouses</strong>, and <strong>Receiving / Food Collection</strong>.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setActiveTab('inventory')}
              >
                Go to Food Inventory
              </button>
            </section>
          )}
        </div>
      </main>

      {/* Modal Dialogs */}
      <InventoryModal
        isOpen={inventoryModal.isOpen}
        mode={inventoryModal.mode}
        item={inventoryModal.item}
        warehousesList={warehouses}
        onClose={() => setInventoryModal({ isOpen: false, mode: 'add', item: null })}
        onSave={handleSaveInventory}
      />

      <WarehouseModal
        isOpen={warehouseModal.isOpen}
        mode={warehouseModal.mode}
        warehouse={warehouseModal.warehouse}
        onClose={() => setWarehouseModal({ isOpen: false, mode: 'add', warehouse: null })}
        onSave={handleSaveWarehouse}
      />

      <ReceivingModal
        isOpen={receivingModal.isOpen}
        mode={receivingModal.mode}
        record={receivingModal.record}
        warehousesList={warehouses}
        onClose={() => setReceivingModal({ isOpen: false, mode: 'view', record: null })}
        onSave={handleUpdateCollection}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null })}
      />
    </div>
  );
}
