import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import { useUser } from "../components/contexts/UserContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleToHome = () => navigate("/");

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar - fixed */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar - fixed */}
        <header className="sticky top-0 z-20 bg-gray-50 px-4 sm:px-6 lg:px-8 pb-8 pt-16 lg:pt-8 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToHome}
                className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h1 className="text-2xl truncate sm:text-4xl text-gray-900">
                Welcome, {user.first_name}
              </h1>
            </div>

            {/* Search */}
            <div className="w-full sm:w-auto relative">
              <div
                className={`flex items-center bg-white rounded-full shadow border border-gray-300 transition-all duration-300 overflow-hidden ${
                  showSearch ? "w-full sm:w-64" : "w-10"
                }`}
              >
                {showSearch && (
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 px-3 py-2"
                    autoFocus
                  />
                )}
                <button
                  onClick={() => setShowSearch((prev) => !prev)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-6">
          {/* Other pages */}
          <div className="mt-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
