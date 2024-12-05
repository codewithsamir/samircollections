"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa"; // WhatsApp Icon from React Icons
import axios from "axios";

// Define types for user data and order stats
interface User {
  username: string;
  email: string;
  profilePicture?: string;
}

interface OrderStats {
  totalOrders: number;
  inProgress: number;
  totalPaid: number;
}

interface Order {
  orderId: string;
  status: string;
  amount: number;
  date: string;
}

const CustomerDashboard: React.FC = () => {
  // State for order stats, user details, and orders
  const [orderStats, setOrderStats] = useState<OrderStats>({
    totalOrders: 0,
    inProgress: 0,
    totalPaid: 0,
  });
  const [user, setUser] = useState<User | null>(null); // User can be null initially
  const [orders, setOrders] = useState<Order[]>([]); // Orders can be an empty array initially
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user details and order details
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data.data); // Assume response data structure has a 'data' field
      } catch (error) {
        const typedError = error as Error;
        console.error("Error fetching user details:", typedError.message);
      } finally {
        setIsLoading(false);
      }
    };

    // const getOrderStats = async () => {
    //   try {
    //     const response = await axios.get("/api/orders/stats");
    //     setOrderStats(response.data); // Assuming response has order stats
    //   } catch (error) {
    //     console.error("Error fetching order stats:", error);
    //   }
    // };

    // const getOrders = async () => {
    //   try {
    //     const response = await axios.get("/api/orders");
    //     setOrders(response.data.orders); // Assuming response has orders data
    //   } catch (error) {
    //     console.error("Error fetching orders:", error);
    //   }
    // };

    getUserDetails();
    // getOrderStats();
    // getOrders();
  }, []);

  // WhatsApp link with the user's email
  const whatsappLink = `https://wa.me/9824823877?text=Hello, I need assistance. My email is ${user?.email || 'Not provided'}.`;

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state while fetching user data
  }

  return (
    <main className="flex-1 p-5">
      <header className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center">
        <div className="w-12 h-12 mr-4">
          <Image
            src={user?.profilePicture || "/logo.png"} // Use user profile picture if available
            alt="Profile Picture"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.username || "John Doe"}</h1>
          <p className="text-gray-600">Here&rsquo;s an overview of your account.</p>
          <p className="text-gray-600">Email: {user?.email}</p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600">{orderStats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">In Progress</h2>
          <p className="text-3xl font-bold text-yellow-500">{orderStats.inProgress}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Paid</h2>
          <p className="text-3xl font-bold text-green-500">${orderStats.totalPaid}</p>
        </div>
      </section>

      {/* Orders Table */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left text-gray-600">Order ID</th>
                <th className="py-2 px-4 text-left text-gray-600">Status</th>
                <th className="py-2 px-4 text-left text-gray-600">Amount</th>
                <th className="py-2 px-4 text-left text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                    No orders available.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.orderId} className="border-b">
                    <td className="py-2 px-4">{order.orderId}</td>
                    <td className="py-2 px-4">{order.status}</td>
                    <td className="py-2 px-4">${order.amount}</td>
                    <td className="py-2 px-4">{order.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* WhatsApp Button */}
      <div className="mt-8 flex justify-center">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white py-3 px-6 rounded-md flex items-center hover:bg-green-600 transition"
        >
          <FaWhatsapp className="mr-2" size={24} />
          Contact Us on WhatsApp
        </a>
      </div>
    </main>
  );
};

export default CustomerDashboard;
