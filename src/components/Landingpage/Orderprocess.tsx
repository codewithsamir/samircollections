"use client";
import { processSteps } from '@/utility/process';
import Image from 'next/image';
import { FaTag } from 'react-icons/fa';
import { useState } from 'react';

const Orderprocess = () => {
  const [selectedStep, setSelectedStep] = useState(null);

  const handleStepClick = (index) => {
    setSelectedStep(selectedStep === index ? null : index);
  };

  return (
    <>
      <div className="w-full p-8 flex flex-col items-center">
        <h2 className="text-3xl text-center font-semibold mb-6">Our Online Process</h2>

        <div className="flex justify-center gap-8">
          {/* Left Side: Process Steps */}
          <div className="w-full sm:w-[800px] flex flex-col items-start border-2 border-red-500 p-4">
            <ul className="list-none text-gray-700 space-y-6">
              {processSteps.map((step, index) => (
                <li
                  key={index}
                  className={`flex items-start justify-start w-full p-4 rounded-lg cursor-pointer transition-all duration-300 ${selectedStep === index ? 'bg-blue-100' : 'bg-gray-50'}`}
                  onClick={() => handleStepClick(index)}
                >
                  {/* Step Number and Title */}
                  <div className="flex items-center gap-4 w-full">
                    <span className={`p-3 rounded-full text-white ${index % 2 === 0 ? 'bg-red-500' : 'bg-blue-500'} flex items-center justify-center`}>
                      <span className="text-xl font-bold">{index + 1}</span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-red-600">{step.title}</span>
                      {/* Step Description, hidden by default, shown when clicked */}
                      {selectedStep === index && (
                        <p className="text-md text-gray-600 mt-2">{step.description}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Icon on the Right Side */}
                  <div className="ml-4 flex items-center justify-center">
                    <span className="text-2xl text-gray-600">{step.icon}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Illustrative Image */}
          <div className="border-2 border-red-500 flex justify-center w-full sm:w-[500px]">
            <Image
              src="/orderprocess.png" // Replace with your image URL
              alt="Illustration of our process"
              width={1000}
              height={500}
              className="w-full max-w-md h-[500px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-lg text-gray-700 mt-6 flex items-center justify-center">
          <FaTag className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mr-4" size={36} />
          <strong className="text-red-600 mr-2">Our Charges:</strong>
          Affordable services with a ₹50 additional charge for transportation and convenience.
        </div>
      </div>
    </>
  );
};

export default Orderprocess;
