import React, { useState } from 'react';
import { GovernmentScheme } from '../../types/market';
import { useLanguage } from '../../context/LanguageContext';
import { Landmark, CheckCircle2, ExternalLink, Calendar, Search, ShieldCheck } from 'lucide-react';

interface GovernmentSchemesViewProps {
  schemes: GovernmentScheme[];
}

export const GovernmentSchemesView: React.FC<GovernmentSchemesViewProps> = ({ schemes }) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = schemes.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Landmark className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">{t('govSchemes')}</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Verified Central and State agricultural subsidy programs, investment support, and insurance guidelines.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search scheme..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl w-60 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="space-y-6">
        {filtered.map(scheme => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Direct Benefit Transfer (DBT)
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {language === 'te' ? scheme.nameTe : scheme.name}
                </h3>
              </div>

              <div className="text-right text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Verified: {scheme.lastUpdated}</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'te' ? scheme.shortDescTe : scheme.shortDesc}
            </p>

            {/* Benefits & Eligibility Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-1.5 text-emerald-950">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">
                  Entitlement & Benefits
                </span>
                <p className="leading-relaxed">
                  {language === 'te' ? scheme.benefitsTe : scheme.benefits}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Eligibility Criteria
                </span>
                <ul className="space-y-1 text-slate-700">
                  {(language === 'te' ? scheme.eligibilityTe : scheme.eligibility).map((e, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How to apply & Official portal link */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="text-slate-600">
                <strong>Application Mode: </strong>
                <span>{language === 'te' ? scheme.howToApplyTe : scheme.howToApply}</span>
              </div>

              <a
                href={scheme.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

