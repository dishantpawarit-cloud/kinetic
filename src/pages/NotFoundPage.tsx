import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 mx-auto">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="font-athletic text-6xl font-extrabold text-zinc-900">404</span>
        <h1 className="font-athletic text-3xl font-bold uppercase tracking-tight text-zinc-900">
          PAGE NOT FOUND
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
          We can't find the page you are looking for. It may have moved or no longer exists.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors"
        >
          Return Home
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 border border-zinc-300 hover:border-black text-zinc-900 text-xs font-bold uppercase tracking-widest rounded-full transition-colors flex items-center gap-1.5"
        >
          <span>Shop All Shoes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="pt-10 border-t border-zinc-200 max-w-md mx-auto">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Popular Categories</h4>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <Link to="/running" className="px-3 py-1 bg-zinc-100 rounded-md hover:bg-zinc-200">Running</Link>
          <Link to="/lifestyle" className="px-3 py-1 bg-zinc-100 rounded-md hover:bg-zinc-200">Lifestyle</Link>
          <Link to="/basketball" className="px-3 py-1 bg-zinc-100 rounded-md hover:bg-zinc-200">Basketball</Link>
          <Link to="/new-arrivals" className="px-3 py-1 bg-zinc-100 rounded-md hover:bg-zinc-200">New Releases</Link>
          <Link to="/sale" className="px-3 py-1 bg-red-50 text-red-700 rounded-md hover:bg-red-100">Sale</Link>
        </div>
      </div>
    </div>
  );
};
