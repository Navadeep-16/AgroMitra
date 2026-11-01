import React from 'react';
import { Product } from '../../types/store';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { ShoppingCart, Star, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const { showToast } = useNotification();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast('success', 'Added to Cart', `${product.name} (1 unit) added.`);
  };

  const isLowStock = product.stockQuantity <= product.lowStockThreshold && product.stockQuantity > 0;
  const isOutOfStock = product.stockQuantity === 0;

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Product Image & Badges */}
        <div className="relative h-48 bg-slate-100 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            {product.isOrganic && (
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                100% Organic
              </span>
            )}
          </div>

          <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-lg text-[11px] font-semibold text-slate-700 flex items-center gap-1 shadow-xs">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{product.rating} ({product.reviewsCount})</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            {product.brand}
          </div>
          <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
            {language === 'te' ? product.nameTe : product.name}
          </h4>
          <p className="text-[11px] text-slate-500">{product.packSize}</p>

          <div className="text-[11px] text-slate-600 truncate flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{product.shopName}</span>
          </div>
        </div>
      </div>

      {/* Price & Action */}
      <div className="p-4 pt-0">
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-slate-900 font-mono">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-slate-400 line-through font-mono">
                ₹{product.mrp}
              </span>
            )}
          </div>

          <div>
            {isOutOfStock ? (
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                {t('outOfStock')}
              </span>
            ) : isLowStock ? (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                Only {product.stockQuantity} Left
              </span>
            ) : (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {t('inStock')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={isOutOfStock}
          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{t('addToCart')}</span>
        </button>
      </div>
    </div>
  );
};

