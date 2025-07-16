import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Star, User } from "lucide-react";
import { vehicles } from "../data/VehicleList";
import SmallerFooter from "../components/SmallerFooter";
import { useUser } from "../components/contexts/UserContext";
import toast from "react-hot-toast";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const vehicleId = searchParams.get("vehicleId");
  const selectedVehicle =
    vehicles.find((v) => v.id === parseInt(vehicleId)) || vehicles[0];
  const today = new Date().toISOString().split("T")[0];

  const [bookingData, setBookingData] = useState({
    pickupDate: "",
    dropoffDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    customerName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    additionalRequests: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => {
      let updated = { ...prev, [name]: value };
      if (
        name === "pickupDate" &&
        updated.dropoffDate &&
        new Date(updated.dropoffDate) < new Date(value)
      ) {
        updated.dropoffDate = "";
      }
      return updated;
    });
  };

  const calculateRentalDetails = () => {
    if (!bookingData.pickupDate || !bookingData.dropoffDate) {
      return { days: 0, totalPrice: 0 };
    }
    const pickup = new Date(bookingData.pickupDate);
    const dropoff = new Date(bookingData.dropoffDate);
    const diffTime = dropoff - pickup;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      days: diffDays,
      totalPrice: diffDays * selectedVehicle.price,
    };
  };

  const { days, totalPrice } = calculateRentalDetails();

  const handleProceedToPayment = () => {
    if (!user) {
      toast.error("Please log in to proceed with booking.");
      navigate("/login");
      return;
    }
    const {
      pickupDate,
      dropoffDate,
      pickupLocation,
      dropoffLocation,
      customerName,
      email,
      phone,
      licenseNumber,
    } = bookingData;
    if (
      !pickupDate ||
      !dropoffDate ||
      !pickupLocation ||
      !dropoffLocation ||
      !customerName ||
      !email ||
      !phone ||
      !licenseNumber
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    if (pickup >= dropoff) {
      toast.error("End date must be after start date.");
      return;
    }
    const bookingPayload = {
      ...bookingData,
      id: Date.now(),
      name: selectedVehicle.name,
      category: selectedVehicle.category,
      transmission: selectedVehicle.transmission,
      rating: selectedVehicle.rating,
      price: totalPrice,
      image: selectedVehicle.image,
      fuelType: selectedVehicle.fuelType,
      doors: selectedVehicle.doors,
      seats: selectedVehicle.seats,
      startDate: pickupDate,
      endDate: dropoffDate,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const paymentData = { bookingDetails: bookingPayload, user };
    localStorage.setItem("bookingInfo", JSON.stringify(paymentData));
    navigate("/payment", { state: paymentData });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white pt-20 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/cars")}
            className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 mb-4 text-sm sm:text-base"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to vehicles
          </button>
          <h1 className="text-2xl sm:text-3xl text-gray-900 font-semibold">
            Book This Vehicle
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 sm:h-80 md:h-96 bg-gray-200 overflow-hidden">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl sm:text-2xl text-gray-900 mb-2 font-semibold">
                  {selectedVehicle.name}
                </h2>
                <div className="flex items-center mb-4">
                  <span className="text-orange-300 mr-1">
                    <Star fill="orange" />
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {selectedVehicle.rating}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl text-gray-900 mb-6 font-bold">
                  ₦{selectedVehicle.price.toLocaleString()}
                  <span className="text-sm text-gray-600 font-normal ml-1">
                    /day
                  </span>
                </div>

                <div className="space-y-4 text-sm sm:text-base">
                  <h3 className="text-lg text-gray-900 font-semibold mb-2">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500">Engine</span>
                      <p className="font-medium">{selectedVehicle.fuelType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Doors</span>
                      <p className="font-medium">{selectedVehicle.doors}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Seats</span>
                      <p className="font-medium">{selectedVehicle.seats}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    KYC Requirements
                  </h4>
                  <ul className="text-sm sm:text-base text-blue-800 space-y-1 list-disc list-inside">
                    <li>Valid Driver's License</li>
                    <li>National ID</li>
                    <li>Utility Bill</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form className="space-y-6">
                {/* Dates */}
                <div>
                  <h3 className="text-lg sm:text-xl text-gray-900 mb-4 flex items-center font-semibold">
                    <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                    Rental Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="pickupDate"
                        value={bookingData.pickupDate}
                        min={today}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="dropoffDate"
                        value={bookingData.dropoffDate}
                        min={bookingData.pickupDate || today}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Locations */}
                <div>
                  <h3 className="text-lg sm:text-xl text-gray-900 mb-4 flex items-center font-semibold">
                    <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                    Location Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                      name="pickupLocation"
                      value={bookingData.pickupLocation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select pickup location</option>
                      <option value="lagos-airport">Lagos Airport</option>
                      <option value="victoria-island">Victoria Island</option>
                      <option value="ikeja">Ikeja</option>
                      <option value="lekki">Lekki</option>
                      <option value="surulere">Surulere</option>
                    </select>
                    <select
                      name="dropoffLocation"
                      value={bookingData.dropoffLocation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select drop-off location</option>
                      <option value="lagos-airport">Lagos Airport</option>
                      <option value="victoria-island">Victoria Island</option>
                      <option value="ikeja">Ikeja</option>
                      <option value="lekki">Lekki</option>
                      <option value="surulere">Surulere</option>
                    </select>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg sm:text-xl text-gray-900 mb-4 flex items-center font-semibold">
                    <User className="h-5 w-5 mr-2 text-orange-500" />
                    Customer Info
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        name: "customerName",
                        placeholder: "Full Name",
                        type: "text",
                      },
                      { name: "email", placeholder: "Email", type: "email" },
                      { name: "phone", placeholder: "Phone", type: "tel" },
                      {
                        name: "licenseNumber",
                        placeholder: "Driver's License",
                        type: "text",
                      },
                    ].map((field) => (
                      <input
                        key={field.name}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={bookingData[field.name]}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    ))}
                  </div>
                  <textarea
                    name="additionalRequests"
                    rows="3"
                    placeholder="Any special requests?"
                    value={bookingData.additionalRequests}
                    onChange={handleInputChange}
                    className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span>Vehicle:</span>
                    <span className="font-medium">{selectedVehicle.name}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span>Daily Rate:</span>
                    <span className="font-medium">
                      ₦{selectedVehicle.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span>Rental Duration:</span>
                    <span className="font-medium">
                      {days} day{days !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2 text-lg flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-orange-600">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md text-lg font-semibold"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <SmallerFooter />
    </div>
  );
};

export default Booking;
