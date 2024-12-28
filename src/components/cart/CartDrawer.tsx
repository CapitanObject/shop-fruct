import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';
import { CartSummary } from './CartSummary';
import { CheckoutForm } from './CheckoutForm';
import { formatPrice } from '../../utils/formatPrice';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async (formData: any) => {
    setIsLoading(true);
    try {
      // Имитация отправки заказа на сервер
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const deliveryFee = subtotal >= 2000 ? 0 : 300;
      const total = subtotal + deliveryFee;
      
      // Формируем данные заказа
      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        subtotal,
        deliveryFee,
        total,
        delivery: {
          address: formData.address,
          date: formData.deliveryDate,
          time: formData.deliveryTime,
        },
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        },
        paymentMethod: formData.paymentMethod,
        comment: formData.comment,
      };

      // В реальном приложении здесь был бы API-запрос
      console.log('Order placed:', orderData);

      setOrderSuccess(true);
      setTimeout(() => {
        onClose();
        setIsCheckout(false);
        setOrderSuccess(false);
      }, 3000);
    } catch (error) {
      alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">
              {isCheckout ? 'Оформление заказа' : 'Корзина'}
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {orderSuccess ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold mb-2">Заказ успешно оформлен!</h3>
                <p className="text-gray-600">
                  Мы отправили подтверждение на указанный email.<br />
                  Скоро с вами свяжется наш менеджер.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    <p className="text-gray-500 text-center mb-4">Корзина пуста</p>
                    <button
                      onClick={onClose}
                      className="text-green-600 hover:text-green-700 font-medium flex items-center"
                    >
                      Перейти к покупкам
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                ) : isCheckout ? (
                  <div className="p-4">
                    <CartSummary items={items} />
                    <div className="mt-6">
                      <CheckoutForm onSubmit={handleCheckout} isLoading={isLoading} />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-green-600 font-semibold">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-gray-200 rounded"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1 hover:bg-red-100 text-red-500 rounded ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <CartSummary items={items} />
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t p-4">
                  {isCheckout ? (
                    <button
                      onClick={() => setIsCheckout(false)}
                      className="w-full text-green-600 hover:text-green-700 font-medium"
                      disabled={isLoading}
                    >
                      ← Вернуться к корзине
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsCheckout(true)}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Перейти к оформлению
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}