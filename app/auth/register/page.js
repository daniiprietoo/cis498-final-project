"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("USER");
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    /*INPUT VALIDATION*/
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (accountType === "BUSINESS" && !businessName) {
      setError("Business name is required");
      setIsLoading(false);
      return;
    }

    try {
      const registrationData = {
        name,
        email,
        password,
        role: accountType,
        ...(accountType === "BUSINESS" && { businessName, businessDescription }),
      };

      const response = await fetch("/api/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      /*SIGN IN*/
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError("Registration successful, but auto sign-in failed. Please log in manually.");
        setIsLoading(false);
        router.push("/auth/login"); 
        return;
      }

      router.push(accountType === "BUSINESS" ? "/business/dashboard" : "/homepage"); 

    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/homepage" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F8F8] py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center text-4xl font-extrabold font-mono text-gray-900">
          <span className="text-[#ff4500]">DevTools</span> Platform
          </h1>
          <h2 className="mt-6 text-center text-3xl font-bold font-mono tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center font-mono text-sm text-[#666666]">
            Or{" "}
            <Link 
              href="/auth/login" 
              className="font-medium font-mono text-[#ff4500] hover:text-[#e03f00]"
            >
              sign in to existing account
            </Link>
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6 font-mono" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Account Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="user-account"
                    name="account-type"
                    type="radio"
                    value="USER"
                    checked={accountType === "USER"}
                    onChange={() => setAccountType("USER")}
                    className="h-4 w-4 border-gray-300 text-[#ff4500] focus:ring-[#e03f00]"
                  />
                  <label htmlFor="user-account" className="ml-2 block text-sm text-gray-900">
                    Individual
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="business-account"
                    name="account-type"
                    type="radio"
                    value="BUSINESS"
                    checked={accountType === "BUSINESS"}
                    onChange={() => setAccountType("BUSINESS")}
                    className="h-4 w-4 border-gray-300 text-[#ff4500] focus:ring-[#e03f00]"
                  />
                  <label htmlFor="business-account" className="ml-2 block text-sm text-gray-900">
                    Business
                  </label>
                </div>
              </div>
            </div>

            {/* Common Fields */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#ff4500] focus:outline-none focus:ring-[#e03f00] sm:text-sm"
                  placeholder={accountType === "BUSINESS" ? "Contact Person Name" : "Full Name"}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#ff4500] focus:outline-none focus:ring-[#e03f00] sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#ff4500] focus:outline-none focus:ring-[#e03f00] sm:text-sm"
                  placeholder="Password"
                  minLength={8}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#ff4500] focus:outline-none focus:ring-[#e03f00] sm:text-sm"
                  placeholder="Confirm password"
                  minLength={8}
                />
              </div>
            </div>

            {/* Business-specific Fields */}
            {accountType === "BUSINESS" && (
              <div className="space-y-4 mt-4 pt-4 border-t text-gray-900 border-gray-200">
                <h3 className="text-lg font-medium ">Business Information</h3>
                <div>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff4500] focus:ring-[#e03f00] sm:text-sm"
                    placeholder="Business name"
                  />
                </div>
                <div>
                
                  <textarea
                    id="businessDescription"
                    name="businessDescription"
                    rows="3"
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-[#ff4500] focus:ring-[#e03f00] sm:text-sm"
                    placeholder="Business description"
                  ></textarea>
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#ff4500] py-2 px-4 text-sm font-medium text-white hover:bg-[#e03f00] focus:outline-none focus:ring-2 focus:ring-[#e03f00] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm font-mono">
              <span className="bg-[#F8F8F8] px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 font-mono">
            <button
              onClick={handleGithubSignIn}
              className="group relative flex w-full justify-center items-center gap-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-[#e03f00] focus:ring-offset-2"
            >
              <FaGithub className="h-5 w-5" />
              <span>Continue with GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}