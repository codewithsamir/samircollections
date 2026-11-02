"use client";

import React, { useState } from 'react';

interface ContactFormProps {
  isRepairBooking?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isRepairBooking = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    itemType: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use WhatsApp API for form submission for immediate engagement
    let text = `Name: ${formData.name}\nPhone: ${formData.phone}\n`;
    if (isRepairBooking) {
      text += `Item Type: ${formData.itemType}\n`;
      text += `Repair Details: ${formData.message}`;
    } else {
      text += `Message: ${formData.message}`;
    }
    
    window.open(`https://wa.me/9779824823877?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {isRepairBooking ? 'Book a Repair Service' : 'Send us a Message'}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
            placeholder="+977 XXXXXXXXXX"
          />
        </div>

        {isRepairBooking && (
          <div>
            <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-1">Item to Repair</label>
            <select
              id="itemType"
              name="itemType"
              required
              value={formData.itemType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all bg-white"
            >
              <option value="">Select Item Type</option>
              <option value="Jeans/Pants">Jeans/Pants</option>
              <option value="Jacket">Jacket</option>
              <option value="Bag">Bag/Luggage</option>
              <option value="Kurti/Surwal">Kurti/Surwal</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {isRepairBooking ? 'Issue Description' : 'Message'}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all resize-none"
            placeholder={isRepairBooking ? "E.g., Broken zipper, torn seam..." : "How can we help you?"}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-brand text-white font-semibold py-3 px-6 rounded-lg hover:bg-brand-dark transition-colors mt-4"
        >
          {isRepairBooking ? 'Submit Repair Request via WhatsApp' : 'Send Message via WhatsApp'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
