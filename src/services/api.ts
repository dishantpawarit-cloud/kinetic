import { Product, Order, User, Address, Category } from '../types';
import { SAMPLE_PRODUCTS, CATEGORIES, DEMO_COUPONS } from '../data/products';

/**
 * Client API service for KINETIC Nike E-Commerce.
 * Connects to /api endpoints with seamless fallback to client mock dataset.
 */

const API_BASE = '/api';

export const apiService = {
  // Products
  async getProducts(params?: { category?: string; gender?: string; search?: string }): Promise<Product[]> {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.gender) query.append('gender', params.gender);
      if (params?.search) query.append('search', params.search);

      const res = await fetch(`${API_BASE}/products?${query.toString()}`);
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      // Fallback
      return SAMPLE_PRODUCTS.filter((p) => {
        if (params?.category && params.category !== 'all' && p.category !== params.category) return false;
        if (params?.gender && params.gender !== 'all' && p.gender !== params.gender && p.gender !== 'unisex') return false;
        if (params?.search) {
          const q = params.search.toLowerCase();
          return p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
        }
        return true;
      });
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) throw new Error('Product not found');
      return await res.json();
    } catch {
      return SAMPLE_PRODUCTS.find((p) => p.id === id) || null;
    }
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    } catch {
      return CATEGORIES;
    }
  },

  // Search
  async search(query: string): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Search failed');
      return await res.json();
    } catch {
      const q = query.toLowerCase();
      return SAMPLE_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
  },

  // Orders
  async createOrder(orderPayload: any): Promise<Order> {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (!res.ok) throw new Error('Order creation failed on server');
      return await res.json();
    } catch {
      // Offline / client calculation fallback
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const subtotal = orderPayload.items.reduce(
        (sum: number, it: any) => sum + it.product.price * it.quantity,
        0
      );
      const discountPercent = orderPayload.couponCode ? DEMO_COUPONS[orderPayload.couponCode] || 0 : 0;
      const discount = Math.round((subtotal * discountPercent) / 100);
      const shippingFee = orderPayload.deliveryMethod === 'express' ? 1200 : subtotal >= 9995 ? 0 : 750;

      return {
        id: `ord-${randomSuffix}`,
        orderNumber: `KN-${randomSuffix}`,
        createdAt: new Date().toISOString(),
        items: orderPayload.items,
        shippingAddress: orderPayload.shippingAddress,
        deliveryMethod: orderPayload.deliveryMethod,
        paymentMethod: orderPayload.paymentMethod,
        subtotal,
        discount,
        couponCode: orderPayload.couponCode,
        shippingFee,
        total: Math.max(0, subtotal - discount + shippingFee),
        status: 'confirmed'
      };
    }
  }
};
