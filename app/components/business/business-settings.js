"use client";

import { useState } from "react";
import { BUSINESS_QUERIES } from "@/lib/db/actions";
import { useBusiness } from "./business-context";

export default function BusinessSettingsForm({ initialData }) {
  const { setBusiness } = useBusiness();
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    fd.append("name", name);
    fd.append("description", description);

    try {
      const res = await fetch("/api/business/info", {
        method: "PUT",
        body: fd,
      });

      if (!res.ok) {
        throw new Error("Failed to update business settings");
      }

      const { business } = await res.json();
      setBusiness(() => {
        return {
          ...business,
          name: business.name,
          description: business.description,
        };
      });
    } catch (error) {
      console.error("Error updating business settings:", error);
      alert("Failed to update business settings. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
      <h2 className="text-2xl font-bold">Business Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Business Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-[#FF4500] text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
