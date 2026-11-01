import React, { useState } from 'react';
import { SoilReport } from '../../types/farm';
import { useLanguage } from '../../context/LanguageContext';
import { FileSpreadsheet, ArrowUpRight, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SoilHealthCardProps {
  reports: SoilReport[];
}

export const SoilHealthCard: React.FC<SoilHealthCardProps> = ({ reports }) => {
  const { t, language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const currentReport = reports.find(r => r.reportYear === selectedYear) || reports[0];
  const previousReport = reports.find(r => r.reportYear === 2025);

  // Nutrient rating helper
  const getNutrientStatus = (val: number, type: 'N' | 'P' | 'K' | 'OC') => {
    if (type === 'N') {
      if (val < 280) return { label: 'Low', color: 'text-amber-600 bg-amber-50 border-amber-200', pct: Math.min((val / 560) * 100, 100) };
      if (val <= 560) return { label: 'Medium (Optimal)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', pct: Math.min((val / 560) * 100, 100) };
      return { label: 'High', color: 'text-purple-700 bg-purple-50 border-purple-200', pct: 100 };
    }
    if (type === 'P') {
      if (val < 10) return { label: 'Low', color: 'text-amber-600 bg-amber-50 border-amber-200', pct: Math.min((val / 35) * 100, 100) };
      if (val <= 25) return { label: 'Medium (Optimal)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', pct: Math.min((val / 35) * 100, 100) };
      return { label: 'High', color: 'text-purple-700 bg-purple-50 border-purple-200', pct: 100 };
    }
    if (type === 'K') {
      if (val < 108) return { label: 'Low', color: 'text-amber-600 bg-amber-50 border-amber-200', pct: Math.min((val / 350) * 100, 100) };
      if (val <= 280) return { label: 'Medium', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', pct: Math.min((val / 350) * 100, 100) };
      return { label: 'High (Rich)', color: 'text-emerald-800 bg-emerald-100 border-emerald-300', pct: 100 };
    }
    // Organic Carbon
    if (val < 0.5) return { label: 'Low', color: 'text-amber-600 bg-amber-50 border-amber-200', pct: Math.min((val / 1.0) * 100, 100) };
    if (val <= 0.75) return { label: 'Medium (Adequate)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', pct: Math.min((val / 1.0) * 100, 100) };
    return { label: 'High (Excellent)', color: 'text-emerald-800 bg-emerald-100 border-emerald-300', pct: 100 };
  };

  const nStatus = getNutrientStatus(currentReport.nitrogenKgPerHa, 'N');
  const pStatus = getNutrientStatus(currentReport.phosphorusKgPerHa, 'P');
  const kStatus = getNutrientStatus(currentReport.potassiumKgPerHa, 'K');
  const ocStatus = getNutrientStatus(currentReport.organicCarbonPercent, 'OC');

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header and Year selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <FileSpreadsheet className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              {language === 'te' ? 'డిజిటల్ సాయిల్ హెల్త్ కార్డు' : 'Soil Health Card & Nutrient Diagnostics'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sample tested at Krishi Soil Testing Lab • Certified under National Soil Health Card Scheme
          </p>
        </div>

        {/* Year toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setSelectedYear(2026)}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedYear === 2026 ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2026 Report (Current)
          </button>
          <button
            onClick={() => setSelectedYear(2025)}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedYear === 2025 ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2025 Report (Historical)
          </button>
        </div>
      </div>

      {/* Primary Gauge Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* pH */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <span className="text-xs font-medium text-slate-500">{t('soilPh')}</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{currentReport.ph}</div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
            Neutral (Optimal 6.5 - 7.5)
          </span>
        </div>

        {/* Organic Carbon */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <span className="text-xs font-medium text-slate-500">{t('organicCarbon')}</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{currentReport.organicCarbonPercent}%</div>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md inline-block mt-1 ${ocStatus.color}`}>
            {ocStatus.label}
          </span>
        </div>

        {/* Electrical Conductivity */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <span className="text-xs font-medium text-slate-500">EC (Salinity)</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{currentReport.electricalConductivity} dS/m</div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
            Normal (&lt; 1.0 dS/m)
          </span>
        </div>

        {/* Overall Status */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex flex-col justify-between">
          <span className="text-xs font-semibold text-emerald-800">Overall Fertility Index</span>
          <div className="text-xl font-bold text-emerald-950 flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Grade A (Productive)
          </div>
          <span className="text-[10px] text-emerald-700">Suitable for Cotton & Chilli</span>
        </div>
      </div>

      {/* Main Nutrient Progress Bars (ASCII Bar requested in spec + visual UI) */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          PRIMARY MACRONUTRIENTS (N - P - K)
        </h4>

        {/* Nitrogen Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              {t('soilNitrogen')} — Available N
            </span>
            <span className="font-mono font-bold text-slate-900">
              {currentReport.nitrogenKgPerHa} kg/ha • <span className="text-emerald-700">{nStatus.label}</span>
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-700"
              style={{ width: `${nStatus.pct}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Low (&lt;280)</span>
            <span>Target Medium (280 - 560 kg/ha)</span>
            <span>High (&gt;560)</span>
          </div>
        </div>

        {/* Phosphorus Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              {t('soilPhosphorus')} — Olsen P2O5
            </span>
            <span className="font-mono font-bold text-slate-900">
              {currentReport.phosphorusKgPerHa} kg/ha • <span className="text-emerald-700">{pStatus.label}</span>
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-amber-500 h-3 rounded-full transition-all duration-700"
              style={{ width: `${pStatus.pct}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Low (&lt;10)</span>
            <span>Medium (10 - 25 kg/ha)</span>
            <span>High (&gt;25)</span>
          </div>
        </div>

        {/* Potassium Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              {t('soilPotassium')} — Available K2O
            </span>
            <span className="font-mono font-bold text-slate-900">
              {currentReport.potassiumKgPerHa} kg/ha • <span className="text-emerald-800 font-bold">{kStatus.label}</span>
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-3 rounded-full transition-all duration-700"
              style={{ width: `${kStatus.pct}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Low (&lt;108)</span>
            <span>Medium (108 - 280 kg/ha)</span>
            <span>High (&gt;280)</span>
          </div>
        </div>
      </div>

      {/* Historical Comparison: 2025 vs 2026 */}
      {previousReport && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              {t('compareReports')}: 2025 vs 2026
            </h4>
            <span className="text-[11px] text-emerald-300 font-mono">
              Net Fertility Trend: +31.8% Positive
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div className="bg-white/10 rounded-xl p-3">
              <span className="text-slate-300 block text-[10px]">Nitrogen (N)</span>
              <div className="font-bold text-sm mt-0.5">
                235 ➔ <span className="text-emerald-300">310 kg/ha</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">+31.9% Improved</span>
            </div>

            <div className="bg-white/10 rounded-xl p-3">
              <span className="text-slate-300 block text-[10px]">Phosphorus (P)</span>
              <div className="font-bold text-sm mt-0.5">
                16 ➔ <span className="text-emerald-300">22 kg/ha</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">+37.5% Adequate</span>
            </div>

            <div className="bg-white/10 rounded-xl p-3">
              <span className="text-slate-300 block text-[10px]">Potassium (K)</span>
              <div className="font-bold text-sm mt-0.5">
                275 ➔ <span className="text-emerald-300">315 kg/ha</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">+14.5% High</span>
            </div>

            <div className="bg-white/10 rounded-xl p-3">
              <span className="text-slate-300 block text-[10px]">Organic Carbon</span>
              <div className="font-bold text-sm mt-0.5">
                0.44% ➔ <span className="text-emerald-300">0.64%</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">+45.4% Green Manure</span>
            </div>
          </div>
        </div>
      )}

      {/* Tailored Management Recommendations */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2">
        <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          {language === 'te' ? 'నేల ఆరోగ్య నిర్వహణ సిఫార్సులు' : 'Soil Nutrient Balancing Recommendations'}
        </h4>
        <ul className="space-y-1.5 text-xs text-amber-950">
          {(language === 'te' ? currentReport.recommendationsTe : currentReport.recommendations).map((rec, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span className="leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>

        <p className="text-[10px] text-slate-500 pt-2 border-t border-amber-200/60">
          *Notice: This soil health overview provides agronomic guidance based on laboratory sample analysis. Actual seasonal field response varies with rainfall and crop uptake.
        </p>
      </div>
    </div>
  );
};

