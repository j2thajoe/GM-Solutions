import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const client = JSON.parse(localStorage.getItem("client"));
  const navigate = useNavigate();

  if (!client?.isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => navigate("/admin/categories")}
            className="text-blue-500"
          >
            Manage Categories
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/admin/clients")}
            className="text-blue-500"
          >
            Manage Clients
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/admin/products")}
            className="text-blue-500"
          >
            Manage Products
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
