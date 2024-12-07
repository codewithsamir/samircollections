"use client";

import Image from "next/image";

import { FaToolbox, FaHandshake,  } from 'react-icons/fa';

export default function AboutUs() {


  return (
    <section className="w-full py-16 bg-gray-50">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          About Us
        </h1>
        <p className="text-gray-600 text-xl">
          Discover our story and how we make your life easier.
        </p>
      </div>

      {/* Main Content: Row 1 */}
      <div className="w-full flex flex-col md:flex-row justify-center gap-10 p-8 mb-10">
        {/* Left side: Image */}
        <div className="flex justify-center mb-6 md:mb-0">
          <Image
            src="/Clothing-alterations.jpg" // Replace with your image URL
            alt="Samir Bag and Jeans"
            width={400}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Right side: Basic Description */}
        <div className="flex flex-col w-full md:w-[700px]">
          <p className="text-lg text-gray-700 mb-6 flex items-center">
            <FaToolbox className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mr-4" size={36} />
            At Samir Bag and Jeans Repairing Center, we make it easy and convenient to get your items repaired. Whether it&apos;s a torn bag or a broken zipper, our doorstep service is designed to save you time and hassle.
          </p>
          <p className="text-lg text-gray-700 mb-6 flex items-center">
            <FaHandshake className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mr-4" size={36} />
            Many of you face challenges like traveling to repair shops or not having access to reliable services. That&apos;s where we step in, bringing professional repairs to your doorstep.
          </p>
        </div>
      </div>

    </section>
  );
}
