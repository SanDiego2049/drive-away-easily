import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
} from "lucide-react";
import { vehicles } from "../data/VehicleList";
import SmallerFooter from "../components/SmallerFooter";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const vehicleId = searchParams.get("vehicleId");

  

  // Find the selected vehicle
  const selectedVehicle =
    vehicles.find((v) => v.id === parseInt(vehicleId)) || vehicles[0];

  // Booking form state
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

  // Calculate rental duration and total price
  const calculateRentalDetails = () => {
    if (!bookingData.pickupDate || !bookingData.dropoffDate) {
      return { days: 0, totalPrice: 0 };
    }

    const pickup = new Date(bookingData.pickupDate);
    const dropoff = new Date(bookingData.dropoffDate);
    const diffTime = Math.abs(dropoff - pickup);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      days: diffDays,
      totalPrice: diffDays * selectedVehicle.price,
    };
  };

  const { days, totalPrice } = calculateRentalDetails();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log("Booking submitted:", {
      ...bookingData,
      vehicleId: selectedVehicle.id,
    });
    // For now, just show an alert
    alert(
      "Booking submitted successfully! You will receive a confirmation email shortly."
    );
    navigate("/"); // Redirect to home page
  };

  // Handle back to vehicles
  const handleBackToVehicles = () => {
    navigate("/cars");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-20 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBackToVehicles}
            className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to vehicles
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Book This Vehicle
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle Details - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Vehicle Image */}
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Vehicle Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedVehicle.name}
                </h2>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-sm font-medium text-gray-700">
                    {selectedVehicle.rating}
                  </span>
                </div>

                <div className="text-3xl font-bold text-gray-900 mb-6">
                  ₦{selectedVehicle.price.toLocaleString()}
                  <span className="text-sm text-gray-600 font-normal">
                    /day
                  </span>
                </div>

                {/* Vehicle Specifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Vehicle Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Engine</span>
                      <p className="font-medium">{selectedVehicle.fuelType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Doors</span>
                      <p className="font-medium">{selectedVehicle.doors}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Fuel Type</span>
                      <p className="font-medium">{selectedVehicle.fuelType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Seats</span>
                      <p className="font-medium">{selectedVehicle.seats}</p>
                    </div>
                  </div>
                </div>

                {/* KYC Requirements */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    KYC Requirements
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Valid Driver's License</li>
                    <li>• National ID</li>
                    <li>• Utility Bill</li>
                  </ul>
                </div>

                {/* Rental Policies */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Rental Policies
                  </h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>
                      <strong>Cancellation Policy:</strong> Free cancellation up
                      to 24 hours before pickup
                    </p>
                    <p>
                      <strong>Fuel Policy:</strong> Full tank policy - pay
                      deposit and return with full tank
                    </p>
                    <p>
                      <strong>Late Return Fee:</strong> N5,000 per hour for late
                      returns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rental Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                    Rental Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="pickupDate"
                        value={bookingData.pickupDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
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
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                    Location Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Drop-off Location
                      </label>
                      <select
                        name="pickupLocation"
                        value={bookingData.pickupLocation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      >
                        <option value="">Select pickup location</option>
                        <option value="lagos-airport">Lagos Airport</option>
                        <option value="victoria-island">Victoria Island</option>
                        <option value="ikeja">Ikeja</option>
                        <option value="lekki">Lekki</option>
                        <option value="surulere">Surulere</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Drop-off Location
                      </label>
                      <select
                        name="dropoffLocation"
                        value={bookingData.dropoffLocation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
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
                </div>

                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-orange-500" />
                    What's Owner?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={bookingData.customerName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Number
                      </label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={bookingData.licenseNumber}
                        onChange={handleInputChange}
                        placeholder="Enter driver's license number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requests
                    </label>
                    <textarea
                      name="additionalRequests"
                      value={bookingData.additionalRequests}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Any special requests or requirements"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Booking Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Vehicle:</span>
                      <span className="font-medium">
                        {selectedVehicle.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Rate:</span>
                      <span className="font-medium">
                        ₦{selectedVehicle.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rental Duration:</span>
                      <span className="font-medium">
                        {days} day{days !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount:</span>
                        <span className="text-orange-600">
                          ₦{totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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
