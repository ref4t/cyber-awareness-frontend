import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Navbar />
      <main className="flex-grow p-6">Dashboard content</main>
      <Footer />
    </div>
  );
};