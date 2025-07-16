import { FileText, DollarSign, Car, Users, ShieldCheck } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import DashboardCharts from "./DashboardCharts";

const DashboardHome = () => {
  const { user } = useUser();

  const customerStats = [
    { icon: <FileText />, label: "My Bookings", value: 7 },
    { icon: <DollarSign />, label: "Total Spent", value: "₦340,000" },
    { icon: <Car />, label: "Vehicles Rented", value: 5 },
  ];

  const adminStats = [
    { icon: <Users />, label: "Total Users", value: 128 },
    { icon: <ShieldCheck />, label: "KYC Pending", value: 7 },
    { icon: <Car />, label: "Vehicles Listed", value: 20 },
    { icon: <FileText />, label: "Total Bookings", value: 45 },
  ];

  return (
    <>
      {/* Stat Cards */}
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
                <p className="text-xl text-gray-800">{value}</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Charts */}
      <div className="mt-10">
        <DashboardCharts role={user?.role?.toLowerCase()} />
      </div>
    </>
  );
};

export default DashboardHome;
