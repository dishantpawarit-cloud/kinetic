import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data/products';
import { Product, FilterState } from '../types';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductSort } from '../components/product/ProductSort';
import { SlidersHorizontal, ArrowDown } from 'lucide-react';

interface RoutePreset {
  title: string;
  subtitle: string;
  category?: string;
  gender?: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
}

const ROUTE_PRESETS: Record<string, RoutePreset> = {
  '/shop': {
    title: 'All Nike Footwear',
    subtitle: 'Explore the full catalog of iconic performance and lifestyle sneakers.'
  },
  '/men': {
    title: "Men's Footwear",
    subtitle: "Precision engineering and street style for men's running, basketball, and lifestyle.",
    gender: 'men'
  },
  '/women': {
    title: "Women's Footwear",
    subtitle: "Plush comfort, supportive geometries, and vibrant colorways tailored for women.",
    gender: 'women'
  },
  '/kids': {
    title: "Kids' Footwear",
    subtitle: "Durable, high-energy sneakers engineered for recess, athletics, and everyday play.",
    gender: 'kids'
  },
  '/new-arrivals': {
    title: 'New Releases',
    subtitle: 'The latest drops, newest tech innovations, and freshly arrived colorways.',
    isNewArrival: true
  },
  '/best-sellers': {
    title: 'Best Sellers',
    subtitle: 'Nike’s most popular, highly-rated models chosen by athletes worldwide.',
    isBestSeller: true
  },
  '/sale': {
    title: 'Sale & Offers',
    subtitle: 'Score discounts on top-tier running shoes, retros, and training essentials.',
    isSale: true
  },
  '/running': {
    title: 'Running Shoes',
    subtitle: 'From daily marathon road trainers to rugged GORE-TEX trail explorers.',
    category: 'running'
  },
  '/basketball': {
    title: 'Basketball Shoes',
    subtitle: 'Signature models for LeBron, Kobe, Sabrina, and Ja with court-commanding traction.',
    category: 'basketball'
  },
  '/lifestyle': {
    title: 'Lifestyle & Classics',
    subtitle: 'Air Force 1s, Air Max 90s, Dunks, Blazers, and vintage court icons.',
    category: 'lifestyle'
  },
  '/football': {
    title: 'Football (Soccer) Cleats',
    subtitle: 'Mercurial Superfly, Phantom GX, and Tiempo Legend for ultimate pitch dominance.',
    category: 'football'
  },
  '/training': {
    title: 'Training & Gym Shoes',
    subtitle: 'Metcon 9 and Free Metcon engineered for heavy lifts, rope climbs, and HIIT.',
    category: 'training'
  }
};

const ITEMS_PER_PAGE = 9;

export const ShopPage: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const preset = ROUTE_PRESETS[currentPath] || ROUTE_PRESETS['/shop'];

  const initialFilters: FilterState = {
    category: preset.category || 'all',
    gender: preset.gender || 'all',
    minPrice: 0,
    maxPrice: 30000,
    sizes: [],
    colors: [],
    inStockOnly: false,
    searchQuery: '',
    sort: 'featured'
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Sync state when switching routes
  useEffect(() => {
    setFilters({
      category: preset.category || 'all',
      gender: preset.gender || 'all',
      minPrice: 0,
      maxPrice: 30000,
      sizes: [],
      colors: [],
      inStockOnly: false,
      searchQuery: '',
      sort: 'featured'
    });
    setVisibleCount(ITEMS_PER_PAGE);
  }, [currentPath]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleClearFilters = () => {
    setFilters({
      category: preset.category || 'all',
      gender: preset.gender || 'all',
      minPrice: 0,
      maxPrice: 30000,
      sizes: [],
      colors: [],
      inStockOnly: false,
      searchQuery: '',
      sort: 'featured'
    });
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      // Route specific presets
      if (preset.isNewArrival && !product.isNewArrival) return false;
      if (preset.isBestSeller && !product.isBestSeller) return false;
      if (preset.isSale && !product.isSale) return false;

      // Category
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Gender
      if (filters.gender !== 'all') {
        if (product.gender !== 'unisex' && product.gender !== filters.gender) {
          return false;
        }
      }

      // Price range
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // In stock only
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      // Sizes
      if (filters.sizes.length > 0) {
        const hasMatchingSize = filters.sizes.some((size) => product.sizes.includes(size));
        if (!hasMatchingSize) return false;
      }

      // Colors
      if (filters.colors.length > 0) {
        const hasMatchingColor = filters.colors.some((colName) =>
          product.colors.some((c) => c.name.toLowerCase().includes(colName.toLowerCase()))
        );
        if (!hasMatchingColor) return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }

      return true;
    });
  }, [filters, preset]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (filters.sort) {
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
      case 'featured':
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, filters.sort]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="mb-8">
        <h1 className="font-athletic text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-zinc-900">
          {preset.title}
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1 max-w-2xl">{preset.subtitle}</p>
      </div>

      {/* Mobile filter toggle bar */}
      <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-zinc-200">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 py-2 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold uppercase tracking-wider rounded-lg"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter & Refine</span>
        </button>
        <span className="text-xs text-zinc-500 font-semibold tabular-nums">
          {sortedProducts.length} Items
        </span>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <ProductFilters
          filters={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
          isOpenMobile={isMobileFiltersOpen}
          onCloseMobile={() => setIsMobileFiltersOpen(false)}
        />

        {/* Products Main View */}
        <div className="flex-1 min-w-0">
          <ProductSort
            currentSort={filters.sort}
            onSortChange={(sort) => handleFilterChange({ sort })}
            resultCount={sortedProducts.length}
          />

          <div className="mt-6">
            <ProductGrid
              products={displayedProducts}
              onResetFilters={handleClearFilters}
            />

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-black hover:bg-black hover:text-white text-zinc-900 text-xs font-bold uppercase tracking-widest rounded-full transition-all"
                >
                  <span>Load More ({sortedProducts.length - visibleCount} remaining)</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
