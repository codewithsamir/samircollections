import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white p-6 text-center space-y-1">
      <p className="font-semibold text-lg">© {new Date().getFullYear()} Samir Collection General Store</p>
      <p className="text-gold-light text-sm">Branches: Fancy & Tailoring Service | Readymade</p>
      <p className="text-gold-light text-sm">Location: JanakpurDham-9, Pidari Chowk</p>
      <p className="text-gold-light text-sm">Contact: 9824823877</p>
    </footer>
  );
};

export default Footer;
