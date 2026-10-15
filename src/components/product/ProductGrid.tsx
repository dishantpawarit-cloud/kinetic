import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { SearchX } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onResetFilters,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-3">
            <div className="aspect-[4/3] bg-zinc-200 rounded-xl w-full" />
            <div className="h-4 bg-zinc-200 rounded w-1/3" />
            <div className="h-5 bg-zinc-200 rounded w-3/4" />
            <div className="h-4 bg-zinc-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center bg-zinc-50 rounded-2xl border border-zinc-200/80 px-4">
        <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 mb-1">No shoes match your criteria</h3>
        <p className="text-sm text-zinc-500 max-w-md mb-6">
          We couldn't find any footwear matching your exact combination of filters. Try clearing or expanding your selection.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-zinc-800 transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
