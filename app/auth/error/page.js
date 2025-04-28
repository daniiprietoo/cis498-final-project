import Link from "next/link";
import { Suspense } from "react";
import ErrorDetails from "./error-details";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F8F8] py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-gray-900">
            Dev Tools Platform
          </h1>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-red-600">
            Authentication Error
          </h2>
        </div>

        <Suspense
          fallback={
            <div className="text-center text-gray-500">
              Loading error details...
            </div>
          }
        >
          <ErrorDetails />
        </Suspense>

        <div className="flex flex-col space-y-4">
          <Link
            href="/auth/login"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to sign in
          </Link>

          <Link
            href="/auth/register"
            className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
