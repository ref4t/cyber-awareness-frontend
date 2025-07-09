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
      .then((res) => setBlogs(res.data.blogs || []))
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
        setStatusMap((prev) => ({ ...prev, [id]: "" }));
        loadBlogs();
      })
      .catch(() => toast.error("Update failed"));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      await API.delete(`/blogs/${id}`, { withCredentials: true });
      toast.success("Blog deleted");
      loadBlogs();
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <main className="flex-grow p-6 max-w-6xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-emerald-700 mb-6">Manage Blogs</h2>

          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            {blogs.length === 0 ? (
              <p className="text-center text-gray-500">No blogs found.</p>
            ) : (
              blogs.map((b) => (
                <div
                  key={b._id}
                  className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-emerald-800">
                      {b.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      <span className="capitalize font-medium text-gray-700">
                        {b.status}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <select
                      value={statusMap[b._id] || b.status}
                      onChange={(e) =>
                        setStatusMap((prev) => ({
                          ...prev,
                          [b._id]: e.target.value,
                        }))
                      }
                      className="border rounded px-3 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="archived">Archived</option>
                    </select>

                    <button
                      onClick={() =>
                        handleChangeStatus(b._id, statusMap[b._id] || b.status)
                      }
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded text-sm font-medium"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(b._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
