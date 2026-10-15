import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/cart/CartItemRow';
import { CartSummary } from '../components/cart/CartSummary';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalItemCount } = useCart();

  const recommendedItems = SAMPLE_PRODUCTS.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-zinc-200 gap-2">
        <div className="flex items-baseline gap-3">
          <h1 className="font-athletic text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-zinc-900">
            Shopping Bag
          </h1>
          <span className="text-zinc-500 font-semibold text-sm">
            ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
          </span>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-zinc-500 hover:text-red-600 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="py-20 text-center flex flex-col items-center justify-center bg-zinc-50 rounded-3xl border border-zinc-200/80 px-4">
          <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-400 mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-athletic text-3xl font-bold uppercase tracking-tight text-zinc-900 mb-2">
            YOUR BAG IS EMPTY
          </h2>
          <p className="text-sm text-zinc-500 max-w-md mb-8">
            Once you find a pair of shoes you love, choose your size and add them to your bag to complete your order.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/shop"
              className="px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-all shadow-md"
            >
              Start Shopping
            </Link>
            <Link
              to="/new-arrivals"
              className="px-8 py-4 border border-zinc-300 hover:border-black text-zinc-900 text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
            >
              View New Arrivals
            </Link>
          </div>
        </div>
      ) : (
        /* Active Cart Layout: Items (Left) + Summary (Right) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 divide-y divide-zinc-200">
            {cart.map((item) => (
              <CartItemRow
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                item={item}
                onUpdateQuantity={(delta) =>
                  updateQuantity(item.product.id, item.selectedSize, item.selectedColor, delta)
                }
                onRemove={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
              />
            ))}

            <div className="pt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping Footwear</span>
              </Link>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="lg:col-span-5 sticky top-24">
            <CartSummary />
          </div>
        </div>
      )}

      {/* Suggested Recommendations Section */}
      <section className="pt-12 border-t border-zinc-200 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Curated For You</span>
          <h3 className="font-athletic text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
            POPULAR ATHLETIC KICKS
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
