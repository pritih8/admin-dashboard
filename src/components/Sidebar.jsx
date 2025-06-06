import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
  { name: "Users", path: "/users", icon: <FaUsers /> },
  { name: "Reports", path: "/reports", icon: <FaChartBar /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const isMobileScreen = window.innerWidth < 768;
      setIsMobile(isMobileScreen);
      if (isMobileScreen) {
        setIsCollapsed(true);
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleMobileSidebar}
          className="fixed top-2.5 left-6 z-50 p-2 rounded-md text-white bg-gray-800 md:hidden"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      <div
        className={`
          ${isMobile ? (isOpen ? "block" : "hidden") : "block"}
          h-full md:h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transition-all duration-300 fixed md:relative z-40 top-0 left-0
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        {!isMobile && (
          <div className="flex justify-center p-3">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 dark:text-gray-300"
              title="Toggle Sidebar"
            >
              <FaBars />
            </button>
          </div>
        )}

        <nav className="flex flex-col space-y-2 px-3 lg:mt-2 md:mt-2 mt-14">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center p-2 rounded-md transition-all duration-300 
                hover:bg-gray-100 dark:hover:bg-gray-700
                ${isActive ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""}
                ${isCollapsed ? "justify-center" : "gap-3"}
              `}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
