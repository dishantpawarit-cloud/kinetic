import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { ProductImage } from '../components/common/ProductImage';
import {
  User,
  Package,
  MapPin,
  LogOut,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { formatINR } from '../utils/currency';

export const AccountPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-athletic text-3xl font-bold uppercase tracking-tight text-zinc-900">
          Account Access Required
        </h2>
        <p className="text-xs text-zinc-500">
          Please sign in to view your orders, saved addresses, and profile details.
        </p>
        <Link
          to="/login"
          className="inline-block px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-800"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* User greeting header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-zinc-900 text-white font-athletic text-2xl font-bold flex items-center justify-center shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-athletic text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
                {user.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                Nike Member
              </span>
            </div>
            <p className="text-xs text-zinc-500">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-black py-2 px-4 rounded-lg border border-zinc-200 hover:border-black transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-black text-black'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'addresses'
              ? 'border-black text-black'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-black text-black'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="py-16 text-center bg-zinc-50 rounded-2xl border border-zinc-200 p-6 space-y-4">
              <ShoppingBag className="w-10 h-10 text-zinc-400 mx-auto" />
              <h3 className="text-base font-bold text-zinc-900">No past orders yet</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Explore the latest Nike running, lifestyle, and basketball footwear and gear up.
              </p>
              <Link
                to="/shop"
                className="inline-block px-6 py-2.5 bg-black text-white text-xs font-bold uppercase rounded-full hover:bg-zinc-800"
              >
                Shop Footwear
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs"
                >
                  {/* Order Card Header */}
                  <div className="p-4 sm:p-5 bg-zinc-50/80 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Order Number</span>
                        <span className="font-athletic text-sm font-bold text-zinc-900">{order.orderNumber}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Placed On</span>
                        <span className="font-medium text-zinc-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Total Amount</span>
                        <span className="font-bold tabular-nums text-zinc-900">{formatINR(order.total)}</span>
                      </div>
                      {order.transactionId && (
                        <div>
                          <span className="text-zinc-400 block text-[10px] uppercase font-bold">UPI UTR</span>
                          <span className="font-mono text-xs font-bold text-emerald-700">{order.transactionId}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{order.status}</span>
                      </span>
                      <Link
                        to={`/order-success/${order.id}`}
                        className="px-3 py-1 text-xs font-semibold text-zinc-600 hover:text-black underline"
                      >
                        Receipt
                      </Link>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-6 divide-y divide-zinc-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                            <ProductImage
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fallbackColor={item.product.colors[0]?.hex}
                              name={item.product.name}
                              category={item.product.category}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-bold text-xs sm:text-sm text-zinc-900 hover:underline truncate block"
                            >
                              {item.product.name}
                            </Link>
                            <div className="text-[11px] text-zinc-500 mt-0.5">
                              Size: US {item.selectedSize} · Color: {item.selectedColor} · Qty: {item.quantity}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-bold text-xs sm:text-sm tabular-nums text-zinc-900">
                            {formatINR(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="p-4 bg-zinc-50/50 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-zinc-400" />
                      <span>Delivering to {order.shippingAddress.street}, {order.shippingAddress.city}</span>
                    </div>
                    <div className="text-zinc-600 font-medium">
                      Paid via {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(user.addresses || []).map((addr, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-3 relative shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  {idx === 0 ? 'Primary Delivery Address' : `Address #${idx + 1}`}
                </span>
                {idx === 0 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded">
                    Default
                  </span>
                )}
              </div>
              <div className="text-xs text-zinc-600 space-y-1">
                <p className="font-semibold text-zinc-900">{addr.fullName}</p>
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                <p>{addr.country}</p>
                <p className="text-zinc-500 pt-1">Phone: {addr.phone}</p>
              </div>
            </div>
          ))}

          <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
            <MapPin className="w-8 h-8 text-zinc-300" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Add New Address</h4>
            <p className="text-[11px] text-zinc-400 max-w-xs">
              Save multiple addresses for home, work, or gym deliveries at checkout.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Profile */}
      {activeTab === 'profile' && (
        <div className="max-w-xl bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-100">
            Account Credentials
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-zinc-500 block mb-1 uppercase font-semibold">Display Name</span>
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 font-medium text-zinc-900">
                {user.name}
              </div>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1 uppercase font-semibold">Email Address</span>
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 font-medium text-zinc-900">
                {user.email}
              </div>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1 uppercase font-semibold">Membership Type</span>
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 font-medium text-zinc-900 flex items-center justify-between">
                <span>Verified Athletic Member</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
