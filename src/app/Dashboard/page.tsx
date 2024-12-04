"use client"
import React from "react";

import Image from "next/image";





const CustomerDashboard: React.FC = () => {
  

  
  return (


  
      <main className="flex-1 p-5">
        <header className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center">
          <div className="w-12 h-12 mr-4">
            <Image
              src="/logo.png"
              alt="Profile Picture"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, John Doe</h1>
            <p className="text-gray-600">Here&apos;s an overview of your account.</p>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
            <p className="text-3xl font-bold text-blue-600">15</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">In Progress</h2>
            <p className="text-3xl font-bold text-yellow-500">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Total Paid</h2>
            <p className="text-3xl font-bold text-green-500">$1,200</p>
          </div>
        </section>
      </main>
 
  );
};

export default CustomerDashboard;
