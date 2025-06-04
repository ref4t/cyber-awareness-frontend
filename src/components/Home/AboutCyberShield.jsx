import React from "react";
import { ShieldCheck, Users, BookOpen } from "lucide-react";

export const AboutCyberShield = () => (
  <section className="bg-grey-50 py-20 px-6">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-emerald-700 mb-4">What is CyberShield?</h2>
      <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
        CyberShield empowers individuals, small businesses, and communities to improve their cybersecurity knowledge and promote digital safety through campaigns, education, and collaboration.
      </p>

      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div className="bg-emerald-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
          <ShieldCheck className="text-emerald-600 w-8 h-8 mb-4" />
          <h4 className="text-xl font-semibold mb-2">Trusted Guidance</h4>
          <p className="text-gray-600 text-sm">
            Access verified tools and advice to protect your digital life and business.
          </p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
          <Users className="text-emerald-600 w-8 h-8 mb-4" />
          <h4 className="text-xl font-semibold mb-2">Community-Driven</h4>
          <p className="text-gray-600 text-sm">
            Engage with small businesses and community members promoting cybersecurity awareness.
          </p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
          <BookOpen className="text-emerald-600 w-8 h-8 mb-4" />
          <h4 className="text-xl font-semibold mb-2">Learning Resources</h4>
          <p className="text-gray-600 text-sm">
            Learn through blogs, infographics, checklists, and guides curated by experts.
          </p>
        </div>
      </div>
    </div>
  </section>
);
