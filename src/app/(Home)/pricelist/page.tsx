import React from 'react';
import type { Metadata } from 'next';
import { FaWhatsapp } from 'react-icons/fa';
import { getSiteSettings } from '@/helpers/siteData';

export const metadata: Metadata = {
  title: 'Price List | Samir Collection Janakpur',
  description: 'Prices for bag repair, zipper change, jeans fitting, jacket and track pant repairs at Samir Collection, Janakpur.',
};

export const revalidate = 60;

export default async function PriceList() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-neutralBase">
      <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-16 text-center px-4">
        <p className="text-gold font-semibold uppercase tracking-[0.25em] text-xs mb-3">Transparent pricing</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Price List</h1>
        <p className="font-nepali mt-2 text-2xl text-gold-light">मूल्य सूची</p>
        <p className="mt-4 text-gray-200 max-w-2xl mx-auto">Final price may vary with size and work needed. We always confirm before we start.</p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 grid gap-8 md:grid-cols-2">
        {settings.priceList.map((group) => (
          <div key={group.group} className="relative bg-white rounded-2xl shadow-md p-6 border-t-4 border-gold">
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">{group.group}</h2>
            <ul className="divide-y divide-dashed divide-gold/40">
              {group.rows.map((row) => (
                <li key={row.item} className="flex justify-between gap-4 py-3">
                  <span className="text-gray-700">{row.item}</span>
                  <span className="text-brand font-semibold text-right">{row.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {settings.whatsapp && (
        <div className="text-center pb-20 px-4">
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('नमस्ते, I want a price quote for a repair.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-bold rounded-full hover:bg-brand-dark transition-colors"
          >
            <FaWhatsapp className="text-xl" /> Get an exact quote on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
