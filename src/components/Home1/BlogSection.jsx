import React from "react";

export const BlogSection = () => (
  <section className="bg-gray-50 py-16 px-6">
    <h3 className="text-2xl font-semibold text-center mb-10">Latest Blog Posts</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {["Stay Cyber Safe", "It’s Cybersecurity Month", "Safe Online Practices"].map((title, index) => (
        <div key={index} className="bg-white rounded shadow hover:shadow-lg overflow-hidden">
          <img src={`/blog${index + 1}.jpg`} alt={title} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h4 className="font-bold text-lg">{title}</h4>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-8">
      <button className="bg-emerald-500 text-white px-6 py-3 rounded hover:bg-emerald-600">Create Your Campaign</button>
    </div>
  </section>
);
