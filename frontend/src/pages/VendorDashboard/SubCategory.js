




// import React, { useState } from "react";
// import axios from "axios";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";

// const SubCategory = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const [formData, setFormData] = useState({
//     category_id: "",
//     name_en: "",
//     slug: "",
//     description: "",
//   });

//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("vendor_token"); // <- FIXED

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/request",
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
//       <Sidebar isSidebarOpen={isSidebarOpen} />

//       <div
//         className={`flex-1 transition-all duration-300 bg-gray-100 p-4 ${
//           isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
//         }`}
//       >
//         <Header
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />

//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//           <h2 className="text-2xl font-bold mb-4">Request Subcategory</h2>

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
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";

// const SubCategory = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     name_en: "",
//     slug: "",
//     description: "",
//   });

//   const [message, setMessage] = useState("");
//   const [pendingSubcategories, setPendingSubcategories] = useState([]);

//   const token = localStorage.getItem("vendor_token");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/request",
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
//       fetchPendingApprovals(); // Refresh the list
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Submission failed");
//     }
//   };

//   const fetchPendingApprovals = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/user/pending-approvals", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setPendingSubcategories(res.data.subcategories || []);
//     } catch (err) {
//       console.error("Error fetching pending approvals", err);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/user/approved/${id}`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMessage("Subcategory approved successfully");
//       fetchPendingApprovals();
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Approval failed");
//     }
//   };

//   useEffect(() => {
//     fetchPendingApprovals();
//   }, []);

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar isSidebarOpen={isSidebarOpen} />

//       <div
//         className={`flex-1 transition-all duration-300 bg-gray-100 p-4 ${
//           isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
//         }`}
//       >
//         <Header
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />

//         {/* Subcategory Request Form */}
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//           <h2 className="text-2xl font-bold mb-4">Request Subcategory</h2>

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

//         {/* Pending Subcategories */}
//         <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//           <h2 className="text-xl font-semibold mb-4">Pending Subcategory Approvals</h2>

//           {pendingSubcategories.length === 0 ? (
//             <p className="text-gray-600">No pending requests found.</p>
//           ) : (
//             <div className="space-y-4">
//               {pendingSubcategories.map((sub) => (
//                 <div
//                   key={sub.id}
//                   className="border p-4 rounded-md shadow-sm bg-gray-50"
//                 >
//                   <div className="font-semibold text-lg">{sub.name_en}</div>
//                   <p className="text-sm text-gray-600 mb-1">
//                     Slug: <span className="text-gray-800">{sub.slug}</span>
//                   </p>
//                   <p className="text-sm text-gray-600 mb-2">
//                     Description: {sub.description || "—"}
//                   </p>
//                   <button
//                     onClick={() => handleApprove(sub.id)}
//                     className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                   >
//                     Approve
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategory;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";

// const SubCategory = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     name_en: "",
//     slug: "",
//     description: "",
//   });
//   const [message, setMessage] = useState("");
//   const [approvedSubcategories, setApprovedSubcategories] = useState([]);

//   const token = localStorage.getItem("vendor_token");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/request",
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
//       fetchApprovedSubcategories();
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Submission failed");
//     }
//   };

//   const fetchApprovedSubcategories = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/user/approved",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setApprovedSubcategories(res.data.subcategories || []);
//     } catch (err) {
//       console.error("Error fetching approved subcategories", err);
//     }
//   };

//   useEffect(() => {
//     fetchApprovedSubcategories();
//   }, []);

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar isSidebarOpen={isSidebarOpen} />

//       <div
//         className={`flex-1 transition-all duration-300 bg-gray-100 p-4 ${
//           isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
//         }`}
//       >
//         <Header
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />

//         {/* Subcategory Request Form */}
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//           <h2 className="text-2xl font-bold mb-4">Request Subcategory</h2>

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

//         {/* Approved Subcategories */}
//         <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//           <h2 className="text-xl font-semibold mb-4">Approved Subcategories</h2>

//           {approvedSubcategories.length === 0 ? (
//             <p className="text-gray-600">No approved subcategories available.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {approvedSubcategories.map((sub) => (
//                 <div
//                   key={sub.id}
//                   className="border p-4 rounded-md shadow-sm bg-gray-50"
//                 >
//                   <div className="font-semibold text-lg">{sub.name_en}</div>
//                   <p className="text-sm text-gray-600 mb-1">
//                     Slug: <span className="text-gray-800">{sub.slug}</span>
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Description: {sub.description || "—"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategory;


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
        "http://localhost:5000/api/user/request",
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
