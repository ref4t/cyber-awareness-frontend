import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axios";

export const CampaignSection = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    API.get("/campaigns")
      .then((res) => setCampaigns(res.data.campaigns?.slice(0, 3) || []))
      .catch(() => setCampaigns([]));
  }, []);

  return (
    <section className="bg-white py-16 px-6">
      <h3 className="text-2xl font-semibold text-center mb-10">Recent Campaigns</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {campaigns.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No campaigns yet.</p>
        )}
        {campaigns.map((camp, idx) => (
          <div key={idx} className="bg-gray-50 rounded shadow hover:shadow-lg overflow-hidden">
            {camp.image && (
              <img
                src={camp.image}
                alt={camp.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h4 className="font-bold text-lg">{camp.title}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(camp.startTime).toLocaleDateString()} - {new Date(camp.endTime).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-700">{camp.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/campaigns" className="bg-emerald-500 text-white px-6 py-3 rounded hover:bg-emerald-600">
          View All Campaigns
        </Link>
      </div>
    </section>
  );
};
