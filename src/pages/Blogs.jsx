import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import API from "../utils/axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/blogs")
      .then(res => setBlogs(res.data.blogs || []))
      .catch(() => setBlogs([]));
  }, []);

  const activeBlogs = blogs.filter(b => b.status === "active" || b.status === "approved");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-100 px-4 py-12">
        <div className="max-w-5xl max-lg:max-w-3xl max-sm:max-w-sm mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8">
            {activeBlogs.map(blog => (
              <div key={blog._id} className="bg-white rounded-sm overflow-hidden">
                {blog.imageUrl && (
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-52 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{blog.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt || blog.content}
                  </p>
                  <p className="text-orange-500 text-[13px] font-semibold mt-2">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="mt-6 inline-block px-4 py-2 rounded-sm tracking-wider bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-medium"
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
