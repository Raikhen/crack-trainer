"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, app } from "/lib/firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpForm({ changeForm }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignUp(event) {
    console.log("handleSignUp");

    event.preventDefault();

    setError("");

    if (password !== confirmation) {
      setError("Passwords don't match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
      changeForm("login");
    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  }


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="johndoe@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                placeholder="Confirm your password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4 mt-6">
            <Button className="w-full">Create Account</Button>
            <div className="text-sm text-center">
              {`Already have an account? `}
              <a onClick={() => changeForm("login")} className="text-primary hover:underline cursor-pointer">
                Log in
              </a>
            </div>
          </div>
        </form>
      </CardContent>
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
    </Card>
  );
}