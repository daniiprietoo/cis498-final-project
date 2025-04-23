"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/components/admin/admin-context";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

export default function AdminBusiness() {
  const { admin, setAdmin } = useAdmin();
  const [newBiz, setNewBiz] = useState({
    name: "",
    email: "",
    role: "business",
    active: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "business",
    active: true,
  });

  // load all users (including business) into context
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/users");
      const users = await res.json();
      setAdmin({ ...admin, users });
    }
    load();
  }, []);

  // filter only business‐role entries
  const businesses = admin?.users?.filter(
    (u) => u.role.toLowerCase() === "business"
  ) || [];

  async function handleAdd() {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBiz),
    });
    const created = await res.json();
    setAdmin({ ...admin, users: [...admin.users, created] });
    setNewBiz({ name: "", email: "", role: "business", active: true });
  }

  async function handleDelete(id) {
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    setAdmin({
      ...admin,
      users: admin.users.filter((u) => u.id !== id),
    });
  }

  async function handleSave(id) {
    const payload = { id, ...editForm };
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updated = await res.json();
    setAdmin({
      ...admin,
      users: admin.users.map((u) => (u.id === id ? updated : u)),
    });
    setEditingId(null);
  }

  function startEdit(biz) {
    setEditingId(biz.id);
    setEditForm({
      name: biz.name,
      email: biz.email,
      role: biz.role,
      active: biz.active,
    });
  }

  return (
    <div className="p-4 text-[#666666]">
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-[#ff4500] rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((biz) => (
              <tr key={biz.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{biz.id}</td>
                {editingId === biz.id ? (
                  <>
                    <td className="py-2 px-4 border-b">
                      <input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <select
                        value={editForm.active ? "Active" : "Inactive"}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            active: e.target.value === "Active",
                          })
                        }
                        className="border p-1"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => handleSave(biz.id)}
                        aria-label="Save"
                      >
                        <FiCheck className="text-green-600" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        aria-label="Cancel"
                      >
                        <FiX className="text-gray-600" />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border-b">{biz.name}</td>
                    <td className="py-2 px-4 border-b">{biz.email}</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          biz.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {biz.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => startEdit(biz)}
                        aria-label="Edit"
                      >
                        <FiEdit className="text-[#666666]" />
                      </button>
                      <button
                        onClick={() => handleDelete(biz.id)}
                        aria-label="Delete"
                      >
                        <FiTrash2 className="text-[#666666]" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add new business form */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold">New Business</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newBiz.name}
            onChange={(e) =>
              setNewBiz({ ...newBiz, name: e.target.value })
            }
            className="border p-2 rounded flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={newBiz.email}
            onChange={(e) =>
              setNewBiz({ ...newBiz, email: e.target.value })
            }
            className="border p-2 rounded flex-1"
          />
          <select
            value={newBiz.active ? "Active" : "Inactive"}
            onChange={(e) =>
              setNewBiz({
                ...newBiz,
                active: e.target.value === "Active",
              })
            }
            className="border p-2 rounded"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-[#ff4500] text-white px-4 py-2 rounded font-bold"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}