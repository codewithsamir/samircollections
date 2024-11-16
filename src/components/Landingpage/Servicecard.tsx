import Image from 'next/image';
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="p-2 bg-white shadow-md rounded-lg w-[350px]" key={title}>
      <Image width={500} height={100} src={imageSrc} alt={title} className="w-full h-40 object-cover rounded" />
      <h4 className="mt-4 font-bold text-gray-800">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
