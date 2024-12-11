import React from 'react';

const TermAndCondition = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-6">
      <div className="bg-white shadow-md rounded-lg max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h1>
        
        <p className="text-gray-700 mb-4">
          Welcome to our Clothing Repair Service. Please carefully read the terms and conditions below before placing an order.
        </p>
        
        <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Pickup and Delivery Policies</h2>
        <p className="text-gray-700 mb-4">
          We offer free pick-up and delivery for clothing repairs within **Janakpur city**. For locations outside Janakpur, a service charge of <strong>₹100</strong> will apply.  
          Additionally, if your address is more than 5 km away from our service center, a charge of <strong>₹100</strong> per order will be applied.
          You will be contacted to arrange the pickup and confirm your order details. Please ensure that you are available at the arranged time and place for pickup.
        </p>
        
        <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Repair Limitations</h2>
        <p className="text-gray-700 mb-4">
          Our team will evaluate your clothing items to determine if they are eligible for repair. In cases where the repair may not meet quality standards or is 
          deemed unfeasible, we will inform you before proceeding. We do our best to restore items to their original condition, but results may vary based on the 
          item’s material and condition.
        </p>
        
        <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Order Confirmation</h2>
        <p className="text-gray-700 mb-4">
          By submitting the service request form, you confirm that you are placing an official order for our clothing repair services. After submission, our team will 
          contact you to arrange the pickup, confirm repair details, and answer any additional questions you may have.
        </p>
        
        <p className="text-gray-700 mt-6">
          Thank you for choosing our service. We look forward to serving you with convenient pick-up and delivery options!
        </p>
      </div>
    </div>
  );
}

export default TermAndCondition;
