"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Input from '@/components/Form/Input';

// Define the structure for the cloth detail
interface ClothDetail {
  clothname: string;
  cloth_qty: number;
  clothrepair_price: number;
}

// Define the structure for the order form data
interface OrderFormData {
  customer_id: string;

  cloth_detail: ClothDetail[];
  pickup_date: string;
  status: string;
}

const OrderForm = ({params}:any) => {
  const { orderid }:any =  React.use(params); 
  const customerid = decodeURIComponent(orderid).split("_")[1]
  console.log(customerid)
  const [formData, setFormData] = useState<OrderFormData>({
    customer_id: customerid,

    cloth_detail: [{ clothname: '', cloth_qty:0, clothrepair_price: 0 }],
    pickup_date: '',


    status: 'pending',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClothDetailChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedClothDetail = [...formData.cloth_detail];
    updatedClothDetail[index] = { ...updatedClothDetail[index], [name]: value };
    setFormData((prevState) => ({
      ...prevState,
      cloth_detail: updatedClothDetail,
    }));
  };

  const addClothDetail = () => {
    setFormData((prevState) => ({
      ...prevState,
      cloth_detail: [
        ...prevState.cloth_detail,
        { clothname: '', cloth_qty: 0, clothrepair_price: 0 },
      ],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    
    if (!formData.pickup_date) newErrors.pickup_date = 'Pickup date is required';
   
  
    if (formData.cloth_detail.some(cloth => !cloth.clothname || cloth.cloth_qty <= 0 || cloth.clothrepair_price <= 0)) {
      newErrors.cloth_detail = 'Each cloth must have a valid name, quantity, and repair price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('/api/order/addorder', formData);
      console.log('Order created:', response.data);
      // Optionally, reset the form or redirect the user
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
 <div className="p-10">
     <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4 bg-white shadow-lg rounded-md">
      {/* Customer Info */}



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



    

      {/* Status */}
      <div className="mb-4">
        <Input
          label="Status"
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          error={errors.status}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-700"
        >
          Submit Order
        </button>
      </div>
    </form>
 </div>
  );
};

export default OrderForm;
