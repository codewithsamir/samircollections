import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-800 text-white p-5 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer overflow-hidden">
            {/* <Image
              src="/machinelogo.png" // Correct path to image in /public folder
              alt="Samir Bag & Jean Repairing Center Logo"
              width={120}
              height={100}
              className="rounded-full"
            /> */}
            <h1 className=' text-2xl font-bold capitalize'>samir collections</h1>
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className='flex items-center gap-5'>
          <ul className="hidden md:flex gap-6">
            <li><Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-yellow-400 transition-colors">Services</Link></li>
            <li><Link href="/products" className="hover:text-yellow-400 transition-colors">Products</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
          </ul>
          
          {/* Mobile Navigation */}
          <div className="">
            <Link href="/login">
            <button className=" px-2 py-1 bg-red-500 rounded-md text-white">Login</button>
            </Link>
            {/* You can implement a mobile menu here with dropdown or modal */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
