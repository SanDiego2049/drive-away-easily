// src/data/dashboardData.js

export const adminDashboardData = {
  kycStatus: {
    labels: ["Pending", "Approved"],
    dataPoints: [30, 70], // percentage or counts
  },
  vehiclePopularity: {
    labels: ["Sedan", "SUV", "Pickup", "Van", "Coupe"],
    dataPoints: [120, 200, 150, 80, 50], // bookings count
  },
  monthlyBookingTrends: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dataPoints: [45, 60, 55, 70, 80, 65, 90, 100, 85, 70, 60, 50],
  },
  bookingDistributionByVehicleType: {
    labels: ["Sedan", "SUV", "Pickup", "Van", "Coupe"],
    dataPoints: [25, 35, 20, 10, 10], // percentage or count split
  },
};

export const customerDashboardData = {
  vehiclesRentedPerMonth: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dataPoints: [1, 2, 1, 3, 2, 4, 2, 1, 3, 2, 1, 0],
  },
  monthlySpending: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dataPoints: [150, 200, 170, 300, 250, 400, 180, 100, 270, 220, 180, 90], // $ amounts
  },
  bookingStatus: {
    labels: ["Completed", "Cancelled", "Ongoing"],
    dataPoints: [20, 3, 5], // counts
  },
  rentedVehicleTypes: {
    labels: ["Sedan", "SUV", "Pickup", "Van", "Coupe"],
    dataPoints: [8, 10, 5, 2, 3],
  },
};
