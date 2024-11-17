"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-orange-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            {/* Placeholder for Logo Image */}
            {/* <Image src="/machinelogo.png" alt="Logo" width={120} height={100} className="rounded-full" /> */}
            <h1 className="text-3xl font-bold capitalize">samir Bag and Jeans Repairing center</h1>
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
