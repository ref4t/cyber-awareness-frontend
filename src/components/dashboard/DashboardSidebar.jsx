// src/components/dashboard/DashboardSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const DashboardSidebar = ({ user }) => {
  const { pathname } = useLocation();
  const navItems = [
    { label: 'Dashboard', to: '/dashboard' },
    // { label: 'My Campaigns', to: '/dashboard/campaigns' },
    // { label: 'My Blogs', to: '/dashboard/blogs' },
    // Add post blog link
    { label: 'New Blog', to: '/blog/create' },
    { label: 'New Campaign', to: '/campaigns/create' },
    // Additional items based on role
    ...(user?.role === 'business'
      ? [{ label: 'Business Details', to: '/dashboard/details' }]
      : [{ label: 'User Details', to: '/dashboard/details' }]),
  ];

  return (
    <aside className="bg-emerald-50 w-60 p-6 space-y-4 rounded-lg shadow-md">
      <nav className="space-y-2">
        {navItems.map(item => {
          const active = pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-3 py-2 rounded font-medium transition-colors ${
                active
                  ? 'bg-emerald-200 text-emerald-800'
                  : 'text-emerald-700 hover:bg-emerald-100'
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
