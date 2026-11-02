"use client";

import React from 'react';
import { motion } from 'motion/react';

interface RepairServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const RepairServiceCard: React.FC<RepairServiceCardProps> = ({ title, description, imageSrc }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand/10"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
        <p className="text-gray-600 leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default RepairServiceCard;
