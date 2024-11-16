
import React from 'react';

const TermAndCondition = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h1>
        
        <p className="text-gray-700 mb-4">
          Welcome to our Clothing Repair Service. Please carefully read the terms and conditions below before placing an order.
        </p>
        
        <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Pickup and Delivery Policies</h2>
        <p className="text-gray-700 mb-4">
          Our service includes the option to pick up clothing items from your location. You will be contacted to arrange the pickup and confirm your order details. 
          Please ensure that you are available at the arranged time and place for pickup.
        </p>
        
        <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Service Fees</h2>
        <p className="text-gray-700 mb-4">
          In addition to the repair fees, a service fee of <strong>₹50</strong> is applied for pickup and delivery. This fee is added to the total amount and is 
          non-refundable. Repair charges vary based on the type and complexity of the repairs requested.
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
          Thank you for choosing our service. We look forward to serving you!
        </p>
      </div>
    </div>
  );
}

export default TermAndCondition;
