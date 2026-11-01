import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RotateCw, Sprout, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const CropRotationPlanner: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentCrop, setCurrentCrop] = useState('Cotton (Bt Hybrid)');

  const rotationStrategies: Record<string, {
    nextCrops: {
      name: string;
      nameTe: string;
      family: string;
      benefits: string[];
      benefitsTe: string[];
      nitrogenGainKgPerHa: number;
      waterNeed: string;
    }[];
    rationaleEn: string;
    rationaleTe: string;
  }> = {
    'Cotton (Bt Hybrid)': {
      rationaleEn: 'Cotton is a deep-rooted, heavy nutrient consumer that depletes soil nitrogen and potassium while fostering pink bollworm and wilt fungal pathogens if continuous mono-cropping occurs.',
      rationaleTe: 'పత్తి నేలలోని పోషకాలను ఎక్కువగా గ్రహించే పంట. ప్రతి సంవత్సరం పత్తి మాత్రమే సాగు చేస్తే చీడపీడలు, నేల సారం తగ్గిపోతాయి.',
      nextCrops: [
        {
          name: 'Bengal Gram / Chickpea (Rabi Season)',
          nameTe: 'శనగ పంట (రబీ సీజన్)',
          family: 'Leguminosae (Nitrogen-Fixer)',
          nitrogenGainKgPerHa: 45,
          waterNeed: 'Very Low (Survives on residual moisture)',
          benefits: [
            'Nodulating Rhizobia biologically enrich 40-50 kg/ha atmospheric nitrogen.',
            'Breaks the life cycle of cotton pink bollworm and American bollworm.',
            'Deep taproots open compacted subsoil layers for subsequent kharif crops.'
          ],
          benefitsTe: [
            'రైజోబియం బాక్టీరియా ద్వారా సహజంగా 40-50 కిలోల నత్రజని నేలలో స్థిరపడుతుంది.',
            'గులాబీ రంగు కాయతొలుచు పురుగు జీవిత చక్రాన్ని విచ్ఛిన్నం చేస్తుంది.',
            'తదుపరి పంటకు నేల గుల్లబారుతుంది.'
          ]
        },
        {
          name: 'Maize / Sweet Corn (Single Cross Hybrid)',
          nameTe: 'హైబ్రిడ్ మొక్కజొన్న',
          family: 'Gramineae (Cereal)',
          nitrogenGainKgPerHa: 0,
          waterNeed: 'Medium (Drip / Furrow)',
          benefits: [
            'Massive root biomass incorporates 3-4 tons of organic residue after harvest.',
            'Breaks soil-borne fungal wilts (Fusarium and Verticillium) specific to broadleaf crops.',
            'Readily tradable commercial crop in regional poultry feed industries.'
          ],
          benefitsTe: [
            'పంట కోత తర్వాత వేర్ల ద్వారా సేంద్రీయ కర్బనం భారీగా పెరుగుతుంది.',
            'పత్తిని ఆశించే ఎండు తెగులు శిలీంధ్రాలను అరికడుతుంది.',
            'కోళ్ల దాణా మార్కెట్ లో తక్షణ డిమాండ్ ఉంటుంది.'
          ]
        }
      ]
    },
    'Chilli (Teja Hot)': {
      rationaleEn: 'Chilli is susceptible to viral leaf curl vectors, nematodes, and anthracnose fruit rot. Rotating with non-solanaceous crops resets the pest threshold.',
      rationaleTe: 'మిరపలో ఆకుముడత మరియు నెమటోడ్ల సమస్య నివారణకు ఇతర జాతుల పంటలతో మార్పిడి అవసరం.',
      nextCrops: [
        {
          name: 'Groundnut / Peanut',
          nameTe: 'వేరుశెనగ పంట',
          family: 'Leguminosae (Oilseed & Nitrogen Fixer)',
          nitrogenGainKgPerHa: 38,
          waterNeed: 'Low',
          benefits: [
            'Replenishes soil organic carbon and fixes nitrogen.',
            'Non-host crop for chilli thrips and mite vectors.',
            'High quality fodder haulm for cattle feed.'
          ],
          benefitsTe: [
            'సేంద్రీయ కర్బనాన్ని పెంచుతుంది.',
            'మిరప నల్లి మరియు తామర పురుగులకు ఆశ్రయం ఇవ్వదు.',
            'పశువులకు నాణ్యమైన ఎండు మేత లభిస్తుంది.'
          ]
        }
      ]
    }
  };

  const activeStrategy = rotationStrategies[currentCrop] || rotationStrategies['Cotton (Bt Hybrid)'];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <RotateCw className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-slate-900">{t('cropRotation')}</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Scientific crop diversification matrix engineered to break pathogen cycles and restore natural soil biology.
        </p>
      </div>

      {/* Current Crop Selector */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
            Current Primary Crop Cultivated
          </label>
          <select
            value={currentCrop}
            onChange={e => setCurrentCrop(e.target.value)}
            className="p-2.5 text-xs bg-white border border-slate-300 rounded-xl font-bold text-emerald-950 w-64"
          >
            <option value="Cotton (Bt Hybrid)">Cotton (Bt Hybrid) — Zone A</option>
            <option value="Chilli (Teja Hot)">Chilli (Teja Hot) — Zone B</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 max-w-md">
          {language === 'te' ? activeStrategy.rationaleTe : activeStrategy.rationaleEn}
        </div>
      </div>

      {/* Suggested Rotation Options */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Recommended Successor Crops for Soil Rejuvenation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeStrategy.nextCrops.map(crop => (
            <div
              key={crop.name}
              className="p-6 rounded-3xl border border-emerald-300 bg-emerald-50/20 hover:bg-emerald-50/40 transition space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full">
                    {crop.family}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mt-1">
                    {language === 'te' ? crop.nameTe : crop.name}
                  </h4>
                </div>

                {crop.nitrogenGainKgPerHa > 0 && (
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200 text-center">
                    <span className="text-base font-extrabold text-emerald-700 font-mono">
                      +{crop.nitrogenGainKgPerHa}
                    </span>
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">kg N / ha fixed</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Agronomic Advantages:
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  {(language === 'te' ? crop.benefitsTe : crop.benefits).map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-600">
                <span>Water Needs: <strong>{crop.waterNeed}</strong></span>
                <span className="text-emerald-800 font-bold">Recommended for Rabi Season</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          *Agronomic rotation suggestions are designed for soil health and pest break cycles. Consult your local agriculture department regarding regional market off-take arrangements.
        </p>
      </div>
    </div>
  );
};

