import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ProductImage } from '../common/ProductImage';
import { formatINR } from '../../utils/currency';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    discountAmount,
    finalTotal
  } = useCart();

  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-900" />
              <h2 className="text-lg font-bold uppercase tracking-tight text-zinc-900">Your Bag</h2>
              <span className="text-xs text-zinc-500 font-medium">({cart.length} items)</span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 mb-1">Your bag is empty</h3>
                <p className="text-sm text-zinc-500 max-w-xs mb-6">
                  Check out the latest Nike footwear releases and find your perfect pair.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-zinc-800 transition-colors"
                >
                  Explore Footwear
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="py-4 flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-zinc-100">
                    <ProductImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fallbackColor={item.product.colors[0]?.hex}
                      name={item.product.name}
                      category={item.product.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-semibold text-sm text-zinc-900 hover:underline truncate"
                        >
                          {item.product.name}
                        </Link>
                        <span className="font-semibold text-sm tabular-nums text-zinc-900 ml-2">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5 space-x-1">
                        <span>Size US {item.selectedSize}</span>
                        <span>·</span>
                        <span>{item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-zinc-200 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)}
                          className="px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold tabular-nums text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-100 transition-colors disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer summary & CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-zinc-50/70 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums text-zinc-900">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-semibold tabular-nums">-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold tabular-nums text-zinc-900">
                    {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-200 flex justify-between text-sm font-bold text-zinc-900">
                  <span>Total</span>
                  <span className="tabular-nums">{formatINR(finalTotal)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-3 px-4 border border-zinc-900 text-zinc-900 text-xs font-semibold uppercase tracking-wider text-center rounded-full hover:bg-zinc-100 transition-colors"
                >
                  View Bag
                </Link>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/checkout');
                  }}
                  className="py-3 px-4 bg-black text-white text-xs font-semibold uppercase tracking-wider text-center rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
