import React from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { Features } from "../components/Features";
import { BlogSection } from "../components/BlogSection";
import { Footer } from "../components/Footer";

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <HeroSection />
      <Features />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Home;
