
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Sidebar } from "../../pages/VendorDashboard/Sidebar";
// import { Header } from "../../pages/VendorDashboard/Header";
// import api from "../../services/productApi";

// const ProductManagement = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(5);
//   const [formVisible, setFormVisible] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [images, setImages] = useState([]);
//   const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

//   // Enhanced category/subcategory states
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [filteredSubCategories, setFilteredSubCategories] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(false);
//   const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Vendor information state
//   const [vendorInfo, setVendorInfo] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     brand: "",
//     price: "",
//     discount_percentage: "",
//     stock_quantity: "",
//     unit: "",
//     category_id: "",
//     subcategory_id: "",
//   });

//   // Helper function to get auth headers
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem("vendor_token");
//     if (!token) {
//       console.error("No vendor token found");
//       return null;
//     }
//     return { Authorization: `Bearer ${token}` };
//   };

//   // Check if user is authenticated
//   const isAuthenticated = () => {
//     const token = localStorage.getItem("vendor_token");
//     return !!token;
//   };

//   // Get vendor ID from token or localStorage
//   const getVendorId = () => {
//     // Method 1: Try to get from localStorage directly
//     const vendorId = localStorage.getItem("vendor_id");
//     if (vendorId) {
//       return vendorId;
//     }

//     // Method 2: Try to decode from token
//     try {
//       const token = localStorage.getItem("vendor_token");
//       if (token) {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         return payload.vendor_id || payload.id || payload.userId;
//       }
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }

//     // Method 3: From vendorInfo state
//     return vendorInfo?.id || null;
//   };

//   // Fetch vendor information
//   const fetchVendorInfo = async () => {
//     try {
//       const authHeaders = getAuthHeaders();
//       if (!authHeaders) return;

//       const response = await api.get("/products/vendor/profile", { 
//         headers: authHeaders 
//       });

//       if (response.data) {
//         setVendorInfo(response.data.vendor || response.data);
//         // Store vendor ID in localStorage for future use
//         const vendorId = response.data.vendor?.id || response.data.id;
//         if (vendorId) {
//           localStorage.setItem("vendor_id", vendorId.toString());
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching vendor info:", error);
//       if (error.response?.status === 401) {
//         alert("Session expired. Please login again.");
//       }
//     }
//   };

//   // Fetch products for the authenticated vendor
//   const fetchProducts = async () => {
//     try {
//       const authHeaders = getAuthHeaders();
//       if (!authHeaders) return;

//       const response = await api.get('/products/vendor/products', { 
//         headers: authHeaders 
//       });
      
//       const productsData = response.data.products || response.data || [];
//       setProducts(Array.isArray(productsData) ? productsData : []);
//     } catch (error) {
//       console.error("Failed to fetch products", error);
//       if (error.response?.status === 401) {
//         alert("Session expired. Please login again.");
//       }
//     }
//   };

//   // Enhanced category fetching with proper auth
//   const fetchCategories = async () => {
//     try {
//       setCategoriesLoading(true);
//       const authHeaders = getAuthHeaders();
//       if (!authHeaders) return;

//       const res = await api.get("/category", {
//         headers: authHeaders,
//       });
//       console.log("Categories fetched from database:", res.data);

//       const categoriesData =
//         res.data.categories || res.data.data || res.data || [];
//       setCategories(Array.isArray(categoriesData) ? categoriesData : []);
//     } catch (err) {
//       console.error("Error fetching categories:", err.response || err.message);
      
//       if (err.response?.status === 401) {
//         alert("Session expired. Please login again.");
//         return;
//       }

//       // Fallback attempt with direct axios call
//       try {
//         const authHeaders = getAuthHeaders();
//         if (!authHeaders) return;

//         const fallbackRes = await api.get("/category",
//           {
//             headers: authHeaders,
//           }
//         );
//         const fallbackData =
//           fallbackRes.data.categories || fallbackRes.data || [];
//         setCategories(Array.isArray(fallbackData) ? fallbackData : []);
//       } catch (fallbackErr) {
//         console.error("Error with fallback categories endpoint:", fallbackErr);
//         alert("Unable to load categories. Please refresh the page.");
//       }
//     } finally {
//       setCategoriesLoading(false);
//     }
//   };

//   // Enhanced subcategory fetching with proper auth
//   const fetchSubCategories = async (categoryId = null) => {
//     try {
//       setSubCategoriesLoading(true);
//       const authHeaders = getAuthHeaders();
//       if (!authHeaders) return;

//       let endpoint;
//       if (categoryId) {
//   endpoint = `/user/approved/by-category?category_id=${categoryId}`;
// }
//  else {
//         endpoint = "http://localhost:5000/api/user/approved";
//       }

//       const res = await api.get(endpoint, {
//         headers: authHeaders,
//       });

//       console.log("Subcategories fetched:", res.data);

//       const subCategoriesData =
//         res.data.subcategories || res.data.data || res.data || [];
//       const subCategoriesArray = Array.isArray(subCategoriesData)
//         ? subCategoriesData
//         : [];

//       if (categoryId) {
//         setFilteredSubCategories(subCategoriesArray);
//       } else {
//         setSubCategories(subCategoriesArray);
//       }
//     } catch (err) {
//       console.error(
//         "Error fetching subcategories:",
//         err.response || err.message
//       );

//       if (err.response?.status === 401) {
//         alert("Session expired. Please login again.");
//         return;
//       }

//       // Fallback logic with direct axios calls
//       if (categoryId) {
//         try {
//           const authHeaders = getAuthHeaders();
//           if (!authHeaders) return;

//           const fallbackRes = await api.get("/user/approved",
//             {
//               headers: authHeaders,
//             }
//           );
//           const allSubCategories =
//             fallbackRes.data.subcategories || fallbackRes.data || [];
//           const filtered = allSubCategories.filter(
//             (sub) => String(sub.category_id) === String(categoryId)
//           );
//           setFilteredSubCategories(filtered);
//         } catch (fallbackErr) {
//           console.error("Fallback subcategories fetch failed:", fallbackErr);
//           setFilteredSubCategories([]);
//         }
//       } else {
//         try {
//           const authHeaders = getAuthHeaders();
//           if (!authHeaders) return;

//           const altRes = await api.get("/user/approved",
//             {
//               headers: authHeaders,
//             }
//           );
//           const altData = altRes.data || [];
//           setSubCategories(Array.isArray(altData) ? altData : []);
//         } catch (altErr) {
//           console.error("Alternative subcategories endpoint failed:", altErr);
//           setSubCategories([]);
//         }
//       }
//     } finally {
//       setSubCategoriesLoading(false);
//     }
//   };

//   // Initial data loading
//   useEffect(() => {
//     if (!isAuthenticated()) {
//       alert("Please login to access this page");
//       return;
//     }
    
//     fetchVendorInfo();
//     fetchProducts();
//     fetchCategories();
//     fetchSubCategories();
//   }, []);

//   // Filter products based on search term
//   useEffect(() => {
//     const filtered = products.filter((p) =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, products]);

//   // Handle form input changes
//   const handleInput = (e) => {
//     const { name, value, files, type } = e.target;

//     if (type === "file" && files) {
//       const selectedFiles = Array.from(files);

//       // Total images after addition
//       const totalImages = images.length + selectedFiles.length;
//       if (totalImages > 5) {
//         alert("You can upload a maximum of 5 images.");
//         return;
//       }

//       // Valid image MIME types
//       const validTypes = [
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//         "image/gif",
//         "image/webp",
//       ];
//       const invalidFiles = selectedFiles.filter(
//         (file) => !validTypes.includes(file.type)
//       );
//       if (invalidFiles.length > 0) {
//         alert("Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed.");
//         return;
//       }

//       // Check individual image sizes (max 5MB)
//       const maxSize = 5 * 1024 * 1024;
//       const oversizedFiles = selectedFiles.filter(
//         (file) => file.size > maxSize
//       );
//       if (oversizedFiles.length > 0) {
//         alert("Each image must be smaller than 5MB.");
//         return;
//       }

//       // Append images and preview URLs
//       const newPreviewUrls = selectedFiles.map((file) =>
//         URL.createObjectURL(file)
//       );
//       setImages((prev) => [...prev, ...selectedFiles]);
//       setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
//     } else {
//       // Text/select input handling
//       setForm((prev) => ({
//         ...prev,
//         [name]: value,
//         ...(name === "category_id" && { subcategory_id: "" }),
//       }));

//       // Trigger subcategory fetching logic
//       if (name === "category_id") {
//         if (value) {
//           fetchSubCategories(value);
//         } else {
//           setFilteredSubCategories([]);
//         }
//       }
//     }
//   };

//   // Remove image from selection
//   const removeImage = (indexToRemove) => {
//     const updatedImages = images.filter((_, index) => index !== indexToRemove);
//     const updatedPreviewUrls = imagePreviewUrls.filter(
//       (_, index) => index !== indexToRemove
//     );

//     // Revoke the URL to free up memory
//     URL.revokeObjectURL(imagePreviewUrls[indexToRemove]);

//     setImages(updatedImages);
//     setImagePreviewUrls(updatedPreviewUrls);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const authHeaders = getAuthHeaders();
//       if (!authHeaders) {
//         alert("Authentication required. Please login.");
//         return;
//       }

//       // Get vendor ID
//       const vendorId = getVendorId();
//       if (!vendorId && !editingId) {
//         alert("Vendor ID not found. Please refresh the page and try again.");
//         return;
//       }

//       const formData = new FormData();

//       // Validate required fields for new products
//       if (!editingId) {
//         const requiredFields = ['name', 'price', 'stock_quantity', 'category_id'];
//         const missingFields = requiredFields.filter(field => !form[field]);
        
//         if (missingFields.length > 0) {
//           alert(`Please fill in required fields: ${missingFields.join(', ')}`);
//           return;
//         }
//       }

//       // Create a copy of form data with only non-empty fields for updates
//       const dataToSubmit = {};

//       if (editingId) {
//         // For updates, only include fields that have values
//         Object.keys(form).forEach((key) => {
//           if (
//             form[key] !== "" &&
//             form[key] !== null &&
//             form[key] !== undefined
//           ) {
//             dataToSubmit[key] = form[key];
//           }
//         });
//       } else {
//         // For new products, include all fields
//         Object.keys(form).forEach((key) => {
//           if (form[key] !== "") {
//             dataToSubmit[key] = form[key];
//           }
//         });

//         // Add vendor ID for new products
//         dataToSubmit.vendor_id = vendorId;
//       }

//       // Append form fields to FormData
//       Object.keys(dataToSubmit).forEach((key) => {
//         formData.append(key, dataToSubmit[key]);
//       });

//       // Append images properly (only if new images are selected)
//       if (images.length > 0) {
//         images.forEach((image) => {
//           formData.append("images", image);
//         });
//       }

//       // Debug: Log the data being sent
//       console.log("Submitting product data:", dataToSubmit);
//       console.log("Images count:", images.length);
//       console.log("Vendor ID:", vendorId);

//       // Set headers with auth
//       const headers = {
//         ...authHeaders,
//         "Content-Type": "multipart/form-data",
//       };

//       let response;
//       if (editingId) {
//         response = await api.put(`/products/update/${editingId}`, formData, {
//           headers,
//         });
//       } else {
//         response = await api.post("/products/add", formData, {
//           headers,
//         });
//       }

//       console.log("Product submission response:", response.data);

//       await fetchProducts();
//       resetForm();
//       alert(
//         editingId
//           ? "Product updated successfully!"
//           : "Product added successfully!"
//       );
//     } catch (error) {
//       console.error("Error submitting product:", error);
      
//       if (error.response?.status === 401) {
//         alert("Session expired. Please login again.");
//       } else if (error.response?.status === 403) {
//         alert("You don't have permission to perform this action.");
//       } else {
//         const errorMessage = error.response?.data?.message || 
//                             error.response?.data?.error ||
//                             "Error submitting product. Please try again.";
//         alert(errorMessage);
//         console.error("Detailed error:", error.response?.data);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset form to initial state
//   const resetForm = () => {
//     setForm({
//       name: "",
//       description: "",
//       brand: "",
//       price: "",
//       discount_percentage: "",
//       stock_quantity: "",
//       unit: "",
//       category_id: "",
//       subcategory_id: "",
//     });

//     // Clean up preview URLs
//     imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));

//     setImages([]);
//     setImagePreviewUrls([]);
//     setEditingId(null);
//     setFormVisible(false);
//     setFilteredSubCategories([]);

//     // Clear file input
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) {
//       fileInput.value = "";
//     }
//   };

//   // Handle edit product
//   const handleEdit = (product) => {
//     if (!isAuthenticated()) {
//       alert("Please login to edit products");
//       return;
//     }

//     setForm({
//       name: product.name || "",
//       description: product.description || "",
//       brand: product.brand || "",
//       price: product.price || "",
//       discount_percentage: product.discount_percentage || "",
//       stock_quantity: product.stock_quantity || "",
//       unit: product.unit || "",
//       category_id: product.category_id || "",
//       subcategory_id: product.subcategory_id || "",
//     });
//     setEditingId(product.id);
//     setFormVisible(true);

//     // Fetch subcategories for the selected category when editing
//     if (product.category_id) {
//       fetchSubCategories(product.category_id);
//     }
//   };

//   // Handle delete product
//   const handleDelete = async (id) => {
//     if (!isAuthenticated()) {
//       alert("Please login to delete products");
//       return;
//     }

//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         const authHeaders = getAuthHeaders();
//         if (!authHeaders) return;

//         await api.delete(`/products/delete/${id}`, {
//           headers: authHeaders,
//         });
        
//         await fetchProducts();
//         alert("Product deleted successfully!");
//       } catch (error) {
//         console.error("Error deleting product:", error);
        
//         if (error.response?.status === 401) {
//           alert("Session expired. Please login again.");
//         } else if (error.response?.status === 403) {
//           alert("You don't have permission to delete this product.");
//         } else {
//           alert("Error deleting product. Please try again.");
//         }
//       }
//     }
//   };

//   // Pagination calculations
//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   // Show login message if not authenticated
//   if (!isAuthenticated()) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
//           <p className="mb-4">Please login to access the Product Management page.</p>
//           <button 
//             onClick={() => window.location.href = '/login'}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />

//       <div
//         className={`transition-all duration-300 ${
//           isSidebarOpen ? "ml-64" : "ml-20"
//         } w-full`}
//       >
//         <div className="sticky top-0 z-20 bg-white shadow-sm">
//           <Header
//             title="Product Management"
//             setIsSidebarOpen={setIsSidebarOpen}
//             isSidebarOpen={isSidebarOpen}
//           />
//         </div>

//         <div className="p-4 space-y-6">
//           {/* Action Bar */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
//             <div className="flex-1 max-w-md">
//               <input
//                 type="text"
//                 placeholder="Search by product name..."
//                 className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <button
//               onClick={() => setFormVisible(!formVisible)}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
//             >
//               {formVisible ? "Close Form" : "Add Product"}
//             </button>
//           </div>

//           {/* Form Section */}
//           {formVisible && (
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
//                 <h3 className="text-lg font-semibold text-white">
//                   {editingId ? "Edit Product" : "Add New Product"}
//                 </h3>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-6">
//                 {/* Basic Information */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Product Name {!editingId ? "*" : ""}
//                     </label>
//                     <input
//                       name="name"
//                       placeholder="Enter product name"
//                       value={form.name}
//                       onChange={handleInput}
//                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       required={!editingId}
//                       disabled={loading}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Brand {!editingId ? "*" : ""}
//                     </label>
//                     <input
//                       name="brand"
//                       placeholder="Enter brand name"
//                       value={form.brand}
//                       onChange={handleInput}
//                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       required={!editingId}
//                       disabled={loading}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Unit {!editingId ? "*" : ""}
//                     </label>
//                     <input
//                       name="unit"
//                       placeholder="e.g. kg, piece, liter"
//                       value={form.unit}
//                       onChange={handleInput}
//                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       required={!editingId}
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Description {!editingId ? "*" : ""}
//                   </label>
//                   <textarea
//                     name="description"
//                     placeholder="Enter product description"
//                     value={form.description}
//                     onChange={handleInput}
//                     rows={3}
//                     className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                     required={!editingId}
//                     disabled={loading}
//                   />
//                 </div>

//                 {/* Pricing and Stock */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Price (₹) {!editingId ? "*" : ""}
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       placeholder="0.00"
//                       value={form.price}
//                       onChange={handleInput}
//                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       required={!editingId}
//                       min="0"
//                       step="0.01"
//                       disabled={loading}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Stock Quantity {!editingId ? "*" : ""}
//                     </label>
//                     <input
//                       type="number"
//                       name="stock_quantity"
//                       placeholder="0"
//                       value={form.stock_quantity}
//                       onChange={handleInput}
//                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       required={!editingId}
//                       min="0"
//                       disabled={loading}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Discount (%)
//                     </label>
//                     <input
//                       type="number"
//                       name="discount_percentage"
//                       placeholder="0"
//                       value={form.discount_percentage}
//                       onChange={handleInput}
//                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       min="0"
//                       max="100"
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 {/* Category Selection */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Category {!editingId ? "*" : ""}
//                     </label>
//                     <select
//                       name="category_id"
//                       value={form.category_id}
//                       onChange={handleInput}
//                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       required={!editingId}
//                       disabled={loading || categoriesLoading}
//                     >
//                       <option value="">
//                         {categoriesLoading
//                           ? "Loading categories..."
//                           : "Select Category"}
//                       </option>
//                       {categories.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.name_en || cat.name || cat.title}
//                         </option>
//                       ))}
//                     </select>
//                     {categoriesLoading && (
//                       <p className="text-xs text-blue-500">
//                         Loading categories...
//                       </p>
//                     )}
//                     {!categoriesLoading && categories.length === 0 && (
//                       <p className="text-xs text-red-500">
//                         No categories found
//                       </p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Subcategory
//                     </label>
//                     <select
//                       name="subcategory_id"
//                       value={form.subcategory_id}
//                       onChange={handleInput}
//                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                       disabled={
//                         loading || subCategoriesLoading || !form.category_id
//                       }
//                     >
//                       <option value="">
//                         {!form.category_id
//                           ? "First select a category"
//                           : subCategoriesLoading
//                           ? "Loading subcategories..."
//                           : filteredSubCategories.length === 0
//                           ? "No subcategories (Optional)"
//                           : "Select Subcategory (Optional)"}
//                       </option>
//                       {filteredSubCategories.map((sub) => (
//                         <option key={sub.id} value={sub.id}>
//                           {sub.name_en || sub.name || sub.title}
//                         </option>
//                       ))}
//                     </select>
//                     <p className="text-xs text-gray-500">
//                       Subcategory is optional
//                     </p>
//                   </div>
//                 </div>

//                 {/* Image Upload Section */}
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Product Images{" "}
//                       {editingId
//                         ? "(Upload new images to replace existing ones)"
//                         : ""}
//                     </label>
//                     <input
//                       type="file"
//                       name="images"
//                       multiple
//                       accept="image/*"
//                       onChange={handleInput}
//                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                       disabled={loading}
//                     />
//                     <p className="text-xs text-gray-600">
//                       Upload up to 5 images (JPEG, PNG, GIF, WebP). Max 5MB per
//                       image.
//                       {editingId &&
//                         " Leave empty if you don't want to change images."}
//                     </p>
//                   </div>

//                   {/* Image Preview Section */}
//                   {imagePreviewUrls.length > 0 && (
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm font-medium text-gray-700 mb-3">
//                         Selected Images ({images.length}/5)
//                       </h4>
//                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
//                         {imagePreviewUrls.map((url, index) => (
//                           <div key={index} className="relative group">
//                             <img
//                               src={url}
//                               alt={`Preview ${index + 1}`}
//                               className="w-full h-24 object-cover rounded-lg border border-gray-200"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(index)}
//                               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
//                               disabled={loading}
//                             >
//                               ×
//                             </button>
//                             <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
//                               {index + 1}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-end pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <span className="flex items-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Processing...
//                       </span>
//                     ) : editingId ? (
//                       "Update Product"
//                     ) : (
//                       "Add Product"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* Products Table */}
//           <div className="bg-white shadow-sm rounded-lg overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white border rounded shadow">
//                 <thead className="bg-gray-100 sticky top-0 z-10">
//                   <tr>
//                     <th className="p-2 border">Image</th>
//                     <th className="p-2 border">Name</th>
//                     <th className="p-2 border">Price</th>
//                     <th className="p-2 border">Stock</th>
//                     <th className="p-2 border">Discount</th>
//                     <th className="p-2 border">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentProducts.map((p) => (
//                     <tr key={p.id} className="text-center">
//                       <td className="p-2 border">
//                         <img
//                           src={`http://localhost:5000${
//                             p.images?.find((img) => img.is_primary)
//                               ?.image_url || ""
//                           }`}
//                           alt={p.name}
//                           className="w-16 h-16 object-cover mx-auto rounded"
//                         />
//                       </td>
//                       <td className="p-2 border">{p.name}</td>
//                       <td className="p-2 border">₹{p.discounted_price}</td>
//                       <td className="p-2 border">{p.stock_quantity}</td>
//                       <td className="p-2 border">{p.discount_percentage}%</td>
//                       <td className="p-2 border space-x-2">
//                         <button
//                           onClick={() => handleEdit(p)}
//                           className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600 transition-colors"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(p.id)}
//                           className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 transition-colors"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {currentProducts.length === 0 && (
//                     <tr>
//                       <td colSpan="6" className="text-center p-4 text-gray-500">
//                         No products found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="flex justify-center items-center mt-4 space-x-2">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               className="px-3 py-1 bg-gray-200 rounded"
//               disabled={currentPage === 1}
//             >
//               Prev
//             </button>
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               className="px-3 py-1 bg-gray-200 rounded"
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;





import React, { useEffect, useState } from "react";
import { Sidebar } from "../../pages/VendorDashboard/Sidebar";
import { Header } from "../../pages/VendorDashboard/Header";
import api from "../../services/productApi";

const ProductManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vendorInfo, setVendorInfo] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    discount_percentage: "",
    stock_quantity: "",
    unit: "",
    category_id: "",
    subcategory_id: "",
  });

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("vendor_token");
    if (!token) {
      console.error("No vendor token found");
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("vendor_token");
    return !!token;
  };

  // Get vendor ID
  const getVendorId = () => {
    const vendorId = localStorage.getItem("vendor_id");
    if (vendorId) return vendorId;
    try {
      const token = localStorage.getItem("vendor_token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.vendor_id || payload.id || payload.userId;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return vendorInfo?.id || null;
  };

  // Fetch vendor information
  const fetchVendorInfo = async () => {
    try {
      setLoading(true);
      const authHeaders = getAuthHeaders();
      if (!authHeaders) return;

      const response = await api.get("/products/vendor/profile", {
        headers: authHeaders,
      });

      if (response.data) {
        setVendorInfo(response.data.vendor || response.data);
        const vendorId = response.data.vendor?.id || response.data.id;
        if (vendorId) {
          localStorage.setItem("vendor_id", vendorId.toString());
        }
      }
    } catch (error) {
      console.error("Error fetching vendor info:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("Failed to fetch vendor info. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const authHeaders = getAuthHeaders();
      if (!authHeaders) return;

      const response = await api.get("/products/vendor/products", {
        headers: authHeaders,
      });

      const productsData = response.data.products || response.data || [];
      setProducts(Array.isArray(productsData) ? productsData : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("Failed to fetch products. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const authHeaders = getAuthHeaders();
      if (!authHeaders) return;

      const res = await api.get("/category", { headers: authHeaders });
      const categoriesData =
        res.data.categories || res.data.data || res.data || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error("Error fetching categories:", err.response || err.message);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("Unable to load categories. Please try again.");
      }
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Fetch subcategories
  // const fetchSubCategories = async (categoryId = null) => {
  //   try {
  //     setSubCategoriesLoading(true);
  //     const authHeaders = getAuthHeaders();
  //     if (!authHeaders) return;

  //     const endpoint = categoryId
  //       ? `/subcategory?category_id=${categoryId}`
  //       : "/subcategory";

  //     const res = await api.get(endpoint, { headers: authHeaders });
  //     const subCategoriesData =
  //       res.data.subcategories || res.data.data || res.data || [];
  //     const subCategoriesArray = Array.isArray(subCategoriesData)
  //       ? subCategoriesData
  //       : [];

  //     if (categoryId) {
  //       setFilteredSubCategories(subCategoriesArray);
  //     } else {
  //       setSubCategories(subCategoriesArray);
  //     }
  //   } catch (err) {
  //     console.error(
  //       "Error fetching subcategories:",
  //       err.response || err.message
  //     );
  //     if (err.response?.status === 401) {
  //       alert("Session expired. Please login again.");
  //       window.location.href = "/login";
  //     } else {
  //       alert("Unable to load subcategories. Please try again.");
  //     }
  //     setFilteredSubCategories([]);
  //   } finally {
  //     setSubCategoriesLoading(false);
  //   }
  // };


   const fetchSubCategories = async (categoryId = null) => {
    try {
      setSubCategoriesLoading(true);
      const authHeaders = getAuthHeaders();
      if (!authHeaders) return;

      let endpoint;
      if (categoryId) {
  endpoint = `/user/approved/by-category?category_id=${categoryId}`;
}
 else {
        endpoint = "http://localhost:5000/api/user/approved";
      }

      const res = await api.get(endpoint, {
        headers: authHeaders,
      });

      console.log("Subcategories fetched:", res.data);

      const subCategoriesData =
        res.data.subcategories || res.data.data || res.data || [];
      const subCategoriesArray = Array.isArray(subCategoriesData)
        ? subCategoriesData
        : [];

      if (categoryId) {
        setFilteredSubCategories(subCategoriesArray);
      } else {
        setSubCategories(subCategoriesArray);
      }
    } catch (err) {
      console.error(
        "Error fetching subcategories:",
        err.response || err.message
      );

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        return;
      }

      // Fallback logic with direct axios calls
      if (categoryId) {
        try {
          const authHeaders = getAuthHeaders();
          if (!authHeaders) return;

          const fallbackRes = await api.get("/user/approved",
            {
              headers: authHeaders,
            }
          );
          const allSubCategories =
            fallbackRes.data.subcategories || fallbackRes.data || [];
          const filtered = allSubCategories.filter(
            (sub) => String(sub.category_id) === String(categoryId)
          );
          setFilteredSubCategories(filtered);
        } catch (fallbackErr) {
          console.error("Fallback subcategories fetch failed:", fallbackErr);
          setFilteredSubCategories([]);
        }
      } else {
        try {
          const authHeaders = getAuthHeaders();
          if (!authHeaders) return;

          const altRes = await api.get("/user/approved",
            {
              headers: authHeaders,
            }
          );
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
  // Initial data loading
  useEffect(() => {
    if (!isAuthenticated()) {
      alert("Please login to access this page");
      window.location.href = "/login";
      return;
    }

    fetchVendorInfo();
    fetchProducts();
    fetchCategories();
    fetchSubCategories();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  // Handle form input changes
  const handleInput = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file" && files) {
      const selectedFiles = Array.from(files);
      const totalImages = images.length + selectedFiles.length;
      if (totalImages > 5) {
        alert("You can upload a maximum of 5 images.");
        return;
      }

      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      const invalidFiles = selectedFiles.filter(
        (file) => !validTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        alert("Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed.");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      const oversizedFiles = selectedFiles.filter(
        (file) => file.size > maxSize
      );
      if (oversizedFiles.length > 0) {
        alert("Each image must be smaller than 5MB.");
        return;
      }

      const newPreviewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...selectedFiles]);
      setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    } else {
      // Ensure price and discount_percentage are integers
      const parsedValue =
        name === "price" || name === "discount_percentage"
          ? parseInt(value, 10) || ""
          : value;
      setForm((prev) => ({
        ...prev,
        [name]: parsedValue,
        ...(name === "category_id" && { subcategory_id: "" }),
      }));

      if (name === "category_id" && value) {
        fetchSubCategories(value);
      } else if (name === "category_id") {
        setFilteredSubCategories([]);
      }
    }
  };

  // Remove image from selection
  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    const updatedPreviewUrls = imagePreviewUrls.filter(
      (_, index) => index !== indexToRemove
    );

    URL.revokeObjectURL(imagePreviewUrls[indexToRemove]);
    setImages(updatedImages);
    setImagePreviewUrls(updatedPreviewUrls);
  };

  // Handle form submission for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders) {
        alert("Authentication required. Please login.");
        window.location.href = "/login";
        return;
      }

      const vendorId = getVendorId();
      if (!vendorId && !editingId) {
        alert("Vendor ID not found. Please refresh the page and try again.");
        return;
      }

      const formData = new FormData();
      const dataToSubmit = {};

      if (editingId) {
        Object.keys(form).forEach((key) => {
          if (
            form[key] !== "" &&
            form[key] !== null &&
            form[key] !== undefined
          ) {
            dataToSubmit[key] =
              key === "price" || key === "discount_percentage"
                ? parseInt(form[key], 10)
                : form[key];
          }
        });
      } else {
        const requiredFields = [
          "name",
          "price",
          "stock_quantity",
          "category_id",
        ];
        const missingFields = requiredFields.filter((field) => !form[field]);
        if (missingFields.length > 0) {
          alert(`Please fill in required fields: ${missingFields.join(", ")}`);
          return;
        }
        Object.keys(form).forEach((key) => {
          if (form[key] !== "") {
            dataToSubmit[key] =
              key === "price" || key === "discount_percentage"
                ? parseInt(form[key], 10)
                : form[key];
          }
        });
        dataToSubmit.vendor_id = vendorId;
      }

      // Validate price and discount_percentage
      if (
        dataToSubmit.price &&
        (isNaN(dataToSubmit.price) || dataToSubmit.price < 0)
      ) {
        alert("Price must be a non-negative integer.");
        return;
      }
      if (
        dataToSubmit.discount_percentage &&
        (dataToSubmit.discount_percentage < 0 ||
          dataToSubmit.discount_percentage > 100)
      ) {
        alert("Discount percentage must be between 0 and 100.");
        return;
      }

      Object.keys(dataToSubmit).forEach((key) => {
        formData.append(key, dataToSubmit[key]);
      });

      if (images.length > 0) {
        images.forEach((image) => {
          formData.append("images", image);
        });
      }

      console.log("Submitting product data:", dataToSubmit);
      console.log("Images count:", images.length);

      const headers = {
        ...authHeaders,
        "Content-Type": "multipart/form-data",
      };

      let response;
      if (editingId) {
        response = await api.put(`/products/update/${editingId}`, formData, {
          headers,
        });
      } else {
        response = await api.post("/products/add", formData, { headers });
      }

      await fetchProducts();
      resetForm();
      alert(
        editingId
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
    } catch (error) {
      console.error("Error submitting product:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else if (error.response?.status === 403) {
        alert("You don't have permission to perform this action.");
      } else {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Error submitting product. Please try again.";
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      brand: "",
      price: "",
      discount_percentage: "",
      stock_quantity: "",
      unit: "",
      category_id: "",
      subcategory_id: "",
    });
    imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    setImages([]);
    setImagePreviewUrls([]);
    setEditingId(null);
    setFormVisible(false);
    setFilteredSubCategories([]);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  // Handle edit product
  const handleEdit = (product) => {
    if (!isAuthenticated()) {
      alert("Please login to edit products");
      window.location.href = "/login";
      return;
    }

    setForm({
      name: product.name || "",
      description: product.description || "",
      brand: product.brand || "",
      price: product.price ? product.price.toString() : "",
      discount_percentage: product.discount_percentage
        ? product.discount_percentage.toString()
        : "",
      stock_quantity: product.stock_quantity
        ? product.stock_quantity.toString()
        : "",
      unit: product.unit || "",
      category_id: product.category_id || "",
      subcategory_id: product.subcategory_id || "",
    });
    setImages([]);
    setImagePreviewUrls([]);
    setEditingId(product.id);
    setFormVisible(true);
    if (product.category_id) {
      fetchSubCategories(product.category_id);
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    if (!isAuthenticated()) {
      alert("Please login to delete products");
      window.location.href = "/login";
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to delete this product? This will also remove associated images from storage."
      )
    ) {
      try {
        setLoading(true);
        const authHeaders = getAuthHeaders();
        if (!authHeaders) return;

        await api.delete(`/products/delete/${id}`, { headers: authHeaders });
        await fetchProducts();
        alert("Product and associated images deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please login again.");
          window.location.href = "/login";
        } else if (error.response?.status === 403) {
          alert("You don't have permission to delete this product.");
        } else if (error.response?.status === 404) {
          alert("Product not found.");
        } else {
          alert("Error deleting product. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (!isAuthenticated()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="mb-4">
            Please login to access the Product Management page.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } w-full`}
      >
        <div className="sticky top-0 z-20 bg-white shadow-sm">
          <Header
            title="Product Management"
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
        <div className="p-4 space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by product name..."
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              onClick={() => setFormVisible(!formVisible)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {formVisible ? "Close Form" : "Add Product"}
            </button>
          </div>

          {/* Form Section */}
          {formVisible && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name {!editingId ? "*" : ""}
                    </label>
                    <input
                      name="name"
                      placeholder="Enter product name"
                      value={form.name}
                      onChange={handleInput}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required={!editingId}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Brand {!editingId ? "*" : ""}
                    </label>
                    <input
                      name="brand"
                      placeholder="Enter brand name"
                      value={form.brand}
                      onChange={handleInput}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required={!editingId}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Unit {!editingId ? "*" : ""}
                    </label>
                    <input
                      name="unit"
                      placeholder="e.g. kg, piece, liter"
                      value={form.unit}
                      onChange={handleInput}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required={!editingId}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description {!editingId ? "*" : ""}
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter product description"
                    value={form.description}
                    onChange={handleInput}
                    rows={3}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    required={!editingId}
                    disabled={loading}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Price (₹) {!editingId ? "*" : ""}
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0"
                      value={form.price}
                      onChange={handleInput}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required={!editingId}
                      min="0"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Stock Quantity {!editingId ? "*" : ""}
                    </label>
                    <input
                      type="number"
                      name="stock_quantity"
                      placeholder="0"
                      value={form.stock_quantity}
                      onChange={handleInput}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required={!editingId}
                      min="0"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount_percentage"
                      placeholder="0"
                      value={form.discount_percentage}
                      onChange={handleInput}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      max="100"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Category {!editingId ? "*" : ""}
                    </label>
                    <select
                      name="category_id"
                      value={form.category_id}
                      onChange={handleInput}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required={!editingId}
                      disabled={loading || categoriesLoading}
                    >
                      <option value="">
                        {categoriesLoading
                          ? "Loading categories..."
                          : "Select Category"}
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name_en || cat.name || cat.title}
                        </option>
                      ))}
                    </select>
                    {categoriesLoading && (
                      <p className="text-xs text-blue-500">
                        Loading categories...
                      </p>
                    )}
                    {!categoriesLoading && categories.length === 0 && (
                      <p className="text-xs text-red-500">
                        No categories found
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Subcategory
                    </label>
                    <select
                      name="subcategory_id"
                      value={form.subcategory_id}
                      onChange={handleInput}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      disabled={
                        loading || subCategoriesLoading || !form.category_id
                      }
                    >
                      <option value="">
                        {!form.category_id
                          ? "First select a category"
                          : subCategoriesLoading
                          ? "Loading subcategories..."
                          : filteredSubCategories.length === 0
                          ? "No subcategories (Optional)"
                          : "Select Subcategory (Optional)"}
                      </option>
                      {filteredSubCategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name_en || sub.name || sub.title}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500">
                      Subcategory is optional
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Images{" "}
                      {editingId
                        ? "(Upload new images to replace existing ones)"
                        : ""}
                    </label>
                    <input
                      type="file"
                      name="images"
                      multiple
                      accept="image/*"
                      onChange={handleInput}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-600">
                      Upload up to 5 images (JPEG, PNG, GIF, WebP). Max 5MB per
                      image.
                      {editingId &&
                        " Leave empty if you don't want to change images."}
                    </p>
                  </div>
                  {imagePreviewUrls.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Selected Images ({images.length}/5)
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                              disabled={loading}
                            >
                              ×
                            </button>
                            <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : editingId ? (
                      "Update Product"
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded shadow">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="p-2 border">Image</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Stock</th>
                    <th className="p-2 border">Discount</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((p) => (
                    <tr key={p.id} className="text-center">
                      <td className="p-2 border">
                        <img
                          src={
                            p.images?.find((img) => img.is_primary)
                              ?.image_url || "/placeholder.jpg"
                          }
                          alt={p.name}
                          className="w-16 h-16 object-cover mx-auto rounded"
                          onError={(e) => (e.target.src = "/placeholder.jpg")}
                        />
                      </td>
                      <td className="p-2 border">{p.name}</td>
                      <td className="p-2 border">₹{p.discounted_price}</td>
                      <td className="p-2 border">{p.stock_quantity}</td>
                      <td className="p-2 border">
                        {p.discount_percentage || 0}%
                      </td>
                      <td className="p-2 border space-x-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600 transition-colors"
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 transition-colors"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {currentProducts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center p-4 text-gray-500">
                        {loading ? "Loading products..." : "No products found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={currentPage === 1 || loading}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                disabled={loading}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages || loading}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
