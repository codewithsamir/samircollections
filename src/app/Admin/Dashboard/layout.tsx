"use client"
import Sidebar from '@/components/Dashboardcomponents/Sidebar';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Layout = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
    const [user, setUser]:any = useState([]);
const menu = [

  {
    name:"Dashboard",
    href:"/Admin/Dashboard"
  },

  {
    name:"Users",
    href:"/Admin/Dashboard/Users"
  },
]

useEffect(() => {
  const getUser = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  getUser();
}, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex  min-h-screen bg-gray-100">
      <Sidebar  menu={menu} header="Admin Panel"/>
     <div className="w-full">
     <header className="bg-white p-4 rounded-lg shadow-md  flex items-center justify-center sm:justify-between flex-wrap gap-3">
   
   <div className="left flex items-center gap-2 flex-wrap justify-center">
     
     <div className="w-12 h-12 mr-4">
       <Image
         src={  "/user.png"}
         alt="Profile Picture"
         width={48}
         height={48}
         className="rounded-full"
       />
     </div>
     <div>
       <h1 className="text-xl md:text-2xl font-bold text-gray-800">
         Welcome, {user?.username || "Admin"}
       </h1>
       <p className="text-gray-600">Email: {user?.email}</p>
     </div>
   </div>
 
 </header>
     {children}
     </div>
        </div>
    </div>
  )
}

export default Layout
