import React, { useState, useMemo } from "react";

import { RiSearchLine } from "react-icons/ri";

import { AiOutlineBarChart } from "react-icons/ai";

import { FiFilter, FiDownload, FiFileText, FiCalendar } from "react-icons/fi";
import reportsData from "../../data/reportsData";

import toast from "react-hot-toast";
const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [reports] = useState(reportsData);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "All" || report.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [reports, searchTerm, typeFilter]);

  const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "success") => {
      const id = Date.now();
      const newToast = { id, message, type };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3000);
    };

    return { toasts, showToast };
  };

  const getTypeBadge = (type) => {
    const typeColors = {
      Analytics:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400",
      Financial:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400",
      Technical:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-400",
      Survey:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400",
      Security: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400",
      Marketing:
        "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-400",
      Operations:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-400",
      HR: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-400",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          typeColors[type] ||
          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-400"
        }`}
      >
        <FiFileText className="h-3.5 w-3.5 mr-1" />
        {type}
      </span>
    );
  };

  const handleDownload = (reportName) => {
    toast.success(`Downloading ${reportName}...`, {
      duration: 3000,
      icon: "📥",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const uniqueTypes = [...new Set(reports.map((report) => report.type))];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="lg:mb-8 md:mb-8 mb-4">
        <h1 className="lg:text-3xl md:text-3xl text-xl font-bold text-gray-900 dark:text-white">
          Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Access and download system reports
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="p-6">
          <div className="flex lg:flex-row md:flex-row flex-col gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 lg:max-w-md md:max-w-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiSearchLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reports by name or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <FiFilter className="h-5 w-5 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="block px-3 lg:py-1.5 md:py-1.5 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-700 dark:text-gray-400">
              {filteredReports.length}
            </span>{" "}
            of {reports.length} reports
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center">
                            <AiOutlineBarChart className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {report.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {report.format} Format
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(report.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <FiCalendar className="h-4 w-4 mr-1" />
                        {formatDate(report.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {report.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDownload(report.name)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
                      >
                        <FiDownload className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      <RiSearchLine className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium text-lg mb-2">
                        No reports found
                      </p>
                      <p className="text-sm">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <FiFileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Reports
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {reports.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <AiOutlineBarChart className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                This Month
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {
                  reports.filter((r) => new Date(r.date).getMonth() === 11)
                    .length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <FiDownload className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                PDF Reports
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {reports.filter((r) => r.format === "PDF").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <FiCalendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Excel Reports
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {reports.filter((r) => r.format === "Excel").length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
