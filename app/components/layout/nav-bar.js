"use client";

import { FaBars, FaUser } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export function NavBar() {
  const { data: user, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  console.log("User session data:", user);

  const handleButtonClick = () => {
    if (status === "authenticated") {
      if (user.user.role === "BUSINESS") {
        router.push("/business");
      }
      if (user.user.role === "USER") {
        router.push("/user");
      }
      if (user.user.role === "ADMIN") {
        router.push("/admin");
      }
    } else {
      router.push("/auth/login");
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace('/homepage');
  };


  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/homepage" className="text-xl font-bold text-gray-800">
              DevTools
            </a>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-4">
            <a href="/products" className="text-gray-600 hover:text-gray-900 absolute left-1/2 transform -translate-x-1/2">
              Products
            </a>
          </div>
          {status !== "loading" && (
            <div className="hidden md:flex items-center">
              <button
                onClick={handleButtonClick}
                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer"
              >
                {status === "authenticated" ? (
                  <>
                    <img
                      src={user.user.image}
                      alt="User Profile"
                      className="h-4 w-4 rounded-full mr-2"
                    />
                    <span>{user.user.name}</span>
                  </>
                ) : (
                  <>
                    <FaUser className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </button>
              {status === "authenticated" && (
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 hover:cursor-pointer"
                >
                  Logout
                </button>
              )}
            </div>
          )}
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? (
                <FaX className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/products"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Products
              </a>

              <div className="flex flex-row justify-center">
                <button
                  onClick={handleButtonClick}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  {status === "authenticated" ? (
                    <div className="flex flex-row items-center">
                      {/* Display user image if available */}
                      <img
                        src={user.user.image}
                        alt="User Profile"
                        className="h-4 w-4 rounded-full mr-2"
                      />
                      <span>{user?.user?.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center">
                      <FaUser className="h-4 w-4 mr-2" />
                      Sign In
                    </div>
                  )}
                </button>
                {status === "authenticated" && (
                  <button
                    onClick={handleLogout}
                    className="mt-4 ml-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
