import React from 'react';
import { WeatherCondition } from '../../types/market';
import { useLanguage } from '../../context/LanguageContext';
import { 
  CloudSun, 
  Droplet, 
  Wind, 
  Thermometer, 
  AlertTriangle, 
  Sun, 
  CloudRain, 
  Compass, 
  CheckCircle2, 
  Calendar,
  CloudLightning
} from 'lucide-react';

interface WeatherViewProps {
  weather: WeatherCondition;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ weather }) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <CloudSun className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">{t('weather')} & Field Advisories</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Station: {weather.location} • Hyper-local calibrated radar sync
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            Updated: 15 mins ago
          </span>
        </div>
      </div>

      {/* Main Current Conditions Hero Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#34d399_2px,transparent_2px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Live Field Weather
            </span>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-black font-mono tracking-tight">
                {weather.currentTemp}°C
              </span>
              <div className="text-xs text-slate-300">
                <span className="block font-semibold text-emerald-200">{weather.condition}</span>
                <span>Feels like {weather.feelsLike}°C • Today: {weather.tempMin}° / {weather.tempMax}°</span>
              </div>
            </div>
          </div>

          {/* Key Metric Gauges */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <Droplet className="w-5 h-5 text-blue-300 mx-auto mb-1" />
              <span className="text-[10px] text-slate-300 block">Humidity</span>
              <span className="text-base font-bold font-mono">{weather.humidityPercent}%</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <CloudRain className="w-5 h-5 text-cyan-300 mx-auto mb-1" />
              <span className="text-[10px] text-slate-300 block">Precipitation</span>
              <span className="text-base font-bold font-mono">{weather.rainProbabilityPercent}%</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <Wind className="w-5 h-5 text-emerald-300 mx-auto mb-1" />
              <span className="text-[10px] text-slate-300 block">Wind Speed</span>
              <span className="text-base font-bold font-mono">{weather.windSpeedKmh} km/h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Agricultural Weather Alerts */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Agronomic Action Advisories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weather.farmAlerts.map((alert, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                alert.type === 'warning'
                  ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                  : 'bg-blue-50/70 border-blue-200 text-blue-950'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
                alert.type === 'warning' ? 'text-amber-600' : 'text-blue-600'
              }`} />
              <div className="space-y-1">
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>{language === 'te' ? alert.titleTe : alert.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-white/80 shadow-2xs">
                    {alert.action}
                  </span>
                </div>
                <p className="text-xs opacity-90 leading-relaxed">
                  {language === 'te' ? alert.descriptionTe : alert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Agricultural Forecast Strip */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          7-Day Field Outlook
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weather.forecast.map((day, i) => {
            const hasRain = day.rainProb > 40;
            return (
              <div
                key={i}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  i === 0
                    ? 'border-emerald-500 bg-emerald-50/40 font-bold'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold text-slate-800 block">
                  {language === 'te' ? day.dayTe : day.day}
                </span>
                <span className="text-[10px] text-slate-400 block mb-2">{day.date}</span>

                <div className="my-2">
                  {hasRain ? (
                    <CloudRain className="w-6 h-6 text-blue-500 mx-auto" />
                  ) : (
                    <Sun className="w-6 h-6 text-amber-500 mx-auto" />
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 font-mono">
                  {day.maxTemp}° / <span className="text-slate-400">{day.minTemp}°</span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200 text-[10px] text-slate-600 flex items-center justify-center gap-1">
                  <Droplet className="w-3 h-3 text-blue-500" />
                  <span>{day.rainProb}% rain</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

