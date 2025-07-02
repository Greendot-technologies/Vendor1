


// import React, { useState } from "react";
// import axios from "axios";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";
// import api from "../../services/productApi"; // Adjust the import path as needed

// const SubCategory = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     name_en: "",
//     slug: "",
//     description: "",
//   });
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("vendor_token");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await api.post("/user/request",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(response.data.message || "Request submitted successfully");
//       setFormData({
//         category_id: "",
//         name_en: "",
//         slug: "",
//         description: "",
//       });
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Submission failed");
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* <Sidebar isSidebarOpen={isSidebarOpen} />

//       <div
//         className={`flex-1 transition-all duration-300 bg-gray-100 p-4 ${
//           isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
//         }`}
//       >
//         <Header
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         /> */}
//       <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

//       {/* Main content area with dynamic margin based on sidebar state */}
//       <div
//         className={`flex-1  transition-all duration-300 ${
//           isSidebarOpen ? "ml-64" : "ml-16"
//         }`}
//       >
//         <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

//         {/* Subcategory Request Form */}
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//           <h2 className="text-2xl font-bold mb-4">Create Subcategory</h2>

//           {message && (
//             <div className="mb-4 text-sm text-white bg-blue-500 p-2 rounded">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Category ID
//               </label>
//               <input
//                 type="text"
//                 name="category_id"
//                 value={formData.category_id}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Subcategory Name (English)
//               </label>
//               <input
//                 type="text"
//                 name="name_en"
//                 value={formData.name_en}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Slug
//               </label>
//               <input
//                 type="text"
//                 name="slug"
//                 value={formData.slug}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Send Request
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategory;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";

// const baseURL = "http://localhost:5000/api/user";
// const categoryURL = "http://localhost:5000/api/category";

// const ITEMS_PER_PAGE = 5;

// const SubCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     name_en: "",
//     slug: "",
//     description: "",
//   });
//   const [approvedSubcategories, setApprovedSubcategories] = useState([]);
//   const [pendingSubcategories, setPendingSubcategories] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const [approvedPage, setApprovedPage] = useState(1);
//   const [pendingPage, setPendingPage] = useState(1);

//   useEffect(() => {
//     fetchCategories();
//     fetchApproved();
//     fetchPending();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(categoryURL);
//       setCategories(res.data.categories);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching categories");
//     }
//   };

//   const fetchApproved = async () => {
//     try {
//       const res = await axios.get(`${baseURL}/approved`);
//       setApprovedSubcategories(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching approved subcategories");
//     }
//   };

//   const fetchPending = async () => {
//     try {
//       const res = await axios.get(`${baseURL}/pending-approvals`);
//       setPendingSubcategories(res.data.subcategories);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching pending approvals");
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("vendor_token");
//       const res = await axios.post(`${baseURL}/request`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast.success(res.data.message || "Subcategory request sent successfully");
//       setShowForm(false);
//       setFormData({
//         category_id: "",
//         name_en: "",
//         slug: "",
//         description: "",
//       });
//       fetchApproved();
//       fetchPending();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Error sending request");
//     }
//   };

//   const paginatedApproved = approvedSubcategories.slice(
//     (approvedPage - 1) * ITEMS_PER_PAGE,
//     approvedPage * ITEMS_PER_PAGE
//   );
//   const paginatedPending = pendingSubcategories.slice(
//     (pendingPage - 1) * ITEMS_PER_PAGE,
//     pendingPage * ITEMS_PER_PAGE
//   );

//   const totalApprovedPages = Math.ceil(approvedSubcategories.length / ITEMS_PER_PAGE);
//   const totalPendingPages = Math.ceil(pendingSubcategories.length / ITEMS_PER_PAGE);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
//       <div
//         className={`flex-1 transition-all duration-300 ${
//           isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
//         }`}
//       >
//         <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

//         <div className="max-w-6xl mx-auto p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold text-indigo-700">Subcategory Management</h1>
//             <button
//               onClick={() => setShowForm(!showForm)}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded shadow"
//             >
//               {showForm ? "Cancel" : "Create Subcategory"}
//             </button>
//           </div>

//           {showForm && (
//             <form
//               className="bg-white border rounded-lg p-6 mb-10 shadow"
//               onSubmit={handleSubmit}
//             >
//               <h2 className="text-xl font-semibold mb-4">Create New Subcategory</h2>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Category
//                 </label>
//                 <select
//                   name="category_id"
//                   value={formData.category_id}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name_en}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name_en"
//                   value={formData.name_en}
//                   onChange={handleInputChange}
//                   placeholder="Enter subcategory name"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Slug
//                 </label>
//                 <input
//                   type="text"
//                   name="slug"
//                   value={formData.slug}
//                   onChange={handleInputChange}
//                   placeholder="Enter slug"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                   required
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Enter description"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
//               >
//                 Submit Request
//               </button>
//             </form>
//           )}

//           <section className="mb-10">
//             <h2 className="text-2xl font-bold mb-4">Approved Subcategories</h2>
//             {approvedSubcategories.length === 0 ? (
//               <p className="text-gray-500">No approved subcategories found.</p>
//             ) : (
//               <div className="overflow-x-auto bg-white border rounded-lg shadow">
//                 <table className="min-w-full">
//                   <thead className="bg-gray-50 text-gray-700">
//                     <tr>
//                       <th className="border p-3 text-left">ID</th>
//                       <th className="border p-3 text-left">Name</th>
//                       <th className="border p-3 text-left">Slug</th>
//                       <th className="border p-3 text-left">Description</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedApproved.map((sub) => (
//                       <tr key={sub.id} className="hover:bg-gray-50">
//                         <td className="border p-3">{sub.id}</td>
//                         <td className="border p-3">{sub.name_en}</td>
//                         <td className="border p-3">{sub.slug}</td>
//                         <td className="border p-3">{sub.description}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {totalApprovedPages > 1 && (
//                   <div className="flex justify-center items-center mt-4 space-x-2">
//                     <button
//                       disabled={approvedPage === 1}
//                       onClick={() => setApprovedPage((p) => Math.max(p - 1, 1))}
//                       className={`px-3 py-1 rounded ${
//                         approvedPage === 1
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-indigo-500 hover:bg-indigo-600 text-white"
//                       }`}
//                     >
//                       Previous
//                     </button>
//                     {[...Array(totalApprovedPages).keys()].map((num) => (
//                       <button
//                         key={num + 1}
//                         onClick={() => setApprovedPage(num + 1)}
//                         className={`px-3 py-1 rounded ${
//                           approvedPage === num + 1
//                             ? "bg-indigo-600 text-white"
//                             : "bg-gray-200 hover:bg-gray-300"
//                         }`}
//                       >
//                         {num + 1}
//                       </button>
//                     ))}
//                     <button
//                       disabled={approvedPage === totalApprovedPages}
//                       onClick={() => setApprovedPage((p) => Math.min(p + 1, totalApprovedPages))}
//                       className={`px-3 py-1 rounded ${
//                         approvedPage === totalApprovedPages
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-indigo-500 hover:bg-indigo-600 text-white"
//                       }`}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </section>

//           <section>
//             <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>
//             {pendingSubcategories.length === 0 ? (
//               <p className="text-gray-500">No pending subcategories found.</p>
//             ) : (
//               <div className="overflow-x-auto bg-white border rounded-lg shadow">
//                 <table className="min-w-full">
//                   <thead className="bg-gray-50 text-gray-700">
//                     <tr>
//                       <th className="border p-3 text-left">ID</th>
//                       <th className="border p-3 text-left">Name</th>
//                       <th className="border p-3 text-left">Slug</th>
//                       <th className="border p-3 text-left">Description</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedPending.map((sub) => (
//                       <tr key={sub.id} className="hover:bg-gray-50">
//                         <td className="border p-3">{sub.id}</td>
//                         <td className="border p-3">{sub.name_en}</td>
//                         <td className="border p-3">{sub.slug}</td>
//                         <td className="border p-3">{sub.description}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {totalPendingPages > 1 && (
//                   <div className="flex justify-center items-center mt-4 space-x-2">
//                     <button
//                       disabled={pendingPage === 1}
//                       onClick={() => setPendingPage((p) => Math.max(p - 1, 1))}
//                       className={`px-3 py-1 rounded ${
//                         pendingPage === 1
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-indigo-500 hover:bg-indigo-600 text-white"
//                       }`}
//                     >
//                       Previous
//                     </button>
//                     {[...Array(totalPendingPages).keys()].map((num) => (
//                       <button
//                         key={num + 1}
//                         onClick={() => setPendingPage(num + 1)}
//                         className={`px-3 py-1 rounded ${
//                           pendingPage === num + 1
//                             ? "bg-indigo-600 text-white"
//                             : "bg-gray-200 hover:bg-gray-300"
//                         }`}
//                       >
//                         {num + 1}
//                       </button>
//                     ))}
//                     <button
//                       disabled={pendingPage === totalPendingPages}
//                       onClick={() => setPendingPage((p) => Math.min(p + 1, totalPendingPages))}
//                       className={`px-3 py-1 rounded ${
//                         pendingPage === totalPendingPages
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-indigo-500 hover:bg-indigo-600 text-white"
//                       }`}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategory;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";

// const baseURL = "http://localhost:5000/api/user";
// const categoryURL = "http://localhost:5000/api/category";

// const ITEMS_PER_PAGE = 5;

// const SubCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     name_en: "",
//     slug: "",
//     description: "",
//   });
//   const [allSubcategories, setAllSubcategories] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [allPage, setAllPage] = useState(1);

//   useEffect(() => {
//     fetchCategories();
//     fetchAllSubcategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(categoryURL);
//       setCategories(res.data.categories);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching categories");
//     }
//   };

//   // const fetchAllSubcategories = async () => {
//   //   try {
//   //     const res = await axios.get(`${baseURL}/all-subcategories`);
//   //     setAllSubcategories(res.data.subcategories);
//   //   } catch (err) {
//   //     console.error(err);
//   //     toast.error("Error fetching subcategories");
//   //   }
//   // };


//   const fetchAllSubcategories = async () => {
//   try {
//     const token = localStorage.getItem("vendor_token"); // get token from localStorage (or wherever you store it)
//     const res = await axios.get(`${baseURL}/all-subcategories`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // 🔥 attach token to request
//       },
//     });
//     setAllSubcategories(res.data.subcategories);
//   } catch (err) {
//     console.error(err);
//     toast.error("Error fetching subcategories");
//   }
// };


//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("vendor_token");
//       const res = await axios.post(`${baseURL}/request`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success(res.data.message || "Subcategory request sent successfully");
//       setShowForm(false);
//       setFormData({ category_id: "", name_en: "", slug: "", description: "" });
//       fetchAllSubcategories();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Error sending request");
//     }
//   };

//   const paginatedAll = allSubcategories.slice(
//     (allPage - 1) * ITEMS_PER_PAGE,
//     allPage * ITEMS_PER_PAGE
//   );

//   const totalAllPages = Math.ceil(allSubcategories.length / ITEMS_PER_PAGE);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
//       <div
//         className={`flex-1 transition-all duration-300 ${
//           isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
//         }`}
//       >
//         <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
//         <div className="max-w-6xl mx-auto p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold text-indigo-700">Subcategory Management</h1>
//             <button
//               onClick={() => setShowForm(!showForm)}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded shadow"
//             >
//               {showForm ? "Cancel" : "Create Subcategory"}
//             </button>
//           </div>

//           {showForm && (
//             <form
//               className="bg-white border rounded-lg p-6 mb-10 shadow"
//               onSubmit={handleSubmit}
//             >
//               <h2 className="text-xl font-semibold mb-4">Create New Subcategory</h2>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Category
//                 </label>
//                 <select
//                   name="category_id"
//                   value={formData.category_id}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name_en}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Name</label>
//                 <input
//                   type="text"
//                   name="name_en"
//                   value={formData.name_en}
//                   onChange={handleInputChange}
//                   placeholder="Enter subcategory name"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Slug</label>
//                 <input
//                   type="text"
//                   name="slug"
//                   value={formData.slug}
//                   onChange={handleInputChange}
//                   placeholder="Enter slug"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                   required
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block text-gray-700 font-medium mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Enter description"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
//               >
//                 Submit Request
//               </button>
//             </form>
//           )}

//           <section className="mb-10">
//             <h2 className="text-2xl font-bold mb-4">All Subcategories</h2>
//             {allSubcategories.length === 0 ? (
//               <p className="text-gray-500">No subcategories found.</p>
//             ) : (
//               <div className="overflow-x-auto bg-white border rounded-lg shadow">
//                 <table className="min-w-full">
//                   <thead className="bg-gray-50 text-gray-700">
//                     <tr>
//                       <th className="border p-3 text-left">Sr No</th>
//                       <th className="border p-3 text-left">Subcategory</th>
//                       <th className="border p-3 text-left">Category</th>
//                       <th className="border p-3 text-left">Status</th>
//                       <th className="border p-3 text-left">Remark</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedAll.map((sub, index) => (
//                       <tr key={sub.id} className="hover:bg-gray-50">
//                         <td className="border p-3">
//                           {(allPage - 1) * ITEMS_PER_PAGE + index + 1}
//                         </td>
//                         <td className="border p-3">{sub.name_en}</td>
//                         <td className="border p-3">{sub.category_name}</td>
//                         <td className="border p-3 capitalize">
//                           {sub.status}
//                         </td>
//                         <td className="border p-3">
//                           {sub.remark || "-"}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 {totalAllPages > 1 && (
//                   <div className="flex justify-center items-center mt-4 space-x-2">
//                     <button
//                       disabled={allPage === 1}
//                       onClick={() => setAllPage((p) => Math.max(p - 1, 1))}
//                       className={`px-3 py-1 rounded ${
//                         allPage === 1
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-indigo-500 hover:bg-indigo-600 text-white"
//                       }`}
//                     >
//                       Previous
//                     </button>
//                     {[...Array(totalAllPages).keys()].map((num) => (
//                       <button
//                         key={num + 1}
//                         onClick={() => setAllPage(num + 1)}
//                         className={`px-3 py-1 rounded ${
//                           allPage === num + 1
//                             ? "bg-indigo-600 text-white"
//                             : "bg-gray-200 hover:bg-gray-300"
//                         }`}
//                       >
//                         {num + 1}
//                       </button>
//                     ))}
//                     <button
//                       disabled={allPage === totalAllPages}
//                       onClick={() => setAllPage((p) => Math.min(p + 1, totalAllPages))}
//                       className={`px-3 py-1 rounded ${
//                         allPage === totalAllPages
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-indigo-500 hover:bg-indigo-600 text-white"
//                       }`}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategory;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";

// const baseURL = "http://localhost:5000/api/user";
// const categoryURL = "http://localhost:5000/api/category";

// const ITEMS_PER_PAGE = 5;

// const SubCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     name_en: "",
//     slug: "",
//     description: "",
//   });
//   const [allSubcategories, setAllSubcategories] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [allPage, setAllPage] = useState(1);

//   useEffect(() => {
//     fetchCategories();
//     fetchAllSubcategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(categoryURL);
//       setCategories(res.data.categories);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching categories");
//     }
//   };

//   const fetchAllSubcategories = async () => {
//     try {
//       const token = localStorage.getItem("vendor_token");
//       const res = await axios.get(`${baseURL}/all-subcategories`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAllSubcategories(res.data.subcategories);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching subcategories");
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("vendor_token");
//       const res = await axios.post(`${baseURL}/request`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success(res.data.message || "Subcategory request sent successfully");
//       setShowForm(false);
//       setFormData({ category_id: "", name_en: "", slug: "", description: "" });
//       fetchAllSubcategories();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Error sending request");
//     }
//   };

//   const paginatedAll = allSubcategories.slice(
//     (allPage - 1) * ITEMS_PER_PAGE,
//     allPage * ITEMS_PER_PAGE
//   );
//   const totalAllPages = Math.ceil(allSubcategories.length / ITEMS_PER_PAGE);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
//       <div
//         className={`flex-1 transition-all duration-300 ${
//           isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
//         }`}
//       >
//         <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
//         <div className="max-w-6xl mx-auto p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold text-indigo-700">Subcategory Management</h1>
//             <button
//               onClick={() => setShowForm(!showForm)}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded shadow"
//             >
//               {showForm ? "Cancel" : "Create Subcategory"}
//             </button>
//           </div>

//           {showForm && (
//             <div className="bg-white border border-gray-300 rounded-lg p-8 mb-10 shadow">
//               <h2 className="text-2xl font-bold mb-6 text-indigo-700">Create New Subcategory</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">Category</label>
//                     <select
//                       name="category_id"
//                       value={formData.category_id}
//                       onChange={handleInputChange}
//                       className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.name_en}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">Name</label>
//                     <input
//                       type="text"
//                       name="name_en"
//                       value={formData.name_en}
//                       onChange={handleInputChange}
//                       placeholder="Enter subcategory name"
//                       className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">Slug</label>
//                     <input
//                       type="text"
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleInputChange}
//                       placeholder="Enter slug"
//                       className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">Description</label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       placeholder="Enter description"
//                       className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring focus:border-indigo-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow"
//                 >
//                   Submit Request
//                 </button>
//               </form>
//             </div>
//           )}

//           <section className="mb-10">
//             <h2 className="text-2xl font-bold mb-4">All Subcategories</h2>
//             {allSubcategories.length === 0 ? (
//               <p className="text-gray-500">No subcategories found.</p>
//             ) : (
//               <div className="overflow-x-auto bg-white border rounded-lg shadow">
//                 <table className="min-w-full">
//                   <thead className="bg-gray-50 text-gray-700">
//                     <tr>
//                       <th className="border p-3 text-left">Sr No</th>
//                       <th className="border p-3 text-left">Subcategory</th>
//                       <th className="border p-3 text-left">Category</th>
//                       <th className="border p-3 text-left">Status</th>
//                       <th className="border p-3 text-left">Remark</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedAll.map((sub, index) => (
//                       <tr key={sub.id} className="hover:bg-gray-50">
//                         <td className="border p-3">
//                           {(allPage - 1) * ITEMS_PER_PAGE + index + 1}
//                         </td>
//                         <td className="border p-3">{sub.name_en}</td>
//                         <td className="border p-3">{sub.category_name}</td>
//                         <td className="border p-3">
//                           <span
//                             className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
//                               sub.status === "approved"
//                                 ? "bg-green-100 text-green-700"
//                                 : sub.status === "pending"
//                                 ? "bg-orange-100 text-orange-700"
//                                 : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {sub.status}
//                           </span>
//                         </td>
//                         <td className="border p-3">{sub.remark || "-"}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 {totalAllPages > 1 && (
//                   <div className="flex justify-center items-center mt-6 space-x-2">
//                     <button
//                       disabled={allPage === 1}
//                       onClick={() => setAllPage((p) => Math.max(p - 1, 1))}
//                       className={`px-4 py-2 rounded-full ${
//                         allPage === 1
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-indigo-500 hover:bg-indigo-600 text-white"
//                       }`}
//                     >
//                       Previous
//                     </button>
//                     {[...Array(totalAllPages).keys()].map((num) => (
//                       <button
//                         key={num + 1}
//                         onClick={() => setAllPage(num + 1)}
//                         className={`px-4 py-2 rounded-full ${
//                           allPage === num + 1
//                             ? "bg-indigo-600 text-white"
//                             : "bg-gray-200 hover:bg-gray-300"
//                         }`}
//                       >
//                         {num + 1}
//                       </button>
//                     ))}
//                     <button
//                       disabled={allPage === totalAllPages}
//                       onClick={() => setAllPage((p) => Math.min(p + 1, totalAllPages))}
//                       className={`px-4 py-2 rounded-full ${
//                         allPage === totalAllPages
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-indigo-500 hover:bg-indigo-600 text-white"
//                       }`}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategory;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";

// const baseURL = "http://localhost:5000/api/user";
// const categoryURL = "http://localhost:5000/api/category";

// const ITEMS_PER_PAGE = 5;

// const SubCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     name_en: "",
//     slug: "",
//     description: "",
//   });
//   const [allSubcategories, setAllSubcategories] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [allPage, setAllPage] = useState(1);

//   useEffect(() => {
//     fetchCategories();
//     fetchAllSubcategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(categoryURL);
//       setCategories(res.data.categories);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching categories");
//     }
//   };

//   const fetchAllSubcategories = async () => {
//     try {
//       const token = localStorage.getItem("vendor_token");
//       const res = await axios.get(`${baseURL}/all-subcategories`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAllSubcategories(res.data.subcategories);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching subcategories");
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("vendor_token");
//       const res = await axios.post(`${baseURL}/request`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success(res.data.message || "Subcategory request sent successfully");
//       setShowForm(false);
//       setFormData({ category_id: "", name_en: "", slug: "", description: "" });
//       fetchAllSubcategories();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Error sending request");
//     }
//   };

//   const paginatedAll = allSubcategories.slice(
//     (allPage - 1) * ITEMS_PER_PAGE,
//     allPage * ITEMS_PER_PAGE
//   );
//   const totalAllPages = Math.ceil(allSubcategories.length / ITEMS_PER_PAGE);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
//       <div
//         className={`flex-1 transition-all duration-300 ${
//           isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
//         }`}
//       >
//         <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
//         <div className="max-w-6xl mx-auto p-4 md:p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl md:text-3xl font-bold text-black-700">Subcategory Management</h1>
//             <button
//               onClick={() => setShowForm(!showForm)}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
//             >
//               {showForm ? "Cancel" : "Create Subcategory"}
//             </button>
//           </div>

//           {showForm && (
//             <div className="bg-white border border-gray-300 rounded-md p-4 md:p-6 mb-8 shadow-sm">
//               <h2 className="text-lg font-semibold mb-4 text-indigo-700">Create New Subcategory</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-gray-700 text-sm mb-1">Category</label>
//                     <select
//                       name="category_id"
//                       value={formData.category_id}
//                       onChange={handleInputChange}
//                       className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-indigo-500 text-sm"
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.name_en}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 text-sm mb-1">Name</label>
//                     <input
//                       type="text"
//                       name="name_en"
//                       value={formData.name_en}
//                       onChange={handleInputChange}
//                       placeholder="Enter subcategory name"
//                       className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-indigo-500 text-sm"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-gray-700 text-sm mb-1">Slug</label>
//                     <input
//                       type="text"
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleInputChange}
//                       placeholder="Enter slug"
//                       className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-indigo-500 text-sm"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 text-sm mb-1">Description</label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       placeholder="Enter description"
//                       className="w-full border border-gray-300 rounded px-2 py-1 h-20 focus:outline-none focus:ring focus:border-indigo-500 text-sm"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded text-sm"
//                 >
//                   Submit Request
//                 </button>
//               </form>
//             </div>
//           )}

//           <section className="mb-8">
//             {/* <h2 className="text-xl font-bold mb-4">All Subcategories</h2> */}
//             {allSubcategories.length === 0 ? (
//               <p className="text-gray-500">No subcategories found.</p>
//             ) : (
//               <div className="overflow-x-auto bg-white border border-gray-300 rounded-md shadow-sm">
//                 <table className="min-w-full text-bold text-gray-900">
//                   <thead className="bg-gray-50 border-b">
//                     <tr>
//                       <th className="p-3 text-left font-semibold">Sr no</th>
//                       <th className="p-3 text-left font-semibold">Subcategory</th>
//                       <th className="p-3 text-left font-semibold">Category</th>
//                       <th className="p-3 text-left font-semibold">Status</th>
//                       <th className="p-3 text-left font-semibold">Remark</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedAll.map((sub, index) => (
//                       <tr
//                         key={sub.id}
//                         className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                       >
//                         <td className="p-3 border-t">{(allPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
//                         <td className="p-3 border-t">{sub.name_en}</td>
//                         <td className="p-3 border-t">{sub.category_name}</td>
//                         <td className="p-3 border-t">
//                           <span
//                             className={`px-2 py-1 rounded text-xs font-medium ${
//                               sub.status === "approved"
//                                 ? "bg-green-100 text-green-700"
//                                 : sub.status === "pending"
//                                 ? "bg-orange-100 text-orange-700"
//                                 : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {sub.status}
//                           </span>
//                         </td>
//                         <td className="p-3 border-t">{sub.remark || "-"}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 {totalAllPages > 1 && (
//                   <div className="flex justify-center items-center mt-4 gap-2">
//                     <button
//                       disabled={allPage === 1}
//                       onClick={() => setAllPage((p) => Math.max(p - 1, 1))}
//                       className={`px-3 py-1 rounded border ${
//                         allPage === 1
//                           ? "bg-gray-200 cursor-not-allowed"
//                           : "bg-white hover:bg-gray-100"
//                       }`}
//                     >
//                       Previous
//                     </button>
//                     {[...Array(totalAllPages).keys()].map((num) => (
//                       <button
//                         key={num + 1}
//                         onClick={() => setAllPage(num + 1)}
//                         className={`px-3 py-1 rounded border ${
//                           allPage === num + 1
//                             ? "bg-indigo-600 text-white"
//                             : "bg-white hover:bg-gray-100"
//                         }`}
//                       >
//                         {num + 1}
//                       </button>
//                     ))}
//                     <button
//                       disabled={allPage === totalAllPages}
//                       onClick={() => setAllPage((p) => Math.min(p + 1, totalAllPages))}
//                       className={`px-3 py-1 rounded border ${
//                         allPage === totalAllPages
//                           ? "bg-gray-200 cursor-not-allowed"
//                           : "bg-white hover:bg-gray-100"
//                       }`}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategory;


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
