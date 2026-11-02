import React from 'react';
import RepairServiceCard from '@/components/storefront/RepairServiceCard';
import ProductCard from '@/components/storefront/ProductCard';
import ContactForm from '@/components/storefront/ContactForm';

const FancyAndRepair = () => {
  const repairServices = [
    {
      title: 'Jeans & Pants Repair',
      description: 'Expert stitching, patching, hemming, and waist adjustments for a seamless look.',
      imageSrc: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80',
    },
    {
      title: 'Bag & Luggage Repair',
      description: 'Zipper replacements, strap fixing, and general repairs to restore your favorite bags.',
      imageSrc: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80',
    },
    {
      title: 'Jacket Fitting & Repair',
      description: 'Custom jacket fitting, lining repair, and adjustments for perfect style and comfort.',
      imageSrc: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80',
    },
    {
      title: 'Kurti & Surwal Alterations',
      description: 'Expert repair and fitting services ensuring your traditional wear is perfectly comfortable.',
      imageSrc: 'https://images.unsplash.com/photo-1610444583856-78b191ccf52b?auto=format&fit=crop&q=80',
    },
  ];

  return (
    <main className="w-full">
      {/* Header */}
      <section className="bg-brand text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold">Fancy & Repair Branch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your destination for beautiful cosmetics, accessories, and expert garment & bag repair services.
          </p>
        </div>
      </section>

      {/* Repair Services Section */}
      <section className="py-20 bg-neutralBase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand mb-4">Expert Repair Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't throw away your favorite items. Our experienced tailors can fix torn seams, replace zippers, do patchwork, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {repairServices.map((service, index) => (
              <RepairServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Fancy Items Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand mb-4">Fancy Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our range of premium cosmetics, stunning bangles, and elegant jewelry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             <ProductCard 
              name="Premium Bridal Bangles Set"
              category="Bangles"
              price="Rs. 1,500"
              imageSrc="https://images.unsplash.com/photo-1599643478514-4a52023a75e0?auto=format&fit=crop&q=80"
            />
            <ProductCard 
              name="Gold Plated Necklace"
              category="Jewelry"
              price="Rs. 4,500"
              imageSrc="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80"
            />
            <ProductCard 
              name="Professional Makeup Kit"
              category="Cosmetics"
              price="Rs. 3,200"
              imageSrc="https://images.unsplash.com/photo-1512496115851-a1c8f137e6a1?auto=format&fit=crop&q=80"
            />
            <ProductCard 
              name="Elegant Hair Accessories"
              category="Accessories"
              price="Rs. 450"
              imageSrc="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80"
            />
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-brand/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm isRepairBooking={true} />
        </div>
      </section>

    </main>
  );
};

export default FancyAndRepair;
