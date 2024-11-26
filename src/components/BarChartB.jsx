import React, { Suspense } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartB = ({ data, title }) => {
  // Calculate the maximum value in the dataset and add padding for better visualization
  const datasetValues = data.datasets.reduce((acc, dataset) => {
    return acc.concat(dataset.data);
  }, []);
  const maxYValue = Math.max(...datasetValues) * 1.1; // Add 10% padding above the highest value

  return (
    <div style={{ position: "relative", width: "100%", height: "300px" }}>
      {title && <h4 className="text-lg font-bold mb-4">{title}</h4>}
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Weeks",  // X-axis label
              },
              ticks: {
                autoSkip: false,
                maxRotation: 55,
                minRotation: 25,
              },
            },
            y: {
              stacked: true,  // Ensure bars are stacked
              beginAtZero: true,
              max: maxYValue, // Dynamically set max Y-axis value
              title: {
                display: true,
                text: "Volume (kg)",  // Y-axis label
              },
              ticks: {
                callback: function (value) {
                  return `${value.toFixed(2)} kg`;  // Format y-axis labels with units
                },
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",  // Display the legend on top
            },
          },
        }}
      />
    </div>
  );
};

export default BarChartB;
