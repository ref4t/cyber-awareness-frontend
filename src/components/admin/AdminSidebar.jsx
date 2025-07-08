import React from "react";
import { Link, useLocation } from "react-router-dom";

export const AdminSidebar = () => {
  const { pathname } = useLocation();
  const navItems = [
    { label: "Dashboard", to: "/admin" },
  ];
  return (
    <aside className="bg-emerald-50 w-60 p-6 space-y-6 rounded-lg shadow-md">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-3 py-2 rounded font-medium transition-colors ${
                active
                  ? "bg-emerald-200 text-emerald-800"
                  : "text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
