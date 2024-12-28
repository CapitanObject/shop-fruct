import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartIconProps {
  items: CartItem[];
  onClick: () => void;
}

export function CartIcon({ items, onClick }: CartIconProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button 
      onClick={onClick}
      className="relative hover:bg-green-700 p-2 rounded-full" 
      aria-label="Корзина"
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}