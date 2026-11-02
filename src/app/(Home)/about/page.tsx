import React from 'react';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <main className="w-full bg-neutralBase">
      {/* Header */}
      <section className="bg-brand text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Our Story</h1>
          <p className="text-xl text-gray-300">
            A legacy of style, quality, and craftsmanship in the heart of Janakpur.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1fac0840c2?auto=format&fit=crop&q=80" 
              alt="Samir Collection Storefront" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-brand mb-6">About Samir Collection</h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Welcome to <span className="font-semibold text-brand">Samir Collection</span>, your premier destination for fashion and garment care in Janakpur, Nepal. What started as a passion for quality clothing has blossomed into two specialized branches dedicated to serving our community's diverse needs.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              We operate two distinct shops to better serve you: our <strong className="text-brand">Fancy & Repair Branch</strong>, where we offer exquisite cosmetics, jewelry, and unmatched tailoring and repair services for all your garments and bags. And our <strong className="text-brand">Readymade Branch</strong>, dedicated entirely to providing the latest, high-quality apparel for men and boys.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="text-4xl font-bold text-gold mb-2">10+</h4>
                <p className="text-brand font-medium">Years of Experience</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="text-4xl font-bold text-gold mb-2">2</h4>
                <p className="text-brand font-medium">Specialized Branches</p>
              </div>
            </div>

            <Link 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors"
            >
              Visit Our Stores Today
            </Link>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-brand mb-8">Our Commitment to Craftsmanship</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-8">
            At our repair branch, we believe in sustainability and preserving what you love. Whether it's a cherished leather bag, a perfectly worn-in pair of jeans, or a formal jacket that needs adjusting, our expert tailors treat every item with the utmost care and precision. We don't just mend clothes; we restore memories.
          </p>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
