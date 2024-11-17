// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from '@/components/Landingpage/Header'
import Footer from '@/components/Landingpage/Footer'
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Samir Collections - Bag & Jean Repairing Center",
//   description: "Samir Bag and Jean Repairing Center in Janakpur offers expert repair and fitting services for bags, jeans, jackets, and more. Convenient home pickup service available.",
//   // Adding google-site-verification meta tag
//   googleSiteVerification: "Geg6MyqELKWvjbsABit5WRiVwZ9ua-TMkbRUObCVSIA",
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<Head>
  {/* Main Meta Tags */}
  <title>Samir Bag and Jeans Repairing Center - Expert Clothing Repair in Janakpur, Nepal</title>
  <meta name="description" content="Samir Bag and Jeans Repairing Center in Janakpur, Nepal, offers expert repair services for all types of clothing, including jeans, jackets, kurtis, trousers, and winter wear. Convenient home pickup service available." />
  <meta name="keywords" content="clothing repair, jeans repair, jacket repair, kurti repair, trouser elastic replacement, Janakpur, Samir Bag and Jeans Repairing Center, garment repair, winter wear repair, Nepal" />

  {/* Google Site Verification */}
  <meta name="google-site-verification" content="Geg6MyqELKWvjbsABit5WRiVwZ9ua-TMkbRUObCVSIA" />

  {/* Open Graph / Facebook */}
  <meta property="og:title" content="Samir Bag and Jeans Repairing Center - Expert Clothing Repair in Janakpur, Nepal" />
  <meta property="og:description" content="Offering top-quality repair services for all types of clothing, including jeans, vests, jackets, kurtis, trousers, and winter items in Janakpur, Nepal. Home pickup available." />
  <meta property="og:image" content="https://www.yourwebsite.com/path-to-image.jpg" />
  <meta property="og:url" content="https://www.samirrain.com.np/" />
  <meta property="og:type" content="website" />

  {/* Structured Data - JSON-LD */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Samir Bag and Jeans Repairing Center",
        "description": "Samir Bag and Jeans Repairing Center in Janakpur, Nepal, specializes in high-quality clothing repairs for jeans, jackets, kurtis, trousers, winter wear, and more. Convenient home pickup service available.",
        "image": "https://www.yourwebsite.com/path-to-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Pidari Chowk",
          "addressLocality": "Janakpur",
          "addressRegion": "Province No. 2",
          "postalCode": "45600",
          "addressCountry": "NP"
        },
        "telephone": "+977 9824823877",
        "url": "https://www.samirrain.com.np/",
        "sameAs": [
          "https://www.facebook.com/YourPage",
          "https://www.instagram.com/YourPage"
        ],
        "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 09:00-18:00",
        "priceRange": "10+"
      }
    `}
  </script>
</Head>



      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
              <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
