import { useState, useEffect } from 'react';
import LandingPage from './components/Home/LandingPage';
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
import DistributionView from './components/Distribution/DistributionView';
import DistributionModal from './components/Distribution/DistributionModal';
import EmergencyRequestsView from './components/Emergency/EmergencyRequestsView';
import EmergencyModal from './components/Emergency/EmergencyModal';
import ReportsAnalytics from './components/Reports/ReportsAnalytics';
import SignIn from './components/Auth/SignIn';
import CreateAccount from './components/Auth/CreateAccount';
import ConfirmDialog from './components/Common/ConfirmDialog';

// Robust API caller with proxy support and port 5000 fallback
const API_PRIMARY = '/api';
const API_FALLBACK = 'http://localhost:5000/api';

async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_PRIMARY}${endpoint}`, options);
    return await res.json();
  } catch {
    // Primary failed (e.g. network/proxy error), fallback to direct port 5000
    const fallbackRes = await fetch(`${API_FALLBACK}${endpoint}`, options);
    return await fallbackRes.json();
  }
}

// Fallback seed crops so presentation fields are NEVER empty under any circumstance
const initialInventoryFallback = [
  {
    _id: 'inv_1',
    name: 'Durum Wheat Grain',
    category: 'Cereals',
    subCategory: 'Cereals',
    quantity: 25430,
    unit: 't',
    warehouse: 'Adama Central Warehouse',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T10:00:00Z'),
    expiryDate: new Date('2027-09-01T00:00:00Z'),
    notes: 'Grade A Ethiopian hard wheat, moisture 12%, stored in bulk silo 4'
  },
  {
    _id: 'inv_2',
    name: 'White Milled Rice',
    category: 'Cereals',
    subCategory: 'Cereals',
    quantity: 18200,
    unit: 't',
    warehouse: 'Mekelle Warehouse',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T11:15:00Z'),
    expiryDate: new Date('2027-06-15T00:00:00Z'),
    notes: 'Long grain milled rice, hermetic pallet packaging'
  },
  {
    _id: 'inv_3',
    name: 'Yellow Maize Grain',
    category: 'Cereals',
    subCategory: 'Cereals',
    quantity: 12800,
    unit: 't',
    warehouse: 'Bahir Dar Depot',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T09:30:00Z'),
    expiryDate: new Date('2027-04-10T00:00:00Z'),
    notes: 'Yellow corn grain for national emergency reserve relief'
  },
  {
    _id: 'inv_4',
    name: 'White Teff Grain',
    category: 'Cereals',
    subCategory: 'Cereals',
    quantity: 8400,
    unit: 't',
    warehouse: 'Adama Central Warehouse',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T12:00:00Z'),
    expiryDate: new Date('2027-11-20T00:00:00Z'),
    notes: 'Magna white teff strategic grain reserve'
  },
  {
    _id: 'inv_5',
    name: 'Red Haricot Beans',
    category: 'Pulses',
    subCategory: 'Pulses',
    quantity: 6450,
    unit: 't',
    warehouse: 'Adama Central Warehouse',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T13:10:00Z'),
    expiryDate: new Date('2027-08-15T00:00:00Z'),
    notes: 'High protein emergency pulse reserves, fumigated batch'
  },
  {
    _id: 'inv_6',
    name: 'Sorghum Grain',
    category: 'Cereals',
    subCategory: 'Cereals',
    quantity: 5100,
    unit: 't',
    warehouse: 'Dire Dawa Depot',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T08:15:00Z'),
    expiryDate: new Date('2027-10-01T00:00:00Z'),
    notes: 'Drought-tolerant emergency cereal reserve for arid zones'
  },
  {
    _id: 'inv_7',
    name: 'Food Grade Barley',
    category: 'Cereals',
    subCategory: 'Cereals',
    quantity: 3900,
    unit: 't',
    warehouse: 'Bahir Dar Depot',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T14:00:00Z'),
    expiryDate: new Date('2027-05-15T00:00:00Z'),
    notes: 'Cleaned Ethiopian highlands reserve barley'
  },
  {
    _id: 'inv_8',
    name: 'Chickpeas / Split Peas',
    category: 'Pulses',
    subCategory: 'Pulses',
    quantity: 2150,
    unit: 't',
    warehouse: 'Kombolcha Strategic Silo',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T15:20:00Z'),
    expiryDate: new Date('2027-07-30T00:00:00Z'),
    notes: 'Essential protein supply for famine relief operations'
  },
  {
    _id: 'inv_9',
    name: 'Refined Cooking Oil',
    category: 'Fats & Oils',
    subCategory: 'Fats & Oils',
    quantity: 1240,
    unit: 'L',
    warehouse: 'Gambella Warehouse',
    status: 'Low Stock',
    lastUpdated: new Date('2026-09-08T14:20:00Z'),
    expiryDate: new Date('2026-12-30T00:00:00Z'),
    notes: 'Refined sunflower oil in 20L food-grade jerrycans'
  },
  {
    _id: 'inv_10',
    name: 'Fine Iodized Salt',
    category: 'Minerals',
    subCategory: 'Minerals',
    quantity: 3200,
    unit: 'kg',
    warehouse: 'Dire Dawa Depot',
    status: 'Low Stock',
    lastUpdated: new Date('2026-09-08T08:45:00Z'),
    expiryDate: new Date('2028-01-01T00:00:00Z'),
    notes: 'Fine iodized food grade table salt in moisture-sealed sacks'
  },
  {
    _id: 'inv_11',
    name: 'Fortified Corn Soya Blend (CSB+)',
    category: 'Supplementary',
    subCategory: 'Supplementary',
    quantity: 820,
    unit: 'kg',
    warehouse: 'Hawassa Hub',
    status: 'Critical',
    lastUpdated: new Date('2026-09-08T16:00:00Z'),
    expiryDate: new Date('2026-11-20T00:00:00Z'),
    notes: 'Corn Soya Blend plus enriched with micronutrients for vulnerable groups'
  },
  {
    _id: 'inv_12',
    name: 'Instant Powdered Milk',
    category: 'Dairy',
    subCategory: 'Dairy',
    quantity: 410,
    unit: 'kg',
    warehouse: 'Mekelle Warehouse',
    status: 'Expiring Soon',
    lastUpdated: new Date('2026-09-08T15:40:00Z'),
    expiryDate: new Date('2026-09-28T00:00:00Z'),
    notes: 'Whole milk powder in hermetic 25kg multi-wall bags'
  }
];

const initialWarehousesFallback = [
  {
    _id: 'wh_1',
    name: 'Adama Central Warehouse',
    region: 'Oromia Region',
    totalCapacity: 40000,
    currentStock: 33830,
    unit: 't',
    manager: 'Tesfaye Alemu',
    contact: '+251 91 123 4567',
    status: 'Operational',
    capacityUsedPercent: 85
  },
  {
    _id: 'wh_2',
    name: 'Mekelle Warehouse',
    region: 'Tigray Region',
    totalCapacity: 30000,
    currentStock: 18610,
    unit: 't',
    manager: 'Selam Gebre',
    contact: '+251 92 234 5678',
    status: 'Operational',
    capacityUsedPercent: 62
  },
  {
    _id: 'wh_3',
    name: 'Bahir Dar Depot',
    region: 'Amhara Region',
    totalCapacity: 28000,
    currentStock: 16700,
    unit: 't',
    manager: 'Yared Bekele',
    contact: '+251 93 345 6789',
    status: 'Operational',
    capacityUsedPercent: 60
  },
  {
    _id: 'wh_4',
    name: 'Gambella Warehouse',
    region: 'Gambella Region',
    totalCapacity: 8000,
    currentStock: 6400,
    unit: 't',
    manager: 'Nyawan Ojulu',
    contact: '+251 94 456 7890',
    status: 'Near Capacity',
    capacityUsedPercent: 80
  },
  {
    _id: 'wh_5',
    name: 'Dire Dawa Depot',
    region: 'Dire Dawa',
    totalCapacity: 22000,
    currentStock: 9800,
    unit: 't',
    manager: 'Ahmed Nur',
    contact: '+251 95 567 8901',
    status: 'Operational',
    capacityUsedPercent: 45
  },
  {
    _id: 'wh_6',
    name: 'Hawassa Hub',
    region: 'Sidama Region',
    totalCapacity: 6000,
    currentStock: 4920,
    unit: 't',
    manager: 'Fikirte Solomon',
    contact: '+251 96 678 9012',
    status: 'Near Capacity',
    capacityUsedPercent: 82
  },
  {
    _id: 'wh_7',
    name: 'Kombolcha Strategic Silo',
    region: 'Amhara Region',
    totalCapacity: 25000,
    currentStock: 14200,
    unit: 't',
    manager: 'Kassahun Tadesse',
    contact: '+251 91 789 0123',
    status: 'Operational',
    capacityUsedPercent: 57
  },
  {
    _id: 'wh_8',
    name: 'Jigjiga Regional Store',
    region: 'Somali Region',
    totalCapacity: 15000,
    currentStock: 7800,
    unit: 't',
    manager: 'Abdi Mohammed',
    contact: '+251 92 890 1234',
    status: 'Operational',
    capacityUsedPercent: 52
  }
];

const initialCollectionsFallback = [
  {
    _id: 'col_1',
    recordId: 'GC-2026-1187',
    item: 'Durum Wheat Grain',
    quantity: 420,
    unit: 't',
    source: 'World Food Programme (WFP)',
    destinationWarehouse: 'Adama Central Warehouse',
    collectionDate: new Date('2026-09-09T08:30:00Z'),
    status: 'Inspected',
    notes: 'Batch inspected and cleared by National Food & Drug Authority'
  },
  {
    _id: 'col_2',
    recordId: 'GC-2026-1186',
    item: 'White Milled Rice',
    quantity: 260,
    unit: 't',
    source: 'Ministry of Agriculture',
    destinationWarehouse: 'Mekelle Warehouse',
    collectionDate: new Date('2026-09-08T11:00:00Z'),
    status: 'Received',
    notes: 'Transferred from national seasonal buffer reserve'
  },
  {
    _id: 'col_3',
    recordId: 'GC-2026-1185',
    item: 'Refined Cooking Oil',
    quantity: 8000,
    unit: 'L',
    source: 'USAID Food For Peace',
    destinationWarehouse: 'Gambella Warehouse',
    collectionDate: new Date('2026-09-07T14:45:00Z'),
    status: 'Pending Inspection',
    notes: 'Awaiting quality test certificates for batch acidity & packaging seals'
  },
  {
    _id: 'col_4',
    recordId: 'GC-2026-1184',
    item: 'Yellow Maize Grain',
    quantity: 310,
    unit: 't',
    source: 'Local Farmers Cooperative Union',
    destinationWarehouse: 'Bahir Dar Depot',
    collectionDate: new Date('2026-09-06T09:15:00Z'),
    status: 'Inspected',
    notes: 'Cleaned, bagged and verified for silo intake'
  },
  {
    _id: 'col_5',
    recordId: 'GC-2026-1183',
    item: 'Fortified Corn Soya Blend (CSB+)',
    quantity: 40,
    unit: 't',
    source: 'UNICEF Emergency Nutrition',
    destinationWarehouse: 'Hawassa Hub',
    collectionDate: new Date('2026-09-05T16:20:00Z'),
    status: 'Received',
    notes: 'Emergency supplementary rations for maternal and child nutrition programs'
  },
  {
    _id: 'col_6',
    recordId: 'GC-2026-1182',
    item: 'White Teff Grain',
    quantity: 180,
    unit: 't',
    source: 'Ethiopian Grain Trade Enterprise',
    destinationWarehouse: 'Adama Central Warehouse',
    collectionDate: new Date('2026-09-04T10:00:00Z'),
    status: 'Inspected',
    notes: 'Certified export/reserve quality teff batch'
  },
  {
    _id: 'col_7',
    recordId: 'GC-2026-1181',
    item: 'Red Haricot Beans',
    quantity: 95,
    unit: 't',
    source: 'Disaster Risk Management Commission',
    destinationWarehouse: 'Dire Dawa Depot',
    collectionDate: new Date('2026-09-03T13:30:00Z'),
    status: 'Received',
    notes: 'Strategic pulses for eastern lowland distribution centers'
  }
];

const initialDistributionsFallback = [
  {
    _id: 'dst_1',
    distributionId: 'DST-2026-041',
    item: 'Durum Wheat Grain',
    quantity: 150,
    unit: 't',
    sourceWarehouse: 'Adama Central Warehouse',
    destination: 'East Hararghe Drought Relief Zone',
    carrier: 'Ethiopian Freight Logistics',
    dispatchDate: new Date('2026-09-08T09:00:00Z'),
    status: 'In Transit',
    priority: 'High',
    notes: 'Emergency wheat allocation for drought response'
  },
  {
    _id: 'dst_2',
    distributionId: 'DST-2026-042',
    item: 'Yellow Maize Grain',
    quantity: 200,
    unit: 't',
    sourceWarehouse: 'Bahir Dar Depot',
    destination: 'Wag Hemra Humanitarian Relief Council',
    carrier: 'Amhara Relief Transport Fleet',
    dispatchDate: new Date('2026-09-07T11:30:00Z'),
    status: 'Delivered',
    priority: 'High',
    notes: 'Food security buffer release for food insecure woredas'
  },
  {
    _id: 'dst_3',
    distributionId: 'DST-2026-043',
    item: 'White Milled Rice',
    quantity: 85,
    unit: 't',
    sourceWarehouse: 'Mekelle Warehouse',
    destination: 'Shire IDP Resettlement Center',
    carrier: 'Red Cross Logistics Team',
    dispatchDate: new Date('2026-09-06T14:15:00Z'),
    status: 'In Transit',
    priority: 'Critical',
    notes: 'Urgent nutritional rations for displaced families'
  },
  {
    _id: 'dst_4',
    distributionId: 'DST-2026-044',
    item: 'Refined Cooking Oil',
    quantity: 25,
    unit: 't',
    sourceWarehouse: 'Gambella Warehouse',
    destination: 'Itang Refugee Nutrition Hub',
    carrier: 'UNHCR Transport Fleet',
    dispatchDate: new Date('2026-09-05T08:45:00Z'),
    status: 'Delivered',
    priority: 'Moderate',
    notes: 'Monthly edible oil ration release'
  },
  {
    _id: 'dst_5',
    distributionId: 'DST-2026-045',
    item: 'Red Haricot Beans',
    quantity: 90,
    unit: 't',
    sourceWarehouse: 'Adama Central Warehouse',
    destination: 'Somali Region Lowland Distribution Center',
    carrier: 'Disaster Risk Management Commission',
    dispatchDate: new Date('2026-09-04T10:00:00Z'),
    status: 'Dispatched',
    priority: 'High',
    notes: 'Protein food rations for pastoral zones'
  },
  {
    _id: 'dst_6',
    distributionId: 'DST-2026-046',
    item: 'Fortified Corn Soya Blend (CSB+)',
    quantity: 40,
    unit: 't',
    sourceWarehouse: 'Hawassa Hub',
    destination: 'Sidama Infant Malnutrition Clinic',
    carrier: 'UNICEF Logistics Service',
    dispatchDate: new Date('2026-09-03T16:20:00Z'),
    status: 'Delivered',
    priority: 'Critical',
    notes: 'Maternal and child targeted supplementary feeding'
  }
];

const initialEmergencyFallback = [
  {
    _id: 'emr_1',
    requestId: 'EMR-2026-801',
    authority: 'Somali Region Disaster Bureau',
    region: 'Somali Region',
    affectedPopulation: 75000,
    item: 'Yellow Maize Grain',
    quantity: 450,
    unit: 't',
    urgency: 'Critical',
    status: 'Pending Review',
    requestDate: new Date('2026-09-08T08:30:00Z'),
    assignedWarehouse: 'Dire Dawa Depot',
    details: 'Severe lowland seasonal rainfall deficit affecting agro-pastoral communities in Gode zone.'
  },
  {
    _id: 'emr_2',
    requestId: 'EMR-2026-802',
    authority: 'Afar Drought Relief Taskforce',
    region: 'Afar Region',
    affectedPopulation: 42000,
    item: 'Durum Wheat Grain',
    quantity: 300,
    unit: 't',
    urgency: 'Critical',
    status: 'Approved',
    requestDate: new Date('2026-09-07T10:15:00Z'),
    assignedWarehouse: 'Kombolcha Strategic Silo',
    details: 'Urgent grain requisition for drought-affected pastoralists in Zone 2.'
  },
  {
    _id: 'emr_3',
    requestId: 'EMR-2026-803',
    authority: 'Tigray Humanitarian Commission',
    region: 'Tigray Region',
    affectedPopulation: 60000,
    item: 'White Milled Rice',
    quantity: 380,
    unit: 't',
    urgency: 'High',
    status: 'Allocated',
    requestDate: new Date('2026-09-05T12:00:00Z'),
    assignedWarehouse: 'Mekelle Warehouse',
    details: 'Monthly ration allocation for returnee resettlement centers.'
  },
  {
    _id: 'emr_4',
    requestId: 'EMR-2026-804',
    authority: 'Borena Lowland Emergency Council',
    region: 'Oromia Region',
    affectedPopulation: 35000,
    item: 'Red Haricot Beans',
    quantity: 120,
    unit: 't',
    urgency: 'High',
    status: 'Approved',
    requestDate: new Date('2026-09-04T15:20:00Z'),
    assignedWarehouse: 'Adama Central Warehouse',
    details: 'High protein pulse allocation to supplement cereal distribution.'
  },
  {
    _id: 'emr_5',
    requestId: 'EMR-2026-805',
    authority: 'Wolayita Zonal Nutrition Directorate',
    region: 'South Ethiopia',
    affectedPopulation: 18000,
    item: 'Fortified Corn Soya Blend (CSB+)',
    quantity: 50,
    unit: 't',
    urgency: 'Moderate',
    status: 'Allocated',
    requestDate: new Date('2026-09-02T11:00:00Z'),
    assignedWarehouse: 'Hawassa Hub',
    details: 'Targeted supplementary feeding program for expectant mothers and infants.'
  }
];

export default function App() {
  // Authentication & View State: Always start on the Home page
  const [currentUser, setCurrentUser] = useState(null);

  // Current view: 'home' | 'signin' | 'register' | 'dashboard'
  // Guaranteed to always start from the Home page
  const [currentView, setCurrentView] = useState('home');


  const [activeTab, setActiveTab] = useState('inventory');

  // Data Store State with safe defaults so UI is NEVER empty
  const [inventoryItems, setInventoryItems] = useState(initialInventoryFallback);
  const [warehouses, setWarehouses] = useState(initialWarehousesFallback);
  const [collections, setCollections] = useState(initialCollectionsFallback);
  const [distributions, setDistributions] = useState(initialDistributionsFallback);
  const [emergencyRequests, setEmergencyRequests] = useState(initialEmergencyFallback);
  const [stats, setStats] = useState({
    inventory: {
      totalLineItems: '1,484',
      totalVolume: '82,393 t',
      lowStock: 36,
      expiringSoon: 9,
      critical: 1,
    },
    warehouses: {
      total: 130,
      operational: 114,
      nearCapacity: 13,
      maintenance: 3,
    },
    receiving: {
      inspectedThisMonth: 643,
      pendingInspection: 40,
      awaitingArrival: 12,
      rejectedDamaged: 3,
    },
    reservesByCrop: {
      wheat: 25430,
      rice: 18200,
      maize: 12800,
      other: 3240,
    }
  });
  // Search & Filters State
  const [globalSearch, setGlobalSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [warehouseFilter, setWarehouseFilter] = useState('All');
  const [tableSearch, setTableSearch] = useState('');

  // Modals & Dialogs State
  const [inventoryModal, setInventoryModal] = useState({ isOpen: false, mode: 'add', item: null });
  const [warehouseModal, setWarehouseModal] = useState({ isOpen: false, mode: 'add', warehouse: null });
  const [receivingModal, setReceivingModal] = useState({ isOpen: false, mode: 'view', record: null });
  const [distributionModal, setDistributionModal] = useState({ isOpen: false, mode: 'add', distribution: null });
  const [emergencyModal, setEmergencyModal] = useState({ isOpen: false, mode: 'add', request: null });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  // 1. Data Fetching Effect (Asynchronous mount fetch with cleanup)
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [invData, whData, colData, distData, emrData, statsData] = await Promise.all([
          apiFetch('/inventory'),
          apiFetch('/warehouses'),
          apiFetch('/collections'),
          apiFetch('/distributions'),
          apiFetch('/emergency'),
          apiFetch('/stats/overview'),
        ]);

        if (!isMounted) return;
        if (invData?.success && invData.data?.length > 0) setInventoryItems(invData.data);
        if (whData?.success && whData.data?.length > 0) setWarehouses(whData.data);
        if (colData?.success && colData.data?.length > 0) setCollections(colData.data);
        if (distData?.success && distData.data?.length > 0) setDistributions(distData.data);
        if (emrData?.success && emrData.data?.length > 0) setEmergencyRequests(emrData.data);
        if (statsData?.success && statsData.data) setStats(statsData.data);
      } catch (err) {
        console.warn('API sync warning (using offline-safe store):', err.message);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Authentication Handlers
  const handleLogin = async ({ email, password }) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!data.success) {
      throw new Error(data.message || 'Invalid email or password');
    }

    setCurrentUser(data.user);
    try {
      localStorage.setItem('gotera_user', JSON.stringify(data.user));
    } catch {
      // storage quota / privacy mode safe
    }
    setCurrentView('dashboard');
  };

  const handleRegister = async (formData) => {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    setCurrentUser(data.user);
    try {
      localStorage.setItem('gotera_user', JSON.stringify(data.user));
    } catch {
      // safe
    }
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('gotera_user');
    } catch {
      // safe
    }
    setCurrentView('home');
  };

  // 3. CRUD Operations - Inventory (Crops)
  const handleSaveInventory = async (itemData) => {
    try {
      if (inventoryModal.mode === 'edit' && inventoryModal.item) {
        const id = inventoryModal.item._id;
        const result = await apiFetch(`/inventory/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        });
        if (result?.success) {
          setInventoryItems((prev) =>
            prev.map((i) => (String(i._id) === String(id) ? result.data : i))
          );
        } else {
          // Client-side optimistic update fallback
          setInventoryItems((prev) =>
            prev.map((i) => (String(i._id) === String(id) ? { ...i, ...itemData, updatedAt: new Date() } : i))
          );
        }
      } else {
        const result = await apiFetch('/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        });
        if (result?.success) {
          setInventoryItems((prev) => [result.data, ...prev]);
        } else {
          // Optimistic addition
          const newItem = {
            ...itemData,
            _id: `inv_${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setInventoryItems((prev) => [newItem, ...prev]);
        }
      }
      setInventoryModal({ isOpen: false, mode: 'add', item: null });
      apiFetch('/stats/overview').then((d) => d?.success && setStats(d.data));
    } catch (err) {
      console.error('Save inventory error:', err);
    }
  };

  const handleDeleteInventory = (item) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Remove Food Item',
      message: `Are you sure you want to remove "${item.name}" (${item.warehouse}) from the national reserve database?`,
      onConfirm: async () => {
        try {
          await apiFetch(`/inventory/${item._id}`, { method: 'DELETE' });
        } catch (err) {
          console.debug('Inventory delete fallback:', err);
        }
        setInventoryItems((prev) => prev.filter((i) => String(i._id) !== String(item._id)));
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
        apiFetch('/stats/overview').then((d) => d?.success && setStats(d.data));
      },
    });
  };

  // 4. CRUD Operations - Warehouses (Management)
  const handleSaveWarehouse = async (whData) => {
    try {
      if (warehouseModal.mode === 'edit' && warehouseModal.warehouse) {
        const id = warehouseModal.warehouse._id;
        const result = await apiFetch(`/warehouses/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(whData),
        });
        if (result?.success) {
          setWarehouses((prev) =>
            prev.map((w) => (String(w._id) === String(id) ? result.data : w))
          );
        } else {
          setWarehouses((prev) =>
            prev.map((w) => (String(w._id) === String(id) ? { ...w, ...whData } : w))
          );
        }
      } else {
        const result = await apiFetch('/warehouses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(whData),
        });
        if (result?.success) {
          setWarehouses((prev) => [...prev, result.data]);
        } else {
          const newWh = {
            ...whData,
            _id: `wh_${Date.now()}`,
            capacityUsedPercent: Math.round((whData.currentStock / whData.totalCapacity) * 100),
          };
          setWarehouses((prev) => [...prev, newWh]);
        }
      }
      setWarehouseModal({ isOpen: false, mode: 'add', warehouse: null });
      apiFetch('/stats/overview').then((d) => d?.success && setStats(d.data));
    } catch (err) {
      console.error('Save warehouse error:', err);
    }
  };

  const handleDeleteWarehouse = (wh) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Decommission Warehouse',
      message: `Are you sure you want to decommission "${wh.name}"? Active stock allocations will require relocation.`,
      onConfirm: async () => {
        try {
          await apiFetch(`/warehouses/${wh._id}`, { method: 'DELETE' });
        } catch (err) {
          console.debug('Warehouse delete fallback:', err);
        }
        setWarehouses((prev) => prev.filter((w) => String(w._id) !== String(wh._id)));
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
        apiFetch('/stats/overview').then((d) => d?.success && setStats(d.data));
      },
    });
  };

  // 5. CRUD Operations - Receiving / Food Collection
  const handleLogCollection = async (collectionData) => {
    try {
      const result = await apiFetch('/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collectionData),
      });
      if (result?.success) {
        setCollections((prev) => [result.data, ...prev]);
      } else {
        const newCol = {
          ...collectionData,
          _id: `col_${Date.now()}`,
          recordId: `GC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          createdAt: new Date(),
        };
        setCollections((prev) => [newCol, ...prev]);
      }
      apiFetch('/stats/overview').then((d) => d?.success && setStats(d.data));
    } catch (err) {
      console.error('Log collection error:', err);
    }
  };

  const handleUpdateCollection = async (recData) => {
    try {
      const id = receivingModal.record._id || receivingModal.record.recordId;
      const result = await apiFetch(`/collections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recData),
      });
      if (result?.success) {
        setCollections((prev) =>
          prev.map((c) => (String(c._id) === String(id) || c.recordId === id ? result.data : c))
        );
      } else {
        setCollections((prev) =>
          prev.map((c) => (String(c._id) === String(id) || c.recordId === id ? { ...c, ...recData } : c))
        );
      }
      setReceivingModal({ isOpen: false, mode: 'view', record: null });
      apiFetch('/stats/overview').then((d) => d?.success && setStats(d.data));
    } catch (err) {
      console.error('Update collection error:', err);
    }
  };

  const handleDeleteCollection = (rec) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Remove Collection Log',
      message: `Delete shipment record "${rec.recordId}" (${rec.item} from ${rec.source})?`,
      onConfirm: async () => {
        const id = rec._id || rec.recordId;
        try {
          await apiFetch(`/collections/${id}`, { method: 'DELETE' });
        } catch (err) {
          console.debug('Collection delete fallback:', err);
        }
        setCollections((prev) => prev.filter((c) => c._id !== id && c.recordId !== id));
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
        apiFetch('/stats/overview').then((d) => d?.success && setStats(d.data));
      },
    });
  };

  // 6. CRUD Operations - Distribution & Dispatches
  const handleSaveDistribution = async (distData) => {
    try {
      const result = await apiFetch('/distributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(distData)
      });
      if (result?.success) {
        setDistributions(prev => [result.data, ...prev]);
      } else {
        const fallback = {
          ...distData,
          _id: `dst_${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setDistributions(prev => [fallback, ...prev]);
      }
      setDistributionModal({ isOpen: false, mode: 'add', distribution: null });
    } catch (err) {
      console.error('Save distribution error:', err);
    }
  };

  const handleUpdateDistributionStatus = async (dist, newStatus) => {
    try {
      const id = dist._id || dist.distributionId;
      await apiFetch(`/distributions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.debug('Update status fallback:', err);
    }
    setDistributions(prev =>
      prev.map(d => (String(d._id) === String(dist._id) || d.distributionId === dist.distributionId ? { ...d, status: newStatus } : d))
    );
  };

  const handleDeleteDistribution = (dist) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Remove Dispatch Record',
      message: `Delete distribution record "${dist.distributionId}" (${dist.item} to ${dist.destination})?`,
      onConfirm: async () => {
        const id = dist._id || dist.distributionId;
        try {
          await apiFetch(`/distributions/${id}`, { method: 'DELETE' });
        } catch (err) {
          console.debug('Delete distribution fallback:', err);
        }
        setDistributions(prev => prev.filter(d => d._id !== id && d.distributionId !== id));
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  // 7. CRUD Operations - Emergency Requests
  const handleSaveEmergencyRequest = async (reqData) => {
    try {
      const result = await apiFetch('/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
      });
      if (result?.success) {
        setEmergencyRequests(prev => [result.data, ...prev]);
      } else {
        const fallback = {
          ...reqData,
          _id: `emr_${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setEmergencyRequests(prev => [fallback, ...prev]);
      }
      setEmergencyModal({ isOpen: false, mode: 'add', request: null });
    } catch (err) {
      console.error('Save emergency error:', err);
    }
  };

  const handleUpdateEmergencyStatus = async (reqItem, newStatus) => {
    try {
      const id = reqItem._id || reqItem.requestId;
      await apiFetch(`/emergency/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.debug('Update emergency fallback:', err);
    }
    setEmergencyRequests(prev =>
      prev.map(r => (String(r._id) === String(reqItem._id) || r.requestId === reqItem.requestId ? { ...r, status: newStatus } : r))
    );
  };

  const handleDeleteEmergencyRequest = (reqItem) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Remove Emergency Requisition',
      message: `Delete requisition "${reqItem.requestId}" from ${reqItem.authority}?`,
      onConfirm: async () => {
        const id = reqItem._id || reqItem.requestId;
        try {
          await apiFetch(`/emergency/${id}`, { method: 'DELETE' });
        } catch (err) {
          console.debug('Delete emergency fallback:', err);
        }
        setEmergencyRequests(prev => prev.filter(r => r._id !== id && r.requestId !== id));
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  // Filtered Food Inventory Items
  const filteredInventory = inventoryItems.filter((item) => {
    const matchCat = categoryFilter === 'All' || item.category?.toLowerCase() === categoryFilter.toLowerCase();
    const matchWh = warehouseFilter === 'All' || item.warehouse?.toLowerCase() === warehouseFilter.toLowerCase();
    const query = (tableSearch || globalSearch).toLowerCase();
    const matchSearch =
      !query ||
      item.name?.toLowerCase().includes(query) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(query)) ||
      item.warehouse?.toLowerCase().includes(query);
    return matchCat && matchWh && matchSearch;
  });

  // Filtered Warehouses (incorporates global search query)
  const filteredWarehouses = warehouses.filter((wh) => {
    if (!globalSearch.trim()) return true;
    const query = globalSearch.toLowerCase().trim();
    return (
      wh.name?.toLowerCase().includes(query) ||
      wh.region?.toLowerCase().includes(query) ||
      wh.manager?.toLowerCase().includes(query) ||
      wh.status?.toLowerCase().includes(query)
    );
  });

  // Filtered Collections (incorporates global search query)
  const filteredCollections = collections.filter((rec) => {
    if (!globalSearch.trim()) return true;
    const query = globalSearch.toLowerCase().trim();
    return (
      rec.recordId?.toLowerCase().includes(query) ||
      rec.item?.toLowerCase().includes(query) ||
      rec.source?.toLowerCase().includes(query) ||
      rec.destinationWarehouse?.toLowerCase().includes(query) ||
      rec.status?.toLowerCase().includes(query)
    );
  });

  // Real CSV Export Generator for Receiving Logs
  const handleExportCSV = () => {
    const headers = ['Record ID', 'Item Name', 'Quantity', 'Unit', 'Source Provider', 'Destination Warehouse', 'Collection Date', 'Status', 'Notes'];
    const rows = filteredCollections.map((c) => [
      `"${c.recordId || ''}"`,
      `"${c.item || ''}"`,
      c.quantity || 0,
      `"${c.unit || 't'}"`,
      `"${c.source || ''}"`,
      `"${c.destinationWarehouse || ''}"`,
      `"${c.collectionDate ? new Date(c.collectionDate).toISOString().split('T')[0] : ''}"`,
      `"${c.status || ''}"`,
      `"${(c.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(',')).join('\n')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Gotera_Receiving_Log_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ================= VIEW ROUTING =================

  // 1. Landing / Home Page View (Form where all users start or sign in)
  if (currentView === 'home') {
    return (
      <LandingPage
        currentUser={currentUser}
        onNavigateToAuth={(mode) => setCurrentView(mode === 'register' ? 'register' : 'signin')}
        onNavigateToDashboard={() => setCurrentView('dashboard')}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setCurrentView('dashboard');
        }}
        onLogout={handleLogout}
        stats={stats}
      />
    );
  }

  // 2. Sign In Screen
  if (currentView === 'signin') {
    return (
      <SignIn
        onLogin={handleLogin}
        onSwitchToRegister={() => setCurrentView('register')}
        onBackToHome={() => setCurrentView('home')}
      />
    );
  }

  // 3. Create Account Screen
  if (currentView === 'register') {
    return (
      <CreateAccount
        onRegister={handleRegister}
        onSwitchToLogin={() => setCurrentView('signin')}
        onBackToHome={() => setCurrentView('home')}
      />
    );
  }

  // 4. Authenticated Gotera Operations System Dashboard
  return (
    <div className="app-shell">
      {/* 1. Sidebar Navigation Landmark */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Landmark */}
      <main className="app-main">
        <Header
          activeTab={activeTab}
          currentUser={currentUser}
          onLogout={handleLogout}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
        />

        <div className="page-container">
          {/* Top 4 Stat Indicator Cards (shown for inventory, warehouses, receiving) */}
          {(activeTab === 'inventory' || activeTab === 'warehouses' || activeTab === 'receiving') && (
            <StatCards activeTab={activeTab} stats={stats} />
          )}

          {/* View Tab 1: Food Inventory (Crops) View */}
          {activeTab === 'inventory' && (
            <>
              <div className="page-title-row">
                <div>
                  <h2 className="page-headline">Food Inventory</h2>
                  <p className="page-subheadline">
                    {inventoryItems.length} active strategic crop line items across regional reserve warehouses
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

          {/* View Tab 2: Warehouses (Management) View */}
          {activeTab === 'warehouses' && (
            <WarehouseGrid
              warehouses={filteredWarehouses}
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
                    Incoming relief shipments undergoing quality inspection & warehouse intake
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleExportCSV}
                >
                  Export Log
                </button>
              </div>

              <div className="receiving-split-container">
                <ReceivingTable
                  records={filteredCollections}
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

          {/* View Tab 4: Distribution Module */}
          {activeTab === 'distribution' && (
            <DistributionView
              distributions={distributions}
              warehousesList={warehouses}
              onAddDistribution={() => setDistributionModal({ isOpen: true, mode: 'add', distribution: null })}
              onViewDistribution={(dist) => setDistributionModal({ isOpen: true, mode: 'view', distribution: dist })}
              onUpdateStatus={handleUpdateDistributionStatus}
              onDeleteDistribution={handleDeleteDistribution}
              globalSearch={globalSearch}
            />
          )}

          {/* View Tab 5: Emergency Requests Module */}
          {activeTab === 'emergency' && (
            <EmergencyRequestsView
              requests={emergencyRequests}
              warehousesList={warehouses}
              onAddRequest={() => setEmergencyModal({ isOpen: true, mode: 'add', request: null })}
              onViewRequest={(req) => setEmergencyModal({ isOpen: true, mode: 'view', request: req })}
              onUpdateStatus={handleUpdateEmergencyStatus}
              onDeleteRequest={handleDeleteEmergencyRequest}
              globalSearch={globalSearch}
            />
          )}

          {/* View Tab 6: Reports & Analytics Module */}
          {activeTab === 'reports' && (
            <ReportsAnalytics
              inventoryItems={inventoryItems}
              warehouses={warehouses}
              collections={collections}
              distributions={distributions}
              stats={stats}
            />
          )}
        </div>
      </main>

      {/* Modal Dialogs */}
      {inventoryModal.isOpen && (
        <InventoryModal
          key={inventoryModal.item?._id || `inv-modal-${inventoryModal.mode}`}
          isOpen={inventoryModal.isOpen}
          mode={inventoryModal.mode}
          item={inventoryModal.item}
          warehousesList={warehouses}
          onClose={() => setInventoryModal({ isOpen: false, mode: 'add', item: null })}
          onSave={handleSaveInventory}
        />
      )}

      {warehouseModal.isOpen && (
        <WarehouseModal
          key={warehouseModal.warehouse?._id || `wh-modal-${warehouseModal.mode}`}
          isOpen={warehouseModal.isOpen}
          mode={warehouseModal.mode}
          warehouse={warehouseModal.warehouse}
          onClose={() => setWarehouseModal({ isOpen: false, mode: 'add', warehouse: null })}
          onSave={handleSaveWarehouse}
        />
      )}

      {receivingModal.isOpen && (
        <ReceivingModal
          key={receivingModal.record?._id || receivingModal.record?.recordId || `rec-modal-${receivingModal.mode}`}
          isOpen={receivingModal.isOpen}
          mode={receivingModal.mode}
          record={receivingModal.record}
          warehousesList={warehouses}
          onClose={() => setReceivingModal({ isOpen: false, mode: 'view', record: null })}
          onSave={handleUpdateCollection}
        />
      )}

      {distributionModal.isOpen && (
        <DistributionModal
          key={distributionModal.distribution?._id || distributionModal.distribution?.distributionId || `dist-modal-${distributionModal.mode}`}
          isOpen={distributionModal.isOpen}
          mode={distributionModal.mode}
          distribution={distributionModal.distribution}
          warehousesList={warehouses}
          inventoryList={inventoryItems}
          onClose={() => setDistributionModal({ isOpen: false, mode: 'add', distribution: null })}
          onSave={handleSaveDistribution}
        />
      )}

      {emergencyModal.isOpen && (
        <EmergencyModal
          key={emergencyModal.request?._id || emergencyModal.request?.requestId || `emr-modal-${emergencyModal.mode}`}
          isOpen={emergencyModal.isOpen}
          mode={emergencyModal.mode}
          request={emergencyModal.request}
          warehousesList={warehouses}
          inventoryList={inventoryItems}
          onClose={() => setEmergencyModal({ isOpen: false, mode: 'add', request: null })}
          onSave={handleSaveEmergencyRequest}
        />
      )}

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
