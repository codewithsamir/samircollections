"use client";
import { processSteps } from "@/utility/process";
import Image from "next/image";
import { useState } from "react";
import { FaToolbox, FaHandshake, FaTag, FaBullseye } from 'react-icons/fa';

export default function AboutUs() {
  const [showMission, setShowMission] = useState(false);

  const handleToggleMission = () => {
    setShowMission(!showMission);
  };

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
            At Samir Bag and Jeans Repairing Center, we make it easy and convenient to get your items repaired. Whether it’s a torn bag or a broken zipper, our doorstep service is designed to save you time and hassle.
          </p>
          <p className="text-lg text-gray-700 mb-6 flex items-center">
            <FaHandshake className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mr-4" size={36} />
            Many of you face challenges like traveling to repair shops or not having access to reliable services. That's where we step in, bringing professional repairs to your doorstep.
          </p>
        </div>
      </div>

      {/* Main Content: Row 2 */}
      <div className="w-full p-8  flex justify-center flex-col items-center ">
        <h2 className="text-3xl text-center font-semibold mb-6">
          Our Online Process
        </h2>
        <ul className="list-none  text-gray-700 space-y-6"> 
          {processSteps.map((step, index) => ( 
            <li key={index} className="flex flex-col "> 
            <span className="flex items-center  gap-2">
            {step.icon} 
            <span className="text-lg font-semibold text-red-600">{step.title}
              </span> 
            </span>
              <span className="text-lg ml-12">{step.description}</span> 
              </li> 
            ))} 
          </ul>

        <p className="text-lg  text-gray-700 mt-8 text-left">
          With this seamless process, you can get your repairs done without stepping out of your home.
        </p>
        <div className="text-lg text-gray-700 mt-6 flex items-center">
          <FaTag className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mr-4" size={36} />
          <strong className="text-red-600 mr-2">Our Charges:</strong> Affordable services with a ₹50 additional charge for transportation and convenience.
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleToggleMission}
            className="py-3 px-6 bg-red-600 text-white rounded-md hover:bg-red-700 transition ease-in-out duration-200"
          >
            {showMission ? "Hide More Details" : "Show More Mission"}
          </button>

          {showMission && (
            <div className="mt-6 text-gray-600 text-base">
              <div className="flex justify-center items-center mb-4">
                <FaBullseye className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mr-4" size={36} />
                <h3 className="text-xl font-semibold text-red-600">Our Mission</h3>
              </div>
              <p className="text-xl">
                We aim to simplify repairs by offering reliable, timely, and hassle-free services. From registration to doorstep delivery, we ensure a smooth experience tailored to your convenience.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
