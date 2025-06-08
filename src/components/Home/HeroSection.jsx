import React from "react";

export const HeroSection = () => (
  <section
    className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-6 text-white"
    style={{ backgroundImage: "url('/images/cyber-awareness-banner.png')" }}
  >
    <div className="bg-emerald-900/60 w-full h-full absolute top-19 left-0 z-0" />
    <div className="relative z-10 max-w-4xl text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 drop-shadow">
        Secure Your Business. Empower Your Community.
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow">
        An all-in-one hub for cybersecurity awareness, support, and campaign promotion.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded shadow">
          Explore Resources
        </button>
        <button className="bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50 font-medium px-6 py-3 rounded shadow">
          Start a Campaign
        </button>
      </div>
    </div>
  </section>
);
