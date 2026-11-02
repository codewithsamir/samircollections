"use client";

import React, { useState } from 'react';
import ProductCard from '@/components/storefront/ProductCard';

const ReadymadeBranch = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const products = [
    { id: 1, name: "Classic Blue Denim Jeans", category: "Men's Wear", price: "Rs. 2,500", imageSrc: "https://images.unsplash.com/photo-1542272604-784c462371d3?auto=format&fit=crop&q=80" },
    { id: 2, name: "Formal White Shirt", category: "Men's Wear", price: "Rs. 1,800", imageSrc: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80" },
    { id: 3, name: "Boys Party Suit", category: "Boys' Wear", price: "Rs. 4,500", imageSrc: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80" },
    { id: 4, name: "Winter Puffer Jacket", category: "New Arrivals", price: "Rs. 3,800", imageSrc: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80" },
    { id: 5, name: "Casual Chino Pants", category: "Men's Wear", price: "Rs. 2,200", imageSrc: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80" },
    { id: 6, name: "Boys Printed T-Shirt", category: "Boys' Wear", price: "Rs. 650", imageSrc: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80" },
    { id: 7, name: "Men's Slim Fit Vest", category: "Men's Wear", price: "Rs. 1,500", imageSrc: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80" },
    { id: 8, name: "New Denim Collection", category: "New Arrivals", price: "Rs. 2,800", imageSrc: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80" },
  ];

  const filters = ['All', "Men's Wear", "Boys' Wear", 'New Arrivals'];

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <main className="w-full">
      {/* Header */}
      <section className="bg-brand text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold">Readymade Clothing</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Premium quality apparel for Men and Boys. Find your perfect fit today.
          </p>
        </div>
      </section>

      {/* Filter and Products Section */}
      <section className="py-20 bg-neutralBase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeFilter === filter 
                    ? 'bg-brand text-gold shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                imageSrc={product.imageSrc}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No products found in this category.
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default ReadymadeBranch;
