import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { UserRole } from '../../types/user';
import { 
  Sprout, 
  ShoppingCart, 
  Globe, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  ShieldCheck, 
  Store, 
  GraduationCap, 
  Tractor,
  Layers,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { user, role, switchRole, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const rolesList: { id: UserRole; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'FARMER', label: t('roleFarmer'), icon: Tractor },
    { id: 'SHOP_OWNER', label: t('roleShopOwner'), icon: Store },
    { id: 'EXPERT', label: t('roleExpert'), icon: GraduationCap },
    { id: 'ADMIN', label: t('roleAdmin'), icon: ShieldCheck },
  ];

  const handleRoleSelect = (newRole: UserRole) => {
    switchRole(newRole);
    setRoleDropdownOpen(false);
    // Switch to respective dashboard view
    if (newRole === 'FARMER') setCurrentTab('farmer-dashboard');
    else if (newRole === 'SHOP_OWNER') setCurrentTab('shop-dashboard');
    else if (newRole === 'EXPERT') setCurrentTab('expert-dashboard');
    else if (newRole === 'ADMIN') setCurrentTab('admin-dashboard');
  };

  const navLinks = [
    { id: 'landing', label: t('home') },
    { id: 'features', label: t('features') },
    { id: 'smart-farming', label: t('smartFarming') },
    { id: 'store', label: t('agroStore') },
    { id: 'experts-view', label: t('experts') },
    { id: 'about', label: t('about') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      {/* Top micro banner for Role Switcher */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-400">
              <Layers className="w-3.5 h-3.5" />
              {t('quickRoleSwitch')}:
            </span>
            <div className="hidden sm:flex items-center gap-1">
              {rolesList.map(r => {
                const Icon = r.icon;
                const isActive = role === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-200 hover:bg-emerald-900/70 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-300 hidden md:inline">
              🌾 Kisan Helpline: <span className="text-white font-medium">1800-180-1551</span>
            </span>

            {/* Language Switcher */}
            <div className="inline-flex items-center bg-emerald-900/80 rounded-md p-0.5 border border-emerald-800">
              <Globe className="w-3 h-3 text-emerald-300 ml-1.5 mr-1" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs font-medium rounded ${
                  language === 'en' ? 'bg-white text-emerald-900 font-semibold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2 py-0.5 text-xs font-medium rounded ${
                  language === 'te' ? 'bg-white text-emerald-900 font-semibold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                తెలుగు
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                🌾 AgroMitra
              </span>
              <span className="block text-[10px] uppercase font-semibold tracking-wider text-emerald-700 -mt-1">
                Smart Agriculture
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  currentTab === link.id
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <button
              onClick={() => setCurrentTab('cart')}
              className="relative p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Dashboard CTA */}
            <button
              onClick={() => {
                if (role === 'FARMER') setCurrentTab('farmer-dashboard');
                else if (role === 'SHOP_OWNER') setCurrentTab('shop-dashboard');
                else if (role === 'EXPERT') setCurrentTab('expert-dashboard');
                else if (role === 'ADMIN') setCurrentTab('admin-dashboard');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm shadow-emerald-700/20 hover:shadow-md transition active:scale-95"
            >
              <Tractor className="w-4 h-4" />
              <span>{t('dashboard')}</span>
            </button>

            {/* User Dropdown / Profile pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition text-slate-700 text-sm"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="text-left hidden md:block">
                  <div className="text-xs font-semibold leading-tight text-slate-900">{user?.name}</div>
                  <div className="text-[10px] text-emerald-700 font-medium capitalize">
                    {role.replace('_', ' ').toLowerCase()}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-[11px] text-emerald-700 font-medium mt-0.5">{user?.location}</p>
                  </div>

                  <div className="py-1">
                    <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Role
                    </div>
                    {rolesList.map(r => {
                      const Icon = r.icon;
                      return (
                        <button
                          key={r.id}
                          onClick={() => handleRoleSelect(r.id)}
                          className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-left transition ${
                            role === r.id ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-emerald-600" />
                          <span>{r.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setRoleDropdownOpen(false);
                        setCurrentTab('auth');
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentTab === link.id
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {t('quickRoleSwitch')}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {rolesList.map(r => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      handleRoleSelect(r.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium border ${
                      role === r.id ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

