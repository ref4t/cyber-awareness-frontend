import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import API from "../utils/axios";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch existing campaigns if the API is available
    API.get("/campaigns")
      .then((res) => setCampaigns(res.data.campaigns || []))
      .catch(() => setCampaigns([]));
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Campaigns</h2>
          <Link
            to="/campaigns/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Campaign
          </Link>
        </div>
        <div className="grid gap-4">
          {campaigns.length === 0 && (
            <p className="text-gray-500">No campaigns yet.</p>
          )}
          {campaigns.map((camp, idx) => (
            <div key={idx} className="border rounded overflow-hidden bg-white">
              {camp.image && (
                <img
                  src={camp.image}
                  alt={camp.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{camp.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Created by {camp.createdBy?.name || camp.createdBy} on{' '}
                  {new Date(camp.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(camp.startTime).toLocaleString()} -{' '}
                  {new Date(camp.endTime).toLocaleString()}
                  {new Date(camp.endTime) < new Date() && (
                    <span className="ml-2 text-red-600 font-semibold">Expired</span>
                  )}
                </p>
                <p className="text-gray-700 mt-2">{camp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Campaigns;