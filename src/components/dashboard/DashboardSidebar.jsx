import { Link } from "react-router-dom";

export const DashboardSidebar = ({ user }) => (
  <aside className="bg-gray-100 w-60 p-4 space-y-4">
    <div>
      <p className="font-semibold">{user?.name}</p>
      <p className="text-sm text-gray-600">{user?.email}</p>
    </div>
    <nav className="space-y-2">
      <Link to="/dashboard" className="block hover:underline">
        Overview
      </Link>
      <Link to="/campaigns/create" className="block hover:underline">
        Post Campaign
      </Link>
      <Link to="/dashboard/details" className="block hover:underline">
        User Details
      </Link>
    </nav>
  </aside>
);
