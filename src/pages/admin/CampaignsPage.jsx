// src/pages/admin/CampaignsPage.jsx
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Footer } from "../../components/Footer";
import API from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  const loadCampaigns = () => {
    API.get("/campaigns", { withCredentials: true })
      .then(res => setCampaigns(res.data.campaigns || []))
      .catch(() => setCampaigns([]));
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const handleChangeStatus = (id, status) => {
    API.put(
      `/admin/campaigns/${id}/status`,
      { status },
      { withCredentials: true }
    )
      .then(() => {
        toast.success("Campaign status updated");
        setStatusMap(prev => ({ ...prev, [id]: "" }));
        loadCampaigns();
      })
      .catch(() => toast.error("Failed to update status"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />

        <main className="flex-grow p-6 max-w-5xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-emerald-700">All Campaigns</h2>
          <div className="space-y-4">
            {campaigns.map(c => (
              <div
                key={c._id}
                className="flex items-center justify-between border p-4 rounded"
              >
                <div className="flex-1">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-gray-600">
                    Created by: {c.createdBy?.name || 'Unknown'}
                  </p>
                </div>

                <select
                  value={statusMap[c._id] || c.status}
                  onChange={e =>
                    setStatusMap(prev => ({ ...prev, [c._id]: e.target.value }))
                  }
                  className="border rounded px-2 py-1 mr-2"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>

                <button
                  onClick={() => handleChangeStatus(c._id, statusMap[c._id] || c.status)}
                  className="px-3 py-1 bg-emerald-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
