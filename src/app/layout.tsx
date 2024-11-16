import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from '@/components/Landingpage/Header'
import Footer from '@/components/Landingpage/Footer'

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

export const metadata: Metadata = {
  title: "Samir Collections - Bag & Jean Repairing Center",
  description: "Samir Bag and Jean Repairing Center in Janakpur offers expert repair and fitting services for bags, jeans, jackets, and more. Convenient home pickup service available.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
