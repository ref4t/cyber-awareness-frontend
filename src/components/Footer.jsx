import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-emerald-700 text-white pt-10 pb-6">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
      
      {/* Left Section with Logo */}
      <div>
        <div className="flex items-center space-x-3 mb-3">
          <img
            src="/logo.png" 
            alt="CyberShield Logo"
            className="w-20 h-20"
          />
          <h3 className="text-lg font-semibold">CyberShield</h3>
        </div>
        <p className="text-sm">
          Empowering small businesses with cybersecurity awareness and protection.
        </p>
      </div>

      {/* Middle Section - Pages */}
      <div>
        <h4 className="text-white font-semibold mb-3">Pages</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/resources" className="hover:underline">Resources</Link></li>
          <li><Link to="/blog" className="hover:underline">Blog</Link></li>
          <li><Link to="/campaigns" className="hover:underline">Campaigns</Link></li>
          <li><Link to="/about" className="hover:underline">About Us</Link></li>
          <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
        </ul>
      </div>

      {/* Right Section - Contact */}
      <div>
        <h4 className="text-white font-semibold mb-3">Contact</h4>
        <p className="text-sm">support@cybershield.com</p>
        <p className="text-sm mt-1">Wollongong, NSW</p>
        <p className="text-sm mt-1">ABN: 123 456 789</p>
      </div>
    </div>

    <p className="text-center text-xs text-emerald-100 mt-8">
      © {new Date().getFullYear()} CyberShield. All rights reserved.
    </p>
  </footer>
);
