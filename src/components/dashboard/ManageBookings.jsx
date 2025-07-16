import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Ban, CheckCircle, Eye } from "lucide-react";

const dummyBookings = [
  {
    id: 1,
    user: "johndoe@example.com",
    car: "Toyota Camry",
    status: "Pending",
    date: "2025-07-18",
  },
  {
    id: 2,
    user: "janesmith@example.com",
    car: "Honda Civic",
    status: "Confirmed",
    date: "2025-07-20",
  },
  {
    id: 3,
    user: "marklee@example.com",
    car: "Ford Mustang",
    status: "Cancelled",
    date: "2025-07-15",
  },
];

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Replace with API call later
    setBookings(dummyBookings);
  }, []);

  const handleAction = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    toast.success(`Booking ${newStatus}`);
  };

  const filteredBookings =
    filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl mb-4">Manage Bookings</h2>

      <div className="flex items-center gap-4 mb-6">
        {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md border ${
              filter === status
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left bg-white border rounded-md">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Car</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{booking.user}</td>
                <td className="px-4 py-2">{booking.car}</td>
                <td className="px-4 py-2">{booking.date}</td>
                <td className="px-4 py-2">{booking.status}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => toast("Viewing booking details")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Eye size={18} />
                  </button>
                  {booking.status !== "Cancelled" && (
                    <button
                      onClick={() => handleAction(booking.id, "Cancelled")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Ban size={18} />
                    </button>
                  )}
                  {booking.status === "Pending" && (
                    <button
                      onClick={() => handleAction(booking.id, "Confirmed")}
                      className="text-green-600 hover:text-green-800"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
