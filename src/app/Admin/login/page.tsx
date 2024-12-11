"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Input from "@/components/Form/Input";
import { RiUser5Fill } from "react-icons/ri";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.post("/api/users/login", formData);

      // Check if user is an admin
      const user = response.data;
  
     
      if (!user.isAdmin) {
        // If the user is not an admin, show an error message
        setErrorMessage("Only admins are allowed to log in.");
        toast.error("Only admins are allowed to log in.", {
          position: "top-right",
          richColors: true,
        });
        setLoading(false);
        return;
      }

      toast.success("Login successful!", {
        position: "top-right",
        richColors: true,
      });
      router.push("/Admin/Dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage =
          error.response.data?.error || "An error occurred. Please try again.";
        setErrorMessage(serverMessage);
        toast.error(serverMessage, {
          position: "top-right",
          richColors: true,
        });
      } else {
        const genericMessage =
          "Something went wrong. Please try again later.";
        setErrorMessage(genericMessage);
        toast.error(genericMessage, {
          position: "top-right",
          richColors: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-blue-100 flex flex-col items-center py-10 px-6"
    >
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Samir Bag and Jeans Repairing Center
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 mt-2 text-xl"
        >
          Welcome! Please log in to continue.
        </motion.p>
        <Link href={"/Admin"} className="p-2 mt-2 block text-white bg-blue-500 rounded-md">Go Back</Link>
      </header>

      <motion.main
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white shadow-md rounded-md p-8 w-full sm:w-[400px]"
      >
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="email"
            id="email"
            label="Email"
            value={formData.email}
            placeholder="Enter your email"
            required
            onChange={handleInputChange}
          />

          <div className="mb-6 relative">
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
              className="absolute top-7 inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading && { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 flex justify-center items-center rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 transition"
            }`}
          >
            {loading ? (
              <div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                role="status"
              ></div>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-4"
        >
          <Link
            href="/forgotpassword"
            className=" text-blue-500 hover:underline"
          >
            Forgot password
          </Link>
        </motion.p>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/Admin/signup" className="text-green-500 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.main>
    </motion.div>
  );
}
