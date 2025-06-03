import React from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { Features } from "../components/Features";
import { BlogSection } from "../components/BlogSection";
import { CampaignSection } from "../components/CampaignSection";
import { Footer } from "../components/Footer";

const Home = () => {
  return (
    <div className="font-sans text-gray-800 bg-gradient-to-b from-emerald-50 via-white to-white">
      <Navbar />
      <HeroSection />
      <Features />
      <BlogSection />
      <CampaignSection />
      <Footer />
    </div>
  );
};

export default Home;
