"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const Dashboard = () => {
 
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalOrders: 0,
    revenue: 0,
  });



  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
  

    
   
       

        {/* Main Content Area */}
        <div className="flex-1 p-8">
        

          {/* Analytics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{analytics.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Total Customers</h3>
              <p className="text-3xl font-bold text-green-600">{analytics.totalCustomers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Total Orders</h3>
              <p className="text-3xl font-bold text-purple-600">{analytics.totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Total Revenue</h3>
              <p className="text-3xl font-bold text-red-600">${analytics.revenue.toLocaleString()}</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-4">
                <p className="text-gray-800 font-medium">User John Doe registered as a customer.</p>
                <p className="text-gray-600 text-sm">2 hours ago</p>
              </li>
              <li className="py-4">
                <p className="text-gray-800 font-medium">Order #12345 was placed by Jane Doe.</p>
                <p className="text-gray-600 text-sm">4 hours ago</p>
              </li>
              <li className="py-4">
                <p className="text-gray-800 font-medium">Revenue increased by $500.</p>
                <p className="text-gray-600 text-sm">Today</p>
              </li>
            </ul>
          </div>
        </div>
      

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; 2024 Admin Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
