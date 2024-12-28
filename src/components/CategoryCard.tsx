import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onSelect: (categoryId: Category['id']) => void;
}

export function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <div 
      onClick={() => onSelect(category.id)}
      className="relative overflow-hidden rounded-lg cursor-pointer group"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
        <p className="text-white/90 text-sm">{category.description}</p>
      </div>
    </div>
  );
}