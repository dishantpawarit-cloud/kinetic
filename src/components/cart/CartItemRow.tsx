import React from 'react';
import { Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../types';
import { ProductImage } from '../common/ProductImage';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../utils/currency';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (delta: number) => void;
  onRemove: () => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove
}) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isFavorite = isWishlisted(item.product.id);

  return (
    <div className="py-6 flex flex-col sm:flex-row gap-5 border-b border-zinc-200">
      {/* Product Image */}
      <Link
        to={`/product/${item.product.id}`}
        className="w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200"
      >
        <ProductImage
          src={item.product.images[0]}
          alt={item.product.name}
          fallbackColor={item.product.colors[0]?.hex}
          name={item.product.name}
          category={item.product.category}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Info & Options */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <Link
              to={`/product/${item.product.id}`}
              className="text-base font-bold text-zinc-900 hover:underline"
            >
              {item.product.name}
            </Link>
            <div className="text-base font-bold tabular-nums text-zinc-900">
              {formatINR(item.product.price * item.quantity)}
            </div>
          </div>

          <div className="text-xs text-zinc-500 mt-1 capitalize">
            {item.product.gender}'s {item.product.category}
          </div>

          <div className="text-xs text-zinc-600 mt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-zinc-400">Size:</span>
              <span className="font-semibold text-zinc-900">US {item.selectedSize}</span>
            </div>
            <span className="text-zinc-300">·</span>
            <div className="flex items-center gap-1">
              <span className="text-zinc-400">Color:</span>
              <span className="font-semibold text-zinc-900">{item.selectedColor}</span>
            </div>
          </div>
        </div>

        {/* Stepper & Actions */}
        <div className="flex items-center justify-between mt-4 pt-2">
          <div className="flex items-center border border-zinc-300 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(-1)}
              className="px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-100 transition-colors rounded-l-lg"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 py-1 text-xs font-bold tabular-nums text-zinc-900">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(1)}
              disabled={item.quantity >= item.product.stock}
              className="px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-100 transition-colors rounded-r-lg disabled:opacity-30"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleWishlist(item.product.id)}
              className="text-zinc-400 hover:text-red-600 transition-colors p-1"
              title={isFavorite ? 'Saved in favorites' : 'Save for later'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
            </button>
            <button
              onClick={onRemove}
              className="text-zinc-400 hover:text-black transition-colors p-1"
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
