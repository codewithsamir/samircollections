"use client";
import Image from "next/image";
import { useState } from "react";

export default function AboutUs() {
  const [showMission, setShowMission] = useState(false);

  const handleToggleMission = () => {
    setShowMission(!showMission);
  };

  return (
   
      <section className="py-10 bg-gray-100">
        {/* Title */}
        <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          About Us - Samir Bag and Jeans Preparing Center
        </h1>
          <p className="text-gray-600 mt-2 text-xl">
            Learn more about why we started and how we make your life easier.
          </p>
        </div>

        {/* Main Content */}
        <div className=" p-8  flex flex-col md:flex-row justify-center gap-10">
          {/* Left side: Image */}
          <div className="w-full sm:w-[600px] mb-6 md:mb-0">
            <Image
              src="/samirbagandjeanrepairingcenter.png" // Replace with your image URL
              alt="Samir Bag and Jeans"
              width={400}
              height={400}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Right side: Content */}
          <div className="w-full sm:w-[600px] md:w-[700px] md:pl-8">
  <p className="text-lg text-gray-700 mb-4">
    At Samir Bag and Jeans Repairing Center, we make it easy and convenient to get your items repaired. Whether it’s a torn bag or a broken zipper, our doorstep service is designed to save you time and hassle.
  </p>
  <p className="text-lg text-gray-700 mb-4">
    Many of you face challenges like traveling to repair shops or not having access to reliable services. That's where we step in, bringing professional repairs to your doorstep.
  </p>

  <h2 className="text-2xl font-semibold mb-4">Our Online Process</h2>
  <p className="text-lg text-gray-700 mb-4">
    Follow these simple steps to get started:
    </p>
    <ol className="list-decimal ml-5 mt-2 text-gray-700">
      <li>
        <strong>Register:</strong> Create an account on our website.
      </li>
      <li>
        <strong>Dashboard Access:</strong> After registering, log in to your dashboard, where you'll find our WhatsApp contact number.
      </li>
      <li>
        <strong>WhatsApp Contact:</strong> Send your registered email or username to our WhatsApp number for verification.
      </li>
      <li>
        <strong>Place an Order:</strong> Send us the details of the repair you need directly on WhatsApp.
      </li>
      <li>
        <strong>Live Location:</strong> Share your live location via WhatsApp for pickup.
      </li>
      <li>
        <strong>Pickup & Repair:</strong> We’ll come to you, pick up your item, repair it, and deliver it back to you.
      </li>
    </ol>

    <p className="text-lg text-gray-700 my-4">
  With this seamless process, you can get your repairs done without stepping out of your home.  
  <strong>Our Charges:</strong> We offer affordable services, and you will receive a cost estimate after assessing the repair requirements. Please note, an additional charge of ₹50 applies for transportation and convenience.
</p>

  <div className="mt-6 text-center">
    <button
      onClick={handleToggleMission}
      className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
    >
      {showMission ? "Hide More Details" : "Show More Mission"}
    </button>

    {showMission && (
      <div className="mt-4 text-gray-600 text-base">
        <p>
          We aim to simplify repairs by offering reliable, timely, and hassle-free services. From registration to doorstep delivery, we ensure a smooth experience tailored to your convenience.
        </p>
      </div>
    )}
  </div>
</div>



        </div>
      </section>


 
  );
}
