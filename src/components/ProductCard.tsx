import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-green-600 font-bold">{formatPrice(product.price)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
            aria-label="Добавить в корзину"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}