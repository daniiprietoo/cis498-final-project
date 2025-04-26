"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/business/product", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const { error: msg } = await res.json();
      setError(msg || "Upload failed");
      setSubmitting(false);
      return;
    }

    // on success, go back to list
    router.push("/business/products");
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-6 bg-white p-6 shadow rounded-lg"
    >
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="text-2xl font-bold">New Product</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Product Name
        </label>
        <input
          name="name"
          id="name"
          type="text"
          required
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          required
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            name="price"
            id="price"
            type="number"
            step="0.01"
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select
            name="category"
            id="category"
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option value="plugins">Plugins</option>
            <option value="themes">Themes</option>
            <option value="extensions">Extensions</option>
            <option value="libraries">Libraries</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium">
          Product URL
        </label>
        <input
          name="url"
          id="url"
          type="url"
          placeholder="https://..."
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium">
          Main Image
        </label>
        <input
          name="image"
          id="image"
          type="file"
          accept="image/*"
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-[#FF4500] hover:bg-[#e03f00] text-white rounded disabled:opacity-50"
      >
        {submitting ? "Adding…" : "Add Product"}
      </button>
    </form>
  );
}
