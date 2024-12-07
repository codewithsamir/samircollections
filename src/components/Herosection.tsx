// "use client";
// import React, { useEffect, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// // import required modules
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import Image from 'next/image';

// const images = [
//   { src: '/jacket-repairing.png', alt: 'Tailor', mobileSrc: '/small-jacket-repairing.png' },
//   { src: '/jacket-repairing-2.png', alt: 'Jacket Zipper Change', mobileSrc: '/small-jacket-reparing2.png' },
//   // Add more images as needed
// ];

// const Herosection = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 800);
//     };

//     // Initial check
//     handleResize();

//     // Add event listener
//     window.addEventListener('resize', handleResize);

//     // Cleanup event listener
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className="relative w-full lg:h-[400px] h-[300px]">
//       <Swiper
//         pagination={{ clickable: true }}
//         navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
//         autoplay={{ delay: 10000 }} // Auto slide every 10 seconds
//         modules={[Navigation, Pagination, Autoplay]}
//         className="w-full h-full"
//       >
//         {images.map((image, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full h-full">
//               <Image
//                 src={isMobile ? image.mobileSrc : image.src}
//                 alt={image.alt}
//                 fill
//                 style={{ objectFit: 'cover', objectPosition: 'center' }}
//                 className="w-full h-full"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <div className="bg-[#f5b92010] absolute top-0 left-0 w-full h-full z-10"></div>
//       {!isMobile && (
//         <>
//           {/* Navigation buttons */}
//           <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 cursor-pointer"></div>
//           <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 cursor-pointer"></div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Herosection;



import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import Header from './Header';

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-6 md:py-16  bg-red-100 ">
    
     <div className="relative z-10  text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Samir Bag & Jeans Repairing Center</h1>

        <p className="text-lg md:text-xl italic mb-8">
          Fixing the fashion industry by powering online tailoring and repairs.
        </p>

  {/* Buttons */}
<div className="flex justify-center flex-wrap gap-2 md:gap-6">
  <Link href="#service">
  <button className="border-2 border-red-500 text-red-500 font-semibold py-1 md:py-2 px-4 md:px-8 rounded-full text-sm  md:text-xl hover:bg-red-500  hover:text-white transition duration-300 ease-in-out">
    Explore our Services
  </button>
  </Link>
  <Link href={"/pricelist"}>
  <button className="bg-red-500  text-white font-semibold py-1 md:py-2 px-4 md:px-8 rounded-full text-sm md:text-xl hover:bg-red-700 transition duration-300 ease-in-out">
    See our prices
  </button>
  </Link>
</div>

      </div>
     <div className="w-full sm:w-[600px] md:w-[1000px] mx-auto h-full sm:h-[350px]">
     <Image src={"/cloth.png"}   alt="Background"
       width={800}
       height={400}
        
          className='w-full h-full object-cover'
         
         />
     </div>
{/* 
         <div className="iamge-box">
        <Image
          src="/Clothing-alterations.jpg" 
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="opacity-75"
        />
        
  <div className="absolute top-0 left-0 w-full h-full bg-red-100 bg-opacity-30 -z-1">
    
  </div>
      </div> */}
<h3 className="text-center text-lg md:text-xl italic tracking-wide">
  We now offer a range of high-quality bag cloths and products to meet your needs.  
  <span className="font-semibold text-red-600 block">If you want to explore our products, please visit the Product page.</span>
</h3>


    </section>
  );
};

export default HeroSection;

