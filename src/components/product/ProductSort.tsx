import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { FilterState } from '../../types';

interface ProductSortProps {
  currentSort: FilterState['sort'];
  onSortChange: (sort: FilterState['sort']) => void;
  resultCount: number;
}

export const ProductSort: React.FC<ProductSortProps> = ({
  currentSort,
  onSortChange,
  resultCount
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 gap-4">
      <div className="text-sm text-zinc-600 font-medium">
        Showing <span className="font-bold text-zinc-900 tabular-nums">{resultCount}</span> {resultCount === 1 ? 'Product' : 'Products'}
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <label htmlFor="sort-select" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>Sort By:</span>
        </label>
        <select
          id="sort-select"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as FilterState['sort'])}
          className="text-xs font-semibold bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-zinc-900 focus:outline-none focus:border-black cursor-pointer"
        >
          <option value="featured">Featured Picks</option>
          <option value="newest">Newest Arrivals</option>
          <option value="popular">Best Sellers & Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};
