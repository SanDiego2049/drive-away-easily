import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  Users,
  FileText,
  Car,
  ShieldCheck,
  DollarSign,
} from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import { useUser } from "../components/contexts/UserContext";
import DashboardCharts from "../components/dashboard/DashboardCharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const customerStats = [
    { icon: <FileText />, label: "My Bookings", value: 12 },
    { icon: <DollarSign />, label: "Total Spent", value: "₦340,000" },
    { icon: <Car />, label: "Vehicles Rented", value: 5 },
  ];

  const adminStats = [
    { icon: <Users />, label: "Total Users", value: 128 },
    { icon: <ShieldCheck />, label: "KYC Pending", value: 7 },
    { icon: <Car />, label: "Vehicles Listed", value: 20 },
    { icon: <FileText />, label: "Total Bookings", value: 45 },
  ];

  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-12 md:mt-6 w-full">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBack}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-2xl truncate sm:text-4xl font-bold text-gray-900">
              Welcome, {user.first_name}{" "}
            </h1>
          </div>

          {/* Search Bar */}
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

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(user?.role === "admin" ? adminStats : customerStats).map(
            ({ icon, label, value }) => (
              <div
                key={label}
                className="bg-white p-5 rounded-lg shadow flex items-center gap-4"
              >
                <div className="text-orange-500 p-3">{icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-xl font-semibold text-gray-800">{value}</p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Charts */}
        <div className="mt-10">
          <DashboardCharts role={user?.role?.toLowerCase()} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
