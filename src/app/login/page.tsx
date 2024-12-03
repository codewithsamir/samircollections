"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setLoading(true);

    try {
      const response = await axios.post("https://example.com/api/login", formData); // Replace with your server URL
      console.log("Login successful:", response.data);
      alert("Login successful!"); // Handle success (e.g., redirect or token storage)
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" px-5 py-20 bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Samir Bag and Jeans Preparing Center
        </h1>
        <p className="text-gray-600 mt-2">Welcome! Please log in to continue.</p>
      </header>

      <main className="bg-white shadow-md rounded-md p-8 w-96">
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 transition"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </main>
    </div>
  );
}
