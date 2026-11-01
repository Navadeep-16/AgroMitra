import React, { useState } from 'react';
import { Product } from '../../types/store';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  X, 
  ShoppingCart, 
  ShieldCheck, 
  AlertTriangle, 
  QrCode, 
  Building2, 
  Clock, 
  Check, 
  MapPin, 
  Info 
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onGoToCart?: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose, onGoToCart }) => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const { showToast } = useNotification();
  const [quantity, setQuantity] = useState(1);

  const activeBatch = product.batches[0];

  const handleAddToCart = () => {
    addToCart(product, quantity, activeBatch);
    showToast('success', 'Added to Cart', `${quantity} x ${product.name} added to your cart.`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, activeBatch);
    if (onGoToCart) onGoToCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Batch Verification Badge */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between border-r border-slate-200">
            <div className="h-72 w-full rounded-2xl overflow-hidden bg-white shadow-xs">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Authenticity Certificate Box */}
            {activeBatch && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-900 font-bold">
                  <span className="flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-emerald-700" />
                    Batch Authenticity Sealed
                  </span>
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase">
                    Verified
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 font-mono">
                  <div>
                    <span className="block text-[10px] text-slate-400">Batch No:</span>
                    <strong className="text-slate-900">{activeBatch.batchNumber}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Expiry Date:</span>
                    <strong className="text-slate-900">{activeBatch.expiryDate}</strong>
                  </div>
                </div>
                <p className="text-[10px] text-emerald-800">
                  Direct depot dispatch from certified manufacturer with tamper-evident seal.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Detailed Product Info */}
          <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500">{product.category}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                {language === 'te' ? product.nameTe : product.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">{product.packSize} • SKU: {product.sku}</p>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-slate-100">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-sm text-slate-400 line-through font-mono">
                  MRP ₹{product.mrp}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Save ₹{product.mrp - product.price} (Inclusive of all taxes)
              </span>
            </div>

            {/* Description */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider block">Description</span>
              <p className="text-slate-600 leading-relaxed">
                {language === 'te' ? product.descriptionTe : product.description}
              </p>
            </div>

            {/* Dosage & Application Instructions */}
            {product.dosageInstructions && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Recommended Application & Dosage:</span>
                <p className="text-slate-700">{product.dosageInstructions}</p>
              </div>
            )}

            {/* Safety & Responsible Use Warning */}
            {product.safetyInstructions && (
              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs space-y-1 text-amber-950">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  Statutory Safety & Handling Caution:
                </span>
                <p className="text-amber-900 text-[11px] leading-relaxed">
                  {product.safetyInstructions}
                </p>
              </div>
            )}

            {/* Seller & Manufacturer */}
            <div className="text-xs space-y-1 pt-2 border-t border-slate-100 text-slate-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Manufacturer: <strong>{product.manufacturer}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Sold By: <strong>{product.shopName}</strong> (Authorized Dealer)</span>
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-slate-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  Total: <strong className="text-slate-900 font-mono">₹{product.price * quantity}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl border-2 border-emerald-700 text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{t('addToCart')}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

