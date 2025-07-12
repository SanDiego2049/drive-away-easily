import React from "react";
import carImage1 from "../assets/carImage1.jpg";
import carImage2 from "../assets/carImage2.jpg";
import carImage3 from "../assets/carImage3.jpg";
import carImage4 from "../assets/carImage4.jpg";
import { useNavigate } from "react-router";

const CardsDisplay = () => {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate("/cars");
  };

  const vehicleCategories = [
    {
      id: 1,
      title: "Sedans",
      description: "Perfect for city drives and business trips",
      price: "NGN 52,000/day",
      image: carImage1,
      alt: "Sedan car",
    },
    {
      id: 2,
      title: "SUVs",
      description: "Spacious and comfortable for family trips",
      price: "NGN 52,000/day",
      image: carImage2,
      alt: "SUV car",
    },
    {
      id: 3,
      title: "Buses",
      description: "Ideal for group travel and events",
      price: "NGN 52,000/day",
      image: carImage3,
      alt: "Bus",
    },
    {
      id: 4,
      title: "Luxury Cars",
      description: "Premium vehicles for special occasions",
      price: "NGN 52,000/day",
      image: carImage4,
      alt: "Luxury car",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Fleet
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicleCategories.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Vehicle Image */}
              <div className="aspect-w-16 aspect-h-10 bg-gray-100">
                <img
                  src={vehicle.image}
                  alt={vehicle.alt}
                  className="w-full h-48 object-cover object-center"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Vehicle Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {vehicle.title}
                </h3>

                {/* Vehicle Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {vehicle.description}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-lg font-bold text-orange-500">
                    {vehicle.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={navigateToProducts}
            className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
          >
            View All Vehicles
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardsDisplay;
