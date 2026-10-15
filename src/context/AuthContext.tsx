import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserAddress: (address: Address) => void;
  isAuthenticated: boolean;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'kinetic_auth_user_v1';
const TOKEN_STORAGE_KEY = 'kinetic_auth_jwt_v1';

const DEFAULT_DEMO_USER: User = {
  id: 'usr_demo_8829',
  name: 'Alex Vance',
  email: 'alex.vance@kineticathletics.io',
  phone: '+91 98200 12345',
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
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }, [token]);

  const login = async (email: string, password = 'password123') => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Simulated JWT token generation
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({ email, sub: 'usr_' + Date.now(), exp: Math.floor(Date.now() / 1000) + 86400 })
    )}.mock_signature_signature`;

    const loggedUser: User = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      addresses: user?.addresses?.length ? user.addresses : DEFAULT_DEMO_USER.addresses,
      createdAt: user?.createdAt || new Date().toISOString()
    };

    setUser(loggedUser);
    setToken(mockJwt);
    return { success: true };
  };

  const register = async (name: string, email: string, password = 'password123') => {
    if (!name.trim()) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({ email, name, exp: Math.floor(Date.now() / 1000) + 86400 })
    )}.mock_signature_signature`;

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      addresses: [],
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setToken(mockJwt);
    return { success: true };
  };

  const demoLogin = () => {
    setUser(DEFAULT_DEMO_USER);
    setToken('demo_jwt_token_alex_vance');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const updateUserAddress = (newAddress: Address) => {
    if (!user) return;
    const existing = user.addresses || [];
    const updated = [newAddress, ...existing.filter((a) => a.street !== newAddress.street)];
    setUser({ ...user, addresses: updated });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        updateUserAddress,
        isAuthenticated: !!user,
        demoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
