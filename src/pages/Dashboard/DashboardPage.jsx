import React, { useState } from "react";

import KPICard from "../../components/KPICard";
import ChartCard from "../../components/ChartCard";

import kpiData from "../../data/kpiData";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  FiUser,
  FiUserPlus,
  FiActivity,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiEye,
  FiDownload,
  FiCalendar,
} from "react-icons/fi";

const monthlyData = [
  { name: "Jan", users: 65 },
  { name: "Feb", users: 89 },
  { name: "Mar", users: 78 },
  { name: "Apr", users: 95 },
  { name: "May", users: 112 },
  { name: "Jun", users: 125 },
];

const userStatusData = [
  { name: "Active", value: 68, color: "#10B981" },
  { name: "Inactive", value: 32, color: "#EF4444" },
];

const revenueData = [
  { name: "Week 1", amount: 2400 },
  { name: "Week 2", amount: 3200 },
  { name: "Week 3", amount: 2800 },
  { name: "Week 4", amount: 3900 },
];

const QuickStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-100">Page Views</p>
          <p className="text-2xl font-bold">24,567</p>
        </div>
        <FiEye className="w-8 h-8 text-blue-200" />
      </div>
    </div>

    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-green-100">Bounce Rate</p>
          <p className="text-2xl font-bold">32.5%</p>
        </div>
        <FiTrendingDown className="w-8 h-8 text-green-200" />
      </div>
    </div>

    <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-purple-100">Avg. Session</p>
          <p className="text-2xl font-bold">4m 32s</p>
        </div>
        <FiActivity className="w-8 h-8 text-purple-200" />
      </div>
    </div>

    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-orange-100">Conversion</p>
          <p className="text-2xl font-bold">12.8%</p>
        </div>
        <FiTrendingUp className="w-8 h-8 text-orange-200" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FiCalendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
            icon={kpi.icon}
            color={kpi.color}
          />
        ))}
      </div>

      <QuickStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="User Growth Over Time"
          actions={
            <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              <FiDownload className="w-4 h-4" />
              <span>Export</span>
            </button>
          }
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "#3B82F6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Weekly Revenue">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="amount"
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;
