'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';

interface ResetPasswordResponse {
  message?: string;
  error?: string;
}
// Define the error structure for Axios
interface AxiosResponseError {
    error?: string;
  }

const ResetPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Retrieve the token from the URL

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!token) {
      setError('Invalid or missing token.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<ResetPasswordResponse>('/api/users/resetpassword', {
        password,
        token,
      });

      if (response.status === 200) {
        setMessage(response.data.message || 'Password reset successfully.');
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
        <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Samir Bag and Jeans Repairing Center
        </h1>
      
      </header>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            New Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
            required
          />
          
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-500 text-white py-3 rounded-md font-semibold ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
            }`}
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
