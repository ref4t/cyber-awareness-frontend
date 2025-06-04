import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axios";

export const CampaignSection = () => {
  const [campaigns, setCampaigns] = useState([]);
  const fallback = [
    {
      title: "Cyber Safety Week",
      description: "Join us for daily tips on protecting your business online.",
      image: "https://via.placeholder.com/400x200?text=Campaign+1",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Secure Passwords",
      description: "Learn how to create strong passwords that keep hackers out.",
      image: "https://via.placeholder.com/400x200?text=Campaign+2",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Phishing Awareness",
      description: "Recognize and avoid phishing scams with these best practices.",
      image: "https://via.placeholder.com/400x200?text=Campaign+3",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  useEffect(() => {
    API.get("/campaigns")
      .then((res) => {
        const list = res.data.campaigns?.slice(0, 3) || [];
        setCampaigns(list.length ? list : fallback);
      })
      .catch(() => setCampaigns(fallback));
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