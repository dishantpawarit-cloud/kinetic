# KINETIC — Nike-Inspired Athletic Footwear E-Commerce Platform

A complete, modern, responsive shoe e-commerce web platform inspired by Nike's premium shopping experience. Built with React, TypeScript, Tailwind CSS, Express, and modern UX design principles.

---

## ⚡ Quick Highlights

- **Complete Shopping Journey**: Home $\to$ Category Browsing $\to$ Instant Filtering & Sorting $\to$ Dynamic PDP $\to$ Variant Selection (Sizes & Colors) $\to$ Interactive Bag $\to$ Promo Code Discount $\to$ Multi-step Checkout $\to$ Order Confirmation Receipt.
- **32 Authentic Nike Footwear Models**: Pegasus 41, Vomero 5, Air Force 1 '07, Air Max 90, Air Max 270, Air Max Plus Tn, Air Jordan 1 Retro High OG, Dunks, Alphafly 3, Metcon 9, Kobe 8 Protro, Mercurial Superfly 9, Phantom GX 2, Sabrina 2, LeBron XXI, and more.
- **Zero-Broken-Image Resilience**: Integrated with custom dynamic vector sneaker silhouette fallback renderer ensuring that even in sandboxed or offline environments, every shoe renders with pristine visuals.
- **Strict Anti-Slop & Zero-Pill Design**: Clean typographic hierarchy (Plus Jakarta Sans + athletic Oswald display), generous whitespace, single-elevation depth, and unboxed metadata.
- **Persistent State**: Full shopping bag, promo coupons, customer profile, wishlist, and past order history persist across browser reloads using localStorage.
- **Demo Promo Code**: Use **`SHOE10`** for 10% off any eligible footwear order!

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19 SPA with Vite |
| **Language** | TypeScript (Strict mode) |
| **Styling** | Tailwind CSS v4 with custom athletic display typography |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **State Management** | Context API (Cart, Auth, Orders, Wishlist) |
| **Backend API** | Node.js with Express (`server.ts`) |
| **Storage & Persistence** | localStorage + Express REST In-Memory Datastore |

---

## 🧭 Application Routes

All required routes are fully functional and responsive:

| Route | Description |
|---|---|
| `/` | **Home Page** with hero campaign, category tiles, New Arrivals, Best Sellers, Vault spotlight, and tech innovations |
| `/shop` | **All Shoes** with comprehensive multi-criteria filtering & sorting |
| `/men` | **Men's Footwear** collection |
| `/women` | **Women's Footwear** collection |
| `/kids` | **Kids' Footwear** collection |
| `/new-arrivals` | **New Releases** & latest model drops |
| `/best-sellers` | **Best Selling Shoes** worldwide |
| `/sale` | **Discounted Products** with percentage off tags |
| `/running` | **Running Shoes** (Pegasus, Alphafly, Invincible, InfinityRN) |
| `/basketball` | **Basketball Shoes** (Jordan 1, Kobe 8, LeBron XXI, Sabrina 2, Ja 1) |
| `/lifestyle` | **Lifestyle Sneakers** (Air Force 1, Dunk Low, Air Max 90/270/Plus, Blazer, Cortez) |
| `/football` | **Football Cleats** (Mercurial Superfly 9, Phantom GX 2, Tiempo Legend 10) |
| `/training` | **Gym & Training Shoes** (Metcon 9, Free Metcon 5) |
| `/product/:id` | **Product Details Page** with multi-angle gallery, size & color selection, stock counter, reviews, and related kicks |
| `/search` | **Search Results Page** with real-time keyword matching and category pills |
| `/cart` | **Shopping Bag Page** with quantity steppers, item removal, and demo coupon validator |
| `/checkout` | **Multi-Section Checkout Page** (Contact, Shipping, Delivery speed, Stripe test card / COD) |
| `/order-success/:id` | **Order Confirmation Receipt** with unique order number, itemized summary, and shipment tracking |
| `/login` | **Customer Login** with 1-click Demo Account button |
| `/register` | **Customer Registration** with member perks |
| `/account` | **Customer Account Dashboard** with itemized order history, saved addresses, and profile info |
| `*` | **Custom 404 Not Found Page** with category shortcuts |

---

## 🚀 Running the Project

### 1. Development Mode (Frontend)

To run the interactive frontend application in development mode:

```bash
npm run dev
```

The app will be accessible at `http://localhost:3000`.

### 2. Full-Stack Express Server (Optional)

To start the full-stack Express server with integrated Vite middleware:

```bash
RUN_SERVER=true npx tsx server.ts
```

### 3. Production Build

To test and compile the production bundle:

```bash
npm run build
npm run preview
```

---

## 🏷️ Test Coupons & Demo Account

- **Demo Coupons**:
  - `SHOE10` $\to$ **10% Off** your entire order
  - `KINETIC15` $\to$ **15% Off**
  - `NIKE20` $\to$ **20% Off**
- **Demo User Profile**:
  - **Name**: Alex Vance
  - **Email**: `alex.vance@kineticathletics.io`
  - **Password**: `password123`
  - Or click the **"Sign In As Demo Member"** button on the `/login` screen to sign in instantly with pre-populated order history and saved delivery address!
