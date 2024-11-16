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
        <meta name="google-site-verification" content="Geg6MyqELKWvjbsABit5WRiVwZ9ua-TMkbRUObCVSIA" />
        <title>Samir Collections - Bag & Jean Repairing Center</title>
        <meta name="description" content="Samir Bag and Jean Repairing Center in Janakpur offers expert repair and fitting services for bags, jeans, jackets, and more. Convenient home pickup service available." />
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
