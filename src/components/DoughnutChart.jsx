import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ title, data }) => {
  const chartData = {
    labels: data.map(d => d.type),
    datasets: [
      {
        data: data.map(d => d.percentage),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Adjust the colors as needed
      },
    ],
  };

  return (
    <div style={{ position: "relative", height: "200px", marginBottom: '50px', width: "100%" }}>
      <h4 className="text-lg font-bold mb-4">{title}</h4>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Ensures the chart resizes with its container
          plugins: {
            legend: {
              position: "right", // This places the legend on the right side of the chart
              labels: {
                usePointStyle: true, // This makes the label items circular
                pointStyle: 'circle', // Ensures the legend items are circles
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;
