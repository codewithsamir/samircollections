"use client";

import React from 'react';
import { motion } from 'motion/react';
import { FaWhatsapp } from 'react-icons/fa';

interface ProductCardProps {
  name: string;
  category: string;
  price: string;
  imageSrc: string;
  whatsapp?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, category, price, imageSrc, whatsapp = '9779824823877' }) => {
  const handleEnquire = () => {
    const message = `Hello, I'm interested in the ${name} (${category}) priced at ${price}.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-50 overflow-hidden flex flex-col"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100 group">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand">
          {category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h4 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{name}</h4>
        <p className="text-brand font-semibold mb-4">{price}</p>
        
        <div className="mt-auto">
          <button 
            onClick={handleEnquire}
            className="w-full flex items-center justify-center space-x-2 bg-brand text-white py-2.5 rounded-lg hover:bg-brand-dark transition-colors font-medium"
          >
            <FaWhatsapp className="text-green-400" />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
