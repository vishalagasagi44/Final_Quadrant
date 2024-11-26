import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizBarChart = ({ data, options }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "300px" }}>
      <Bar
        data={data}
        options={{
          ...options,
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",  // Set horizontal bars
          scales: {
            x: {
              title: {
                display: true,
                text: "Energy Conserved (kWh)",  // Label for x-axis
              },
            },
            y: {
              title: {
                display: true,
                text: "Service Type",  // Label for y-axis
              },
            },
          },
        }}
      />
    </div>
  );
};

export default HorizBarChart;
