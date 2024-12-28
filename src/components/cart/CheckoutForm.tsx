import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { validatePhone } from '../../utils/validation';

interface CheckoutFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: 'card' | 'cash';
  comment?: string;
}

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => Promise<void>;
  isLoading: boolean;
}

export function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    deliveryDate: '',
    deliveryTime: '10:00-12:00',
    paymentMethod: 'card',
    comment: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Введите адрес доставки';
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Выберите дату доставки';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  // Генерация доступных дат доставки (следующие 7 дней)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Имя *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Телефон *
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+7 (999) 999-99-99"
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.phone ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Адрес доставки *
        </label>
        <textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.address ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">
            Дата доставки *
          </label>
          <select
            id="deliveryDate"
            value={formData.deliveryDate}
            onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.deliveryDate ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Выберите дату</option>
            {getAvailableDates().map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('ru-RU', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </option>
            ))}
          </select>
          {errors.deliveryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.deliveryDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">
            Время доставки *
          </label>
          <select
            id="deliveryTime"
            value={formData.deliveryTime}
            onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="10:00-12:00">10:00 - 12:00</option>
            <option value="12:00-14:00">12:00 - 14:00</option>
            <option value="14:00-16:00">14:00 - 16:00</option>
            <option value="16:00-18:00">16:00 - 18:00</option>
            <option value="18:00-20:00">18:00 - 20:00</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Способ оплаты *
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value as 'card' | 'cash' })
              }
              className="h-4 w-4 text-green-600"
            />
            <span className="ml-2">Банковской картой онлайн</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value as 'card' | 'cash' })
              }
              className="h-4 w-4 text-green-600"
            />
            <span className="ml-2">Наличными при получении</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Комментарий к заказу
        </label>
        <textarea
          id="comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Например: код домофона, этаж, особые пожелания"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Оформление заказа...' : 'Оформить заказ'}
      </button>
    </form>
  );
}