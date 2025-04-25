"use client";

import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

export default function EditProductForm({ product, onCancel, onSave }) {
  const [form, setForm] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    url: product.url || "",
    status: product.status || "",
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch(`/api/business/product`, {
      method: "PUT",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert("Update failed");
      const { error } = await res.json();
      console.log(error);
      setSubmitting(false);
      return;
    }
    const { updated } = await res.json();
    onSave(updated);
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Category</label>
          <select
            name="category"
            id="category"
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 w-full border px-2 py-1 rounded"
          >
            <option value="plugins">Plugins</option>
            <option value="themes">Themes</option>
            <option value="extensions">Extensions</option>
            <option value="libraries">Libraries</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm">Description</label>
        <textarea
          name="description"
          id="description"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Price</label>
          <input
            name="price"
            id="price"
            required
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="mt-1 w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">URL</label>
          <input
            name="url"
            id="url"
            type="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="mt-1 w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Status</label>
          <select
            name="status"
            id="status"
            required
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="mt-1 w-full border px-2 py-1 rounded"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {submitting ? "Saving…" : <FiCheck />}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          <FiX />
        </button>
      </div>
    </form>
  );
}
