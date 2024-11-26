import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ title, data }) => {
  const chartData = {
    labels: data.map(d => d.type),
    datasets: [
      {
        data: data.map(d => d.percentage),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div style={{ position: "relative", height: "250px",  marginBottom: '30px', width: "100%" }}>
      <h4 className="text-lg font-bold mb-4">{title}</h4>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Ensures the chart adapts to the container size
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

export default PieChart;
