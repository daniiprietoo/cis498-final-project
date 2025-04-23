"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/components/admin/admin-context";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

export default function AdminUsers() {
  const { admin, setAdmin } = useAdmin();
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user", active: true });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "user", active: true });

  // Initial fetch (after layout’s provider)
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/users");
      const users = await res.json();
      setAdmin({ ...admin, users });
    }
    load();
  }, []);

  async function handleAddUser() {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const created = await res.json();
    setAdmin({ ...admin, users: [...admin.users, created] });
    setNewUser({ name: "", email: "", role: "user", active: true });
  }

  async function handleDeleteUser(id) {
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    setAdmin({ ...admin, users: admin.users.filter((u) => u.id !== id) });
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
  
  // Start edit
  function startEdit(user) {
    setEditingId(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
    });
  }

  return (
    <div className="p-4 text-[#666666]">
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-[#ff4500] rounded-lg ">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admin.users
              .filter(user => user.role.toLowerCase() === "user")  // only USERs
              .map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.id}</td>

                  {editingId === user.id ? (
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
                        <input
                          value={editForm.role}
                          onChange={(e) =>
                            setEditForm({ ...editForm, role: e.target.value })
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
                          onClick={() => handleSave(user.id)}
                          aria-label="Save changes"
                        >
                          <FiCheck className="text-green-600" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          aria-label="Cancel edit"
                        >
                          <FiX className="text-gray-600" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4 border-b">{user.name || "N/A"}</td>
                      <td className="py-2 px-4 border-b">{user.email}</td>
                      <td className="py-2 px-4 border-b">{user.role}</td>
                      <td className="py-2 px-4 border-b">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b space-x-2">
                        <button
                          onClick={() => startEdit(user)}
                          aria-label="Edit user"
                        >
                          <FiEdit className="text-[#666666]" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          aria-label="Delete user"
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

      {/* Add new user form */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold">New User</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ ...newUser, name: e.target.value })
            }
            className="border p-2 rounded flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) =>
              setNewUser({ ...newUser, role: e.target.value })
            }
            className="border p-2 rounded w-24"
          />
          <select
            value={newUser.active ? "Active" : "Inactive"}
            onChange={(e) =>
              setNewUser({ ...newUser, active: e.target.value === "Active" })
            }
            className="border p-2 rounded"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button
            onClick={handleAddUser}
            className="bg-[#ff4500] text-white px-4 py-2 rounded font-bold"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}