import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="lg:flex md:flex lg:h-screen md:h-screen lg:overflow-hidden md:overflow-hidden bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto lg:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
