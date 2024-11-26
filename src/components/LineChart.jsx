import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ title, data, secondData = null, labels }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Green House Gas Emissions Reduced (Kg CO2e)",
        data: data.map(d => d.y),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  if (secondData) {
    chartData.datasets.push({
      label: "Carbon Emissions Reduced (kg)",
      data: secondData.map(d => d.y),
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      tension: 0.4,
    });
  }

  return (
    <div style={{ position: "relative", height: "400px",  width: "100%" }}>
      <h4 className="text-lg font-bold mb-4">{title}</h4>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Ensures chart resizes properly with its container
          scales: {
          
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
