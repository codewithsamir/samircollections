"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@/components/Form/Input";
import { toast } from "sonner";

// Define the structure for the cloth detail
interface ClothDetail {
  clothname: string;
  cloth_detail: string;
  cloth_qty: number;
  clothrepair_price: number;
}

// Define the structure for the order form data
interface OrderFormData {
  customer_id: string;
  cloth_detail: ClothDetail[];
  pickup_date: string;
  delivery_date: string;
  status: string;
}

const UpdateOrderForm = ({ params }: any) => {
  const { orderid } = params;  // Corrected the destructuring
  const customerid = decodeURIComponent(orderid).split("_")[1];

  const [formData, setFormData] = useState<OrderFormData | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    // Fetch the existing order data
    const fetchOrderData = async () => {
      try {
        const response = await axios.post(`/api/order/showorder`, { orderid:customerid });
        setFormData(response.data);
      } catch (error: any) {
        console.log(error.messages)
        toast.error("Failed to fetch the order details. Please try again.", {
          richColors: true,
        });
      }
    };

    fetchOrderData();
  }, [orderid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => prevState ? { ...prevState, [name]: value } : null);
  };

  const handleClothDetailChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      const updatedClothDetail = [...formData.cloth_detail];
      updatedClothDetail[index] = { ...updatedClothDetail[index], [name]: value };
      setFormData((prevState) => prevState ? { ...prevState, cloth_detail: updatedClothDetail } : null);
    }
  };

  const addClothDetail = () => {
    if (formData) {
      setFormData((prevState) => prevState ? {
        ...prevState,
        cloth_detail: [
          ...prevState.cloth_detail,
          { clothname: "", cloth_detail: "", cloth_qty: 0, clothrepair_price: 0 },
        ],
      } : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/order/updateorder/${customerid}`, formData);
      if (response.data.errors) {
        // Set backend errors
        setErrors(response.data.errors);
        // Show error messages from the backend
        let errorMessages = "";
        Object.values(response.data.errors).forEach((error: any) => {
          errorMessages += error + " ";
        });
        toast.error(errorMessages.trim(), { richColors: true });
      } else {
        toast.success("Order updated successfully!", {
          richColors: true,
        });
      }
    } catch (error: any) {
      toast.error("Failed to update the order. Please try again.", {
        richColors: true,
      });
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg mx-auto p-4 bg-white shadow-lg rounded-md"
      >
        {/* Cloth Details */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Cloth Details</h3>
          {formData.cloth_detail.map((cloth, index) => (
            <div key={index} className="space-y-2 mb-3">
              <Input
                label="Cloth Name"
                type="text"
                name="clothname"
                value={cloth.clothname}
                onChange={(e) => handleClothDetailChange(index, e)}
              />
              {errors?.cloth_detail?.[index]?.clothname && (
                <p className="text-red-600 text-sm">{errors.cloth_detail[index].clothname}</p>
              )}
              <Input
                label="Cloth Detail"
                type="text"
                name="cloth_detail"
                value={cloth.cloth_detail}
                onChange={(e) => handleClothDetailChange(index, e)}
              />
              {errors?.cloth_detail?.[index]?.cloth_detail && (
                <p className="text-red-600 text-sm">{errors.cloth_detail[index].cloth_detail}</p>
              )}
              <Input
                label="Cloth Quantity"
                type="number"
                name="cloth_qty"
                value={cloth.cloth_qty}
                onChange={(e) => handleClothDetailChange(index, e)}
              />
              {errors?.cloth_detail?.[index]?.cloth_qty && (
                <p className="text-red-600 text-sm">{errors.cloth_detail[index].cloth_qty}</p>
              )}
              <Input
                label="Cloth Repair Price"
                type="number"
                name="clothrepair_price"
                value={cloth.clothrepair_price}
                onChange={(e) => handleClothDetailChange(index, e)}
              />
              {errors?.cloth_detail?.[index]?.clothrepair_price && (
                <p className="text-red-600 text-sm">{errors.cloth_detail[index].clothrepair_price}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addClothDetail}
            className="text-blue-600 hover:text-blue-800"
          >
            Add Another Cloth
          </button>
        </div>

        {/* Pickup Date */}
        <div className="mb-4">
          <Input
            label="Pickup Date"
            type="date"
            name="pickup_date"
            value={formData.pickup_date}
            onChange={handleChange}
          />
          {errors?.pickup_date && (
            <p className="text-red-600 text-sm">{errors.pickup_date}</p>
          )}
        </div>

        {/* Delivery Date */}
        <div className="mb-4">
          <Input
            label="Delivery Date"
            type="date"
            name="delivery_date"
            value={formData.delivery_date}
            onChange={handleChange}
          />
          {errors?.delivery_date && (
            <p className="text-red-600 text-sm">{errors.delivery_date}</p>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
          </select>
          {errors?.status && (
            <p className="text-red-600 text-sm">{errors.status}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-700"
          >
            Update Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrderForm;
