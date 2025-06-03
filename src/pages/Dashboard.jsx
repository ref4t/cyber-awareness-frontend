import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Dashboard = () => {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <div className="p-6">Dashboard content</div>
      <Footer />
    </div>
  );
};


