import React from "react";
import { Bar } from "react-chartjs-2";

const BarChartDis = ({ data, title }) => {
  // Calculate the maximum value in the dataset and add padding for better visualization
  const datasetValues = data.datasets[0]?.data || [];
  const maxYValue = Math.max(...datasetValues) * 1.1; // Add 10% padding above the highest value

  return (
    <div style={{ position: "relative", width: "100%", height: "300px" }}>
      {title && <h4 className="text-lg font-bold mb-4">{title}</h4>}
      <Bar
        data={data}
        options={{
          responsive: true, // Enable responsiveness
          maintainAspectRatio: false, // Allow chart to fill the container
          scales: {
            x: {
              type: "linear", // Use a linear scale for the x-axis
              title: {
                display: true,
                text: "Fees (₹)", // Label for x-axis
              },
              ticks: {
                callback: function (value) {
                  return `₹${value.toFixed(2)}`; // Format x-axis labels with currency
                },
              },
            },
            y: {
              type: "linear", // Use a category scale for the y-axis to represent length (entries)
              beginAtZero: true,
              max: maxYValue, // Dynamically set max Y-axis value
              reverse: false, // Ensure the y-axis starts from "Entry 1" at the bottom
              title: {
                display: true,
                text: "Entries", // Label for y-axis
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default BarChartDis;
