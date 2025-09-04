import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, MapPin, Phone } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems, openCart } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المنتجات', href: '/products' },
    { name: 'الخدمات', href: '/services' },
    { name: 'الفروع', href: '/branches' },
    { name: 'من نحن', href: '/about' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // التنقل إلى صفحة المنتجات مع البحث
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-green-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span>خدمة العملاء متاحة 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>أكثر من 1000 فرع في المملكة</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>توصيل مجاني للطلبات أكثر من 100 ريال</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-green-500 text-white p-2 rounded-lg ml-3">
              <div className="w-8 h-8 flex items-center justify-center font-bold text-xl">ن</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">صيدلية النهدي</h1>
              <p className="text-sm text-gray-600">صحتك أولويتنا</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="ابحث عن الأدوية والمنتجات الصحية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-green-500 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-gray-900">مرحباً، {user.name}</p>
                    <button
                      onClick={logout}
                      className="text-xs text-gray-600 hover:text-green-500"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden md:block">تسجيل الدخول</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-green-500"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-t border-gray-200">
          <div className="flex justify-center space-x-8 space-x-reverse py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Search */}
        <div className="md:hidden py-4 border-t border-gray-200">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="ابحث عن المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  location.pathname === item.href
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;