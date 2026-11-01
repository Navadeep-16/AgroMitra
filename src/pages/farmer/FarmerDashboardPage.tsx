import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Farm, Crop, CropActivity, SoilReport, FarmExpense } from '../../types/farm';
import { WeatherCondition } from '../../types/market';
import { 
  Tractor, 
  Sprout, 
  CloudSun, 
  CalendarDays, 
  Sparkles, 
  ScanLine, 
  Receipt, 
  GraduationCap, 
  Store, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Droplet,
  Layers,
  MapPin,
  Bot
} from 'lucide-react';

interface FarmerDashboardPageProps {
  farm: Farm;
  crops: Crop[];
  activities: CropActivity[];
  weather: WeatherCondition;
  expenses: FarmExpense[];
  onNavigateTab: (tab: string) => void;
}

export const FarmerDashboardPage: React.FC<FarmerDashboardPageProps> = ({
  farm,
  crops,
  activities,
  weather,
  expenses,
  onNavigateTab
}) => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const primaryCrop = crops[0];
  const upcomingActivities = activities.filter(a => !a.completed).slice(0, 3);
  const totalSeasonExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* 1. WELCOME CARD */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#34d399_2px,transparent_2px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700/50">
              🌾 Digital Farm Cockpit
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t('goodMorning')}, {user?.name || 'Farmer'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              {t('welcomeFarmerMessage')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('ai-assistant')}
              className="px-5 py-2.5 rounded-2xl bg-white text-emerald-900 font-extrabold text-xs shadow-lg hover:bg-emerald-50 transition flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-emerald-700" />
              <span>{t('aiAssistant')}</span>
            </button>
            <button
              onClick={() => onNavigateTab('disease-detection')}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition flex items-center gap-2"
            >
              <ScanLine className="w-4 h-4" />
              <span>{t('scanPlant')}</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-emerald-700/40 text-xs">
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-emerald-200 block text-[11px] font-semibold">{t('currentCrop')}</span>
            <div className="text-base font-extrabold text-white mt-0.5">{primaryCrop?.name || 'Cotton'}</div>
            <span className="text-[10px] text-emerald-300">{primaryCrop?.variety}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-emerald-200 block text-[11px] font-semibold">{t('farmSize')}</span>
            <div className="text-base font-extrabold text-white mt-0.5">{farm.totalAcres} {t('acres')}</div>
            <span className="text-[10px] text-emerald-300">{farm.soilType} • {farm.irrigationType}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-emerald-200 block text-[11px] font-semibold">{t('growthStage')}</span>
            <div className="text-base font-extrabold text-white mt-0.5">{primaryCrop?.currentStage}</div>
            <span className="text-[10px] text-emerald-300">Day {primaryCrop?.daysSinceSowing} of {primaryCrop?.totalDurationDays}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-emerald-200 block text-[11px] font-semibold">{t('weather')} Today</span>
            <div className="text-base font-extrabold text-white mt-0.5">{weather.currentTemp}°C • {weather.condition}</div>
            <span className="text-[10px] text-amber-300 font-bold">Rain expected tomorrow</span>
          </div>
        </div>
      </div>

      {/* 2. WEATHER ADVISORY STRIP */}
      {weather.farmAlerts.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-300 rounded-3xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-amber-950">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-900 block">
                {language === 'te' ? weather.farmAlerts[0].titleTe : weather.farmAlerts[0].title}
              </span>
              <p className="text-xs text-amber-800 mt-0.5">
                {language === 'te' ? weather.farmAlerts[0].descriptionTe : weather.farmAlerts[0].description}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('weather-view')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition shrink-0"
          >
            Review 7-Day Forecast
          </button>
        </div>
      )}

      {/* 3. CORE TWO COLUMN DASHBOARD CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Crop Lifecycle & Upcoming Tasks */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Crop Lifecycle Snippet */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Active Phenology Stage
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {primaryCrop?.name} ({primaryCrop?.variety}) — Flowering & Square Stage
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('crops')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>Full Crop Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-emerald-600 h-2.5 rounded-full"
                style={{ width: `${primaryCrop?.stageProgressPercent || 65}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs pt-1">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Sown On</span>
                <strong className="text-slate-800">{primaryCrop?.sowingDate}</strong>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Est. First Picking</span>
                <strong className="text-slate-800">{primaryCrop?.estimatedHarvestDate}</strong>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Target Yield</span>
                <strong className="text-emerald-700">{primaryCrop?.targetYieldQuintals} Qtl / Acre</strong>
              </div>
            </div>
          </div>

          {/* Upcoming Farming Activities */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Field Schedule
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Upcoming Activities & Advisories
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('farming-calendar')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>Farming Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {upcomingActivities.map(act => (
                <div
                  key={act.id}
                  onClick={() => onNavigateTab('farming-calendar')}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50/50 hover:bg-white transition flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                      D{act.scheduledDay}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {language === 'te' ? act.titleTe : act.title}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Due: {act.dueDate} • Category: {act.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg shrink-0">
                    Action Due
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Financial Pulse & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Action Matrix */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {t('quickActions')}
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onNavigateTab('disease-detection')}
                className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 text-left transition flex flex-col justify-between"
              >
                <ScanLine className="w-5 h-5 text-emerald-700 mb-2" />
                <span className="text-xs font-bold text-emerald-950">{t('scanPlant')}</span>
                <span className="text-[10px] text-emerald-700">AI Vision</span>
              </button>

              <button
                onClick={() => onNavigateTab('crop-recommendation')}
                className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100/70 border border-amber-200 text-left transition flex flex-col justify-between"
              >
                <Sparkles className="w-5 h-5 text-amber-700 mb-2" />
                <span className="text-xs font-bold text-amber-950">Crop AI</span>
                <span className="text-[10px] text-amber-700">Suitability %</span>
              </button>

              <button
                onClick={() => onNavigateTab('store')}
                className="p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100/70 border border-blue-200 text-left transition flex flex-col justify-between"
              >
                <Store className="w-5 h-5 text-blue-700 mb-2" />
                <span className="text-xs font-bold text-blue-950">{t('orderInputs')}</span>
                <span className="text-[10px] text-blue-700">Balaji Agro</span>
              </button>

              <button
                onClick={() => onNavigateTab('ask-expert')}
                className="p-3.5 rounded-2xl bg-purple-50 hover:bg-purple-100/70 border border-purple-200 text-left transition flex flex-col justify-between"
              >
                <GraduationCap className="w-5 h-5 text-purple-700 mb-2" />
                <span className="text-xs font-bold text-purple-950">{t('consultExpert')}</span>
                <span className="text-[10px] text-purple-700">KVK Scientists</span>
              </button>
            </div>
          </div>

          {/* Season Expenses Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Season Investment
              </span>
              <button
                onClick={() => onNavigateTab('expenses')}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Details
              </button>
            </div>

            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                ₹{totalSeasonExpenses.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-slate-500">
                ₹{Math.round(totalSeasonExpenses / farm.totalAcres)} / Acre (Kharif 2026)
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => onNavigateTab('profit-loss')}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-between transition"
              >
                <span>Open Profit & Loss Projector</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mandi Prices Preview Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Live Mandi Bhav
              </span>
              <button
                onClick={() => onNavigateTab('market-prices')}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                View Mandis
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50">
                <span className="font-bold text-slate-800">Cotton (Warangal)</span>
                <span className="font-mono font-bold text-slate-900">₹7,250 / Q <span className="text-emerald-700 font-normal">↑2.1%</span></span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50">
                <span className="font-bold text-slate-800">Chilli (Khammam)</span>
                <span className="font-mono font-bold text-slate-900">₹18,400 / Q <span className="text-emerald-700 font-normal">↑3.4%</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

