import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data, title }) => {
  // Calculate the maximum value in the dataset and add padding for better visualization
  const datasetValues = data.datasets[0]?.data || [];
  const maxYValue = Math.max(...datasetValues) * 1.1; // Add 10% padding above the highest value

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      {title && <h4 className="text-lg font-bold mb-4">{title}</h4>}
      <Bar
        data={data}
        options={{
          responsive: true, // Enable responsiveness
          maintainAspectRatio: false, // Allow chart to fill the container
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Entries",
              },
              ticks: {
                autoSkip: false, // Ensure all labels are shown
                maxRotation: 55,
                minRotation: 25,
              },
            },
            y: {
              beginAtZero: true,
              max: maxYValue, // Dynamically set max Y-axis value
              title: {
                display: true,
                text: "Fees (₹)",
              },
              ticks: {
                callback: function (value) {
                  return `₹${value.toFixed(2)}`; // Format y-axis labels with currency
                },
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

export default BarChart;
