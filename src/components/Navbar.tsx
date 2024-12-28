import React from 'react';
import { User, Menu } from 'lucide-react';
import { CartIcon } from './CartIcon';
import { CartItem, AuthUser } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onCartClick: () => void;
  onNavigate: (page: 'home' | 'about' | 'auth' | 'profile') => void;
  currentPage: 'home' | 'about' | 'auth' | 'profile';
  user: AuthUser | null;
}

export function Navbar({ cartItems, onCartClick, onNavigate, currentPage, user }: NavbarProps) {
  return (
    <nav className="bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span 
              className="text-xl font-bold cursor-pointer" 
              onClick={() => onNavigate('home')}
            >
              ФрешМаркет
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 rounded-md ${
                  currentPage === 'home' ? 'bg-green-700' : 'hover:bg-green-700'
                }`}
              >
                Главная
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`px-3 py-2 rounded-md ${
                  currentPage === 'about' ? 'bg-green-700' : 'hover:bg-green-700'
                }`}
              >
                О нас
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <CartIcon items={cartItems} onClick={onCartClick} />
            <button 
              onClick={() => onNavigate(user ? 'profile' : 'auth')}
              className="hover:bg-green-700 p-2 rounded-full flex items-center space-x-2" 
              aria-label={user ? 'Личный кабинет' : 'Войти'}
            >
              <User className="h-6 w-6" />
              {user && (
                <span className="hidden md:inline text-sm">{user.name}</span>
              )}
            </button>
            <button className="md:hidden hover:bg-green-700 p-2 rounded-full" aria-label="Меню">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}