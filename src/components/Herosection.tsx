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
<h3 className="text-center text-lg md:text-xl italic tracking-wide leading-relaxed">
  Good news! <span className="font-semibold text-green-600">We offer free pick-up and delivery</span> 
  <span className="font-semibold text-blue-600"> within 5 km of Janakpur city</span> for all <span className="font-semibold">repair services</span>.
</h3>






    </section>
  );
};

export default HeroSection;

