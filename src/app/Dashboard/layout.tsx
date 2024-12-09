
import React from 'react'

import Sidebar from '@/components/Dashboardcomponents/Sidebar';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  
    const menu = [
      {
        name:"Home",
        href:"/"
      },
      {
        name:"Dashboard",
        href:"/Dashboard"
      },
  
    ]

  return (

    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    {/* Sidebar */}
    <Sidebar  menu={menu} header="Customer Panel"/>
       <div className="w-full">
       {children}
       </div>
    </div>
  )
}

export default layout