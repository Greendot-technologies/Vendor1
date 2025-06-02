

import React, { useState } from "react";
import axios from "axios";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const SubCategory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    category_id: "",
    name_en: "",
    slug: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("vendor_token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "https://vendor1.onrender.com/api/user/request",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "Request submitted successfully");
      setFormData({
        category_id: "",
        name_en: "",
        slug: "",
        description: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300 bg-gray-100 p-4 ${
          isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
        }`}
      >
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Subcategory Request Form */}
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
          <h2 className="text-2xl font-bold mb-4">Create Subcategory</h2>

          {message && (
            <div className="mb-4 text-sm text-white bg-blue-500 p-2 rounded">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category ID
              </label>
              <input
                type="text"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subcategory Name (English)
              </label>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
