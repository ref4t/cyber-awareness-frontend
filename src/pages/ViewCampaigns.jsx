import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../utils/axios";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const statusStyles = {
  active: "bg-emerald-100 text-emerald-800",
  pending: "bg-yellow-100 text-yellow-800",
  archived: "bg-gray-200 text-gray-600",
};

export const ViewCampaign = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    API.get(`/campaigns/${id}`)
      .then(res => setCampaign(res.data))
      .catch(() => {/* handle error */});
  }, [id]);

  if (!campaign) {
    return <p className="p-6 text-center">Loading campaign...</p>;
  }

  const {
    title,
    description,
    imageUrl,
    businessName,
    industry,
    startTime,
    endTime,
    status
  } = campaign;

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50">
      <Navbar/>
      <main className="flex-grow max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-emerald-700">{title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status] || ""}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-60 object-cover rounded-lg mb-6 shadow"
          />
        )}
        <div className="mb-4">
          <p className="text-sm text-gray-700"><strong>Business:</strong> {businessName}</p>
          <p className="text-sm text-gray-700"><strong>Industry:</strong> {industry}</p>
          <p className="text-sm text-gray-700"><strong>Start:</strong> {new Date(startTime).toLocaleString()}</p>
          <p className="text-sm text-gray-700"><strong>End:</strong> {new Date(endTime).toLocaleString()}</p>
        </div>
        <p className="text-gray-800 mb-8 whitespace-pre-line">{description}</p>
        <Link
          to="/campaigns"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded"
        >
          ← Back to Campaigns
        </Link>
      </main>
      <Footer/>
    </div>
  );
};

export default ViewCampaign;
