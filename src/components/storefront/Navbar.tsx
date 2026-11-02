"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Navbar = ({ businessName = 'Samir Collection' }: { businessName?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Price List', href: '/pricelist' },
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const shopLinks = [
    { name: 'Fancy & Repair', href: '/fancy-and-repair' },
    { name: 'Readymade', href: '/readymade' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-neutralBase/90 backdrop-blur-md shadow-sm border-b border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 font-serif text-xl sm:text-2xl font-bold text-brand hover:text-brand-dark transition-colors">
              <img src="/samircollection-logo.svg" alt="" className="w-11 h-11 sm:w-12 sm:h-12" />
              {businessName}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? 'text-brand font-semibold' : 'text-gray-600 hover:text-brand'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Shops Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-brand focus:outline-none">
                <span>Shops</span>
                <FiChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
                  >
                    <div className="py-1">
                      {shopLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`block px-4 py-2 text-sm ${
                            pathname === link.href ? 'bg-brand/10 text-brand font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-brand'
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? 'text-brand font-semibold' : 'text-gray-600 hover:text-brand'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-brand hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-b border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand hover:bg-gray-50"
                onClick={toggleMenu}
              >
                Home
              </Link>
              
              <div className="px-3 py-2">
                <div className="text-base font-medium text-gray-500 mb-2">Shops</div>
                <div className="pl-4 space-y-2">
                  {shopLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block text-sm font-medium text-gray-700 hover:text-brand"
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
