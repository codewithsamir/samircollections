import React from 'react';
import ContactForm from '@/components/storefront/ContactForm';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SocialLinks from '@/components/storefront/SocialLinks';
import { getSiteSettings } from '@/helpers/siteData';

export const revalidate = 60;

const Contact = async () => {
  const settings = await getSiteSettings();

  return (
    <main className="w-full bg-neutralBase min-h-screen">
      {/* Header */}
      <section className="bg-brand text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold">Contact Us</h1>
          <p className="text-xl text-gray-300">
            Get in touch with us for inquiries, repairs, or just to say hello.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-brand mb-6">Our Locations</h2>
              <p className="text-gray-600 mb-8">
                Samir Collection operates two specialized branches in Janakpur to serve you better. Feel free to visit the branch that fits your needs.
              </p>
            </div>

            {/* Branch 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-full -z-0"></div>
              <h3 className="text-xl font-bold text-brand mb-4 relative z-10">Fancy & Repair Branch</h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start">
                  <FiMapPin className="mt-1 mr-4 text-gold w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">{settings.address}</span>
                </li>
                <li className="flex items-center">
                  <FiPhone className="mr-4 text-gold w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">{settings.phone}</span>
                </li>
              </ul>
            </div>

            {/* Branch 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-full -z-0"></div>
              <h3 className="text-xl font-bold text-brand mb-4 relative z-10">Readymade Branch</h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start">
                  <FiMapPin className="mt-1 mr-4 text-gold w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">Janakpur Dham, Nepal (Near Main Market)</span>
                </li>
                <li className="flex items-center">
                  <FiPhone className="mr-4 text-gold w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">{settings.phone}</span>
                </li>
              </ul>
            </div>

            {/* Direct Connect */}
            <div className="flex items-center space-x-4">
              <a 
                href={`https://wa.me/${settings.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
              <SocialLinks socials={settings.socials} tone="light" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="sticky top-28 h-fit">
            <ContactForm />
          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full bg-gray-200 mt-10">
        <iframe
          title="Samir Collection Location"
          src={settings.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
};

export default Contact;
