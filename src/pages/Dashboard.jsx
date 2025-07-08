// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { Footer } from "../components/Footer";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const navigate = useNavigate();

  const statusClasses = {
    active: "bg-emerald-100 text-emerald-800",
    pending: "bg-yellow-100 text-yellow-800",
    archived: "bg-gray-200 text-gray-600",
  };

  useEffect(() => {
    // load current user
    API.get("/user/data", { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => toast.error("Failed to load user"))
      .finally(() => setLoadingUser(false));

    // load all campaigns
    API.get("/campaigns", { withCredentials: true })
      .then(res => setCampaigns(res.data.campaigns || []))
      .catch(() => toast.error("Failed to load campaigns"))
      .finally(() => setLoadingCampaigns(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    try {
      await API.delete(`/api/campaigns/${id}`, { withCredentials: true });
      setCampaigns(c => c.filter(x => x._id !== id));
      toast.success("Campaign deleted");
    } catch {
      toast.error("Deletion failed");
    }
  };

  if (loadingUser) {
    return <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <p className="text-emerald-700">Loading…</p>
    </div>;
  }
   // If user is still null (e.g. unauthorized), you can redirect or show a message
 if (!user) {
  return (
         <div className="min-h-screen flex items-center justify-center bg-emerald-50">
       <p className="text-red-600">You must log in to view the dashboard.</p>
     </div>
   );
 }

  // only show campaigns created by this user
  const myCamps = campaigns.filter(c => c.createdBy._id === user._id);

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />

      <div className="flex flex-grow">
        <DashboardSidebar user={user} />

        <main className="flex-grow p-6 max-w-5xl mx-auto space-y-8">
          {/* Profile */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">
              Hello, {user.name}
            </h2>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">
              Role: <span className="capitalize font-semibold">{user.role}</span>
            </p>
            {user.role === "general" && (
              <button
                onClick={() => navigate("/dashboard/details")}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition"
              >
                Convert to Business
              </button>
            )}
            {user.role === "business" && user.businessName && (
              <p className="text-gray-700 mt-2">
                Business: <span className="font-semibold">{user.businessName}</span>
              </p>
            )}
          </section>

          {/* My Campaigns */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-emerald-700">My Campaigns</h3>
              <button
                onClick={() => navigate("/campaigns/create")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
              >
                + New Campaign
              </button>
            </div>

            {loadingCampaigns ? (
              <p className="text-gray-600">Loading campaigns…</p>
            ) : myCamps.length === 0 ? (
              <p className="text-gray-600">You have not created any campaigns.</p>
            ) : (
              <div className="grid gap-6">
                {myCamps.map(camp => (
                  <div key={camp._id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
                    {camp.imageUrl && (
                      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                        <img
                          src={camp.imageUrl}
                          alt={camp.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-emerald-700">{camp.title}</h4>
                        <span className={`px-2 py-1 text-sm rounded-full ${statusClasses[camp.status]}`}>
                          {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-700 flex-grow line-clamp-3">{camp.description}</p>
                      <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {new Date(camp.startTime).toLocaleDateString()} – {new Date(camp.endTime).toLocaleDateString()}
                        </span>
                        {new Date(camp.endTime) < new Date() && (
                          <span className="ml-2 text-red-600 font-semibold">Expired</span>
                        )}
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => navigate(`/campaigns/${camp._id}`)}
                          className="text-emerald-600 hover:underline"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/campaigns/${camp._id}/edit`)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(camp._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
