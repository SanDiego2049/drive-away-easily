import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "./Navbar";
import backgroundImage from "../assets/backgroundImage.jpg";

const HeroSection = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isVehicleDropdownOpen, setIsVehicleDropdownOpen] = useState(false);

  const vehicleTypes = ["Sedan", "SUV", "Luxury", "Bus"];

  const handleSearch = () => {
    if (!selectedVehicle || !startDate || !endDate) {
      alert("Please fill in all fields before searching");
      return;
    }

    // Add your search logic here
    console.log("Search data:", {
      vehicle: selectedVehicle,
      startDate,
      endDate,
    });

    alert(`Searching for ${selectedVehicle} from ${startDate} to ${endDate}`);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Mountain road with car"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Rent Smarter, Travel Freer
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Easily rent cars for your next trip or event – anytime, anywhere.
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Vehicle Type Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setIsVehicleDropdownOpen(!isVehicleDropdownOpen)
                      }
                      className="w-full cursor-pointer bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent flex items-center justify-between"
                    >
                      <span
                        className={
                          selectedVehicle ? "text-gray-900" : "text-gray-500"
                        }
                      >
                        {selectedVehicle || "Select vehicle"}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          isVehicleDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isVehicleDropdownOpen && (
                      <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {vehicleTypes.map((vehicle) => (
                          <button
                            key={vehicle}
                            onClick={() => {
                              setSelectedVehicle(vehicle);
                              setIsVehicleDropdownOpen(false);
                            }}
                            className="w-full cursor-pointer z-20 text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                          >
                            {vehicle}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      min={startDate || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div>
                  <button
                    onClick={handleSearch}
                    className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md h-12 flex items-center justify-center"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
