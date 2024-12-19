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
  const { orderid }: any = React.use(params);
  const customerid = decodeURIComponent(orderid).split("_")[1];

  const [formData, setFormData] = useState<OrderFormData | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Fetch the existing order data
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`/api/order/${orderid}`);
        setFormData(response.data);
      } catch (error: any) {
        toast.error("Failed to fetch the order details. Please try again.", {
          richColors: true,
        });
      }
    };

    fetchOrderData();
  }, [orderid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) =>
      prevState ? { ...prevState, [name]: value } : null
    );
  };

  const handleClothDetailChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      const updatedClothDetail = [...formData.cloth_detail];
      updatedClothDetail[index] = { ...updatedClothDetail[index], [name]: value };
      setFormData({ ...formData, cloth_detail: updatedClothDetail });
    }
  };

  const addClothDetail = () => {
    if (formData) {
      setFormData({
        ...formData,
        cloth_detail: [
          ...formData.cloth_detail,
          { clothname: "", cloth_detail: "", cloth_qty: 0, clothrepair_price: 0 },
        ],
      });
    }
  };

  const validateForm = (): boolean => {
    if (!formData) return false;

    const newErrors: { [key: string]: string } = {};

    if (!formData.pickup_date) newErrors.pickup_date = "Pickup date is required";
    if (!formData.delivery_date) newErrors.delivery_date = "Delivery date is required";

    if (
      formData.cloth_detail.some(
        (cloth) =>
          !cloth.clothname ||
          !cloth.cloth_detail ||
          cloth.cloth_qty <= 0 ||
          cloth.clothrepair_price <= 0
      )
    ) {
      newErrors.cloth_detail =
        "Each cloth must have a valid name, detail, quantity, and repair price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(`/api/order/updateorder/${orderid}`, formData);
      toast.success("Order updated successfully!", {
        richColors: true,
      });
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
                error={errors.cloth_detail}
              />
              <Input
                label="Cloth Detail"
                type="text"
                name="cloth_detail"
                value={cloth.cloth_detail}
                onChange={(e) => handleClothDetailChange(index, e)}
                error={errors.cloth_detail}
              />
              <Input
                label="Cloth Quantity"
                type="number"
                name="cloth_qty"
                value={cloth.cloth_qty}
                onChange={(e) => handleClothDetailChange(index, e)}
                error={errors.cloth_detail}
              />
              <Input
                label="Cloth Repair Price"
                type="number"
                name="clothrepair_price"
                value={cloth.clothrepair_price}
                onChange={(e) => handleClothDetailChange(index, e)}
                error={errors.cloth_detail}
              />
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
            error={errors.pickup_date}
          />
        </div>

        {/* Delivery Date */}
        <div className="mb-4">
          <Input
            label="Delivery Date"
            type="date"
            name="delivery_date"
            value={formData.delivery_date}
            onChange={handleChange}
            error={errors.delivery_date}
          />
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
