import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { CheckCircle2, PackageCheck, Truck, ArrowRight, Printer } from 'lucide-react';
import { ProductImage } from '../components/common/ProductImage';
import { formatINR } from '../utils/currency';

export const OrderSuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useOrders();

  const order = getOrderById(id || '');

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900">Order Not Located</h2>
        <p className="text-xs text-zinc-500">
          We could not locate this order ID. It might have been cleared from local storage or the URL is invalid.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-black text-white text-xs font-bold uppercase rounded-full hover:bg-zinc-800"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Confirmation Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">
          Order Successfully Placed
        </span>
        <h1 className="font-athletic text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-zinc-900">
          THANK YOU FOR YOUR ORDER
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto">
          We've sent a detailed confirmation receipt to <strong className="text-zinc-900">{order.shippingAddress.email}</strong>. Our logistics hub is preparing your package for dispatch.
        </p>
      </div>

      {/* Order Info Bar */}
      <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-zinc-400 block uppercase tracking-wider text-[10px]">Order Number</span>
          <span className="font-athletic text-base font-bold text-zinc-900">{order.orderNumber}</span>
        </div>
        <div>
          <span className="text-zinc-400 block uppercase tracking-wider text-[10px]">Order Date</span>
          <span className="font-medium text-zinc-900">
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        <div>
          <span className="text-zinc-400 block uppercase tracking-wider text-[10px]">Payment Method</span>
          <span className="font-medium text-zinc-900 uppercase">
            {order.paymentMethod === 'upi'
              ? 'UPI (Google Pay)'
              : order.paymentMethod === 'card'
              ? 'Credit / Debit Card'
              : 'Cash on Delivery'}
          </span>
          {order.transactionId && (
            <span className="text-[10px] text-emerald-700 block font-mono font-bold mt-0.5">
              UTR: {order.transactionId}
            </span>
          )}
        </div>
        <div>
          <span className="text-zinc-400 block uppercase tracking-wider text-[10px]">Total Paid</span>
          <span className="font-athletic text-base font-bold text-zinc-900 tabular-nums">{formatINR(order.total)}</span>
        </div>
      </div>

      {/* UPI Verified Payment Banner */}
      {order.paymentMethod === 'upi' && order.transactionId && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-950">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block">UPI Payment Verified & Confirmed</span>
              <span className="text-emerald-800 text-[11px]">
                Paid to Dishant Pawar (dishantpawaar@oksbi) · UTR / Ref No: <strong className="font-mono">{order.transactionId}</strong>
              </span>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-200/80 text-emerald-900 font-bold text-[10px] uppercase rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>PAYMENT SETTLED</span>
          </span>
        </div>
      )}

      {/* Main Order Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Purchased Items List */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-zinc-200 p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-100 flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-zinc-700" />
            <span>Items Ordered ({order.items.length})</span>
          </h3>

          <div className="divide-y divide-zinc-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-100">
                  <ProductImage
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fallbackColor={item.product.colors[0]?.hex}
                    name={item.product.name}
                    category={item.product.category}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-zinc-900 truncate">{item.product.name}</h4>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Size: US {item.selectedSize} · Color: {item.selectedColor}
                  </div>
                  <div className="text-xs font-semibold tabular-nums text-zinc-900 mt-1 flex justify-between">
                    <span>Qty {item.quantity}</span>
                    <span>{formatINR(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-zinc-500">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-800 tabular-nums">{formatINR(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount ({order.couponCode || 'Promo'})</span>
                <span className="font-semibold tabular-nums">-{formatINR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-500">
              <span>Shipping ({order.deliveryMethod})</span>
              <span className="font-semibold text-zinc-800 tabular-nums">
                {order.shippingFee === 0 ? 'FREE' : formatINR(order.shippingFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-zinc-200 flex justify-between text-sm font-bold text-zinc-900">
              <span>Total</span>
              <span className="tabular-nums">{formatINR(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Details */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-100 flex items-center gap-2">
              <Truck className="w-4 h-4 text-zinc-700" />
              <span>Shipping Destination</span>
            </h3>

            <div className="text-xs text-zinc-600 space-y-1">
              <p className="font-bold text-zinc-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="text-zinc-500 pt-1">Phone: {order.shippingAddress.phone}</p>
            </div>

            <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
              Estimated Delivery: <strong>2–4 business days</strong> via Nike Premium Logistics.
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/shop"
              className="w-full py-3.5 px-6 bg-black text-white text-xs font-bold uppercase tracking-widest text-center rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/account"
              className="w-full py-3 px-6 border border-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-widest text-center rounded-full hover:bg-zinc-50 transition-colors"
            >
              View in Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
