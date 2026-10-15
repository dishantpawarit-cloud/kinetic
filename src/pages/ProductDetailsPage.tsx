import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Star,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';
import { formatINR } from '../utils/currency';

const RECENTLY_VIEWED_KEY = 'kinetic_recently_viewed_v1';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const product = SAMPLE_PRODUCTS.find((p) => p.id === id);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion states
  const [isShippingOpen, setIsShippingOpen] = useState(true);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(true);

  // New review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [submittedReviewNotice, setSubmittedReviewNotice] = useState(false);

  // Track recently viewed in localStorage
  useEffect(() => {
    if (product) {
      try {
        const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
        const list: string[] = stored ? JSON.parse(stored) : [];
        const updated = [product.id, ...list.filter((pid) => pid !== product.id)].slice(0, 6);
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-zinc-500 mb-6">The shoe you are looking for does not exist or has been archived.</p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-800"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const selectedColorName = product.colors[selectedColorIndex]?.name || product.colors[0]?.name || 'Standard';

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage('Please select your shoe size.');
      return;
    }
    setErrorMessage(null);

    const res = addToCart(product, selectedSize, selectedColorName, quantity);
    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      setSuccessMessage(`Added size US ${selectedSize} to bag.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setErrorMessage('Please select your shoe size before buying.');
      return;
    }
    addToCart(product, selectedSize, selectedColorName, quantity);
    navigate('/checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewContent.trim()) return;
    setSubmittedReviewNotice(true);
    setNewReviewAuthor('');
    setNewReviewContent('');
    setTimeout(() => setSubmittedReviewNotice(false), 4000);
  };

  // Related products from same category or brand
  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // Recently viewed
  let recentlyViewedIds: string[] = [];
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (raw) recentlyViewedIds = JSON.parse(raw);
  } catch {}
  const recentlyViewedProducts = SAMPLE_PRODUCTS.filter(
    (p) => recentlyViewedIds.includes(p.id) && p.id !== product.id
  ).slice(0, 4);

  const isFavorite = isWishlisted(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs text-zinc-500 flex items-center gap-2">
        <Link to="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-black">Shoes</Link>
        <span>/</span>
        <Link to={`/${product.category}`} className="hover:text-black capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-zinc-900 font-medium truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Product Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery product={product} selectedColorIndex={selectedColorIndex} />
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Pricing */}
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-500 uppercase tracking-wider mb-1">
              <span>{product.gender}'s {product.category} Shoe</span>
              <div className="flex items-center gap-1 font-semibold text-zinc-800">
                <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                <span>{product.rating}</span>
                <span className="text-zinc-400">({product.reviewCount})</span>
              </div>
            </div>

            <h1 className="font-athletic text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-900">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-bold tabular-nums text-zinc-900">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-zinc-400 line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {product.discountPercent && product.discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Save {product.discountPercent}%
                </span>
              )}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Inclusive of all taxes · Free standard delivery on orders over ₹9,995
            </div>
          </div>

          {/* Colorway Selection */}
          <div className="pt-2 border-t border-zinc-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Color: <span className="font-medium text-zinc-600">{selectedColorName}</span>
              </label>
              <span className="text-[11px] text-zinc-400">{product.colors.length} Colorways</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColorIndex(idx);
                    setErrorMessage(null);
                  }}
                  title={color.name}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedColorIndex === idx
                      ? 'border-black ring-2 ring-black ring-offset-2 scale-105'
                      : 'border-zinc-300 hover:border-zinc-500'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select color ${color.name}`}
                >
                  {selectedColorIndex === idx && (
                    <Check
                      className={`w-4 h-4 ${
                        color.name === 'White' || color.hex === '#FFFFFF' ? 'text-black' : 'text-white'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="pt-2 border-t border-zinc-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Select Size (US)
              </label>
              <button
                type="button"
                className="text-[11px] text-zinc-500 underline hover:text-black cursor-pointer"
                onClick={() => setIsSizeGuideOpen(true)}
              >
                Size Guide
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setErrorMessage(null);
                    }}
                    className={`py-3 text-xs font-bold rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-white text-zinc-900 border-zinc-200 hover:border-black'
                    }`}
                  >
                    US {size}
                  </button>
                );
              })}
            </div>

            {/* Error or validation message */}
            {errorMessage && (
              <div className="mt-2 text-xs font-medium text-red-600 flex items-center gap-1.5 animate-bounce">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </div>

          {/* Quantity and Stock */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-zinc-900">Quantity:</span>
              <div className="flex items-center border border-zinc-300 rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-100"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-1 font-bold tabular-nums text-zinc-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-zinc-500 font-medium">
              {product.stock > 10 ? (
                <span className="text-emerald-600 font-semibold">In Stock ({product.stock} pairs)</span>
              ) : product.stock > 0 ? (
                <span className="text-amber-600 font-semibold">Only {product.stock} pairs left</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-all shadow-md active:scale-98"
            >
              Add to Bag
            </button>

            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={handleBuyNow}
                className="col-span-4 py-3.5 px-4 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors"
              >
                Instant Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`col-span-1 flex items-center justify-center rounded-full border border-zinc-300 transition-colors ${
                  isFavorite ? 'bg-red-50 text-red-600 border-red-200' : 'hover:border-black text-zinc-700'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Description & Product Highlights */}
          <div className="pt-4 border-t border-zinc-200 space-y-3">
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {product.description}
            </p>
            {product.highlights?.length > 0 && (
              <ul className="space-y-1.5 pt-2">
                {product.highlights.map((h, i) => (
                  <li key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Accordion 1: Shipping & Free Returns */}
          <div className="border-t border-zinc-200 pt-3">
            <button
              onClick={() => setIsShippingOpen(!isShippingOpen)}
              className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-900 py-2"
            >
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-zinc-700" />
                <span>Shipping & 60-Day Trial</span>
              </div>
              {isShippingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {isShippingOpen && (
              <div className="text-xs text-zinc-600 space-y-2 pt-2 pb-3">
                <p>Standard delivery: 2–4 business days (FREE for orders over ₹9,995).</p>
                <p>Express 1-day delivery available at checkout for ₹1,200.</p>
                <p>Enjoy a 60-day trial period: test them out, and return them if not satisfied.</p>
              </div>
            )}
          </div>

          {/* Accordion 2: Tech Specs */}
          <div className="border-t border-zinc-200 pt-3">
            <button
              onClick={() => setIsSpecsOpen(!isSpecsOpen)}
              className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-900 py-2"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-700" />
                <span>Specifications & Origin</span>
              </div>
              {isSpecsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {isSpecsOpen && (
              <div className="text-xs text-zinc-600 space-y-1.5 pt-2 pb-3">
                {Object.entries(product.specs || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-zinc-100">
                    <span className="text-zinc-500">{key}</span>
                    <span className="font-semibold text-zinc-900">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 3: Product Reviews */}
          <div className="border-t border-zinc-200 pt-3">
            <button
              onClick={() => setIsReviewsOpen(!isReviewsOpen)}
              className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-900 py-2"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-zinc-700" />
                <span>Customer Reviews ({product.reviewCount})</span>
              </div>
              {isReviewsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isReviewsOpen && (
              <div className="space-y-4 pt-3 pb-4">
                {/* Existing reviews */}
                {(product.reviews || [
                  {
                    id: 'sample-1',
                    author: 'Jordan K.',
                    rating: 5,
                    date: '2026-03-01',
                    title: 'Insane comfort out of the box',
                    content: 'Fits true to size and the cushioning is top notch. Highly recommend for daily training.',
                    verifiedPurchase: true
                  }
                ]).map((rev) => (
                  <div key={rev.id} className="bg-zinc-50 p-4 rounded-xl border border-zinc-200/80 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-900">{rev.author}</span>
                      <span className="text-zinc-400">{rev.date}</span>
                    </div>
                    <div className="flex text-zinc-900 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                      ))}
                    </div>
                    <h5 className="text-xs font-semibold text-zinc-900 pt-1">{rev.title}</h5>
                    <p className="text-xs text-zinc-600">{rev.content}</p>
                  </div>
                ))}

                {/* Add a review form */}
                <form onSubmit={handleAddReview} className="bg-zinc-100 p-4 rounded-xl space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Write a Review
                  </h5>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-600">Rating:</span>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="text-xs bg-white border border-zinc-300 rounded p-1"
                    >
                      <option value="5">5 Stars - Exceptional</option>
                      <option value="4">4 Stars - Very Good</option>
                      <option value="3">3 Stars - Average</option>
                      <option value="2">2 Stars - Poor</option>
                      <option value="1">1 Star - Terrible</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    required
                    className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg outline-none focus:border-black"
                  />
                  <textarea
                    placeholder="How do they fit? How is the cushioning?"
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    required
                    rows={2}
                    className="w-full text-xs p-2 bg-white border border-zinc-300 rounded-lg outline-none focus:border-black"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-zinc-800"
                  >
                    Submit Review
                  </button>
                  {submittedReviewNotice && (
                    <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Thank you! Your verified review has been submitted.</span>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-zinc-200 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Complete The Rotation</span>
              <h3 className="font-athletic text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
                YOU MIGHT ALSO LIKE
              </h3>
            </div>
            <Link to={`/${product.category}`} className="text-xs font-bold uppercase text-black hover:underline">
              View More
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Section */}
      {recentlyViewedProducts.length > 0 && (
        <section className="pt-12 border-t border-zinc-200 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Recently Viewed</span>
            <h3 className="font-athletic text-2xl font-bold uppercase tracking-tight text-zinc-900">
              YOUR RECENT BROWSING
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Nike Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsSizeGuideOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
              <h3 className="font-athletic text-xl font-bold uppercase tracking-tight text-zinc-900">
                Nike Footwear Size Guide
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-zinc-500 hover:text-black text-xs font-bold uppercase p-1"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-zinc-500">
              Nike running and lifestyle shoes generally run true to size. If you have wider feet or prefer extra toe box room, consider sizing up a half size.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-700 font-bold uppercase tracking-wider">
                    <th className="p-2.5 border-b border-zinc-200">US</th>
                    <th className="p-2.5 border-b border-zinc-200">UK</th>
                    <th className="p-2.5 border-b border-zinc-200">EUR</th>
                    <th className="p-2.5 border-b border-zinc-200">CM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-medium tabular-nums text-zinc-800">
                  <tr><td className="p-2">7.0</td><td className="p-2">6.0</td><td className="p-2">40.0</td><td className="p-2">25.0</td></tr>
                  <tr><td className="p-2">8.0</td><td className="p-2">7.0</td><td className="p-2">41.0</td><td className="p-2">26.0</td></tr>
                  <tr><td className="p-2">8.5</td><td className="p-2">7.5</td><td className="p-2">42.0</td><td className="p-2">26.5</td></tr>
                  <tr><td className="p-2">9.0</td><td className="p-2">8.0</td><td className="p-2">42.5</td><td className="p-2">27.0</td></tr>
                  <tr><td className="p-2">9.5</td><td className="p-2">8.5</td><td className="p-2">43.0</td><td className="p-2">27.5</td></tr>
                  <tr><td className="p-2">10.0</td><td className="p-2">9.0</td><td className="p-2">44.0</td><td className="p-2">28.0</td></tr>
                  <tr><td className="p-2">10.5</td><td className="p-2">9.5</td><td className="p-2">44.5</td><td className="p-2">28.5</td></tr>
                  <tr><td className="p-2">11.0</td><td className="p-2">10.0</td><td className="p-2">45.0</td><td className="p-2">29.0</td></tr>
                  <tr><td className="p-2">12.0</td><td className="p-2">11.0</td><td className="p-2">46.0</td><td className="p-2">30.0</td></tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-800"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
