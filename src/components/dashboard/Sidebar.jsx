import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ClipboardList,
  UserCheck,
  Car,
  User,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { useUser } from "../contexts/UserContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, setUser } = useUser();

  const isAdmin = user?.role === "admin";

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    {
      to: "/dashboard/bookings",
      label: isAdmin ? "Manage Bookings" : "My Bookings",
      icon: <ClipboardList size={18} />,
    },
    ...(isAdmin
      ? [
          {
            to: "/dashboard/kyc",
            label: "KYC Approvals",
            icon: <UserCheck size={18} />,
          },
          {
            to: "/dashboard/vehicles",
            label: "Vehicle Management",
            icon: <Car size={18} />,
          },
        ]
      : []),
    { to: "/dashboard/profile", label: "Profile", icon: <User size={18} /> },
    {
      to: "/dashboard/settings",
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <>
      {/* Hamburger toggle - repositioned */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 text-orange-500 p-2 rounded-md shadow-sm"
        >
          <Menu />
        </button>
      )}

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-md z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="h-full flex flex-col justify-between p-6 pt-20 lg:pt-8">
          {/* Mobile close button inside sidebar */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>

          {/* Top navigation */}
          <div>
            <div className="w-14 h-14 rounded-full border-2 border-orange-500 flex items-center justify-center text-orange-500 font-bold text-xl mb-6 shadow hover:scale-105 transition">
              <UserCircle />
            </div>
            <nav className="space-y-4">
              {navLinks.map(({ to, label, icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)} // close on mobile after click
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 transition ${
                    location.pathname === to ? "text-orange-500" : ""
                  }`}
                >
                  <span>{icon}</span>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Logout button pinned to bottom */}
          <button
            onClick={handleLogout}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded-md text-sm text-red-600 hover:bg-red-100 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
