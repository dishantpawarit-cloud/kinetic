import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Zap, Shield, ChevronRight } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { ProductImage } from '../components/common/ProductImage';

export const HomePage: React.FC = () => {
  const newArrivals = SAMPLE_PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);
  const bestSellers = SAMPLE_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const runningFavorites = SAMPLE_PRODUCTS.filter((p) => p.category === 'running').slice(0, 3);

  const heroShoe = SAMPLE_PRODUCTS.find((p) => p.id === 'nike-pegasus-41') || SAMPLE_PRODUCTS[0];

  const categoryCards = [
    {
      title: 'Running',
      subtitle: 'Energy return for every mile',
      link: '/category/running',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      color: '#EA580C'
    },
    {
      title: 'Lifestyle',
      subtitle: 'Street icons with court DNA',
      link: '/category/lifestyle',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      color: '#111111'
    },
    {
      title: 'Basketball',
      subtitle: 'Engineered for high flyers',
      link: '/category/basketball',
      image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=800&q=80',
      color: '#B91C1C'
    },
    {
      title: 'Training',
      subtitle: 'Unshakable gym stability',
      link: '/category/training',
      image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=800&q=80',
      color: '#4B5563'
    },
    {
      title: 'Kids',
      subtitle: 'Built tough for endless play',
      link: '/gender/kids',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      color: '#2563EB'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* 1. Large Hero Campaign Section */}
      <section className="relative overflow-hidden bg-zinc-950 text-white min-h-[580px] lg:min-h-[660px] flex items-center">
        {/* Subtle grid pattern & glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.12),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-zinc-400">
                <span className="w-6 h-0.5 bg-white" />
                <span>Next-Gen Cushioning</span>
              </div>

              <h1 className="font-athletic text-5xl sm:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight leading-none text-balance">
                UNLEASH YOUR FASTEST STRIDE
              </h1>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Experience the all-new Nike Pegasus 41 with dual Zoom Air units and responsive ReactX foam. Engineered for relentless energy return from your first mile to your final sprint.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop"
                  className="px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all shadow-lg hover:shadow-white/10 flex items-center gap-2 group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/running"
                  className="px-7 py-4 border border-zinc-700 hover:border-zinc-400 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
                >
                  Running Lab
                </Link>
              </div>

              {/* Quick specs strip */}
              <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="font-athletic text-2xl font-bold tabular-nums text-white">+13%</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Energy Return</div>
                </div>
                <div>
                  <div className="font-athletic text-2xl font-bold tabular-nums text-white">297g</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Featherweight</div>
                </div>
                <div>
                  <div className="font-athletic text-2xl font-bold tabular-nums text-white">ReactX</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Foam Core</div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Shoe Presentation */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900 group">
                <ProductImage
                  src={heroShoe.images[0]}
                  alt="Nike Pegasus 41 Hero"
                  fallbackColor="#EA580C"
                  name={heroShoe.name}
                  category="Running"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-4 rounded-xl border border-zinc-700/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-zinc-400 uppercase tracking-wider">Featured Release</div>
                    <div className="text-sm font-bold text-white">{heroShoe.name}</div>
                  </div>
                  <Link
                    to={`/product/${heroShoe.id}`}
                    className="px-4 py-2 bg-white text-black text-xs font-bold uppercase rounded-lg hover:bg-zinc-200 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Sports Categories Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-zinc-200">
          <div>
            <h2 className="font-athletic text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
              EXPLORE BY SPORT
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Specialized footwear designed for peak athletic output.</p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline flex items-center gap-1"
          >
            <span>All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryCards.map((cat) => (
            <Link
              key={cat.title}
              to={cat.link}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-zinc-100 flex flex-col justify-end p-4 transition-transform duration-300 hover:-translate-y-1"
            >
              <ProductImage
                src={cat.image}
                alt={cat.title}
                fallbackColor={cat.color}
                name={cat.title}
                category="Category"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 text-white">
                <h3 className="font-athletic text-2xl font-bold uppercase tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-zinc-300 line-clamp-1">{cat.subtitle}</p>
                <div className="mt-2 text-xs font-semibold underline underline-offset-2 flex items-center gap-1">
                  <span>Shop</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. New Arrivals Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-zinc-200">
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
              <span>Fresh Off The Line</span>
            </div>
            <h2 className="font-athletic text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            to="/new-arrivals"
            className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline flex items-center gap-1"
          >
            <span>View All ({SAMPLE_PRODUCTS.filter((p) => p.isNewArrival).length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Seasonal Discount Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-800/40">
              Seasonal Promotion
            </span>
            <h2 className="font-athletic text-4xl sm:text-5xl font-extrabold uppercase tracking-tight">
              UP TO 20% OFF SELECT SILHOUETTES
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Step into high performance at a discount. Apply coupon code <span className="font-bold text-white underline">SHOE10</span> or <span className="font-bold text-white underline">NIKE20</span> at checkout for instant member savings.
            </p>
            <div className="pt-2">
              <Link
                to="/sale"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-colors"
              >
                <span>Shop The Sale</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800/50">
            <ProductImage
              src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80"
              alt="Sale Sneaker"
              fallbackColor="#EF4444"
              name="Nike Air Max 90 Sale"
              category="Lifestyle"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-zinc-200">
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-zinc-900" />
              <span>Proven Icons</span>
            </div>
            <h2 className="font-athletic text-3xl font-extrabold uppercase tracking-tight text-zinc-900">
              BEST SELLERS
            </h2>
          </div>
          <Link
            to="/best-sellers"
            className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Spotlight Collections: Air Max & Jordan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Spotlight 1: Air Max Iconography */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-zinc-900 text-white p-8 flex flex-col justify-end group">
            <ProductImage
              src="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
              alt="Air Max Heritage"
              fallbackColor="#18181B"
              name="Air Max Collection"
              category="Heritage"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
                Visible Air Innovation
              </span>
              <h3 className="font-athletic text-3xl font-bold uppercase tracking-tight">
                THE AIR MAX VAULT
              </h3>
              <p className="text-xs text-zinc-300 max-w-sm">
                From the timeless '90 to the futuristic 270 and Tuned Air Plus.
              </p>
              <div className="pt-2">
                <Link
                  to="/lifestyle"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-colors"
                >
                  <span>Explore Air Max</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Spotlight 2: Jordan Basketball */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-zinc-900 text-white p-8 flex flex-col justify-end group">
            <ProductImage
              src="https://images.unsplash.com/photo-1586525198428-225f6f12cff5?auto=format&fit=crop&w=1000&q=80"
              alt="Jordan Brand Collection"
              fallbackColor="#B91C1C"
              name="Jordan Court"
              category="Basketball"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
                Hardwood Greatness
              </span>
              <h3 className="font-athletic text-3xl font-bold uppercase tracking-tight">
                JORDAN & HOOPS
              </h3>
              <p className="text-xs text-zinc-300 max-w-sm">
                Air Jordan 1s, LeBron XXI, Kobe 8 Protros and elite court gear.
              </p>
              <div className="pt-2">
                <Link
                  to="/basketball"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-colors"
                >
                  <span>Explore Basketball</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Innovation Lab / Tech Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5 text-zinc-900" />
              <span>Proprietary Nike Engineering</span>
            </div>
            <h2 className="font-athletic text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-900">
              ATHLETIC INNOVATIONS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2">
              Every curve, thread, and compound is tuned in the Nike Sports Research Lab to optimize biomechanical efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 space-y-3">
              <span className="font-athletic text-xl font-bold text-zinc-900">ZoomX Foam</span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Nike's lightest, most responsive foam ever made. Delivers 85% energy return on marathon race days.
              </p>
              <div className="text-xs font-semibold text-black underline">
                Featured in Alphafly 3 & Invincible 3
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 space-y-3">
              <span className="font-athletic text-xl font-bold text-zinc-900">Air Zoom Units</span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Pressurized tensile fibers bounce back rapidly upon impact, providing explosive vertical launch.
              </p>
              <div className="text-xs font-semibold text-black underline">
                Featured in Pegasus 41 & Sabrina 2
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 space-y-3">
              <span className="font-athletic text-xl font-bold text-zinc-900">Gripknit Technology</span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Grippy, weather-resistant yarn woven directly into the upper for precision soccer ball control at top speed.
              </p>
              <div className="text-xs font-semibold text-black underline">
                Featured in Phantom GX 2 Elite
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
