// src/components/dashboard/DashboardCharts.jsx
import DashboardChart from "./DashboardChart";
import PieDoughnutChart from "./PieDoughnutChart";
import {
  adminDashboardData,
  customerDashboardData,
} from "../../data/dashboardData";

const DashboardCharts = ({ role }) => {
  if (role === "admin") {
    const {
      kycStatus,
      vehiclePopularity,
      monthlyBookingTrends,
      bookingDistributionByVehicleType,
    } = adminDashboardData;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieDoughnutChart
          title="KYC Completion Status"
          labels={kycStatus.labels}
          dataPoints={kycStatus.dataPoints}
          type="pie"
        />
        <DashboardChart
          title="Vehicle Popularity"
          labels={vehiclePopularity.labels}
          dataPoints={vehiclePopularity.dataPoints}
          type="bar"
        />
        <DashboardChart
          title="Monthly Booking Trends"
          labels={monthlyBookingTrends.labels}
          dataPoints={monthlyBookingTrends.dataPoints}
          type="line"
        />
        <PieDoughnutChart
          title="Booking Distribution by Vehicle Type"
          labels={bookingDistributionByVehicleType.labels}
          dataPoints={bookingDistributionByVehicleType.dataPoints}
          type="doughnut"
        />
      </div>
    );
  }

  if (role === "customer") {
    const {
      vehiclesRentedPerMonth,
      monthlySpending,
      bookingStatus,
      rentedVehicleTypes,
    } = customerDashboardData;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardChart
          title="Vehicles Rented per Month"
          labels={vehiclesRentedPerMonth.labels}
          dataPoints={vehiclesRentedPerMonth.dataPoints}
          type="bar"
        />
        <DashboardChart
          title="Monthly Spending"
          labels={monthlySpending.labels}
          dataPoints={monthlySpending.dataPoints}
          type="line"
        />
        <PieDoughnutChart
          title="Booking Status"
          labels={bookingStatus.labels}
          dataPoints={bookingStatus.dataPoints}
          type="pie"
        />
        <PieDoughnutChart
          title="Rented Vehicle Types"
          labels={rentedVehicleTypes.labels}
          dataPoints={rentedVehicleTypes.dataPoints}
          type="doughnut"
        />
      </div>
    );
  }

  return <p>No charts available for this role.</p>;
};

export default DashboardCharts;
