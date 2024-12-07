'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface ForgotPasswordResponse {
  message?: string;
  error?: string;
}

// Define the error structure for Axios
interface AxiosResponseError {
  error?: string;
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await axios.post<ForgotPasswordResponse>('/api/users/checkuser', {
        email,
      });

      if (response.status === 200) {
        setMessage(response.data.message || 'Check your email for the reset link.');
      } else {
        setError(response.data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      // Cast the error to AxiosError for better type safety
      const axiosError = err as AxiosError<AxiosResponseError>; // Use the custom error type

      console.error('Error:', axiosError);

      // Access error message from axiosError.response?.data.error (if exists)
      setError(
        axiosError.response?.data?.error || 'Failed to send request. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        {message && <p className="text-green-600 text-center mb-4" aria-live="assertive">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4" aria-live="assertive">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
            aria-label="Email Address"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-500 text-white py-3 rounded-md font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
