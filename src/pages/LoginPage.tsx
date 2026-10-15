import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, AlertCircle, Zap } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, demoLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect
  const from = (location.state as any)?.from?.pathname || '/account';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleDemoLogin = () => {
    demoLogin();
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="font-athletic text-3xl font-extrabold tracking-tight uppercase">KINETIC</span>
        <h1 className="font-athletic text-2xl font-bold uppercase tracking-tight text-zinc-900">
          YOUR ACCOUNT FOR EVERYTHING NIKE
        </h1>
        <p className="text-xs text-zinc-500">
          Sign in to access your order history, saved footwear favorites, and member delivery benefits.
        </p>
      </div>

      {/* Demo Fast Login Banner */}
      <div className="p-4 bg-zinc-100 rounded-2xl border border-zinc-200/80 space-y-2 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center justify-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-black" />
          <span>Instant Demo Access</span>
        </div>
        <p className="text-[11px] text-zinc-500">
          Sign in immediately as a verified member with pre-seeded order history and saved addresses.
        </p>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
        >
          Sign In As Demo Member (Alex Vance)
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:bg-white focus:border-black"
            />
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700">
              Password
            </label>
            <span className="text-[11px] text-zinc-400 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:bg-white focus:border-black"
            />
            <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-all shadow-md flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <span>Signing In...</span>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Registration Link */}
      <div className="text-center text-xs text-zinc-500 pt-4 border-t border-zinc-200">
        <span>Not a member yet? </span>
        <Link to="/register" className="font-bold text-zinc-900 underline hover:text-black">
          Join Us
        </Link>
      </div>
    </div>
  );
};
