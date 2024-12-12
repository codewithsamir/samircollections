"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  email: string;
  username: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [copyMessage, setCopyMessage] = useState(""); // State to handle success message
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/allusers");
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleAction = (userId: string, userName: string, action: string) => {
    switch (action) {
      case "addOrder":
        router.push(`/Admin/Dashboard/Users/addorder/${userName}_${userId}`);
        break;
      case "viewOrders":
        router.push(`/Admin/Dashboard/Users/checkorder/${userName}_${userId}`);
        break;
      case "copyUsername":
        navigator.clipboard.writeText(userName);
        setCopyMessage(`Username "${userName}" successfully copied!`);
        setTimeout(() => setCopyMessage(""), 3000); // Clear message after 3 seconds
        break;
      default:
        console.log("Unknown action");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by email"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full max-w-md"
      />

      {/* Success Message */}
      {copyMessage && (
        <div className="mb-4 text-green-600 bg-green-100 p-2 rounded-md">
          {copyMessage}
        </div>
      )}

      {/* Table for Displaying Users */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {/* Action Buttons */}
                <button
                  onClick={() => handleAction(user._id, user.username, "addOrder")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                >
                  Add Order
                </button>
                <button
                  onClick={() => handleAction(user._id, user.username, "viewOrders")}
                  className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                >
                  View Orders
                </button>
                <button
                  onClick={() => handleAction(user._id, user.username, "copyUsername")}
                  className="bg-gray-500 text-white px-3 py-1 rounded-md"
                >
                  Copy Username
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
