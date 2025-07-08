import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Footer } from "../../components/Footer";
import API from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApprovalsPage() {
  const [blogs, setBlogs] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const loadPending = () => {
    API.get("/admin/blogs/pending", { withCredentials: true })
      .then(res => setBlogs(res.data.blogs || []))
      .catch(() => setBlogs([]));
    API.get("/admin/campaigns/pending", { withCredentials: true })
      .then(res => setCampaigns(res.data.campaigns || []))
      .catch(() => setCampaigns([]));
  };

  useEffect(() => {
    loadPending();
  }, []);

  const approveBlog = id => {
    API.put(`/admin/blogs/${id}/approve`, {}, { withCredentials: true })
      .then(() => {
        toast.success("Blog approved");
        setBlogs(prev => prev.filter(b => b._id !== id));
      })
      .catch(() => toast.error("Approval failed"));
  };

  const approveCampaign = id => {
    API.put(`/admin/campaigns/${id}/approve`, {}, { withCredentials: true })
      .then(() => {
        toast.success("Campaign approved");
        setCampaigns(prev => prev.filter(c => c._id !== id));
      })
      .catch(() => toast.error("Approval failed"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <main className="flex-grow p-6 max-w-5xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-emerald-700 mb-4">Pending Blogs</h2>
            {blogs.length === 0 ? (
              <p className="text-gray-600">No blogs awaiting approval.</p>
            ) : (
              blogs.map(b => (
                <div
                  key={b._id}
                  className="flex items-center justify-between border p-4 rounded mb-4"
                >
                  <p className="font-medium">{b.title}</p>
                  <button
                    onClick={() => approveBlog(b._id)}
                    className="px-3 py-1 bg-emerald-600 text-white rounded"
                  >
                    Approve
                  </button>
                </div>
              ))
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-emerald-700 mb-4">Pending Campaigns</h2>
            {campaigns.length === 0 ? (
              <p className="text-gray-600">No campaigns awaiting approval.</p>
            ) : (
              campaigns.map(c => (
                <div
                  key={c._id}
                  className="flex items-center justify-between border p-4 rounded mb-4"
                >
                  <p className="font-medium">{c.title}</p>
                  <button
                    onClick={() => approveCampaign(c._id)}
                    className="px-3 py-1 bg-emerald-600 text-white rounded"
                  >
                    Approve
                  </button>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}