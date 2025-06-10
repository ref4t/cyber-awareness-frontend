import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";

export const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    API.get("/user/data")
      .then((res) => {
        setUser(res.data.user);
        setName(res.data.user.name);
        setBusinessName(res.data.user.businessName || "");
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    API.put("/user/update", { name, businessName })
      .then(() => toast.success("Details updated"))
      .catch(() => toast.error("Update failed"));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    API.put("/user/update-password", { currentPassword, newPassword })
      .then(() => {
        toast.success("Password updated");
        setCurrentPassword("");
        setNewPassword("");
      })
      .catch(() => toast.error("Password update failed"));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Navbar />
      <div className="flex flex-grow">
        <DashboardSidebar user={user} />
        <main className="flex-grow p-6 space-y-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <form onSubmit={handleUpdateDetails} className="space-y-4 max-w-md">
                <h2 className="text-xl font-semibold">Edit Details</h2>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                {user?.isBusiness && (
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Business Name"
                  />
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded"
                >
                  Save Changes
                </button>
              </form>

              <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                <h2 className="text-xl font-semibold">Update Password</h2>
                <input
                  type="password"
                  className="w-full border px-3 py-2 rounded"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                />
                <input
                  type="password"
                  className="w-full border px-3 py-2 rounded"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded"
                >
                  Update Password
                </button>
              </form>
            </>
          )}
        </main>
      </div>
      <ToastContainer position="bottom-right" theme="light" />
      <Footer />
    </div>
  );
};
