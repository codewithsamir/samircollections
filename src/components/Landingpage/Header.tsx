"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import Image from 'next/image';
import { usePathname } from 'next/navigation';



const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = usePathname();
console.log(path, "it path")
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
const menu = [
  { name: 'Home', href: '/' },
  { name: 'Terms and Conditions', href: '/termandcondition' },
  { name: 'services', href: '/services' },
  { name: 'price plan', href: '/pricelist' },
  { name: 'our products', href: '/products' },


]
  

  return (
<header className={`w-full px-6 lg:px-10 py-4 transition-all sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer lg:ml-10 transition-transform duration-300 hover:scale-105">
            <Image src="/samircollectionlogo.png" alt="Logo" width={150} height={150} priority />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {menu.map((item) => (
            <Link 
              href={item.href} 
              key={item.name} 
              className={`relative hover:text-brand transition-colors duration-300 text-md lg:text-lg font-medium capitalize group ${path === item.href ? "text-brand" : "text-gray-700"}`}
            >
              {item.name}
              <span className={`absolute left-0 bottom-[-4px] w-full h-[2px] bg-brand transition-transform duration-300 origin-left ${path === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button */}
   <div className="flex items-center gap-5">
        <Link href="https://wa.me/9779824823877?text=Hi%2C%20I%20need%20a%20repair%20service" target="_blank" rel="noopener noreferrer" className="hidden md:block hover:bg-green-600 bg-green-500 text-white rounded-full py-2 px-6 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-md font-medium tracking-wide">
          WhatsApp
        </Link>
        <button 
          className="md:hidden text-2xl text-gray-800 hover:text-brand transition-colors focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
   </div>
      </div>
      
      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col p-4 space-y-3 animate-fade-in-down">
          {menu.map((item) => (
            <Link 
              href={item.href} 
              key={item.name} 
              className={`hover:text-brand transition-colors block text-md font-medium capitalize px-4 py-2 rounded-md ${path === item.href ? "text-brand bg-brand-light/30" : "text-gray-700"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link href="https://wa.me/9779824823877?text=Hi%2C%20I%20need%20a%20repair%20service" target="_blank" rel="noopener noreferrer" className="text-center bg-green-500 hover:bg-green-600 text-white rounded-md py-3 px-4 font-medium shadow-md transition-colors">
            WhatsApp
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
