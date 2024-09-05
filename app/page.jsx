"use client";
import { useState } from "react";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

const LandingPage = () => {
  const [form, setForm] = useState("login");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-8 lg:p-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6">Welcome to <span className="text-blue-200">Smarty Cracks</span></h1>
        <p className="text-base lg:text-lg mb-6">
          {`Make your crack climbing training more interesting by
          challenging yourself on more varied routes and tracking your progress.`}
        </p>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-gray-800">
        {form == "login" ?
        <LogInForm changeForm={() => setForm("signup")} /> :
        <SignUpForm changeForm={() => setForm("login")} />}
      </div>
    </div>
  );
};

export default LandingPage;
