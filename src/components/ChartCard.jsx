import React from "react";
const ChartCard = ({ title, children, actions }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      {actions && <div className="flex space-x-2">{actions}</div>}
    </div>
    {children}
  </div>
);
export default ChartCard;
