import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover rounded" />
      <h4 className="mt-4 font-bold">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
