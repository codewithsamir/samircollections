import React from 'react';
import Link from 'next/link';


const Header: React.FC = () => {
  return (
    <header className="bg-blue-800 text-white py-4 px-10 ">
      <div className="container mx-auto md:flex justify-between items-center">
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
            <h1 className=' text-3xl font-bold capitalize'>samir collections</h1>
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className='flex items-center gap-5'>
          <ul className=" md:flex gap-6">
            <li><Link href="/" className="hover:text-yellow-400 transition-colors text-xl font-medium">Home</Link></li>
            <li>
            <a 
    href="https://forms.gle/9dTFDHp4HL27ozry8" 
    className="hover:text-yellow-400 transition-colors text-xl font-medium" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    Request pickup
  </a>
            </li>
            <li><Link href="/termandcondition" className="hover:text-yellow-400 transition-colors text-xl font-medium">Term and Condition</Link></li>
            {/* <li><Link href="/about" className="hover:text-yellow-400 transition-colors text-xl">About</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition-colors text-xl">Contact</Link></li> */}
          </ul>
          
          {/* Mobile Navigation */}
          <div className="">
            {/* <Link href="/login">
            <button className=" px-2 py-1 bg-red-500 rounded-md text-white">Login</button>
            </Link> */}
            {/* You can implement a mobile menu here with dropdown or modal */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
