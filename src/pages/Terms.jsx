import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const Terms = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Terms & Conditions</h2>
      <p className="text-gray-700">
        By accessing Cybershield, you agree to abide by our terms and conditions.
        All information provided is for educational purposes only and should not
        be considered legal advice.
      </p>
    </main>
    <Footer />
  </div>
);

export default Terms;