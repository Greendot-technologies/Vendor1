
import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import axios from "axios";
import { Pencil, Trash2 } from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

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
      images: [], // for new file uploads
      is_active: true,
    };
  }

  // Helper function to get token from localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem("vendor_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://vendor1.onrender.com/api/products", {
        // headers: getAuthHeaders(),
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err.response || err.message);
      if (err.response?.status === 401) {
        alert("Unauthorized! Please login again.");
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://vendor1.onrender.com/api/category/categories", {
        headers: getAuthHeaders(),
      });
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err.response || err.message);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get("https://vendor1.onrender.com/api/user/approved", {
        headers: getAuthHeaders(),
      });
      setAllSubCategories(res.data || []);
    } catch (err) {
      console.error("Error fetching subcategories:", err.response || err.message);
    }
  };

  const handleInput = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      // Save the FileList as array for upload
      setForm((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "category_id" && {
          sub_category_id: "", // reset subcategory if category changes
        }),
      }));

      if (name === "category_id") {
        // Filter subcategories based on selected category
        const subcats = allSubCategories.filter(
          (sub) => String(sub.category_id) === String(value)
        );
        setFilteredSubCategories(subcats);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();

      Object.entries(form).forEach(([key, val]) => {
        if (key === "images") {
          // Append multiple images if any
          for (const img of val) fd.append("images", img);
        } else {
          fd.append(key, val);
        }
      });

      if (editingId) {
        await axios.put(`https://vendor1.onrender.com/api/products/${editingId}`, fd, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("https://vendor1.onrender.com/api/products", fd, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setForm(initialForm());
      setShowForm(false);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err.response || err.message);
      if (err.response?.status === 401) {
        alert("Unauthorized! Please login again.");
      }
    }
  };

  const handleEdit = (prod) => {
    // Filter subcategories for the product category
    const subcats = allSubCategories.filter(
      (sub) => String(sub.category_id) === String(prod.category_id)
    );
    setFilteredSubCategories(subcats);

    // When editing, clear images array since existing images are URLs, not files
    setForm({ ...prod, images: [] });
    setEditingId(prod.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`https://vendor1.onrender.com/api/products/${id}`, {
          headers: getAuthHeaders(),
        });
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err.response || err.message);
        if (err.response?.status === 401) {
          alert("Unauthorized! Please login again.");
        }
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubCategories();
  }, []);

  // Helper function to safely parse product images
  const parseProductImages = (images) => {
    if (!images) return [];
    if (Array.isArray(images)) return images;
    if (typeof images === "string") {
      try {
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed)) return parsed;
        // If parsed is a string (single image path), wrap it in array
        if (typeof parsed === "string") return [parsed];
      } catch {
        // Not JSON, assume it's a single URL string
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Manage Products</h2>
            <button
              onClick={() => {
                setForm(initialForm());
                setFilteredSubCategories([]);
                setEditingId(null);
                setShowForm(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Product
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-xl w-full max-w-xl relative">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute right-4 top-2 text-2xl"
                  aria-label="Close"
                >
                  ×
                </button>
                <h3 className="text-xl font-semibold mb-4">
                  {editingId ? "Edit" : "Add"} Product
                </h3>
                <form onSubmit={handleSubmit} className="grid gap-3">
                  <input
                    name="name_en"
                    value={form.name_en}
                    onChange={handleInput}
                    placeholder="Name (EN)"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    name="name_hi"
                    value={form.name_hi}
                    onChange={handleInput}
                    placeholder="Name (HI)"
                    className="border p-2 rounded"
                  />

                  <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleInput}
                    className="border p-2 rounded"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name_en}
                      </option>
                    ))}
                  </select>

                  <select
                    name="sub_category_id"
                    value={form.sub_category_id}
                    onChange={handleInput}
                    className="border p-2 rounded"
                    required
                    disabled={!filteredSubCategories.length}
                  >
                    <option value="">Select Subcategory</option>
                    {filteredSubCategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name_en}
                      </option>
                    ))}
                  </select>

                  <input
                    name="mrp"
                    type="number"
                    value={form.mrp}
                    onChange={handleInput}
                    placeholder="MRP"
                    className="border p-2 rounded"
                  />
                  <input
                    name="selling_price"
                    type="number"
                    value={form.selling_price}
                    onChange={handleInput}
                    placeholder="Selling Price"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="pack_size"
                    value={form.pack_size}
                    onChange={handleInput}
                    placeholder="Packaging (e.g. 500gm)"
                    className="border p-2 rounded"
                    required
                  />

                  <input
                    name="stock_quantity"
                    type="number"
                    value={form.stock_quantity}
                    onChange={handleInput}
                    placeholder="Stock"
                    className="border p-2 rounded"
                  />
                  <input
                    name="primary_image_url"
                    value={form.primary_image_url}
                    onChange={handleInput}
                    placeholder="Primary Image URL"
                    className="border p-2 rounded"
                  />
                  <input
                    name="images"
                    type="file"
                    multiple
                    onChange={handleInput}
                    className="border p-2 rounded"
                  />
                  <button type="submit" className="bg-green-600 text-white py-2 rounded">
                    {editingId ? "Update" : "Add"} Product
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.length === 0 && <p>No products found.</p>}
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white p-4 rounded shadow flex flex-col"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{prod.name_en}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p>MRP: ₹{prod.mrp}</p>
                <p>Selling Price: ₹{prod.selling_price}</p>
                <p>Pack Size: {prod.pack_size}</p>
                <p>Stock: {prod.stock_quantity}</p>
                <div className="mt-2 flex space-x-2 overflow-x-auto">
                  
                  {parseProductImages(prod.images).map((img, i) => (
                    <img
                      key={i}
                      src={img.startsWith("http") ? img : `http://localhost:5000${img}`}
                      alt={`product-img-${i}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div> */}


<div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
  <table className="min-w-full bg-white border-collapse">
    <thead>
      <tr className="bg-gray-100 border-b border-gray-300">
        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-r">Image</th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-r">Name</th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-r">MRP</th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-r">Selling Price</th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-r">Pack Size</th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-r">Stock</th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.length === 0 ? (
        <tr>
          <td colSpan="7" className="text-center py-6 text-gray-500">
            No products found.
          </td>
        </tr>
      ) : (
        products.map((prod) => (
          <tr key={prod.id} className="hover:bg-gray-50 border-b border-gray-300">
            {/* Image */}
            <td className="px-6 py-4 border-r">
              <img
                src={parseProductImages(prod.images)[0]?.startsWith('http') 
                  ? parseProductImages(prod.images)[0] 
                  : `https://vendor1.onrender.com${parseProductImages(prod.images)[0]}`}
                alt="product"
                className="w-14 h-14 object-cover rounded border"
              />
            </td>

            {/* Name */}
            <td className="px-6 py-4 border-r font-medium">{prod.name_en}</td>

            {/* MRP */}
            <td className="px-6 py-4 border-r">₹{prod.mrp}</td>

            {/* Selling Price */}
            <td className="px-6 py-4 border-r">₹{prod.selling_price}</td>

            {/* Pack Size */}
            <td className="px-6 py-4 border-r">{prod.pack_size}</td>

            {/* Stock */}
            <td className="px-6 py-4 border-r">{prod.stock_quantity}</td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(prod)}
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <Pencil size={20} />
                 
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                >
                  <Trash2 size={20} />
                 
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
  );
};

export default ProductManagement;
