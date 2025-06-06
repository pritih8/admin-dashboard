import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <h1 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 lg:visible md:visible invisible">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-lg text-gray-600 dark:text-gray-300"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <FaUserCircle className="text-2xl text-gray-500 dark:text-gray-300" />
      </div>
    </header>
  );
};

export default Header;
