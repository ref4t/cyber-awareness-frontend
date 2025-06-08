import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axios";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    API.get("/user/data", { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data.user);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-emerald-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="CyberShield Logo" className="w-9 h-9 object-contain" />
          <h1 className="text-xl font-bold">CyberShield</h1>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-white/80">Home</Link>
          <Link to="/campaigns" className="hover:text-white/80">Campaigns</Link>
          <Link to="/blog" className="hover:text-white/80">Blog</Link>
          <Link to="/resources" className="hover:text-white/80">Resources</Link>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2 rounded hover:bg-emerald-700"
              >
                {user?.name || "User"} ▾
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-gray-700 border rounded shadow-lg z-20">
                  {!user?.isAccountVerified && (
                    <Link to="/verify-otp" className="block px-4 py-2 text-sm hover:bg-gray-100">Verify Email</Link>
                  )}
                  <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</Link>
                  <Link to="/logout" className="block px-4 py-2 text-sm hover:bg-gray-100">Logout</Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-emerald-700 border border-emerald-700 px-4 py-2 rounded hover:bg-emerald-50"
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-emerald-600">
          <Link to="/" className="block py-1 border-b border-emerald-500">Home</Link>
          <Link to="/campaigns" className="block py-1 border-b border-emerald-500">Campaigns</Link>
          <Link to="/blog" className="block py-1 border-b border-emerald-500">Blog</Link>
          <Link to="/resources" className="block py-1 border-b border-emerald-500">Resources</Link>

          {isLoggedIn ? (
            <>
              {!user?.isAccountVerified && (
                <Link to="/verify-otp" className="block py-1 border-b border-emerald-500">Verify Email</Link>
              )}
              <Link to="/dashboard" className="block py-1 border-b border-emerald-500">Dashboard</Link>
              <Link to="/logout" className="block py-1">Logout</Link>
            </>
          ) : (
            <Link to="/login" className="block py-1">Login</Link>
          )}
        </div>
      )}
    </header>
  );
};
