import React from 'react';

import ServiceCard from '@/components/Landingpage/Servicecard'



import Mapsection from '@/components/Landingpage/Mapsection';
import Herosection from '@/components/Herosection';
import ServiceSteps from '@/components/Landingpage/ServiceSteps';
import AboutUs from '@/components/Landingpage/Aboutus';
import Orderprocess from '@/components/Landingpage/Orderprocess';
import Image from 'next/image';




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
 

      <main className=" w-full h-full ">
      
        {/* Hero Section */}
  <Herosection />

        <section className="container mx-auto px-6 py-10">
          <h2 className="text-3xl font-semibold text-red-500 text-center mb-8">Featured Service Highlights</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              <Image src="/newservice2.png" width={900} height={600} alt="Repair service" className="w-full h-[320px] object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">Same Trusted Repair Service</h3>
                <p className="text-gray-600 text-sm">We repair bags, jeans, jackets and more with the same quality service. Leave your items with us and we will take care of the repair from start to finish.</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              <Image src="/newservice.png" width={900} height={600} alt="Pickup and delivery" className="w-full h-[320px] object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">Pickup & Delivery for ₹100</h3>
                <p className="text-gray-600 text-sm">After you leave your items, we will collect them, repair them expertly, and deliver them back to you for a flat charge of ₹100.</p>
              </div>
            </div>
          </div>
        </section>

          <Orderprocess />
          <AboutUs />

              {/* Service Steps how we works  */}

        <div className="container mx-auto py-10 md:py-20 px-8">
  <h1 className="text-3xl font-semibold text-red-500 text-center mb-10">How We Work</h1>
  <ServiceSteps />
</div>

        {/* Highlighted Services */}
        <section id='service' className=" py-10 md:py-20">
          <h3 className="text-3xl font-semibold  text-center py-4 text-red-500">Our Popular Services</h3>
          <div className="flex flex-wrap  gap-6 justify-center mt-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </section>

    



<div className="relative pt-10 ">
<h1 className="text-3xl px-4 py-8 font-semibold text-red-500 text-center" >View our location</h1>
 <Mapsection />

</div>

      </main>
    

  );
};

export default Home;
