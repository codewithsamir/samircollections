"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  totalOrders: number;
  totalPaid: number;
}

const ProfilePage: React.FC = () => {
  // Mock user data
  const user: UserProfile = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatarUrl: "/logo.png",
    totalOrders: 15,
    totalPaid: 1200,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Handle input change for password fields
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswords({ ...passwords, [id]: value });
  };

  // Handle form submission for password change
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const { currentPassword, newPassword, confirmNewPassword } = passwords;

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    try {
      // Replace with actual API call
      console.log("Changing password...");
      console.log({ currentPassword, newPassword });

      // Simulate successful API response
      setSuccessMessage("Password changed successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="px-5 py-20 bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          {/* User Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 relative">
            <Image
              src={user.avatarUrl}
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
              priority
              className="rounded-full"
            />
          </div>

          {/* User Information */}
          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>

          {/* Reset Password Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Change Password
          </button>
        </div>

        {/* User Stats */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
          <div className="mt-4 flex justify-between text-gray-600">
            <p>Total Orders:</p>
            <p>{user.totalOrders}</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Total Paid:</p>
            <p>${user.totalPaid}</p>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current password"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmNewPassword" className="block text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={passwords.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
              {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
