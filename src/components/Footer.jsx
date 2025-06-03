import React from "react";

export const Footer = () => (
  <footer className="bg-slate-900 text-white py-10 text-center">
    <p>Need urgent help with a cyber threat? Call <strong>1300 SECURE</strong> or start a live chat.</p>
    <div className="mt-4 space-x-3">
      <button className="bg-emerald-500 px-4 py-2 rounded text-white">Call Now</button>
      <button className="bg-blue-600 px-4 py-2 rounded text-white">Chat Live</button>
    </div>
    <p className="text-sm mt-6">© 2025 CyberShield Hub | Privacy | Terms</p>
  </footer>
);
