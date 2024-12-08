"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Input from "@/components/Form/Input";

interface SignupFormData {
  name: string;
  email: string;
  address:string;
  password: string;
  confirmPassword: string;
}

export default function Signup(): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<{ message: string }>("/api/users/signup", {
        username: formData.name,
        email: formData.email,
        address:formData.address,
        password: formData.password,
      });

      toast.success(response.data.message || "Account created successfully!", {
        position: "top-right",
        richColors: true,
      });
      setTimeout(() => router.push("/Dashboard"), 2000);
    } catch (error: any) {
      const backendErrorMessage =
        error.response?.data?.error || "Failed to create account. Please try again.";
      setErrorMessage(backendErrorMessage);

      toast.error(backendErrorMessage, {
        position: "top-right",
        richColors: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen py-10 bg-red-100 flex flex-col items-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.header
        className="text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">
          Samir Bag and Jeans Repairing Center
        </h1>
        <p className="text-gray-600 mt-2 text-xl">
          Join us by creating an account!
        </p>
      </motion.header>

      <motion.main
        className="bg-white shadow-md rounded-md p-8 w-full sm:w-[400px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h2 className="text-center text-xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleFormSubmit}>
        <Input
  type="text"
  id="name"
  label="Full Name"
  value={formData.name}
  placeholder="Enter your full name"
  required
  onChange={handleInputChange}
/>

<Input
  type="email"
  id="email"
  label="Email"
  value={formData.email}
  placeholder="Enter your email"
  required
  onChange={handleInputChange}
/>

<Input
  type="text"
  id="address"
  label="Address"
  value={formData.address}
  placeholder="Enter your address"
  required
  onChange={handleInputChange}
/>

         
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-11 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-11 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {errorMessage && (
            <motion.p
              className="text-red-500 text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errorMessage}
            </motion.p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md flex justify-center items-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700 transition"
            }`}
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 hover:underline">
            Log in
          </Link>
        </p>
      </motion.main>
    </motion.div>
  );
}
