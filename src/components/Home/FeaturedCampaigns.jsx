import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/axios";

export const FeaturedCampaigns = () => {
  const demoCampaigns = [
    {
      id: 1,
      businessName: "SecureTech Solutions",
      title: "Cyber Hygiene for SMEs",
      description:
        "We launched a city-wide campaign promoting secure login practices and employee awareness training.",
      industry: "IT Services",
      image: "/images/campaign-1.webp",
    },
    {
      id: 2,
      businessName: "HealthGuard Pharmacy",
      title: "Protect Patient Data Week",
      description:
        "Focused on educating local clinics and pharmacies on safe digital storage of patient data.",
      industry: "Healthcare",
      image: "/images/campaign-2.jpg",
    },
    {
      id: 3,
      businessName: "Byte Café",
      title: "Public Wi-Fi Safety Campaign",
      description:
        "Educating customers on secure browsing habits while using our free in-store Wi-Fi.",
      industry: "Hospitality",
      image: "/images/campaign-3.jpg",
    },
  ];

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/campaigns")
      .then((res) => {
        const featured = (res.data.campaigns || [])
          .filter((c) => c.status === "featured")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        if (featured.length > 0) {
          setCampaigns(featured);
        } else {
          setCampaigns(demoCampaigns);
        }
      })
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
        setCampaigns(demoCampaigns);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 px-6 bg-emerald-50">
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-12">
        Small Business Campaign Highlights
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id || campaign.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={
                  campaign.imageUrl
                    ? `${import.meta.env.VITE_EXPRESS_BASE_URL}${campaign.imageUrl}`
                    : campaign.image || "/images/default-blog.png"
                }
                alt={campaign.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex-grow">
                <h4 className="text-sm text-gray-500 mb-1 uppercase tracking-wide">
                  {campaign.industry || "Business"}
                </h4>
                <h3 className="text-xl font-bold text-emerald-700 mb-1">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {campaign.description?.slice(0, 100)}...
                </p>
                <p className="text-sm text-gray-800 font-medium mb-3">
                  <span className="text-gray-500">By:</span>{" "}
                  {campaign.businessName}
                </p>
                <Link
                  to={`/campaigns/${campaign._id || campaign.id}`}
                  className="text-sm text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded font-medium inline-block"
                >
                  View Campaign
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
