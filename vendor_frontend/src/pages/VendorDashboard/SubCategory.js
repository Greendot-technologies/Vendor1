

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const baseURL = "http://localhost:5000/api/user";
const categoryURL = "http://localhost:5000/api/category";

const ITEMS_PER_PAGE = 5;

const SubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "",
    name_en: "",
    slug: "",
    description: "",
  });
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [allPage, setAllPage] = useState(1);

  useEffect(() => {
    fetchCategories();
    fetchAllSubcategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(categoryURL);
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching categories");
    }
  };

  const fetchAllSubcategories = async () => {
    try {
      const token = localStorage.getItem("vendor_token");
      const res = await axios.get(`${baseURL}/all-subcategories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllSubcategories(res.data.subcategories);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching subcategories");
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("vendor_token");
      const res = await axios.post(`${baseURL}/request`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message || "Subcategory request sent successfully");
      setShowForm(false);
      setFormData({ category_id: "", name_en: "", slug: "", description: "" });
      fetchAllSubcategories();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error sending request");
    }
  };

  const paginatedAll = allSubcategories.slice(
    (allPage - 1) * ITEMS_PER_PAGE,
    allPage * ITEMS_PER_PAGE
  );
  const totalAllPages = Math.ceil(allSubcategories.length / ITEMS_PER_PAGE);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
        }`}
      >
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="max-w-6xl mx-auto p-4 md:p-6">

          {showForm ? (
            // 🔵 FORM VIEW: looks like a separate page
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 md:p-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-indigo-700">Create New Subcategory</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded text-sm"
                >
                  Back
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Category</label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name_en"
                      value={formData.name_en}
                      onChange={handleInputChange}
                      placeholder="Enter subcategory name"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Slug</label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="Enter slug"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter description"
                      className="w-full border border-gray-300 rounded px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded text-sm"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>

          ) : (
            // 🟢 TABLE VIEW: main list of subcategories
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-black">Subcategory Management</h1>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
                >
                  Create Subcategory
                </button>
              </div>

              <section className="mb-8">
                {allSubcategories.length === 0 ? (
                  <p className="text-gray-500">No subcategories found.</p>
                ) : (
                  <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
                    <table className="min-w-full text-gray-800">
                      <thead className="bg-indigo-50 text-gray-900 text-sm uppercase">
                        <tr>
                          <th className="p-3 text-left">Sr no</th>
                          <th className="p-3 text-left">Subcategory</th>
                          <th className="p-3 text-left">Category</th>
                          <th className="p-3 text-left">Status</th>
                          <th className="p-3 text-left">Remark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedAll.map((sub, index) => (
                          <tr
                            key={sub.id}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          >
                            <td className="p-3 border-t">{(allPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                            <td className="p-3 border-t">{sub.name_en}</td>
                            <td className="p-3 border-t">{sub.category_name}</td>
                            <td className="p-3 border-t">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  sub.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : sub.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {sub.status}
                              </span>
                            </td>
                            <td className="p-3 border-t">{sub.remark || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {totalAllPages > 1 && (
                      <div className="flex justify-center items-center mt-4 gap-2">
                        <button
                          disabled={allPage === 1}
                          onClick={() => setAllPage((p) => Math.max(p - 1, 1))}
                          className={`px-3 py-1 rounded border text-sm ${
                            allPage === 1
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-white hover:bg-gray-100"
                          }`}
                        >
                          Previous
                        </button>
                        {[...Array(totalAllPages).keys()].map((num) => (
                          <button
                            key={num + 1}
                            onClick={() => setAllPage(num + 1)}
                            className={`px-3 py-1 rounded border text-sm ${
                              allPage === num + 1
                                ? "bg-indigo-600 text-white"
                                : "bg-white hover:bg-gray-100"
                            }`}
                          >
                            {num + 1}
                          </button>
                        ))}
                        <button
                          disabled={allPage === totalAllPages}
                          onClick={() => setAllPage((p) => Math.min(p + 1, totalAllPages))}
                          className={`px-3 py-1 rounded border text-sm ${
                            allPage === totalAllPages
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-white hover:bg-gray-100"
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
