"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


const Header: React.FC = ({classname}:any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname()

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Detect scroll position and update background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) { // Change 100 to the height of your hero section
        setIsScrolled(true);
      } 

      else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
<header className={`w-full top-0 z-20 py-2 px-10 text-white transition-all ${pathname === "/" ? (isScrolled ? 'bg-slate-900 fixed' : 'bg-transparent fixed') : 'bg-slate-900 relative'}`}>

      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer md:ml-10">
            {/* Placeholder for Logo Image */}
            <Image src="/logo.png" alt="Logo" width={80} height={70} />
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
