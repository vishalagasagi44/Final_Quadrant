import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';

// Register all Chart.js components
ChartJS.register(...registerables);

const AreaLineChart = ({ title, data, labels }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Trends",
        data: data.map(d => d.y),
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fallback background color
        fill: true, // Fill the area below the line
        tension: 0.4, // Smooth curve for the line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true, // Ensures chart resizes properly with its container
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      beforeDraw: function (chart) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return; // Ensure chartArea is available
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.2)'); // Start color
        gradient.addColorStop(1, 'rgba(75, 192, 192, 0.4)'); // End color

        // Apply the gradient to the dataset
        chart.data.datasets[0].backgroundColor = gradient;
      },
    },
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <h4 className="text-lg font-bold mb-4">{title}</h4>
      <Line
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default AreaLineChart;
