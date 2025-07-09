// src/pages/Campaigns.jsx
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import API from "../utils/axios";
import { ChevronDown } from "lucide-react";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    API.get("/campaigns")
      .then((res) => setCampaigns(res.data.campaigns || []))
      .catch(() => setCampaigns([]));
  }, []);

 const filtered = campaigns
  // hide all pending campaigns
  .filter(c => c.status !== "pending")
  // then apply the existing business/individual/all filter
  .filter(c => {
    if (filter === "all") return true;
    return filter === "business"
      ? c.createdBy.isBusiness
      : !c.createdBy.isBusiness;
  });

  const options = [
    { value: "all", label: "All Campaigns" },
    { value: "business", label: "Business" },
    { value: "individual", label: "Individuals" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />

      {/* Hero / Top */}
      <div className="bg-emerald-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-4xl font-extrabold mb-4 md:mb-0">Campaigns</h1>
          <Link
            to="/campaigns/create"
            className="inline-block bg-white text-emerald-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-emerald-50 transition"
          >
            + New Campaign
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-end">
        <div className="relative">
          <button
            onClick={() => setShowFilter((v) => !v)}
            className="flex items-center bg-white border border-emerald-300 text-emerald-700 px-4 py-2 rounded-lg shadow-sm hover:border-emerald-400 transition"
          >
            {options.find((o) => o.value === filter).label}
            <ChevronDown className="ml-2" size={16} />
          </button>
          {showFilter && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-emerald-200 rounded-md shadow-lg overflow-hidden z-10">
              {options.map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => {
                      setFilter(opt.value);
                      setShowFilter(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-100 transition"
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Campaign Grid */}
      <main className="flex-grow max-w-5xl mx-auto px-6 pb-12">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No campaigns found.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((camp) => (
              <Link
                key={camp._id}
                to={`/campaigns/${camp._id}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition"
              >
                {/* Image */}
                {camp.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={camp.imageUrl?`${import.meta.env.VITE_EXPRESS_BASE_URL}${camp.imageUrl}`: "/images/def-camp.png"}
                      alt={camp.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-emerald-700 mb-2 line-clamp-2">
                    {camp.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {camp.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {new Date(camp.startTime).toLocaleDateString()} –{" "}
                      {new Date(camp.endTime).toLocaleDateString()}
                    </span>
                    {new Date(camp.endTime) < new Date() && (
                      <span className="text-red-600 font-semibold">Expired</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    {camp.createdBy.isBusiness
                      ? `By Business: ${camp.createdBy.businessName}`
                      : `By: ${camp.createdBy.name}`}
                  </p>
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
