import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/helpers/siteData";

export const metadata: Metadata = {
  title: "Repair Services | Samir Collection Janakpur",
  description: "Bag repair, zipper replacement, jeans alteration, jacket, coat and track pant repairs in Janakpur.",
};

export const revalidate = 60;

const CATEGORIES = [
  { key: "bag", title: "Bag Repair", np: "झोला मर्मत" },
  { key: "cloth", title: "Cloth Repair & Alteration", np: "कपडा मर्मत र सिलाई" },
  { key: "other", title: "Other Services", np: "अन्य सेवाहरू" },
] as const;

export default async function Services() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-neutralBase">
      <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-16 text-center px-4">
        <p className="text-gold font-semibold uppercase tracking-[0.25em] text-xs mb-3">What we do</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Our Services</h1>
        <p className="font-nepali mt-2 text-2xl text-gold-light">हाम्रा सेवाहरू</p>
        <p className="mt-4 text-gray-200 max-w-2xl mx-auto">Expert repairs and alterations for your bags and clothes.</p>
        <Link href="/pricelist" className="mt-8 inline-block px-8 py-3 bg-gold text-brand-dark font-bold rounded-full hover:bg-gold-light transition-colors">
          View Price List
        </Link>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {CATEGORIES.map(({ key, title, np }) => {
          const list = services.filter((s) => s.category === key);
          if (!list.length) return null;
          return (
            <section key={key}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark whitespace-nowrap">
                  {title} <span className="font-nepali text-lg font-semibold text-gold-dark">· {np}</span>
                </h2>
                <span className="flex-grow border-t-2 border-dashed border-gold/60" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {list.map((service) => (
                  <div
                    key={service._id || service.title}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-gold hover:shadow-xl transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-brand-light">
                      {service.image && (
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-brand-dark">{service.title}</h3>
                      <p className="mt-2 text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
