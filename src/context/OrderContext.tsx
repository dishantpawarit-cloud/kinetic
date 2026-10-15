import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem, Address } from '../types';

interface CreateOrderParams {
  items: CartItem[];
  shippingAddress: Address;
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'cod' | 'upi';
  couponCode?: string;
  discountAmount: number;
  transactionId?: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (params: CreateOrderParams) => Order;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'kinetic_orders_history_v1';

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-849201',
    orderNumber: 'KN-849201',
    createdAt: '2026-03-01T14:32:00Z',
    items: [
      {
        product: {
          id: 'nike-air-force-1-07',
          name: "Nike Air Force 1 '07",
          slug: 'nike-air-force-1-07',
          brand: 'Nike',
          category: 'lifestyle',
          gender: 'unisex',
          price: 8995,
          description: "Iconic Nike basketball shoe.",
          highlights: [],
          specs: {},
          images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'],
          colors: [{ name: 'Triple White', hex: '#FFFFFF' }],
          sizes: [10],
          stock: 20,
          rating: 4.9,
          reviewCount: 1420,
          tags: ['Iconic']
        },
        selectedSize: 10,
        selectedColor: 'Triple White',
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: 'Alex Vance',
      email: 'alex.vance@kineticathletics.io',
      phone: '+91 98200 12345',
      street: '42 Bandra West, Linking Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      country: 'India'
    },
    deliveryMethod: 'standard',
    paymentMethod: 'card',
    subtotal: 8995,
    discount: 0,
    shippingFee: 0,
    total: 8995,
    status: 'delivered'
  }
];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const createOrder = (params: CreateOrderParams): Order => {
    const rawSubtotal = params.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const isElfbar = params.couponCode === 'ELFBAR';
    const shippingFee = isElfbar ? 0 : params.deliveryMethod === 'express' ? 1200 : rawSubtotal >= 9995 ? 0 : 750;
    const discount = isElfbar ? Math.max(0, rawSubtotal - 1) : params.discountAmount;
    const finalTotal = isElfbar ? 1 : Math.max(0, rawSubtotal - discount + shippingFee);

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ord-${randomSuffix}`;
    const orderNumber = `KN-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: params.items,
      shippingAddress: params.shippingAddress,
      deliveryMethod: params.deliveryMethod,
      paymentMethod: params.paymentMethod,
      transactionId: params.transactionId,
      paymentStatus: params.paymentMethod === 'cod' ? 'pending' : 'verified',
      subtotal: rawSubtotal,
      discount,
      couponCode: params.couponCode,
      shippingFee,
      total: finalTotal,
      status: 'confirmed'
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id || o.orderNumber === id);
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
