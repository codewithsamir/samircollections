"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const customerId = decodeURIComponent(checkorderid).split("_")[1];
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("/api/order/showorder", { id: customerId });
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setStatusFilter(status);

    if (status) {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>

      {/* Filter Orders */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
        </select>
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
                    onClick={() => (window.location.href = `/order/update/${order._id}`)}
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
