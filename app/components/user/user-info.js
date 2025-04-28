"use client";

import Image from "next/image";
import { FiMail, FiCalendar, FiCheck, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useUser } from "./user-context";

export default function UserInfo({ user }) {
  const { setUser } = useUser();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (editing) {
      setForm({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [editing, user]);

  const handleSave = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      alert("Failed to update profile");
      return;
    }
    const updated = await res.json();
    setUser(updated);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSave} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#e03f00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#e03f00]"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <FiX className="mr-1" /> Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FiCheck className="mr-1" /> Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  const formatDate = dateString =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long"
    }).format(new Date(dateString));
  const joinDate = user.emailVerified ? formatDate(user.emailVerified) : "N/A";

  return (
    <div className="text-center space-y-4">

      <div className="relative w-24 h-24 mx-auto">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={96}
            height={96}
            className="rounded-full object-cover border-4 border-white shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-700 to-red-300 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </div>
      <h2 className="text-xl font-bold text-gray-800">{user.name || "User"}</h2>
      <div className="flex items-center justify-center text-gray-500 text-sm">
        <FiMail className="mr-1" />
        <span>{user.email}</span>
      </div>
      <div className="flex items-center justify-center text-gray-500 text-sm">
        <FiCalendar className="mr-1" />
        <span>Joined {joinDate}</span>
      </div>
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="mt-3 text-[#ff4500] text-sm hover:text-[#e03f00]"
      >
        Edit Profile
      </button>
    </div>
  );
}
