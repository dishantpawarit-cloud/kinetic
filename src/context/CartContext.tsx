import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { DEMO_COUPONS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: number, color: string, quantity?: number) => { success: boolean; message: string };
  updateQuantity: (productId: string, size: number, color: string, delta: number) => void;
  removeFromCart: (productId: string, size: number, color: string) => void;
  clearCart: () => void;
  couponCode: string | null;
  discountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  finalTotal: number;
  totalItemCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'kinetic_cart_items_v1';
const COUPON_STORAGE_KEY = 'kinetic_cart_coupon_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    if (couponCode) {
      localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [couponCode]);

  const addToCart = (product: Product, size: number, color: string, quantity = 1) => {
    if (!size) {
      return { success: false, message: 'Please select a shoe size before adding to cart.' };
    }
    if (!color) {
      return { success: false, message: 'Please select a colorway before adding to cart.' };
    }

    let message = '';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, product.stock);
        if (currentQty >= product.stock) {
          message = `Cannot add more. Maximum available stock (${product.stock}) reached.`;
          return prev;
        }
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        message = `Updated ${product.name} quantity to ${newQty} in bag.`;
        return updated;
      } else {
        const itemQty = Math.min(quantity, product.stock);
        message = `Added ${product.name} (Size US ${size}) to your bag.`;
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity: itemQty }];
      }
    });

    setIsCartDrawerOpen(true);
    return { success: true, message: message || `Added ${product.name} to bag.` };
  };

  const updateQuantity = (productId: string, size: number, color: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size && item.selectedColor === color) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            if (nextQty > item.product.stock) return item;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, size: number, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'ELFBAR') {
      setCouponCode('ELFBAR');
      return { success: true, message: 'VIP Promo ELFBAR applied! Cart value set to ₹1.' };
    }
    if (DEMO_COUPONS[trimmed]) {
      setCouponCode(trimmed);
      return { success: true, message: `Promo code ${trimmed} applied! ${DEMO_COUPONS[trimmed]}% discount added.` };
    }
    return { success: false, message: 'Invalid promo code. Try SHOE10 or ELFBAR.' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
  };

  const isElfbar = couponCode === 'ELFBAR';
  const discountPercent = isElfbar ? 100 : couponCode && DEMO_COUPONS[couponCode] ? DEMO_COUPONS[couponCode] : 0;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const rawShippingFee = subtotal === 0 || subtotal >= 9995 ? 0 : 750;
  const shippingFee = isElfbar ? 0 : rawShippingFee;

  const discountAmount = isElfbar
    ? (subtotal > 0 ? subtotal - 1 : 0)
    : Math.round((subtotal * discountPercent) / 100);

  const finalTotal = isElfbar
    ? (cart.length > 0 ? 1 : 0)
    : Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        couponCode,
        discountPercent,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        finalTotal,
        totalItemCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
