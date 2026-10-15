import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="bg-zinc-950 text-white text-xs font-medium py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center truncate">
          <span className="font-semibold text-amber-400">🇮🇳 INDIA (₹ INR)</span>
          <span className="mx-2 text-zinc-500">·</span>
          <span className="text-zinc-300">Use promo code </span>
          <span className="font-bold underline decoration-amber-400 underline-offset-2 text-amber-300">ELFBAR</span>
          <span className="text-zinc-300"> for ₹1 cart value</span>
          <span className="mx-2 text-zinc-500">·</span>
          <span className="font-bold underline decoration-zinc-400 underline-offset-2">SHOE10</span>
          <span className="text-zinc-300"> for 10% off</span>
          <span className="mx-2 text-zinc-500">·</span>
          <Link to="/sale" className="underline underline-offset-2 text-white hover:text-zinc-300">
            Shop Sale
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-zinc-400 hover:text-white p-1 ml-2 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
