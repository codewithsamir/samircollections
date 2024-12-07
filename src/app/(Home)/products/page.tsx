import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Our Product List</h1>
        <p className="text-lg text-center text-gray-600">
          We will be adding products soon. <br />
          Stay tuned for exciting new arrivals!
        </p>
        <div className="mt-6 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-green-500 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path d="M4 12a8 8 0 0 1 8-8V4l4 4-4 4v-2a6 6 0 0 0-6-6"></path>
          </svg>
        </div>
        <p className="text-center text-gray-500 mt-4">Thank you for your patience!</p>
      </div>
    </div>
  )
}

export default page
