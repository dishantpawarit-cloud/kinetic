import React from 'react';

interface SneakerGraphicProps {
  color?: string;
  name?: string;
  category?: string;
  className?: string;
}

export const SneakerGraphic: React.FC<SneakerGraphicProps> = ({
  color = '#111111',
  name = 'Nike Athletic',
  category = 'Lifestyle',
  className = 'w-full h-full'
}) => {
  return (
    <div className={`relative flex items-center justify-center bg-zinc-100 overflow-hidden select-none ${className}`}>
      {/* Background athletic geometry watermark */}
      <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200/50 via-zinc-100 to-white" />
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full border border-zinc-200/60 pointer-events-none" />

      {/* Sneaker Vector Silhouette */}
      <div className="relative z-10 w-4/5 max-w-[320px] aspect-[16/10] flex items-center justify-center transition-transform duration-500 hover:scale-105">
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          {/* Outsole Base */}
          <path
            d="M30 195 C 70 200, 150 202, 230 198 C 300 195, 360 188, 385 165 C 388 162, 382 155, 365 156 C 330 158, 250 162, 190 160 C 130 158, 60 166, 32 180 Z"
            fill="#E4E4E7"
            stroke="#D4D4D8"
            strokeWidth="2"
          />
          {/* Midsole / Air Cushion Chamber */}
          <path
            d="M40 180 C 85 182, 170 182, 240 178 C 300 175, 355 170, 375 152 C 370 142, 350 140, 310 144 C 240 150, 160 150, 95 158 C 65 162, 45 170, 40 180 Z"
            fill="#FFFFFF"
            stroke="#E4E4E7"
            strokeWidth="1.5"
          />
          {/* Air Bubble Pods */}
          <rect x="75" y="168" width="34" height="8" rx="4" fill="#38BDF8" opacity="0.8" />
          <rect x="118" y="167" width="28" height="8" rx="4" fill="#38BDF8" opacity="0.8" />
          <rect x="154" y="166" width="28" height="8" rx="4" fill="#38BDF8" opacity="0.8" />

          {/* Main Shoe Body Upper */}
          <path
            d="M48 174 C 42 160, 48 118, 95 90 C 120 75, 150 68, 178 78 C 190 82, 205 102, 225 112 C 265 132, 330 134, 370 145 C 378 147, 375 155, 365 158 C 320 164, 180 168, 52 176 Z"
            fill={color === '#FFFFFF' ? '#F4F4F5' : color}
          />

          {/* Toe Cap Overlay */}
          <path
            d="M290 130 C 335 135, 372 144, 372 147 C 365 155, 325 160, 280 158 C 285 148, 288 138, 290 130 Z"
            fill="#09090B"
            opacity="0.18"
          />

          {/* Lacing Collar & Tongue */}
          <path
            d="M150 72 C 165 72, 185 85, 200 102 C 205 107, 198 116, 188 112 C 175 106, 158 92, 142 82 C 138 78, 142 72, 150 72 Z"
            fill="#FAFAFA"
            opacity="0.9"
          />

          {/* Iconic Swoosh Wing Silhouette */}
          <path
            d="M100 138 C 145 142, 215 136, 285 96 C 292 92, 298 96, 290 102 C 240 142, 170 162, 118 152 C 102 149, 95 140, 100 138 Z"
            fill={color === '#111111' || color === '#000000' || color === '#18181B' ? '#FFFFFF' : '#09090B'}
            className="transition-transform duration-300"
          />

          {/* Stitch Line Detailing */}
          <path
            d="M95 95 C 120 110, 155 125, 220 132"
            stroke="#A1A1AA"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Category / Name watermark */}
      <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-zinc-500">
        {category} · {name}
      </div>
    </div>
  );
};
