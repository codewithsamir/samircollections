"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  isVerified: boolean;
}

interface OrderStats {
  totalOrders: number;
  inProgress: number;
  totalPaid: number;
}

interface Order {
  _id: string;
  status: string;
  total_price: number;
  pickup_date: string;
}

const CustomerDashboard: React.FC = () => {
  const [orderStats, setOrderStats] = useState<OrderStats>({
    totalOrders: 0,
    inProgress: 0,
    totalPaid: 0,
  });
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch user details
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");
        const userData: User = response.data.data;
        setUser(userData);

        if (!userData.isVerified) {
          toast.error("Please verify your account.", {
            position: "top-right",
          });
        }
      } catch (error) {
        const typedError = error as Error;
        console.error("Error fetching user details:", typedError.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserDetails();
  }, []);

  // Fetch order statistics and orders
  useEffect(() => {
    const getOrderStatsAndOrders = async () => {
      try {
        if (user) {
          const orderStatsResponse = await axios.post("/api/order/showorder", {
            id: user._id,
          });

          console.log(orderStatsResponse.data.data)
         
          // Ensure fetchedOrders is an array before setting it to state
          setOrders(orderStatsResponse.data.data);
        }
      } catch (error) {
        const typedError = error as Error;
        console.error("Error fetching order details:", typedError.message);
      }
    };

    if (user) {
      getOrderStatsAndOrders();
    }
  }, [user]);

  const logoutHandle = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success", {
        position: "top-right",
        richColors: true,
      });
      router.push("/");
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message, {
        position: "top-right",
        richColors: true,
      });
    }
  };

  const whatsappLink = `https://wa.me/9824823877?text=Hello, My email is ${user?.email || "Not provided"}.`;

  if (isLoading) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </motion.div>
    );
  }

  if (user && !user.isVerified) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-md">
      <h2 className="font-semibold text-lg">Account Verification Required</h2>
      <p className="mt-2">Please verify your account to access the dashboard. If you haven’t received the email, be sure to check your inbox and spam folder.</p>
      <div className="mt-4">
        <button
          onClick={async () => {
            toast.success("Verification email resent!");
          }}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Resend Verification Email
        </button>
      </div>
      <div className="mt-4 text-sm text-yellow-800">
        <p>If you still haven’t received the email, make sure to check your spam or junk folder.</p>
        <p className="font-semibold">Once verified, you will be granted access to the dashboard.</p>
      </div>
    </div>
    
    );
  }

  return (
    <main className="flex-1 p-5">
      <header className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-center sm:justify-between flex-wrap gap-3">
        <div className="left flex items-center gap-2 flex-wrap justify-center">
          <div className="w-12 h-12 mr-4">
            <Image
              src={user?.profilePicture || "/user.png"}
              alt="Profile Picture"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Welcome, {user?.username || "new user"}
            </h1>
            <p className="text-gray-600">Email: {user?.email}</p>
          </div>
        </div>
        <div className="right">
          <div className="flex justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white text-sm sm:text-lg py-3 px-6 rounded-md flex items-center hover:bg-green-600 transition"
            >
              <FaWhatsapp className="mr-2" size={24} />
              Contact Us on WhatsApp
            </a>
          </div>
        </div>
      </header>

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
          <p className="text-3xl font-bold text-green-500">Rs.{orderStats.totalPaid}</p>
        </div>
      </section>

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
              {orders && orders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                    No orders available.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="py-2 px-4">{order._id}</td>
                    <td className="py-2 px-4">{order.status}</td>
                    <td className="py-2 px-4">Rs.{order.total_price}</td>
                    <td className="py-2 px-4">
                      {new Date(order.pickup_date).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <button
        onClick={logoutHandle}
        className="w-full block sm:hidden px-4 py-2 text-lg mt-5 rounded-md text-white bg-red-500 hover:bg-red-800 transition"
      >
        Logout
      </button>
    </main>
  );
};

export default CustomerDashboard;
