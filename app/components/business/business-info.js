"use client";

import Image from "next/image";
import { FiMail, FiCalendar, FiBriefcase } from "react-icons/fi";

export default function BusinessInfo({ user, business }) {
  if (!user && !business) return null;

  // Format date to show when user joined
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  const { name: userName, email, image } = user || {};
  const joinDate = user?.emailVerified ? formatDate(user.emailVerified) : "N/A";

  const { name: businessName, description, status } = business || {};

  return (
    <div className="text-center">
      {user && (
        <>
          <div className="relative w-24 h-24 mx-auto mb-4">
            {user.image ? (
              <Image
                src={image}
                alt={userName || "User"}
                width={96}
                height={96}
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-700 to-red-300 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {userName || "User"}
          </h2>

          <div className="flex items-center justify-center text-gray-500 text-sm mb-3">
            <FiMail className="mr-1" />
            <span>{email}</span>
          </div>

          <div className="flex items-center justify-center text-gray-500 text-sm">
            <FiCalendar className="mr-1" />
            <span>Joined {joinDate}</span>
          </div>

          <div className="mt-4">
            <a
              href="/settings"
              className="text-[#ff4500] text-sm hover:text-[#e03f00] transition"
            >
              Edit Profile
            </a>
          </div>
        </>
      )}

      {business && (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center mt-6">
          <div className="flex items-center justify-center mb-2">
            <FiBriefcase className="h-6 w-6 mr-2 text-[#ff4500]" />
            <h2 className="text-2xl font-bold">{businessName}</h2>
          </div>
          <p className="text-gray-600 mb-4">{description}</p>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs ${
              status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {status ? "Active" : "Inactive"}
          </span>
        </div>
      )}
    </div>
  );
}
