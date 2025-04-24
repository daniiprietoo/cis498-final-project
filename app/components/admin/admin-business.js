"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/components/admin/admin-context";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

export default function AdminBusiness() {
  const { admin, setAdmin } = useAdmin();
  const [editingBusinessId, setEditingBusinessId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [editBusinessForm, setEditBusinessForm] = useState({
    name: "",
    status: true,
  });

  // filter only business‐role entries
  const businessUsers = admin?.users?.filter(
    (u) => u.role === "BUSINESS"
  ) || [];

  const businesses = admin.businesses

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

  async function handleSaveUser(userId) {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUserForm),
    });
    const updated = await res.json();
    setAdmin({
      ...admin,
      users: admin.users.map((u) => (u.id === userId ? updated : u)),
    });
    setEditingUserId(null);
  }

  async function handleDeleteBusiness(id) {
    const res = await fetch(`/api/admin/business/${id}`, { method: "DELETE" });

    if (!res.ok) {
      console.error("Failed to delete business");
      alert("Failed to delete business");
      return;
    }
    const deleted = await res.json();
    console.log("Deleted business:", deleted);
    alert("Business deleted successfully");
    // 1) update the context admin.users array
    setAdmin({ ...admin, business: admin.business.filter((b) => b.id !== id) });
  }

  async function handleSaveBusiness(id) {
    const res = await fetch(`/api/admin/business/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editBusinessForm),
    });
    const updated = await res.json();
    setAdmin({
      ...admin,
      business: admin.business.map((b) => (b.id === id ? updated : b)),
    });
    setEditingBusinessId(null);
  }

  function startEditUser(u) {
    setEditingUserId(u.id);
    setEditUserForm({
      name: u.name,
      email: u.email,
      role: u.role,
    });
  }

  function startEditBusiness(biz) {
    setEditingBusinessId(biz.id);
    setEditBusinessForm({
      name: biz.name,
      status: biz.status,
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
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessUsers.map((biz) => (
              <tr key={biz.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{biz.id}</td>
                {editingUserId === biz.id ? (
                  <>
                    <td className="py-2 px-4 border-b">
                      <input
                        value={editUserForm.name}
                        onChange={(e) =>
                          setEditUserForm({ ...editUserForm, name: e.target.value })
                        }
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        value={editUserForm.email}
                        onChange={(e) =>
                          setEditUserForm({ ...editUserForm, email: e.target.value })
                        }
                        className="border p-1 w-full"
                      />
                    </td>
                    
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => handleSaveUser(biz.id)}
                        aria-label="Save"
                      >
                        <FiCheck className="text-green-600" />
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
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
              
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => startEditUser(biz)}
                        aria-label="Edit"
                      >
                        <FiEdit className="text-[#666666]" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(biz.id)}
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

      <div className="overflow-x-auto mb-6">
        <h1 className="text-2xl font-bold mb-4">Businesses Accounts</h1>
        <table className="min-w-full bg-white border border-[#ff4500] rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((biz) => (
              <tr key={biz.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{biz.id}</td>
                {editingBusinessId === biz.id ? (
                  <>
                    <td className="py-2 px-4 border-b">
                      <input
                        value={editBusinessForm.name}
                        onChange={(e) =>
                          setEditBusinessForm({ ...editBusinessForm, name: e.target.value })
                        }
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <select
                        value={editBusinessForm.active ? "Active" : "Inactive"}
                        onChange={(e) =>
                          setEditBusinessForm({
                            ...editBusinessForm,
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
                        onClick={() => handleSaveBusiness(biz.id)}
                        aria-label="Save"
                      >
                        <FiCheck className="text-green-600" />
                      </button>
                      <button
                        onClick={() => setEditingBusinessId(null)}
                        aria-label="Cancel"
                      >
                        <FiX className="text-gray-600" />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border-b">{biz.name}</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          biz.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {biz.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => startEditBusiness(biz)}
                        aria-label="Edit"
                      >
                        <FiEdit className="text-[#666666]" />
                      </button>
                      <button
                        onClick={() => handleDeleteBusiness(biz.id)}
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

    </div>
  );
}