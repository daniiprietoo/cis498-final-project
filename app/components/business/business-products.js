"use client";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useBusiness } from "./business-context";
import { useEffect, useState } from "react";
import EditProductForm from "./edit-product-form";

export default function BusinessProductsTab() {
  const { business, setBusiness } = useBusiness();
  const [editingProductId, setEditingProductId] = useState(null);

  function startEditProduct(product) {
    setEditingProductId(product.id);
  }

  async function handleDeleteProduct(productId) {
    const res = await fetch(`/api/business/product`, {
      method: "DELETE",
      body: JSON.stringify({ id: productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }
    const updatedProducts = business.products.filter((p) => p.id !== productId);
    setBusiness({ ...business, products: updatedProducts });
  }

  return (
    <div className="p-4">
      <div className="space-y-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {business.products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                {editingProductId === p.id ? (
                  <td colSpan={7}>
                    <EditProductForm
                      product={p}
                      onCancel={() => setEditingProductId(null)}
                      onSave={(updated) => {
                        setBusiness((prev) => ({
                          ...prev,
                          products: prev.products.map((x) =>
                            x.id === updated.id ? { ...x, ...updated } : x
                          ),
                        }));
                        setEditingProductId(null);
                      }}
                    />
                  </td>
                ) : (
                  <>
                    <td className="px-4 py-2">{p.id}</td>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">${p.price}</td>
                    <td className="px-4 py-2">{p.category}</td>
                    <td className="px-4 py-2">
                      {p.status === "ACTIVE" ? (
                        <span className="text-green-500">Active</span>
                      ) : (
                        <span className="text-red-500">Inactive</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => startEditProduct(p)}
                        aria-label="Edit"
                      >
                        <FiEdit className="text-[#666]" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        aria-label="Delete"
                      >
                        <FiTrash2 className="text-[#666]" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
