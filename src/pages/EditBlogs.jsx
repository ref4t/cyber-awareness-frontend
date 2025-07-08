// src/pages/EditBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    // fetch current user for sidebar
    API.get("/user/data", { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => {})
      .finally(() => setLoadingUser(false));

    // fetch blog data (include pending)
    API.get(`/blogs/${id}?all=true`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          const b = res.data.blog;
          setTitle(b.title);
          setContent(b.content);
          setImageUrl(b.imageUrl);
        } else {
          toast.error(res.data.message || "Blog not found");
          navigate("/dashboard");
        }
      })
      .catch(() => {
        toast.error("Failed to load blog");
        navigate("/dashboard");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // preview
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("image", file);
    } else {
      formData.append("imageUrl", imageUrl);
    }

    try {
      await API.put(`/blogs/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Blog updated");
      navigate("/dashboard");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loadingUser || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-grow">
        <DashboardSidebar user={user} />
        <main className="flex-grow p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-emerald-400"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                className="w-full border rounded px-3 py-2 h-40 focus:ring-2 focus:ring-emerald-400"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover mb-2 rounded" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Update Blog
            </button>
          </form>
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}