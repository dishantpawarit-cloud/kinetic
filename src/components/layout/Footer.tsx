import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-12 border-t border-zinc-900">
      {/* Brand value pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-zinc-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-300 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Free Delivery</h4>
              <p className="text-xs text-zinc-400">On all orders over ₹9,995</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-300 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">60-Day Returns</h4>
              <p className="text-xs text-zinc-400">Wear it & test it risk-free</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">100% Authentic</h4>
              <p className="text-xs text-zinc-400">Genuine Nike performance</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-300 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Member Perks</h4>
              <p className="text-xs text-zinc-400">Exclusive drops & early access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Column 1: Brand & Newsletter */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-athletic text-2xl font-bold tracking-tight uppercase">KINETIC</span>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Engineered for the relentless. Kinetic curates the world's most iconic Nike athletic footwear, bringing peak innovation from the track to the street.
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-2">
                BE THE FIRST TO KNOW
              </h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/40">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the squad! Enjoy 10% off with SHOE10.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-zinc-900 border border-zinc-800 text-xs px-3.5 py-2.5 rounded-l-md text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black px-4 py-2.5 rounded-r-md text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Featured Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-100">Featured Shoes</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link to="/running" className="hover:text-white transition-colors">
                  Running Shoes
                </Link>
              </li>
              <li>
                <Link to="/basketball" className="hover:text-white transition-colors">
                  Basketball Shoes
                </Link>
              </li>
              <li>
                <Link to="/lifestyle" className="hover:text-white transition-colors">
                  Lifestyle Sneakers
                </Link>
              </li>
              <li>
                <Link to="/football" className="hover:text-white transition-colors">
                  Football Cleats
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-white transition-colors">
                  Gym & Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Audience */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-100">Shop By Audience</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link to="/men" className="hover:text-white transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-white transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-white transition-colors">
                  Kids' Footwear
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/best-sellers" className="hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-red-400 hover:text-red-300 transition-colors">
                  Discounted Shoes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Help & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-100">Help & Support</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Order Status
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Shipping & Delivery</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Returns & Exchanges</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Payment Options (UPI, Cards, COD)</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Contact Us</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
            <span>🇮🇳</span>
            <span>India · INR (₹)</span>
          </span>
          <span>·</span>
          <span>&copy; {new Date().getFullYear()} KINETIC Retail. All rights reserved.</span>
          <span>·</span>
          <span>Original store branding featuring genuine Nike footwear product catalogs</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-zinc-400 cursor-pointer">Terms of Sale</span>
          <span className="hover:text-zinc-400 cursor-pointer">Terms of Use</span>
          <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};
