import React, { useState } from 'react';
import { Product } from '../../types/store';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { Layers, CheckCircle2, ShoppingCart, ArrowRight, ShieldCheck, Scale } from 'lucide-react';

interface SeedComparisonViewProps {
  products: Product[];
}

export const SeedComparisonView: React.FC<SeedComparisonViewProps> = ({ products }) => {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const { showToast } = useNotification();

  const seedProducts = products.filter(p => p.category === 'Seeds');

  const [seedAId, setSeedAId] = useState<string>(seedProducts[0]?.id || '');
  const [seedBId, setSeedBId] = useState<string>(seedProducts[1]?.id || '');

  const seedA = seedProducts.find(p => p.id === seedAId) || seedProducts[0];
  const seedB = seedProducts.find(p => p.id === seedBId) || seedProducts[1];

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    showToast('success', 'Added to Cart', `${product.name} added.`);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Layers className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-slate-900">{t('seedComparison')}</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Objective side-by-side varietal matrix. Agronomic comparisons based on certified seed tags and research trials.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-3xl border border-slate-200">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Select Seed A
          </label>
          <select
            value={seedAId}
            onChange={e => setSeedAId(e.target.value)}
            className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl font-semibold"
          >
            {seedProducts.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Select Seed B
          </label>
          <select
            value={seedBId}
            onChange={e => setSeedBId(e.target.value)}
            className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl font-semibold"
          >
            {seedProducts.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side by side comparison table */}
      {seedA && seedB && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 bg-slate-50 w-1/4 font-bold text-slate-500 uppercase tracking-wider rounded-tl-2xl">
                  Specification Parameter
                </th>
                <th className="p-4 bg-emerald-50/50 w-3/8 text-emerald-950 font-bold text-sm">
                  {seedA.name}
                </th>
                <th className="p-4 bg-blue-50/50 w-3/8 text-blue-950 font-bold text-sm rounded-tr-2xl">
                  {seedB.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3.5 bg-slate-50 font-semibold text-slate-700">Brand / Breeder</td>
                <td className="p-3.5 font-bold text-emerald-800">{seedA.brand}</td>
                <td className="p-3.5 font-bold text-blue-800">{seedB.brand}</td>
              </tr>
              <tr>
                <td className="p-3.5 bg-slate-50 font-semibold text-slate-700">Suitable Target Crop</td>
                <td className="p-3.5">{seedA.suitableCrops.join(', ')}</td>
                <td className="p-3.5">{seedB.suitableCrops.join(', ')}</td>
              </tr>
              <tr>
                <td className="p-3.5 bg-slate-50 font-semibold text-slate-700">Pack Size</td>
                <td className="p-3.5">{seedA.packSize}</td>
                <td className="p-3.5">{seedB.packSize}</td>
              </tr>
              <tr>
                <td className="p-3.5 bg-slate-50 font-semibold text-slate-700">Market Price (Pack)</td>
                <td className="p-3.5 font-bold text-slate-900 font-mono text-sm">₹{seedA.price}</td>
                <td className="p-3.5 font-bold text-slate-900 font-mono text-sm">₹{seedB.price}</td>
              </tr>
              <tr>
                <td className="p-3.5 bg-slate-50 font-semibold text-slate-700">Crop Duration</td>
                <td className="p-3.5">Medium to Long (140 - 150 Days)</td>
                <td className="p-3.5">Medium Duration (130 - 145 Days)</td>
              </tr>
              <tr>
                <td className="p-3.5 bg-slate-50 font-semibold text-slate-700">Recommended Soil Type</td>
                <td className="p-3.5">Deep Black Soil & Clay Loams</td>
                <td className="p-3.5">Well-drained Black, Red or Sandy Loams</td>
              </tr>
              <tr>
                <td className="p-3.5 bg-slate-50 font-semibold text-slate-700">Water Requirement</td>
                <td className="p-3.5 text-blue-700 font-semibold">Moderate • Drip / Canal friendly</td>
                <td className="p-3.5 text-blue-700 font-semibold">Moderate to High Moisture</td>
              </tr>
              <tr>
                <td className="p-3.5 bg-slate-50 font-semibold text-slate-700">Pest & Disease Profile</td>
                <td className="p-3.5">Bt Cry proteins protect against bollworms; tolerant to sucking pests.</td>
                <td className="p-3.5">High tolerance against virus vectors and powdery mildew.</td>
              </tr>
              <tr>
                <td className="p-3.5 bg-slate-50 font-semibold text-slate-700">Stock Availability</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded-md font-bold text-emerald-700 bg-emerald-100">
                    In Stock ({seedA.stockQuantity} units)
                  </span>
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded-md font-bold text-emerald-700 bg-emerald-100">
                    In Stock ({seedB.stockQuantity} units)
                  </span>
                </td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-4 font-semibold text-slate-700 rounded-bl-2xl">Purchase Action</td>
                <td className="p-4">
                  <button
                    onClick={() => handleAdd(seedA)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1.5 transition"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add {seedA.brand}</span>
                  </button>
                </td>
                <td className="p-4 rounded-br-2xl">
                  <button
                    onClick={() => handleAdd(seedB)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5 transition"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add {seedB.brand}</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
        <Scale className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          *Yield note: Potential yield varies based on agronomic field management, rainfall regularity, pest pressure, and soil fertility. AgroMitra does not make unsupported yield guarantees.
        </p>
      </div>
    </div>
  );
};

