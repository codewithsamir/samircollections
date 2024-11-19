import React from 'react';

import ServiceCard from '@/components/Landingpage/Servicecard'
import { FaHome } from 'react-icons/fa';


import Mapsection from '@/components/Landingpage/Mapsection';
import Herosection from '@/components/Herosection';
import ServiceSteps from '@/components/Landingpage/ServiceSteps';



const services = [
  { title: 'Jean Repair', description: 'Quality jean repairs and alterations. Expert stitching and patching for a seamless look. From hems to waist adjustments, we tailor your jeans to perfection.', imageSrc: 'https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amVhbnN8ZW58MHx8MHx8fDA%3D' },
  { title: 'Bag Repair', description: 'Quality jean repairs and alterations. Expert stitching and patching for a seamless look. Repair and revamp your favorite bags here, restoring them to like-new condition.', imageSrc: 'https://images.unsplash.com/photo-1472717400230-1c592a3179d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNjaG9vbCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D' },
  { title: 'Jacket Fitting', description: 'Custom jacket fitting and repairing for style and comfort. Tailored adjustments and expert repairs to restore your jacket to its perfect fit and condition.', imageSrc: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGphY2tldHxlbnwwfHwwfHx8MA%3D%3D' },
  {
    title: 'Kurti Surwal',
    description: 'Expert repair and fitting services for your Kurti and Surwal, ensuring perfect style and comfort.',
    imageSrc: 'https://images.pexels.com/photos/28512787/pexels-photo-28512787/free-photo-of-elegant-woman-in-chikankari-kurti-in-lucknow.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const Home: React.FC = () => {
  return (
 

      <main className=" w-full ">
         
        {/* Hero Section */}
  <Herosection />

          

        {/* Highlighted Services */}
        <section className="mt-5 py-2">
          <h3 className="text-4xl font-semibold  text-center py-4 ">Our Popular Services</h3>
          <div className="flex flex-wrap gap-5 justify-center mt-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </section>

        {/* Service Steps how we works  */}

        <div className="container mx-auto pt-16 pb-16 px-8">
  <h1 className="text-4xl font-bold text-center mb-10">How We Work</h1>
  <ServiceSteps />
</div>


      {/* Home Pickup Service */}
      <section className="my-10 bg-orange-100 p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center items-center mb-4">
            <FaHome className="text-yellow-600 text-4xl mr-2" />
            <h3 className="text-2xl font-semibold text-gray-800">Home Pickup Service</h3>
          </div>
          <p className="text-gray-600 mt-4">
            Connect with us through our contact form, and we’ll come to your home to pick up your items for repair. Enjoy the convenience of our doorstep service for your repair and fitting needs!
          </p>
          <a href="https://forms.gle/9dTFDHp4HL27ozry8">
            <button className="mt-6 px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
              Request Pickup
            </button>
          </a>
        </section>

 <Mapsection />
      </main>
    

  );
};

export default Home;
