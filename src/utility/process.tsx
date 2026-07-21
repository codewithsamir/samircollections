// utils/processSteps.js

import { FaUserPlus, FaMobileAlt, FaClipboardList, FaTruck, FaMapMarkerAlt, FaToolbox } from 'react-icons/fa';

export const processSteps = [
  {
    icon: <FaMobileAlt className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'Message on WhatsApp',
    description: 'Send your repair request directly on WhatsApp without signing in.',
  },
  {
    icon: <FaClipboardList className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'Confirm Repair Details',
    description: 'Share the item details, pickup location, and the service you need.',
  },
  {
    icon: <FaMapMarkerAlt className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'Leave Your Items',
    description: 'Drop off your items or let us collect them from your place.',
  },
  {
    icon: <FaToolbox className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'We Repair It',
    description: 'Our skilled team fixes your bag, jeans, or jacket with care.',
  },
  {
    icon: <FaTruck className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'Pickup & Delivery ₹100',
    description: 'A flat service charge of ₹100 covers safe pickup and delivery.',
  },
];
