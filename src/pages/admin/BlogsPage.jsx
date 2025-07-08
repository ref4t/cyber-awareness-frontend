import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Footer } from "../../components/Footer";
import API from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  const loadBlogs = () => {
    API.get("/blogs", { withCredentials: true })
      .then(res => setBlogs(res.data.blogs || []))
      .catch(() => setBlogs([]));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleChangeStatus = (id, status) => {
    API.put(
      `/admin/blogs/${id}/status`,
      { status },
      { withCredentials: true }
    )
      .then(() => {
        toast.success("Status updated");
        setStatusMap(prev => ({ ...prev, [id]: "" }));
        loadBlogs();
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <main className="flex-grow p-6 max-w-5xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-emerald-700">All Blogs</h2>
          <div className="space-y-4">
            {blogs.map(b => (
              <div
                key={b._id}
                className="flex items-center justify-between border p-4 rounded"
              >
                <p className="flex-1 font-medium">{b.title}</p>
                <select
                  value={statusMap[b._id] || b.status}
                  onChange={e =>
                    setStatusMap(prev => ({ ...prev, [b._id]: e.target.value }))
                  }
                  className="border rounded px-2 py-1 mr-2"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="archived">Archived</option>
                </select>
                <button
                  onClick={() => handleChangeStatus(b._id, statusMap[b._id] || b.status)}
                  className="px-3 py-1 bg-emerald-600 text-white rounded"
                >
                  Update
                </button>
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
