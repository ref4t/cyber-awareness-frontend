import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";

const CreateCampaign = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/campaigns", { title, description })
      .then(() => {
        toast.success("Campaign created!");
        navigate("/campaigns");
      })
      .catch(() => toast.error("Failed to create campaign"));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Create Campaign</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Campaign title"
            className="w-full px-3 py-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Campaign description"
            className="w-full px-3 py-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default CreateCampaign;
