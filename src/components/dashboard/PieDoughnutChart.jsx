// src/components/dashboard/PieDoughnutChart.jsx
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieDoughnutChart = ({ title, labels, dataPoints, type = "pie" }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow h-72">
      <h2 className="text-lg mb-4">{title}</h2>
      <div className="h-50">
        {type === "doughnut" ? (
          <Doughnut data={data} options={options} />
        ) : (
          <Pie data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default PieDoughnutChart;
