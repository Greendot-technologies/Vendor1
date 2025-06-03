

import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);

  function initialForm() {
    return {
      name_en: "",
      name_hi: "",
      category_id: "",
      sub_category_id: "",
      mrp: "",
      selling_price: "",
      pack_size: "",
      stock_quantity: "",
      primary_image_url: "",
      images: [],
      active: true,
    };
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem("vendor_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://vendor1.onrender.com/api/products", {
        headers: getAuthHeaders(),
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err.response || err.message);
      if (err.response?.status === 401) {
        alert("Unauthorized! Please login again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const res = await axios.get("https://vendor1.onrender.com/api/category/categories", {
        headers: getAuthHeaders(),
      });
      console.log("Categories fetched from database:", res.data);
      
      // Handle different possible response structures
      const categoriesData = res.data.categories || res.data.data || res.data || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      
    } catch (err) {
      console.error("Error fetching categories:", err.response || err.message);
      // Fallback to alternative endpoint if first one fails
      try {
        const fallbackRes = await axios.get("https://vendor1.onrender.com/api/category/categories", {
          headers: getAuthHeaders(),
        });
        const fallbackData = fallbackRes.data.categories || fallbackRes.data || [];
        setCategories(Array.isArray(fallbackData) ? fallbackData : []);
      } catch (fallbackErr) {
        console.error("Error with fallback categories endpoint:", fallbackErr);
        alert("Unable to load categories. Please refresh the page.");
      }
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchSubCategories = async (categoryId = null) => {
    try {
      setSubCategoriesLoading(true);
      
      // If categoryId is provided, fetch subcategories for that specific category
      const endpoint = categoryId 
        ? `https://vendor1.onrender.com/api/categories/${categoryId}/subcategories`
        : "https://vendor1.onrender.com/api/user/approved";
      
      const res = await axios.get(endpoint, {
        headers: getAuthHeaders(),
      });
      
      console.log("Subcategories fetched:", res.data);
      
      // Handle different possible response structures
      const subCategoriesData = res.data.subcategories || res.data.data || res.data || [];
      const subCategoriesArray = Array.isArray(subCategoriesData) ? subCategoriesData : [];
      
      if (categoryId) {
        // If fetching for a specific category, update filtered subcategories
        setFilteredSubCategories(subCategoriesArray);
      } else {
        // If fetching all subcategories, update the main subcategories state
        setSubCategories(subCategoriesArray);
      }
      
    } catch (err) {
      console.error("Error fetching subcategories:", err.response || err.message);
      
      // Fallback: try to get all subcategories and filter client-side
      if (categoryId) {
        try {
          const fallbackRes = await axios.get("https://vendor1.onrender.com/api/user/approved", {
            headers: getAuthHeaders(),
          });
          const allSubCategories = fallbackRes.data.subcategories || fallbackRes.data || [];
          const filtered = allSubCategories.filter(
            sub => String(sub.category_id) === String(categoryId)
          );
          setFilteredSubCategories(filtered);
        } catch (fallbackErr) {
          console.error("Fallback subcategories fetch failed:", fallbackErr);
          setFilteredSubCategories([]);
        }
      } else {
        // Try alternative endpoint for all subcategories
        try {
          const altRes = await axios.get("https://vendor1.onrender.com/api/user/approved", {
            headers: getAuthHeaders(),
          });
          const altData = altRes.data || [];
          setSubCategories(Array.isArray(altData) ? altData : []);
        } catch (altErr) {
          console.error("Alternative subcategories endpoint failed:", altErr);
          setSubCategories([]);
        }
      }
    } finally {
      setSubCategoriesLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        // Reset subcategory when category changes
        ...(name === "category_id" && {
          sub_category_id: "",
        }),
      }));

      // Fetch subcategories when category is selected
      if (name === "category_id" && value) {
        console.log("Category selected:", value);
        fetchSubCategories(value);
      } else if (name === "category_id" && !value) {
        // Clear subcategories when no category is selected
        setFilteredSubCategories([]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation - only category is required, subcategory is optional
    if (!form.category_id) {
      alert("Please select a category");
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();

      // Append all form data to FormData
      Object.entries(form).forEach(([key, val]) => {
        if (key === "images") {
          // Handle multiple image files
          for (const img of val) {
            fd.append("images", img);
          }
        } else if (key === "primary_image_url" && val instanceof File) {
          // Handle primary image file
          fd.append("primary_image_url", val);
        } else if (!(val instanceof File)) {
          // Handle other form fields (not files)
          // Only append non-empty values, or convert empty strings to null for optional fields
          if (key === "sub_category_id" && !val) {
            fd.append(key, ""); // Send empty string for optional subcategory
          } else {
            fd.append(key, val);
          }
        }
      });

      let response;
      if (editingId) {
        response = await axios.put(`https://vendor1.onrender.com/api/products/${editingId}`, fd, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.post("https://vendor1.onrender.com/api/products", fd, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });
      }

      console.log("Product saved successfully:", response.data);
      
      // Reset form and close modal
      setForm(initialForm());
      setShowForm(false);
      setEditingId(null);
      setFilteredSubCategories([]);
      
      // Refresh products list
      await fetchProducts();
      
      alert(editingId ? "Product updated successfully!" : "Product added successfully!");
    } catch (err) {
      console.error("Error saving product:", err.response || err.message);
      if (err.response?.status === 401) {
        alert("Unauthorized! Please login again.");
      } else {
        const errorMsg = err.response?.data?.message || "Error saving product. Please try again.";
        alert(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (prod) => {
    console.log("Editing product:", prod);
    
    // Fetch subcategories for the product's category if it has one
    if (prod.category_id) {
      fetchSubCategories(prod.category_id);
    }

    // Set form data (clear images array as existing images are URLs)
    setForm({ 
      ...prod, 
      images: [], // Clear new file uploads
      primary_image_url: "", // Clear primary image file
      sub_category_id: prod.sub_category_id || "" // Handle cases where subcategory might be null
    });
    setEditingId(prod.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setLoading(true);
        await axios.delete(`https://vendor1.onrender.com/api/products/${id}`, {
          headers: getAuthHeaders(),
        });
        await fetchProducts();
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Error deleting product:", err.response || err.message);
        if (err.response?.status === 401) {
          alert("Unauthorized! Please login again.");
        } else {
          alert("Error deleting product. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddProduct = () => {
    setForm(initialForm());
    setFilteredSubCategories([]);
    setEditingId(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setForm(initialForm());
    setEditingId(null);
    setFilteredSubCategories([]);
  };

  useEffect(() => {
    // Fetch all data on component mount
    const fetchAllData = async () => {
      await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchSubCategories() // Fetch all subcategories initially
      ]);
    };
    
    fetchAllData();
  }, []);

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return "-";
    const category = categories.find(cat => String(cat.id) === String(categoryId));
    return category ? (category.name_en || category.name || category.title) : "-";
  };

  // Helper function to get subcategory name by ID
  const getSubCategoryName = (subCategoryId) => {
    if (!subCategoryId) return "-";
    // Look in both filtered subcategories and all subcategories
    const subCategory = filteredSubCategories.find(sub => String(sub.id) === String(subCategoryId)) ||
                       subCategories.find(sub => String(sub.id) === String(subCategoryId));
    return subCategory ? (subCategory.name_en || subCategory.name || subCategory.title) : "-";
  };

  // Safe image parser
  const parseProductImages = (images) => {
    if (!images) return [];
    if (Array.isArray(images)) return images;
    if (typeof images === "string") {
      try {
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed)) return parsed;
        if (typeof parsed === "string") return [parsed];
      } catch {
        return [images];
      }
    }
    return [];
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 bg-gray-100 ${
          isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
        }`}
      >
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
            <button
              onClick={handleAddProduct}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              disabled={loading}
            >
              + Add Product
            </button>
          </div>

          {/* Product Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
              <div className="bg-white p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                <button
                  onClick={handleCloseForm}
                  className="absolute right-4 top-4 text-2xl hover:text-red-500 transition-colors"
                  aria-label="Close"
                  disabled={loading}
                >
                  ×
                </button>
                
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h3>
                
                <form onSubmit={handleSubmit} className="grid gap-4">
                  {/* Product Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name (English) *
                      </label>
                      <input
                        name="name_en"
                        value={form.name_en}
                        onChange={handleInput}
                        placeholder="Enter product name in English"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name (Hindi)
                      </label>
                      <input
                        name="name_hi"
                        value={form.name_hi}
                        onChange={handleInput}
                        placeholder="Enter product name in Hindi"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Category and Subcategory */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        name="category_id"
                        value={form.category_id}
                        onChange={handleInput}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading || categoriesLoading}
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name_en || cat.name || cat.title}
                          </option>
                        ))}
                      </select>
                      {categoriesLoading && (
                        <p className="text-sm text-blue-500 mt-1">Loading categories...</p>
                      )}
                      {!categoriesLoading && categories.length === 0 && (
                        <p className="text-sm text-red-500 mt-1">No categories found</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subcategory (Optional)
                      </label>
                      <select
                        name="sub_category_id"
                        value={form.sub_category_id}
                        onChange={handleInput}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        disabled={loading || subCategoriesLoading || !form.category_id}
                      >
                        <option value="">
                          {!form.category_id 
                            ? "First select a category" 
                            : subCategoriesLoading
                            ? "Loading subcategories..."
                            : filteredSubCategories.length === 0 
                            ? "No subcategories available (Optional)" 
                            : "Select a subcategory (Optional)"
                          }
                        </option>
                        {filteredSubCategories.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name_en || sub.name || sub.title}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Subcategory is optional - you can add products without selecting one
                      </p>
                    </div>
                  </div>

                  {/* Price Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        MRP (₹)
                      </label>
                      <input
                        name="mrp"
                        type="number"
                        step="0.01"
                        min="0"
                        value={form.mrp}
                        onChange={handleInput}
                        placeholder="Enter MRP"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Selling Price (₹)
                      </label>
                      <input
                        name="selling_price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={form.selling_price}
                        onChange={handleInput}
                        placeholder="Enter selling price"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Pack Size and Stock */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pack Size
                      </label>
                      <input
                        type="text"
                        name="pack_size"
                        value={form.pack_size}
                        onChange={handleInput}
                        placeholder="e.g., 1kg, 500ml, 12 pieces"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        name="stock_quantity"
                        min="0"
                        value={form.stock_quantity}
                        onChange={handleInput}
                        placeholder="Enter stock quantity"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Image Upload Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Primary Image
                      </label>
                      <input
                        type="file"
                        name="primary_image_url"
                        onChange={handleInput}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        accept="image/*"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Images
                      </label>
                      <input
                        type="file"
                        name="images"
                        onChange={handleInput}
                        multiple
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        accept="image/*"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Active Status
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="is_active"
                      id="is_active"
                      checked={form.is_active}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          is_active: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      disabled={loading}
                    />
                    <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                      Product is active
                    </label>
                  </div> */}
                  {/* Active Status */}
<div className="flex items-center gap-3">
  <input
    type="checkbox"
    name="active"
    id="active"
    checked={!!form.active} // force boolean
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        active: e.target.checked,
      }))
    }
    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
    disabled={loading}
  />
  <label htmlFor="active" className="text-sm font-medium text-gray-700">
    Product is active
  </label>
</div>


                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:bg-gray-400"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">Name (EN)</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Subcategory</th>
                    <th className="p-4 font-medium">MRP</th>
                    <th className="p-4 font-medium">Selling Price</th>
                    <th className="p-4 font-medium">Stock</th>
                    <th className="p-4 font-medium">Images</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="10" className="text-center p-8">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-2">Loading products...</span>
                        </div>
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center p-8 text-gray-500">
                        No products found. Click "Add Product" to create your first product.
                      </td>
                    </tr>
                  ) : (
                    products.map((prod) => (
                      <tr key={prod.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium">{prod.id}</td>
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{prod.name_en}</div>
                          {prod.name_hi && <div className="text-sm text-gray-500">{prod.name_hi}</div>}
                        </td>
                        <td className="p-4">
                          {prod.category_name || getCategoryName(prod.category_id)}
                        </td>
                        <td className="p-4">
                          {prod.sub_category_name || getSubCategoryName(prod.sub_category_id)}
                        </td>
                        <td className="p-4">₹{prod.mrp || "-"}</td>
                        <td className="p-4">₹{prod.selling_price || "-"}</td>
                        <td className="p-4">{prod.stock_quantity || 0}</td>
                        <td className="p-4">
                          <div className="flex gap-1 flex-wrap">
                            {parseProductImages(prod.images).slice(0, 3).map((img, i) => {
                              if (typeof img !== "string") return null;
                              const src = img.startsWith("http")
                                ? img
                                : `https://vendor1.onrender.com${img}`;
                              return (
                                <img
                                  key={i}
                                  src={src}
                                  alt={`product-img-${i}`}
                                  className="w-12 h-12 object-cover rounded border"
                                />
                              );
                            })}
                            {parseProductImages(prod.images).length > 3 && (
                              <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-600">
                                +{parseProductImages(prod.images).length - 3}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            prod.active 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {prod.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(prod)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              aria-label="Edit product"
                              disabled={loading}
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(prod.id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              aria-label="Delete product"
                              disabled={loading}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;