/**
 * seedData.js
 * Comprehensive dataset adhering to Gotera National Reserve UI & Presentation Mockups
 */

const seedInventory = [
  {
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

const seedWarehouses = [
  {
    name: 'Adama Central Warehouse',
    region: 'Oromia Region',
    totalCapacity: 40000,
    currentStock: 33830,
    unit: 't',
    manager: 'Tesfaye Alemu',
    contact: '+251 91 123 4567',
    status: 'Operational'
  },
  {
    name: 'Mekelle Warehouse',
    region: 'Tigray Region',
    totalCapacity: 30000,
    currentStock: 18610,
    unit: 't',
    manager: 'Selam Gebre',
    contact: '+251 92 234 5678',
    status: 'Operational'
  },
  {
    name: 'Bahir Dar Depot',
    region: 'Amhara Region',
    totalCapacity: 28000,
    currentStock: 16700,
    unit: 't',
    manager: 'Yared Bekele',
    contact: '+251 93 345 6789',
    status: 'Operational'
  },
  {
    name: 'Gambella Warehouse',
    region: 'Gambella Region',
    totalCapacity: 8000,
    currentStock: 6400,
    unit: 't',
    manager: 'Nyawan Ojulu',
    contact: '+251 94 456 7890',
    status: 'Near Capacity'
  },
  {
    name: 'Dire Dawa Depot',
    region: 'Dire Dawa',
    totalCapacity: 22000,
    currentStock: 9800,
    unit: 't',
    manager: 'Ahmed Nur',
    contact: '+251 95 567 8901',
    status: 'Operational'
  },
  {
    name: 'Hawassa Hub',
    region: 'Sidama Region',
    totalCapacity: 6000,
    currentStock: 4920,
    unit: 't',
    manager: 'Fikirte Solomon',
    contact: '+251 96 678 9012',
    status: 'Near Capacity'
  },
  {
    name: 'Kombolcha Strategic Silo',
    region: 'Amhara Region',
    totalCapacity: 25000,
    currentStock: 14200,
    unit: 't',
    manager: 'Kassahun Tadesse',
    contact: '+251 91 789 0123',
    status: 'Operational'
  },
  {
    name: 'Jigjiga Regional Store',
    region: 'Somali Region',
    totalCapacity: 15000,
    currentStock: 7800,
    unit: 't',
    manager: 'Abdi Mohammed',
    contact: '+251 92 890 1234',
    status: 'Operational'
  }
];

const seedCollections = [
  {
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

const seedUsers = [
  {
    fullName: 'Meron Kassa',
    email: 'meron.kassa@gotera.gov.et',
    phone: '+251 91 100 2030',
    organization: 'National Food Reserve Agency',
    role: 'Warehouse Manager',
    status: 'Active',
    password: 'Password123!',
    avatar: 'MK'
  },
  {
    fullName: 'Abebe Bikila',
    email: 'admin@gotera.gov.et',
    phone: '+251 91 222 3344',
    organization: 'Ministry of Agriculture',
    role: 'Administrator',
    status: 'Active',
    password: 'Admin123!',
    avatar: 'AB'
  },
  {
    fullName: 'Sara Tesfaye',
    email: 'coordinator@gotera.gov.et',
    phone: '+251 93 444 5566',
    organization: 'National Disaster Risk Management Commission',
    role: 'Relief Coordinator',
    status: 'Active',
    password: 'Coordinator123!',
    avatar: 'ST'
  },
  {
    fullName: 'Dawit Haile',
    email: 'dawit.haile@drc.gov.et',
    phone: '+251 92 777 8899',
    organization: 'Oromia Regional Disaster Office',
    role: 'Relief Coordinator',
    status: 'Pending Approval',
    password: 'Dawit123!',
    avatar: 'DH'
  },
  {
    fullName: 'Hiwot Tadesse',
    email: 'hiwot.tadesse@grain.gov.et',
    phone: '+251 91 333 4455',
    organization: 'Adama Grain Silo Reserve',
    role: 'Warehouse Manager',
    status: 'Pending Approval',
    password: 'Hiwot123!',
    avatar: 'HT'
  }
];

const seedDistributions = [
  {
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

const seedEmergencyRequests = [
  {
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

module.exports = {
  seedInventory,
  seedWarehouses,
  seedCollections,
  seedUsers,
  seedDistributions,
  seedEmergencyRequests,
};

