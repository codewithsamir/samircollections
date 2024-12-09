import React from 'react';
import Link from 'next/link';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-blue-600">Admin Portal</h1>
        <p className="text-gray-600 mt-2 text-xl">Manage your platform efficiently.</p>
      </header>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome to the Admin Portal</h2>

        <p className="text-center text-gray-700 mb-4">
          This portal allows you to manage users, view analytics, and configure your platform&apos;s settings.
        </p>

        <div className="text-center">
          <Link
            href="/Admin/login"
            className="block w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 mb-4"
          >
            Login to Admin Panel
          </Link>
          <Link
            href="/Admin/signup"
            className="block w-full py-3 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Create an Admin Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-gray-600">
        <p>&copy; 2024 Admin Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;
