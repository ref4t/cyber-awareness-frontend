import React from "react";
import { Mail } from "lucide-react";

export const NewsletterSignup = () => (
  <section className="py-16 px-6 bg-emerald-500 text-white text-center bg-gradient-to-br from-emerald-500 to-emerald-400">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Get Weekly Cybersecurity Tips</h2>
      <p className="mb-6 text-sm md:text-base text-white/90">
        Stay updated with practical advice, new threats, and awareness campaigns—straight to your inbox.
      </p>

      <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="relative w-full sm:w-auto">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="pl-10 pr-4 py-2 rounded-md w-full sm:w-[300px] border-2 border-white text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-emerald-300"
          />
        </div>
        <button
          type="submit"
          className="bg-white text-emerald-700 px-6 py-2 rounded-md font-semibold hover:bg-emerald-100 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>
);
