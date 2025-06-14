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
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessAbn, setBusinessAbn] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    API.get("/user/data")
      .then((res) => {
        const u = res.data.user;
        setUser(u);
        setName(u.name);
        setEmail(u.email);
        setBusinessName(u.businessName || "");
        setBusinessAddress(u.businessAddress || "");
        setBusinessAbn(u.businessAbn || "");
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    API.put("/user/update", {
      name,
      email,
      businessName,
      businessAddress,
      businessAbn,
    })
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
        setShowPasswordModal(false);
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
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                {user?.isBusiness && (
                  <>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Business Name"
                    />
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      placeholder="Business Address"
                    />
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                      value={businessAbn}
                      onChange={(e) => setBusinessAbn(e.target.value)}
                      placeholder="ABN"
                    />
                  </>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded"
                >
                  Save Changes
                </button>
              </form>
              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 bg-emerald-600 text-white rounded"
              >
                Change Password
              </button>
            </>
          )}
        </main>
      </div>
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 space-y-4">
            <h2 className="text-xl font-semibold">Update Password</h2>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
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
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" theme="light" />
      <Footer />
    </div>
  );
};
