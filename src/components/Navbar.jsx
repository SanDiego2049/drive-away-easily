import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    console.log("Navigate to login");
    navigate("/login");
  };

  const navigateToSignup = () => {
    console.log("Navigate to signup");
    navigate("/signup");
  };

  // Helper function to determine if a link is active
  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="relative z-50 pt-4">
      <div className="backdrop-blur-sm shadow-sm bg-white/80 w-full max-w-full sm:max-w-7xl sm:rounded-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              Drive Away Easily
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className={`px-3 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 ${
                isActiveLink("/")
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Home
            </a>
            <a
              href="/cars"
              className={`px-3 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 ${
                isActiveLink("/cars")
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Products
            </a>
            <a
              href="/about"
              className={`px-3 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 ${
                isActiveLink("/about")
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              About Us
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={navigateToLogin}
              className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium cursor-pointer transition-colors duration-200"
            >
              Login
            </button>
            <button
              onClick={navigateToSignup}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer duration-200 shadow-sm"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-md transition-colors cursor-pointer duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          <a
            href="/"
            className={`block cursor-pointer px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-gray-50 rounded-md ${
              isActiveLink("/")
                ? "text-orange-500"
                : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={closeMenu}
          >
            Home
          </a>
          <a
            href="/cars"
            className={`block cursor-pointer px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-gray-50 rounded-md ${
              isActiveLink("/cars")
                ? "text-orange-500"
                : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={closeMenu}
          >
            Products
          </a>
          <a
            href="/about"
            className={`block cursor-pointer px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-gray-50 rounded-md ${
              isActiveLink("/about")
                ? "text-orange-500"
                : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={closeMenu}
          >
            About Us
          </a>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 space-y-2">
            <button
              onClick={() => {
                navigateToLogin();
                closeMenu();
              }}
              className="w-full text-left text-gray-700 cursor-pointer hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigateToSignup();
                closeMenu();
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 shadow-sm"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop/overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] md:hidden transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
