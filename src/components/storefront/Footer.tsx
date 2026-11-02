import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import SocialLinks from './SocialLinks';
import type { SiteSettingsData } from '@/helpers/siteData';

const Footer = ({ settings }: { settings: SiteSettingsData }) => {
  return (
    <footer className="relative bg-gradient-to-b from-brand to-brand-dark text-white pt-16 pb-8">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-dark" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand & About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/samircollection-logo.svg" alt={settings.businessName} className="w-14 h-14" />
              <h3 className="font-serif text-2xl font-bold text-gold">{settings.businessName}</h3>
            </div>
            <p className="font-nepali text-gold-light text-lg mb-2">तपाईंको भरोसा, हाम्रो सीप।</p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {settings.tagline}. Expert garment &amp; bag repair, alterations and premium readymade clothing in Janakpur.
            </p>
            <SocialLinks socials={settings.socials} />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-dashed border-gold/50 pb-2 inline-block text-gold-light">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-gold transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-gold transition-colors">Repair Services</Link></li>
              <li><Link href="/pricelist" className="text-gray-300 hover:text-gold transition-colors">Price List</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="text-gray-300 hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Shops */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-dashed border-gold/50 pb-2 inline-block text-gold-light">Our Shops</h4>
            <ul className="space-y-3">
              <li><Link href="/fancy-and-repair" className="text-gray-300 hover:text-gold transition-colors">Fancy &amp; Repair</Link></li>
              <li><Link href="/readymade" className="text-gray-300 hover:text-gold transition-colors">Readymade Clothing</Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-gold transition-colors">Online Shop</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-dashed border-gold/50 pb-2 inline-block text-gold-light">Visit Us</h4>
            <ul className="space-y-4">
              {settings.address && (
                <li className="flex items-start">
                  <FiMapPin className="mt-1 mr-3 text-gold flex-shrink-0" />
                  <span className="text-gray-300">{settings.address}</span>
                </li>
              )}
              {settings.phone && (
                <li className="flex items-center">
                  <FiPhone className="mr-3 text-gold flex-shrink-0" />
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-gray-300 hover:text-gold">{settings.phone}</a>
                </li>
              )}
              {settings.email && (
                <li className="flex items-center">
                  <FiMail className="mr-3 text-gold flex-shrink-0" />
                  <a href={`mailto:${settings.email}`} className="text-gray-300 hover:text-gold break-all">{settings.email}</a>
                </li>
              )}
              {settings.openingHours && (
                <li className="flex items-start">
                  <FiClock className="mt-1 mr-3 text-gold flex-shrink-0" />
                  <span className="text-gray-300">{settings.openingHours}</span>
                </li>
              )}
            </ul>
          </div>

        </div>

        <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {settings.businessName}. All rights reserved.
            <span className="font-nepali text-gold-light/80"> · धन्यवाद! फेरि पाल्नुहोला 🙏</span>
          </p>
          <div className="flex space-x-6">
            <Link href="/termandcondition" className="text-gray-400 hover:text-gold transition-colors text-sm">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
