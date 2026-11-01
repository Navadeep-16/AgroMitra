import React, { useState } from 'react';
import { Farm, FarmZone } from '../../types/farm';
import { useLanguage } from '../../context/LanguageContext';
import { 
  MapPin, 
  Layers, 
  Maximize2, 
  Activity, 
  Droplet, 
  ShieldCheck, 
  Plus, 
  Sun, 
  Compass, 
  Info 
} from 'lucide-react';

interface DigitalFarmMapProps {
  farm: Farm;
  onUpdateFarm?: (farm: Farm) => void;
}

export const DigitalFarmMap: React.FC<DigitalFarmMapProps> = ({ farm }) => {
  const { t, language } = useLanguage();
  const [activeLayer, setActiveLayer] = useState<'zones' | 'ndvi' | 'moisture'>('zones');
  const [selectedZone, setSelectedZone] = useState<FarmZone>(farm.zones[0] || null);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <MapPin className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">{farm.farmName} — Digital Parcel Map</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {farm.village}, {farm.district}, {farm.state} • Coordinates: {farm.latitude || 17.9245}° N, {farm.longitude || 79.8976}° E • Total: {farm.totalAcres} Acres
          </p>
        </div>

        {/* Map Layers Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveLayer('zones')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeLayer === 'zones' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Zone Boundary
          </button>
          <button
            onClick={() => setActiveLayer('ndvi')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 ${
              activeLayer === 'ndvi' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            NDVI Vegetation
          </button>
          <button
            onClick={() => setActiveLayer('moisture')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 ${
              activeLayer === 'moisture' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            Soil Moisture
          </button>
        </div>
      </div>

      {/* Map Canvas Visualizer */}
      <div className="relative bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 h-96 w-full overflow-hidden flex items-center justify-center p-6">
        {/* Background Grid & Land Coordinates Simulation */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        {/* Compass & Scale Overlays */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-emerald-300 font-mono flex items-center gap-1.5 shadow-md">
          <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
          <span>N 17°55'28" | E 79°53'51"</span>
        </div>

        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Drip Sensor: Active</span>
        </div>

        {/* Interactive Zones Polygon Area */}
        <div className="relative z-10 w-full max-w-2xl h-72 border-2 border-dashed border-emerald-400/40 rounded-3xl p-3 bg-emerald-900/20 backdrop-blur-xs flex gap-3 shadow-2xl">
          {farm.zones.map((zone) => {
            const isSelected = selectedZone?.id === zone.id;
            
            // Layer Visual Styling
            let zoneBg = 'bg-emerald-800/40 hover:bg-emerald-700/50 border-emerald-500/60';
            if (activeLayer === 'ndvi') {
              zoneBg = zone.healthIndex === 'Optimal' 
                ? 'bg-emerald-500/60 border-emerald-400' 
                : 'bg-yellow-500/50 border-yellow-400';
            } else if (activeLayer === 'moisture') {
              zoneBg = zone.soilMoisturePercent > 65 
                ? 'bg-blue-600/60 border-blue-400' 
                : 'bg-cyan-500/40 border-cyan-300';
            }

            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`flex-1 rounded-2xl border-2 transition-all duration-300 cursor-pointer p-4 flex flex-col justify-between ${zoneBg} ${
                  isSelected ? 'ring-4 ring-amber-400 shadow-xl scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
              >
                {/* Zone Top Tag */}
                <div className="flex items-center justify-between text-white">
                  <span className="font-bold text-sm bg-slate-900/60 px-2.5 py-0.5 rounded-lg backdrop-blur-xs">
                    {zone.name.split(' - ')[0]}
                  </span>
                  <span className="text-xs font-semibold text-amber-300">
                    {zone.acres} {t('acres')}
                  </span>
                </div>

                {/* Center Content depending on layer */}
                <div className="my-auto text-center py-2">
                  {activeLayer === 'zones' && (
                    <>
                      <div className="text-white font-bold text-lg leading-tight">{zone.cropName}</div>
                      <div className="text-emerald-200 text-xs mt-0.5">{zone.cropVariety}</div>
                    </>
                  )}
                  {activeLayer === 'ndvi' && (
                    <>
                      <div className="text-emerald-200 font-bold text-xl">NDVI 0.82</div>
                      <div className="text-xs text-white bg-emerald-950/60 px-2 py-0.5 rounded-full inline-block mt-1">
                        Vigorous Biomass
                      </div>
                    </>
                  )}
                  {activeLayer === 'moisture' && (
                    <>
                      <div className="text-blue-100 font-bold text-2xl">{zone.soilMoisturePercent}%</div>
                      <div className="text-xs text-blue-200 mt-0.5">Volumetric Water</div>
                    </>
                  )}
                </div>

                {/* Bottom Status */}
                <div className="bg-slate-900/70 rounded-xl p-2 text-white text-[11px] flex items-center justify-between">
                  <span className="text-slate-300">Health:</span>
                  <span className={`font-bold ${zone.healthIndex === 'Optimal' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {zone.healthIndex}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>Zone A (Cotton)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span>Zone B (Chilli)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span>Zone C (Maize)</span>
          </div>
        </div>
      </div>

      {/* Selected Zone Inspector Details */}
      {selectedZone && (
        <div className="p-5 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Selected Zone</span>
            <div className="text-base font-bold text-slate-900 mt-0.5">{selectedZone.name}</div>
            <div className="text-xs text-emerald-700 font-semibold">{selectedZone.acres} Acres Allocated</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Assigned Crop & Variety</span>
            <div className="text-base font-bold text-slate-900 mt-0.5">{selectedZone.cropName}</div>
            <div className="text-xs text-slate-600">{selectedZone.cropVariety}</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Live Soil Moisture</span>
            <div className="text-base font-bold text-blue-700 mt-0.5 flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-blue-500 fill-blue-500" />
              {selectedZone.soilMoisturePercent}% Optimal
            </div>
            <div className="text-xs text-slate-500">Next irrigation scheduled in 48h</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <span className="text-xs text-slate-500 font-medium">Vegetation Health Index</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                {selectedZone.healthIndex}
              </span>
              <span className="text-xs text-slate-500">NDVI 0.82 High</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Satellite Sentinel-2 calibrated sync</p>
          </div>
        </div>
      )}
    </div>
  );
};

