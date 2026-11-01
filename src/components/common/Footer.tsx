import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, Phone, Mail, MapPin, Shield, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                🌾 AgroMitra
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {language === 'te' 
                ? 'రైతుల కోసం రూపొందించబడిన సమగ్ర డిజిటల్ వ్యవసాయ వేదిక. నేల పరీక్షల నుండి ఆధునిక పంట యాజమాన్యం మరియు ధృవీకరించిన విత్తనాలు, ఎరువుల వరకు అన్ని సేవలు ఒకే చోట.'
                : 'A comprehensive digital agriculture ecosystem empowering farmers with AI crop insights, plant disease diagnostics, micro-weather advisories, and direct access to verified neighborhood agro stores.'}
            </p>
            <div className="pt-2 text-xs text-emerald-400 font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Certified AgriTech Platform • ISO 27001 Secure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('features')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentTab('farmer-dashboard')} className="hover:text-emerald-400 transition">
                  {t('myFarm')} & {t('digitalMap')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('disease-detection')} className="hover:text-emerald-400 transition">
                  {t('diseaseDetection')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('crop-recommendation')} className="hover:text-emerald-400 transition">
                  {t('cropRecommendation')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('weather-view')} className="hover:text-emerald-400 transition">
                  {t('weather')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('store')} className="hover:text-emerald-400 transition">
                  {t('agroStore')}
                </button>
              </li>
            </ul>
          </div>

          {/* Agricultural Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'te' ? 'రైతు వనరులు' : 'Agri Resources'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentTab('gov-schemes')} className="hover:text-emerald-400 transition">
                  {t('govSchemes')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('knowledge-hub')} className="hover:text-emerald-400 transition">
                  {t('knowledgeHub')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('market-prices')} className="hover:text-emerald-400 transition">
                  {t('marketPrices')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('community-view')} className="hover:text-emerald-400 transition">
                  {t('community')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('seed-compare')} className="hover:text-emerald-400 transition">
                  {t('seedComparison')}
                </button>
              </li>
            </ul>
          </div>

          {/* Kisan Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'te' ? 'రైతు సహాయవాణి' : 'Kisan Support'}
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Toll-Free Kisan Call Centre</div>
                  <div className="text-xs text-emerald-400">1800-180-1551 (6 AM - 10 PM)</div>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs">support@agromitra.in</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs">AgriTech Hub, Narsampet Road, Warangal, Telangana - 506132</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-3xl">
            <strong className="text-slate-400">Important Agronomic Notice: </strong>
            AgroMitra provides machine learning assessments, weather alerts, and crop advisories for educational and decision support. Actual yields depend on field-level microclimate and management. For registered pesticides, always read product packaging labels and consult local agricultural extension officers.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <span>© 2026 AgroMitra Technologies Inc.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Farmers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

