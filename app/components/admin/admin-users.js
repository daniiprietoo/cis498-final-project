"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/components/admin/admin-context";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

export default function AdminUsers() {
  const { admin, setAdmin } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  
  async function handleDeleteUser(id) {
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });

    if (!res.ok) {
      console.error("Failed to delete user");
      alert("Failed to delete user");
      return;
    }
    const deleted = await res.json();
    console.log("Deleted user:", deleted);
    alert("User deleted successfully");
    // 1) update the context admin.users array
    setAdmin({ ...admin, users: admin.users.filter((u) => u.id !== id) });
  }

  async function handleSave(id) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
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
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admin.users
              .filter(user => user.role.toLowerCase() === "user")  
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

      
    </div>
  );
}