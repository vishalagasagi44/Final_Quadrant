import React from "react";

const Card = ({ title, value, icon }) => (
  <div className="bg-white p-2 shadow rounded-lg flex items-center space-x-4">
    {icon}
    <div>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-xl">{value}</p>
    </div>
  </div>
);

export default Card;
