import Footer from '@/components/Landingpage/Footer';
import Header from '@/components/Landingpage/Header';
import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  => {
  return (
<>
<Header />
{children}
<Footer />
</>
  )
}

export default layout
