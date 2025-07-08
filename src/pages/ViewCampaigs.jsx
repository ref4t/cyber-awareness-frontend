// src/pages/ViewCampaign.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewCampaign() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  const statusClasses = {
    active: "bg-emerald-100 text-emerald-800",
    pending: "bg-yellow-100 text-yellow-800",
    archived: "bg-gray-200 text-gray-600",
  };

  useEffect(() => {
    API.get(`/campaigns/${id}`, { withCredentials: true })
      .then((res) => setCampaign(res.data.campaign))
      .catch(() => {
        toast.error("Failed to load campaign");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <p className="text-emerald-700">Loading campaign…</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <p className="text-red-600">Campaign not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto p-6 space-y-6">
        <Link
          to="/campaigns"
          className="inline-block text-emerald-600 hover:underline"
        >
          ← Back to Campaigns
        </Link>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {campaign.imageUrl && (
            <div className="h-64 md:h-96 overflow-hidden">
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">
              {campaign.title}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  statusClasses[campaign.status] || ""
                }`}
              >
                {campaign.status.charAt(0).toUpperCase() +
                  campaign.status.slice(1)}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(campaign.startTime).toLocaleDateString()} –{" "}
                {new Date(campaign.endTime).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{campaign.description}</p>

            <div className="border-t pt-4 text-sm text-gray-600">
              <p>
                Posted by{" "}
                <span className="font-semibold">
                  {campaign.createdBy.isBusiness
                    ? campaign.createdBy.businessName
                    : campaign.createdBy.name}
                </span>
              </p>
              <p>On {new Date(campaign.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
