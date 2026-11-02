"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiX } from 'react-icons/fi';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80', category: 'Fancy' },
    { src: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80', category: 'Readymade' },
    { src: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80', category: 'Repair Work' },
    { src: 'https://images.unsplash.com/photo-1558769132-cb1fac0840c2?auto=format&fit=crop&q=80', category: 'Storefront' },
    { src: 'https://images.unsplash.com/photo-1599643478514-4a52023a75e0?auto=format&fit=crop&q=80', category: 'Fancy' },
    { src: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80', category: 'Readymade' },
    { src: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80', category: 'Repair Work' },
    { src: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80', category: 'Readymade' },
  ];

  return (
    <main className="w-full bg-neutralBase min-h-screen">
      {/* Header */}
      <section className="bg-brand text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold">Gallery</h1>
          <p className="text-xl text-gray-300">
            A glimpse into our stores, products, and craftsmanship.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02 }}
              className="relative cursor-pointer group overflow-hidden rounded-xl aspect-square"
              onClick={() => setSelectedImage(img.src)}
            >
              <img 
                src={img.src} 
                alt={`Gallery Image - ${img.category}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{img.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <FiX className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default Gallery;
