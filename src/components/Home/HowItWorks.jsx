import React from "react";
import { UserPlus, PenTool, Share2, BarChart3 } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      title: "Create Account",
      icon: <UserPlus className="w-8 h-8 text-emerald-600 mb-3" />,
      description: "Sign up to access campaign tools and dashboard features.",
    },
    {
      title: "Design Campaign",
      icon: <PenTool className="w-8 h-8 text-emerald-600 mb-3" />,
      description: "Build engaging cybersecurity awareness content.",
    },
    {
      title: "Share with Community",
      icon: <Share2 className="w-8 h-8 text-emerald-600 mb-3" />,
      description: "Publish and promote your campaign to your audience.",
    },
    {
      title: "Track Engagement",
      icon: <BarChart3 className="w-8 h-8 text-emerald-600 mb-3" />,
      description: "Monitor views, clicks, and participation metrics.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-grey-50 text-center">
      <h2 className="text-4xl font-bold text-emerald-700 mb-12">How It Works</h2>
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4 sm:grid-cols-2">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="group relative p-6 border rounded-xl bg-emerald-50 hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute -top-4 -left-4 bg-emerald-600 text-white w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full shadow">
              {idx + 1}
            </div>
            {step.icon}
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
