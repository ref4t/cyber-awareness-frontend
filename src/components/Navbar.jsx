import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axios";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">CyberShield</h1>
        <nav className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-white/80">Home</Link>
          <Link to="/campaigns" className="hover:text-white/80">Campaigns</Link>
          <Link to="/blog" className="hover:text-white/80">Blog</Link>
          <Link to="/resources" className="hover:text-white/80">Resources</Link>
          <Link to="/helpline" className="hover:text-white/80">Helpline</Link>
        </nav>
        <div className="space-x-3 relative" ref={dropdownRef}>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white px-4 py-2 rounded hover:bg-emerald-700"
              >
                {user?.name || "User"} ▾
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Logout
                  </Link>
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
          {/* <Link to="/signup">
            <button className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded text-white">Get Started</button>
          </Link> */}
        </div>
      </div>
    </header>
  );
};