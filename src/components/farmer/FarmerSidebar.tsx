import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  LayoutDashboard,
  Tractor,
  Map,
  Sprout,
  Sparkles,
  ScanLine,
  CloudSun,
  CalendarDays,
  FileSpreadsheet,
  Store,
  Layers,
  ShoppingBag,
  TrendingUp,
  Receipt,
  Scale,
  History,
  RotateCw,
  MessageSquareText,
  Bot,
  Users2,
  BookOpen,
  Landmark,
  Settings
} from 'lucide-react';

interface FarmerSidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const FarmerSidebar: React.FC<FarmerSidebarProps> = ({ currentTab, setCurrentTab }) => {
  const { t } = useLanguage();

  const menuSections = [
    {
      title: 'CORE FARMING',
      items: [
        { id: 'farmer-dashboard', label: t('dashboard'), icon: LayoutDashboard },
        { id: 'my-farms', label: t('myFarm'), icon: Tractor },
        { id: 'digital-map', label: t('digitalMap'), icon: Map },
        { id: 'crops', label: t('crops'), icon: Sprout },
        { id: 'farming-calendar', label: t('farmingCalendar'), icon: CalendarDays },
        { id: 'soil-health', label: t('soilHealth'), icon: FileSpreadsheet },
      ]
    },
    {
      title: 'SMART AI & ADVISORY',
      items: [
        { id: 'crop-recommendation', label: t('cropRecommendation'), icon: Sparkles, badge: 'AI' },
        { id: 'disease-detection', label: t('diseaseDetection'), icon: ScanLine, badge: 'Vision' },
        { id: 'ai-assistant', label: t('aiAssistant'), icon: Bot, badge: 'Chat' },
        { id: 'weather-view', label: t('weather'), icon: CloudSun },
        { id: 'crop-rotation', label: t('cropRotation'), icon: RotateCw },
        { id: 'ask-expert', label: t('askExpert'), icon: MessageSquareText },
      ]
    },
    {
      title: 'COMMERCE & FINANCES',
      items: [
        { id: 'store', label: t('agroStore'), icon: Store },
        { id: 'seed-compare', label: t('seedComparison'), icon: Layers },
        { id: 'orders', label: t('orders'), icon: ShoppingBag },
        { id: 'market-prices', label: t('marketPrices'), icon: TrendingUp },
        { id: 'expenses', label: t('expenses'), icon: Receipt },
        { id: 'profit-loss', label: t('profitLoss'), icon: Scale },
        { id: 'farm-history', label: t('farmHistory'), icon: History },
      ]
    },
    {
      title: 'COMMUNITY & SCHEMES',
      items: [
        { id: 'community-view', label: t('community'), icon: Users2 },
        { id: 'gov-schemes', label: t('govSchemes'), icon: Landmark },
        { id: 'knowledge-hub', label: t('knowledgeHub'), icon: BookOpen },
        { id: 'settings', label: t('settings'), icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-6rem)] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {menuSections.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            <h5 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {sec.title}
            </h5>
            {sec.items.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-emerald-50/70 hover:text-emerald-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Quick Field Status widget */}
      <div className="mt-6 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-950">
        <div className="flex items-center justify-between text-xs font-semibold mb-1">
          <span>Active Farm Zone</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <p className="text-[11px] text-emerald-800 font-medium">Zone A • Cotton (Bollgard II)</p>
        <p className="text-[10px] text-emerald-600 mt-0.5">Drip fertigation active • 68% moisture</p>
      </div>
    </aside>
  );
};

