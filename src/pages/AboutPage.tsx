import React from 'react';
import { Leaf, Truck, Award, Users, Clock, Shield } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">О компании ФрешМаркет</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы поставляем свежие фрукты, овощи и натуральные соки с 1992 года, заботясь о здоровье наших клиентов и качестве продукции.
          </p>
        </div>

        {/* История компании */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
          <div className="space-y-6 text-gray-600">
            <p>
              История ФрешМаркет началась в небольшом фруктовом магазине на окраине города. Основатель компании, Михаил Фрешов, мечтал создать место, где каждый покупатель сможет найти самые свежие и качественные фрукты и овощи.
            </p>
            <p>
              В 1992 году открылся первый магазин ФрешМаркет, который быстро завоевал любовь покупателей благодаря высокому качеству продукции и внимательному отношению к клиентам. К 2000 году сеть расширилась до 10 магазинов, а в 2010 году мы запустили собственное производство натуральных соков.
            </p>
            <p>
              Сегодня ФрешМаркет – это более 100 магазинов по всей стране, собственные фермы и современный завод по производству соков. Мы гордимся тем, что уже более 30 лет помогаем нашим клиентам вести здоровый образ жизни.
            </p>
          </div>
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Экологичность</h3>
            <p className="text-gray-600">Мы используем экологичную упаковку и поддерживаем местных фермеров</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <Truck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
            <p className="text-gray-600">Доставляем заказы в день оформления по всему городу</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
            <p className="text-gray-600">Строгий контроль качества на всех этапах</p>
          </div>
        </div>

        {/* Достижения */}
        <div className="bg-green-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Наши достижения</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-lg">магазинов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500k+</div>
              <div className="text-lg">довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-lg">лет на рынке</div>
            </div>
          </div>
        </div>

        {/* Сертификаты */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Наши сертификаты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <Shield className="h-12 w-12 text-green-600" />
              <div>
                <h3 className="font-semibold mb-1">ISO 9001:2015</h3>
                <p className="text-gray-600">Сертификат системы менеджмента качества</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="h-12 w-12 text-green-600" />
              <div>
                <h3 className="font-semibold mb-1">HACCP</h3>
                <p className="text-gray-600">Система управления безопасностью пищевых продуктов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}