import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/user/data")
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageFile);
    try {
      await API.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Blog created successfully");
      navigate("/blog");
    } catch {
      toast.error("Failed to create blog");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 font-sans">
      <Navbar />
      <div className="flex flex-grow">
        <DashboardSidebar user={user} />
        <main className="flex-grow max-w-3xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">Create Blog</h2>
          <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-1">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-1">Content</label>
              <textarea
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                rows="6"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-1">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-emerald-600 border border-emerald-300 rounded-lg cursor-pointer focus:outline-none"
                onChange={e => setImageFile(e.target.files[0])}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold shadow-sm transition"
            >
              Submit
            </button>
          </form>
        </main>
      </div>
      <ToastContainer position="bottom-right" theme="light" />
      <Footer />
    </div>
  );
};

export default CreateBlog;
