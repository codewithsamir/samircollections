import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPhone,
  FiShield,
  FiTruck,
  FiTag,
  FiNavigation,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import BranchCard from '@/components/storefront/BranchCard';
import ProductCard from '@/components/storefront/ProductCard';
import SocialLinks from '@/components/storefront/SocialLinks';
import { getFeaturedProducts, getServices, getSiteSettings, type ServiceData } from '@/helpers/siteData';

export const metadata: Metadata = {
  title: 'Samir Collection | Bag & Cloth Repairing Centre in Janakpur',
  description:
    'Expert bag repair, zipper replacement, jeans alteration, jacket and coat repair and tailoring in Janakpur Dham, Nepal. Home pickup available. Book on WhatsApp.',
  keywords: [
    'bag repair Janakpur',
    'cloth repair Janakpur',
    'zipper repair',
    'jeans alteration',
    'tailor Janakpur',
    'trolley bag repair',
    'Samir Collection',
  ],
};

export const revalidate = 60;

const highlights = [
  { icon: FiTruck, title: 'Home Pickup', np: 'घरमै पिकअप', text: 'We collect & return within Janakpur' },
  { icon: FiClock, title: 'Quick Turnaround', np: 'छिटो सेवा', text: 'Small repairs done the same day' },
  { icon: FiShield, title: 'Quality Materials', np: 'राम्रो सामग्री', text: 'Strong zippers, threads & runners' },
  { icon: FiTag, title: 'Fair Pricing', np: 'उचित मूल्य', text: 'Clear quote before we start' },
];

const steps = [
  { title: 'Message or Visit', np: 'सम्पर्क गर्नुहोस्', text: 'Send a photo on WhatsApp or bring your item to our shop.' },
  { title: 'Get a Quote', np: 'मूल्य जान्नुहोस्', text: 'We inspect it and tell you the price and time upfront.' },
  { title: 'Expert Repair', np: 'दक्ष मर्मत', text: 'Our experienced tailors fix it with care and quality materials.' },
  { title: 'Pickup or Delivery', np: 'लैजानुहोस्', text: 'Collect it from the shop or get it delivered back to you.' },
];

// Bag / cloth columns are built from the admin's services, with sensible fallbacks
const buildPillars = (services: ServiceData[]) => {
  const pick = (category: ServiceData['category'], fallback: string[]) => {
    const titles = services.filter((s) => s.category === category).map((s) => s.title);
    return titles.length >= 2 ? titles.slice(0, 4) : fallback;
  };
  const imageFor = (category: ServiceData['category'], fallback: string) =>
    services.find((s) => s.category === category && s.image)?.image || fallback;

  return [
    {
      title: 'Bag Repair',
      np: 'झोला मर्मत',
      tagline: 'School bags, ladies bags, trolleys & more',
      image: imageFor('bag', '/serviceimg/bagreparing.png'),
      items: pick('bag', ['Zipper & slider replacement', 'Handle & strap repair', 'Trolley runner & wheel change', 'Stitching & patch work']),
    },
    {
      title: 'Cloth Repair & Alteration',
      np: 'कपडा मर्मत र सिलाई',
      tagline: 'Jeans, shirts, jackets, coats & track pants',
      image: imageFor('cloth', '/serviceimg/tailoringservice.png'),
      items: pick('cloth', ['Jeans waist & length adjustment', 'Shirt & coat fitting', 'Elastic & button replacement', 'Tear mending & custom patches']),
    },
  ];
};

const StitchDivider = () => (
  <div className="flex items-center justify-center gap-3 mt-6" aria-hidden="true">
    <span className="w-16 border-t-2 border-dashed border-gold" />
    <span className="w-2 h-2 rotate-45 bg-gold" />
    <span className="w-16 border-t-2 border-dashed border-gold" />
  </div>
);

const SectionHeading = ({ eyebrow, np, title, text, light = false }: { eyebrow: string; np?: string; title: string; text?: string; light?: boolean }) => (
  <div className="text-center mb-14 max-w-2xl mx-auto">
    <p className="text-gold font-semibold uppercase tracking-[0.25em] text-xs mb-3">
      {eyebrow}
      {np && <span className="font-nepali normal-case tracking-normal text-sm"> · {np}</span>}
    </p>
    <h2 className={`font-serif text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-brand-dark'}`}>{title}</h2>
    {text && <p className={`mt-4 text-lg ${light ? 'text-gray-300' : 'text-gray-600'}`}>{text}</p>}
    <StitchDivider />
  </div>
);

const Home = async () => {
  const [settings, services, products] = await Promise.all([getSiteSettings(), getServices(), getFeaturedProducts()]);

  const whatsappLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`नमस्ते ${settings.businessName}, I want to book a repair.`)}`;
  const phoneLink = `tel:${settings.phone.replace(/\s/g, '')}`;
  const directionsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${settings.businessName} ${settings.address}`)}`;
  const pillars = buildPillars(services);
  const hasSocials = Object.values(settings.socials).some(Boolean);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand via-[#6a0000] to-brand-dark text-white">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,#D4AF37_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="absolute -right-32 -top-32 w-[28rem] h-[28rem] rounded-full border-2 border-dashed border-gold/20" />
        <div className="absolute -left-24 -bottom-40 w-[24rem] h-[24rem] rounded-full border-2 border-dashed border-gold/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div className="text-center lg:text-left">
            <p className="font-nepali text-gold text-lg mb-3">🙏 नमस्ते! स्वागत छ</p>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/50 bg-white/5 text-gold-light text-xs sm:text-sm tracking-wider uppercase">
              <FiMapPin /> {settings.hero.badge}
            </span>
            <h1 className="font-serif mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {settings.hero.title} <span className="text-gold">{settings.hero.highlight}</span> {settings.hero.titleEnd}
            </h1>
            {settings.hero.nepaliLine && (
              <p className="font-nepali mt-4 text-xl sm:text-2xl font-semibold text-gold-light">{settings.hero.nepaliLine}</p>
            )}
            <p className="mt-6 text-lg sm:text-xl text-gray-200 font-light max-w-xl mx-auto lg:mx-0">
              {settings.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-brand-dark font-bold rounded-full shadow-lg shadow-black/30 hover:bg-gold-light hover:-translate-y-0.5 transition-all"
              >
                <FaWhatsapp className="text-xl" /> Book a Repair
              </a>
              <Link
                href="/pricelist"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold font-bold rounded-full hover:bg-gold/10 transition-all"
              >
                View Price List <FiArrowRight />
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-sm text-gray-200">
              {['Home pickup available', 'Same-day small repairs', 'Quote before work'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <FiCheckCircle className="text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Logo badge with floating service tags */}
          <div className="relative mx-auto w-72 h-72 sm:w-96 sm:h-96">
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute -inset-4 rounded-full border-2 border-dashed border-gold/40 animate-[spin_60s_linear_infinite]" />
            <img
              src="/samircollection-logo.svg"
              alt={`${settings.businessName} - ${settings.tagline}`}
              className="relative w-full h-full drop-shadow-2xl"
            />
            <div className="absolute -left-6 sm:-left-14 top-10 bg-white text-brand-dark rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 animate-bounce-slow">
              <span className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-brand">🧵</span>
              <div className="text-left">
                <p className="text-xs text-gray-500">Alteration</p>
                <p className="text-sm font-bold">Perfect Fit</p>
              </div>
            </div>
            <div className="absolute -right-2 sm:-right-10 -bottom-6 sm:bottom-12 bg-white text-brand-dark rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 animate-bounce-slow [animation-delay:1.5s]">
              <span className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-brand">👜</span>
              <div className="text-left">
                <p className="text-xs text-gray-500">Bag Repair</p>
                <p className="text-sm font-bold">Like New</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights strip */}
        <div className="relative z-10 bg-gradient-to-r from-gold-dark via-gold to-gold-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map(({ icon: Icon, title, np, text }) => (
              <div key={title} className="flex items-center gap-3 text-brand-dark">
                <span className="shrink-0 w-11 h-11 rounded-full bg-brand-dark text-gold flex items-center justify-center">
                  <Icon className="text-lg" />
                </span>
                <div>
                  <p className="font-bold leading-tight">
                    {title} <span className="font-nepali font-semibold text-sm text-brand">· {np}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-brand-dark/80">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we repair */}
      <section className="py-24 bg-neutralBase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we repair"
            np="हामी के मर्मत गर्छौं?"
            title="Two crafts, one trusted workshop"
            text="From a broken trolley bag to a pair of jeans that needs the perfect fit, we fix it all under one roof."
          />
          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="grid sm:grid-cols-5 h-full">
                  <div className="sm:col-span-2 h-56 sm:h-full bg-brand-light overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="sm:col-span-3 p-8 flex flex-col">
                    <h3 className="font-serif text-2xl font-bold text-brand-dark">{p.title}</h3>
                    <p className="font-nepali text-gold-dark font-semibold">{p.np}</p>
                    <p className="text-gray-500 mt-1">{p.tagline}</p>
                    <ul className="mt-6 space-y-3 flex-grow">
                      {p.items.map((i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <FiCheckCircle className="mt-1 shrink-0 text-gold-dark" /> {i}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/services"
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-brand hover:text-gold-dark transition-colors"
                    >
                      See all services <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                <div className="absolute inset-2 rounded-[1.25rem] border border-dashed border-gold/40 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our services" np="हाम्रा सेवाहरू" title="Repairs & alterations we do every day" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {services.slice(0, 8).map((s) => (
              <Link
                href="/services"
                key={s._id || s.title}
                className="group bg-neutralBase rounded-2xl overflow-hidden border border-gray-100 hover:border-gold hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-brand-light">
                  {s.image && (
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-brand-dark text-sm sm:text-base">{s.title}</h3>
                  <p className="hidden sm:block text-sm text-gray-500 mt-2 line-clamp-2">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-colors"
            >
              View all {services.length} services <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#D4AF37_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How it works" np="कसरी काम गर्छ?" title="Repaired in 4 simple steps" light />
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] border-t-2 border-dashed border-gold/50" />
            {steps.map((s, i) => (
              <div key={s.title} className="relative text-center">
                <div className="relative mx-auto w-16 h-16 rounded-full bg-gold text-brand-dark font-serif text-2xl font-bold flex items-center justify-center ring-8 ring-brand-dark">
                  {i + 1}
                </div>
                <h3 className="mt-6 text-xl font-bold text-gold-light">{s.title}</h3>
                <p className="font-nepali text-gold">{s.np}</p>
                <p className="mt-2 text-gray-300">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other branches */}
      <section id="branches" className="py-24 bg-neutralBase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={`Also at ${settings.businessName}`}
            np="हाम्रा पसलहरू"
            title="Visit our shops"
            text="Visit our two specialized shops in Janakpur to find exactly what you need."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <BranchCard
              title="Fancy & Repair"
              description="Cosmetics, bangles, jewelry, and expert garment & bag repair services."
              imageSrc="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80"
              href="/fancy-and-repair"
            />
            <BranchCard
              title="Readymade Clothing"
              description="Premium readymade apparel for men and boys."
              imageSrc="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80"
              href="/readymade"
            />
          </div>
        </div>
      </section>

      {/* Products added from the admin panel */}
      {products.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12 border-b border-dashed border-gold/50 pb-4">
              <div>
                <h2 className="font-serif text-3xl font-bold text-brand-dark mb-2">Trending Now</h2>
                <p className="text-gray-500">Popular items across our stores</p>
              </div>
              <Link href="/shop" className="text-brand hover:text-gold font-semibold transition-colors hidden sm:block">
                View All Products &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((p) => (
                <ProductCard
                  key={p._id}
                  name={p.name}
                  category={p.category}
                  price={`Rs. ${p.price.toLocaleString('en-IN')}`}
                  imageSrc={p.images?.[0] || '/samircollection-logo.png'}
                  whatsapp={settings.whatsapp}
                />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/shop" className="text-brand hover:text-gold font-semibold transition-colors">
                View All Products &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-24 bg-brand-light/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" np="धेरै सोधिने प्रश्नहरू" title="Questions customers ask" />
          <div className="space-y-4">
            {settings.faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm open:shadow-md open:border-gold/60 transition-all"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-6 font-semibold text-brand-dark">
                  {f.q}
                  <span className="shrink-0 w-8 h-8 rounded-full bg-brand-light text-brand flex items-center justify-center text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 -mt-2 text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Map & social media */}
      <section id="location" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Find us" np="हामीलाई भेट्नुहोस्" title={`Visit ${settings.businessName}`} />
          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-2 ring-gold/40 min-h-[320px] bg-brand-light">
              {settings.mapEmbedUrl && (
                <iframe
                  src={settings.mapEmbedUrl}
                  title={`${settings.businessName} location on Google Maps`}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>

            <div className="lg:col-span-2 relative rounded-3xl bg-gradient-to-br from-brand to-brand-dark text-white p-8 sm:p-10 shadow-xl overflow-hidden">
              <div className="absolute inset-3 rounded-[1.25rem] border-2 border-dashed border-gold/30 pointer-events-none" />
              <h3 className="font-serif text-2xl font-bold text-gold">{settings.tagline}</h3>
              <ul className="mt-6 space-y-5">
                {settings.address && (
                  <li className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center"><FiMapPin /></span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gold-light/80">Address</p>
                      <p className="text-gray-100">{settings.address}</p>
                    </div>
                  </li>
                )}
                {settings.phone && (
                  <li className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center"><FiPhone /></span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gold-light/80">Phone</p>
                      <a href={phoneLink} className="text-gray-100 hover:text-gold">{settings.phone}</a>
                    </div>
                  </li>
                )}
                {settings.openingHours && (
                  <li className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center"><FiClock /></span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gold-light/80">Opening hours</p>
                      <p className="text-gray-100">{settings.openingHours}</p>
                    </div>
                  </li>
                )}
              </ul>
              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gold text-brand-dark font-bold rounded-full hover:bg-gold-light transition-colors"
              >
                <FiNavigation /> Get Directions
              </a>
              {hasSocials && (
                <div className="relative mt-8 pt-6 border-t border-gold/20">
                  <p className="text-sm uppercase tracking-wider text-gold-light/80 mb-4">Follow us</p>
                  <SocialLinks socials={settings.socials} size="lg" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-brand to-brand-dark text-white p-10 sm:p-14 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-3 rounded-[1.25rem] border-2 border-dashed border-gold/40 pointer-events-none" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Got something that needs <span className="text-gold">fixing?</span>
            </h2>
            <p className="font-nepali mt-3 text-xl text-gold-light">केही बिग्रियो? हामी बनाइदिन्छौं!</p>
            <p className="mt-4 text-gray-200 text-lg max-w-2xl mx-auto">
              Send us a photo on WhatsApp and get a quick quote, or visit us at {settings.address}.
            </p>
            <div className="relative mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-brand-dark font-bold rounded-full hover:bg-gold-light transition-colors"
              >
                <FaWhatsapp className="text-xl" /> Chat on WhatsApp
              </a>
              <a
                href={phoneLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold font-bold rounded-full hover:bg-gold/10 transition-colors"
              >
                <FiPhone /> {settings.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
