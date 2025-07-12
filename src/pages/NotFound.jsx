import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="backdrop-blur-sm shadow-lg bg-white/80 max-w-md w-full rounded-lg p-8 text-center">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-gray-900 mb-2">404</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={navigateToHome}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Go to Home
          </button>

          <button
            onClick={goBack}
            className="w-full text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 border border-gray-300 hover:border-gray-400 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team or visit our{" "}
            <button
              onClick={navigateToHome}
              className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              homepage
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
