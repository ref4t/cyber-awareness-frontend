import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import API from "../utils/axios";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [campLoading, setCampLoading] = useState(true);

  useEffect(() => {
    API.get("/user/data")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));

    API.get("/user/campaigns")
      .then((res) => setCampaigns(res.data.campaigns || []))
      .catch(() => setCampaigns([]))
      .finally(() => setCampLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Navbar />
      <div className="flex flex-grow">
        <DashboardSidebar user={user} />
        <main className="flex-grow p-6 space-y-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Welcome {user?.name}</h2>
            <p className="text-gray-700">Email: {user?.email}</p>
            {user?.isBusiness && (
              <p className="text-gray-700">Business: {user.businessName}</p>
            )}
          </div>
        )}

        <section>
          <h3 className="text-xl font-semibold mb-4">Your Campaigns</h3>
          {campLoading ? (
            <p>Loading...</p>
          ) : campaigns.length === 0 ? (
            <p className="text-gray-500">No campaigns created yet.</p>
          ) : (
            <div className="grid gap-4">
              {campaigns.map((camp, idx) => (
                <div
                  key={idx}
                  className="border rounded overflow-hidden bg-white"
                >
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
                      {new Date(camp.startTime).toLocaleString()} -{' '}
                      {new Date(camp.endTime).toLocaleString()}
                      {new Date(camp.endTime) < new Date() && (
                        <span className="ml-2 text-red-600 font-semibold">
                          Expired
                        </span>
                      )}
                    </p>
                    <p className="text-gray-700 mt-2">{camp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};