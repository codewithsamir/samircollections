"use client"
import React from "react";

interface OrderDetail {
  itemName: string;
  serviceType: string;
  status: string;
  price: number;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface Order {
  customer: Customer;
  orderDetails: OrderDetail[];
  totalAmount: number;
  orderDate: string;
  orderId: string;
}

const OrderPage: React.FC = () => {
  const order: Order = {
    customer: {
      name: "Jane Doe",
      email: "janedoe@example.com",
      phone: "+1234567890",
    },
    orderDetails: [
      {
        itemName: "Bag Repair",
        serviceType: "Handle Replacement",
        status: "Completed",
        price: 25,
      },
      {
        itemName: "Jeans Repair",
        serviceType: "Zip Replacement",
        status: "In Progress",
        price: 15,
      },
    ],
    totalAmount: 40,
    orderDate: "2024-12-04",
    orderId: "ORD12345",
  };

  return (
    <div className="px-5 py-10 bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        {/* Order Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
          <p className="text-sm text-gray-600 mt-1">
            Order ID: <span className="font-semibold">{order.orderId}</span>
          </p>
          <p className="text-sm text-gray-600">
            Order Date: <span className="font-semibold">{order.orderDate}</span>
          </p>
        </div>

        {/* Customer Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Customer Info</h2>
          <div className="mt-2 text-gray-600">
            <p>Name: {order.customer.name}</p>
            <p>Email: {order.customer.email}</p>
            <p>Phone: {order.customer.phone}</p>
          </div>
        </div>

        {/* Order Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Items Ordered</h2>
          <div className="mt-2 space-y-4">
            {order.orderDetails.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <p className="text-sm text-gray-800">
                  <strong>Item:</strong> {item.itemName}
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Service:</strong> {item.serviceType}
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      item.status === "Completed"
                        ? "text-green-600 font-medium"
                        : "text-yellow-600 font-medium"
                    }
                  >
                    {item.status}
                  </span>
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Price:</strong> ${item.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
          <p className="text-sm text-gray-800">
            <strong>Total Amount:</strong> ${order.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
