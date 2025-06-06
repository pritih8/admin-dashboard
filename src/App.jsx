import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UsersPage from "./pages/Users/UsersPage";
import ReportsPage from "./pages/Reports/ReportsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Router basename="/admin-dashboard">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className:
            "text-gray-500 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 text-sm font-medium shadow-xl",
        }}
      />
    </div>
  );
}

export default App;
