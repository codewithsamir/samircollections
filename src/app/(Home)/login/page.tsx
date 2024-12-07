"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter(); // Import useRouter hook from Next.js
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
    setErrorMessage(""); // Clear previous errors
    setLoading(true);

    try {
       await axios.post("/api/users/login", formData); // Replace with your server URL
      // console.log("Login successful:", response.data);
      
      toast.success('Login successful!',{
        position: "top-right",
        richColors:true,
      });
      router.push("/Dashboard"); // Redirect to dashboard if successful
    } catch (error) {
      const typedError = error as Error;
      console.error("Login failed:", typedError.message);
      // setErrorMessage("Invalid email or password. Please try again.");
      toast.error('Invalid email or password. Please try again.',{
        position: "top-right",
        richColors:true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-100 flex flex-col items-center py-10 px-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Samir Bag and Jeans Repairing Center</h1>
        <p className="text-gray-600 mt-2 text-xl">Welcome! Please log in to continue.</p>
      </header>

      <main className="bg-white shadow-md rounded-md p-8 w-full sm:w-[400px]">
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700 transition"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
     <p className="text-center">
     <Link href="/forgotpassword" className=" text-blue-500 hover:underline">Forgot password</Link>
     </p>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-red-500 hover:underline">
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}
