import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import API from "../utils/axios";
import { Search, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "Phishing", "Passwords", "Social Engineering", "Malware"];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/resources")
      .then(res => setResources(res.data.resources))
      .catch(() => {
        setResources([
          {
            id: 1,
            title: "Understanding Phishing",
            category: "Phishing",
            link: "/docs/phishing.pdf",
            description: "Learn how to spot phishing scams.",
            image: "/images/resource1.jpg",
          },
          {
            id: 2,
            title: "Strong Password Guide",
            category: "Passwords",
            link: "/docs/passwords.pdf",
            description: "Best practices for password security.",
            image: "/images/resource2.jpg",
          },
          {
            id: 3,
            title: "Social Engineering 101",
            category: "Social Engineering",
            link: "/docs/social.pdf",
            description: "Defend against social engineering attacks.",
            image: "/images/resource3.jpg",
          },
        ]);
      });
  }, []);

  const filtered = resources
    .filter(r => filter === "All" || r.category === filter)
    .filter(r => r.title.toLowerCase().includes(search.toLowerCase()));
  
  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />

      {/* Hero Banner */}
      <header
        className="bg-emerald-600 text-white py-16 sm:py-20 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/resources-banner.jpg')" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Educational Resources
          </h1>
          <p className="text-base sm:text-lg drop-shadow">
            Browse our guides, infographics, and whitepapers to stay secure.
          </p>
        </div>
      </header>

      {/* Filters and Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Search Box */}
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-3 top-3 text-emerald-400" size={20} />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === cat
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No resources found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(res => (
              <Link
                key={res._id || res.id}
                to={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden group"
              >
                <div className="h-40 bg-gray-100 overflow-hidden">
                  <img
                      src={
                        res.imageUrl?.startsWith("/uploads/")
                          ? `${import.meta.env.VITE_EXPRESS_BASE_URL}${res.imageUrl}`
                          : res.imageUrl || "/images/def-resources.jpg"
                      }
                      alt={res.title}
                      onError={(e) => (e.target.src = "/images/def-resources.jpg")}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-1">
                    <BookOpen className="inline-block mr-1" size={18} />
                    {res.title}
                  </h3>
                  <p className="text-sm text-gray-600">{res.category}</p>
                  <p className="text-gray-700 mt-2 line-clamp-3">{res.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
