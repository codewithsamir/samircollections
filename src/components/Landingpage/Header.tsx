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
<header className={`w-full   px-6 lg:px-10 py-4  transition-all  sticky top-0 z-50 bg-white `}>

      <div className="container mx-auto flex justify-between items-center ">
        {/* Logo Section */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer lg:ml-10 ">
            {/* Placeholder for Logo Image */}
            <Image src="/brandlogo2.png" alt="Logo" width={50} height={50} 
            
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ">
          {/* <Link href="/" className="hover:text-red-500 transition-colors text-lg font-medium">Home</Link>
    
          <Link href="/termandcondition" className="hover:text-red-500 transition-colors text-lg font-medium">Terms and Conditions</Link> */}

          {
            menu.map((item) => (
              <Link href={item.href} key={item.name} className={`hover:text-red-500 transition-colors text-md lg:text-lg font-medium capitalize ${path === item.href ? "text-red-500" : ""}`}>{item.name}</Link>
            ))
          }


        </nav>

        {/* Mobile Menu Toggle Button */}
   <div className="one flex items-center gap-5">
   <button 
          className="md:hidden text-2xl focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>


        <Link href="/login" className="hover:bg-red-700 bg-red-500 text-white rounded-md py-1 md:py-2 px-4 tracking-widest transition-colors text-sm md:text-md font-medium">Book now</Link>
   </div>
      </div>
      

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-red-300 mt-2 w-full p-4 space-y-2">
            {
            menu.map((item) => (
              <Link href={item.href} key={item.name} className={`hover:text-red-500 transition-colors block text-md lg:text-lg font-medium capitalize ${path === item.href ? "text-red-500" : "text-white"}`}>{item.name}</Link>
            ))
          }
        </nav>
      )}
    </header>
  );
};

export default Header;
