"use client";
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const images = [
  { src: '/jacket-repairing.png', alt: 'Tailor' },
  { src: '/jacket-repairing-2.png', alt: 'Jacket Zipper Change' },
  // Add more images as needed
];

const Herosection = () => {
  return (
    <div className="relative w-full lg:h-[400px] h-[300px]">
      <Swiper
        pagination={{ clickable: true }}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        autoplay={{ delay: 10000 }} // Auto slide every 10 seconds
        modules={[Navigation, Pagination, Autoplay]}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="bg-[#f5b92010] absolute top-0 left-0 w-full h-full z-10"></div>
      {/* Navigation buttons */}
      <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 cursor-pointer"></div>
      <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 cursor-pointer"></div>
    </div>
  );
};

export default Herosection;
