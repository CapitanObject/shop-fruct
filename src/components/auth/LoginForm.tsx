import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import { LoginCredentials } from '../../types/auth';
import { validateEmail } from '../../utils/validation';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  onForgotPassword: (email: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function LoginForm({ onSubmit, onForgotPassword, isLoading, error }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      errors.email = 'Введите корректный email адрес';
    }

    if (!isResetMode && !formData.password) {
      errors.password = 'Введите пароль';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isResetMode) {
      try {
        await onForgotPassword(formData.email);
        setResetSuccess(true);
      } catch (error) {
        setValidationErrors({
          email: 'Ошибка отправки письма для восстановления пароля'
        });
      }
    } else {
      await onSubmit(formData);
    }
  };

  const toggleResetMode = () => {
    setIsResetMode(!isResetMode);
    setResetSuccess(false);
    setValidationErrors({});
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {resetSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
          Инструкции по восстановлению пароля отправлены на ваш email
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`pl-10 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
                validationErrors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
          </div>
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
          )}
        </div>

        {!isResetMode && (
          <>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
                    validationErrors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Запомнить меня
                </label>
              </div>
            </div>
          </>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isResetMode ? (
              'Восстановить пароль'
            ) : (
              'Войти'
            )}
          </button>
        </div>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={toggleResetMode}
          className="text-sm text-green-600 hover:text-green-500"
        >
          {isResetMode ? 'Вернуться к входу' : 'Забыли пароль?'}
        </button>
      </div>
    </div>
  );
}