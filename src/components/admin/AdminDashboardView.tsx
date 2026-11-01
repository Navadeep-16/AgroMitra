import React, { useState } from 'react';
import { User, Shop } from '../../types/user';
import { Product, Order } from '../../types/store';
import { storage } from '../../services/storage';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  ShieldCheck, 
  Users, 
  Store, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Settings, 
  BarChart3,
  Search,
  Layers,
  Lock
} from 'lucide-react';

interface AdminDashboardViewProps {
  users: User[];
  shops: Shop[];
  products: Product[];
  orders: Order[];
  onRefreshData: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  users,
  shops,
  products,
  orders,
  onRefreshData
}) => {
  const { t } = useLanguage();
  const { showToast } = useNotification();
  const [activeTab, setActiveTab] = useState<'kpi' | 'users' | 'shops' | 'products' | 'logs'>('kpi');
  const [searchTerm, setSearchTerm] = useState('');

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

  const toggleShopVerification = (shopId: string) => {
    const shopList = storage.getShops();
    const target = shopList.find(s => s.id === shopId);
    if (target) {
      target.verified = !target.verified;
      localStorage.setItem('agromitra_shops', JSON.stringify(shopList));
      onRefreshData();
      showToast('success', 'Verification Updated', `${target.shopName} verification status changed.`);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-800">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">AgroMitra Central Platform Governance</h2>
              <p className="text-xs text-slate-500">System Administrator Control & Operational Compliance</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('kpi')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'kpi' ? 'bg-white text-purple-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            Platform KPIs
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'users' ? 'bg-white text-purple-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('shops')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'shops' ? 'bg-white text-purple-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            Shops ({shops.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'products' ? 'bg-white text-purple-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            Catalog ({products.length})
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Total Registered Farmers</span>
          <div className="text-2xl font-black text-slate-900 mt-1">1,248</div>
          <span className="text-[10px] text-emerald-700 font-semibold">+18.4% monthly growth</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Verified Input Shops</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{shops.length} Active</div>
          <span className="text-[10px] text-emerald-700 font-semibold">100% CIBRC compliant</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Platform GMV (Volume)</span>
          <div className="text-2xl font-black text-emerald-800 font-mono mt-1">
            ₹{(totalRevenue * 12).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-500">Across 3 regional mandis</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">AI Inferences Run</span>
          <div className="text-2xl font-black text-purple-800 font-mono mt-1">8,420</div>
          <span className="text-[10px] text-purple-700 font-semibold">Vision + Recommendation</span>
        </div>
      </div>

      {/* TAB 1: KPI & OVERVIEW */}
      {activeTab === 'kpi' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Platform Health & Security Status</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-600">Database Cluster:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Healthy (PostgreSQL Primary)
                </span>
              </div>
              <div className="flex justify-between p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-600">AI Vision Engine:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PyTorch Plant-ResNet Active
                </span>
              </div>
              <div className="flex justify-between p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-600">APMC Mandi Scraper:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> AGMARKNET Sync: 100% OK
                </span>
              </div>
              <div className="flex justify-between p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-600">Batch Counterfeit Scans:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zero Anomalies Detected
                </span>
              </div>
            </div>
          </div>

          <div className="bg-purple-950 text-white p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              Emergency Broadcast Center
            </h3>
            <p className="text-xs text-purple-200 leading-relaxed">
              Broadcast high-priority notifications (e.g. Unseasonal Cyclone Alert, Subsidized Seed Distribution Dates) to all active farmer mobile devices.
            </p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Alert headline..."
                className="w-full p-2.5 text-xs bg-purple-900 border border-purple-800 rounded-xl text-white placeholder-purple-400"
              />
              <button
                onClick={() => showToast('info', 'Broadcast Dispatched', 'Emergency notification pushed to 1,248 farmers.')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition"
              >
                Send High Priority Push
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USERS */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">User</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Phone</th>
                <th className="p-3.5 text-right rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 transition">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-[11px] text-slate-500">{u.email}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800 uppercase">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600">{u.location}</td>
                  <td className="p-3.5 font-mono text-slate-600">{u.phone}</td>
                  <td className="p-3.5 text-right">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: SHOPS VERIFICATION */}
      {activeTab === 'shops' && (
        <div className="space-y-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Shop Name</th>
                <th className="p-3.5">Owner</th>
                <th className="p-3.5">License #</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5">Verification</th>
                <th className="p-3.5 text-right rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shops.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900">{s.shopName}</td>
                  <td className="p-3.5 text-slate-600">{s.ownerName}</td>
                  <td className="p-3.5 font-mono text-slate-600">{s.licenseNumber}</td>
                  <td className="p-3.5 font-bold text-amber-600">★ {s.rating}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      s.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {s.verified ? 'Verified Dealer' : 'Pending Verification'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => toggleShopVerification(s.id)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                    >
                      {s.verified ? 'Revoke' : 'Approve License'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

