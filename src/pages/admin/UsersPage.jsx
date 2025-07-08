// src/pages/admin/UsersPage.jsx
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Footer } from "../../components/Footer";
import API from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roleMap, setRoleMap] = useState({});

  const loadUsers = async () => {
    try {
      const res = await API.get("/admin/users", { withCredentials: true });
      setUsers(res.data.users || []);
    } catch (err) {
      toast.error("Failed to load users");
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangeRole = async (id, role) => {
    try {
      await API.put(
        `/admin/users/${id}/role`,
        { role },
        { withCredentials: true }
      );
      toast.success(`Role updated to ${role}`);
      setRoleMap(prev => ({ ...prev, [id]: "" }));
      loadUsers();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`, { withCredentials: true });
      toast.success("User deleted");
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <main className="flex-grow p-6 max-w-5xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold mb-4 text-emerald-700">Users</h2>
          <div className="space-y-4">
            {users.map(u => (
              <div
                key={u._id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded"
              >
                <div className="flex-1">
                  <p className="font-medium">{u.name} ({u.email})</p>
                  <p className="text-sm text-gray-600">Current Role: {u.role}</p>
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <select
                    value={roleMap[u._id] || u.role}
                    onChange={e =>
                      setRoleMap(prev => ({ ...prev, [u._id]: e.target.value }))
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="general">General</option>
                    <option value="business">Business</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => handleChangeRole(u._id, roleMap[u._id] || u.role)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Change
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
