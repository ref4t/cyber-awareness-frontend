// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { Footer } from "../components/Footer";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [resourcesCount, setResourcesCount] = useState(0);
  const [blogStatusData, setBlogStatusData] = useState([]);
  const [campaignStatusData, setCampaignStatusData] = useState([]);

  useEffect(() => {
    // Fetch counts and statuses
    const fetchStats = async () => {
      try {
        const [usersRes, blogsRes, campsRes, resRes] = await Promise.all([
          API.get("/admin/users", { withCredentials: true }),
          API.get("/admin/blogs", { withCredentials: true }),
          API.get("/admin/campaigns", { withCredentials: true }),
          API.get("/resources", { withCredentials: true }),
        ]);

        // Users
        setUsersCount(usersRes.data.users.length);

        // Blogs
        const blogs = blogsRes.data.blogs;
        setBlogsCount(blogs.length);
        const blogActive = blogs.filter(b => b.status === "active" || b.status === "approved").length;
        const blogPending = blogs.filter(b => b.status === "pending").length;
        setBlogStatusData([
          { name: "Active", value: blogActive },
          { name: "Pending", value: blogPending },
        ]);

        // Campaigns
        const camps = campsRes.data.campaigns;
        setCampaignsCount(camps.length);
        const campActive = camps.filter(c => c.status === "active").length;
        const campPending = camps.filter(c => c.status === "pending").length;
        setCampaignStatusData([
          { name: "Active", value: campActive },
          { name: "Pending", value: campPending },
        ]);

        // Resources
        setResourcesCount(resRes.data.resources.length);
      } catch (err) {
        toast.error("Failed to load admin stats");
      }
    };

    fetchStats();
  }, []);

  const cardClasses = "bg-white rounded-lg shadow p-6 flex-1";

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-800">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />

        <main className="flex-grow p-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-6">
            Admin Dashboard Stats
          </h1>

          {/* Top stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className={cardClasses}>
              <p className="text-gray-600">Total Users</p>
              <p className="text-4xl font-semibold mt-2">{usersCount}</p>
            </div>
            <div className={cardClasses}>
              <p className="text-gray-600">Total Blogs</p>
              <p className="text-4xl font-semibold mt-2">{blogsCount}</p>
            </div>
            <div className={cardClasses}>
              <p className="text-gray-600">Total Campaigns</p>
              <p className="text-4xl font-semibold mt-2">{campaignsCount}</p>
            </div>
            <div className={cardClasses}>
              <p className="text-gray-600">Total Resources</p>
              <p className="text-4xl font-semibold mt-2">{resourcesCount}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-emerald-700 mb-4">
                Blog Status Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={blogStatusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-emerald-700 mb-4">
                Campaign Status Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={campaignStatusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
