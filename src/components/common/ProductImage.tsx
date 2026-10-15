import React, { useState } from 'react';
import { SneakerGraphic } from './SneakerGraphic';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackColor?: string;
  name?: string;
  category?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  fallbackColor = '#18181B',
  name = 'Nike Shoe',
  category = 'Athletic'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <SneakerGraphic
        color={fallbackColor}
        name={name}
        category={category}
        className={className}
      />
    );
  }

  return (
    <div className={`relative bg-zinc-100 overflow-hidden flex items-center justify-center ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-200 animate-pulse flex items-center justify-center">
          <span className="sr-only">Loading {alt}...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
