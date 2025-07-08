// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { Footer } from "../components/Footer";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, Edit2, Trash2 } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const navigate = useNavigate();

  const statusClasses = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    archived: "bg-gray-200 text-gray-600",
  };

  useEffect(() => {
    API.get("/user/data", { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => toast.error("Failed to load user"))
      .finally(() => setLoadingUser(false));

    API.get("/campaigns", { withCredentials: true })
      .then(res => setCampaigns(res.data.campaigns || []))
      .catch(() => toast.error("Failed to load campaigns"))
      .finally(() => setLoadingCampaigns(false));

    API.get("/blogs", { withCredentials: true })
      .then(res => setBlogs(res.data.blogs || []))
      .catch(() => toast.error("Failed to load blogs"))
      .finally(() => setLoadingBlogs(false));
  }, []);

  const handleDeleteCampaign = async id => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/api/campaigns/${id}`, { withCredentials: true });
      setCampaigns(c => c.filter(x => x._id !== id));
      toast.success("Campaign deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleDeleteBlog = async id => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await API.delete(`/api/blogs/${id}`, { withCredentials: true });
      setBlogs(b => b.filter(x => x._id !== id));
      toast.success("Blog deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700">Loading…</p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">Please log in to view your dashboard.</p>
      </div>
    );
  }

  const myCamps = campaigns.filter(c => c.createdBy._id === user._id);
  const myBlogs = blogs.filter(b => b.author?._id === user._id);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-grow">
        <DashboardSidebar user={user} />
        <main className="flex-grow p-8">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Welcome back, {user.name}</h2>
            <p className="text-gray-600 mt-1">{user.email}</p>
            <p className="mt-2">
              Role: <span className="font-medium capitalize">{user.role}</span>
            </p>
          </div>

          {/* Campaigns Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">My Campaigns</h3>
              <button
                onClick={() => navigate("/campaigns/create")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                + New Campaign
              </button>
            </div>
            {loadingCampaigns ? (
              <p className="text-gray-500">Loading campaigns…</p>
            ) : myCamps.length === 0 ? (
              <p className="text-gray-500">No campaigns yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myCamps.map(camp => (
                  <div
                    key={camp._id}
                    className="bg-white rounded-lg shadow hover:shadow-md transition p-6 flex flex-col"
                  >
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">{camp.title}</h4>
                      <p className="text-gray-600 line-clamp-3 mb-4">{camp.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>
                        {new Date(camp.startTime).toLocaleDateString()} – {new Date(camp.endTime).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${statusClasses[camp.status]}`}>
                        {camp.status}
                      </span>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => navigate(`/campaigns/${camp._id}`)}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-5 w-5 mr-1" /> View
                      </button>
                      <button
                        onClick={() => navigate(`/campaigns/${camp._id}/edit`)}
                        className="flex items-center text-yellow-600 hover:text-yellow-800"
                      >
                        <Edit2 className="h-5 w-5 mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCampaign(camp._id)}
                        className="flex items-center text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5 mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Blogs Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">My Blogs</h3>
              <button
                onClick={() => navigate("/blog/create")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                + New Blog
              </button>
            </div>
            {loadingBlogs ? (
              <p className="text-gray-500">Loading blogs…</p>
            ) : myBlogs.length === 0 ? (
              <p className="text-gray-500">No blogs yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myBlogs.map(blog => (
                  <div
                    key={blog._id}
                    className="bg-white rounded-lg shadow hover:shadow-md transition p-6 flex flex-col"
                  >
                    <div className="flex-1 mb-4">
                      <h4 className="text-lg font-bold text-gray-800">{blog.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full ${statusClasses[blog.status]}`}>{blog.status}</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-5 w-5 mr-1" /> View
                      </button>
                      <button
                        onClick={() => navigate(`/blog/${blog._id}/edit`)}
                        className="flex items-center text-yellow-600 hover:text-yellow-800"
                      >
                        <Edit2 className="h-5 w-5 mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="flex items-center text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5 mr-1" /> Delete
                      </button>
                    </div>
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