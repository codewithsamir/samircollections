import React from 'react';

import ServiceCard from '@/components/Landingpage/Servicecard'
import { FaHome } from 'react-icons/fa';
import Link from 'next/link';


const services = [
  { title: 'Jean Repair', description: 'Quality jean repairs and alterations.', imageSrc: 'https://source.unsplash.com/400x300/?jeans,repair' },
  { title: 'Bag Repair', description: 'Repair and revamp your favorite bags.', imageSrc: 'https://source.unsplash.com/400x300/?bag,repair' },
  { title: 'Jacket Fitting', description: 'Custom jacket fitting for style and comfort.', imageSrc: 'https://source.unsplash.com/400x300/?jacket' },
];

const Home: React.FC = () => {
  return (
    <>

      <main className="container mx-auto py-10 px-6">
        {/* Hero Section */}
        <section className="text-center py-10 bg-blue-100 rounded-lg shadow-md">
          <h2 className="text-3xl font-extrabold text-gray-800">Welcome to Samir Bag and Jean Repairing Center</h2>
          <p className="text-lg mt-4 text-gray-600">
            Your one-stop shop for high-quality clothing repair, fitting, and customization services.
          </p>
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Contact Us
          </button>
        </section>

           {/* Home Pickup Service */}
           <section className="mt-10 bg-yellow-100 p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center items-center mb-4">
            <FaHome className="text-yellow-600 text-4xl mr-2" />
            <h3 className="text-2xl font-semibold text-gray-800">Home Pickup Service</h3>
          </div>
          <p className="text-gray-600 mt-4">
            Connect with us through our contact form, and we’ll come to your home to pick up your items for repair. Enjoy the convenience of our doorstep service for your repair and fitting needs!
          </p>
          <Link href="/pickup-request">
            <button className="mt-6 px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
              Request Pickup
            </button>
          </Link>
        </section>

        {/* Highlighted Services */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800">Our Popular Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </section>

     

        {/* Future Categories */}
        <section className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800">More Categories Coming Soon!</h3>
          <p className="text-gray-600 mt-4">
            Stay tuned as we expand our services to include more types of repairs and fittings, including belts, wallets, and more.
          </p>
        </section>
      </main>
    
    </>
  );
};

export default Home;
