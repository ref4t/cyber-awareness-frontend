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
            <div key={idx} className="border rounded p-4 bg-white">
              <h3 className="font-semibold text-lg">{camp.title}</h3>
              <p className="text-gray-700 mt-2">{camp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Campaigns;
