import React from "react";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const CTABanner = () => (
  <section className="py-16 px-6 bg-emerald-600 text-white text-center bg-gradient-to-br from-emerald-600 to-emerald-500">
    <div className="max-w-3xl mx-auto z-10 relative">
      <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-white" />
      <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
        Ready to protect your digital world?
      </h2>
      <p className="text-white/90 mb-6 text-sm md:text-base">
        Join CyberShield and help build a safer online future—for yourself and your community.
      </p>
      <Link to="signup" className="bg-white text-emerald-700 hover:bg-emerald-100 px-6 py-3 rounded-md font-semibold shadow transition">
        Join CyberShield Today
      </Link>
    </div>

    {/* Optional background glow effect */}
    <div className="absolute inset-0 bg-emerald-800 opacity-30 blur-xl z-0" />
  </section>
);
