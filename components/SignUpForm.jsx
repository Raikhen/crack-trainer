"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "/lib/firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile
} from "react-firebase-hooks/auth";

export default function SignUpForm({ changeForm }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, errorUpdatingName] = useUpdateProfile(auth);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);

      if (res) {
        sessionStorage.setItem("user", email);
        updateProfile({ displayName: `${firstName} ${lastName}` });

        router.push("/dashboard");
      } else {
        toast.error("An error occurred.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="bg-gray-700 p-6 md:p-8 rounded shadow-lg w-full max-w-lg">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="mb-4 w-full">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full p-3 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full p-3 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            className="w-full p-3 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            className="w-full p-3 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-gray-400 text-sm text-center mt-6">
        Already have an account?{" "}
        <a onClick={changeForm} className="text-blue-400 hover:text-blue-300 cursor-pointer">
          Log in
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
