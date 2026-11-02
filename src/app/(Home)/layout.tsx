import React from 'react';
import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';
import WhatsAppButton from '@/components/storefront/WhatsAppButton';
import { getSiteSettings } from '@/helpers/siteData';

// Refresh admin-managed content at least every minute (admin saves refresh it instantly)
export const revalidate = 60;

const StorefrontLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col min-h-screen bg-neutralBase text-brand">
      <Navbar businessName={settings.businessName} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer settings={settings} />
      <WhatsAppButton number={settings.whatsapp} />
    </div>
  );
};

export default StorefrontLayout;
