import { User, Shop, ExpertProfile } from '../types/user';
import { Farm, Crop, CropActivity, SoilReport, FarmExpense, FarmFinancialSummary } from '../types/farm';
import { Product, Order, Invoice } from '../types/store';
import { MarketPrice, WeatherCondition, ExpertConsultation, CommunityPost, GovernmentScheme, KnowledgeArticle, NotificationItem } from '../types/market';
import { PlantDiseaseDiagnosis } from '../types/ai';

// Seed Users
export const SEED_USERS: User[] = [
  {
    id: 'user-farmer-1',
    name: 'Ramesh Kumar',
    email: 'ramesh.farmer@agromitra.in',
    phone: '+91 98480 12345',
    role: 'FARMER',
    location: 'Narsampet, Warangal',
    district: 'Warangal',
    state: 'Telangana',
    preferredLanguage: 'en',
    createdAt: '2025-06-15T08:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-shop-1',
    name: 'Kishore Reddy',
    email: 'kishore.agri@balajiagro.com',
    phone: '+91 94401 56789',
    role: 'SHOP_OWNER',
    location: 'Main Road, Narsampet',
    district: 'Warangal',
    state: 'Telangana',
    preferredLanguage: 'en',
    createdAt: '2025-04-10T10:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-expert-1',
    name: 'Dr. K. Srinivas Rao, Ph.D.',
    email: 'dr.srinivas.agri@kvk.gov.in',
    phone: '+91 98661 78901',
    role: 'EXPERT',
    location: 'Krishi Vigyan Kendra, Malyal',
    district: 'Mahabubabad',
    state: 'Telangana',
    preferredLanguage: 'en',
    createdAt: '2025-01-20T09:15:00Z',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-admin-1',
    name: 'Suresh Babu',
    email: 'admin@agromitra.in',
    phone: '+91 99890 00111',
    role: 'ADMIN',
    location: 'AgroMitra Operations HQ, Hyderabad',
    district: 'Hyderabad',
    state: 'Telangana',
    preferredLanguage: 'en',
    createdAt: '2025-01-01T00:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

// Seed Shops
export const SEED_SHOPS: Shop[] = [
  {
    id: 'shop-1',
    ownerId: 'user-shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    ownerName: 'Kishore Reddy',
    licenseNumber: 'TS-WGL-AGR-2023-8841',
    phone: '+91 94401 56789',
    email: 'balajiagro.wgl@gmail.com',
    address: 'Shop #14, Market Road, Near Rythu Sangham',
    district: 'Warangal',
    state: 'Telangana',
    pincode: '506132',
    isOpen: true,
    openingHours: '7:30 AM - 8:30 PM (Mon-Sun)',
    distanceKm: 1.8,
    rating: 4.8,
    reviewsCount: 142,
    verified: true,
    pickupAvailable: true,
    homeDeliveryAvailable: true,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'shop-2',
    ownerId: 'user-shop-2',
    shopName: 'Kisan Seva Kendra & Fertilizers',
    ownerName: 'M. Venkanna',
    licenseNumber: 'TS-WGL-AGR-2022-4412',
    phone: '+91 98492 33441',
    email: 'kisan.sevakendra@gmail.com',
    address: 'Opp. Agricultural Market Committee, Hanamkonda',
    district: 'Warangal',
    state: 'Telangana',
    pincode: '506001',
    isOpen: true,
    openingHours: '8:00 AM - 8:00 PM',
    distanceKm: 4.5,
    rating: 4.6,
    reviewsCount: 89,
    verified: true,
    pickupAvailable: true,
    homeDeliveryAvailable: false,
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'shop-3',
    ownerId: 'user-shop-3',
    shopName: 'Rythu Mitra Bio-Inputs & Drip Spares',
    ownerName: 'G. Narsimha',
    licenseNumber: 'TS-WGL-BIO-2024-1109',
    phone: '+91 97014 99002',
    email: 'rythumitra.bio@gmail.com',
    address: 'Bypass Road, Narsampet',
    district: 'Warangal',
    state: 'Telangana',
    pincode: '506132',
    isOpen: true,
    openingHours: '8:30 AM - 7:30 PM',
    distanceKm: 6.2,
    rating: 4.9,
    reviewsCount: 64,
    verified: true,
    pickupAvailable: true,
    homeDeliveryAvailable: true,
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&auto=format&fit=crop&q=80'
  }
];

// Seed Expert Profiles
export const SEED_EXPERTS: ExpertProfile[] = [
  {
    id: 'expert-1',
    userId: 'user-expert-1',
    specialization: 'Cotton & Chilli Crop Protection, Soil Nutrition',
    qualification: 'Ph.D. in Agronomy (PJTSAU), M.Sc. Agriculture',
    institution: 'Senior Agronomist, Krishi Vigyan Kendra (KVK)',
    experienceYears: 18,
    consultationsCompleted: 438,
    rating: 4.9,
    availableForConsultation: true
  }
];

// Seed Farms
export const SEED_FARMS: Farm[] = [
  {
    id: 'farm-1',
    farmerId: 'user-farmer-1',
    farmName: 'My Cotton & Chilli Farm',
    village: 'Narsampet Rural',
    district: 'Warangal',
    state: 'Telangana',
    totalAcres: 4.5,
    soilType: 'Black Soil',
    irrigationType: 'Drip',
    waterSource: 'Borewell + Farm Pond',
    currentCrop: 'Cotton (Bollgard II)',
    cropVariety: 'Rasi 659 BG II',
    sowingDate: '2026-06-25',
    latitude: 17.9245,
    longitude: 79.8976,
    createdAt: '2025-05-10T09:00:00Z',
    zones: [
      {
        id: 'zone-a',
        name: 'Zone A - North Parcel',
        acres: 2.0,
        cropName: 'Cotton',
        cropVariety: 'Rasi 659 BG II',
        color: '#2E7D32',
        soilMoisturePercent: 68,
        healthIndex: 'Optimal'
      },
      {
        id: 'zone-b',
        name: 'Zone B - East Parcel',
        acres: 1.5,
        cropName: 'Chilli',
        cropVariety: 'Teja Hot Hybrid',
        color: '#D32F2F',
        soilMoisturePercent: 62,
        healthIndex: 'Optimal'
      },
      {
        id: 'zone-c',
        name: 'Zone C - South Parcel',
        acres: 1.0,
        cropName: 'Maize',
        cropVariety: 'DHM 117 Single Cross',
        color: '#F9A825',
        soilMoisturePercent: 55,
        healthIndex: 'Good'
      }
    ]
  },
  {
    id: 'farm-2',
    farmerId: 'user-farmer-1',
    farmName: 'Kakatiya Canal Paddy Land',
    village: 'Chennaraopet',
    district: 'Warangal',
    state: 'Telangana',
    totalAcres: 2.5,
    soilType: 'Alluvial Soil',
    irrigationType: 'Canal / Flood',
    waterSource: 'Kakatiya Main Canal',
    currentCrop: 'Paddy',
    cropVariety: 'BPT 5204 (Samba Masuri)',
    sowingDate: '2026-07-10',
    latitude: 17.8821,
    longitude: 79.9142,
    createdAt: '2025-07-01T11:00:00Z',
    zones: [
      {
        id: 'zone-canal-1',
        name: 'Zone 1 - Main Field',
        acres: 2.5,
        cropName: 'Paddy',
        cropVariety: 'BPT 5204 (Samba Masuri)',
        color: '#558B2F',
        soilMoisturePercent: 88,
        healthIndex: 'Optimal'
      }
    ]
  }
];

// Seed Crops
export const SEED_CROPS: Crop[] = [
  {
    id: 'crop-1',
    farmId: 'farm-1',
    name: 'Cotton',
    nameTe: 'పత్తి',
    variety: 'Rasi 659 BG II',
    sowingDate: '2026-06-25',
    estimatedHarvestDate: '2026-11-20',
    acres: 2.0,
    currentStage: 'Flowering',
    stageProgressPercent: 65,
    daysSinceSowing: 68,
    totalDurationDays: 145,
    healthStatus: 'Excellent',
    targetYieldQuintals: 24,
    actualYieldQuintals: undefined
  },
  {
    id: 'crop-2',
    farmId: 'farm-1',
    name: 'Chilli',
    nameTe: 'మిరప',
    variety: 'Teja Hot Hybrid',
    sowingDate: '2026-07-15',
    estimatedHarvestDate: '2026-12-30',
    acres: 1.5,
    currentStage: 'Vegetative Growth',
    stageProgressPercent: 38,
    daysSinceSowing: 45,
    totalDurationDays: 160,
    healthStatus: 'Good',
    targetYieldQuintals: 28,
    actualYieldQuintals: undefined
  },
  {
    id: 'crop-3',
    farmId: 'farm-1',
    name: 'Maize',
    nameTe: 'మొక్కజొన్న',
    variety: 'DHM 117 Single Cross',
    sowingDate: '2026-08-10',
    estimatedHarvestDate: '2026-11-15',
    acres: 1.0,
    currentStage: 'Germination',
    stageProgressPercent: 18,
    daysSinceSowing: 20,
    totalDurationDays: 105,
    healthStatus: 'Good',
    targetYieldQuintals: 32,
    actualYieldQuintals: undefined
  }
];

// Seed Crop Activities
export const SEED_ACTIVITIES: CropActivity[] = [
  {
    id: 'act-1',
    cropId: 'crop-1',
    farmId: 'farm-1',
    title: 'Soil Deep Ploughing & FYM Application',
    titleTe: 'వేసవి దుక్కులు మరియు పశువుల ఎరువు వేయుట',
    scheduledDay: 0,
    dueDate: '2026-06-20',
    category: 'Sowing',
    completed: true,
    completedAt: '2026-06-20',
    notes: 'Incorporated 4 trolleys of decomposed farmyard manure.'
  },
  {
    id: 'act-2',
    cropId: 'crop-1',
    farmId: 'farm-1',
    title: 'Seed Sowing with Trichoderma Treatment',
    titleTe: 'ట్రైకోడెర్మ తో విత్తన శుద్ధి మరియు విత్తనాలు నాటుట',
    scheduledDay: 1,
    dueDate: '2026-06-25',
    category: 'Sowing',
    completed: true,
    completedAt: '2026-06-25',
    notes: 'Spacing: 90cm x 60cm with drip lateral alignment.'
  },
  {
    id: 'act-3',
    cropId: 'crop-1',
    farmId: 'farm-1',
    title: 'Gap Filling & Germination Assessment',
    titleTe: 'మొలక శాతం పరిశీలన మరియు ఖాళీలలో విత్తనాలు నాటుట',
    scheduledDay: 10,
    dueDate: '2026-07-05',
    category: 'Sowing',
    completed: true,
    completedAt: '2026-07-05'
  },
  {
    id: 'act-4',
    cropId: 'crop-1',
    farmId: 'farm-1',
    title: 'First Top Dressing: Urea & MOP Fertigation',
    titleTe: 'మొదటి దఫా యూరియా మరియు పొటాష్ ఎరువులు అందించుట',
    scheduledDay: 30,
    dueDate: '2026-07-25',
    category: 'Fertilization',
    completed: true,
    completedAt: '2026-07-25'
  },
  {
    id: 'act-5',
    cropId: 'crop-1',
    farmId: 'farm-1',
    title: 'Pest Scouting: Sucking Pests (Aphids/Jassids)',
    titleTe: 'రసం పీల్చే పురుగుల ఉధృతి పరిశీలన (పచ్చదోమ/తామర పురుగులు)',
    scheduledDay: 50,
    dueDate: '2026-08-14',
    category: 'Pest Scouting',
    completed: true,
    completedAt: '2026-08-14'
  },
  {
    id: 'act-6',
    cropId: 'crop-1',
    farmId: 'farm-1',
    title: 'Bollgard Square & Flower Monitoring',
    titleTe: 'పూత మరియు కాత నిలకడ పరిశీలన, 19-19-19 పిచికారీ',
    scheduledDay: 70,
    dueDate: '2026-09-03',
    category: 'Fertilization',
    completed: false,
    notes: 'Schedule foliar 19:19:19 spray early morning when wind is calm.'
  },
  {
    id: 'act-7',
    cropId: 'crop-1',
    farmId: 'farm-1',
    title: 'Secondary Weeding & Intercultivation',
    titleTe: 'అంతరకృషి మరియు కలుపు నివారణ',
    scheduledDay: 85,
    dueDate: '2026-09-18',
    category: 'Weeding',
    completed: false
  },
  {
    id: 'act-8',
    cropId: 'crop-1',
    farmId: 'farm-1',
    title: 'First Cotton Boll Picking',
    titleTe: 'మొదటి విడత పత్తి తీత',
    scheduledDay: 120,
    dueDate: '2026-10-23',
    category: 'Harvest',
    completed: false
  }
];

// Seed Soil Reports (Comparison 2025 vs 2026)
export const SEED_SOIL_REPORTS: SoilReport[] = [
  {
    id: 'soil-2025',
    farmId: 'farm-1',
    sampleDate: '2025-05-12',
    reportYear: 2025,
    ph: 7.4,
    nitrogenKgPerHa: 235, // Low
    phosphorusKgPerHa: 16, // Medium
    potassiumKgPerHa: 275, // Medium-High
    organicCarbonPercent: 0.44, // Low
    electricalConductivity: 0.42,
    micronutrientsStatus: {
      zinc: 'Deficient',
      iron: 'Adequate',
      boron: 'Deficient'
    },
    recommendations: [
      'Apply 5 tons of farmyard manure or green manure (Dhaincha) to raise organic carbon.',
      'Basal Zinc Sulphate application @ 25 kg/ha recommended before sowing.',
      'Split nitrogen application into 3 equal doses to avoid leaching.'
    ],
    recommendationsTe: [
      'సేంద్రీయ కర్బనం పెంచడానికి 5 టన్నుల పశువుల ఎరువు లేదా పచ్చిరొట్ట ఎరువు (జీలుగ) వేయండి.',
      'విత్తే ముందు ఎకరాకు 10 కిలోల జింక్ సల్ఫేట్ తప్పనిసరిగా వేయాలి.',
      'నత్రజని ఎరువును ఒకేసారి కాకుండా 3 దఫాలుగా విభజించి అందించండి.'
    ]
  },
  {
    id: 'soil-2026',
    farmId: 'farm-1',
    sampleDate: '2026-05-18',
    reportYear: 2026,
    ph: 7.2,
    nitrogenKgPerHa: 310, // Medium (Improved)
    phosphorusKgPerHa: 22, // Medium
    potassiumKgPerHa: 315, // High
    organicCarbonPercent: 0.64, // Medium (Significant Improvement)
    electricalConductivity: 0.38,
    micronutrientsStatus: {
      zinc: 'Adequate',
      iron: 'Adequate',
      boron: 'Adequate'
    },
    recommendations: [
      'Organic carbon improved by +45% due to consistent green manuring.',
      'Soil nutrient balance is optimal for Kharif cotton and rotation with pulse crops.',
      'Maintain drip fertigation schedule with water-soluble 19:19:19 during flowering.'
    ],
    recommendationsTe: [
      'పచ్చిరొట్ట ఎరువుల వాడకం వల్ల సేంద్రీయ కర్బనం +45% మెరుగైంది.',
      'నేల పోషకాల సమతుల్యత ఖరీఫ్ పత్తి మరియు పప్పుధాన్యాల పంట మార్పిడికి అనుకూలంగా ఉంది.',
      'పూత దశలో డ్రిప్ ద్వారా 19:19:19 కరిగే ఎరువులను నిర్ణీత సమయాలలో అందించండి.'
    ]
  }
];

// Seed Products
export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    shopId: 'shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    name: 'Rasi 659 BG II Cotton Hybrid Seeds',
    nameTe: 'రాశి 659 బి.జి-2 హైబ్రిడ్ పత్తి విత్తనాలు',
    category: 'Seeds',
    brand: 'Rasi Seeds',
    packSize: '475g Packet (450g Hybrid + 25g Non-Bt Refuge)',
    price: 864,
    mrp: 910,
    stockQuantity: 185,
    lowStockThreshold: 25,
    sku: 'RASI-659-COT',
    rating: 4.9,
    reviewsCount: 230,
    imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=500&auto=format&fit=crop&q=80',
    description: 'Premier Bollgard II cotton hybrid known for excellent boll retention, drought tolerance, and heavy fluffing. Ideal for medium to heavy black soils.',
    descriptionTe: 'భారీ కాయలు, బెట్టను తట్టుకునే సామర్థ్యం మరియు అధిక దిగుబడినిచ్చే ప్రముఖ బిజి-2 హైబ్రిడ్ పత్తి విత్తనాలు. నల్లరేగడి నేలలకు అత్యంత అనుకూలం.',
    suitableCrops: ['Cotton'],
    manufacturer: 'Rasi Seeds Pvt. Ltd., Attur',
    activeIngredients: 'Transgenic Bt Cotton Cry1Ac & Cry2Ab proteins',
    dosageInstructions: 'Sow 1 packet per 0.5 acre with spacing 90x60 cm',
    storageInstructions: 'Store in cool, dry ventilated seed storage away from rodents',
    safetyInstructions: 'Treated with Imidacloprid 48% FS. Keep away from livestock and children.',
    batches: [
      {
        id: 'batch-c1',
        batchNumber: 'RS-659-2026-B04',
        manufacturingDate: '2026-03-15',
        expiryDate: '2026-12-31',
        supplierName: 'Rasi Seeds Central Depot, Hyderabad',
        purchasePrice: 790,
        sellingPrice: 864,
        quantityAdded: 250,
        quantityRemaining: 185,
        qrCodeToken: 'AGRO-AUTH-RS659-B04-88910',
        verifiedAuthentic: true
      }
    ]
  },
  {
    id: 'prod-2',
    shopId: 'shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    name: 'Syngenta 7041 Hot Chilli Hybrid Seeds',
    nameTe: 'సింజెంటా 7041 తేజ హాట్ మిరప విత్తనాలు',
    category: 'Seeds',
    brand: 'Syngenta',
    packSize: '10g Foil Pouch',
    price: 1450,
    mrp: 1550,
    stockQuantity: 92,
    lowStockThreshold: 15,
    sku: 'SYN-7041-CHL',
    rating: 4.8,
    reviewsCount: 114,
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80',
    description: 'High pungency, deep red gloss chilli hybrid with supreme tolerance against Powdery Mildew and sucking pests. Highly demanded for export & Guntur mandi.',
    descriptionTe: 'తీవ్రమైన ఘాటు, ముదురు ఎరుపు రంగు మరియు అధిక దిగుబడినిచ్చే హైబ్రిడ్ మిరప విత్తనాలు. గుంటూరు మార్కెట్ లో అత్యధిక డిమాండ్.',
    suitableCrops: ['Chilli'],
    manufacturer: 'Syngenta India Limited, Pune',
    dosageInstructions: '70-80 grams seed required per acre for nursery seedling production',
    storageInstructions: 'Keep airtight in foil pack until nursery bed sowing',
    safetyInstructions: 'Chemical fungicide treated seed. Wash hands with soap after handling.',
    batches: [
      {
        id: 'batch-ch1',
        batchNumber: 'SYN-7041-26-01',
        manufacturingDate: '2026-04-01',
        expiryDate: '2027-03-31',
        supplierName: 'Syngenta South Hub, Guntur',
        purchasePrice: 1320,
        sellingPrice: 1450,
        quantityAdded: 120,
        quantityRemaining: 92,
        qrCodeToken: 'AGRO-AUTH-SYN7041-01-3321',
        verifiedAuthentic: true
      }
    ]
  },
  {
    id: 'prod-3',
    shopId: 'shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    name: 'IFFCO 19:19:19 100% Water Soluble Fertilizer',
    nameTe: 'ఇఫ్కో 19:19:19 నీటిలో పూర్తిగా కరిగే ఎరువు',
    category: 'Fertilizers',
    brand: 'IFFCO',
    packSize: '1 kg Pouch',
    price: 210,
    mrp: 235,
    stockQuantity: 340,
    lowStockThreshold: 50,
    sku: 'IFFCO-NPK-19',
    rating: 4.9,
    reviewsCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=500&auto=format&fit=crop&q=80',
    description: 'Balanced water-soluble N-P-K (19% each) suitable for foliar spray and fertigation drip lines. Promotes rapid vegetative growth and balanced flowering.',
    descriptionTe: 'డ్రిప్ మరియు పిచికారీకి అనుకూలమైన 100% కరిగే నత్రజని, భాస్వరం, పొటాష్ ఎరువు. పూత మరియు పిందె నిలకడకు తోడ్పడుతుంది.',
    suitableCrops: ['Cotton', 'Chilli', 'Paddy', 'Maize', 'Vegetables'],
    manufacturer: 'Indian Farmers Fertiliser Cooperative Limited (IFFCO)',
    activeIngredients: 'Total N 19%, Neutral Ammonium Citrate Soluble P2O5 19%, Water Soluble K2O 19%',
    dosageInstructions: '5 grams per litre of water for foliar spray (750g - 1kg per acre)',
    storageInstructions: 'Keep in dry room off ground on wooden pallets',
    safetyInstructions: 'Non-toxic, avoid breathing dust during mixing',
    batches: [
      {
        id: 'batch-f1',
        batchNumber: 'IFF-19-2026-MAY',
        manufacturingDate: '2026-05-10',
        expiryDate: '2028-05-09',
        supplierName: 'IFFCO Central Depot, Secunderabad',
        purchasePrice: 175,
        sellingPrice: 210,
        quantityAdded: 500,
        quantityRemaining: 340,
        qrCodeToken: 'AGRO-AUTH-IFF19-MAY-99120',
        verifiedAuthentic: true
      }
    ]
  },
  {
    id: 'prod-4',
    shopId: 'shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    name: 'Coromandel Gromor DAP (18-46-0)',
    nameTe: 'కోరమాండల్ గ్రోమోర్ డి.ఎ.పి (18-46-0)',
    category: 'Fertilizers',
    brand: 'Coromandel International',
    packSize: '50 kg Bag',
    price: 1350,
    mrp: 1350,
    stockQuantity: 65,
    lowStockThreshold: 20,
    sku: 'CORO-DAP-50KG',
    rating: 4.8,
    reviewsCount: 198,
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&auto=format&fit=crop&q=80',
    description: 'High quality basal fertilizer rich in Phosphorus (46%) and Ammoniacal Nitrogen (18%). Stimulates vigorous root development in early crop stages.',
    descriptionTe: 'పంటల వేరు వ్యవస్థ బలంగా విస్తరించడానికి అనువైన భాస్వరం మరియు నత్రజని తో కూడిన ప్రాథమిక ఎరువు.',
    suitableCrops: ['Cotton', 'Paddy', 'Chilli', 'Maize', 'Groundnut'],
    manufacturer: 'Coromandel International Ltd., Visakhapatnam',
    dosageInstructions: '50-100 kg per acre as basal soil application at sowing',
    storageInstructions: 'Store in dry place on wooden dunnage',
    safetyInstructions: 'Handle with gloves, keep out of reach of livestock',
    batches: [
      {
        id: 'batch-dap1',
        batchNumber: 'COR-DAP-26-09',
        manufacturingDate: '2026-04-12',
        expiryDate: '2029-04-11',
        supplierName: 'Coromandel State Warehouse, Warangal',
        purchasePrice: 1260,
        sellingPrice: 1350,
        quantityAdded: 150,
        quantityRemaining: 65,
        qrCodeToken: 'AGRO-AUTH-CORDAP-26-0041',
        verifiedAuthentic: true
      }
    ]
  },
  {
    id: 'prod-5',
    shopId: 'shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    name: 'Bayer Confidor Insecticide (Imidacloprid 17.8% SL)',
    nameTe: 'బేయర్ కాన్ఫిడార్ క్రిమిసంహారక మందు',
    category: 'Crop Protection',
    brand: 'Bayer CropScience',
    packSize: '250 ml Bottle',
    price: 480,
    mrp: 525,
    stockQuantity: 58,
    lowStockThreshold: 12,
    sku: 'BAY-CONF-250',
    rating: 4.9,
    reviewsCount: 220,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    description: 'Systemic insecticide of the neonicotinoid class with quick knockdown against sucking pests such as aphids, jassids, and thrips in cotton and chilli.',
    descriptionTe: 'పత్తి, మిరప పంటలలో పచ్చదోమ, పేనుబంక, తామర పురుగుల నివారణకు అద్భుతమైన సిస్టమిక్ పురుగుమందు.',
    suitableCrops: ['Cotton', 'Chilli', 'Paddy'],
    manufacturer: 'Bayer CropScience Ltd., Thane',
    activeIngredients: 'Imidacloprid 17.8% SL',
    dosageInstructions: '0.3 to 0.5 ml per litre of water (50-60 ml per acre)',
    storageInstructions: 'Lock in original container in dedicated pesticide shed',
    safetyInstructions: 'Wear protective mask, gloves and rubber boots during spray. Observe 21-day pre-harvest interval.',
    batches: [
      {
        id: 'batch-bay1',
        batchNumber: 'BAY-CNF-2026-118',
        manufacturingDate: '2026-02-20',
        expiryDate: '2028-02-19',
        supplierName: 'Bayer Distribution Hub, Hyderabad',
        purchasePrice: 410,
        sellingPrice: 480,
        quantityAdded: 100,
        quantityRemaining: 58,
        qrCodeToken: 'AGRO-AUTH-BAYCNF-118-771',
        verifiedAuthentic: true
      }
    ]
  },
  {
    id: 'prod-6',
    shopId: 'shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    name: 'UPL Saaf Fungicide (Carbendazim 12% + Mancozeb 63% WP)',
    nameTe: 'యు.పి.ఎల్ సాఫ్ శిలీంద్ర సంహారిణి',
    category: 'Crop Protection',
    brand: 'UPL Limited',
    packSize: '500 g Pack',
    price: 340,
    mrp: 385,
    stockQuantity: 110,
    lowStockThreshold: 20,
    sku: 'UPL-SAAF-500',
    rating: 4.7,
    reviewsCount: 165,
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80',
    description: 'Dual systemic and contact fungicide controlling leaf spots, damping-off, blast, and collar rot across diverse agricultural crops.',
    descriptionTe: 'పంటలలో ఆకుమచ్చ తెగులు, బూడిద తెగులు, మరియు వేరుకుళ్లు నివారణకు ద్వంద్వ చర్య గల శిలీంద్ర నాశిని.',
    suitableCrops: ['Cotton', 'Chilli', 'Paddy', 'Groundnut'],
    manufacturer: 'UPL Limited, Mumbai',
    activeIngredients: 'Carbendazim 12% + Mancozeb 63% WP',
    dosageInstructions: '2 grams per litre of water (300-400 grams per acre)',
    storageInstructions: 'Store in dry place away from heat and food items',
    safetyInstructions: 'Avoid skin contact. Use personal protective equipment.',
    batches: [
      {
        id: 'batch-upl1',
        batchNumber: 'UPL-SAF-26-88',
        manufacturingDate: '2026-03-01',
        expiryDate: '2028-02-28',
        supplierName: 'UPL Agro Depot, Warangal',
        purchasePrice: 285,
        sellingPrice: 340,
        quantityAdded: 160,
        quantityRemaining: 110,
        qrCodeToken: 'AGRO-AUTH-UPLSAF-88-9901',
        verifiedAuthentic: true
      }
    ]
  },
  {
    id: 'prod-7',
    shopId: 'shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    name: 'Trichoderma Viride Organic Bio-Fungicide',
    nameTe: 'ట్రైకోడెర్మ విరిడి సేంద్రీయ బయో-శిలీంద్ర నాశిని',
    category: 'Organic Products',
    brand: 'Krishi Bio Organic',
    packSize: '1 kg Pouch',
    price: 195,
    mrp: 230,
    stockQuantity: 84,
    lowStockThreshold: 15,
    sku: 'BIO-TRICH-1KG',
    rating: 4.8,
    reviewsCount: 78,
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&auto=format&fit=crop&q=80',
    description: 'Eco-friendly fungal antagonist for seed treatment and soil application to combat fungal root rot, wilts, and damping-off without chemical residues.',
    descriptionTe: 'రసాయన రహిత సేంద్రీయ శిలీంద్ర నాశిని. విత్తన శుద్ధి మరియు నేల అప్లికేషన్ ద్వారా వేరుకుళ్లు, ఎండు తెగుళ్ల నుండి సంరక్షిస్తుంది.',
    suitableCrops: ['Cotton', 'Chilli', 'Paddy', 'Pulses', 'Oilseeds'],
    manufacturer: 'Krishi Bio Innovations Ltd., Hyderabad',
    activeIngredients: 'Trichoderma viride 1.0% WP (min 2 x 10^6 CFU/g)',
    dosageInstructions: 'Seed treatment: 10g/kg seed. Soil application: 2kg mixed with 100kg compost per acre',
    storageInstructions: 'Keep in cool dry place below 30°C. Protect from direct sun.',
    safetyInstructions: 'Completely organic and safe for soil microbes and beneficial insects.',
    isOrganic: true,
    batches: [
      {
        id: 'batch-trich1',
        batchNumber: 'KBO-TRV-26-04',
        manufacturingDate: '2026-05-02',
        expiryDate: '2027-05-01',
        supplierName: 'Krishi Bio Lab, Hyderabad',
        purchasePrice: 150,
        sellingPrice: 195,
        quantityAdded: 100,
        quantityRemaining: 84,
        qrCodeToken: 'AGRO-AUTH-KBOTRV-04-1234',
        verifiedAuthentic: true
      }
    ]
  },
  {
    id: 'prod-8',
    shopId: 'shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    name: 'Neem Oil 10,000 PPM Cold Pressed Organic Repellent',
    nameTe: 'వేపనూనె 10,000 PPM కోల్డ్ ప్రెస్డ్ ఆర్గానిక్ ద్రావణం',
    category: 'Organic Products',
    brand: 'Prakriti Organic',
    packSize: '1 Litre Can',
    price: 550,
    mrp: 620,
    stockQuantity: 42,
    lowStockThreshold: 10,
    sku: 'ORG-NEEM-1L',
    rating: 4.9,
    reviewsCount: 95,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80',
    description: 'High azadirachtin cold-pressed organic botanical repellent that disrupts insect egg laying, feeding, and juvenile hormone synthesis.',
    descriptionTe: 'అత్యధిక అజాడిరక్టిన్ కలిగిన సహజ సిద్ధమైన వేపనూనె. పురుగుల గుడ్లు, లార్వాల నివారణకు సమర్థవంతమైనది.',
    suitableCrops: ['Cotton', 'Chilli', 'Vegetables', 'Paddy'],
    manufacturer: 'Prakriti Agro Bio Ltd., Vijayawada',
    activeIngredients: 'Azadirachtin 1% (10,000 PPM)',
    dosageInstructions: '4-5 ml per litre of water along with mild surfactant',
    storageInstructions: 'Store in cool ambient shade',
    safetyInstructions: 'Safe for pollinators when sprayed in late evening.',
    isOrganic: true,
    batches: [
      {
        id: 'batch-neem1',
        batchNumber: 'PRK-NM-2026-02',
        manufacturingDate: '2026-04-15',
        expiryDate: '2027-10-14',
        supplierName: 'Prakriti Depot, Guntur',
        purchasePrice: 440,
        sellingPrice: 550,
        quantityAdded: 60,
        quantityRemaining: 42,
        qrCodeToken: 'AGRO-AUTH-PRKNM-02-9842',
        verifiedAuthentic: true
      }
    ]
  },
  {
    id: 'prod-9',
    shopId: 'shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    name: 'Aspee 16L Battery Operated Knapsack Sprayer',
    nameTe: 'ఆస్పీ 16 లీటర్ల బ్యాటరీ స్ప్రేయర్ పంపు',
    category: 'Farming Accessories',
    brand: 'Aspee',
    packSize: '16 Litre Unit',
    price: 2950,
    mrp: 3400,
    stockQuantity: 18,
    lowStockThreshold: 5,
    sku: 'ASP-SPR-16L',
    rating: 4.8,
    reviewsCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=500&auto=format&fit=crop&q=80',
    description: 'Heavy-duty 12V 12Ah lithium-ion battery sprayer with telescopic stainless steel lance, dual brass nozzles, and 6-hour continuous spray capacity.',
    descriptionTe: '12V బ్యాటరీతో నడిచే నాణ్యమైన స్ప్రేయర్. 6 గంటల పాటు నిరంతరం పిచికారీ చేయవచ్చు. రైతులకు శ్రమ తక్కువ.',
    suitableCrops: ['All Crops'],
    manufacturer: 'Aspee Agro Equipment Pvt. Ltd., Mumbai',
    dosageInstructions: 'Use supplied charger; charge 4 hours before field operation',
    storageInstructions: 'Rinse tank with clean water after each chemical spray',
    safetyInstructions: 'Always wash wand and nozzles after pesticide application',
    batches: [
      {
        id: 'batch-asp1',
        batchNumber: 'ASP-16L-2026-Q1',
        manufacturingDate: '2026-01-10',
        expiryDate: '2031-01-09',
        supplierName: 'Aspee South Hub, Hyderabad',
        purchasePrice: 2400,
        sellingPrice: 2950,
        quantityAdded: 30,
        quantityRemaining: 18,
        qrCodeToken: 'AGRO-AUTH-ASP16L-Q1-5511',
        verifiedAuthentic: true
      }
    ]
  }
];

// Seed Orders
export const SEED_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'AGRO-ORD-2026-8910',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Kumar',
    farmerPhone: '+91 98480 12345',
    shopId: 'shop-1',
    shopName: 'Sri Balaji Agro Agencies & Seeds',
    shopPhone: '+91 94401 56789',
    items: [
      {
        productId: 'prod-1',
        productName: 'Rasi 659 BG II Cotton Hybrid Seeds',
        category: 'Seeds',
        packSize: '475g Packet',
        unitPrice: 864,
        quantity: 4,
        totalPrice: 3456,
        batchNumber: 'RS-659-2026-B04'
      },
      {
        productId: 'prod-3',
        productName: 'IFFCO 19:19:19 100% Water Soluble Fertilizer',
        category: 'Fertilizers',
        packSize: '1 kg Pouch',
        unitPrice: 210,
        quantity: 5,
        totalPrice: 1050,
        batchNumber: 'IFF-19-2026-MAY'
      }
    ],
    subtotal: 4506,
    deliveryFee: 0,
    taxAmount: 225.3,
    totalAmount: 4731.3,
    deliveryType: 'Store Pickup',
    status: 'Ready for Pickup',
    createdAt: '2026-10-30T10:15:00Z',
    updatedAt: '2026-10-31T14:00:00Z',
    statusHistory: [
      { status: 'Placed', timestamp: '2026-10-30T10:15:00Z', note: 'Order created by farmer via mobile app' },
      { status: 'Confirmed', timestamp: '2026-10-30T11:00:00Z', note: 'Confirmed by Kishore Reddy (Shop Owner)' },
      { status: 'Packed', timestamp: '2026-10-30T15:30:00Z', note: 'Packed with verified QR authenticity seal' },
      { status: 'Ready for Pickup', timestamp: '2026-10-31T09:00:00Z', note: 'Available at shop counter #2' }
    ],
    paymentMethod: 'Cash on Delivery / Pickup',
    paymentStatus: 'Pending',
    invoiceNumber: 'INV-BALAJI-2026-441'
  }
];

// Seed Expenses
export const SEED_EXPENSES: FarmExpense[] = [
  {
    id: 'exp-1',
    farmerId: 'user-farmer-1',
    farmId: 'farm-1',
    date: '2026-06-15',
    category: 'Machinery',
    description: 'Tractor deep summer ploughing & rotavator leveling (4.5 acres)',
    amount: 9000,
    cropSeason: 'Kharif 2026'
  },
  {
    id: 'exp-2',
    farmerId: 'user-farmer-1',
    farmId: 'farm-1',
    date: '2026-06-22',
    category: 'Fertilizer',
    description: '4 tractor trolleys decomposed farmyard manure',
    amount: 12000,
    cropSeason: 'Kharif 2026'
  },
  {
    id: 'exp-3',
    farmerId: 'user-farmer-1',
    farmId: 'farm-1',
    date: '2026-06-25',
    category: 'Seeds',
    description: '4 packets Rasi 659 BG II Cotton seeds + Syngenta Chilli seeds',
    amount: 6356,
    cropSeason: 'Kharif 2026'
  },
  {
    id: 'exp-4',
    farmerId: 'user-farmer-1',
    farmId: 'farm-1',
    date: '2026-07-08',
    category: 'Labour',
    description: 'Sowing, ridge formation, and gap filling labour wages',
    amount: 5500,
    cropSeason: 'Kharif 2026'
  },
  {
    id: 'exp-5',
    farmerId: 'user-farmer-1',
    farmId: 'farm-1',
    date: '2026-07-28',
    category: 'Fertilizer',
    description: 'DAP basal dose & 19:19:19 drip soluble fertilizer',
    amount: 4850,
    cropSeason: 'Kharif 2026'
  },
  {
    id: 'exp-6',
    farmerId: 'user-farmer-1',
    farmId: 'farm-1',
    date: '2026-08-16',
    category: 'Crop Protection',
    description: 'Bayer Confidor & UPL Saaf for sucking pest and blight management',
    amount: 2450,
    cropSeason: 'Kharif 2026'
  },
  {
    id: 'exp-7',
    farmerId: 'user-farmer-1',
    farmId: 'farm-1',
    date: '2026-08-25',
    category: 'Labour',
    description: 'Manual weeding and drip emitter unclogging',
    amount: 4200,
    cropSeason: 'Kharif 2026'
  }
];

// Seed Historical Financial Summaries (2024 vs 2025 vs 2026)
export const SEED_FINANCIAL_SUMMARIES: FarmFinancialSummary[] = [
  {
    season: 'Kharif',
    year: 2024,
    crop: 'Cotton',
    acres: 4.5,
    totalExpenses: 78000,
    costPerAcre: 17333,
    yieldQuintals: 36,
    sellingPricePerQuintal: 6900,
    totalRevenue: 248400,
    netProfit: 170400,
    profitPerAcre: 37866
  },
  {
    season: 'Kharif',
    year: 2025,
    crop: 'Cotton & Chilli',
    acres: 4.5,
    totalExpenses: 86500,
    costPerAcre: 19222,
    yieldQuintals: 42,
    sellingPricePerQuintal: 7200,
    totalRevenue: 302400,
    netProfit: 215900,
    profitPerAcre: 47977
  },
  {
    season: 'Kharif (Current Season Est.)',
    year: 2026,
    crop: 'Cotton & Chilli',
    acres: 4.5,
    totalExpenses: 44356,
    costPerAcre: 9856,
    yieldQuintals: 48,
    sellingPricePerQuintal: 7250,
    totalRevenue: 348000,
    netProfit: 303644,
    profitPerAcre: 67476
  }
];

// Seed Market Prices (Warangal, Guntur, Nizamabad Mandis)
export const SEED_MARKET_PRICES: MarketPrice[] = [
  {
    id: 'mkt-1',
    crop: 'Cotton',
    cropTe: 'పత్తి',
    variety: 'Medium & Long Staple (Bt)',
    mandi: 'Warangal Enamamula Market Yard',
    district: 'Warangal',
    state: 'Telangana',
    modalPrice: 7250,
    minPrice: 6800,
    maxPrice: 7480,
    changePercent: 2.1,
    trend: 'up',
    lastUpdated: 'Today, 11:30 AM',
    source: 'TS Agricultural Marketing Board & AGMARKNET'
  },
  {
    id: 'mkt-2',
    crop: 'Chilli',
    cropTe: 'మిరప',
    variety: 'Teja Supreme (Red Dry)',
    mandi: 'Khammam Agricultural Market',
    district: 'Khammam',
    state: 'Telangana',
    modalPrice: 18400,
    minPrice: 16500,
    maxPrice: 19200,
    changePercent: 3.4,
    trend: 'up',
    lastUpdated: 'Today, 10:45 AM',
    source: 'State Mandi Price Bulletin'
  },
  {
    id: 'mkt-3',
    crop: 'Paddy',
    cropTe: 'వరి',
    variety: 'BPT 5204 (Samba Masuri Fine)',
    mandi: 'Nizamabad Mandi Yard',
    district: 'Nizamabad',
    state: 'Telangana',
    modalPrice: 2320,
    minPrice: 2183,
    maxPrice: 2450,
    changePercent: 0.8,
    trend: 'up',
    lastUpdated: 'Today, 09:30 AM',
    source: 'Civil Supplies & Mandi Cell'
  },
  {
    id: 'mkt-4',
    crop: 'Maize',
    cropTe: 'మొక్కజొన్న',
    variety: 'Yellow Hybrid Commercial',
    mandi: 'Warangal Enamamula Market Yard',
    district: 'Warangal',
    state: 'Telangana',
    modalPrice: 2240,
    minPrice: 2100,
    maxPrice: 2300,
    changePercent: -0.5,
    trend: 'down',
    lastUpdated: 'Today, 11:00 AM',
    source: 'AGMARKNET Daily Bulletin'
  },
  {
    id: 'mkt-5',
    crop: 'Groundnut',
    cropTe: 'వేరుశెనగ',
    variety: 'Pod Bold Quality',
    mandi: 'Mahabubnagar Market Yard',
    district: 'Mahabubnagar',
    state: 'Telangana',
    modalPrice: 6450,
    minPrice: 5900,
    maxPrice: 6720,
    changePercent: 1.2,
    trend: 'up',
    lastUpdated: 'Today, 08:45 AM',
    source: 'Agricultural Marketing Dept'
  },
  {
    id: 'mkt-6',
    crop: 'Red Gram',
    cropTe: 'కందులు',
    variety: 'Gajjala / Desi Red Gram',
    mandi: 'Tandur Mandi Yard (GI Tagged)',
    district: 'Vikarabad',
    state: 'Telangana',
    modalPrice: 9800,
    minPrice: 9100,
    maxPrice: 10250,
    changePercent: 1.5,
    trend: 'up',
    lastUpdated: 'Today, 10:15 AM',
    source: 'APMC Market Intelligence'
  }
];

// Seed Weather Condition with micro-advisories
export const SEED_WEATHER: WeatherCondition = {
  currentTemp: 31,
  feelsLike: 34,
  tempMin: 23,
  tempMax: 33,
  humidityPercent: 72,
  rainProbabilityPercent: 65,
  rainfallMm: 12,
  windSpeedKmh: 9,
  windDirection: 'South-West (SW)',
  uvIndex: 7,
  condition: 'Partly Cloudy',
  location: 'Narsampet, Warangal District, Telangana',
  farmAlerts: [
    {
      type: 'warning',
      title: 'Rain Expected Tomorrow Afternoon (65% Probability)',
      titleTe: 'రేపు మధ్యాహ్నం మోస్తరు వర్షం పడే అవకాశం (65% సంభావ్యత)',
      description: 'Review field irrigation plans and suspend borewell/canal watering. Avoid foliar chemical sprays within 24 hours of anticipated precipitation.',
      descriptionTe: 'పొలంలో నీటి తడులు ఆపండి. వర్షం పడే అవకాశం ఉన్నందున ఎలాంటి మందులు పిచికారీ చేయవద్దు.',
      action: 'Hold Irrigation & Sprays'
    },
    {
      type: 'info',
      title: 'High Humidity & Mild Night Temps (Favorable for Fungal Spores)',
      titleTe: 'అధిక తేమ మరియు చల్లని రాత్రి ఉష్ణోగ్రతలు (శిలీంద్రాల వ్యాప్తికి అనుకూలం)',
      description: 'Morning relative humidity > 70% creates favorable conditions for Alternaria leaf spot in cotton. Inspect underside of middle leaves regularly.',
      descriptionTe: 'తేమ ఎక్కువగా ఉన్నందున పత్తిలో ఆకుమచ్చ తెగులు ఆశించే అవకాశం ఉంది. ఆకుల కింద పరిశీలించండి.',
      action: 'Scout Crop Leaves'
    }
  ],
  forecast: [
    { day: 'Sun (Today)', dayTe: 'ఆదివారం', date: '01 Nov', maxTemp: 32, minTemp: 23, condition: 'Partly Cloudy', rainProb: 20, windSpeed: 9 },
    { day: 'Mon', dayTe: 'సోమవారం', date: '02 Nov', maxTemp: 30, minTemp: 22, condition: 'Light Rain', rainProb: 65, windSpeed: 14 },
    { day: 'Tue', dayTe: 'మంగళవారం', date: '03 Nov', maxTemp: 29, minTemp: 21, condition: 'Thunderstorm', rainProb: 75, windSpeed: 18 },
    { day: 'Wed', dayTe: 'బుధవారం', date: '04 Nov', maxTemp: 31, minTemp: 22, condition: 'Cloudy', rainProb: 30, windSpeed: 11 },
    { day: 'Thu', dayTe: 'గురువారం', date: '05 Nov', maxTemp: 32, minTemp: 23, condition: 'Sunny', rainProb: 10, windSpeed: 8 },
    { day: 'Fri', dayTe: 'శుక్రవారం', date: '06 Nov', maxTemp: 33, minTemp: 24, condition: 'Sunny', rainProb: 5, windSpeed: 7 },
    { day: 'Sat', dayTe: 'శనివారం', date: '07 Nov', maxTemp: 33, minTemp: 23, condition: 'Sunny', rainProb: 5, windSpeed: 8 }
  ]
};

// Seed Plant Disease Diagnoses (Calibrated reference samples)
export const SEED_DISEASE_SAMPLES: Record<string, PlantDiseaseDiagnosis> = {
  'cotton-leaf-curl': {
    id: 'diag-clcuv',
    cropDetected: 'Cotton (Gossypium hirsutum)',
    cropDetectedTe: 'పత్తి పంట',
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
    diseaseNameTe: 'పత్తి ఆకు ముడత వైరస్ తెగులు',
    confidenceScore: 94.6,
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    sampleKey: 'cotton-leaf-curl',
    symptoms: [
      'Upward and downward curling of leaf margins',
      'Thickening and swelling of main and secondary veins on the lower leaf surface',
      'Formation of cup-shaped leaf enations (leaf-like outgrowths) underneath',
      'Stunting of plant height and reduction in boll formation'
    ],
    symptomsTe: [
      'ఆకుల అంచులు పైకి లేదా కిందికి ముడుచుకుపోవడం',
      'ఆకు అడుగు భాగంలో ఈనెలు లావుగా ఉబ్బిపోవడం',
      'ఆకుల అడుగున చిన్న గిన్నె వంటి అదనపు ఆకు పొరలు ఏర్పడటం',
      'మొక్క ఎదగకుండా గిడసబారి పూత, కాత తగ్గిపోవడం'
    ],
    culturalPrevention: [
      'Uproot and safely burn severely infected plants during early vegetative growth to prevent field-wide vector spread.',
      'Control whitefly (Bemisia tabaci) vectors using yellow sticky traps @ 20 traps per acre.',
      'Eradicate weed hosts like Abutilon indicum and Xanthium strumarium around field bunds.'
    ],
    culturalPreventionTe: [
      'తీవ్రంగా తెగులు సోకిన మొక్కలను పీకి పొలం బయట నాశనం చేయండి.',
      'వైరస్ వ్యాప్తి చేసే తెల్లదోమ నివారణకు ఎకరాకు 20 పసుపు రంగు జిగురు బోర్డులను అమర్చండి.',
      'పొలం గట్లపై ఉన్న పిచ్చిమొక్కలు మరియు కలుపు మొక్కలను తొలగించండి.'
    ],
    organicRemedies: [
      'Foliar spray of 5% Neem Seed Kernel Extract (NSKE) or Cold Pressed Neem Oil (10,000 PPM) @ 4-5 ml/L.',
      'Spray sour buttermilk solution (250 ml sour curd + 100g asafoetida dissolved in 15L water) to enhance plant vigor.'
    ],
    organicRemediesTe: [
      '5% వేప గింజల కషాయం లేదా 10,000 PPM వేపనూనె లీటరు నీటికి 4-5 మి.లీ కలిపి పిచికారీ చేయండి.',
      'మొక్క రోగనిరోధక శక్తికి పుల్లటి మజ్జిగ ద్రావణం పిచికారీ చేయండి.'
    ],
    expertConsultationRecommended: true,
    disclaimer: 'This AI diagnosis provides agronomic guidance based on visual leaf characteristics. For registered chemical vector management, follow Central Insecticides Board & Registration Committee (CIBRC) approved labels and seek advice from your local Mandal Agricultural Officer.',
    suggestedInputCategories: ['Crop Protection', 'Organic Products']
  },
  'tomato-early-blight': {
    id: 'diag-eblight',
    cropDetected: 'Tomato (Solanum lycopersicum)',
    cropDetectedTe: 'టమాటా పంట',
    diseaseName: 'Early Blight (Alternaria solani)',
    diseaseNameTe: 'ఆల్టర్నేరియా ఆకుమచ్చ తెగులు (ఎర్లీ బ్లైట్)',
    confidenceScore: 92.4,
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=600&auto=format&fit=crop&q=80',
    sampleKey: 'tomato-early-blight',
    symptoms: [
      'Brown to dark brown circular spots with characteristic concentric rings (target-board appearance)',
      'Yellow chlorotic halos surrounding lesions on older bottom leaves',
      'Premature defoliation exposing fruit to sunscald'
    ],
    symptomsTe: [
      'ముదురు గోధుమ రంగు గుండ్రటి మచ్చలు, లక్ష్యపు వలయాలు (టార్గెట్ బోర్డు) మాదిరిగా కనిపించుట',
      'కింది ఆకులపై మచ్చల చుట్టూ పసుపు రంగు వలయం ఏర్పడటం',
      'ఆకులు ఎండి రాలిపోవడం'
    ],
    culturalPrevention: [
      'Ensure proper plant spacing and staking to maintain air circulation and reduce leaf wetness duration.',
      'Avoid overhead sprinkler irrigation; prefer root-zone drip irrigation.',
      'Practice crop rotation with non-solanaceous crops (e.g. maize, pulses) for 2-3 years.'
    ],
    culturalPreventionTe: [
      'మొక్కల మధ్య సరైన దూరం పాటించండి, గాలి ప్రసరణ బాగుండేలా చూడండి.',
      'స్ప్రింక్లర్లకు బదులుగా డ్రిప్ ద్వారా నీరందించండి.',
      'టమాటా తర్వాత పప్పుధాన్యాల వంటి ఇతర కుటుంబాల పంటలతో పంట మార్పిడి చేయండి.'
    ],
    organicRemedies: [
      'Seedling root dip with Trichoderma viride or Pseudomonas fluorescens @ 10g per litre.',
      'Bio-fungicide spray of Bacillus subtilis formulations at 5-7 day intervals.'
    ],
    organicRemediesTe: [
      'ట్రైకోడెర్మ విరిడి లేదా సూడోమోనాస్ తో నారు వేర్ల శుద్ధి చేయండి.',
      'బయో-శిలీంద్ర నాశినులను పిచికారీ చేయండి.'
    ],
    expertConsultationRecommended: false,
    disclaimer: 'Guidance only. Consult registered package of practices for region-specific dosage.',
    suggestedInputCategories: ['Crop Protection', 'Organic Products']
  },
  'paddy-blast': {
    id: 'diag-pblast',
    cropDetected: 'Paddy / Rice (Oryza sativa)',
    cropDetectedTe: 'వరి పంట',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    diseaseNameTe: 'వరి అగ్గితెగులు (బ్లాస్ట్)',
    confidenceScore: 96.1,
    severity: 'Severe',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80',
    sampleKey: 'paddy-blast',
    symptoms: [
      'Spindle-shaped or eye-shaped lesions with grayish-white centers and dark brown margins on leaves',
      'Lesions coalesce rapidly, causing whole leaf blades to dry and wither (burned appearance)',
      'In severe infections, collar rot and neck rot prevent grain filling causing chaffy panicles'
    ],
    symptomsTe: [
      'ఆకులపై కంటి ఆకారంలో నూలు కండె వంటి మచ్చలు (మధ్యలో బూడిద రంగు, అంచులు గోధుమ రంగు)',
      'మచ్చలు కలిసిపోయి ఆకులన్నీ కాలిపోయినట్లు ఎండిపోవడం',
      'వెన్ను విరిగి గింజ కట్టకుండా తాలుగా మారిపోవడం (మెడ విరుపు తెగులు)'
    ],
    culturalPrevention: [
      'Avoid excessive split doses of chemical Nitrogen fertilizers; maintain balanced N:P:K with adequate Potassium.',
      'Drain excess standing water temporarily and maintain intermittent irrigation.',
      'Use certified blast-resistant seed varieties such as BPT 5204 treated or MTU 1061.'
    ],
    culturalPreventionTe: [
      'యూరియా ఎరువును మోతాదుకు మించి వాడవద్దు. పొటాష్ ఎరువును తగినంతగా వాడండి.',
      'మడిలో నీరు నిల్వ ఉండకుండా మార్చి మార్చి నీరు పెట్టండి.',
      'తెగులును తట్టుకునే రకాలను ఎన్నుకోండి.'
    ],
    organicRemedies: [
      'Seed treatment with Pseudomonas fluorescens @ 10g/kg seed followed by nursery spray @ 5g/L.',
      'Foliar spray of 10% cow urine + neem extract decoction.'
    ],
    organicRemediesTe: [
      'సూడోమోనాస్ ఫ్లోరోసెన్స్ తో విత్తన శుద్ధి చేయండి.',
      'గోమూత్రం మరియు వేప ద్రావణం పిచికారీ చేయండి.'
    ],
    expertConsultationRecommended: true,
    disclaimer: 'Paddy blast causes rapid yield reduction if neck rot phase occurs. Consult local Krishi Vigyan Kendra immediately for emergency containment.',
    suggestedInputCategories: ['Crop Protection', 'Fertilizers']
  },
  'chilli-anthracnose': {
    id: 'diag-canth',
    cropDetected: 'Chilli (Capsicum annuum)',
    cropDetectedTe: 'మిరప పంట',
    diseaseName: 'Anthracnose / Fruit Rot & Dieback',
    diseaseNameTe: 'మిరప కొమ్మ ఎండు తెగులు మరియు కాయ కుళ్లు',
    confidenceScore: 91.8,
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80',
    sampleKey: 'chilli-anthracnose',
    symptoms: [
      'Circular, sunken necrotic spots on ripe red and developing green fruits',
      'Concentric rings of dark acervuli (fruiting bodies) inside fruit lesions',
      'Dieback of apical tender shoots drying from top downwards with black discoloration'
    ],
    symptomsTe: [
      'పచ్చి మరియు పండు మిరపకాయలపై నల్లటి గుండ్రటి గుంట పడిన మచ్చలు',
      'మచ్చలలో వలయాలుగా నల్లటి చుక్కలు ఏర్పడటం',
      'కొమ్మల పైభాగం నుండి కిందికి ఎండిపోవడం (కొమ్మ ఎండు తెగులు)'
    ],
    culturalPrevention: [
      'Collect and incinerate affected fruits and fallen leaves to deplete field inoculum.',
      'Ensure proper drainage to prevent waterlogging during monsoon showers.',
      'Harvest fruits promptly when ripe; avoid storing damp pods.'
    ],
    culturalPreventionTe: [
      'కుళ్లిన కాయలను ఏరివేసి పొలం బయట నాశనం చేయండి.',
      'మురుగు నీరు నిలవకుండా డ్రైనేజ్ కాలువలు తీయండి.',
      'పండిన కాయలను వెంటనే కోసి ఆరబెట్టండి.'
    ],
    organicRemedies: [
      'Spray Panchagavya 3% or fermented buttermilk spray (300 ml in 15L water).',
      'Spray Trichoderma viride enriched compost tea.'
    ],
    organicRemediesTe: [
      '3% పంచగవ్య లేదా పుల్లటి మజ్జిగ ద్రావణం పిచికారీ చేయండి.',
      'ట్రైకోడెర్మ విరిడి కలిపిన కషాయం వాడండి.'
    ],
    expertConsultationRecommended: true,
    disclaimer: 'Educational recommendation only. Adhere to statutory label guidelines.',
    suggestedInputCategories: ['Crop Protection']
  },
  'healthy-cotton': {
    id: 'diag-healthy',
    cropDetected: 'Cotton (Gossypium hirsutum)',
    cropDetectedTe: 'పత్తి పంట',
    diseaseName: 'Healthy Crop Foliage (Optimal Vigor)',
    diseaseNameTe: 'ఆరోగ్యకరమైన ఆకులు (తెగుళ్లు లేవు)',
    confidenceScore: 98.7,
    severity: 'Healthy',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&auto=format&fit=crop&q=80',
    sampleKey: 'healthy-cotton',
    symptoms: [
      'No pathological lesions or insect punctures detected',
      'Optimal leaf chlorophyll levels with rich deep green hue',
      'Good canopy expansion and vigorous apical growth'
    ],
    symptomsTe: [
      'ఎలాంటి మచ్చలు లేదా పురుగుల దాడి కానరాలేదు',
      'ఆకులు ముదురు ఆకుపచ్చ రంగుతో ఆరోగ్యకరంగా ఉన్నాయి',
      'ఎదుగుదల మరియు కొమ్మల విస్తరణ సజావుగా సాగుతోంది'
    ],
    culturalPrevention: [
      'Continue current balanced nutrition and drip schedule.',
      'Maintain regular weekly field inspection for early sucking pest detection.',
      'Keep field borders weed-free.'
    ],
    culturalPreventionTe: [
      'ప్రస్తుత నీటి తడులు మరియు ఎరువుల యాజమాన్యాన్ని కొనసాగించండి.',
      'వారానికి ఒకసారి పొలంలో పురుగుల పరిశీలన చేయండి.',
      'పొలం గట్లను శుభ్రంగా ఉంచండి.'
    ],
    organicRemedies: [
      'Prophylactic spray of Neem oil (5ml/L) every 15 days keeps sucking insects below economic threshold.'
    ],
    organicRemediesTe: [
      'ముందస్తు జాగ్రత్తగా 15 రోజులకు ఒకసారి వేపనూనె పిచికారీ చేయండి.'
    ],
    expertConsultationRecommended: false,
    disclaimer: 'Foliage appears robust and healthy. Continue standard agronomic schedule.',
    suggestedInputCategories: ['Fertilizers']
  }
};

// Seed Expert Consultations
export const SEED_CONSULTATIONS: ExpertConsultation[] = [
  {
    id: 'consult-1',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Kumar',
    farmerPhone: '+91 98480 12345',
    farmerLocation: 'Narsampet, Warangal',
    crop: 'Cotton',
    cropTe: 'పత్తి',
    issueCategory: 'Pest / Disease',
    question: 'My cotton leaves in Zone A are showing slight upward cupping and lower veins are thickening. Is this leaf curl virus or thrips feeding? Please guide on immediate steps.',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    status: 'Answered',
    createdAt: '2026-10-28T14:20:00Z',
    expertResponse: {
      expertId: 'user-expert-1',
      expertName: 'Dr. K. Srinivas Rao, Ph.D.',
      expertTitle: 'Senior Agronomist, Krishi Vigyan Kendra',
      responseDate: '2026-10-29T10:30:00Z',
      diagnosisSummary: 'The visual symptoms indicate early feeding injury by Whitefly vectors, coupled with early Leaf Curl symptoms.',
      recommendations: [
        'Erect 20 Yellow Sticky Traps per acre immediately at canopy height to monitor and trap adult whiteflies.',
        'Apply systemic vector control spray with registered formulation in early morning hours.',
        'Avoid excessive urea (nitrogen) application as soft succulent leaves attract heavy pest colonies.',
        'Follow up with a 5% Neem Seed Kernel Extract (NSKE) spray after 10 days.'
      ],
      preventiveGuidance: 'Keep field borders free from malvaceous weeds (like Abutilon/Thutti) that harbor virus inoculum during season breaks.'
    }
  },
  {
    id: 'consult-2',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Kumar',
    farmerPhone: '+91 98480 12345',
    farmerLocation: 'Narsampet, Warangal',
    crop: 'Chilli',
    cropTe: 'మిరప',
    issueCategory: 'Nutrient Deficiency',
    question: 'Chilli seedlings in Zone B show slight yellowing between veins of older leaves. What foliar micronutrient should I spray?',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80',
    status: 'Pending',
    createdAt: '2026-10-31T16:00:00Z'
  }
];

// Seed Community Posts
export const SEED_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-farmer-1',
    authorName: 'Ramesh Kumar',
    authorRole: 'Progressive Cotton & Chilli Farmer',
    authorVillage: 'Narsampet, Warangal',
    content: 'Switched to drip fertigation with water-soluble 19:19:19 this season for my cotton crop. Boll retention is remarkably better than last year, and water usage is down by nearly 40%. Highly encourage fellow farmers in Warangal to try drip subsidies!',
    cropTag: 'Cotton',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&auto=format&fit=crop&q=80',
    likesCount: 38,
    likedByCurrentUser: false,
    commentsCount: 6,
    comments: [
      {
        id: 'c-1',
        authorName: 'Venkatesh Rao (Farmer, Parkal)',
        text: 'Which drip lateral spacing are you using Ramesh garu? Did you get the TS Micro-Irrigation subsidy?',
        timestamp: 'Yesterday'
      },
      {
        id: 'c-2',
        authorName: 'Dr. K. Srinivas Rao (Agronomist)',
        text: 'Excellent observation Ramesh. Drip fertigation ensures nutrients reach the feeder root zone without volatilization losses.',
        timestamp: '18 hours ago'
      }
    ],
    createdAt: '2 days ago'
  },
  {
    id: 'post-2',
    authorId: 'user-expert-1',
    authorName: 'Dr. K. Srinivas Rao, Ph.D.',
    authorRole: 'Senior Agronomist, KVK',
    authorVillage: 'Malyal KVK, Mahabubabad',
    content: '⚠️ Krishi Vigyan Advisory: With light thunderstorms predicted across Warangal, Khammam, and Karimnagar districts over the next 48 hours, farmers must clear choked field drainage channels. Water stagnation for > 24 hours in black soils causes root suffocation in cotton.',
    cropTag: 'Weather Advisory',
    likesCount: 84,
    likedByCurrentUser: true,
    commentsCount: 12,
    comments: [
      {
        id: 'c-3',
        authorName: 'Lakshmi Devi (Farmer)',
        text: 'Thank you Sir for the timely advisory. We cleared our drainage bunds today.',
        timestamp: '12 hours ago'
      }
    ],
    createdAt: 'Yesterday'
  }
];

// Seed Government Schemes
export const SEED_GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'scheme-pmkisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    nameTe: 'పీఎం కిసాన్ సమ్మాన్ నిధి పథకం',
    shortDesc: 'Direct income support of ₹6,000 per year in three equal 4-monthly installments of ₹2,000 directly transferred into the Aadhaar-linked bank accounts of landholder farmer families.',
    shortDescTe: 'రైతు కుటుంబాలకు ప్రతి 4 నెలలకు ఒకసారి ₹2,000 చొప్పున ఏడాదికి మొత్తం ₹6,000 నేరుగా బ్యాంకు ఖాతాలో జమ చేసే కేంద్ర ప్రభుత్వ పథకం.',
    eligibility: [
      'All landholding farmer families with cultivable land in their names.',
      'Valid Aadhaar card linked with active bank account and NPCI DBT mapping.',
      'Excludes institutional landholders and income tax paying individuals.'
    ],
    eligibilityTe: [
      'తమ పేరు మీద సాగు భూమి గల రైతులందరూ అర్హులు.',
      'ఆధార్ కార్డు మరియు బ్యాంక్ ఖాతా లింక్ అయి ఉండాలి.',
      'ఆదాయ పన్ను చెల్లించేవారు మరియు ప్రభుత్వ ఉద్యోగులు మినహాయింపు.'
    ],
    benefits: '₹6,000 per financial year in 3 installments (April-July, August-November, December-March).',
    benefitsTe: 'సంవత్సరానికి ₹6,000 మూడు విడతలలో లభిస్తుంది.',
    howToApply: 'Register online via pmkisan.gov.in or through nearest CSC (Common Service Center) with land passbook (Pattadar Passbook) and Aadhaar.',
    howToApplyTe: 'pmkisan.gov.in వెబ్‌సైట్ ద్వారా లేదా మీ సేవా / CSC కేంద్రాలలో పట్టాదారు పాస్‌బుక్, ఆధార్ కార్డుతో నమోదు చేసుకోండి.',
    officialSource: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
    sourceUrl: 'https://pmkisan.gov.in',
    lastUpdated: '15 October 2026'
  },
  {
    id: 'scheme-rythubharosa',
    name: 'Rythu Bharosa / Investment Support Scheme',
    nameTe: 'రైతు భరోసా పంట పెట్టుబడి సహాయ పథకం',
    shortDesc: 'Input investment support provided directly to farmers per acre per year for purchasing certified quality seeds, fertilizers, and agricultural inputs before the cropping season.',
    shortDescTe: 'ఖరీఫ్ మరియు రబీ సీజన్ల ప్రారంభంలో విత్తనాలు, ఎరువుల కొనుగోలుకు ప్రభుత్వం ఎకరాకు అందించే పెట్టుబడి సహాయం.',
    eligibility: [
      'Pattadar farmers owning agricultural land verified in CCLA records.',
      'Tenant farmers enrolled under special livelihood credit cards / ROFR patta holders.'
    ],
    eligibilityTe: [
      'ధరణి / భూ రికార్డులలో నమోదైన పట్టాదారు రైతులు.',
      'ప్రత్యేక గుర్తింపు కార్డులు గల అర్హులైన కౌలు రైతులు.'
    ],
    benefits: 'Up to ₹10,000 - ₹15,000 per acre per year credited in two seasonal tranches.',
    benefitsTe: 'ఎకరాకు సంవత్సరానికి ₹10,000 నుండి ₹15,000 వరకు పెట్టుబడి సాయం.',
    howToApply: 'Automatic verification through Village Agricultural Officers (AEO/VAO) based on updated digital land records.',
    howToApplyTe: 'గ్రామ వ్యవసాయ సహాయకులు (AEO) ద్వారా ధరణి భూ రికార్డుల ఆధారంగా నేరుగా ధృవీకరణ.',
    officialSource: 'Department of Agriculture, State Government',
    sourceUrl: 'https://rythubharosa.telangana.gov.in',
    lastUpdated: '20 September 2026'
  },
  {
    id: 'scheme-pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    nameTe: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన (పంటల బీమా)',
    shortDesc: 'Comprehensive crop insurance covering non-preventable natural risks (drought, flood, unseasonal storm, pest epidemic) from pre-sowing to post-harvest stages.',
    shortDescTe: 'కరువు, వరదలు, అకాల వర్షాలు మరియు తెగుళ్ల వల్ల పంట నష్టం జరిగితే ఆర్థిక భరోసా కల్పించే సమగ్ర పంట బీమా పథకం.',
    eligibility: [
      'All farmers cultivating notified crops in notified insurance units.',
      'Both loanee farmers and non-loanee farmers are equally eligible.'
    ],
    eligibilityTe: [
      'నోటిఫై చేయబడిన పంటలు సాగు చేసే రైతులందరూ అర్హులు.',
      'రుణం తీసుకున్న మరియు తీసుకోని రైతులు కూడా దరఖాస్తు చేసుకోవచ్చు.'
    ],
    benefits: 'Ultra-low premium: only 2% for Kharif food/oilseeds, 1.5% for Rabi, and 5% for commercial/horticultural crops with 100% claim settlement against yield losses.',
    benefitsTe: 'రైతు కేవలం 1.5% నుండి 2% ప్రీమియం చెల్లిస్తే సరిపోతుంది. నష్టపరిహారం నేరుగా అందుతుంది.',
    howToApply: 'Enroll through designated banks, crop insurance portal (pmfby.gov.in), or CSC centers before cut-off date for each season.',
    howToApplyTe: 'pmfby.gov.in లేదా మీ బ్యాంక్ బ్రాంచ్ ద్వారా కటాఫ్ తేదీ లోగా దరఖాస్తు చేయండి.',
    officialSource: 'Ministry of Agriculture, Govt of India',
    sourceUrl: 'https://pmfby.gov.in',
    lastUpdated: '10 August 2026'
  },
  {
    id: 'scheme-soilhealth',
    name: 'Soil Health Card Scheme',
    nameTe: 'సాయిల్ హెల్త్ కార్డు పథకం (నేల ఆరోగ్య పరీక్ష)',
    shortDesc: 'Issue of comprehensive nutrient assessment cards to farmers every 2 years indicating status of 12 soil parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) with customized fertilizer dosages.',
    shortDescTe: 'రైతుల పొలాల నుండి మట్టి నమూనాలు సేకరించి 12 రకాల పోషకాలను పరీక్షించి ఉచితంగా సాయిల్ హెల్త్ కార్డు అందించే పథకం.',
    eligibility: [
      'Every agricultural landholding farmer across all states and districts.'
    ],
    eligibilityTe: [
      'వ్యవసాయ భూమి ఉన్న రైతులందరూ ఉచితంగా మట్టి పరీక్ష చేయించుకోవచ్చు.'
    ],
    benefits: 'Prevents wasteful over-fertilization, saves ₹2,000 - ₹3,500 per acre in chemical input costs, and restores natural soil fertility.',
    benefitsTe: 'అనవసర ఎరువుల ఖర్చు తగ్గుతుంది, ఎకరాకు ₹2,000 - ₹3,500 ఆదా అవుతుంది.',
    howToApply: 'Contact Village Agricultural Extension Officer (AEO) during summer months for soil sample collection.',
    howToApplyTe: 'వేసవి కాలంలో స్థానిక వ్యవసాయ విస్తరణ అధికారి (AEO)ని సంప్రదించండి.',
    officialSource: 'National Soil Health Portal, Govt of India',
    sourceUrl: 'https://soilhealth.dac.gov.in',
    lastUpdated: '05 July 2026'
  }
];

// Seed Knowledge Hub Articles
export const SEED_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art-1',
    title: 'Integrated Pest Management (IPM) in Bt Cotton',
    titleTe: 'బిటి పత్తిలో సమగ్ర సస్యరక్షణ యాజమాన్యం',
    category: 'Pest Management',
    summary: 'A step-by-step scientific guide on managing pink bollworm, thrips, and aphids using cultural traps, bio-pesticides, and economic threshold levels (ETL).',
    summaryTe: 'గులాబీ రంగు కాయతొలుచు పురుగు, తామర పురుగుల నివారణకు సమగ్ర శాస్త్రీయ పద్ధతులు.',
    content: 'Bt cotton provides internal protection against American bollworm, but sucking pests and late-season pink bollworm require dedicated vigilance. Install 8 pheromone traps per acre at 45 days after sowing...',
    readTimeMinutes: 5,
    author: 'Dr. K. Srinivas Rao, Senior Agronomist',
    publishedDate: '2026-08-10',
    lastUpdated: '2026-09-15',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'art-2',
    title: 'Drip Fertigation Schedules for High-Density Chilli',
    titleTe: 'సాంద్ర పద్ధతిలో మిరప సాగుకు బిందు సేద్య ఎరువుల యాజమాన్యం',
    category: 'Drip Irrigation',
    summary: 'Optimize fertilizer efficiency by dissolving 19:19:19 and potassium nitrate directly into drip lines at vegetative, flowering, and fruit development intervals.',
    summaryTe: 'నీటిలో కరిగే ఎరువులను డ్రిప్ ద్వారా అందించి మిరపలో నాణ్యమైన కాయలు మరియు అధిక దిగుబడి సాధించే విధానం.',
    content: 'Drip irrigation maintains 60-70% root zone moisture without waterlogging. Split nutrient application into weekly fertigation shots...',
    readTimeMinutes: 6,
    author: 'Prof. M. Venkateswarlu, Water Technology Centre',
    publishedDate: '2026-07-22',
    lastUpdated: '2026-08-30',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'art-3',
    title: 'Restoring Organic Carbon in Degraded Black Soils',
    titleTe: 'నల్లరేగడి నేలల్లో సేంద్రీయ కర్బనం పెంపొందించే మార్గాలు',
    category: 'Soil Management',
    summary: 'Learn how summer green manuring with Sunnhemp (Janumu) and Dhaincha (Jeeluga) elevates microbial biomass and water retention capacity.',
    summaryTe: 'పచ్చిరొట్ట ఎరువుల సాగు మరియు పశువుల ఎరువులతో భూసారాన్ని ఎలా కాపాడుకోవచ్చో వివరణ.',
    content: 'Continuous mono-cropping and chemical fertilization deplete organic carbon below 0.5%. Sowing Dhaincha with pre-monsoon showers and plowing it in at 45 days adds 8-10 tonnes of organic biomass per hectare...',
    readTimeMinutes: 4,
    author: 'Soil Science Division, KVK',
    publishedDate: '2026-06-05',
    lastUpdated: '2026-06-18',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80'
  }
];

// Seed Notifications
export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-farmer-1',
    type: 'weather',
    title: 'Rain Forecast Alert',
    titleTe: 'వర్ష సూచన హెచ్చరిక',
    message: 'Rain expected tomorrow afternoon. Hold irrigation in Zone A and Zone B.',
    messageTe: 'రేపు మధ్యాహ్నం వర్షం పడే అవకాశం ఉంది. పొలానికి నీటి తడులు ఆపండి.',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/weather'
  },
  {
    id: 'notif-2',
    userId: 'user-farmer-1',
    type: 'order',
    title: 'Order Ready for Pickup',
    titleTe: 'ఆర్డర్ సిద్ధంగా ఉంది',
    message: 'Order #AGRO-ORD-2026-8910 is packed and ready for pickup at Sri Balaji Agro Agencies.',
    messageTe: 'మీ ఆర్డర్ శ్రీ బాలాజీ ఆగ్రో ఏజెన్సీస్ లో తీసుకోవడానికి సిద్ధంగా ఉంది.',
    timestamp: '5 hours ago',
    read: false,
    actionUrl: '/orders'
  },
  {
    id: 'notif-3',
    userId: 'user-farmer-1',
    type: 'expert',
    title: 'Expert Dr. Srinivas Rao Replied',
    titleTe: 'శాస్త్రవేత్త శ్రీనివాసరావు గారు సమాధానం ఇచ్చారు',
    message: 'Your query on Cotton leaf curling in Zone A has received an agronomy assessment.',
    messageTe: 'మీ పత్తి ఆకు ముడత ప్రశ్నకు నిపుణుల సలహా అందింది.',
    timestamp: '1 day ago',
    read: true,
    actionUrl: '/ask-expert'
  }
];

// Storage Engine Class
class StorageService {
  public get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(`agromitra_${key}`);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  public set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`agromitra_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to save key ${key} to storage`, e);
    }
  }

  // Current Auth User
  getCurrentUser(): User {
    return this.get<User>('current_user', SEED_USERS[0]);
  }

  setCurrentUser(user: User): void {
    this.set('current_user', user);
  }

  // Users List
  getUsers(): User[] {
    return this.get<User[]>('users', SEED_USERS);
  }

  // Farms
  getFarms(): Farm[] {
    return this.get<Farm[]>('farms', SEED_FARMS);
  }

  saveFarm(farm: Farm): void {
    const farms = this.getFarms();
    const index = farms.findIndex(f => f.id === farm.id);
    if (index >= 0) {
      farms[index] = farm;
    } else {
      farms.unshift(farm);
    }
    this.set('farms', farms);
  }

  deleteFarm(id: string): void {
    const farms = this.getFarms().filter(f => f.id !== id);
    this.set('farms', farms);
  }

  // Crops
  getCrops(): Crop[] {
    return this.get<Crop[]>('crops', SEED_CROPS);
  }

  saveCrop(crop: Crop): void {
    const crops = this.getCrops();
    const index = crops.findIndex(c => c.id === crop.id);
    if (index >= 0) {
      crops[index] = crop;
    } else {
      crops.unshift(crop);
    }
    this.set('crops', crops);
  }

  // Activities
  getActivities(): CropActivity[] {
    return this.get<CropActivity[]>('activities', SEED_ACTIVITIES);
  }

  toggleActivity(id: string): void {
    const activities = this.getActivities();
    const act = activities.find(a => a.id === id);
    if (act) {
      act.completed = !act.completed;
      act.completedAt = act.completed ? new Date().toISOString() : undefined;
      this.set('activities', activities);
    }
  }

  addActivity(activity: CropActivity): void {
    const activities = this.getActivities();
    activities.push(activity);
    this.set('activities', activities);
  }

  // Soil Reports
  getSoilReports(): SoilReport[] {
    return this.get<SoilReport[]>('soil_reports', SEED_SOIL_REPORTS);
  }

  // Products
  getProducts(): Product[] {
    return this.get<Product[]>('products', SEED_PRODUCTS);
  }

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    this.set('products', products);
  }

  // Shops
  getShops(): Shop[] {
    return this.get<Shop[]>('shops', SEED_SHOPS);
  }

  // Orders
  getOrders(): Order[] {
    return this.get<Order[]>('orders', SEED_ORDERS);
  }

  saveOrder(order: Order): void {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === order.id);
    if (index >= 0) {
      orders[index] = order;
    } else {
      orders.unshift(order);
    }
    this.set('orders', orders);
  }

  // Expenses
  getExpenses(): FarmExpense[] {
    return this.get<FarmExpense[]>('expenses', SEED_EXPENSES);
  }

  addExpense(expense: FarmExpense): void {
    const expenses = this.getExpenses();
    expenses.unshift(expense);
    this.set('expenses', expenses);
  }

  // Consultations
  getConsultations(): ExpertConsultation[] {
    return this.get<ExpertConsultation[]>('consultations', SEED_CONSULTATIONS);
  }

  addConsultation(consultation: ExpertConsultation): void {
    const list = this.getConsultations();
    list.unshift(consultation);
    this.set('consultations', list);
  }

  answerConsultation(id: string, response: NonNullable<ExpertConsultation['expertResponse']>): void {
    const list = this.getConsultations();
    const item = list.find(c => c.id === id);
    if (item) {
      item.status = 'Answered';
      item.expertResponse = response;
      this.set('consultations', list);
    }
  }

  // Community
  getCommunityPosts(): CommunityPost[] {
    return this.get<CommunityPost[]>('community_posts', SEED_COMMUNITY_POSTS);
  }

  toggleLikePost(postId: string): void {
    const posts = this.getCommunityPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.likedByCurrentUser = !post.likedByCurrentUser;
      post.likesCount += post.likedByCurrentUser ? 1 : -1;
      this.set('community_posts', posts);
    }
  }

  addCommunityPost(post: CommunityPost): void {
    const posts = this.getCommunityPosts();
    posts.unshift(post);
    this.set('community_posts', posts);
  }

  // Notifications
  getNotifications(): NotificationItem[] {
    return this.get<NotificationItem[]>('notifications', SEED_NOTIFICATIONS);
  }

  markNotificationAsRead(id: string): void {
    const notifs = this.getNotifications();
    const n = notifs.find(item => item.id === id);
    if (n) {
      n.read = true;
      this.set('notifications', notifs);
    }
  }

  // Reset to factory demo data
  resetDemoData(): void {
    localStorage.clear();
  }
}

export const storage = new StorageService();
