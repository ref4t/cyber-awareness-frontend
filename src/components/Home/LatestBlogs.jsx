import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export const LatestBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 5 Ways to Prevent Phishing Attacks",
      author: "Jane Cyber",
      readTime: "4 min read",
      image: "/images/blog-1.jpg",
    },
    {
      id: 2,
      title: "How Small Businesses Can Improve Cyber Hygiene",
      author: "Mark Shield",
      readTime: "6 min read",
      image: "/images/blog-2.jpg",
    },
    {
      id: 3,
      title: "The Importance of Using MFA",
      author: "Alex Secure",
      readTime: "3 min read",
      image: "/images/blog-3.jpg",
    },
    {
      id: 4,
      title: "What is Social Engineering and How to Avoid It",
      author: "Lena Safe",
      readTime: "5 min read",
      image: "/images/blog-4.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768, // tablets
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-20 px-6 bg-emerald-50">
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-12">
        Latest Blogs
      </h2>
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {blogs.map((blog) => (
            <div key={blog.id} className="px-3">
              <Link
                to={`/blog/${blog.id}`}
                className="bg-emerald-50 rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300 block h-full"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    By {blog.author} • {blog.readTime}
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
