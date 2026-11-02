import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-brand-light/50 via-white to-brand-light/20 pt-10 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative blurred blobs for modern feel */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-brand-light rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left space-y-6">
            
            {/* Badge */}
            <div className="mx-auto lg:mx-0 inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-brand/20 px-4 py-2 rounded-full text-brand text-sm font-semibold shadow-sm w-fit">
              <span>✨</span>
              <span>Pick-up & Delivery in Janakpur</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark leading-tight">
              Samir Collection <br className="hidden lg:block"/> <span className="text-brand">General Store</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg text-brand-dark/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We operate two branches: <strong className="font-semibold text-brand">Fancy & Tailoring Service</strong> and <strong className="font-semibold text-brand">Readymade</strong>. Restore your favorite items to like-new condition with our expert touch.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="#service" className="w-full sm:w-auto">
                <button className="w-full bg-brand text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-brand/40 hover:-translate-y-1 hover:bg-brand-dark transition-all duration-300">
                  Explore Services
                </button>
              </Link>
              <Link href="/pricelist" className="w-full sm:w-auto">
                <button className="w-full bg-white text-gray-800 border border-gray-200 font-semibold py-3 px-8 rounded-full shadow-sm hover:border-brand hover:text-brand hover:-translate-y-1 transition-all duration-300">
                  See Pricing
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image/Visual Content */}
          <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[550px] flex justify-center items-center">
            {/* Main Image container with subtle rotation and shadow */}
            <div className="relative w-full max-w-[500px] h-full rounded-2xl overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image 
                src="/newservice2.png" 
                alt="Expert Tailoring and Repairing"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
            </div>
            
            {/* Floating element for added modern vibe */}
            <div className="absolute -bottom-6 -left-6 lg:bottom-10 lg:-left-12 bg-white p-4 rounded-xl shadow-xl flex items-center space-x-4 animate-bounce-slow">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center text-brand text-xl">
                🧵
              </div>
              <div>
                <p className="text-sm text-brand/70 font-medium">Premium</p>
                <p className="text-brand-dark font-bold">Stitching Quality</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
