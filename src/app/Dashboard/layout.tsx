
import React from 'react'

import Sidebar from '@/components/Dashboardcomponents/Sidebar';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    {/* Sidebar */}
  <Sidebar/>
       <div className="w-full">
       {children}
       </div>
    </div>
  )
}

export default layout