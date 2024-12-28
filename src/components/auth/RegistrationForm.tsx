import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { RegisterCredentials } from '../../types/auth';
import { validatePassword, validateEmail, validatePhone } from '../../utils/validation';

interface RegistrationFormProps {
  onSubmit: (data: RegisterCredentials) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function RegistrationForm({ onSubmit, isLoading, error }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    agreement: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Введите ваше имя';
    }

    if (!validateEmail(formData.email)) {
      errors.email = 'Введите корректный email адрес';
    }

    if (!validatePassword(formData.password)) {
      errors.password = 'Пароль должен содержать минимум 8 символов, включая буквы и цифры';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Введите корректный номер телефона';
    }

    if (!formData.agreement) {
      errors.agreement = 'Необходимо принять условия пользовательского соглашения';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await onSubmit({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone: formData.phone,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Имя *
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
            validationErrors.name ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {validationErrors.name && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
            validationErrors.email ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {validationErrors.email && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Телефон
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+7 (999) 999-99-99"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
            validationErrors.phone ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {validationErrors.phone && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
        )}
      </div>

      <div className="relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Пароль *
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
              validationErrors.password ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {validationErrors.password && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Подтверждение пароля *
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
            validationErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {validationErrors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agreement"
            type="checkbox"
            checked={formData.agreement}
            onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3">
          <label htmlFor="agreement" className="text-sm text-gray-700">
            Я принимаю условия пользовательского соглашения и даю согласие на обработку персональных данных
          </label>
          {validationErrors.agreement && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.agreement}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          'Зарегистрироваться'
        )}
      </button>
    </form>
  );
}