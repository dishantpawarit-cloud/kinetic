import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { SAMPLE_PRODUCTS, CATEGORIES, DEMO_COUPONS } from './src/data/products';
import { Product, Order, User } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-Memory Database store for demo backend runtime
let productsInventory: Product[] = [...SAMPLE_PRODUCTS];
let ordersStore: Order[] = [];
let usersStore: (User & { passwordHash?: string })[] = [
  {
    id: 'usr_demo_8829',
    name: 'Alex Vance',
    email: 'alex.vance@kineticathletics.io',
    phone: '+91 98200 12345',
    passwordHash: 'demo_hashed_password_123',
    addresses: [
      {
        fullName: 'Alex Vance',
        email: 'alex.vance@kineticathletics.io',
        phone: '+91 98200 12345',
        street: '42 Bandra West, Linking Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400050',
        country: 'India'
      }
    ],
    createdAt: '2025-11-14T10:00:00Z'
  }
];

// 1. GET /api/products
app.get('/api/products', (req: Request, res: Response) => {
  const { category, gender, sort, minPrice, maxPrice, search } = req.query;
  let result = [...productsInventory];

  if (category && category !== 'all') {
    result = result.filter((p) => p.category === category);
  }

  if (gender && gender !== 'all') {
    result = result.filter((p) => p.gender === gender || p.gender === 'unisex');
  }

  if (minPrice) {
    result = result.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter((p) => p.price <= Number(maxPrice));
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'newest') {
    result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  }

  res.json(result);
});

// 2. GET /api/products/:id
app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = productsInventory.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// 3. GET /api/categories
app.get('/api/categories', (_req: Request, res: Response) => {
  res.json(CATEGORIES);
});

// 4. GET /api/search?q=
app.get('/api/search', (req: Request, res: Response) => {
  const q = (req.query.q as string || '').toLowerCase().trim();
  if (!q) {
    return res.json([]);
  }

  const matches = productsInventory.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );

  res.json(matches);
});

// 5. POST /api/auth/register
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = usersStore.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }

  const newUser: User & { passwordHash: string } = {
    id: `usr_${Date.now()}`,
    name,
    email: email.toLowerCase(),
    addresses: [],
    createdAt: new Date().toISOString(),
    passwordHash: `hash_${password}` // Demo simulated hash
  };

  usersStore.push(newUser);

  const token = `jwt_${Buffer.from(JSON.stringify({ id: newUser.id, email: newUser.email })).toString('base64')}`;

  const { passwordHash, ...cleanUser } = newUser;
  res.status(201).json({ user: cleanUser, token });
});

// 6. POST /api/auth/login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = usersStore.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = `jwt_${Buffer.from(JSON.stringify({ id: user.id, email: user.email })).toString('base64')}`;
  const { passwordHash, ...cleanUser } = user;
  res.json({ user: cleanUser, token });
});

// 7. GET /api/users/me
app.get('/api/users/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing bearer token' });
  }

  // Retrieve default user or first user
  const user = usersStore[0];
  const { passwordHash, ...cleanUser } = user;
  res.json(cleanUser);
});

// 8. POST /api/orders (Server-side price and inventory validation)
app.post('/api/orders', (req: Request, res: Response) => {
  const { items, shippingAddress, deliveryMethod, paymentMethod, couponCode } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart items cannot be empty' });
  }

  if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street) {
    return res.status(400).json({ error: 'Valid shipping address is required' });
  }

  // Calculate prices strictly from server inventory
  let serverSubtotal = 0;
  for (const item of items) {
    const prod = productsInventory.find((p) => p.id === item.product.id);
    if (!prod) {
      return res.status(400).json({ error: `Product ${item.product.id} not found in catalog` });
    }
    if (prod.stock < item.quantity) {
      return res.status(400).json({
        error: `Insufficient inventory for ${prod.name}. Available: ${prod.stock}`
      });
    }
    serverSubtotal += prod.price * item.quantity;
  }

  // Server coupon discount
  let serverDiscount = 0;
  if (couponCode) {
    const codeUpper = String(couponCode).trim().toUpperCase();
    const discountPercent = DEMO_COUPONS[codeUpper] || 0;
    serverDiscount = Math.round((serverSubtotal * discountPercent) / 100);
  }

  const shippingFee = deliveryMethod === 'express' ? 1200 : serverSubtotal >= 9995 ? 0 : 750;
  const finalTotal = Math.max(0, serverSubtotal - serverDiscount + shippingFee);

  // Decrement inventory safely
  for (const item of items) {
    const prod = productsInventory.find((p) => p.id === item.product.id);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
    }
  }

  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const newOrder: Order = {
    id: `ord-${randomSuffix}`,
    orderNumber: `KN-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    items,
    shippingAddress,
    deliveryMethod: deliveryMethod || 'standard',
    paymentMethod: paymentMethod || 'card',
    subtotal: serverSubtotal,
    discount: serverDiscount,
    couponCode,
    shippingFee,
    total: finalTotal,
    status: 'confirmed'
  };

  ordersStore.push(newOrder);
  res.status(201).json(newOrder);
});

// 9. GET /api/orders/:id
app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = ordersStore.find((o) => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// 10. GET /api/orders/my-orders
app.get('/api/orders/my-orders', (_req: Request, res: Response) => {
  res.json(ordersStore);
});

// Setup Vite Dev Middleware or Serve Static Files
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In dev mode, mount Vite middlewares
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`KINETIC Nike E-Commerce Server listening on port ${PORT}`);
  });
}

// Only start listener if invoked directly
if (process.env.RUN_SERVER === 'true') {
  startServer();
}

export default app;
