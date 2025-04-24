"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      router.push("/homepage");
      setIsLoading(false);
    } catch (error) {
      setError("Something went wrong. Please try again.");
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center font-mono text-sm text-[#666666]">
            Or{" "}
            <Link 
              href="/auth/register" 
              className="font-medium font-monotext-[#ff4500] hover:text-[#e03f00]"
            >
              create a new account
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

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm font-mono">
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
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#ff4500] focus:outline-none focus:ring-[#e03f00] sm:text-sm"
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#ff4500] focus:outline-none focus:ring-[#e03f00] sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent font-mono bg-[#ff4500] py-2 px-4 text-sm font-medium text-white hover:bg-[#e03f00] focus:outline-none focus:ring-2 focus:ring-[#e03f00] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#F8F8F8] font-mono px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGithubSignIn}
              className="group relative flex w-full justify-center items-center gap-3 rounded-md border font-mono border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-[#e03f00] focus:ring-offset-2"
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