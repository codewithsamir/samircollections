"use client";
import { processSteps } from "@/utility/process";
import Image from "next/image";
import Link from "next/link";

const Orderprocess = () => {
  return (
    <>
      <div className="w-full p-8 flex flex-col items-center">
        <h2 className="text-3xl text-center font-semibold ">Our Online Process</h2>

        <div className="flex justify-center items-center flex-wrap-reverse">
          {/* Left Side: Process Steps */}
          <div className="w-full sm:w-[800px] flex flex-col items-center p-4">
            <ul className="list-none text-gray-700 flex flex-wrap gap-6 justify-between">
              {processSteps.map((step, index) => (
                <li
                  key={index} // Unique key prop added here
                  style={{
                    boxShadow:
                      "inset -5px -5px 10px rgba(0,0,0,0.1), 5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(0,0,0,0.1)",
                  }}
                  className="w-full relative rounded-lg cursor-pointer transition-all duration-300 p-4 sm:w-[360px]"
                >
                  {index === 0 ? (
                    <Link href="/login">
                      <div>
                        <span className="absolute top-[-20px] w-[30px] h-[30px] bg-red-500 rounded-full text-white flex justify-center items-center text-sm">
                          {index + 1}
                        </span>
                        <div className="flex items-start justify-start gap-4 px-4">
                          <span className="text-2xl text-gray-600">{step.icon}</span>
                          <div className="flex flex-col">
                            <span className="text-lg font-semibold text-red-600">
                              {step.title}
                            </span>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div>
                      <span className="absolute top-[-20px] w-[30px] h-[30px] bg-red-500 rounded-full text-white flex justify-center items-center text-sm">
                        {index + 1}
                      </span>
                      <div className="flex items-start justify-start gap-4 px-4">
                        <span className="text-2xl text-gray-600">{step.icon}</span>
                        <div className="flex flex-col">
                          <span className="text-lg font-semibold text-red-600">
                            {step.title}
                          </span>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Illustrative Image */}
          <div className="flex justify-center w-full sm:w-[500px]">
            <Image
              src="/orderprocess.png" // Replace with your image URL
              alt="Illustration of our process"
              width={1000}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderprocess;
