import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AuthUser, LoginCredentials, RegisterCredentials, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });

  // Проверяем сохраненную сессию при загрузке
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setState(prev => ({ ...prev, user }));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: AuthUser = {
        id: '1',
        email: credentials.email,
        name: 'Тестовый Пользователь',
      };
      
      setState(prev => ({ ...prev, user, isLoading: false }));
      
      if (credentials.rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Неверный email или пароль',
        isLoading: false,
      }));
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Ошибка отправки письма для восстановления пароля',
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: AuthUser = {
        id: '1',
        email: credentials.email,
        name: credentials.name,
      };
      
      setState(prev => ({ ...prev, user, isLoading: false }));
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Ошибка регистрации. Попробуйте позже.',
        isLoading: false,
      }));
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setState({ user: null, isLoading: false, error: null });
  }, []);

  const updateProfile = useCallback(async (data: Partial<AuthUser>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...state.user, ...data } as AuthUser;
      setState(prev => ({ ...prev, user: updatedUser, isLoading: false }));
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Ошибка обновления профиля',
        isLoading: false,
      }));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider 
      value={{ 
        ...state, 
        login, 
        register, 
        logout, 
        updateProfile,
        forgotPassword 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};