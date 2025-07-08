import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";

const CreateCampaign = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/user/data")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please upload an image for your campaign.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);

    try {
      await API.post("/campaigns", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Campaign created successfully!");
      navigate("/campaigns");
    } catch {
      toast.error("Failed to create campaign");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-emerald-10">
      <Navbar />
      <div className="flex flex-grow bg-emerald-50">
        <DashboardSidebar user={user} />
        <main className="flex-grow max-w-3xl mx-auto p-6 ">
          <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">Create Campaign</h2>
          <form className="space-y-6 p-6 bg-white rounded-lg shadow" onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-1">Title</label>
              <input
                type="text"
                placeholder="Campaign title"
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-1">Description</label>
              <textarea
                placeholder="Campaign description"
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-emerald-600 border border-emerald-300 rounded-lg cursor-pointer focus:outline-none"
                onChange={handleFileChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-1">Start Date & Time</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-1">End Date & Time</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold shadow-sm transition"
            >
              Submit
            </button>
          </form>
        </main>
      </div>
      <ToastContainer position="bottom-right" theme="light" />
      <Footer />
    </div>
  );
};

export default CreateCampaign;
