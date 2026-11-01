import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/user';
import { 
  Sprout, 
  Sparkles, 
  Store, 
  GraduationCap, 
  CloudSun, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  PhoneCall, 
  Tractor,
  Layers,
  MapPin,
  TrendingUp,
  Droplet
} from 'lucide-react';

interface LandingPageProps {
  setCurrentTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentTab }) => {
  const { t, language } = useLanguage();
  const { switchRole } = useAuth();
  const [activeFeatureTab, setActiveFeatureTab] = useState<'mgmt' | 'ai' | 'store' | 'expert'>('mgmt');

  const handleQuickDemoRole = (role: UserRole, targetTab: string) => {
    switchRole(role);
    setCurrentTab(targetTab);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/60 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                🌾 Digital Agriculture & Agri-Commerce Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {t('heroHeadline')}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t('heroSubtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleQuickDemoRole('FARMER', 'farmer-dashboard')}
                  className="px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-700/25 transition flex items-center gap-2.5"
                >
                  <Tractor className="w-5 h-5" />
                  <span>{t('startFarmingSmarter')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => setCurrentTab('store')}
                  className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-emerald-600 font-bold text-sm sm:text-base shadow-xs transition flex items-center gap-2"
                >
                  <Store className="w-5 h-5 text-emerald-700" />
                  <span>{t('exploreAgroStore')}</span>
                </button>
              </div>

              {/* Quick Persona Pills for instant test */}
              <div className="pt-6 border-t border-slate-200/80">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  1-Click Role Sandbox:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleQuickDemoRole('FARMER', 'farmer-dashboard')}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition flex items-center gap-1.5"
                  >
                    <Tractor className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Farmer (Ramesh)</span>
                  </button>
                  <button
                    onClick={() => handleQuickDemoRole('SHOP_OWNER', 'shop-dashboard')}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1.5"
                  >
                    <Store className="w-3.5 h-3.5 text-blue-600" />
                    <span>Shop Owner (Kishore)</span>
                  </button>
                  <button
                    onClick={() => handleQuickDemoRole('EXPERT', 'expert-dashboard')}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                    <span>Agronomist (Dr. Rao)</span>
                  </button>
                  <button
                    onClick={() => handleQuickDemoRole('ADMIN', 'admin-dashboard')}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100 transition flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Platform Admin</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual with Overlaid UI Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
                  alt="Modern Indian Farmer with smartphone"
                  className="w-full h-[480px] object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Floating Card 1: Weather Alert */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[220px] animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <CloudSun className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Warangal Station</span>
                    <div className="text-sm font-black text-slate-900 font-mono">31°C • Partly Cloudy</div>
                    <span className="text-[10px] text-amber-700 font-bold">Rain expected tomorrow</span>
                  </div>
                </div>

                {/* Overlay Floating Card 2: Crop Health */}
                <div className="absolute bottom-20 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-bold text-slate-900">Cotton Canopy</div>
                    <div className="text-emerald-700 font-semibold text-[11px]">96% Optimal Vigor</div>
                  </div>
                </div>

                {/* Overlay Floating Card 3: Mandi Price */}
                <div className="absolute top-28 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 text-left">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Mandi Modal Rate</span>
                  <div className="text-sm font-extrabold text-slate-900 font-mono">
                    Cotton: ₹7,250/Q
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +2.1% Today
                  </span>
                </div>

                {/* Overlay Floating Card 4: Soil Moisture */}
                <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-400 fill-blue-400" />
                  <span className="text-xs font-mono font-bold">Drip Zone A: 68% Moisture</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION: "Built for Real Farmers" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {t('builtForRealFarmers')}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Six Comprehensive Pillars for Sustainable Agriculture
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            From the first seed to the final harvest, AgroMitra bridges the gap between field management, scientific expertise, and input supply.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => handleQuickDemoRole('FARMER', 'my-farms')}
            className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('farmManagementTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('farmManagementDesc')}</p>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition">
              Explore Digital Parcels →
            </span>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => handleQuickDemoRole('FARMER', 'crop-recommendation')}
            className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('smartAgriTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('smartAgriDesc')}</p>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition">
              Run AI Suitability →
            </span>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => setCurrentTab('store')}
            className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('localShopTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('localShopDesc')}</p>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition">
              Browse Agri Inputs →
            </span>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => handleQuickDemoRole('FARMER', 'ask-expert')}
            className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('expertGuidanceTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('expertGuidanceDesc')}</p>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition">
              Ask Krishi Vigyan Kendra →
            </span>
          </div>

          {/* Card 5 */}
          <div 
            onClick={() => handleQuickDemoRole('FARMER', 'weather-view')}
            className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center group-hover:scale-110 transition">
              <CloudSun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('weatherInsightsTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('weatherInsightsDesc')}</p>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition">
              Check 7-Day Forecast →
            </span>
          </div>

          {/* Card 6 */}
          <div 
            onClick={() => handleQuickDemoRole('FARMER', 'profit-loss')}
            className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center group-hover:scale-110 transition">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('farmAnalyticsTitle')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('farmAnalyticsDesc')}</p>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition">
              Calculate Profit & Loss →
            </span>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FEATURE HIGHLIGHT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Interactive Capability Preview
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Engineered for High-Reliability Agronomy
              </h2>
            </div>

            {/* Feature Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFeatureTab('mgmt')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeFeatureTab === 'mgmt' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Parcel Mapping
              </button>
              <button
                onClick={() => setActiveFeatureTab('ai')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeFeatureTab === 'ai' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Vision Disease Doctor
              </button>
              <button
                onClick={() => setActiveFeatureTab('store')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeFeatureTab === 'store' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Batch Verified Store
              </button>
              <button
                onClick={() => setActiveFeatureTab('expert')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeFeatureTab === 'expert' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                KVK Expert Desk
              </button>
            </div>
          </div>

          {/* Dynamic Tab Content Preview */}
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {activeFeatureTab === 'mgmt' && (
                <>
                  <h3 className="text-xl font-bold text-white">Digital Farm Map & Parcel Phenology</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Map field boundaries, allocate crop varieties to zones (e.g. Zone A Cotton, Zone B Chilli), and monitor live NDVI vegetation indices. Built with open map architecture ready for Google Maps integration.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">✓ Multi-parcel registration with soil type & irrigation mode</li>
                    <li className="flex items-center gap-2">✓ 6-stage visual phenology tracking (Sowing ➔ Harvest)</li>
                    <li className="flex items-center gap-2">✓ Automated day-by-day task checklist with SMS alerts</li>
                  </ul>
                  <button
                    onClick={() => handleQuickDemoRole('FARMER', 'digital-map')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                  >
                    Open Farm Map Demo
                  </button>
                </>
              )}

              {activeFeatureTab === 'ai' && (
                <>
                  <h3 className="text-xl font-bold text-white">Computer Vision Plant Disease Scanner</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Instant leaf diagnostic engine identifying viral curl, bacterial blights, fungal spots, and nutrient deficiencies. Supplies organic remedies, cultural prevention methods, and direct escalation to Krishi scientists.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">✓ 94%+ diagnostic accuracy calibrated on Indian field crops</li>
                    <li className="flex items-center gap-2">✓ Non-prescriptive responsible use alerts & official product labels</li>
                    <li className="flex items-center gap-2">✓ 1-click test with real leaf specimen samples</li>
                  </ul>
                  <button
                    onClick={() => handleQuickDemoRole('FARMER', 'disease-detection')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                  >
                    Test Disease Scanner
                  </button>
                </>
              )}

              {activeFeatureTab === 'store' && (
                <>
                  <h3 className="text-xl font-bold text-white">Verified Local Agro-Input Marketplace</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Direct access to state-licensed input shops with batch-level QR authenticity verification. Eliminates counterfeit seeds and adulterated fertilizers with transparent retail prices.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">✓ Verified Bt seeds, soluble fertilizers, bio-inputs & sprayers</li>
                    <li className="flex items-center gap-2">✓ Flexible counter pickup or farm delivery fulfillment</li>
                    <li className="flex items-center gap-2">✓ GST compliant invoice generation</li>
                  </ul>
                  <button
                    onClick={() => setCurrentTab('store')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                  >
                    Explore Agro Store
                  </button>
                </>
              )}

              {activeFeatureTab === 'expert' && (
                <>
                  <h3 className="text-xl font-bold text-white">Direct Krishi Vigyan Kendra Expert Network</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Personalized agronomy consultations with accredited university researchers and agricultural extension officers. Submit high-res plant photos and receive customized field recommendations.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">✓ Verified credentials of participating agronomy specialists</li>
                    <li className="flex items-center gap-2">✓ Complete historical consultation records accessible anytime</li>
                    <li className="flex items-center gap-2">✓ Integrated community forum for peer farmer collaboration</li>
                  </ul>
                  <button
                    onClick={() => handleQuickDemoRole('FARMER', 'ask-expert')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                  >
                    Consult an Expert
                  </button>
                </>
              )}
            </div>

            {/* Right preview graphic */}
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 text-xs font-mono space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                <span className="text-emerald-400 font-bold">🌾 AgroMitra Core Diagnostics</span>
                <span className="text-slate-500">Node: South-IN-WGL</span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>&gt; Model: ResNet-50-AgriPathology v2.4</div>
                <div>&gt; Soil Type: Vertisol (Black Cotton Soil)</div>
                <div>&gt; Active Parcel: Zone A (2.0 Acres Cotton)</div>
                <div>&gt; Soil Health Card: N (310), P (22), K (315) kg/ha</div>
                <div>&gt; Moisture Sensor: 68% (Optimal Root Zone)</div>
                <div className="text-amber-400">&gt; Weather Alert: Pre-monsoon rain in 24h</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-emerald-400 text-center font-bold">
                ● System Ready for Field Deployment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FARMER SATISFACTION & KISAN CALL CENTRE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-green-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold">Have Questions or Need On-Field Consultation?</h3>
            <p className="text-xs text-emerald-200">
              Speak directly with certified agronomists or your local Mandal Agricultural Officer.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="tel:18001801551"
              className="px-6 py-3 rounded-2xl bg-white text-emerald-950 font-extrabold text-xs shadow-lg hover:bg-emerald-50 transition flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>Call Kisan Center: 1800-180-1551</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

