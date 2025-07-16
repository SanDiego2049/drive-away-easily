// src/components/dashboard/DashboardChart.jsx
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const DashboardChart = ({ title, labels, dataPoints, type = "line" }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        fill: type === "line",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgba(255, 159, 64, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow h-100">
      <h2 className="text-lg mb-4">{title}</h2>
      <div className="h-80">
        {type === "bar" ? (
          <Bar data={data} options={options} />
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default DashboardChart;
