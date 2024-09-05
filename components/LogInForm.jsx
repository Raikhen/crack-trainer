"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "/lib/firebase/config.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogInForm({ changeForm}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleLogin = async (e) => {
    console.log("Logging in...");

    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(email, password);

      if (res) {
        sessionStorage.setItem('user', email);
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (error) {
      toast.error("Invalid credentials.");
    }
  };
  
  return (
    <div className="bg-gray-700 p-6 md:p-8 rounded shadow-lg w-full max-w-sm">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            className="w-full p-3 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            className="w-full p-3 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </div>
      </form>
      <p className="text-gray-400 text-sm text-center mt-6">
        Don&apos;t have an account?{" "}
        <a onClick={changeForm} className="text-blue-400 hover:text-blue-300 cursor-pointer">
          Sign up
        </a>
      </p>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}