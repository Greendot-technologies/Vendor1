import React from "react";
import { Link } from "react-router-dom";

const ShopManagement = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Shop Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/SubCategory"
          className="bg-indigo-100 text-indigo-700 p-4 rounded-lg shadow hover:bg-indigo-200"
        >
          Manage SubCategories
        </Link>
        <Link
          to="/ProductManagement"
          className="bg-indigo-100 text-indigo-700 p-4 rounded-lg shadow hover:bg-indigo-200"
        >
          Manage Products
        </Link>
      </div>
    </div>
  );
};

export default ShopManagement;
