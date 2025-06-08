import React from "react";

export const Features = () => (
  <section className="py-16 px-6 bg-white text-center">
    <h3 className="text-2xl font-semibold mb-10">How CyberShield Helps You</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div>
        <div className="text-4xl mb-2">🔒</div>
        <h4 className="font-semibold">Learn</h4>
        <p>Read tips, blogs, and watch videos.</p>
      </div>
      <div>
        <div className="text-4xl mb-2">📢</div>
        <h4 className="font-semibold">Launch Campaigns</h4>
        <p>Promote security by staff and clients.</p>
      </div>
      <div>
        <div className="text-4xl mb-2">🤝</div>
        <h4 className="font-semibold">Connect</h4>
        <p>Reach out for help or share your story.</p>
      </div>
    </div>
  </section>
);
