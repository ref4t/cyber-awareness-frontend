import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import API from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Editable fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("general");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessAbn, setBusinessAbn] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    API.get("/user/data", { withCredentials: true })
      .then((res) => {
        const u = res.data.user;
        setUser(u);
        setName(u.name);
        setEmail(u.email);
        setRole(u.role);
        if (u.role === "business") {
          setBusinessName(u.businessName || "");
          setBusinessAddress(u.businessAddress || "");
          setBusinessAbn(u.businessAbn || "");
        }
      })
      .catch(() => toast.error("Failed to load user data"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { name, email, role };
    // if user is business or converting, include business details
    if (role === "business") {
      if (!businessName || !businessAddress || !businessAbn) {
        toast.error("Please fill in all business details");
        return;
      }
      Object.assign(payload, { businessName, businessAddress, businessAbn });
    }
    try {
      await API.put("/user/update", payload, { withCredentials: true });
      toast.success("Details updated");
      setIsConverting(false);
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 font-sans text-gray-800">
      <Navbar />
      <div className="flex flex-grow">
        <DashboardSidebar user={user} />
        <main className="flex-grow p-6 max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-emerald-700">Account Settings</h1>

          <form onSubmit={handleSave} className="space-y-4 bg-white p-6 rounded-lg shadow">
            <div className="grid gap-4">
              {/* Name & Email */}
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-emerald-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-emerald-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Business Fields */}
              {(role === "business" || isConverting) && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-emerald-400"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Business Address
                    </label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-emerald-400"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">ABN</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-emerald-400"
                      value={businessAbn}
                      onChange={(e) => setBusinessAbn(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
            >
              {role === "general" && isConverting
                ? "Create Business Account"
                : "Save Changes"}
            </button>
          </form>

          {/* Convert Button */}
          {role === "general" && !isConverting && (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-700 mb-4">Want to post campaigns? Become a business:</p>
              <button
                onClick={() => setIsConverting(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              >
                Convert to Business
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
};

export default UserDetails;
