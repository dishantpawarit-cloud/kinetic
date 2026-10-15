import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await register(name, email, password);
    setLoading(false);

    if (res.success) {
      navigate('/account');
    } else {
      setError(res.error || 'Registration failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="font-athletic text-3xl font-extrabold tracking-tight uppercase">KINETIC</span>
        <h1 className="font-athletic text-2xl font-bold uppercase tracking-tight text-zinc-900">
          BECOME A KINETIC MEMBER
        </h1>
        <p className="text-xs text-zinc-500">
          Create your member profile to get first access to products, inspiration, and free delivery on all shoe orders over ₹9,995.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Smith"
              required
              className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:bg-white focus:border-black"
            />
            <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

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
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
            Password (Min 6 Characters)
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
              className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl outline-none focus:bg-white focus:border-black"
            />
            <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="text-[11px] text-zinc-500 space-y-1 py-1">
          <div className="flex items-center gap-1.5 text-zinc-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Free shipping on all footwear orders over ₹9,995</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>60-day wear trial & hassle-free return label</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-all shadow-md flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <span>Join Us</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-zinc-500 pt-4 border-t border-zinc-200">
        <span>Already have an account? </span>
        <Link to="/login" className="font-bold text-zinc-900 underline hover:text-black">
          Sign In
        </Link>
      </div>
    </div>
  );
};
