// src/pages/Blogs.jsx
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/blogs")
      .then(res => setBlogs(res.data.blogs || []))
      .catch(() => setBlogs([]));
  }, []);

  // only show approved posts
  const approvedBlogs = blogs.filter(b => b.status === "approved");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-100 px-4 py-12">
        <div className="max-w-5xl lg:max-w-4xl sm:max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Latest Blog Posts
            </h2>
            {/* Optional: show “New Blog” if user is authenticated */}
            <button
              onClick={() => navigate("/blog/create")}
              className="hidden md:inline-block px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              + New Blog
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedBlogs.map(blog => (
              <div
                key={blog._id}
                className="bg-white rounded overflow-hidden shadow"
              >
                {blog.imageUrl && (
                  <img
                    src={
                          blog.imageUrl? `${import.meta.env.VITE_EXPRESS_BASE_URL}${blog.imageUrl}`: "/images/default-blog.png"
                        }
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {blog.content.length > 120
                      ? blog.content.slice(0, 120) + "…"
                      : blog.content}
                  </p>
                  <p className="text-orange-500 text-xs font-semibold">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="mt-4 inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
