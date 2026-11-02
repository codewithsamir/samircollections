// utils/processSteps.js

import { FaMobileAlt, FaTools, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';

export const processSteps = [
  {
    icon: <FaMobileAlt className="text-brand bg-brand-light/30 border border-brand/20 rounded-full p-2 mb-2" size={36} />,
    title: 'WhatsApp Contact',
    description: 'Message us on WhatsApp to tell us about the repair you need.',
  },
  {
    icon: <FaMapMarkerAlt className="text-brand bg-brand-light/30 border border-brand/20 rounded-full p-2 mb-2" size={36} />,
    title: 'Share Details',
    description: 'Share your live location and photos of the items directly in the chat.',
  },
  {
    icon: <FaTruck className="text-brand bg-brand-light/30 border border-brand/20 rounded-full p-2 mb-2" size={36} />,
    title: 'We Collect',
    description: 'Our team will come to your location and pick up your items.',
  },
  {
    icon: <FaTools className="text-brand bg-brand-light/30 border border-brand/20 rounded-full p-2 mb-2" size={36} />,
    title: 'Repair & Return',
    description: 'We professionally repair your items and deliver them back to you quickly.',
  },
];
