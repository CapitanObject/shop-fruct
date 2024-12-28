import React from 'react';
import { CategoryCard } from './CategoryCard';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (categoryId: Category['id']) => void;
}

export function CategoryGrid({ categories, onSelectCategory }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onSelect={onSelectCategory}
        />
      ))}
    </div>
  );
}