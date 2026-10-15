import React from 'react';
import { FilterState } from '../../types';
import { RotateCcw, Check, SlidersHorizontal } from 'lucide-react';
import { formatINR } from '../../utils/currency';

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onClear: () => void;
  availableSizes?: number[];
  availableColors?: { name: string; hex: string }[];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const DEFAULT_SIZES = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];

const POPULAR_COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#111111' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Grey', hex: '#6B7280' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Orange', hex: '#EA580C' }
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChange,
  onClear,
  availableSizes = DEFAULT_SIZES,
  availableColors = POPULAR_COLORS,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const toggleSize = (size: number) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ sizes: updated });
  };

  const toggleColor = (colorName: string) => {
    const updated = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onChange({ colors: updated });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.gender !== 'all' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 30000 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.inStockOnly ||
    filters.searchQuery.trim().length > 0;

  const content = (
    <div className="space-y-6">
      {/* Top Filter Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-zinc-900" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-xs text-zinc-500 hover:text-black font-medium flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Gender filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">Gender / Audience</label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All' },
            { id: 'men', label: "Men's" },
            { id: 'women', label: "Women's" },
            { id: 'kids', label: "Kids'" }
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => onChange({ gender: g.id })}
              className={`py-2 px-3 text-xs font-medium rounded-lg border text-left transition-colors ${
                filters.gender === g.id
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">Sport & Category</label>
        <div className="flex flex-col gap-1 text-xs">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'running', label: 'Running' },
            { id: 'basketball', label: 'Basketball' },
            { id: 'lifestyle', label: 'Lifestyle & Classics' },
            { id: 'football', label: 'Football (Cleats)' },
            { id: 'training', label: 'Gym & Training' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange({ category: cat.id })}
              className={`text-left py-1.5 px-2 rounded-md transition-colors flex items-center justify-between ${
                filters.category === cat.id
                  ? 'bg-zinc-100 font-bold text-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Shoe Sizes Grid */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">Shoe Size (US)</label>
          {filters.sizes.length > 0 && (
            <span className="text-[11px] text-zinc-500">{filters.sizes.length} selected</span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {availableSizes.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                    : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">Price Range</label>
          <span className="text-xs font-semibold tabular-nums text-zinc-900">
            {formatINR(filters.minPrice)} — {formatINR(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="3000"
          max="30000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-xs">
            <span className="text-zinc-400 text-[10px] block">MIN</span>
            <span className="font-semibold tabular-nums text-zinc-800">{formatINR(filters.minPrice)}</span>
          </div>
          <span className="text-zinc-400">-</span>
          <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-xs">
            <span className="text-zinc-400 text-[10px] block">MAX</span>
            <span className="font-semibold tabular-nums text-zinc-800">{formatINR(filters.maxPrice)}</span>
          </div>
        </div>
      </div>

      {/* Color Swatches */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">Color</label>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => {
            const isSelected = filters.colors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                title={color.name}
                className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                  isSelected ? 'ring-2 ring-black ring-offset-2 scale-110' : 'border-zinc-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Filter by ${color.name}`}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      color.name === 'White' || color.hex === '#FFFFFF' ? 'text-black' : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="pt-2 border-t border-zinc-200">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-black accent-black cursor-pointer"
          />
          <span className="text-xs font-medium text-zinc-800">In Stock Shoes Only</span>
        </label>
      </div>
    </div>
  );

  // Mobile drawer wrapper
  if (isOpenMobile) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/50" onClick={onCloseMobile} />
        <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl overflow-y-auto z-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-bold uppercase tracking-wide">Filter Products</span>
              <button onClick={onCloseMobile} className="text-xs text-zinc-500 font-semibold p-1">
                Close
              </button>
            </div>
            {content}
          </div>
          <div className="pt-6 border-t border-zinc-200 mt-6">
            <button
              onClick={onCloseMobile}
              className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-800"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop sidebar
  return (
    <aside className="hidden lg:block w-64 shrink-0 pr-6">
      <div className="sticky top-24">{content}</div>
    </aside>
  );
};
