// src/pages/ViewBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/blogs/${id}`)
      .then(res => {
        if (res.data.success) {
          setBlog(res.data.blog);
        } else {
          toast.error(res.data.message || "Blog not found");
        }
      })
      .catch(() => toast.error("Failed to load blog"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700">Loading blog…</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">Blog not found</p>
        <Link to="/blog" className="ml-4 text-emerald-600 hover:underline">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
          {blog.imageUrl && (
            <img
              src={blog.imageUrl? `${import.meta.env.VITE_EXPRESS_BASE_URL}${blog.imageUrl}`: "/images/default_blog.png"}
              alt={blog.title}
              className="w-full h-80 object-cover rounded-md mb-6"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <span>By {blog.author?.name || "Unknown"}</span>
            <span className="mx-2">•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="prose prose-lg text-gray-700">
            {blog.content.split("\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-8 inline-block text-emerald-600 hover:underline"
          >
            ← Back to Blogs
          </Link>
        </div>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
