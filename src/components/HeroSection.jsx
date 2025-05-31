import React from "react";

export const HeroSection = () => (
  <section
  className="bg-cover bg-center bg-no-repeat py-130 px-6 text-white"
  style={{ backgroundImage: "url('/images/cyber-awareness-banner.png')" }}
>
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">
      Secure Your Business. Empower Your Community.
    </h2>
    <p className="text-lg mb-6 max-w-2xl mx-auto drop-shadow">
      An all-in-one hub for cybersecurity awareness, support, and campaign promotion.
    </p>
    <div className="space-x-4">
      <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
        Explore Resources
      </button>
      <button className="bg-white text-blue-700 border border-blue-600 px-6 py-3 rounded hover:bg-blue-100">
        Start a Campaign
      </button>
    </div>
  </div>
</section>
);
