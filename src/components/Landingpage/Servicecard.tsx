import Image from 'next/image';
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSrc }) => {
  return (
    <div  className="p-4 bg-white shadow-lg rounded-lg w-[300px] transform transition-all hover:scale-105">
    <Image
      width={320}
      height={200}
      src={imageSrc}
      alt={title}
      className="w-full h-[170px] object-cover rounded-t-lg"
    />
    <div className="p-2">
      <h4 className=" text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-all">{title}</h4>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  </div>
  );
};

export default ServiceCard;
