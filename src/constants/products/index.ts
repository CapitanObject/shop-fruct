import { FRUIT_PRODUCTS } from './fruits';
import { VEGETABLE_PRODUCTS } from './vegetables';
import { JUICE_PRODUCTS } from './juices';

// Ensure no duplicate IDs across product categories
export const SAMPLE_PRODUCTS = [
  ...FRUIT_PRODUCTS,
  ...VEGETABLE_PRODUCTS,
  ...JUICE_PRODUCTS,
];