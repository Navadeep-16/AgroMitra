import React, { useState } from 'react';
import { FarmExpense, FarmFinancialSummary } from '../../types/farm';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  Receipt, 
  Scale, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Layers, 
  History, 
  AlertCircle 
} from 'lucide-react';

interface ExpensePnlTrackerProps {
  expenses: FarmExpense[];
  history: FarmFinancialSummary[];
  onAddExpense: (expense: FarmExpense) => void;
}

export const ExpensePnlTracker: React.FC<ExpensePnlTrackerProps> = ({ expenses, history, onAddExpense }) => {
  const { t, language } = useLanguage();
  const { showToast } = useNotification();
  const [activeTab, setActiveTab] = useState<'expenses' | 'pnl' | 'history'>('expenses');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Expense form state
  const [category, setCategory] = useState<FarmExpense['category']>('Fertilizer');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Interactive PnL Calculator inputs
  const [calcAcres, setCalcAcres] = useState<number>(4.5);
  const [calcInvestment, setCalcInvestment] = useState<number>(44356);
  const [calcYield, setCalcYield] = useState<number>(48); // quintals
  const [calcPrice, setCalcPrice] = useState<number>(7250); // ₹/quintal

  // PnL Calculations
  const calculatedRevenue = calcYield * calcPrice;
  const calculatedNetProfit = calculatedRevenue - calcInvestment;
  const calculatedCostPerAcre = calcAcres > 0 ? Math.round(calcInvestment / calcAcres) : 0;
  const calculatedProfitPerAcre = calcAcres > 0 ? Math.round(calculatedNetProfit / calcAcres) : 0;

  // Expense Aggregations
  const totalInvestment = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalAcres = 4.5;
  const costPerAcre = Math.round(totalInvestment / totalAcres);

  // Category breakdown
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const categoryColors: Record<string, string> = {
    Seeds: 'bg-emerald-500',
    Fertilizer: 'bg-blue-500',
    'Crop Protection': 'bg-amber-500',
    Labour: 'bg-purple-500',
    Irrigation: 'bg-cyan-500',
    Machinery: 'bg-rose-500',
    Transport: 'bg-orange-500',
    Other: 'bg-slate-500'
  };

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || Number(amount) <= 0) {
      showToast('error', 'Please enter a valid description and positive amount');
      return;
    }

    const newExp: FarmExpense = {
      id: `exp-${Date.now()}`,
      farmerId: 'user-farmer-1',
      farmId: 'farm-1',
      date: new Date().toISOString().split('T')[0],
      category,
      description,
      amount: Number(amount),
      cropSeason: 'Kharif 2026'
    };

    onAddExpense(newExp);
    showToast('success', 'Expense Logged Successfully', `₹${amount} recorded for ${category}`);
    setDescription('');
    setAmount('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Sub-tab navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'expenses'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>{t('expenses')}</span>
          </button>
          <button
            onClick={() => setActiveTab('pnl')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'pnl'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{t('profitLoss')} Calculator</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'history'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <History className="w-4 h-4" />
            <span>{t('farmHistory')}</span>
          </button>
        </div>

        {activeTab === 'expenses' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>{t('logExpense')}</span>
          </button>
        )}
      </div>

      {/* TAB 1: EXPENSES */}
      {activeTab === 'expenses' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Total Season Investment</span>
              <div className="text-2xl font-bold text-slate-900 mt-1">₹{totalInvestment.toLocaleString('en-IN')}</div>
              <span className="text-[11px] text-slate-500">Across 4.5 Acres (Kharif 2026)</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Average Cost Per Acre</span>
              <div className="text-2xl font-bold text-emerald-800 mt-1">₹{costPerAcre.toLocaleString('en-IN')}</div>
              <span className="text-[11px] text-emerald-700">Within optimal regional benchmark</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Largest Expense Head</span>
              <div className="text-2xl font-bold text-slate-900 mt-1">
                Fertilizers ({Math.round(((categoryTotals['Fertilizer'] || 0) / (totalInvestment || 1)) * 100)}%)
              </div>
              <span className="text-[11px] text-slate-500">Includes organic farmyard manure</span>
            </div>
          </div>

          {/* Category-Wise Progress Breakdown */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Category-Wise Expense Distribution
            </h4>
            
            {/* Multi-segment progress bar */}
            <div className="w-full h-4 rounded-full bg-slate-200 flex overflow-hidden">
              {Object.entries(categoryTotals).map(([cat, amt]) => {
                const widthPct = Math.round((amt / (totalInvestment || 1)) * 100);
                if (widthPct === 0) return null;
                return (
                  <div
                    key={cat}
                    className={`${categoryColors[cat] || 'bg-slate-400'} h-full transition-all`}
                    style={{ width: `${widthPct}%` }}
                    title={`${cat}: ₹${amt.toLocaleString('en-IN')} (${widthPct}%)`}
                  ></div>
                );
              })}
            </div>

            {/* Legend grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {Object.entries(categoryTotals).map(([cat, amt]) => (
                <div key={cat} className="flex items-center gap-2 text-xs">
                  <span className={`w-3 h-3 rounded-full ${categoryColors[cat] || 'bg-slate-400'}`}></span>
                  <div className="truncate">
                    <span className="text-slate-600 block text-[11px]">{cat}</span>
                    <span className="font-bold text-slate-900">₹{amt.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expenses Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Date</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5 text-right rounded-r-xl">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-mono text-slate-500">{exp.date}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
                        <span className={`w-2 h-2 rounded-full ${categoryColors[exp.category] || 'bg-slate-400'}`}></span>
                        {exp.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-800 font-medium">{exp.description}</td>
                    <td className="p-3.5 text-right font-bold text-slate-900 font-mono">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PROFIT & LOSS CALCULATOR */}
      {activeTab === 'pnl' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold">Transparent Agronomic Projection: </span>
              {language === 'te' 
                ? 'దిగుబడి మరియు లాభనష్టాలు మీ వాస్తవ మార్కెట్ ధర మరియు క్షేత్రస్థాయి దిగుబడిపై ఆధారపడి ఉంటాయి. ఈ గణన ఖచ్చితమైన ప్రణాళిక కోసం సహాయపడుతుంది.'
                : 'Estimated profit & loss figures are economic projections based on user-entered yield and current mandi prices. Clearly labeled as guidance.'}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Harvest & Financial Parameters
              </h4>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Farm Area (Acres)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={calcAcres}
                  onChange={e => setCalcAcres(Number(e.target.value))}
                  className="w-full p-2.5 text-sm bg-white border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Total Production Investment (₹)
                </label>
                <input
                  type="number"
                  value={calcInvestment}
                  onChange={e => setCalcInvestment(Number(e.target.value))}
                  className="w-full p-2.5 text-sm bg-white border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Expected / Actual Yield (Quintals)
                </label>
                <input
                  type="number"
                  value={calcYield}
                  onChange={e => setCalcYield(Number(e.target.value))}
                  className="w-full p-2.5 text-sm bg-white border border-slate-300 rounded-xl"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Average: {(calcYield / (calcAcres || 1)).toFixed(1)} Quintals / Acre
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Selling Price (₹ per Quintal)
                </label>
                <input
                  type="number"
                  value={calcPrice}
                  onChange={e => setCalcPrice(Number(e.target.value))}
                  className="w-full p-2.5 text-sm bg-white border border-slate-300 rounded-xl"
                />
                <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
                  Current Warangal Mandi Rate: ₹7,250 / Quintal
                </span>
              </div>
            </div>

            {/* Calculated Output Breakdown */}
            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold">
                  PROJECTED FINANCIAL OUTCOME
                </span>

                <div className="mt-4 space-y-4">
                  <div>
                    <span className="text-xs text-slate-300">Estimated Gross Revenue</span>
                    <div className="text-3xl font-extrabold text-white mt-0.5">
                      ₹{calculatedRevenue.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-slate-300">Net Estimated Profit</span>
                      <div className={`text-2xl font-bold mt-0.5 ${calculatedNetProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        ₹{calculatedNetProfit.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-300">Profit Per Acre</span>
                      <div className="text-2xl font-bold text-amber-300 mt-0.5">
                        ₹{calculatedProfitPerAcre.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white/10 rounded-xl text-xs space-y-1">
                <div className="flex justify-between text-slate-200">
                  <span>Investment Cost / Acre:</span>
                  <span className="font-mono font-bold">₹{calculatedCostPerAcre.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Profit Margin:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {calculatedRevenue > 0 ? ((calculatedNetProfit / calculatedRevenue) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FARM HISTORY (Yearly Comparisons) */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">
              Multi-Year Production & Profit Comparisons (2024 - 2026)
            </h4>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-xl">
              Consistent Positive Trajectory
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {history.map(item => (
              <div
                key={item.year}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-slate-900">{item.year}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    {item.season}
                  </span>
                </div>

                <div className="text-xs text-slate-600">
                  Crop: <strong className="text-slate-800">{item.crop}</strong> ({item.acres} Acres)
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Expenses:</span>
                    <span className="font-mono font-semibold">₹{item.totalExpenses.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Yield:</span>
                    <span className="font-mono font-semibold">{item.yieldQuintals} Quintals</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gross Revenue:</span>
                    <span className="font-mono font-semibold">₹{item.totalRevenue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="font-bold text-slate-800">Net Profit:</span>
                    <span className="font-mono font-bold text-emerald-700">₹{item.netProfit.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-emerald-800">
                    <span>Profit / Acre:</span>
                    <span className="font-mono font-bold">₹{item.profitPerAcre.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-700" />
              <span>Record Farm Expense</span>
            </h3>

            <form onSubmit={handleAddExpenseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expense Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as FarmExpense['category'])}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="Seeds">Seeds</option>
                  <option value="Fertilizer">Fertilizers</option>
                  <option value="Crop Protection">Crop Protection (Pesticides / Bio)</option>
                  <option value="Labour">Labour Wages</option>
                  <option value="Irrigation">Irrigation / Drip Spares</option>
                  <option value="Machinery">Machinery / Tractor Hire</option>
                  <option value="Transport">Transport to Mandi</option>
                  <option value="Other">Other Miscellaneous</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Purpose
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2 bags DAP from Balaji Agro"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 2700"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

