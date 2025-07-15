import { useState, useEffect } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const navigateToLogin = () =>
    navigate("/login", { state: { from: location.pathname } });
  const navigateToSignup = () =>
    navigate("/signup", { state: { from: location.pathname } });
  const navigateToDashboard = () => navigate("/dashboard");

  const isActiveLink = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <nav className="relative z-50 pt-4">
      <div className="backdrop-blur-sm shadow-sm bg-white/80 w-full max-w-full sm:max-w-7xl sm:rounded-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              Drive Away Easily
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", path: "/" },
              { label: "Products", path: "/cars" },
              { label: "About Us", path: "/about" },
            ].map(({ label, path }) => (
              <a
                key={path}
                href={path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActiveLink(path)
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={navigateToDashboard}
                className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition"
              >
                <UserCircle className="w-6 h-6 text-orange-600" />
              </button>
            ) : (
              <>
                <button
                  onClick={navigateToLogin}
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={navigateToSignup}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-t border-gray-200 transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen
            ? "max-h-[400px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {[
            { label: "Home", path: "/" },
            { label: "Products", path: "/cars" },
            { label: "About Us", path: "/about" },
          ].map(({ label, path }) => (
            <a
              key={path}
              href={path}
              onClick={closeMenu}
              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                isActiveLink(path)
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {label}
            </a>
          ))}

          <div className="pt-4 space-y-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  navigateToDashboard();
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-md text-base font-medium transition"
              >
                <UserCircle className="w-5 h-5" />
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigateToLogin();
                    closeMenu();
                  }}
                  className="w-full text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigateToSignup();
                    closeMenu();
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-base font-medium transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
