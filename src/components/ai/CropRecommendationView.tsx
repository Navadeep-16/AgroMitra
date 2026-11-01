import React, { useState } from 'react';
import { CropRecommendationInput, CropSuitabilityResult } from '../../types/ai';
import { CropRecommendationEngine } from '../../services/aiService';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  Sparkles, 
  Sprout, 
  Droplet, 
  Thermometer, 
  CloudRain, 
  Compass, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const CropRecommendationView: React.FC = () => {
  const { t, language } = useLanguage();
  const { showToast } = useNotification();

  // Form State initialized with realistic regional parameters
  const [formData, setFormData] = useState<CropRecommendationInput>({
    location: 'Warangal District, Telangana',
    soilType: 'Black Soil',
    ph: 7.2,
    nitrogen: 310,
    phosphorus: 22,
    potassium: 315,
    temperature: 31,
    humidity: 70,
    rainfall: 750,
    season: 'Kharif',
    irrigationType: 'Drip'
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CropSuitabilityResult[]>(() => 
    CropRecommendationEngine.evaluate(formData)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const computed = CropRecommendationEngine.evaluate(formData);
      setResults(computed);
      setLoading(false);
      showToast('success', 'Suitability Assessment Ready', `Ranked ${computed.length} crops for your agro-climatic profile.`);
    }, 400);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Sparkles className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-slate-900">{t('cropRecommendation')}</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Multi-variable agronomic machine learning algorithm balancing soil chemical parameters (NPK, pH) with micro-weather forecasts.
        </p>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Field & Climatic Parameters
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Location / Region
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl"
            />
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Soil Classification
            </label>
            <select
              value={formData.soilType}
              onChange={e => setFormData({ ...formData, soilType: e.target.value })}
              className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl"
            >
              <option value="Black Soil">Black Soil (Vertisols)</option>
              <option value="Red Soil">Red Soil (Alfisols)</option>
              <option value="Alluvial Soil">Alluvial Soil</option>
              <option value="Clay Loam">Clay Loam</option>
              <option value="Sandy Loam">Sandy Loam</option>
            </select>
          </div>

          {/* Season */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Crop Season
            </label>
            <select
              value={formData.season}
              onChange={e => setFormData({ ...formData, season: e.target.value as 'Kharif' | 'Rabi' | 'Zaid' })}
              className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl"
            >
              <option value="Kharif">Kharif (Monsoon / Autumn)</option>
              <option value="Rabi">Rabi (Winter / Spring)</option>
              <option value="Zaid">Zaid (Summer)</option>
            </select>
          </div>

          {/* Irrigation Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Irrigation Infrastructure
            </label>
            <select
              value={formData.irrigationType}
              onChange={e => setFormData({ ...formData, irrigationType: e.target.value })}
              className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl"
            >
              <option value="Drip">Drip Irrigation</option>
              <option value="Sprinkler">Sprinkler Irrigation</option>
              <option value="Borewell">Borewell Flood</option>
              <option value="Canal / Flood">Canal Surface</option>
              <option value="Rainfed">Rainfed (Dryland)</option>
            </select>
          </div>

          {/* Soil pH */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Soil pH: <span className="font-mono text-emerald-700 font-bold">{formData.ph}</span>
            </label>
            <input
              type="range"
              min="5.0"
              max="9.0"
              step="0.1"
              value={formData.ph}
              onChange={e => setFormData({ ...formData, ph: Number(e.target.value) })}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>Acidic (5.0)</span>
              <span>Neutral (7.0)</span>
              <span>Alkaline (9.0)</span>
            </div>
          </div>

          {/* Nitrogen N */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nitrogen (N): <span className="font-mono text-blue-700 font-bold">{formData.nitrogen} kg/ha</span>
            </label>
            <input
              type="range"
              min="100"
              max="600"
              step="10"
              value={formData.nitrogen}
              onChange={e => setFormData({ ...formData, nitrogen: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>Low (100)</span>
              <span>Med (350)</span>
              <span>High (600)</span>
            </div>
          </div>

          {/* Phosphorus P */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phosphorus (P): <span className="font-mono text-amber-700 font-bold">{formData.phosphorus} kg/ha</span>
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={formData.phosphorus}
              onChange={e => setFormData({ ...formData, phosphorus: Number(e.target.value) })}
              className="w-full accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>Low (5)</span>
              <span>Med (20)</span>
              <span>High (50)</span>
            </div>
          </div>

          {/* Potassium K */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Potassium (K): <span className="font-mono text-emerald-800 font-bold">{formData.potassium} kg/ha</span>
            </label>
            <input
              type="range"
              min="80"
              max="500"
              step="10"
              value={formData.potassium}
              onChange={e => setFormData({ ...formData, potassium: Number(e.target.value) })}
              className="w-full accent-emerald-700"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>Low (80)</span>
              <span>Med (250)</span>
              <span>Rich (500)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Calculate Ranked Crop Recommendations</span>
          </button>
        </div>
      </form>

      {/* Ranked Suitability Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            Ranked Recommendations for Your Farm
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Sorted by Agronomic Compatibility Score
          </span>
        </div>

        <div className="space-y-4">
          {results.map((res, idx) => (
            <div
              key={res.cropName}
              className={`p-6 rounded-3xl border transition-all ${
                idx === 0
                  ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900">
                      {language === 'te' ? res.cropNameTe : res.cropName}
                    </h4>
                    {idx === 0 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                        Top Match
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 max-w-2xl leading-relaxed">
                    {language === 'te' ? res.explanationTe : res.explanation}
                  </p>
                </div>

                {/* Score Pill */}
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-emerald-700 font-mono">
                    {res.suitabilityScore}%
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold block uppercase">
                    Suitability Score
                  </span>
                </div>
              </div>

              {/* Quick specs pill row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200/60 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Expected Yield</span>
                  <span className="font-bold text-slate-800">{res.expectedYieldRange}</span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Growth Duration</span>
                  <span className="font-bold text-slate-800">{res.growthDurationDays} Days</span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Water Requirement</span>
                  <span className="font-bold text-blue-700">{res.waterRequirement}</span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Agronomic Risk</span>
                  <span className="font-bold text-emerald-700">{res.riskLevel} Risk</span>
                </div>
              </div>

              {/* Key Practical Advice */}
              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Key Field Management Directives:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-700">
                  {(language === 'te' ? res.keyAdviceTe : res.keyAdvice).map((adv, i) => (
                    <li key={i} className="flex items-start gap-1.5 bg-white p-2 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Regulatory Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t('educationalDisclaimer')}
        </p>
      </div>
    </div>
  );
};

