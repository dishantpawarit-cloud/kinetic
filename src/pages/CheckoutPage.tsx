import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { ProductImage } from '../components/common/ProductImage';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  Check,
  Lock,
  AlertCircle,
  Banknote,
  ArrowLeft,
  QrCode,
  Smartphone
} from 'lucide-react';
import { formatINR } from '../utils/currency';
import { UpiPaymentSection } from '../components/checkout/UpiPaymentSection';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, discountAmount, couponCode, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Form State
  const defaultAddress = user?.addresses?.[0];
  const [formData, setFormData] = useState({
    fullName: defaultAddress?.fullName || user?.name || '',
    email: defaultAddress?.email || user?.email || '',
    phone: defaultAddress?.phone || user?.phone || '',
    street: defaultAddress?.street || '',
    city: defaultAddress?.city || '',
    state: defaultAddress?.state || '',
    postalCode: defaultAddress?.postalCode || '',
    country: defaultAddress?.country || 'India'
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiTransactionId, setUpiTransactionId] = useState('');
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  // Simulated card fields (never persisted)
  const [cardInfo, setCardInfo] = useState({
    number: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvc: '123',
    nameOnCard: formData.fullName || 'Alex Vance'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900">Your bag is empty</h2>
        <p className="text-xs text-zinc-500">You need to have at least one shoe in your bag to checkout.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-black text-white text-xs font-bold uppercase rounded-full hover:bg-zinc-800"
        >
          Browse Shoes
        </Link>
      </div>
    );
  }

  const isElfbar = couponCode === 'ELFBAR';
  const shippingFee = isElfbar ? 0 : deliveryMethod === 'express' ? 1200 : subtotal >= 9995 ? 0 : 750;
  const finalTotal = isElfbar ? 1 : Math.max(0, subtotal - discountAmount + shippingFee);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required for delivery notifications';
    if (!formData.street.trim()) errors.street = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State / Province is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';

    if (paymentMethod === 'card') {
      if (!cardInfo.number.trim()) errors.cardNumber = 'Card number is required';
      if (!cardInfo.expiry.trim()) errors.cardExpiry = 'Expiry is required';
      if (!cardInfo.cvc.trim()) errors.cardCvc = 'CVC is required';
    }

    if (paymentMethod === 'upi') {
      if (!upiTransactionId.trim()) {
        errors.upiTransaction = 'Please enter the 12-digit UPI Transaction ID / UTR number from your payment app.';
      } else if (!isUpiVerified) {
        errors.upiTransaction = 'Please click "Verify Payment" to verify your UPI transaction before confirming your order.';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        items: cart,
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        },
        deliveryMethod,
        paymentMethod,
        transactionId: paymentMethod === 'upi' ? upiTransactionId.trim() : undefined,
        couponCode: couponCode || undefined,
        discountAmount
      });

      // Clear the cart only after order successfully placed
      clearCart();
      setIsProcessing(false);
      navigate(`/order-success/${order.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb & Security */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-200">
        <Link to="/cart" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-black">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Bag</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit Encrypted Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Form Column */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
          {/* Section 1: Contact Information */}
          <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-100">
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Contact Details</span>
              </h2>
              {!isAuthenticated && (
                <Link to="/login" className="text-xs text-zinc-500 hover:underline">
                  Already have an account? Sign In
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Alex Vance"
                  className={`w-full px-3.5 py-2.5 text-xs bg-zinc-50 border rounded-lg outline-none focus:bg-white focus:border-black ${
                    formErrors.fullName ? 'border-red-500' : 'border-zinc-300'
                  }`}
                />
                {formErrors.fullName && <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex.vance@example.com"
                  className={`w-full px-3.5 py-2.5 text-xs bg-zinc-50 border rounded-lg outline-none focus:bg-white focus:border-black ${
                    formErrors.email ? 'border-red-500' : 'border-zinc-300'
                  }`}
                />
                {formErrors.email && <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                  Phone Number (For Tracking Updates) *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98200 12345"
                  className={`w-full px-3.5 py-2.5 text-xs bg-zinc-50 border rounded-lg outline-none focus:bg-white focus:border-black ${
                    formErrors.phone ? 'border-red-500' : 'border-zinc-300'
                  }`}
                />
                {formErrors.phone && <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>}
              </div>
            </div>
          </section>

          {/* Section 2: Shipping Address */}
          <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-3 border-b border-zinc-100">
              <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Shipping Address</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                  Flat / House No. / Street Address *
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Flat 402, Lotus Towers, Linking Road"
                  className={`w-full px-3.5 py-2.5 text-xs bg-zinc-50 border rounded-lg outline-none focus:bg-white focus:border-black ${
                    formErrors.street ? 'border-red-500' : 'border-zinc-300'
                  }`}
                />
                {formErrors.street && <p className="text-[11px] text-red-500 mt-1">{formErrors.street}</p>}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Mumbai"
                    className={`w-full px-3.5 py-2.5 text-xs bg-zinc-50 border rounded-lg outline-none focus:bg-white focus:border-black ${
                      formErrors.city ? 'border-red-500' : 'border-zinc-300'
                    }`}
                  />
                  {formErrors.city && <p className="text-[11px] text-red-500 mt-1">{formErrors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Maharashtra"
                    className={`w-full px-3.5 py-2.5 text-xs bg-zinc-50 border rounded-lg outline-none focus:bg-white focus:border-black ${
                      formErrors.state ? 'border-red-500' : 'border-zinc-300'
                    }`}
                  />
                  {formErrors.state && <p className="text-[11px] text-red-500 mt-1">{formErrors.state}</p>}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="400050"
                    maxLength={6}
                    className={`w-full px-3.5 py-2.5 text-xs bg-zinc-50 border rounded-lg outline-none focus:bg-white focus:border-black ${
                      formErrors.postalCode ? 'border-red-500' : 'border-zinc-300'
                    }`}
                  />
                  {formErrors.postalCode && <p className="text-[11px] text-red-500 mt-1">{formErrors.postalCode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-zinc-50 border border-zinc-300 rounded-lg outline-none focus:bg-white focus:border-black"
                >
                  <option value="India">India (🇮🇳)</option>
                  <option value="United States">United States (🇺🇸)</option>
                  <option value="United Kingdom">United Kingdom (🇬🇧)</option>
                  <option value="United Arab Emirates">United Arab Emirates (🇦🇪)</option>
                  <option value="Singapore">Singapore (🇸🇬)</option>
                  <option value="Canada">Canada (🇨🇦)</option>
                  <option value="Australia">Australia (🇦🇺)</option>
                  <option value="Germany">Germany (🇩🇪)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Delivery Options */}
          <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-3 border-b border-zinc-100">
              <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Delivery Speed</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setDeliveryMethod('standard')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  deliveryMethod === 'standard' ? 'border-black bg-zinc-50/70' : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-zinc-900">Standard Delivery</span>
                  <span className="text-xs font-bold text-zinc-900 tabular-nums">
                    {subtotal >= 9995 ? 'FREE' : formatINR(750)}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">Delivered within 2–4 business days via Nike Express Ground across India.</p>
              </label>

              <label
                onClick={() => setDeliveryMethod('express')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  deliveryMethod === 'express' ? 'border-black bg-zinc-50/70' : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-zinc-900">Next-Day Priority</span>
                  <span className="text-xs font-bold text-zinc-900 tabular-nums">{formatINR(1200)}</span>
                </div>
                <p className="text-xs text-zinc-500">Arrives tomorrow evening. Signed delivery confirmation across metro hubs.</p>
              </label>
            </div>
          </section>

          {/* Section 4: Payment Flow */}
          <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-3 border-b border-zinc-100">
              <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                4
              </span>
              <span>Payment Method</span>
            </h2>

            {/* Payment Type Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-2 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-black bg-black text-white'
                    : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-black bg-black text-white'
                    : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card (Stripe)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-2 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-black bg-black text-white'
                    : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span>Cash on Del.</span>
              </button>
            </div>

            {/* UPI Option */}
            {paymentMethod === 'upi' && (
              <UpiPaymentSection
                amount={finalTotal}
                transactionId={upiTransactionId}
                onTransactionIdChange={(val) => {
                  setUpiTransactionId(val);
                  setFormErrors((prev) => {
                    const next = { ...prev };
                    delete next.upiTransaction;
                    return next;
                  });
                }}
                isVerified={isUpiVerified}
                onVerificationChange={(v) => {
                  setIsUpiVerified(v);
                  if (v) {
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      delete next.upiTransaction;
                      return next;
                    });
                  }
                }}
              />
            )}

            {/* Card Option */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                  <span>Simulated Stripe Test Mode</span>
                  <span className="font-mono text-[10px] bg-zinc-200 px-2 py-0.5 rounded">VISA / MC / RUPAY</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-zinc-300 rounded-lg outline-none focus:border-black"
                    />
                    <CreditCard className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardInfo.expiry}
                      onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                      placeholder="12/28"
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-zinc-300 rounded-lg outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      value={cardInfo.cvc}
                      onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-zinc-300 rounded-lg outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* COD Option */}
            {paymentMethod === 'cod' && (
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-600 space-y-1.5">
                <p className="font-semibold text-zinc-900">Cash on Delivery Terms:</p>
                <p>• You will pay <strong className="text-zinc-900">{formatINR(finalTotal)}</strong> directly in cash upon package arrival.</p>
                <p>• Please have the exact payment ready for the delivery partner.</p>
              </div>
            )}
          </section>

          {/* Validation Notice for UPI */}
          {formErrors.upiTransaction && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formErrors.upiTransaction}</span>
            </div>
          )}

          {/* Place Order Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 px-6 text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                paymentMethod === 'upi' && !isUpiVerified
                  ? 'bg-zinc-800 hover:bg-black text-amber-300'
                  : 'bg-black text-white hover:bg-zinc-800'
              } disabled:opacity-50`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Order & Confirming Settlement...</span>
                </>
              ) : paymentMethod === 'upi' ? (
                isUpiVerified ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Confirm Order ({formatINR(finalTotal)})</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Verify UPI Payment to Proceed ({formatINR(finalTotal)})</span>
                  </>
                )
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order ({formatINR(finalTotal)})</span>
                </>
              )}
            </button>
            {paymentMethod === 'upi' && !isUpiVerified && (
              <p className="text-[11px] text-zinc-400 text-center mt-2">
                Scan the QR code, enter your 12-digit UPI UTR number, and click <strong>Verify Payment</strong> above before confirming.
              </p>
            )}
          </div>
        </form>

        {/* Right Sticky Order Summary */}
        <aside className="lg:col-span-5 sticky top-24">
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/90 space-y-6">
            <h3 className="text-base font-bold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-200">
              In Your Bag ({cart.length})
            </h3>

            {/* Items preview list */}
            <div className="max-h-72 overflow-y-auto divide-y divide-zinc-200 pr-1">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="py-3 flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0 border border-zinc-200">
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
                    <h5 className="font-semibold text-xs text-zinc-900 truncate">{item.product.name}</h5>
                    <div className="text-[11px] text-zinc-500">
                      Qty {item.quantity} · Size US {item.selectedSize} · {item.selectedColor}
                    </div>
                    <div className="text-xs font-bold tabular-nums text-zinc-900 mt-1">
                      {formatINR(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations breakdown */}
            <div className="pt-3 border-t border-zinc-200 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums text-zinc-900">{formatINR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({couponCode})</span>
                  <span className="font-semibold tabular-nums">-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Shipping ({deliveryMethod})</span>
                <span className="font-semibold tabular-nums text-zinc-900">
                  {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-zinc-200 flex justify-between text-base font-extrabold text-zinc-900">
                <span>Total Due</span>
                <span className="tabular-nums">{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* Trust notice */}
            <div className="p-3 bg-white rounded-xl border border-zinc-200 text-[11px] text-zinc-500 space-y-1">
              <div className="font-semibold text-zinc-900 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Nike Authenticity Guarantee</span>
              </div>
              <p>Every pair shipped directly with original factory tags and box packaging.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
