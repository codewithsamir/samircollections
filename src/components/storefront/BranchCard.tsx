"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FiArrowRight } from 'react-icons/fi';

interface BranchCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

const BranchCard: React.FC<BranchCardProps> = ({ title, description, imageSrc, href }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform">
        <h3 className="text-2xl font-bold mb-2 text-gold">{title}</h3>
        <p className="text-sm text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          {description}
        </p>
        
        <Link 
          href={href} 
          className="inline-flex items-center space-x-2 text-gold hover:text-white font-semibold transition-colors"
        >
          <span>Explore Branch</span>
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BranchCard;
