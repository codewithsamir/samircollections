"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface UserData {
  username: string; 
  email: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Fetch user details
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data.data);
      } catch (error) {
        const typedError = error as Error;
        console.error("Error fetching user details:", typedError.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUserDetails();
  }, []);

  // Handle input change
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswords({ ...passwords, [id]: value });
  };

  // Submit password change
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
      const response = await axios.post("/api/users/change-password", {
        currentPassword,
        newPassword,
      });
      setSuccessMessage(response.data.message || "Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      setIsModalOpen(false);
    } catch (error) {
      const typedError = error as Error;
      setErrorMessage(typedError.message || "Failed to change password. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">Failed to load user data.</div>;
  }

  return (
    <div className="px-5 py-20 bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 relative">
            <Image
              src={"/logo.png"}
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
              priority
              className="rounded-full"
            />
          </div>
          <h2 className="text-xl font-semibold mt-4">{user && user.username}</h2>
          <p className="text-gray-600">{user && user.email}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Change Password
          </button>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
          <div className="mt-4 flex justify-between text-gray-600">
            <p>Total Orders:</p>
            <p>{ 0}</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Total Paid:</p>
            <p>${ 0}</p>
          </div>
        </div>
      </div>

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
