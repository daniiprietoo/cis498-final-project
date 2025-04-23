"use client";

import Image from "next/image";
import { FiMail, FiCalendar } from "react-icons/fi";

export default function AdminProfile({ user }) {
  // Format date to show when user joined
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  const { name, email, image } = user;

  const joinDate = user.emailVerified ? formatDate(user.emailVerified) : "N/A";

  return (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-4">
        {user.image ? (
          <Image
            src={image}
            alt={name || "User"}
            width={96}
            height={96}
            className="rounded-full object-cover border-4 border-white shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-700 to-red-300 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-[#666666] mb-1">
        {user.name || "User"}
      </h2>

      <div className="flex items-center justify-center text-[#666666] text-sm mb-3">
        <FiMail className="mr-1" />
        <span>{email}</span>
      </div>

      <div className="flex items-center justify-center text-[#666666] text-sm">
        <FiCalendar className="mr-1" />
        <span>Joined {joinDate}</span>
      </div>

      <div className="mt-4">
        <a
          href="/settings"
          className="text-[#ff4500] text-sm hover:text-[#e03f00] transition font-bold"
        >
          Edit Profile
        </a>
      </div>
    </div>
  );
}
