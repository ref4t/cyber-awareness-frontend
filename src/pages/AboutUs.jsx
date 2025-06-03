import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const AboutUs = () => (
  <>
    <Navbar />
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">About CyberShield</h2>
      <p className="text-gray-700">
        CyberShield is dedicated to helping businesses and individuals stay safe
        online. We provide resources, campaigns, and expert guidance to raise
        awareness of cybersecurity best practices.
      </p>
    </div>
    <Footer />
  </>
);

export default AboutUs;
