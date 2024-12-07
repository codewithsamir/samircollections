"use client";
import { processSteps } from '@/utility/process';
import Image from 'next/image';
import { FaTag } from 'react-icons/fa';
import { useState } from 'react';

const Orderprocess = () => {
  


  return (
    <>
      <div className="w-full p-8 flex flex-col items-center">
        <h2 className="text-3xl text-center font-semibold ">Our Online Process</h2>

        <div className="flex justify-center items-center">
          {/* Left Side: Process Steps */}
          <div className="w-full sm:w-[800px] flex flex-col items-center   p-4">
            <ul className="list-none text-gray-700  flex flex-wrap gap-6 justify-between">
              {processSteps.map((step, index) => (
                <li
                style={{ boxShadow: "inset -5px -5px 10px rgba(0,0,0,0.1), 5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(0,0,0,0.1)" }}
                  key={index}
                  className={`w-full  rounded-lg cursor-pointer transition-all duration-300 p-4   sm:w-[360px]`}
               
                >
                  
                 {/* <span className="text-md  ml-20 text-green-500  block">
                 step {index + 1}
                 </span> */}
                   <div className="flex items-start justify-start gap-4 px-4">
                   <span className="text-2xl text-gray-600">{step.icon}</span>
                    <div className="flex flex-col">

                      {/* Step Number and Title */}
                 

                      <span className="text-lg font-semibold text-red-600">{step.title}</span>
                      {/* Step Description, hidden by default, shown when clicked */}
                
                        <p className="text-sm text-gray-600 ">{step.description}</p>
                     
                    </div>
                   </div>
               
                  
                
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Illustrative Image */}
          <div className=" flex justify-center w-full sm:w-[500px]">
            <Image
              src="/orderprocess.png" // Replace with your image URL
              alt="Illustration of our process"
              width={1000}
              height={500}
              className="w-full max-w-md h-[500px] object-cover rounded-lg"
            />
          </div>
        </div>

       
      </div>
    </>
  );
};

export default Orderprocess;
