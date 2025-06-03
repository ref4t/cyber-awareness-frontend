import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-slate-900 text-gray-300 pt-10 pb-6">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">CyberShield</h3>
        <p className="text-sm">Protecting your digital world through education and awareness.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3">Pages</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/about" className="hover:underline">About Us</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
          <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3">Get Help</h4>
        <p className="text-sm">Need urgent help with a cyber threat? Call <strong>1300 SECURE</strong> or start a live chat.</p>
        <div className="mt-4 space-x-3">
          <button className="bg-emerald-500 px-4 py-2 rounded text-white">Call Now</button>
          <button className="bg-blue-600 px-4 py-2 rounded text-white">Chat Live</button>
        </div>
      </div>
    </div>
    <p className="text-center text-xs text-gray-500 mt-8">© 2025 CyberShield. All rights reserved.</p>
  </footer>
);
