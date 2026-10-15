import React, { useState } from 'react';
import { Product } from '../../types';
import { ProductImage } from '../common/ProductImage';

interface ProductGalleryProps {
  product: Product;
  selectedColorIndex: number;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  product,
  selectedColorIndex
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.images?.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'];

  const primaryHex = product.colors[selectedColorIndex]?.hex || product.colors[0]?.hex;

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails column */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0">
        {images.map((imgUrl, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
              activeImageIndex === idx ? 'border-black ring-1 ring-black' : 'border-zinc-200 hover:border-zinc-400 opacity-80 hover:opacity-100'
            }`}
          >
            <ProductImage
              src={imgUrl}
              alt={`${product.name} view ${idx + 1}`}
              fallbackColor={primaryHex}
              name={product.name}
              category={product.category}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main active image viewport */}
      <div className="flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 group">
        <ProductImage
          src={images[activeImageIndex] || images[0]}
          alt={product.name}
          fallbackColor={primaryHex}
          name={product.name}
          category={product.category}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Status badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {product.isNewArrival && (
            <span className="text-xs font-bold uppercase tracking-wider bg-white/95 text-black px-2.5 py-1 rounded shadow-xs">
              Just In
            </span>
          )}
          {product.isSale && (
            <span className="text-xs font-bold uppercase tracking-wider bg-red-600 text-white px-2.5 py-1 rounded shadow-xs">
              Sale {product.discountPercent}% off
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
