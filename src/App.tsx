import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { Product, ProductCategory, CartItem } from './types';
import { CATEGORIES } from './constants/categories';
import { SAMPLE_PRODUCTS } from './constants/products';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'auth' | 'profile'>('home');
  const { user } = useAuth();

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const filteredProducts = selectedCategory
    ? SAMPLE_PRODUCTS.filter(product => product.category === selectedCategory)
    : [];

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'auth':
        return <AuthPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return !selectedCategory ? (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Добро пожаловать в ФрешМаркет</h1>
            <p className="text-gray-600 mb-8">Выберите категорию продуктов</p>
            <CategoryGrid 
              categories={CATEGORIES} 
              onSelectCategory={setSelectedCategory} 
            />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {CATEGORIES.find(c => c.id === selectedCategory)?.name}
              </h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                ← Назад к категориям
              </button>
            </div>
            <ProductGrid 
              products={filteredProducts} 
              onAddToCart={handleAddToCart} 
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartItems={cartItems} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={(page) => {
          setCurrentPage(page);
          setSelectedCategory(null);
        }}
        currentPage={currentPage}
        user={user}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;