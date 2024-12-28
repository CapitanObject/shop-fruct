import React from 'react';
import { CartItem } from '../../types';
import { formatPrice } from '../../utils/formatPrice';

interface CartSummaryProps {
  items: CartItem[];
}

export function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 2000 ? 0 : 300;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <h3 className="font-semibold text-lg">Сумма заказа</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)} шт.)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Доставка</span>
          {deliveryFee === 0 ? (
            <span className="text-green-600">Бесплатно</span>
          ) : (
            <span>{formatPrice(deliveryFee)}</span>
          )}
        </div>

        {deliveryFee > 0 && (
          <p className="text-sm text-gray-600">
            Добавьте товаров еще на {formatPrice(2000 - subtotal)} для бесплатной доставки
          </p>
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-semibold">
          <span>Итого к оплате</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}