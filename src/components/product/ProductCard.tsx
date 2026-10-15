import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { Product } from '../../types';
import { ProductImage } from '../common/ProductImage';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/currency';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quickAddNotice, setQuickAddNotice] = useState<string | null>(null);

  const activeImage =
    product.images[selectedColorIndex] ||
    product.images[0] ||
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80';

  const isFavorited = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to the first available size or 9.5
    const chosenSize = product.sizes.includes(9.5) ? 9.5 : product.sizes[0] || 9;
    const chosenColor = product.colors[selectedColorIndex]?.name || product.colors[0]?.name || 'Standard';
    const result = addToCart(product, chosenSize, chosenColor, 1);
    setQuickAddNotice(result.message);
    setTimeout(() => setQuickAddNotice(null), 2500);
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 border border-zinc-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <ProductImage
            src={activeImage}
            alt={product.name}
            fallbackColor={product.colors[selectedColorIndex]?.hex || product.colors[0]?.hex}
            name={product.name}
            category={product.category}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Status flags - quiet non-pill text marker */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.isNewArrival && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-black bg-white/95 px-2 py-0.5 rounded shadow-xs">
              Just In
            </span>
          )}
          {product.isSale && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 bg-white/95 px-2 py-0.5 rounded shadow-xs">
              Sale
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 bg-white/95 px-2 py-0.5 rounded shadow-xs">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Heart button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorited
              ? 'bg-red-50 text-red-600 shadow-sm'
              : 'bg-white/80 text-zinc-600 hover:text-black hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600' : ''}`} />
        </button>

        {/* Quick Add Button on Hover */}
        <div
          className={`absolute bottom-3 left-3 right-3 transition-all duration-300 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 bg-black/90 hover:bg-black text-white text-xs font-semibold tracking-wider uppercase rounded-lg shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Quick Add (US {product.sizes.includes(9.5) ? '9.5' : product.sizes[0]})</span>
          </button>
        </div>

        {quickAddNotice && (
          <div className="absolute inset-x-2 bottom-2 bg-zinc-900 text-white text-[11px] py-1.5 px-2.5 rounded text-center shadow-lg animate-fade-in">
            {quickAddNotice}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Color swatches preview */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-2">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColorIndex(idx);
                }}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx ? 'ring-1 ring-black ring-offset-1 scale-110' : 'border-zinc-300'
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={`Color ${c.name}`}
              />
            ))}
            <span className="text-[11px] text-zinc-500 ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        )}

        {/* Clean unboxed metadata */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1 capitalize">
          <span>{product.gender}'s {product.category}</span>
          <span aria-hidden="true">·</span>
          <span>Rating {product.rating} ★</span>
        </div>

        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className="font-semibold text-sm text-zinc-900 hover:text-zinc-600 transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price display with discount calculation */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-semibold text-sm tabular-nums text-zinc-900">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-zinc-400 line-through tabular-nums">
              {formatINR(product.originalPrice)}
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="text-xs font-semibold text-emerald-600">
              {product.discountPercent}% off
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
