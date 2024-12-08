import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul>
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-600 p-2 rounded-lg block">Dashboard</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-600 p-2 rounded-lg block">Users</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-600 p-2 rounded-lg block">Orders</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-600 p-2 rounded-lg block">Settings</a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Welcome to the Admin Dashboard</h1>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Logout
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Users</h3>
            <p className="text-gray-600">Manage users and their roles.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Orders</h3>
            <p className="text-gray-600">View and manage customer orders.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Settings</h3>
            <p className="text-gray-600">Configure the dashboard settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
