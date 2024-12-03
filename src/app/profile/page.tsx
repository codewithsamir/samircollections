import React from "react";

const ProfilePage = () => {
  return (
    <div className="px-5 py-20 bg-gray-100 flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          {/* User Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Information */}
          <h2 className="text-xl font-semibold mt-4">John Doe</h2>
          <p className="text-gray-600">johndoe@example.com</p>

          {/* Reset Password Button */}
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
            Reset Password
          </button>
        </div>

        {/* User Stats */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
          <div className="mt-4 flex justify-between text-gray-600">
            <p>Total Orders:</p>
            <p>15</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Total Paid:</p>
            <p>$1200</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
