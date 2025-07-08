// src/pages/EditCampaign.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { Footer } from "../components/Footer";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    API.get(`/campaigns/${id}`, { withCredentials: true })
      .then(res => {
        const c = res.data.campaign;
        setCampaign(c);
        setTitle(c.title);
        setDescription(c.description);
        setStartTime(c.startTime.slice(0,16));
        setEndTime(c.endTime.slice(0,16));
        setPreviewUrl(c.imageUrl);
      })
      .catch(() => toast.error("Failed to load campaign"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFileChange = e => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title || !description || !startTime || !endTime) {
      toast.error("Please fill in all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      await API.put(`/campaigns/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Campaign updated");
      navigate("/dashboard");
    } catch {
      toast.error("Update failed");
    }
  };

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
      <div className="flex flex-grow">
        <DashboardSidebar user={campaign.createdBy} />

        <main className="flex-grow p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">
            Edit Campaign
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">Start Date &amp; Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">End Date &amp; Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">Campaign Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-4 w-full h-48 object-cover rounded-lg border"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold transition"
            >
              Save Changes
            </button>
          </form>
        </main>
      </div>

      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
