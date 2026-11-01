import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { storage } from './services/storage';

// Types
import { Farm, Crop, CropActivity, SoilReport, FarmExpense, FarmFinancialSummary } from './types/farm';
import { Product, Order, ProductCategory } from './types/store';
import { MarketPrice, WeatherCondition, ExpertConsultation, CommunityPost, GovernmentScheme, KnowledgeArticle } from './types/market';
import { User, Shop, UserRole } from './types/user';

// Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FarmerSidebar } from './components/farmer/FarmerSidebar';
import { DigitalFarmMap } from './components/farmer/DigitalFarmMap';
import { CropLifecycleTimeline } from './components/farmer/CropLifecycleTimeline';
import { SoilHealthCard } from './components/farmer/SoilHealthCard';
import { ExpensePnlTracker } from './components/farmer/ExpensePnlTracker';
import { WeatherView } from './components/farmer/WeatherView';
import { FarmingCalendarView } from './components/farmer/FarmingCalendarView';
import { CropRotationPlanner } from './components/farmer/CropRotationPlanner';
import { MarketPricesView } from './components/farmer/MarketPricesView';
import { AskExpertView } from './components/farmer/AskExpertView';
import { CommunityView } from './components/farmer/CommunityView';
import { GovernmentSchemesView } from './components/farmer/GovernmentSchemesView';

// Store Components
import { ProductCard } from './components/store/ProductCard';
import { ProductDetailsModal } from './components/store/ProductDetailsModal';
import { SeedComparisonView } from './components/store/SeedComparisonView';
import { LocalShopFinder } from './components/store/LocalShopFinder';
import { CartView } from './components/store/CartView';
import { OrderTrackingView } from './components/store/OrderTrackingView';

// AI Components
import { DiseaseDetectionView } from './components/ai/DiseaseDetectionView';
import { CropRecommendationView } from './components/ai/CropRecommendationView';
import { AIAssistantChat } from './components/ai/AIAssistantChat';

// Dashboards
import { ShopDashboardView } from './components/shop/ShopDashboardView';
import { ExpertDashboardView } from './components/expert/ExpertDashboardView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { LandingPage } from './pages/public/LandingPage';
import { FarmerDashboardPage } from './pages/farmer/FarmerDashboardPage';

// Icons
import { 
  Tractor, 
  Sprout, 
  Store, 
  Search, 
  Plus, 
  Filter, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  Users2, 
  Info,
  CheckCircle2,
  Trash2
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { user, role, switchRole } = useAuth();
  const { t, language } = useLanguage();
  const { showToast } = useNotification();

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<string>('landing');

  // Application Data States synchronized with storage
  const [farms, setFarms] = useState<Farm[]>(() => storage.getFarms());
  const [crops, setCrops] = useState<Crop[]>(() => storage.getCrops());
  const [activities, setActivities] = useState<CropActivity[]>(() => storage.getActivities());
  const [soilReports, setSoilReports] = useState<SoilReport[]>(() => storage.getSoilReports());
  const [products, setProducts] = useState<Product[]>(() => storage.getProducts());
  const [shops, setShops] = useState<Shop[]>(() => storage.getShops());
  const [orders, setOrders] = useState<Order[]>(() => storage.getOrders());
  const [expenses, setExpenses] = useState<FarmExpense[]>(() => storage.getExpenses());
  const [consultations, setConsultations] = useState<ExpertConsultation[]>(() => storage.getConsultations());
  const [posts, setPosts] = useState<CommunityPost[]>(() => storage.getCommunityPosts());
  const [users, setUsers] = useState<User[]>(() => storage.getUsers());
  const [schemes, setSchemes] = useState<GovernmentScheme[]>(() => storage.get<GovernmentScheme[]>('schemes', []));

  // Store filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [storeSearch, setStoreSearch] = useState<string>('');
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  // Expert escalation pre-fill state
  const [expertPrefill, setExpertPrefill] = useState<{ crop: string; question: string; image?: string } | null>(null);

  // Modal for adding a new farm parcel
  const [showAddFarmModal, setShowAddFarmModal] = useState(false);
  const [newFarmName, setNewFarmName] = useState('');
  const [newFarmAcres, setNewFarmAcres] = useState('3.0');
  const [newFarmSoil, setNewFarmSoil] = useState<Farm['soilType']>('Black Soil');
  const [newFarmIrrigation, setNewFarmIrrigation] = useState<Farm['irrigationType']>('Drip');

  // Modal for adding a new crop
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [newCropName, setNewCropName] = useState('Groundnut');
  const [newCropVariety, setNewCropVariety] = useState('Kadiri 6 (Bold)');
  const [newCropAcres, setNewCropAcres] = useState('1.5');

  // Data reload trigger helper
  const reloadData = () => {
    setFarms(storage.getFarms());
    setCrops(storage.getCrops());
    setActivities(storage.getActivities());
    setSoilReports(storage.getSoilReports());
    setProducts(storage.getProducts());
    setShops(storage.getShops());
    setOrders(storage.getOrders());
    setExpenses(storage.getExpenses());
    setConsultations(storage.getConsultations());
    setPosts(storage.getCommunityPosts());
    setUsers(storage.getUsers());
  };

  // Weather data
  const weatherData = storage.get<WeatherCondition>('weather', {
    currentTemp: 31,
    feelsLike: 34,
    tempMin: 23,
    tempMax: 33,
    humidityPercent: 72,
    rainProbabilityPercent: 65,
    rainfallMm: 12,
    windSpeedKmh: 9,
    windDirection: 'South-West',
    uvIndex: 7,
    condition: 'Partly Cloudy',
    location: 'Narsampet, Warangal, Telangana',
    farmAlerts: [
      {
        type: 'warning',
        title: 'Rain Expected Tomorrow Afternoon (65% Probability)',
        titleTe: 'రేపు మధ్యాహ్నం మోస్తరు వర్షం పడే అవకాశం (65% సంభావ్యత)',
        description: 'Review field irrigation plans and suspend borewell/canal watering. Avoid foliar chemical sprays within 24 hours of precipitation.',
        descriptionTe: 'పొలంలో నీటి తడులు ఆపండి. ఎలాంటి మందులు పిచికారీ చేయవద్దు.',
        action: 'Hold Irrigation & Sprays'
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
  });

  // Historical Financial summaries
  const financialHistory: FarmFinancialSummary[] = [
    { season: 'Kharif', year: 2024, crop: 'Cotton', acres: 4.5, totalExpenses: 78000, costPerAcre: 17333, yieldQuintals: 36, sellingPricePerQuintal: 6900, totalRevenue: 248400, netProfit: 170400, profitPerAcre: 37866 },
    { season: 'Kharif', year: 2025, crop: 'Cotton & Chilli', acres: 4.5, totalExpenses: 86500, costPerAcre: 19222, yieldQuintals: 42, sellingPricePerQuintal: 7200, totalRevenue: 302400, netProfit: 215900, profitPerAcre: 47977 },
    { season: 'Kharif (Current Season Est.)', year: 2026, crop: 'Cotton & Chilli', acres: 4.5, totalExpenses: 44356, costPerAcre: 9856, yieldQuintals: 48, sellingPricePerQuintal: 7250, totalRevenue: 348000, netProfit: 303644, profitPerAcre: 67476 }
  ];

  // Market Prices
  const marketPrices: MarketPrice[] = storage.get<MarketPrice[]>('market_prices', [
    { id: 'mkt-1', crop: 'Cotton', cropTe: 'పత్తి', variety: 'Medium & Long Staple (Bt)', mandi: 'Warangal Enamamula Market Yard', district: 'Warangal', state: 'Telangana', modalPrice: 7250, minPrice: 6800, maxPrice: 7480, changePercent: 2.1, trend: 'up', lastUpdated: 'Today, 11:30 AM', source: 'TS Agricultural Marketing Board & AGMARKNET' },
    { id: 'mkt-2', crop: 'Chilli', cropTe: 'మిరప', variety: 'Teja Supreme (Red Dry)', mandi: 'Khammam Agricultural Market', district: 'Khammam', state: 'Telangana', modalPrice: 18400, minPrice: 16500, maxPrice: 19200, changePercent: 3.4, trend: 'up', lastUpdated: 'Today, 10:45 AM', source: 'State Mandi Price Bulletin' },
    { id: 'mkt-3', crop: 'Paddy', cropTe: 'వరి', variety: 'BPT 5204 (Samba Masuri Fine)', mandi: 'Nizamabad Mandi Yard', district: 'Nizamabad', state: 'Telangana', modalPrice: 2320, minPrice: 2183, maxPrice: 2450, changePercent: 0.8, trend: 'up', lastUpdated: 'Today, 09:30 AM', source: 'Civil Supplies & Mandi Cell' },
    { id: 'mkt-4', crop: 'Maize', cropTe: 'మొక్కజొన్న', variety: 'Yellow Hybrid Commercial', mandi: 'Warangal Enamamula Market Yard', district: 'Warangal', state: 'Telangana', modalPrice: 2240, minPrice: 2100, maxPrice: 2300, changePercent: -0.5, trend: 'down', lastUpdated: 'Today, 11:00 AM', source: 'AGMARKNET Daily Bulletin' },
    { id: 'mkt-5', crop: 'Groundnut', cropTe: 'వేరుశెనగ', variety: 'Pod Bold Quality', mandi: 'Mahabubnagar Market Yard', district: 'Mahabubnagar', state: 'Telangana', modalPrice: 6450, minPrice: 5900, maxPrice: 6720, changePercent: 1.2, trend: 'up', lastUpdated: 'Today, 08:45 AM', source: 'Agricultural Marketing Dept' },
    { id: 'mkt-6', crop: 'Red Gram', cropTe: 'కందులు', variety: 'Gajjala / Desi Red Gram', mandi: 'Tandur Mandi Yard (GI Tagged)', district: 'Vikarabad', state: 'Telangana', modalPrice: 9800, minPrice: 9100, maxPrice: 10250, changePercent: 1.5, trend: 'up', lastUpdated: 'Today, 10:15 AM', source: 'APMC Market Intelligence' }
  ]);

  // Handle Add Farm
  const handleAddFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmName.trim()) return;

    const newFarm: Farm = {
      id: `farm-${Date.now()}`,
      farmerId: user?.id || 'user-farmer-1',
      farmName: newFarmName,
      village: 'Narsampet Rural',
      district: 'Warangal',
      state: 'Telangana',
      totalAcres: Number(newFarmAcres),
      soilType: newFarmSoil,
      irrigationType: newFarmIrrigation,
      waterSource: 'Borewell',
      currentCrop: 'Cotton',
      cropVariety: 'Rasi 659',
      sowingDate: '2026-06-25',
      zones: [
        {
          id: `z-${Date.now()}-1`,
          name: 'Zone A',
          acres: Number(newFarmAcres),
          cropName: 'Cotton',
          cropVariety: 'Rasi 659',
          color: '#2E7D32',
          soilMoisturePercent: 65,
          healthIndex: 'Optimal'
        }
      ],
      createdAt: new Date().toISOString()
    };

    storage.saveFarm(newFarm);
    reloadData();
    setShowAddFarmModal(false);
    showToast('success', 'Farm Parcel Created', `${newFarmName} (${newFarmAcres} Acres) registered.`);
  };

  // Handle Add Crop
  const handleAddCrop = (e: React.FormEvent) => {
    e.preventDefault();
    const newCrop: Crop = {
      id: `crop-${Date.now()}`,
      farmId: farms[0]?.id || 'farm-1',
      name: newCropName,
      nameTe: newCropName,
      variety: newCropVariety,
      sowingDate: new Date().toISOString().split('T')[0],
      estimatedHarvestDate: '2026-12-15',
      acres: Number(newCropAcres),
      currentStage: 'Sowing',
      stageProgressPercent: 5,
      daysSinceSowing: 1,
      totalDurationDays: 120,
      healthStatus: 'Good',
      targetYieldQuintals: 16
    };

    storage.saveCrop(newCrop);
    reloadData();
    setShowAddCropModal(false);
    showToast('success', 'Crop Registered', `${newCropName} (${newCropVariety}) logged in farm parcels.`);
  };

  // Farmer sub-tabs list
  const isFarmerTab = [
    'farmer-dashboard',
    'my-farms',
    'digital-map',
    'crops',
    'crop-recommendation',
    'disease-detection',
    'ai-assistant',
    'weather-view',
    'farming-calendar',
    'soil-health',
    'store',
    'seed-compare',
    'nearby-shops',
    'cart',
    'orders',
    'expenses',
    'profit-loss',
    'farm-history',
    'crop-rotation',
    'market-prices',
    'ask-expert',
    'community-view',
    'gov-schemes',
    'knowledge-hub',
    'settings'
  ].includes(currentTab);

  // Store filtering
  const categoriesList: (ProductCategory | 'All')[] = [
    'All',
    'Seeds',
    'Fertilizers',
    'Crop Protection',
    'Organic Products',
    'Farming Accessories'
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(storeSearch.toLowerCase()) ||
      p.suitableCrops.some(c => c.toLowerCase().includes(storeSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Universal Navigation Header */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Body Layout */}
      <div className="flex-1">
        {/* 1. PUBLIC LANDING PAGE */}
        {currentTab === 'landing' && (
          <LandingPage setCurrentTab={setCurrentTab} />
        )}

        {/* 2. PUBLIC FEATURES PAGE */}
        {currentTab === 'features' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                AgroMitra Capabilities
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                End-to-End Smart Agriculture Architecture
              </h1>
              <p className="text-sm text-slate-600">
                Discover the deep integration between field sensors, machine learning crop advisories, and neighborhood commerce.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                onClick={() => { switchRole('FARMER'); setCurrentTab('crop-recommendation'); }}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition cursor-pointer space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">AI Crop Suitability Engine</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evaluates Nitrogen, Phosphorus, Potassium, Soil pH, rainfall, and season to produce suitability percentages.
                </p>
              </div>

              <div 
                onClick={() => { switchRole('FARMER'); setCurrentTab('disease-detection'); }}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition cursor-pointer space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Vision Plant Disease Doctor</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deep computer vision pathology trained on certified crop leaves with organic prevention and Krishi scientist escalation.
                </p>
              </div>

              <div 
                onClick={() => { setCurrentTab('store'); }}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition cursor-pointer space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Verified Local Agro Store</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct purchasing of high-yield seeds and water-soluble fertilizers with batch-level QR authenticity verification.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. PUBLIC SMART FARMING PREVIEW */}
        {currentTab === 'smart-farming' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="bg-emerald-900 text-white rounded-3xl p-8 lg:p-12 shadow-xl space-y-4">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Precision AgriTech
              </span>
              <h1 className="text-3xl font-black">AI & Micro-Climatic Intelligence</h1>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                AgroMitra combines field-level soil nutrient indicators (N-P-K), micro-weather forecasts, and real leaf photography to provide farmers with actionable, non-prescriptive daily agronomic guidance.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => { switchRole('FARMER'); setCurrentTab('crop-recommendation'); }}
                  className="px-5 py-2.5 bg-white text-emerald-950 rounded-xl text-xs font-bold shadow-md hover:bg-emerald-50 transition"
                >
                  Test Recommendation Engine
                </button>
                <button
                  onClick={() => { switchRole('FARMER'); setCurrentTab('disease-detection'); }}
                  className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-600 transition"
                >
                  Test Disease Scanner
                </button>
              </div>
            </div>

            <CropRecommendationView />
          </div>
        )}

        {/* 4. PUBLIC ABOUT PAGE */}
        {currentTab === 'about' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-center">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Our Vision
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              “Smart Farming. Better Decisions. Stronger Harvests.”
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              AgroMitra was built to bridge the gap between Indian farmers, accredited agricultural universities (KVKs), and neighborhood input dealers. We empower cultivators with science-backed recommendations, transparent market rates, and verified seeds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900">Zero Counterfeits</h4>
                <p className="text-xs text-slate-500 mt-1">Batch-level verification ensures authentic inputs.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <Sparkles className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900">Modular ML Core</h4>
                <p className="text-xs text-slate-500 mt-1">Easily pluggable into PyTorch, TensorFlow & real weather APIs.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <Users2 className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900">Local Language First</h4>
                <p className="text-xs text-slate-500 mt-1">Native Telugu and English support across all views.</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. PUBLIC EXPERTS VIEW */}
        {currentTab === 'experts-view' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
                Accredited Agronomists
              </span>
              <h1 className="text-3xl font-black text-slate-900">Krishi Vigyan Kendra Specialists</h1>
              <p className="text-xs text-slate-600">
                Meet our panel of certified Ph.D. Agronomists and extension officers available for field consultations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80"
                    alt="Dr. Rao"
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Dr. K. Srinivas Rao, Ph.D.</h3>
                    <p className="text-xs text-emerald-700 font-semibold">Senior Agronomist, KVK Malyal</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialized in Cotton Bollgard II square retention, chilli thrips vector management, and balanced NPK drip fertigation schedules.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">438 Consultations</span>
                  <button
                    onClick={() => { switchRole('FARMER'); setCurrentTab('ask-expert'); }}
                    className="px-3 py-1.5 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition"
                  >
                    Consult Dr. Rao
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. FARMER PORTAL & INTEGRATED DASHBOARD */}
        {isFarmerTab && role === 'FARMER' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Farmer Left Sidebar */}
              <div className="hidden lg:block shrink-0">
                <FarmerSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
              </div>

              {/* Farmer Main Content Canvas */}
              <div className="flex-1 w-full space-y-6">
                {/* 6.1 Farmer Dashboard Home */}
                {currentTab === 'farmer-dashboard' && (
                  <FarmerDashboardPage
                    farm={farms[0]}
                    crops={crops}
                    activities={activities}
                    weather={weatherData}
                    expenses={expenses}
                    onNavigateTab={setCurrentTab}
                  />
                )}

                {/* 6.2 My Farms */}
                {currentTab === 'my-farms' && (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                            <Tractor className="w-5 h-5" />
                          </span>
                          <h2 className="text-xl font-bold text-slate-900">{t('myFarm')}</h2>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Manage multiple agricultural land parcels, soil types, and water sources.
                        </p>
                      </div>

                      <button
                        onClick={() => setShowAddFarmModal(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Register New Farm Parcel</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {farms.map(f => (
                        <div key={f.id} className="p-6 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2.5 py-0.5 rounded-full">
                                {f.village}, {f.district}
                              </span>
                              <h3 className="text-lg font-bold text-slate-900 mt-1">{f.farmName}</h3>
                            </div>
                            <span className="text-base font-extrabold text-slate-900 font-mono">
                              {f.totalAcres} {t('acres')}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-white p-3 rounded-2xl border border-slate-200">
                              <span className="text-slate-400 block text-[10px]">Soil Type</span>
                              <strong className="text-slate-800">{f.soilType}</strong>
                            </div>
                            <div className="bg-white p-3 rounded-2xl border border-slate-200">
                              <span className="text-slate-400 block text-[10px]">Irrigation</span>
                              <strong className="text-slate-800">{f.irrigationType}</strong>
                            </div>
                            <div className="bg-white p-3 rounded-2xl border border-slate-200">
                              <span className="text-slate-400 block text-[10px]">Water Source</span>
                              <strong className="text-slate-800">{f.waterSource}</strong>
                            </div>
                            <div className="bg-white p-3 rounded-2xl border border-slate-200">
                              <span className="text-slate-400 block text-[10px]">Current Crop</span>
                              <strong className="text-emerald-700">{f.currentCrop}</strong>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                            <span className="text-slate-500">{f.zones.length} Zones Defined</span>
                            <button
                              onClick={() => setCurrentTab('digital-map')}
                              className="font-bold text-emerald-700 hover:underline"
                            >
                              Inspect Parcel Map →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6.3 Digital Farm Map */}
                {currentTab === 'digital-map' && (
                  <DigitalFarmMap farm={farms[0]} />
                )}

                {/* 6.4 Crop Management & Lifecycle */}
                {currentTab === 'crops' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">{t('crops')}</h2>
                        <p className="text-xs text-slate-500">Live phenology monitoring and active crop lifecycle records.</p>
                      </div>

                      <button
                        onClick={() => setShowAddCropModal(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Crop Record</span>
                      </button>
                    </div>

                    {crops.map(c => (
                      <CropLifecycleTimeline key={c.id} crop={c} />
                    ))}
                  </div>
                )}

                {/* 6.5 Smart Crop Recommendation Engine */}
                {currentTab === 'crop-recommendation' && (
                  <CropRecommendationView />
                )}

                {/* 6.6 Plant Disease Detection Computer Vision */}
                {currentTab === 'disease-detection' && (
                  <DiseaseDetectionView
                    onEscalateToExpert={(crop, diseaseName, img) => {
                      setExpertPrefill({
                        crop,
                        question: `I scanned my ${crop} leaf and received AI diagnosis of ${diseaseName}. Please advise on official spray dosage and mitigation.`,
                        image: img
                      });
                      setCurrentTab('ask-expert');
                    }}
                  />
                )}

                {/* 6.7 AgroMitra AI Assistant Chat */}
                {currentTab === 'ai-assistant' && (
                  <AIAssistantChat onNavigateAction={tabKey => {
                    if (tabKey === 'recommendation') setCurrentTab('crop-recommendation');
                    else if (tabKey === 'disease') setCurrentTab('disease-detection');
                    else if (tabKey === 'weather') setCurrentTab('weather-view');
                    else if (tabKey === 'store') setCurrentTab('store');
                    else if (tabKey === 'expert') setCurrentTab('ask-expert');
                    else if (tabKey === 'soil') setCurrentTab('soil-health');
                    else if (tabKey === 'calendar') setCurrentTab('farming-calendar');
                  }} />
                )}

                {/* 6.8 Weather Dashboard */}
                {currentTab === 'weather-view' && (
                  <WeatherView weather={weatherData} />
                )}

                {/* 6.9 Farming Calendar */}
                {currentTab === 'farming-calendar' && (
                  <FarmingCalendarView
                    activities={activities}
                    onToggleActivity={id => {
                      storage.toggleActivity(id);
                      reloadData();
                    }}
                    onAddActivity={act => {
                      storage.addActivity(act);
                      reloadData();
                    }}
                  />
                )}

                {/* 6.10 Soil Health Card */}
                {currentTab === 'soil-health' && (
                  <SoilHealthCard reports={soilReports} />
                )}

                {/* 6.11 Agro Store & Marketplace */}
                {currentTab === 'store' && (
                  <div className="space-y-6">
                    {/* Store Header & Category Filter Pills */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                              <Store className="w-5 h-5" />
                            </span>
                            <h2 className="text-xl font-bold text-slate-900">{t('agroStore')}</h2>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Verified agricultural input catalog stocking certified seeds, fertilizers, and crop protection.
                          </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="Search seeds, fertilizer, brand..."
                            value={storeSearch}
                            onChange={e => setStoreSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl w-64 focus:bg-white transition"
                          />
                        </div>
                      </div>

                      {/* Category Pills */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                        {categoriesList.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                              selectedCategory === cat
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map(p => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          onViewDetails={prod => setViewingProduct(prod)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 6.12 Seed Comparison */}
                {currentTab === 'seed-compare' && (
                  <SeedComparisonView products={products} />
                )}

                {/* 6.13 Nearby Agro Shops */}
                {currentTab === 'nearby-shops' && (
                  <LocalShopFinder shops={shops} />
                )}

                {/* 6.14 Shopping Cart */}
                {currentTab === 'cart' && (
                  <CartView
                    onOrderPlaced={orderId => {
                      reloadData();
                      setCurrentTab('orders');
                    }}
                    onContinueShopping={() => setCurrentTab('store')}
                  />
                )}

                {/* 6.15 Orders & Invoices */}
                {currentTab === 'orders' && (
                  <OrderTrackingView orders={orders} />
                )}

                {/* 6.16 Expenses & Profit/Loss */}
                {currentTab === 'expenses' && (
                  <ExpensePnlTracker
                    expenses={expenses}
                    history={financialHistory}
                    onAddExpense={exp => {
                      storage.addExpense(exp);
                      reloadData();
                    }}
                  />
                )}

                {currentTab === 'profit-loss' && (
                  <ExpensePnlTracker
                    expenses={expenses}
                    history={financialHistory}
                    onAddExpense={exp => {
                      storage.addExpense(exp);
                      reloadData();
                    }}
                  />
                )}

                {currentTab === 'farm-history' && (
                  <ExpensePnlTracker
                    expenses={expenses}
                    history={financialHistory}
                    onAddExpense={exp => {
                      storage.addExpense(exp);
                      reloadData();
                    }}
                  />
                )}

                {/* 6.17 Crop Rotation */}
                {currentTab === 'crop-rotation' && (
                  <CropRotationPlanner />
                )}

                {/* 6.18 Mandi Market Prices */}
                {currentTab === 'market-prices' && (
                  <MarketPricesView prices={marketPrices} />
                )}

                {/* 6.19 Ask Expert */}
                {currentTab === 'ask-expert' && (
                  <AskExpertView
                    consultations={consultations}
                    prefilledCrop={expertPrefill?.crop}
                    prefilledQuestion={expertPrefill?.question}
                    prefilledImage={expertPrefill?.image}
                    onAskQuestion={c => {
                      storage.addConsultation(c);
                      reloadData();
                      setExpertPrefill(null);
                    }}
                  />
                )}

                {/* 6.20 Community Forum */}
                {currentTab === 'community-view' && (
                  <CommunityView
                    posts={posts}
                    onToggleLike={id => {
                      storage.toggleLikePost(id);
                      reloadData();
                    }}
                    onAddPost={p => {
                      storage.addCommunityPost(p);
                      reloadData();
                    }}
                  />
                )}

                {/* 6.21 Government Schemes */}
                {currentTab === 'gov-schemes' && (
                  <GovernmentSchemesView schemes={storage.get<GovernmentScheme[]>('schemes', [
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
                        'ఆధార్ కార్డు మరియు బ్యాంక్ ఖాతా లింక్ అయి ఉండాలి.'
                      ],
                      benefits: '₹6,000 per financial year in 3 installments.',
                      benefitsTe: 'సంవత్సరానికి ₹6,000 మూడు విడతలలో లభిస్తుంది.',
                      howToApply: 'Register online via pmkisan.gov.in or through nearest CSC center with land passbook and Aadhaar.',
                      howToApplyTe: 'pmkisan.gov.in లేదా మీ సేవా / CSC కేంద్రాలలో పట్టాదారు పాస్‌బుక్, ఆధార్ కార్డుతో నమోదు చేసుకోండి.',
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
                        'Pattadar farmers owning agricultural land verified in land records.',
                        'Tenant farmers enrolled under special livelihood credit cards.'
                      ],
                      eligibilityTe: [
                        'ధరణి / భూ రికార్డులలో నమోదైన పట్టాదారు రైతులు.',
                        'ప్రత్యేక గుర్తింపు కార్డులు గల అర్హులైన కౌలు రైతులు.'
                      ],
                      benefits: 'Up to ₹10,000 - ₹15,000 per acre per year credited in two seasonal tranches.',
                      benefitsTe: 'ఎకరాకు సంవత్సరానికి ₹10,000 నుండి ₹15,000 వరకు పెట్టుబడి సాయం.',
                      howToApply: 'Automatic verification through Village Agricultural Officers based on updated digital land records.',
                      howToApplyTe: 'గ్రామ వ్యవసాయ సహాయకులు (AEO) ద్వారా నేరుగా ధృవీకరణ.',
                      officialSource: 'Department of Agriculture, State Government',
                      sourceUrl: 'https://rythubharosa.telangana.gov.in',
                      lastUpdated: '20 September 2026'
                    }
                  ])} />
                )}

                {/* 6.22 Knowledge Hub */}
                {currentTab === 'knowledge-hub' && (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                          <BookOpen className="w-5 h-5" />
                        </span>
                        <h2 className="text-xl font-bold text-slate-900">{t('knowledgeHub')}</h2>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Agronomic guides on Integrated Pest Management (IPM), micro-irrigation, and soil carbon building.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full">
                          Pest Management
                        </span>
                        <h3 className="font-bold text-sm text-slate-900">
                          Integrated Pest Management (IPM) in Bt Cotton
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Guide on managing pink bollworm, thrips, and aphids using cultural yellow traps, bio-pesticides (Neem 10,000 PPM), and economic threshold levels (ETL).
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full">
                          Drip Fertigation
                        </span>
                        <h3 className="font-bold text-sm text-slate-900">
                          Drip Fertigation Schedules for High-Density Chilli
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Dissolve 19:19:19 and potassium nitrate directly into lateral lines at vegetative and flowering intervals to boost fruit set.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6.23 Settings & Profile */}
                {currentTab === 'settings' && (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 max-w-xl">
                    <h2 className="text-xl font-bold text-slate-900">Farmer Account Settings</h2>
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                        <input type="text" value={user?.name} readOnly className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Mobile Phone</label>
                        <input type="text" value={user?.phone} readOnly className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Registered Location</label>
                        <input type="text" value={user?.location} readOnly className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl" />
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            storage.resetDemoData();
                            reloadData();
                            showToast('info', 'Demo Data Reset', 'Platform restored to factory demo state.');
                          }}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition"
                        >
                          Reset Demo Data to Initial State
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 7. SHOP OWNER DASHBOARD */}
        {role === 'SHOP_OWNER' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ShopDashboardView
              products={products}
              orders={orders}
              onRefreshData={reloadData}
            />
          </div>
        )}

        {/* 8. AGRICULTURAL EXPERT DASHBOARD */}
        {role === 'EXPERT' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ExpertDashboardView
              consultations={consultations}
              onRefreshData={reloadData}
            />
          </div>
        )}

        {/* 9. PLATFORM ADMIN DASHBOARD */}
        {role === 'ADMIN' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AdminDashboardView
              users={users}
              shops={shops}
              products={products}
              orders={orders}
              onRefreshData={reloadData}
            />
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {viewingProduct && (
        <ProductDetailsModal
          product={viewingProduct}
          onClose={() => setViewingProduct(null)}
          onGoToCart={() => {
            setViewingProduct(null);
            setCurrentTab('cart');
          }}
        />
      )}

      {/* Add Farm Parcel Modal */}
      {showAddFarmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Tractor className="w-5 h-5 text-emerald-700" />
              <span>Register New Farm Parcel</span>
            </h3>

            <form onSubmit={handleAddFarm} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Farm Parcel Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. East Borewell Parcel"
                  value={newFarmName}
                  onChange={e => setNewFarmName(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Land Area (Acres)
                </label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={newFarmAcres}
                  onChange={e => setNewFarmAcres(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Soil Classification
                </label>
                <select
                  value={newFarmSoil}
                  onChange={e => setNewFarmSoil(e.target.value as Farm['soilType'])}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="Black Soil">Black Soil (Vertisols)</option>
                  <option value="Red Soil">Red Soil (Alfisols)</option>
                  <option value="Alluvial Soil">Alluvial Soil</option>
                  <option value="Clay Loam">Clay Loam</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Irrigation System
                </label>
                <select
                  value={newFarmIrrigation}
                  onChange={e => setNewFarmIrrigation(e.target.value as Farm['irrigationType'])}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="Drip">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Borewell">Borewell Flood</option>
                  <option value="Canal / Flood">Canal Surface</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddFarmModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition"
                >
                  Create Parcel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Crop Record Modal */}
      {showAddCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-700" />
              <span>Register New Crop Sowing</span>
            </h3>

            <form onSubmit={handleAddCrop} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Crop Name
                </label>
                <select
                  value={newCropName}
                  onChange={e => setNewCropName(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="Cotton">Cotton (పత్తి)</option>
                  <option value="Chilli">Chilli (మిరప)</option>
                  <option value="Paddy">Paddy / Rice (వరి)</option>
                  <option value="Maize">Maize (మొక్కజొన్న)</option>
                  <option value="Groundnut">Groundnut (వేరుశెనగ)</option>
                  <option value="Red Gram">Red Gram (కందులు)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Variety Name
                </label>
                <input
                  type="text"
                  required
                  value={newCropVariety}
                  onChange={e => setNewCropVariety(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Acres Dedicated
                </label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={newCropAcres}
                  onChange={e => setNewCropAcres(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddCropModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition"
                >
                  Log Sowing Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Universal Footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <MainAppContent />
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
