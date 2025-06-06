import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
const KPICard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
          {change && (
            <div
              className={`flex items-center mt-3 text-sm ${
                changeType === "positive"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {changeType === "positive" ? (
                <FiTrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <FiTrendingDown className="w-4 h-4 mr-1" />
              )}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div
          className={`p-4 rounded-xl bg-gradient-to-r ${colorClasses[color]} shadow-lg`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};
export default KPICard;
