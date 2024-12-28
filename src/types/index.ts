export type ProductCategory = 'fruit' | 'vegetable' | 'juice';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
  description: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  address?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
}