// dashboard_admin_main.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardAdmin from "./dashboard_admin";
import { FaTachometerAlt, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import Products from "./products";

const DashboardAdminMain = () => {
  const [activePage, setActivePage] = useState("admin");

  // Dummy admin data
  const adminDetails = {
    name: "Tahmid Raven",
    email: "admin@example.com",
    role: "Administrator",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-4">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm">{adminDetails.name}</p>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-md ${
                  activePage === "admin" ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                onClick={() => setActivePage("admin")}
              >
                <FaTachometerAlt className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-md ${
                  activePage === "product" ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                onClick={() => setActivePage("product")}
              >
                <FaBoxOpen className="mr-2" />
                Product Management
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center p-2 rounded-md hover:bg-blue-700"
                onClick={() => alert("Logout functionality here")}
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8">
        {/* Page content based on activePage */}
        {activePage === "admin" && <DashboardAdmin />}
        {activePage === "product" && <Products />}
      </div>
    </div>
  );
};

export default DashboardAdminMain;
  