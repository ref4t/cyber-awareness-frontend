import React from "react";
import { CheckCircle } from "lucide-react";

export const CyberRiskChecklist = () => {
  const checklistItems = [
    "Is your data regularly backed up?",
    "Are all passwords strong and unique?",
    "Do you use multi-factor authentication?",
    "Is antivirus software up-to-date?",
    "Are staff trained to identify phishing?",
    "Do you monitor suspicious login activities?",
  ];

  return (
    <section className="py-20 px-6 bg-emerald-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-emerald-700 mb-8">
          Cyber Risk Checklist
        </h2>
        <p className="text-gray-600 mb-10">
          Use this quick 6-point checklist to assess your cybersecurity readiness.
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {checklistItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 p-4 bg-emerald-50 rounded shadow-sm border hover:shadow-md transition"
            >
              <CheckCircle className="w-6 h-6 text-emerald-600 mt-1" />
              <span className="text-gray-800">{item}</span>
            </div>
          ))}
        </div>
        <button className="mt-10 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
          Take Full Assessment
        </button>
      </div>
    </section>
  );
};
