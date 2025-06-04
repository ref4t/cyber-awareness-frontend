import React from "react";

export const SmallBusinessSpotlights = () => {
  const testimonials = [
    {
      quote: "CyberShield helped us run our first cyber safety campaign!",
      business: "GreenTech Solutions",
      industry: "Retail",
      logo: "/images/business1-logo.png",
    },
    {
      quote: "Easy to use and great results!",
      business: "ByteSecure Co",
      industry: "IT Services",
      logo: "/images/business2-logo.png",
    },
    {
      quote: "Helped us build trust with our customers!",
      business: "SafeSteps Pty Ltd",
      industry: "E-Commerce",
      logo: "/images/business3-logo.png",
    },
  ];

  return (
    <section className="py-20 px-6 bg-grey-50">
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-12">
        Small Business Spotlights
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
          >
            <img
              src={item.logo}
              alt={item.business}
              className="w-16 h-16 object-contain mb-4"
            />
            <p className="italic text-gray-700 mb-4">"{item.quote}"</p>
            <p className="text-sm font-semibold text-emerald-800">
              – {item.business}, {item.industry}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
