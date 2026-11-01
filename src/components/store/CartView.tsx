import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { storage } from '../../services/storage';
import { Order, OrderStatus } from '../../types/store';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Store, 
  Truck, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface CartViewProps {
  onOrderPlaced: (orderId: string) => void;
  onContinueShopping: () => void;
}

export const CartView: React.FC<CartViewProps> = ({ onOrderPlaced, onContinueShopping }) => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, deliveryFee, total, totalItems } = useCart();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { showToast } = useNotification();

  const [deliveryType, setDeliveryType] = useState<'Store Pickup' | 'Home Delivery'>('Store Pickup');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.location || 'Narsampet Rural, Warangal, Telangana');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery / Pickup' | 'UPI / Digital Payment'>('Cash on Delivery / Pickup');
  const [isPlacing, setIsPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{t('emptyCart')}</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Browse our certified marketplace for high-yield seeds, soluble fertilizers, bio-inputs, and farm equipment.
        </p>
        <button
          onClick={onContinueShopping}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition"
        >
          <span>{t('exploreAgroStore')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsPlacing(true);

    setTimeout(() => {
      const orderNumber = `AGRO-ORD-${Date.now().toString().slice(-6)}`;
      const primaryShop = items[0]?.product.shopName || 'Sri Balaji Agro Agencies';

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        farmerId: user?.id || 'user-farmer-1',
        farmerName: user?.name || 'Ramesh Kumar',
        farmerPhone: user?.phone || '+91 98480 12345',
        shopId: items[0]?.product.shopId || 'shop-1',
        shopName: primaryShop,
        shopPhone: '+91 94401 56789',
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          category: item.product.category,
          packSize: item.product.packSize,
          unitPrice: item.product.price,
          quantity: item.quantity,
          totalPrice: item.product.price * item.quantity,
          batchNumber: item.selectedBatch?.batchNumber || 'BAT-VERIFIED-2026'
        })),
        subtotal,
        deliveryFee: deliveryType === 'Home Delivery' ? deliveryFee : 0,
        taxAmount: Math.round(subtotal * 0.05),
        totalAmount: subtotal + (deliveryType === 'Home Delivery' ? deliveryFee : 0) + Math.round(subtotal * 0.05),
        deliveryType,
        deliveryAddress: deliveryType === 'Home Delivery' ? deliveryAddress : undefined,
        status: 'Placed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        statusHistory: [
          {
            status: 'Placed',
            timestamp: new Date().toISOString(),
            note: 'Order placed by farmer via digital portal'
          }
        ],
        paymentMethod,
        paymentStatus: 'Pending',
        invoiceNumber: `INV-${Date.now().toString().slice(-5)}`
      };

      storage.saveOrder(newOrder);
      clearCart();
      setIsPlacing(false);
      showToast('success', t('orderSuccess'), `Order #${orderNumber} created.`);
      onOrderPlaced(newOrder.id);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Items List */}
      <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <ShoppingCart className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">{t('cart')} ({totalItems} Items)</h2>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
          >
            Clear Cart
          </button>
        </div>

        {/* Item Rows */}
        <div className="divide-y divide-slate-100">
          {items.map(item => (
            <div key={item.product.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    {item.product.brand}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {language === 'te' ? item.product.nameTe : item.product.name}
                  </h4>
                  <p className="text-xs text-slate-500">{item.product.packSize} • ₹{item.product.price} each</p>
                  {item.selectedBatch && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      Batch: {item.selectedBatch.batchNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-xs bg-slate-100 font-bold hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-slate-900 font-mono">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-xs bg-slate-100 font-bold hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>

                <div className="text-right w-20">
                  <div className="text-sm font-bold text-slate-900 font-mono">
                    ₹{item.product.price * item.quantity}
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Sidebar */}
      <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          {t('orderSummary')}
        </h3>

        {/* Delivery Method Choice */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Fulfillment Preference
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDeliveryType('Store Pickup')}
              className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                deliveryType === 'Store Pickup'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Store className="w-4 h-4 text-emerald-700" />
              <span>{t('pickupStore')}</span>
              <span className="text-[10px] text-emerald-700 font-normal">Free (Ready today)</span>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryType('Home Delivery')}
              className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                deliveryType === 'Home Delivery'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>{t('homeDelivery')}</span>
              <span className="text-[10px] text-slate-500 font-normal">Direct to Farm</span>
            </button>
          </div>
        </div>

        {deliveryType === 'Home Delivery' && (
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              Farm Delivery Address
            </label>
            <textarea
              rows={2}
              value={deliveryAddress}
              onChange={e => setDeliveryAddress(e.target.value)}
              className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
        )}

        {/* Payment Choice */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Payment Mode
          </label>
          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                name="pay"
                checked={paymentMethod === 'Cash on Delivery / Pickup'}
                onChange={() => setPaymentMethod('Cash on Delivery / Pickup')}
                className="text-emerald-600 accent-emerald-600"
              />
              <span className="font-semibold text-slate-800">Cash on Delivery / Pickup</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                name="pay"
                checked={paymentMethod === 'UPI / Digital Payment'}
                onChange={() => setPaymentMethod('UPI / Digital Payment')}
                className="text-emerald-600 accent-emerald-600"
              />
              <span className="font-semibold text-slate-800">UPI / QR Payment</span>
            </label>
          </div>
        </div>

        {/* Line Items Calculations */}
        <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>{t('subtotal')}</span>
            <span className="font-mono font-semibold">₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>{t('deliveryFee')}</span>
            <span className="font-mono font-semibold">
              {deliveryType === 'Store Pickup' || deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Estimated GST (5%)</span>
            <span className="font-mono font-semibold">₹{Math.round(subtotal * 0.05)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900">
            <span>{t('total')}</span>
            <span className="font-mono text-emerald-800 text-lg">
              ₹{subtotal + (deliveryType === 'Home Delivery' ? deliveryFee : 0) + Math.round(subtotal * 0.05)}
            </span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={isPlacing}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-extrabold text-sm shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{isPlacing ? 'Confirming with Store...' : t('placeOrder')}</span>
        </button>

        <p className="text-[10px] text-center text-slate-400">
          🛡 Covered by AgroMitra 100% Genuine Batch Quality Guarantee.
        </p>
      </div>
    </div>
  );
};

