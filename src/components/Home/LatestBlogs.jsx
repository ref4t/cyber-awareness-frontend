import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import API from "../../utils/axios";  // adjust path if needed

export const LatestBlogs = () => {
  const dummyBlogs = [
    {
      _id: 1,
      title: "Top 5 Ways to Prevent Phishing Attacks",
      author: "Jane Cyber",
      readTime: "4 min read",
      imageUrl: "/images/blog-1.jpg",
    },
    {
      _id: 2,
      title: "How Small Businesses Can Improve Cyber Hygiene",
      author: "Mark Shield",
      readTime: "6 min read",
      imageUrl: "/images/blog-2.jpg",
    },
    {
      _id: 3,
      title: "The Importance of Using MFA",
      author: "Alex Secure",
      readTime: "3 min read",
      imageUrl: "/images/blog-3.jpg",
    },
    {
      _id: 4,
      title: "What is Social Engineering and How to Avoid It",
      author: "Lena Safe",
      readTime: "5 min read",
      imageUrl: "/images/blog-4.jpg",
    },
  ];

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  API.get("/blogs")
    .then((res) => {
      const fetched = res.data.blogs || [];
      const approved = fetched.filter((b) => b.status === "approved");

      setBlogs(approved.length > 0 ? approved : dummyBlogs);
    })
    .catch((err) => {
      console.error("Error fetching blogs:", err);
      setBlogs(dummyBlogs);
    })
    .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section className="py-20 px-6 bg-emerald-50">
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-12">
        Latest Blogs
      </h2>
      <div className="max-w-6xl mx-auto">
        <Slider
          dots
          infinite
          speed={600}
          slidesToShow={2}
          slidesToScroll={1}
          autoplay
          autoplaySpeed={5000}
          responsive={[
            {
              breakpoint: 768, // tablets
              settings: { slidesToShow: 1 },
            },
          ]}
        >
          {blogs.map((blog) => (
            <div key={blog.id} className="px-3">
              <Link
                to={`/blog/${blog._id}`}
                className="bg-emerald-50 rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300 block h-full"
              >
                <img
                  src={
                      blog.imageUrl
                        ? `${import.meta.env.VITE_EXPRESS_BASE_URL}${blog.imageUrl}`
                        : "/images/default-blog.png"
                      }
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                      By {typeof blog.author === "object" ? blog.author.name : blog.author} • {blog.readTime}
                    </p>
                  <p className="text-sm text-gray-500">Read more →</p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
