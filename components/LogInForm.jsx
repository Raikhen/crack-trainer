"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "/lib/firebase/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LogInForm({ changeForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );

      console.log('here');

      const idToken = await credential.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      router.push("/dashboard");
    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  }
  
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4 mt-6">
            <Button className="w-full" type="submit">Sign In</Button>
            <div className="text-sm text-center">
              {`Don't have an account? `}
              <a onClick={() => changeForm("signup")} className="text-primary hover:underline cursor-pointer">
                Sign up
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