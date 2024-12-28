import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { RegistrationForm } from '../components/auth/RegistrationForm';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, forgotPassword, isLoading, error } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
          {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? (
            <LoginForm 
              onSubmit={login} 
              onForgotPassword={forgotPassword}
              isLoading={isLoading} 
              error={error} 
            />
          ) : (
            <RegistrationForm 
              onSubmit={register} 
              isLoading={isLoading} 
              error={error} 
            />
          )}

          <div className="mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
            >
              {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}