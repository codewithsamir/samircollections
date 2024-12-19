"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ClothDetail {
  clothname: string;
  cloth_qty: number;
  clothrepair_price: number;
}

interface Order {
  _id: string;
  customer_id: string;
  cloth_total_quantity: number;
  cloth_detail: ClothDetail[];
  pickup_date: string | null;
  delivery_date: string | null;
  discount: number;
  total_price: number;
  status: string;
}

const OrdersPage = ({ params }: any) => {
  const { checkorderid }: any = React.use(params);
const router = useRouter()
  const customerId = decodeURIComponent(checkorderid).split("_")[1];
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("/api/order/showorder", { id: customerId });
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
        // console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setStatusFilter(status);
    applyFilters(status, startDate, endDate);
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end"
  ) => {
    const value = e.target.value;
    if (type === "start") setStartDate(value);
    else setEndDate(value);

    applyFilters(statusFilter, type === "start" ? value : startDate, type === "end" ? value : endDate);
  };

  const applyFilters = (status: string, start: string, end: string) => {
    let filtered = [...orders];

    if (status) {
      filtered = filtered.filter((order) => order.status === status);
    }

    if (start) {
      const startDate = new Date(start);
      filtered = filtered.filter((order) => order.pickup_date && new Date(order.pickup_date) >= startDate);
    }

    if (end) {
      const endDate = new Date(end);
      filtered = filtered.filter((order) => order.delivery_date && new Date(order.delivery_date) <= endDate);
    }

    setFilteredOrders(filtered);
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="mr-2 font-semibold">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="border p-2 rounded w-full"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e, "start")}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="mr-2 font-semibold">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(e, "end")}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* Orders Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">Total Cloths</th>
            <th className="border border-gray-300 p-2">Total Price</th>
            <th className="border border-gray-300 p-2">Pickup Date</th>
            <th className="border border-gray-300 p-2">Delivery Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders?.map((order, index) => (
            <React.Fragment key={order._id}>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{order._id}</td>
                <td className="border border-gray-300 p-2">{order.cloth_total_quantity}</td>
                <td className="border border-gray-300 p-2">Rs.{order.total_price}</td>
                <td className="border border-gray-300 p-2">
                  {order.pickup_date ? new Date(order.pickup_date).toLocaleDateString() : "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : "not delivered"}
                </td>
                <td className="border border-gray-300 p-2 capitalize">{order.status}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => router.push(`/Admin/Dashboard/Users/updateorder/${order._id}`)}
                  >
                    Update Order
                  </button>
                </td>
              </tr>

              {/* Cloth Details Row */}
              <tr className="bg-gray-50">
                <td colSpan={8}>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Cloth Name</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cloth_detail.map((cloth, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">{cloth.clothname}</td>
                          <td className="border border-gray-300 p-2">{cloth.cloth_qty}</td>
                          <td className="border border-gray-300 p-2">Rs.{cloth.clothrepair_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>

              {/* Spacer Between Orders */}
              <tr>
                <td colSpan={8} className="h-4"></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
  