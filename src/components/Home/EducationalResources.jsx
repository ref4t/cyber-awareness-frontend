import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, KeyRound, EyeOff } from "lucide-react";

export const EducationalResources = () => {
  const resources = [
    {
      title: "Phishing Detection",
      slug: "phishing",
      description: "Understand how phishing attacks work and how to spot them in emails or texts.",
      icon: <ShieldAlert className="w-8 h-8 text-emerald-600" />,
    },
    {
      title: "Password Security",
      slug: "passwords",
      description: "Learn how to create strong, unique passwords and manage them safely.",
      icon: <KeyRound className="w-8 h-8 text-emerald-600" />,
    },
    {
      title: "Social Engineering",
      slug: "social-engineering",
      description: "Recognize manipulative tactics and protect your personal information.",
      icon: <EyeOff className="w-8 h-8 text-emerald-600" />,
    },
  ];

  return (
    <section className="py-20 px-6 bg-grey-50">
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-12">
        Educational Resources
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {resources.map((res, idx) => (
          <Link
            key={idx}
            to={`/resources/${res.slug}`}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition duration-300 block group"
          >
            <div className="mb-4">{res.icon}</div>
            <h3 className="text-xl font-semibold text-emerald-700 group-hover:underline mb-2">
              {res.title}
            </h3>
            <p className="text-sm text-gray-600">{res.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
