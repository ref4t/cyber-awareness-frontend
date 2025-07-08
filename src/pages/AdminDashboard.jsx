import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [roleMap, setRoleMap] = useState({});

  const loadData = () => {
    API.get("/admin/users", { withCredentials: true })
      .then(res => setUsers(res.data.users || []))
      .catch(() => setUsers([]));
    API.get("/admin/blogs/pending", { withCredentials: true })
      .then(res => setPendingBlogs(res.data.blogs || []))
      .catch(() => setPendingBlogs([]));
    API.get("/admin/campaigns/pending", { withCredentials: true })
      .then(res => {
        const camps =
          res.data.campaigns ||
          res.data.pendingCampaigns ||
          res.data.pending ||
          [];
        setPendingCampaigns(camps);
      })
      .catch(() => setPendingCampaigns([]));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddUser = e => {
    e.preventDefault();
    API.post("/admin/users", newUser, { withCredentials: true })
      .then(() => {
        toast.success("User added");
        setNewUser({ name: "", email: "", password: "" });
        loadData();
      })
      .catch(() => toast.error("Failed to add user"));
  };

  const handleDeleteUser = id => {
    if (!window.confirm("Delete this user?")) return;
    API.delete(`/admin/users/${id}`, { withCredentials: true })
      .then(() => {
        toast.success("User deleted");
        setUsers(users.filter(u => u._id !== id));
      })
      .catch(() => toast.error("Deletion failed"));
  };

  const handleChangeRole = (id, role) => {
    API.put(`/admin/users/${id}/role`, { role }, { withCredentials: true })
      .then(() => {
        toast.success("Role updated");
        setRoleMap({ ...roleMap, [id]: "" });
        loadData();
      })
      .catch(() => toast.error("Update failed"));
  };

  const approveBlog = id => {
    API.put(`/admin/blogs/${id}/approve`, {}, { withCredentials: true })
      .then(() => {
        toast.success("Blog approved");
        setPendingBlogs(pendingBlogs.filter(b => b._id !== id));
      })
      .catch(() => toast.error("Approval failed"));
  };

  const approveCampaign = id => {
    API.put(`/admin/campaigns/${id}/approve`, {}, { withCredentials: true })
      .then(() => {
        toast.success("Campaign approved");
        setPendingCampaigns(pendingCampaigns.filter(c => c._id !== id));
      })
      .catch(() => toast.error("Approval failed"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800 font-sans">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <main className="flex-grow p-6 space-y-8 max-w-5xl mx-auto">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">Add User</h2>
            <form onSubmit={handleAddUser} className="grid gap-4 md:grid-cols-3">
              <input
                className="border rounded px-3 py-2"
                placeholder="Name"
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Password"
                type="password"
                value={newUser.password}
                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                required
              />
              <button type="submit" className="bg-emerald-600 text-white rounded px-4 py-2 md:col-span-3">
                Add User
              </button>
            </form>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">Users</h2>
            <div className="space-y-4">
              {users.map(u => (
                <div key={u._id} className="flex flex-col md:flex-row items-center justify-between border p-4 rounded">
                  <div className="flex-1">
                    <p className="font-medium">{u.name} ({u.email})</p>
                    <p className="text-sm text-gray-600">Role: {u.role}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    <select
                      value={roleMap[u._id] || u.role}
                      onChange={e => setRoleMap({ ...roleMap, [u._id]: e.target.value })}
                      className="border rounded px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      onClick={() => handleChangeRole(u._id, roleMap[u._id] || u.role)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Change
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">Pending Blogs</h2>
            {pendingBlogs.length === 0 ? (
              <p className="text-gray-600">No blogs awaiting approval.</p>
            ) : (
              <div className="space-y-4">
                {pendingBlogs.map(b => (
                  <div key={b._id} className="flex items-center justify-between border p-4 rounded">
                    <p className="flex-1 font-medium">{b.title}</p>
                    <button
                      onClick={() => approveBlog(b._id)}
                      className="px-3 py-1 bg-emerald-600 text-white rounded"
                    >
                      Approve
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">Pending Campaigns</h2>
            {pendingCampaigns.length === 0 ? (
              <p className="text-gray-600">No campaigns awaiting approval.</p>
            ) : (
              <div className="space-y-4">
                {pendingCampaigns.map(c => (
                  <div key={c._id} className="flex items-center justify-between border p-4 rounded">
                    <p className="flex-1 font-medium">{c.title}</p>
                    <button
                      onClick={() => approveCampaign(c._id)}
                      className="px-3 py-1 bg-emerald-600 text-white rounded"
                    >
                      Approve
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
