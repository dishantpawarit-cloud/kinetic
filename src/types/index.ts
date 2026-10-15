export type Category = 'running' | 'basketball' | 'lifestyle' | 'football' | 'training';

export type Gender = 'men' | 'women' | 'kids' | 'unisex';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: 'Nike';
  category: Category;
  gender: Gender;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  images: string[];
  colors: ProductColor[];
  sizes: number[];
  stock: number;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  tags: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: Address;
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'cod' | 'upi';
  transactionId?: string;
  paymentStatus?: 'pending' | 'verified' | 'paid';
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
}

export interface FilterState {
  category: string;
  gender: string;
  minPrice: number;
  maxPrice: number;
  sizes: number[];
  colors: string[];
  inStockOnly: boolean;
  searchQuery: string;
  sort: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';
}
