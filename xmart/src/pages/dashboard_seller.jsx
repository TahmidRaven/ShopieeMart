import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import Products from "./products";

const DashboardSeller = () => {
  const [activePage, setActivePage] = useState("seller");

  // Dummy seller data
  const sellerDetails = {
    name: "Jane Doe",
    email: "seller@example.com",
    role: "Seller",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-600 text-white p-4">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-semibold">Seller Dashboard</h1>
          <p className="text-sm">{sellerDetails.name}</p>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-md ${
                  activePage === "seller" ? "bg-green-800" : "hover:bg-green-700"
                }`}
                onClick={() => setActivePage("seller")}
              >
                <FaTachometerAlt className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-md ${
                  activePage === "product" ? "bg-green-800" : "hover:bg-green-700"
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
                className="flex items-center p-2 rounded-md hover:bg-green-700"
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
        {activePage === "seller" && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Seller Details</h2>
            <p className="text-lg mb-2">Name: {sellerDetails.name}</p>
            <p className="text-lg mb-2">Email: {sellerDetails.email}</p>
            <p className="text-lg">Role: {sellerDetails.role}</p>
          </div>
        )}
        {activePage === "product" && <Products />}
      </div>
    </div>
  );
};

export default DashboardSeller;
