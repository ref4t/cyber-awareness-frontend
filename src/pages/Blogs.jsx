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
      .then((res) => setBlogs(res.data.blogs || []))
      .catch(() => setBlogs([]));
  }, []);

  const approvedBlogs = blogs.filter((b) => b.status === "approved");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-100 px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Latest Blog Posts
            </h2>
            <button
              onClick={() => navigate("/blog/create")}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
            >
              + New Blog
            </button>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {approvedBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition"
              >
                {blog.imageUrl && (
                  <img
                    src={
                      blog.imageUrl
                        ? `${import.meta.env.VITE_EXPRESS_BASE_URL}${blog.imageUrl}`
                        : "/images/default_blog.png"
                    }
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-3 line-clamp-4">
                    {blog.content.length > 120
                      ? blog.content.slice(0, 120) + "…"
                      : blog.content}
                  </p>
                  <div className="flex justify-between items-end">
                    <p className="text-orange-500 text-xs font-semibold">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="ml-auto mt-2 sm:mt-0 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded"
                    >
                      Read More
                    </Link>
                  </div>
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
