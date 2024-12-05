"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ErrorResponse {
  message: string;
}

const VerifyEmail: React.FC = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token') || ""
  
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorData: ErrorResponse = err.response.data as ErrorResponse;
        setError(errorData.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
      setVerified(false);
    }
  };

  

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex py-20 justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md h-[200px] w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>


        {verified && 
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">Your email has been verified successfully!</p>
            <Link href="/login" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
     Login
            </Link>
          </div>
}
         { error &&  
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-4">{error}</p>
            <p>Please check the token or try again later.</p>
          </div>
        }

        {!error && !verified &&
        
          <p className="text-gray-600">Verifying your email...</p>
        }
     
    
      </div>
    </div>
  );
};

export default VerifyEmail;
