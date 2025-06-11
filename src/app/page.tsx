'use client';

import { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { CartProvider } from '@/context/CartContext';
import Cart from '@/components/Cart';
import ProductCard from '@/components/ProductCard';

// Temporary sample products - replace with your actual products
const sampleProducts = [
  {
    id: '1',
    name: 'Classic Pot',
    price: 49.99,
    image: '/placeholder.jpg', // Replace with your image
    description: 'A beautiful classic pot for your plants',
  },
  {
    id: '2',
    name: 'Modern Planter',
    price: 39.99,
    image: '/placeholder.jpg', // Replace with your image
    description: 'Contemporary design for modern homes',
  },
  // Add more products as needed
];

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Pot it like its hot</h1>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}
