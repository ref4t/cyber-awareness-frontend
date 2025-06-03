import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const ContactUs = () => (
  <>
    <Navbar />
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-2">Have questions or need support? Reach out to us:</p>
      <ul className="space-y-1 text-gray-700">
        <li>Email: <a href="mailto:support@cybershield.com" className="text-blue-600 hover:underline">support@cybershield.com</a></li>
        <li>Phone: <a href="tel:+15555555555" className="text-blue-600 hover:underline">+1 (555) 555-5555</a></li>
        <li>Address: 123 Security Ave, Cyber City</li>
      </ul>
    </div>
    <Footer />
  </>
);

export default ContactUs;
