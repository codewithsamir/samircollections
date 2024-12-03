"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import Image from 'next/image';



const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  

  return (
<header className={`w-full   px-10  transition-all shadow-lg sticky top-0 z-50 bg-white`}>

      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer md:ml-10">
            {/* Placeholder for Logo Image */}
            <Image src="/brandlogo.png" alt="Logo" width={120} height={120} 
            className='drop-shadow-lg w-full h-full'
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-yellow-400 transition-colors text-lg font-medium">Home</Link>
          <a 
            href="https://forms.gle/9dTFDHp4HL27ozry8" 
            className="hover:text-yellow-400 transition-colors text-lg font-medium" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Request Pickup
          </a>
          <Link href="/termandcondition" className="hover:text-yellow-400 transition-colors text-lg font-medium">Terms and Conditions</Link>

          <Link href="/login" className="hover:text-yellow-400 bg-red-500 text-white rounded-md p-2 transition-colors text-md font-medium">Signup/login</Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-blue-800 py-4 space-y-2">
          <Link href="/" className="block text-center hover:text-yellow-400 transition-colors text-lg font-medium">Home</Link>
          <a 
            href="https://forms.gle/9dTFDHp4HL27ozry8" 
            className="block text-center hover:text-yellow-400 transition-colors text-lg font-medium" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Request Pickup
          </a>
          <Link href="/termandcondition" className="block text-center hover:text-yellow-400 transition-colors text-lg font-medium">Terms and Conditions</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
