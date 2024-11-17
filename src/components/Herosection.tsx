"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  { src: '/jacket-repairing.png', alt: 'Tailor' },
  { src: '/jacket-repairing-2.png', alt: 'jacket zipper change' },
  // Add more images as needed
];

const Herosection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative lg:w-full h-[400px]">
      <div className="w-full h-full overflow-hidden relative">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-full h-full absolute transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
      <div className="bg w-full h-full bg-[#f5b92010] z-10 absolute top-0 left-0"></div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1"
        onClick={prevSlide}
      >
        &#8249;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1"
        onClick={nextSlide}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Herosection;
