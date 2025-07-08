import React from "react";
import { Link, useLocation } from "react-router-dom";

export const DashboardSidebar = ({ user }) => {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Overview", to: "/dashboard" },
    { label: "Post Campaign", to: "/campaigns/create" },
    { label: "User Details", to: "/dashboard/details" },
  ];

  return (
    <aside className="bg-emerald-50 w-60 p-6 space-y-6 rounded-lg shadow-md">
      <div className="text-center">
        <p className="text-lg font-semibold text-emerald-800">{user?.name}</p>
        <p className="text-sm text-emerald-600">{user?.email}</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-3 py-2 rounded font-medium transition-colors ${
                isActive
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
