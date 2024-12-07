
"use client"
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

const Sidebar = () => {
    const router = useRouter()
    const logoutHandle = async () => { 

        try {
          
         await axios.get('/api/users/logout');
          
          toast.success("Logout Success",{
            position: "top-right",
            richColors:true,
            
          })
          router.push("/login")
    
        } catch (error) {
            const typedError = error as Error;
        //   console.log(typedError.message)
          toast.error(typedError.message,{
            position: "top-right",
        richColors:true,
          })
        }
       }
  return (
    <aside className="bg-blue-600 text-white w-full md:w-64 p-5 sm:space-y-8">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto ">
        <Image
          src="/logo.png" // Replace with your logo path
          alt="Company Logo"
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <h1 className="text-2xl font-bold">Customer Panel</h1>
      <p className="text-gray-200">Samir Bag & Jeans</p>
    </div>

    <nav className="space-y-4">
      <Link href="/Dashboard">
        <button className="w-full my-2  px-4 py-1 text-sm sm:text-lg md:py-2 rounded-md bg-blue-500 hover:bg-blue-800 transition hidden sm:block">
          Dashboard
        </button>
      </Link>
    
   
     
        <button 
        onClick={logoutHandle}
        className="w-full  block px-4 py-1 text-sm sm:text-lg md:py-2  rounded-md bg-red-500 hover:bg-red-800 transition">
          Logout
        </button>
     
    </nav>
  </aside>
  )
}

export default Sidebar