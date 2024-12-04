// utils/processSteps.js

import { FaUserPlus, FaMobileAlt, FaClipboardList, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';

export const processSteps = [
  {
    icon: <FaUserPlus className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'Register',
    description: 'Create an account on our website.',
  },
  {
    icon: <FaClipboardList className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'Dashboard Access',
    description: 'Log in to your dashboard to find our WhatsApp contact number.',
  },
  {
    icon: <FaMobileAlt className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'WhatsApp Contact',
    description: 'Send your registered email or username to our WhatsApp number for verification.',
  },
  {
    icon: <FaClipboardList className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'Place an Order',
    description: 'Tell us about the repair you need directly on WhatsApp.',
  },
  {
    icon: <FaMapMarkerAlt className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'Live Location',
    description: 'Share your live location via WhatsApp for pickup.',
  },
  {
    icon: <FaTruck className="text-red-600 bg-white border border-gray-300 rounded-full p-2 mb-2" size={36} />,
    title: 'Pickup & Repair',
    description: 'We’ll come to you, pick up your item, repair it, and deliver it back.',
  },
];
