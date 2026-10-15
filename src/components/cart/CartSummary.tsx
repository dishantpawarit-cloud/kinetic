import React, { useState } from 'react';
import { ArrowRight, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatINR, FREE_SHIPPING_THRESHOLD } from '../../utils/currency';

export const CartSummary: React.FC = () => {
  const {
    subtotal,
    shippingFee,
    discountAmount,
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    finalTotal
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyCoupon(inputCode);
    setFeedback({ message: res.message, isError: !res.success });
    if (res.success) setInputCode('');
  };

  const freeShippingThreshold = FREE_SHIPPING_THRESHOLD;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 lg:p-8 space-y-6">
      <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900 pb-3 border-b border-zinc-200">
        Order Summary
      </h3>

      {/* Free shipping dynamic progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          {amountNeededForFreeShipping === 0 ? (
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>You've unlocked Free Standard Delivery!</span>
            </span>
          ) : (
            <span className="text-zinc-600">
              Add <span className="font-bold text-zinc-900 tabular-nums">{formatINR(amountNeededForFreeShipping)}</span> more for Free Delivery
            </span>
          )}
          <span className="text-zinc-400 font-medium tabular-nums">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-900 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Itemized pricing breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-zinc-600">
          <span>Subtotal</span>
          <span className="font-semibold text-zinc-900 tabular-nums">{formatINR(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>
                Promo ({couponCode} {couponCode === 'ELFBAR' ? '· ₹1 Special' : `-${discountPercent}%`})
              </span>
            </span>
            <span className="font-semibold tabular-nums">-{formatINR(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-zinc-600">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-zinc-900 tabular-nums">
            {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
          </span>
        </div>

        <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline text-base font-extrabold text-zinc-900">
          <span>Total</span>
          <span className="text-xl tabular-nums">{formatINR(finalTotal)}</span>
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="pt-2">
        {couponCode ? (
          <div className="flex items-center justify-between p-3 bg-white border border-zinc-200 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="font-bold uppercase tracking-wider">{couponCode}</span>
                <span className="text-zinc-500 block">
                  {couponCode === 'ELFBAR' ? 'VIP Special: Cart value set to ₹1' : `${discountPercent}% savings applied`}
                </span>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="text-zinc-400 hover:text-red-600 text-xs font-semibold cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
              Have a Promo Code?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Try ELFBAR or SHOE10"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs uppercase bg-white border border-zinc-300 rounded-lg outline-none focus:border-black font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </form>
        )}

        {feedback && (
          <div
            className={`mt-2 text-xs flex items-center gap-1.5 ${
              feedback.isError ? 'text-red-600' : 'text-emerald-600'
            }`}
          >
            {feedback.isError ? <AlertCircle className="w-3.5 h-3.5 shrink-0" /> : <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <div className="pt-2">
        <Link
          to="/checkout"
          className="w-full py-4 px-6 bg-black hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest text-center rounded-full transition-all shadow-md flex items-center justify-center gap-2 group"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <p className="text-[11px] text-zinc-400 text-center mt-3">
          Free standard returns on all footwear orders within 60 days.
        </p>
      </div>
    </div>
  );
};
