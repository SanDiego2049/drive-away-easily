import { useEffect, useState } from "react";
import { Calendar, Car, XCircle, RotateCcw } from "lucide-react";
import carImage1 from "../../assets/carImage1.jpg";
import carImage2 from "../../assets/carImage2.jpg";
import carImage3 from "../../assets/carImage3.jpg";
import carImage4 from "../../assets/carImage4.jpg";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isPastBooking = (endDateStr) => {
    const today = new Date();
    const endDate = new Date(endDateStr + "T23:59:59");
    return endDate < today;
  };

  useEffect(() => {
    setIsLoading(true);
    const storedBookings = localStorage.getItem("bookingInfo");

    if (storedBookings) {
      try {
        const parsedData = JSON.parse(storedBookings);

        let bookingsArray = [];
        if (Array.isArray(parsedData)) {
          bookingsArray = parsedData;
        } else if (parsedData.bookingDetails) {
          bookingsArray = Array.isArray(parsedData.bookingDetails)
            ? parsedData.bookingDetails
            : [parsedData.bookingDetails];
        } else if (typeof parsedData === "object" && parsedData.id) {
          bookingsArray = [parsedData];
        }

        setBookings(bookingsArray);
      } catch (error) {
        console.error("Error parsing bookings:", error);
        setBookings([]);
      }
    } else {
      const dummyBookings = [
        {
          id: 1,
          name: "Toyota Camry 2022",
          category: "Sedan",
          transmission: "Auto",
          rating: 4.8,
          price: 45000,
          image: carImage1,
          fuelType: "Gasoline",
          doors: 4,
          seats: 5,
          startDate: "2025-08-01",
          endDate: "2025-08-03",
          status: "confirmed",
        },
        {
          id: 2,
          name: "Honda CR-V 2023",
          category: "SUV",
          transmission: "Manual",
          rating: 4.9,
          price: 65000,
          image: carImage2,
          fuelType: "Hybrid",
          doors: 4,
          seats: 5,
          startDate: "2024-07-05",
          endDate: "2024-08-13",
          status: "confirmed",
        },
        {
          id: 3,
          name: "BMW X5 2023",
          category: "Luxury",
          transmission: "Auto",
          rating: 4.9,
          price: 120000,
          image: carImage4,
          fuelType: "Gasoline",
          doors: 4,
          seats: 7,
          startDate: "2023-04-21",
          endDate: "2023-05-30",
          status: "confirmed",
        },
        {
          id: 4,
          name: "Mercedes Sprinter 2021",
          category: "Bus",
          transmission: "Manual",
          rating: 4.6,
          price: 95000,
          image: carImage3,
          fuelType: "Diesel",
          doors: 4,
          seats: 12,
          startDate: "2023-02-14",
          endDate: "2023-02-14",
          status: "confirmed",
        },
      ];
      setBookings(dummyBookings);
      localStorage.setItem("bookingInfo", JSON.stringify(dummyBookings));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      const existingData = localStorage.getItem("bookingInfo");
      let dataToSave = { bookingDetails: bookings };

      if (existingData) {
        try {
          const parsedData = JSON.parse(existingData);
          if (parsedData.user) {
            dataToSave.user = parsedData.user;
          }
        } catch (error) {
          console.error("Error parsing existing data:", error);
        }
      }

      localStorage.setItem("bookingInfo", JSON.stringify(dataToSave));
    }
  }, [bookings]);

  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
  };

  const rebook = (id) => {
    const original = bookings.find((b) => b.id === id);
    if (!original) return;

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    const twoDaysLaterStr = twoDaysLater.toISOString().split("T")[0];

    const newBooking = {
      ...original,
      id: Date.now(),
      status: "confirmed",
      startDate: todayStr,
      endDate: twoDaysLaterStr,
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const upcomingBookings = bookings.filter(
    (b) => !isPastBooking(b.endDate) && b.status !== "cancelled"
  );
  const pastBookings = bookings.filter((b) => isPastBooking(b.endDate));

  const renderBooking = (booking) => {
    const isPast = isPastBooking(booking.endDate);
    const isCancelled = booking.status === "cancelled";

    return (
      <div
        key={booking.id}
        className={`bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 border-l-4 ${
          isCancelled
            ? "border-red-400 opacity-75"
            : isPast
            ? "border-gray-400"
            : "border-green-500"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full">
          <div className="text-orange-500 p-3 rounded-full self-start sm:self-center">
            <Car className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-left">
            <p
              className={`text-lg ${
                isCancelled ? "text-gray-500 line-through" : "text-gray-800"
              }`}
            >
              {booking.name}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              From {booking.startDate} to {booking.endDate}
            </p>
            <p className="text-xs text-gray-600">
              Amount: ₦{booking.price?.toLocaleString() || 0}
            </p>
            <span
              className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                isCancelled
                  ? "bg-red-100 text-red-600"
                  : isPast
                  ? "bg-gray-200 text-gray-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {isCancelled ? "Cancelled" : isPast ? "Past Booking" : "Upcoming"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-end sm:justify-start">
          {!isPast && !isCancelled && (
            <button
              onClick={() => cancelBooking(booking.id)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          )}
          {isPast && !isCancelled && (
            <button
              onClick={() => rebook(booking.id)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full transition"
            >
              <RotateCcw className="w-4 h-4" />
              Rebook
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl sm:text-3xl text-gray-800 mb-6">My Bookings</h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading bookings...</div>
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <>
          <section className="mb-8">
            <h3 className="text-xl text-green-700 mb-4">Upcoming Bookings</h3>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map(renderBooking)}
              </div>
            ) : (
              <p className="text-gray-500">No upcoming bookings.</p>
            )}
          </section>

          <section>
            <h3 className="text-xl text-gray-700 mb-4">Past Bookings</h3>
            {pastBookings.length > 0 ? (
              <div className="space-y-4">{pastBookings.map(renderBooking)}</div>
            ) : (
              <p className="text-gray-500">No past bookings.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default MyBookings;
