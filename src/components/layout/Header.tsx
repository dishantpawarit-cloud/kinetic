import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User as UserIcon, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { totalItemCount, setIsCartDrawerOpen } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
    }
  };

  const navLinks = [
    { label: 'New Releases', path: '/new-arrivals' },
    { label: 'Men', path: '/men' },
    { label: 'Women', path: '/women' },
    { label: 'Kids', path: '/kids' },
    { label: 'Best Sellers', path: '/best-sellers' },
    { label: 'Sale', path: '/sale', highlight: true }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
          {/* Zone 1: Single brand wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-zinc-700 hover:text-black focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link
              to="/"
              className="font-athletic text-3xl font-extrabold tracking-tighter text-black uppercase whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>KINETIC</span>
              <span className="w-2 h-2 rounded-full bg-black shrink-0" />
            </Link>
          </div>

          {/* Zone 2: Primary navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-zinc-800">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`whitespace-nowrap shrink-0 hover:text-black transition-colors relative py-1 ${
                    isActive ? 'text-black' : link.highlight ? 'text-red-600 hover:text-red-700' : 'text-zinc-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Search, Wishlist, Account, Cart CTA */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Desktop Search bar */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search shoes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 lg:w-56 pl-9 pr-4 py-2 bg-zinc-100 hover:bg-zinc-200/80 focus:bg-white focus:ring-1 focus:ring-black border border-transparent focus:border-black rounded-full text-xs text-zinc-900 placeholder:text-zinc-500 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-2 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Currency Pill */}
            <span
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-800 border border-zinc-200 cursor-default"
              title="Store Currency: Indian Rupee (INR)"
            >
              <span>🇮🇳</span>
              <span>₹ INR</span>
            </span>

            {/* Wishlist Button */}
            <Link
              to="/shop"
              className="p-2 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100 transition-colors relative"
              title="Saved items"
              aria-label="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
              )}
            </Link>

            {/* Account Link */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="p-2 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100 transition-colors relative"
              title={isAuthenticated ? `Signed in as ${user?.name}` : 'Sign in'}
              aria-label="Customer account"
            >
              <UserIcon className="w-5 h-5" />
              {isAuthenticated && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors relative focus:outline-none"
              aria-label={`Shopping bag with ${totalItemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isSearchExpanded && (
          <div className="md:hidden p-3 border-t border-zinc-200 bg-zinc-50">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search Air Max, Pegasus, Dunks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-300 rounded-full text-xs text-zinc-900 outline-none focus:border-black"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl flex flex-col p-6 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
              <span className="font-athletic text-2xl font-bold uppercase tracking-tight">KINETIC</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 text-zinc-500 hover:text-black rounded-full"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Primary category links */}
            <nav className="py-6 space-y-4">
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-bold text-zinc-900 hover:text-zinc-600"
              >
                All Footwear
              </Link>
              <Link
                to="/new-arrivals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-semibold text-zinc-900 hover:text-zinc-600"
              >
                New Releases
              </Link>
              <Link
                to="/men"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-semibold text-zinc-900 hover:text-zinc-600"
              >
                Men's Shoes
              </Link>
              <Link
                to="/women"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-semibold text-zinc-900 hover:text-zinc-600"
              >
                Women's Shoes
              </Link>
              <Link
                to="/kids"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-semibold text-zinc-900 hover:text-zinc-600"
              >
                Kids' Shoes
              </Link>
              <Link
                to="/best-sellers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-semibold text-zinc-900 hover:text-zinc-600"
              >
                Best Sellers
              </Link>
              <Link
                to="/sale"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-semibold text-red-600 hover:text-red-700"
              >
                Sale & Offers
              </Link>
            </nav>

            <div className="border-t border-zinc-200 py-4 space-y-3">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sport Categories</div>
              <div className="grid grid-cols-2 gap-2 text-sm font-medium text-zinc-700">
                <Link to="/running" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black">
                  Running
                </Link>
                <Link to="/basketball" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black">
                  Basketball
                </Link>
                <Link to="/lifestyle" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black">
                  Lifestyle
                </Link>
                <Link to="/football" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black">
                  Football
                </Link>
                <Link to="/training" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black">
                  Training
                </Link>
              </div>
            </div>

            <div className="mt-auto border-t border-zinc-200 pt-6 space-y-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="text-xs text-zinc-500">Signed in as {user?.email}</div>
                  <Link
                    to="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-2.5 px-4 bg-zinc-100 text-center text-xs font-semibold uppercase tracking-wider text-zinc-900 rounded-lg hover:bg-zinc-200"
                  >
                    My Account & Orders
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 px-4 text-center border border-zinc-900 text-xs font-semibold uppercase tracking-wider text-zinc-900 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 px-4 text-center bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
                  >
                    Join Us
                  </Link>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-100">
                <span>Region & Currency:</span>
                <span className="font-semibold text-zinc-900 flex items-center gap-1">
                  <span>🇮🇳</span>
                  <span>India · ₹ INR</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
