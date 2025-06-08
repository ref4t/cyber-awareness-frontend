import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Section Components from components/Home/
import { HeroSection } from "../components/Home/HeroSection";
import { AboutCyberShield } from "../components/Home/AboutCyberShield";
import { FeaturedCampaigns } from "../components/Home/FeaturedCampaigns";
import { EducationalResources } from "../components/Home/EducationalResources";
import { LatestBlogs } from "../components/Home/LatestBlogs";
import { SmallBusinessSpotlights } from "../components/Home/SmallBusinessSpotlights";
import { CyberRiskChecklist } from "../components/Home/CyberRiskChecklist";
import { HowItWorks } from "../components/Home/HowItWorks";
import { PartnerLogos } from "../components/Home/PartnerLogos";
import { NewsletterSignup } from "../components/Home/NewsletterSignup";
import { CTABanner } from "../components/Home/CTABanner";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gradient-to-b from-emerald-50 via-white to-white">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutCyberShield />
        <FeaturedCampaigns />
        <EducationalResources />
        <LatestBlogs />
        <SmallBusinessSpotlights />
        <CyberRiskChecklist />
        <HowItWorks />
        <PartnerLogos />
        <NewsletterSignup />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
