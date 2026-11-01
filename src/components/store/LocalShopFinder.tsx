import React, { useState } from 'react';
import { Shop } from '../../types/user';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Store, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Star, 
  Navigation, 
  CheckCircle2, 
  Search,
  PackageCheck
} from 'lucide-react';

interface LocalShopFinderProps {
  shops: Shop[];
  onSelectShop?: (shop: Shop) => void;
}

export const LocalShopFinder: React.FC<LocalShopFinderProps> = ({ shops }) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPickupOnly, setFilterPickupOnly] = useState(false);

  const filteredShops = shops.filter(s => {
    const matchesSearch = s.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPickup = filterPickupOnly ? s.pickupAvailable : true;
    return matchesSearch && matchesPickup;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Store className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">{t('nearbyShops')}</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Verified neighborhood agricultural input dealers stocking genuine seeds, fertilizers, and plant protection.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search shop or locality..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl w-60 focus:bg-white transition"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-100 px-3 py-2 rounded-xl">
            <input
              type="checkbox"
              checked={filterPickupOnly}
              onChange={e => setFilterPickupOnly(e.target.checked)}
              className="rounded-sm text-emerald-600 accent-emerald-600"
            />
            <span>Counter Pickup Available</span>
          </label>
        </div>
      </div>

      {/* Interactive Map Visual Simulator */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl h-64 p-6 overflow-hidden flex items-center justify-center border border-emerald-900 shadow-inner">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative z-10 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xl animate-bounce">
            <MapPin className="w-6 h-6" />
          </div>
          <h4 className="text-white font-bold text-sm">Warangal Agri Corridor Radial Map</h4>
          <p className="text-xs text-emerald-300 max-w-sm">
            Showing {filteredShops.length} certified input distributors within 10 km radius of your registered farm parcel.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 text-[11px] text-white border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live GPS Sync: Warangal-Narsampet Hwy</span>
          </div>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShops.map(shop => (
          <div
            key={shop.id}
            className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-400 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">{shop.shopName}</h3>
                    {shop.verified && (
                      <span title="State Licensed & Verified">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Prop: {shop.ownerName}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
                    {shop.distanceKm} km away
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold justify-end mt-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{shop.rating} ({shop.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Address & Hours */}
              <div className="space-y-1.5 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{shop.address}, {shop.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{shop.openingHours}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span>Lic: {shop.licenseNumber}</span>
                </div>
              </div>

              {/* Services badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {shop.pickupAvailable && (
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Counter Pickup
                  </span>
                )}
                {shop.homeDeliveryAvailable && (
                  <span className="text-[10px] font-semibold bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <PackageCheck className="w-3 h-3 text-blue-600" />
                    Farm Delivery
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs font-semibold">
              <a
                href={`tel:${shop.phone}`}
                className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition text-center"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Shop</span>
              </a>
              <button
                onClick={() => alert(`Starting Google Maps Navigation to ${shop.shopName}`)}
                className="py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-1.5 transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
