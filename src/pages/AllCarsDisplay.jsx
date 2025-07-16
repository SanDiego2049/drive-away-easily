import { useState, useMemo, useEffect, useContext } from "react";
import { Search, Filter, ChevronDown, Star } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import backgroundImage2 from "../assets/backgroundImage2.jpg";
import { vehicles } from "../data/VehicleList";
import { UserContext } from "../components/contexts/UserContext";
import SmallerFooter from "../components/SmallerFooter";
import BackToTop from "../components/BackToTop";

const AllCarsDisplay = () => {
  // React Router hooks
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { user } = useContext(UserContext);
  const isLoggedIn = !!user; // true if a user object exists

  // State for search, filters, and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  // Initialize filters from URL parameters on component mount
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "All";
    const urlTransmission = searchParams.get("transmission") || "All";
    const urlSort = searchParams.get("sort") || "name";

    setSearchTerm(urlSearch);
    setSelectedCategory(urlCategory);
    setSelectedTransmission(urlTransmission);
    setSortBy(urlSort);
  }, [searchParams]);

  // Update URL parameters when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    if (searchTerm) newSearchParams.set("search", searchTerm);
    if (selectedCategory !== "All")
      newSearchParams.set("category", selectedCategory);
    if (selectedTransmission !== "All")
      newSearchParams.set("transmission", selectedTransmission);
    if (sortBy !== "name") newSearchParams.set("sort", sortBy);

    setSearchParams(newSearchParams, { replace: true });
  }, [
    searchTerm,
    selectedCategory,
    selectedTransmission,
    sortBy,
    setSearchParams,
  ]);

  // Filter and sort vehicles based on current state
  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = vehicles.filter((vehicle) => {
      const matchesSearch = vehicle.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || vehicle.category === selectedCategory;
      const matchesTransmission =
        selectedTransmission === "All" ||
        vehicle.transmission === selectedTransmission;

      return matchesSearch && matchesCategory && matchesTransmission;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [vehicles, searchTerm, selectedCategory, selectedTransmission, sortBy]);

  // Handle booking button click
  const handleBookNow = (vehicleId) => {
    if (!isLoggedIn) {
      // Redirect to login page
      navigate("/login");
    } else {
      // Redirect to booking page with vehicle ID
      navigate(`/booking?vehicleId=${vehicleId}`);
    }
  };

  // Clear all filters and reset URL
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedTransmission("All");
    setSortBy("name");
    // The useEffect will handle updating the URL params
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      Sedan: "bg-blue-100 text-blue-800",
      SUV: "bg-green-100 text-green-800",
      Luxury: "bg-purple-100 text-purple-800",
      Bus: "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-100 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage2})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <Navbar />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl mb-4">Our Vehicle Fleet</h1>
          <p className="text-xl text-center max-w-2xl px-4">
            Choose from our wide selection of premium vehicles for your journey
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 sm:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                <Search className="h-5 w-5 text-gray-900" />
              </div>
              <input
                id="vehicle-search"
                name="vehicleSearch"
                type="search"
                placeholder="Search by make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 relative z-10"
                autoComplete="off"
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex items-center gap-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-4  z-15">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none cursor-pointer focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Bus">Bus</option>
                </select>

                {/* Transmission Filter */}
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="px-4 cursor-pointer py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="All">All Transmissions</option>
                  <option value="Auto">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="relative z-15">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none cursor-pointer focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 cursor-pointer rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Bus">Bus</option>
                </select>

                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="px-3 py-2 border border-gray-300 cursor-pointer rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="All">All Transmissions</option>
                  <option value="Auto">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAndSortedVehicles.length} of {vehicles.length}{" "}
            vehicles
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Vehicle Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Vehicle Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg text-gray-900">{vehicle.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      vehicle.category
                    )}`}
                  >
                    {vehicle.category}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <span className="text-sm text-gray-600 mr-4">
                    {vehicle.transmission}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">
                      <Star fill="orange" strokeWidth={0} />
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {vehicle.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-2xl text-gray-900">
                      ₦{vehicle.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">/day</span>
                  </div>
                  <button
                    onClick={() => handleBookNow(vehicle.id)}
                    className="w-full sm:w-auto bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredAndSortedVehicles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              No vehicles found matching your criteria
            </div>
            <button
              onClick={clearAllFilters}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <BackToTop />
      <SmallerFooter />
    </div>
  );
};

export default AllCarsDisplay;
