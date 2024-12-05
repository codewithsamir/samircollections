import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Samir Bag and Jeans Preparing Center
      </h1>
      <p className="text-center text-gray-600 mb-6">Verify your email to continue</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Verification Code Input */}
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your verification code"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          }`}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      {/* Message */}
      {message.text && (
        <div
          className={`mt-4 p-2 text-center rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  </div>


  )
}

export default page