import React, { useState } from 'react';
import { Product, Order, ProductBatch } from '../../types/store';
import { storage } from '../../services/storage';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  Store, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Plus, 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Printer, 
  Search,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ShopDashboardViewProps {
  products: Product[];
  orders: Order[];
  onRefreshData: () => void;
}

export const ShopDashboardView: React.FC<ShopDashboardViewProps> = ({ 
  products, 
  orders, 
  onRefreshData 
}) => {
  const { t, language } = useLanguage();
  const { showToast } = useNotification();
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'orders' | 'batches' | 'qr'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected order for status update or invoice modal
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  // New Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<Product['category']>('Fertilizers');
  const [newProductBrand, setNewProductBrand] = useState('');
  const [newProductPackSize, setNewProductPackSize] = useState('1 kg Pouch');
  const [newProductPrice, setNewProductPrice] = useState('450');
  const [newProductStock, setNewProductStock] = useState('50');

  // Metrics
  const todaysOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Placed' || o.status === 'Confirmed').length;
  const todaysSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const lowStockCount = products.filter(p => p.stockQuantity <= p.lowStockThreshold).length;
  const totalCustomers = 48;

  // Order status actions
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status'], note?: string) => {
    const ord = orders.find(o => o.id === orderId);
    if (ord) {
      ord.status = newStatus;
      ord.updatedAt = new Date().toISOString();
      ord.statusHistory.push({
        status: newStatus,
        timestamp: new Date().toISOString(),
        note: note || `Status updated to ${newStatus} by shop manager`
      });
      storage.saveOrder(ord);
      onRefreshData();
      showToast('success', 'Order Updated', `Order #${ord.orderNumber} is now marked ${newStatus}`);
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      shopId: 'shop-1',
      shopName: 'Sri Balaji Agro Agencies & Seeds',
      name: newProductName,
      nameTe: newProductName,
      category: newProductCategory,
      brand: newProductBrand || 'Balaji Agro Certified',
      packSize: newProductPackSize,
      price: Number(newProductPrice),
      mrp: Number(newProductPrice) * 1.15,
      stockQuantity: Number(newProductStock),
      lowStockThreshold: 10,
      sku: `BALAJI-${Date.now().toString().slice(-4)}`,
      rating: 4.8,
      reviewsCount: 1,
      imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&auto=format&fit=crop&q=80',
      description: 'Certified regional agricultural input product supplied with manufacturer warranty.',
      descriptionTe: 'నాణ్యతా ప్రమాణాలు కలిగిన వ్యవసాయ ఉత్పత్తి.',
      suitableCrops: ['Cotton', 'Chilli', 'Paddy'],
      manufacturer: 'Sri Balaji Agro Formulations',
      batches: [
        {
          id: `b-${Date.now()}`,
          batchNumber: `BAL-${Date.now().toString().slice(-5)}`,
          manufacturingDate: '2026-05-01',
          expiryDate: '2028-04-30',
          supplierName: 'Balaji Central Warehouse',
          purchasePrice: Number(newProductPrice) * 0.8,
          sellingPrice: Number(newProductPrice),
          quantityAdded: Number(newProductStock),
          quantityRemaining: Number(newProductStock),
          qrCodeToken: `AGRO-AUTH-BAL-${Date.now()}`,
          verifiedAuthentic: true
        }
      ]
    };

    storage.saveProduct(newProd);
    onRefreshData();
    showToast('success', 'Product Added', `${newProductName} added to store catalog.`);
    setNewProductName('');
    setShowAddProductModal(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Store className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Sri Balaji Agro Agencies — Shop Console</h2>
              <p className="text-xs text-slate-500">License: TS-WGL-AGR-2023-8841 • Warangal, Telangana</p>
            </div>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl transition ${
              activeTab === 'overview' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3.5 py-1.5 rounded-xl transition ${
              activeTab === 'inventory' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-1.5 rounded-xl transition ${
              activeTab === 'orders' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('batches')}
            className={`px-3.5 py-1.5 rounded-xl transition ${
              activeTab === 'batches' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            Batches & QR
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS (Always visible) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Today's Orders</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{todaysOrders}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">+100% active</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Pending Orders</span>
          <div className="text-2xl font-black text-amber-700 mt-1">{pendingOrders}</div>
          <span className="text-[10px] text-amber-800">Requires fulfillment</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Today's Sales</span>
          <div className="text-2xl font-black text-emerald-800 font-mono mt-1">
            ₹{todaysSales.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Store volume</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Low Stock Alert</span>
          <div className="text-2xl font-black text-rose-700 mt-1">{lowStockCount}</div>
          <span className="text-[10px] text-rose-800">Below threshold</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Registered Farmers</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalCustomers}</div>
          <span className="text-[10px] text-slate-500">In shop network</span>
        </div>
      </div>

      {/* SUB-VIEW 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Quick Orders Queue */}
            <div className="lg:col-span-7 bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Live Incoming Customer Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 3).map(ord => (
                  <div key={ord.id} className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-900">{ord.orderNumber}</span>
                        <span className="text-slate-400 block text-[11px]">Farmer: {ord.farmerName} ({ord.farmerPhone})</span>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                        {ord.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 truncate">
                      {ord.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="font-bold text-slate-900 font-mono">Total: ₹{ord.totalAmount}</span>
                      <div className="flex items-center gap-2">
                        {ord.status === 'Placed' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Confirmed')}
                            className="px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800"
                          >
                            Accept Order
                          </button>
                        )}
                        {ord.status === 'Confirmed' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Packed')}
                            className="px-3 py-1 bg-blue-700 text-white rounded-lg text-xs font-bold hover:bg-blue-800"
                          >
                            Mark Packed
                          </button>
                        )}
                        {ord.status === 'Packed' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Ready for Pickup')}
                            className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700"
                          >
                            Ready for Pickup
                          </button>
                        )}
                        {ord.status === 'Ready for Pickup' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                            className="px-3 py-1 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900"
                          >
                            Mark Delivered
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Alerts Box */}
            <div className="lg:col-span-5 bg-rose-50/50 p-5 rounded-3xl border border-rose-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Critical Low Stock Items</span>
                </h3>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  Action Needed
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {products.filter(p => p.stockQuantity <= p.lowStockThreshold + 10).map(p => (
                  <div key={p.id} className="bg-white p-3.5 rounded-2xl border border-rose-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{p.name}</span>
                      <span className="text-[11px] text-slate-500">{p.packSize} • SKU: {p.sku}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-rose-700 text-sm block">
                        {p.stockQuantity} Left
                      </span>
                      <span className="text-[10px] text-slate-400">Min: {p.lowStockThreshold}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search products in inventory..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl w-64 focus:bg-white"
              />
            </div>

            <button
              onClick={() => setShowAddProductModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product to Store</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Product & SKU</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Active Batch</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products
                  .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(p => {
                    const batch = p.batches[0];
                    const isLow = p.stockQuantity <= p.lowStockThreshold;
                    return (
                      <tr key={p.id} className="hover:bg-slate-50 transition">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{p.name}</div>
                          <div className="text-[11px] text-slate-500">{p.packSize} • {p.sku}</div>
                        </td>
                        <td className="p-3.5 text-slate-600 font-medium">{p.category}</td>
                        <td className="p-3.5 font-mono text-emerald-800">{batch?.batchNumber || 'N/A'}</td>
                        <td className="p-3.5 font-bold font-mono text-slate-900">{p.stockQuantity}</td>
                        <td className="p-3.5 font-bold font-mono text-slate-900">₹{p.price}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                            isLow ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isLow ? 'Low Stock' : 'In Stock'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              const newStock = prompt(`Update stock for ${p.name}:`, String(p.stockQuantity));
                              if (newStock !== null) {
                                p.stockQuantity = Number(newStock);
                                storage.saveProduct(p);
                                onRefreshData();
                              }
                            }}
                            className="px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                          >
                            Edit Stock
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Order #</th>
                  <th className="p-3.5">Farmer & Contact</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right rounded-r-xl">Fulfillment Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map(ord => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{ord.farmerName}</div>
                      <div className="text-[11px] text-slate-500">{ord.farmerPhone}</div>
                    </td>
                    <td className="p-3.5 text-slate-700">
                      {ord.items.length} items
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">₹{ord.totalAmount}</td>
                    <td className="p-3.5 text-slate-600 font-medium">{ord.deliveryType}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrderForInvoice(ord)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                          title="Generate Tax Invoice"
                        >
                          <FileText className="w-4 h-4" />
                        </button>

                        {ord.status === 'Placed' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Confirmed')}
                            className="px-2.5 py-1 text-xs font-bold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
                          >
                            Accept
                          </button>
                        )}
                        {ord.status === 'Confirmed' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Packed')}
                            className="px-2.5 py-1 text-xs font-bold bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                          >
                            Pack
                          </button>
                        )}
                        {ord.status === 'Packed' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Ready for Pickup')}
                            className="px-2.5 py-1 text-xs font-bold bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                          >
                            Ready
                          </button>
                        )}
                        {ord.status === 'Ready for Pickup' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                            className="px-2.5 py-1 text-xs font-bold bg-emerald-800 text-white rounded-lg hover:bg-emerald-900"
                          >
                            Deliver
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: BATCHES & QR AUTHENTICATION */}
      {activeTab === 'batches' && (
        <div className="space-y-6">
          <div className="p-5 bg-emerald-50/60 rounded-3xl border border-emerald-200 flex items-start gap-3 text-xs text-emerald-950">
            <QrCode className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-900 text-sm">QR Product Authenticity Ledger</strong>
              <p className="mt-0.5">
                Every seed packet, fertilizer bag, and bio-input batch is issued a cryptographic token linked with the manufacturer dispatch invoice to prevent counterfeit agricultural inputs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.flatMap(p => p.batches.map(b => ({ product: p, batch: b }))).map(({ product, batch }) => (
              <div
                key={batch.id}
                className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-emerald-400 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {batch.batchNumber}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{product.name}</h4>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
                  <div className="text-center space-y-1">
                    <QrCode className="w-20 h-20 text-slate-800 mx-auto" />
                    <span className="text-[10px] font-mono text-slate-400 block truncate max-w-[200px]">
                      {batch.qrCodeToken}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Mfg Date:</span>
                    <strong>{batch.manufacturingDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Expiry:</span>
                    <strong>{batch.expiryDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Wholesale:</span>
                    <strong>₹{batch.purchasePrice}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Retail (MRP):</span>
                    <strong className="text-emerald-800">₹{batch.sellingPrice}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-700" />
              <span>Add New Agricultural Product</span>
            </h3>

            <form onSubmit={handleAddProductSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zinc Sulphate 21% Agricultural Grade"
                  value={newProductName}
                  onChange={e => setNewProductName(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newProductCategory}
                  onChange={e => setNewProductCategory(e.target.value as Product['category'])}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="Seeds">Seeds</option>
                  <option value="Fertilizers">Fertilizers</option>
                  <option value="Crop Protection">Crop Protection</option>
                  <option value="Organic Products">Organic Products</option>
                  <option value="Farming Accessories">Farming Accessories</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Coromandel"
                    value={newProductBrand}
                    onChange={e => setNewProductBrand(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pack Size
                  </label>
                  <input
                    type="text"
                    value={newProductPackSize}
                    onChange={e => setNewProductPackSize(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProductPrice}
                    onChange={e => setNewProductPrice(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Opening Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProductStock}
                    onChange={e => setNewProductStock(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition"
                >
                  Create Product & Issue Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tax Invoice Modal for Shop Owner */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrderForInvoice(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500"
            >
              ✕
            </button>

            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="text-xl font-bold text-slate-900">
                  🌾 Sri Balaji Agro Agencies — Tax Invoice
                </span>
                <p className="text-xs text-slate-500">Shop #14, Market Road, Warangal • GSTIN: 36AAECB1294K1Z4</p>
              </div>
              <div className="text-right text-xs font-mono">
                <div className="font-bold text-slate-900">Invoice: {selectedOrderForInvoice.invoiceNumber || 'INV-2026-091'}</div>
                <div className="text-slate-500">Order: {selectedOrderForInvoice.orderNumber}</div>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Customer</span>
              <p className="font-bold text-slate-900">{selectedOrderForInvoice.farmerName} ({selectedOrderForInvoice.farmerPhone})</p>
              <p className="text-slate-600">Location: {selectedOrderForInvoice.deliveryAddress || 'Store Pickup'}</p>
            </div>

            <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-semibold">
                <tr>
                  <th className="p-2.5">Item & Batch</th>
                  <th className="p-2.5 text-center">Qty</th>
                  <th className="p-2.5 text-right">Price</th>
                  <th className="p-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedOrderForInvoice.items.map((it, i) => (
                  <tr key={i}>
                    <td className="p-2.5">
                      <div className="font-bold text-slate-900">{it.productName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">Batch: {it.batchNumber}</div>
                    </td>
                    <td className="p-2.5 text-center font-mono">{it.quantity}</td>
                    <td className="p-2.5 text-right font-mono">₹{it.unitPrice}</td>
                    <td className="p-2.5 text-right font-mono font-bold">₹{it.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-1 text-xs text-slate-600 border-t border-slate-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono">₹{selectedOrderForInvoice.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%):</span>
                <span className="font-mono">₹{selectedOrderForInvoice.taxAmount}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-200">
                <span>Grand Total:</span>
                <span className="font-mono text-emerald-800 text-base">₹{selectedOrderForInvoice.totalAmount}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 no-print">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

