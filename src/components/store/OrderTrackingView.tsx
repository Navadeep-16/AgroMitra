import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types/store';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Store, 
  FileText, 
  MapPin, 
  Phone, 
  AlertCircle,
  Printer
} from 'lucide-react';

interface OrderTrackingViewProps {
  orders: Order[];
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({ orders }) => {
  const { t, language } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<Order>(orders[0] || null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const statusSteps: OrderStatus[] = [
    'Placed',
    'Confirmed',
    'Packed',
    'Ready for Pickup',
    'Delivered'
  ];

  const getStepIndex = (status: OrderStatus) => {
    if (status === 'Out for Delivery') return 3;
    return statusSteps.indexOf(status);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Package className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-slate-900">{t('orders')} & Invoices</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Real-time fulfillment tracking with direct communication to your local certified shop.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="p-8 text-center text-slate-500 text-xs">
          No orders placed yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Orders selector list */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Recent Farm Orders
            </span>
            {orders.map(order => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md text-[10px]">
                      {order.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 font-medium truncate">
                    {order.shopName}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span>{order.items.length} items</span>
                    <strong className="text-slate-900 font-mono">₹{order.totalAmount}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Order Details & Visual Timeline */}
          {selectedOrder && (
            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6">
              {/* Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full">
                    Order Tracking
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-mono mt-1">
                    {selectedOrder.orderNumber}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()} via {selectedOrder.deliveryType}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowInvoiceModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl transition shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>View Tax Invoice</span>
                  </button>
                </div>
              </div>

              {/* Horizontal Lifecycle Timeline Nodes */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Fulfillment Status Progression
                </span>

                <div className="grid grid-cols-5 gap-2 text-center">
                  {statusSteps.map((step, idx) => {
                    const currentIdx = getStepIndex(selectedOrder.status);
                    const isDone = idx <= currentIdx;
                    const isNow = idx === currentIdx;

                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isNow
                              ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md'
                              : isDone
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={`text-[10px] font-semibold mt-2 ${
                          isNow ? 'text-emerald-800 font-bold' : isDone ? 'text-slate-700' : 'text-slate-400'
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shop & Farmer Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Fulfilling Merchant
                  </span>
                  <div className="font-bold text-slate-900">{selectedOrder.shopName}</div>
                  <div className="text-slate-500 flex items-center gap-1.5 pt-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedOrder.shopPhone}</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Delivery / Pickup Destination
                  </span>
                  <div className="font-bold text-slate-900">{selectedOrder.deliveryType}</div>
                  <div className="text-slate-500 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="truncate">{selectedOrder.deliveryAddress || 'Store Pickup Counter'}</span>
                  </div>
                </div>
              </div>

              {/* Items in Order */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Ordered Products & Authenticated Batches
                </span>
                <div className="divide-y divide-slate-100 text-xs">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">{item.productName}</span>
                        <span className="text-[11px] text-slate-500">
                          {item.packSize} • Qty: {item.quantity} • Batch: <span className="font-mono text-emerald-700">{item.batchNumber}</span>
                        </span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Grand Total</span>
                  <span className="font-mono text-emerald-800 text-base">₹{selectedOrder.totalAmount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Printable Tax Invoice Modal */}
      {showInvoiceModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500"
            >
              ✕
            </button>

            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="text-xl font-bold text-slate-900 flex items-center gap-1.5">
                  🌾 AgroMitra Tax Invoice
                </span>
                <p className="text-xs text-slate-500 mt-0.5">Original for Recipient • GST Input Credit Compliant</p>
              </div>
              <div className="text-right text-xs font-mono">
                <div className="font-bold text-slate-900">Invoice: {selectedOrder.invoiceNumber || 'INV-2026-091'}</div>
                <div className="text-slate-500">Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}</div>
              </div>
            </div>

            {/* Merchant and Buyer Info */}
            <div className="grid grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Seller Details</span>
                <p className="font-bold text-slate-900">{selectedOrder.shopName}</p>
                <p className="text-slate-600">GSTIN: 36AAECB1294K1Z4</p>
                <p className="text-slate-600">Phone: {selectedOrder.shopPhone}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Billed To Farmer</span>
                <p className="font-bold text-slate-900">{selectedOrder.farmerName}</p>
                <p className="text-slate-600">Phone: {selectedOrder.farmerPhone}</p>
                <p className="text-slate-600">Location: {selectedOrder.deliveryAddress || 'Narsampet, Warangal'}</p>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-semibold">
                <tr>
                  <th className="p-2.5">Item & Verified Batch</th>
                  <th className="p-2.5 text-center">Qty</th>
                  <th className="p-2.5 text-right">Rate</th>
                  <th className="p-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedOrder.items.map((it, idx) => (
                  <tr key={idx}>
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

            {/* Totals Calculation */}
            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono">₹{selectedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>CGST (2.5%) + SGST (2.5%):</span>
                <span className="font-mono">₹{selectedOrder.taxAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Fulfillment Fee:</span>
                <span className="font-mono">₹{selectedOrder.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Payable:</span>
                <span className="font-mono text-emerald-800">₹{selectedOrder.totalAmount}</span>
              </div>
            </div>

            {/* Print button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 no-print">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

