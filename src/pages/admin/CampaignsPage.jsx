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
      .then((res) => setCampaigns(res.data.campaigns || []))
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
        setStatusMap((prev) => ({ ...prev, [id]: "" }));
        loadCampaigns();
      })
      .catch(() => toast.error("Failed to update status"));
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirm) return;

    try {
      await API.delete(`/campaigns/${id}`, { withCredentials: true });
      toast.success("Campaign deleted");
      loadCampaigns();
    } catch (err) {
      toast.error("Failed to delete campaign");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />

        <main className="flex-grow p-6 max-w-6xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-emerald-700 mb-6">Manage Campaigns</h2>

          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            {campaigns.length === 0 ? (
              <p className="text-center text-gray-500">No campaigns found.</p>
            ) : (
              campaigns.map((c) => (
                <div
                  key={c._id}
                  className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-emerald-800">{c.title}</p>
                    <p className="text-sm text-gray-600">
                      Created by: {c.createdBy?.name || "Unknown"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <select
                      value={statusMap[c._id] || c.status}
                      onChange={(e) =>
                        setStatusMap((prev) => ({
                          ...prev,
                          [c._id]: e.target.value,
                        }))
                      }
                      className="border rounded px-3 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="featured">Featured</option>
                      <option value="archived">Archived</option>
                    </select>

                    <button
                      onClick={() =>
                        handleChangeStatus(c._id, statusMap[c._id] || c.status)
                      }
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded text-sm font-medium"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
