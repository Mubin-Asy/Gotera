/**
 * seedData.js
 * Initial dataset strictly adhering to Gotera UI mockups
 */

const seedInventory = [
  {
    name: 'Wheat Grain',
    category: 'Cereals',
    subCategory: 'Cereals',
    quantity: 25430,
    unit: 't',
    warehouse: 'Adama Central',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T10:00:00Z'),
    expiryDate: new Date('2027-09-01T00:00:00Z'),
    notes: 'Grade A Ethiopian hard wheat, moisture 12%'
  },
  {
    name: 'White Rice',
    category: 'Cereals',
    subCategory: 'Cereals',
    quantity: 18200,
    unit: 't',
    warehouse: 'Mekelle Warehouse',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T11:15:00Z'),
    expiryDate: new Date('2027-06-15T00:00:00Z'),
    notes: 'Long grain milled rice, hermetic packaging'
  },
  {
    name: 'Maize',
    category: 'Cereals',
    subCategory: 'Cereals',
    quantity: 12800,
    unit: 't',
    warehouse: 'Bahir Dar Depot',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T09:30:00Z'),
    expiryDate: new Date('2027-04-10T00:00:00Z'),
    notes: 'Yellow corn grain for reserve relief'
  },
  {
    name: 'Cooking Oil',
    category: 'Fats & Oils',
    subCategory: 'Fats & Oils',
    quantity: 1240,
    unit: 'L',
    warehouse: 'Gambella Warehouse',
    status: 'Low Stock',
    lastUpdated: new Date('2026-09-08T14:20:00Z'),
    expiryDate: new Date('2026-12-30T00:00:00Z'),
    notes: 'Refined sunflower oil in 20L jerrycans'
  },
  {
    name: 'Iodized Salt',
    category: 'Minerals',
    subCategory: 'Minerals',
    quantity: 3200,
    unit: 'kg',
    warehouse: 'Dire Dawa Depot',
    status: 'Low Stock',
    lastUpdated: new Date('2026-09-08T08:45:00Z'),
    expiryDate: new Date('2028-01-01T00:00:00Z'),
    notes: 'Fine iodized food grade table salt'
  },
  {
    name: 'Fortified Blend (CSB+)',
    category: 'Supplementary',
    subCategory: 'Supplementary',
    quantity: 820,
    unit: 'kg',
    warehouse: 'Hawassa Hub',
    status: 'Critical',
    lastUpdated: new Date('2026-09-08T16:00:00Z'),
    expiryDate: new Date('2026-11-20T00:00:00Z'),
    notes: 'Corn Soya Blend plus with vitamins & minerals'
  },
  {
    name: 'Red Beans',
    category: 'Pulses',
    subCategory: 'Pulses',
    quantity: 6450,
    unit: 't',
    warehouse: 'Adama Central',
    status: 'In Stock',
    lastUpdated: new Date('2026-09-08T13:10:00Z'),
    expiryDate: new Date('2027-08-15T00:00:00Z'),
    notes: 'High protein emergency pulse reserves'
  },
  {
    name: 'Powdered Milk',
    category: 'Dairy',
    subCategory: 'Dairy',
    quantity: 410,
    unit: 'kg',
    warehouse: 'Mekelle Warehouse',
    status: 'Expiring Soon',
    lastUpdated: new Date('2026-09-08T15:40:00Z'),
    expiryDate: new Date('2026-09-28T00:00:00Z'),
    notes: 'Instant whole milk powder 25kg sacks'
  }
];

const seedWarehouses = [
  {
    name: 'Adama Central Warehouse',
    region: 'Oromia Region',
    totalCapacity: 39024,
    currentStock: 32000,
    unit: 't',
    manager: 'Tesfaye Alemu',
    contact: '+251 91 123 4567',
    status: 'Operational'
  },
  {
    name: 'Mekelle Warehouse',
    region: 'Tigray Region',
    totalCapacity: 28906,
    currentStock: 18500,
    unit: 't',
    manager: 'Selam Gebre',
    contact: '+251 92 234 5678',
    status: 'Operational'
  },
  {
    name: 'Bahir Dar Depot',
    region: 'Amhara Region',
    totalCapacity: 26666,
    currentStock: 15200,
    unit: 't',
    manager: 'Yared Bekele',
    contact: '+251 93 345 6789',
    status: 'Operational'
  },
  {
    name: 'Gambella Warehouse',
    region: 'Gambella Region',
    totalCapacity: 7032,
    currentStock: 6400,
    unit: 't',
    manager: 'Nyawan Ojulu',
    contact: '+251 94 456 7890',
    status: 'Near Capacity'
  },
  {
    name: 'Dire Dawa Depot',
    region: 'Dire Dawa',
    totalCapacity: 20416,
    currentStock: 9800,
    unit: 't',
    manager: 'Ahmed Nur',
    contact: '+251 95 567 8901',
    status: 'Operational'
  },
  {
    name: 'Hawassa Hub',
    region: 'Sidama Region',
    totalCapacity: 4315,
    currentStock: 4100,
    unit: 't',
    manager: 'Fikirte Solomon',
    contact: '+251 96 678 9012',
    status: 'Near Capacity'
  }
];

const seedCollections = [
  {
    recordId: 'GC-2026-1187',
    item: 'Wheat Grain',
    quantity: 420,
    unit: 't',
    source: 'World Food Programme',
    destinationWarehouse: 'Adama Central',
    collectionDate: new Date('2026-09-09T08:30:00Z'),
    status: 'Inspected',
    notes: 'Batch inspected and cleared by National Quality Agency'
  },
  {
    recordId: 'GC-2026-1186',
    item: 'Rice',
    quantity: 260,
    unit: 't',
    source: 'Ministry of Agriculture',
    destinationWarehouse: 'Mekelle Warehouse',
    collectionDate: new Date('2026-09-08T11:00:00Z'),
    status: 'Received',
    notes: 'Transferred from domestic harvest reserve'
  },
  {
    recordId: 'GC-2026-1185',
    item: 'Cooking Oil',
    quantity: 8000,
    unit: 'L',
    source: 'USAID Donation',
    destinationWarehouse: 'Gambella Warehouse',
    collectionDate: new Date('2026-09-07T14:45:00Z'),
    status: 'Pending Inspection',
    notes: 'Awaiting laboratory aflatoxin and acidity verification'
  },
  {
    recordId: 'GC-2026-1184',
    item: 'Maize',
    quantity: 310,
    unit: 't',
    source: 'Local Purchase Program',
    destinationWarehouse: 'Bahir Dar Depot',
    collectionDate: new Date('2026-09-06T09:15:00Z'),
    status: 'Inspected',
    notes: 'Cleaned, bagged and verified for silo storage'
  },
  {
    recordId: 'GC-2026-1183',
    item: 'Fortified Blend',
    quantity: 40,
    unit: 't',
    source: 'UNICEF',
    destinationWarehouse: 'Hawassa Hub',
    collectionDate: new Date('2026-09-05T16:20:00Z'),
    status: 'Rejected / Damaged',
    notes: 'Damaged packaging during transit; returned for replacement'
  }
];

const seedUsers = [
  {
    fullName: 'Meron Kassa',
    email: 'meron.kassa@gotera.gov.et',
    phone: '+251 91 100 2030',
    organization: 'National Food Reserve Agency',
    role: 'Warehouse Manager',
    password: 'Password123!',
    avatar: 'MK'
  }
];

module.exports = {
  seedInventory,
  seedWarehouses,
  seedCollections,
  seedUsers,
};
