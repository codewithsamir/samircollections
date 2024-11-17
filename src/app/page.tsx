import React from 'react';

import ServiceCard from '@/components/Landingpage/Servicecard'
import { FaHome } from 'react-icons/fa';

import Image from 'next/image';
import Mapsection from '@/components/Landingpage/Mapsection';


const services = [
  { title: 'Jean Repair', description: 'Quality jean repairs and alterations.', imageSrc: 'https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amVhbnN8ZW58MHx8MHx8fDA%3D' },
  { title: 'Bag Repair', description: 'Repair and revamp your favorite bags.', imageSrc: 'https://images.unsplash.com/photo-1472717400230-1c592a3179d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNjaG9vbCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D' },
  { title: 'Jacket Fitting', description: 'Custom jacket fitting for style and comfort.', imageSrc: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGphY2tldHxlbnwwfHwwfHx8MA%3D%3D' },
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
        <section className="  lg:w-full   relative h-[400px]  ">
          <div className='w-full h-full  '>
            <Image src="/jacket-repairing-and-fitting.png" alt="tailor" width={500} height={1000}  className='w-full h-full object-cover object-center'/>
          </div>
          <div className="bg w-full h-full bg-[#f5b92010] z-10 absolute top-0 left-0"></div>
         {/* <div className="z-20">
         <h2 className="text-4xl font-extrabold text-white">Welcome to Samir Bag and Jean Repairing Center</h2>
          <p className="text-xl mt-4 text-white">
            Your one-stop shop for high-quality clothing repair, fitting, and customization services.
          </p>
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Contact Us
          </button>

         </div> */}
        </section>

          

        {/* Highlighted Services */}
        <section className="mt-5">
          <h3 className="text-3xl font-semibold text-white text-center ">Our Popular Services</h3>
          <div className="flex flex-wrap gap-5 justify-center mt-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </section>

      {/* Home Pickup Service */}
      <section className="my-10 bg-yellow-100 p-6 rounded-lg shadow-md text-center">
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
