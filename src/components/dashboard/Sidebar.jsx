import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const { user, setUser } = useUser();

  const isAdmin = user?.role === "admin";
  const basePath = isAdmin ? "/admin/dashboard" : "/dashboard";

  // Handle viewport height changes for mobile browsers
  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    if (window.visualViewport) {
      const handleVisualViewportChange = () => {
        setViewportHeight(window.visualViewport.height);
      };
      window.visualViewport.addEventListener(
        "resize",
        handleVisualViewportChange
      );

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("orientationchange", handleResize);
        window.visualViewport.removeEventListener(
          "resize",
          handleVisualViewportChange
        );
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const navLinks = [
    { to: `${basePath}`, label: "Dashboard", icon: <Home size={18} /> },
    {
      to: `${basePath}/bookings`,
      label: isAdmin ? "Manage Bookings" : "My Bookings",
      icon: <ClipboardList size={18} />,
    },
    ...(isAdmin
      ? [
          {
            to: `${basePath}/kyc-approvals`,
            label: "KYC Approvals",
            icon: <UserCheck size={18} />,
          },
          {
            to: `${basePath}/vehicle-management`,
            label: "Vehicle Management",
            icon: <Car size={18} />,
          },
        ]
      : []),
    { to: `${basePath}/profile`, label: "Profile", icon: <User size={18} /> },
    {
      to: `${basePath}/settings`,
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    setUser(null);
    window.location.href = isAdmin ? "/admin/login" : "/login";
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
        className={`fixed top-0 left-0 bg-white shadow-md z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 lg:translate-x-0 lg:static lg:w-64 lg:h-screen`}
        style={{
          height: `${viewportHeight}px`,
          width: "16rem", // 64 * 0.25rem = 16rem
        }}
      >
        <div className="h-full flex flex-col justify-between p-6 pt-20 lg:pt-8 overflow-y-auto">
          {/* Mobile close button inside sidebar */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>

          {/* Top navigation */}
          <div className="flex-1 min-h-0">
            <div className="w-14 h-14 rounded-full border-2 border-orange-500 flex items-center justify-center text-orange-500 font-bold text-xl mb-6 shadow hover:scale-105 transition">
              <UserCircle />
            </div>
            <nav className="space-y-4">
              {navLinks.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === basePath} // Only set `end` on the base dashboard link
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md text-sm transition ${
                      isActive
                        ? "text-orange-500 "
                        : "text-gray-700 hover:bg-orange-100"
                    }`
                  }
                >
                  <span>{icon}</span>
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Logout button pinned to bottom */}
          <div className="flex-shrink-0 pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm text-red-600 hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
