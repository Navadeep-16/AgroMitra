import React, { useState } from 'react';
import { MarketPrice } from '../../types/market';
import { useLanguage } from '../../context/LanguageContext';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, MapPin, Search, Clock, ExternalLink } from 'lucide-react';

interface MarketPricesViewProps {
  prices: MarketPrice[];
}

export const MarketPricesView: React.FC<MarketPricesViewProps> = ({ prices }) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = prices.filter(p => 
    p.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mandi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.variety.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">{t('marketPrices')}</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time daily modal rates reported by Telangana & Andhra Pradesh Agricultural Market Committees (APMC).
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search crop or mandi..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl w-60 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Mandi Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => {
          const isUp = item.trend === 'up';
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-400 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      {item.variety}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                      {language === 'te' ? item.cropTe : item.crop}
                    </h3>
                  </div>

                  {/* Trend Badge */}
                  <span className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-xl text-xs font-bold ${
                    isUp ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    <span>{item.changePercent > 0 ? `+${item.changePercent}` : item.changePercent}%</span>
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Modal Trading Price (Mandi Rate)
                  </span>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    ₹{item.modalPrice.toLocaleString('en-IN')}{' '}
                    <span className="text-xs text-slate-500 font-normal">/ Quintal</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1 font-mono">
                    <span>Min: ₹{item.minPrice}</span>
                    <span>Max: ₹{item.maxPrice}</span>
                  </div>
                </div>

                {/* Mandi & Location info */}
                <div className="space-y-1.5 text-xs text-slate-600 mt-3">
                  <div className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.mandi}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Updated: {item.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Source attribution */}
              <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                <span className="truncate">Source: {item.source}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
        *Market prices are indicative modal rates collected from APMC market electronic trading bulletins. Actual auction prices depend on crop moisture percentage, staple length, and cleaning standards.
      </div>
    </div>
  );
};

