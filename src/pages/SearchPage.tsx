import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Search, SearchX, ArrowUpDown } from 'lucide-react';
import { FilterState } from '../types';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<FilterState['sort']>('featured');

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const searchResults = useMemo(() => {
    const q = queryParam.trim().toLowerCase();
    return SAMPLE_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      if (!q) return true;

      const matchesName = product.name.toLowerCase().includes(q);
      const matchesBrand = product.brand.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      const matchesGender = product.gender.toLowerCase().includes(q);
      const matchesDesc = product.description.toLowerCase().includes(q);
      const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));

      return matchesName || matchesBrand || matchesCategory || matchesGender || matchesDesc || matchesTags;
    });
  }, [queryParam, selectedCategory]);

  const sortedResults = useMemo(() => {
    const list = [...searchResults];
    switch (sortBy) {
      case 'newest':
        return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return list;
    }
  }, [searchResults, sortBy]);

  const popularPicks = SAMPLE_PRODUCTS.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Search Bar Bar Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="font-athletic text-4xl font-extrabold uppercase tracking-tight text-zinc-900">
          Search Results
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by shoe name, model, Pegasus, Air Max, Jordan..."
            className="w-full pl-12 pr-24 py-3.5 bg-zinc-100 hover:bg-zinc-200/70 focus:bg-white border border-transparent focus:border-black rounded-full text-sm text-zinc-900 outline-none transition-all shadow-xs"
          />
          <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-800 transition-colors"
          >
            Search
          </button>
        </form>

        {queryParam && (
          <p className="text-xs text-zinc-500">
            Showing results for <span className="font-bold text-zinc-900">"{queryParam}"</span> ({sortedResults.length} matches found)
          </p>
        )}
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-zinc-200 gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'running', label: 'Running' },
            { id: 'lifestyle', label: 'Lifestyle' },
            { id: 'basketball', label: 'Basketball' },
            { id: 'football', label: 'Football' },
            { id: 'training', label: 'Training' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="search-sort" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
          </label>
          <select
            id="search-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as FilterState['sort'])}
            className="text-xs font-semibold bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-zinc-900 focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="featured">Best Matches</option>
            <option value="newest">Newest</option>
            <option value="popular">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {sortedResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-zinc-50 rounded-2xl border border-zinc-200/80 px-4">
          <div className="w-16 h-16 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 mx-auto mb-4">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-2">No matching Nike footwear found</h3>
          <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
            We couldn't find any shoes matching "{queryParam}". Check your spelling or try searching for classic model families like "Pegasus", "Air Force 1", "Jordan", or "Dunk".
          </p>

          <div className="pt-4 border-t border-zinc-200/70 max-w-4xl mx-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-4">
              Popular Shoes You Might Like
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {popularPicks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
