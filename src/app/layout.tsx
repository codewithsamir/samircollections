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
    <html lang="en" >
<Head>
  {/* Main Meta Tags */}
  <title>Samir Bag and Jeans Repairing Center - Expert Bag & Clothing Repair in Janakpur, Nepal</title>
  <meta name="description" content="Samir Bag and Jeans Repairing Center in Janakpur, Nepal, specializes in expert repair services for bags, jeans, jackets, kurtis, trousers, and all types of clothing. Convenient home pickup service available." />
  <meta name="keywords" content="bag repair, bag repairing, bag fixing, cloth repair, cloth repairing, clothing alterations, jeans repair, jeans alterations, jacket repair, jacket fitting, kurti repair, trouser elastic replacement, clothing fitting, garment repair, winter wear repair, leather bag repair, travel bag repair, backpack repair, tailor shop, tailor service, clothing adjustment, Janakpur, Samir Bag and Jeans Repairing Center, garment repair center, fashion alterations, winter clothing repair, clothing mending, Nepal, cloth repairing at Janakpur, cloth repairing in Janakpur, cloth repairing in Pidari Chowk, cloth repairing inside Janakpur Dham , samir bag , samir bag shop" />


  {/* Google Site Verification */}
  <meta name="google-site-verification" content="Geg6MyqELKWvjbsABit5WRiVwZ9ua-TMkbRUObCVSIA" />

  {/* Open Graph / Facebook */}
  <meta property="og:title" content="Samir Bag and Jeans Repairing Center - Expert Bag & Clothing Repair in Janakpur, Nepal" />
  <meta property="og:description" content="Offering top-quality repair services for bags, jeans, jackets, kurtis, trousers, and winter items in Janakpur, Nepal. Expert fitting and mending services with home pickup available." />
  <meta property="og:image" content="https://www.samirrain.com.np/samirbagandjeanrepairingcenter.png" />
  <meta property="og:url" content="https://www.samirrain.com.np/" />
  <meta property="og:type" content="website" />

  {/* Structured Data - JSON-LD */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Samir Bag and Jeans Repairing Center",
        "description": "Samir Bag and Jeans Repairing Center in Janakpur, Nepal, specializes in high-quality clothing and bag repairs, including jeans, jackets, kurtis, trousers, leather bags, backpacks, and winter wear. Expert fitting and mending services with convenient home pickup available.",
        "image": "https://www.samirrain.com.np/samirbagandjeanrepairingcenter.png",
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
          "https://www.facebook.com/profile.php?id=61569347120608&mibextid=ZbWKwl",
          "https://www.instagram.com/teamofsamir"
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
              <Header  />
              
        {children}
        <Footer />
      </body>
    </html>
  );
}
