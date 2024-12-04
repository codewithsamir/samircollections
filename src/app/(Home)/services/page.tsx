// pages/services.js
import React from "react";
import ServiceCard from "@/components/Landingpage/Servicecard"; // Adjust path to your component
import { services } from "@/utility/servicedata"; // Adjust path to your data file

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Our Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            imageSrc={service.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
