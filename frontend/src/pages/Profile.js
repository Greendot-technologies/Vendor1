
// // import TravellerProfileSearch from "../components/TravellerProfileSearch";
// // import Navbar from "../components/Navbar";
// // import DashboardHeader from "../components/DashboardHeader";
// // import Sidebardash from "../components/Sidebardash";
// // import { useState, useEffect } from "react";
// // import Button from "../components/Button"; // Assuming you have a Button component
// // import { Pencil, User, Mail, Phone } from "lucide-react";
// // import profileImg from "../assets/images/profile.jpg"; // Replace with your actual image path
// // const MyProfile = () => {
// //   const [activeTab, setActiveTab] = useState("My Profile");
// //   const [travelerProfiles, setTravelerProfiles] = useState([]);
// //   const [selectedProfiles, setSelectedProfiles] = useState([]);

// //   // Mock data for traveler profiles (replace with API call in real implementation)
// //   useEffect(() => {
// //     const mockProfiles = [
// //       { id: 1, name: "Syed Shareque Naqshbandi Sy...", mobile: "9022050461", profileId: "R2000481" },
// //       { id: 2, name: "Fida Ur Rehman Khan Mazer Kh...", mobile: "9022050461", profileId: "R2000481" },
// //     ];
// //     setTravelerProfiles(mockProfiles);
// //   }, []);

// //   const sidebarItems = [
// //     "My Profile",
// //     "Traveller Profile",
// //   ];

// //   const handleSearch = (searchType) => {
// //     // Implement search logic here (e.g., filter travelerProfiles based on searchType)
// //     console.log("Search:", searchType);
// //   };

// //   const handleDelete = (selectAll) => {
// //     if (selectAll) {
// //       setSelectedProfiles(travelerProfiles.map(p => p.id));
// //     } else if (selectedProfiles.length > 0) {
// //       const updatedProfiles = travelerProfiles.filter(profile => !selectedProfiles.includes(profile.id));
// //       setTravelerProfiles(updatedProfiles);
// //       setSelectedProfiles([]);
// //       console.log("Deleted profiles:", selectedProfiles);
// //     }
// //   };

// //   const handleAddNewProfile = () => {
// //     // Implement add new profile logic here
// //     console.log("Add New Profile clicked");
// //   };

// //   const renderContent = () => {
// //     switch (activeTab) {
// //       case "My Profile":
// //         return (
// //           <>
// //             {/* Header Section */}
// //             <div className="flex justify-between items-center mb-6">
// //               <h2 className="text-2xl font-semibold border-b-2 border-yellow-400 pb-1 text-gray-800">
// //                 My Profile
// //               </h2>
// //             </div>

// //             {/* User Contact Card */}
            
// //               {/* Profile Image & User Info */}
// //               <div className="flex gap-4 items-center ">
// //                 <div className="relative w-20 h-20">
// //                   <img
// //                     src={profileImg}
// //                     alt="Profile"
// //                     className="rounded-full w-full h-full object-cover border"
// //                   />
// //                   <div className="absolute bottom-0 right-0 bg-yellow-400 p-1 rounded-full cursor-pointer">
// //                     <Pencil size={16} className="text-white" />
// //                   </div>
// //                 </div>

// //                 {/* User Info */}
// //                 <div className="text-sm text-gray-700 space-y-1">
// //                   <div className="font-semibold text-lg">Sales</div>
// //                   <div className="flex items-center gap-2">
// //                     <User className="w-4 h-4" /> User Name: <span className="font-medium">sales2024</span>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <Mail className="w-4 h-4" /> sales@multiflytravel.com
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <Phone className="w-4 h-4" /> 9022050461
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Edit Profile Link */}
// //               <div className="mt-2 md:mt-0">
// //                 <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
// //                   <User className="w-4 h-4" />
// //                   EDIT PROFILE
// //                 </button>
// //               </div>
          
// //           </>
// //         );
// //       case "Traveller Profile":
// //         return (
// //          <>
// //             <TravellerProfileSearch
// //               title="Traveller Profile"
// //               searchCriteriaOptions={["All", "Name", "Mobile"]}
// //               defaultSearchCriteria="All"
// //               onSearch={handleSearch}
// //               onDelete={handleDelete}
// //               selectedProfiles={selectedProfiles}
// //             />
          
// //             <div className="mt-4 space-y-2">
// //               {travelerProfiles.map((profile) => (
// //                 <div key={profile.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-2">
// //                   <div className="flex items-center space-x-2 mb-2 sm:mb-0">
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedProfiles.includes(profile.id)}
// //                       onChange={(e) => {
// //                         setSelectedProfiles(e.target.checked
// //                           ? [...selectedProfiles, profile.id]
// //                           : selectedProfiles.filter(id => id !== profile.id));
// //                       }}
// //                       className="accent-lime-400"
// //                     />
// //                     <span className="text-sm">{profile.name}</span>
// //                   </div>
// //                   <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
// //                     <span className="text-sm">{profile.mobile}</span>
// //                     <span className="text-sm">{profile.profileId}</span>
// //                     <button className="text-blue-500 hover:text-blue-700 text-sm">👁️</button>
// //                     <button className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </>
// //         );
// //       default:
// //         return <div className="text-center text-gray-500">Coming Soon!</div>;
// //     }
// //   };

// //   return (
// //     <section className="bg-gray-200 min-h-screen">
// //       {/* Top Navbar */}
// //       <Navbar />

// //       {/* Page Content */}
// //       <div className="p-4">
// //         {/* Show DashboardHeader only on large screens */}
// //         <div className="hidden lg:block">
// //           <DashboardHeader />
// //         </div>

// //         {/* Layout Wrapper */}
// //         <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:ml-[100px] lg:mr-[100px] lg:gap-6">
// //           {/* Sidebar (top on mobile, left on large screens) */}
// //           <Sidebardash activeTab={activeTab} setActiveTab={setActiveTab} sidebarItems={sidebarItems} className="w-full lg:w-1/5" />

// //           {/* Main Section */}
// //           <div className="flex-1 bg-white rounded-lg shadow p-4">
// //             {renderContent()}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default MyProfile;


//Actual Code

// import React from "react";
// import TravellerProfileSearch from "../components/TravellerProfileSearch";
// import Navbar from "../components/Navbar";
// import DashboardHeader from "../components/DashboardHeader";
// import Sidebardash from "../components/Sidebardash";
// import { useState, useEffect } from "react";
// import Button from "../components/Button";
// import { Pencil, User, Mail, Phone } from "lucide-react";
// import profileImg from "../assets/images/profile.jpg";

// const MyProfile = () => {
//   const [activeTab, setActiveTab] = useState("My Profile");
//   const [travelerProfiles, setTravelerProfiles] = useState([]);
//   const [selectedProfiles, setSelectedProfiles] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({
//     prefix: "",
//     firstName: "",
//     lastName: "",
//     mobile: "",
//     email: "",
//     travelType: "Domestic",
//     passportNumber: "",
//     aadhaarNumber: "",
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const mockProfiles = [
//       { id: 1, name: "Syed Shareque Naqshbandi Sy...", mobile: "9022050461", profileId: "R2000481" },
//       { id: 2, name: "Fida Ur Rehman Khan Mazer Kh...", mobile: "9022050461", profileId: "R2000481" },
//     ];
//     setTravelerProfiles(mockProfiles);
//   }, []);

//   const sidebarItems = ["My Profile", "Traveller Profile"];

//   const handleAddNewProfile = () => {
//     setShowAddForm(!showAddForm);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     let tempErrors = {};
//     if (formData.travelType === "Domestic") {
//       if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
//         tempErrors.aadhaarNumber = "Aadhaar must be a 12-digit number";
//       }
//     }
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     // Add logic to actually save the profile
//     console.log("New Profile Data:", formData);
//     setShowAddForm(false);
//     setFormData({
//       prefix: "",
//       firstName: "",
//       lastName: "",
//       mobile: "",
//       email: "",
//       travelType: "Domestic",
//       passportNumber: "",
//       aadhaarNumber: "",
//     });
//     setErrors({});
//   };

//   const renderContent = () => {
//     switch (activeTab) {

//       case "My Profile":
//         return (
//           <>
//             {/* Header Section */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold border-b-2 border-yellow-400 pb-1 text-gray-800">
//                 My Profile
//               </h2>
//             </div>

//             {/* User Contact Card */}
            
//               {/* Profile Image & User Info */}
//               <div className="flex gap-4 items-center ">
//                 <div className="relative w-20 h-20">
//                   <img
//                     src={profileImg}
//                     alt="Profile"
//                     className="rounded-full w-full h-full object-cover border"
//                   />
//                   <div className="absolute bottom-0 right-0 bg-yellow-400 p-1 rounded-full cursor-pointer">
//                     <Pencil size={16} className="text-white" />
//                   </div>
//                 </div>

//                 {/* User Info */}
//                 <div className="text-sm text-gray-700 space-y-1">
//                   <div className="font-semibold text-lg">Sales</div>
//                   <div className="flex items-center gap-2">
//                     <User className="w-4 h-4" /> User Name: <span className="font-medium">sales2024</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Mail className="w-4 h-4" /> sales@multiflytravel.com
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-4 h-4" /> 9022050461
//                   </div>
//                 </div>
//               </div>

//               {/* Edit Profile Link */}
//               <div className="mt-2 md:mt-0">
//                 <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
//                   <User className="w-4 h-4" />
//                   EDIT PROFILE
//                 </button>
//               </div>
          
//           </>
//         );
//       case "Traveller Profile":
//         return (
//           <>
//             <TravellerProfileSearch
//               title="Traveller Profile"
//               searchCriteriaOptions={["All", "Name", "Mobile"]}
//               defaultSearchCriteria="All"
//               onSearch={(searchType) => console.log("Search:", searchType)}
//               onDelete={(selectAll) => {
//                 if (selectAll) {
//                   setSelectedProfiles(travelerProfiles.map((p) => p.id));
//                 } else if (selectedProfiles.length > 0) {
//                   const updated = travelerProfiles.filter(p => !selectedProfiles.includes(p.id));
//                   setTravelerProfiles(updated);
//                   setSelectedProfiles([]);
//                   console.log("Deleted profiles:", selectedProfiles);
//                 }
//               }}
//               selectedProfiles={selectedProfiles}
//             />

//             <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
//               <Button
//                 type="button"
//                 className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md text-sm"
//                 onClick={handleAddNewProfile}
//               >
//                 {showAddForm ? "Cancel" : "Add New Profile"}
//               </Button>
//             </div>

//             {/* Add New Profile Form */}
//             {showAddForm && (
         
//               <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded space-y-4 shadow">
//   {         /* Name Fields in One Row */}
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <select
//                       name="prefix"
//                       value={formData.prefix}
//                       onChange={handleInputChange}
//                       className="border p-2 rounded lg:w-24 md:w-24 w-24 sm:w-1/4 "
//                       required
//                     >
//                       <option value="" disabled>Prefix</option>
//                       <option value="Mr">Mr</option>
//                       <option value="Mrs">Mrs</option>
//                       <option value="Ms">Ms</option>
//                     </select>
//                     <input
//                       name="firstName"
//                       placeholder="First Name"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       className="border p-2 rounded w-full sm:flex-1"
//                       required
//                     />
//                     <input
//                       name="lastName"
//                       placeholder="Last Name"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       className="border p-2 rounded w-full sm:flex-1"
//                       required
//                     />
//                   </div>

//                   {/* Other Fields */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <input
//                       name="mobile"
//                       placeholder="Mobile"
//                       value={formData.mobile}
//                       onChange={handleInputChange}
//                       className="border p-2 rounded"
//                       required
//                     />
//                     <input
//                       name="email"
//                       type="email"
//                       placeholder="Email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="border p-2 rounded"
//                       required
//                     />
//                     <input
//                       name="passportNumber"
//                       placeholder="Passport Number"
//                       value={formData.passportNumber}
//                       onChange={handleInputChange}
//                       className="border p-2 rounded"
//                     />
              
//                   </div>

//                   <Button
//                     type="submit"
//                     className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm"
//                   >
//                     Submit
//                   </Button>
//               </form>

//             )}

//             {/* Existing Profiles List */}
//             <div className="mt-4 space-y-2">
//               {travelerProfiles.map((profile) => (
//                 <div key={profile.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-2">
//                   <div className="flex items-center space-x-2 mb-2 sm:mb-0">
//                     <input
//                       type="checkbox"
//                       checked={selectedProfiles.includes(profile.id)}
//                       onChange={(e) => {
//                         setSelectedProfiles(
//                           e.target.checked
//                             ? [...selectedProfiles, profile.id]
//                             : selectedProfiles.filter((id) => id !== profile.id)
//                         );
//                       }}
//                       className="accent-lime-400"
//                     />
//                     <span className="text-sm">{profile.name}</span>
//                   </div>
//                   <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
//                     <span className="text-sm">{profile.mobile}</span>
//                     <span className="text-sm">{profile.profileId}</span>
//                     <button className="text-blue-500 hover:text-blue-700 text-sm">👁️</button>
//                     <button className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         );
//       default:
//         return <div className="text-center text-gray-500">Coming Soon!</div>;
//     }
//   };

//   return (
//     <section className="bg-gray-200 min-h-screen">
//       <Navbar />
//       <div className="p-4">
//         <div className="hidden lg:block">
//           <DashboardHeader />
//         </div>
//         <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:ml-[100px] lg:mr-[100px] lg:gap-6">
//           <Sidebardash activeTab={activeTab} setActiveTab={setActiveTab} sidebarItems={sidebarItems} className="w-full lg:w-1/5" />
//           <div className="flex-1 bg-white rounded-lg shadow p-4">{renderContent()}</div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MyProfile;


// import React from "react";
// import TravellerProfileSearch from "../components/TravellerProfileSearch";
// import Navbar from "../components/Navbar";
// import DashboardHeader from "../components/DashboardHeader";
// import Sidebardash from "../components/Sidebardash";
// import { useState, useEffect } from "react";
// import Button from "../components/Button";
// import { Pencil, User, Mail, Phone } from "lucide-react";
// import profileImg from "../assets/images/profile.jpg";

// const MyProfile = () => {
//   const [activeTab, setActiveTab] = useState("My Profile");
//   const [travelerProfiles, setTravelerProfiles] = useState([]);
//   const [selectedProfiles, setSelectedProfiles] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({
//     prefix: "",
//     firstName: "",
//     lastName: "",
//     mobile: "",
//     email: "",
//     travelType: "Domestic",
//     passportNumber: "",
 
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
   
//   }, []);

//   const sidebarItems = ["My Profile", "Traveller Profile"];

//   const handleAddNewProfile = () => {
//     setShowAddForm(!showAddForm);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     let tempErrors = {};

//     if (!formData.firstName || !formData.lastName) {
//       tempErrors.firstName = "First name and last name are required";
//     }
//     if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
//       tempErrors.mobile = "Mobile number must be exactly 10 digits";
//     }
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log("Form submitted with data:", formData); // Debug: Check if form data is logged
//   if (!validateForm()) {
//     console.log("Validation failed:", errors); // Debug: Check validation errors
//     return;
//   }

//   // Retrieve token from localStorage (adjust the key based on your auth system)
//   const token = localStorage.getItem("auth_token"|| "vendor_token"); // Example key, replace with your actual key
//   if (!token) {
//     console.error("No authentication token found");
//     setErrors({ submit: "Authentication token is missing. Please log in." });
//     return;
//   }
//   const url = "http://localhost:5000/api/user/travelers";

//   try {
//     console.log("Sending request to:", url); // Debug: Confirm request is sent
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prefix: formData.prefix || null,
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         mobile: formData.mobile || null,
//         email: formData.email || null,
//         passport_number: formData.passportNumber || null,
//       }),
//     });

//     console.log("Response status:", response.status); // Debug: Check response status
//     const data = await response.json();
//     console.log("Response data:", data); // Debug: Check response data

//     if (response.ok) {
//       console.log("Traveler created:", data.traveler);
//       setTravelerProfiles([...travelerProfiles, { id: travelerProfiles.length + 1, name: `${formData.firstName} ${formData.lastName}`, mobile: formData.mobile, profileId: data.traveler.user_id || data.traveler.vendor_id }]);
//       setShowAddForm(false);
//       setFormData({
//         prefix: "",
//         firstName: "",
//         lastName: "",
//         mobile: "",
//         email: "",
//         passportNumber: "",
       
//       });
//       setErrors({});
//     } else {
//       console.error("Error:", data.error);
//       setErrors({ submit: data.error });
//     }
//   } catch (error) {
//     console.error("Network error:", error); // Debug: Catch any network errors
//     setErrors({ submit: "Server error" });
//   }
// };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "My Profile":
//         return (
//           <>
//             {/* Header Section */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold border-b-2 border-yellow-400 pb-1 text-gray-800">
//                 My Profile
//               </h2>
//             </div>

//             {/* User Contact Card */}
//             <div className="flex gap-4 items-center">
//               <div className="relative w-20 h-20">
//                 <img
//                   src={profileImg}
//                   alt="Profile"
//                   className="rounded-full w-full h-full object-cover border"
//                 />
//                 <div className="absolute bottom-0 right-0 bg-yellow-400 p-1 rounded-full cursor-pointer">
//                   <Pencil size={16} className="text-white" />
//                 </div>
//               </div>

//               {/* User Info */}
//               <div className="text-sm text-gray-700 space-y-1">
//                 <div className="font-semibold text-lg">Sales</div>
//                 <div className="flex items-center gap-2">
//                   <User className="w-4 h-4" /> User Name: <span className="font-medium">sales2024</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Mail className="w-4 h-4" /> sales@multiflytravel.com
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Phone className="w-4 h-4" /> 9022050461
//                 </div>
//               </div>
//             </div>

//             {/* Edit Profile Link */}
//             <div className="mt-2 md:mt-0">
//               <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
//                 <User className="w-4 h-4" />
//                 EDIT PROFILE
//               </button>
//             </div>
//           </>
//         );
//       case "Traveller Profile":
//         return (
//           <>
//             <TravellerProfileSearch
//               title="Traveller Profile"
//               searchCriteriaOptions={["All", "Name", "Mobile"]}
//               defaultSearchCriteria="All"
//               onSearch={(searchType) => console.log("Search:", searchType)}
//               onDelete={(selectAll) => {
//                 if (selectAll) {
//                   setSelectedProfiles(travelerProfiles.map((p) => p.id));
//                 } else if (selectedProfiles.length > 0) {
//                   const updated = travelerProfiles.filter(p => !selectedProfiles.includes(p.id));
//                   setTravelerProfiles(updated);
//                   setSelectedProfiles([]);
//                   console.log("Deleted profiles:", selectedProfiles);
//                 }
//               }}
//               selectedProfiles={selectedProfiles}
//             />

//             <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
//               <Button
//                 type="button"
//                 className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md text-sm"
//                 onClick={handleAddNewProfile}
//               >
//                 {showAddForm ? "Cancel" : "Add New Profile"}
//               </Button>
//             </div>

//             {/* Add New Profile Form */}
//             {showAddForm && (
//               <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded space-y-4 shadow">
//                 {/* Name Fields in One Row */}
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <select
//                     name="prefix"
//                     value={formData.prefix}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded lg:w-24 md:w-24 w-24 sm:w-1/4"
//                     required
//                   >
//                     <option value="" disabled>Prefix</option>
//                     <option value="Mr">Mr</option>
//                     <option value="Mrs">Mrs</option>
//                     <option value="Ms">Ms</option>
//                   </select>
//                   <input
//                     name="firstName"
//                     placeholder="First Name"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded w-full sm:flex-1"
//                     required
//                   />
//                   <input
//                     name="lastName"
//                     placeholder="Last Name"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded w-full sm:flex-1"
//                     required
//                   />
//                 </div>

//                 {/* Other Fields */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <input
//                     name="mobile"
//                     placeholder="Mobile"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded"
//                     pattern="\d{10}"
//                     maxLength="10"
//                   />

//                   <input
//                     name="email"
//                     type="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded"
//                   />
//                   <input
//                     name="passportNumber"
//                     placeholder="Passport Number"
//                     value={formData.passportNumber}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded"
//                   />
//                 </div>

//                 {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

//                 <Button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm"
//                 >
//                   Submit
//                 </Button>
//               </form>
//             )}

//             {/* Existing Profiles List */}
//             <div className="mt-4 space-y-2">
//               {travelerProfiles.map((profile) => (
//                 <div key={profile.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-2">
//                   <div className="flex items-center space-x-2 mb-2 sm:mb-0">
//                     <input
//                       type="checkbox"
//                       checked={selectedProfiles.includes(profile.id)}
//                       onChange={(e) => {
//                         setSelectedProfiles(
//                           e.target.checked
//                             ? [...selectedProfiles, profile.id]
//                             : selectedProfiles.filter((id) => id !== profile.id)
//                         );
//                       }}
//                       className="accent-lime-400"
//                     />
//                     <span className="text-sm">{profile.name}</span>
//                   </div>
//                   <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
//                     <span className="text-sm">{profile.mobile}</span>
//                     <span className="text-sm">{profile.profileId}</span>
//                     <button className="text-blue-500 hover:text-blue-700 text-sm">👁️</button>
//                     <button className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         );
//       default:
//         return <div className="text-center text-gray-500">Coming Soon!</div>;
//     }
//   };

//   return (
//     <section className="bg-gray-200 min-h-screen">
//       <Navbar />
//       <div className="p-4">
//         <div className="hidden lg:block">
//           <DashboardHeader />
//         </div>
//         <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:ml-[100px] lg:mr-[100px] lg:gap-6">
//           <Sidebardash activeTab={activeTab} setActiveTab={setActiveTab} sidebarItems={sidebarItems} className="w-full lg:w-1/5" />
//           <div className="flex-1 bg-white rounded-lg shadow p-4">{renderContent()}</div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MyProfile;


// import React, { useState, useEffect } from "react";
// import TravellerProfileSearch from "../components/TravellerProfileSearch";
// import Navbar from "../components/Navbar";
// import DashboardHeader from "../components/DashboardHeader";
// import Sidebardash from "../components/Sidebardash";
// import Button from "../components/Button";
// import { Pencil, User, Mail, Phone } from "lucide-react";
// import profileImg from "../assets/images/profile.jpg";

// const MyProfile = () => {
//   const [activeTab, setActiveTab] = useState("My Profile");
//   const [travelerProfiles, setTravelerProfiles] = useState([]);
//   const [selectedProfiles, setSelectedProfiles] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({
//     prefix: "",
//     firstName: "",
//     lastName: "",
//     mobile: "",
//     email: "",
//     travelType: "Domestic",
//     passportNumber: "",
//   });
//   const [errors, setErrors] = useState({});

//   // Fetch vendor-specific travelers on mount or tab change
//   useEffect(() => {
//     const fetchTravelers = async () => {
//       const token = localStorage.getItem("auth_token") || localStorage.getItem("vendor_token");
//       if (!token) {
//         console.error("No authentication token found");
//         setErrors({ submit: "Authentication token is missing. Please log in." });
//         return;
//       }

//       try {
//         const url = "http://localhost:5000/api/user/travelers";
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         console.log("GET Response status:", response.status);
//         const data = await response.json();
//         console.log("GET Response data:", data);

//         if (response.ok) {
//           // Filter travelers by vendor_id (assuming vendor_id is in the traveler object)
//           const vendorId = 14; // Replace with actual vendor_id from token or context
//           const vendorTravelers = data.travelers.filter(traveler => traveler.vendor_id === vendorId);
//           setTravelerProfiles(vendorTravelers);
//         } else {
//           console.error("Error fetching travelers:", data.error);
//           setErrors({ submit: data.error || "Failed to fetch travelers" });
//         }
//       } catch (error) {
//         console.error("Network error:", error);
//         setErrors({ submit: "Server error" });
//       }
//     };

//     if (activeTab === "Traveller Profile") {
//       fetchTravelers();
//     }
//   }, [activeTab]);

//   const sidebarItems = ["My Profile", "Traveller Profile", "company details"];

//   const handleAddNewProfile = () => {
//     setShowAddForm(!showAddForm);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     let tempErrors = {};

//     if (!formData.firstName || !formData.lastName) {
//       tempErrors.firstName = "First name and last name are required";
//     }
//     if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
//       tempErrors.mobile = "Mobile number must be exactly 10 digits";
//     }
//     if (!formData.passportNumber) {
//       tempErrors.passportNumber = "required";
//     }
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted with data:", formData);
//     if (!validateForm()) {
//       console.log("Validation failed:", errors);
//       return;
//     }

//     const token = localStorage.getItem("auth_token") || localStorage.getItem("vendor_token");
//     if (!token) {
//       console.error("No authentication token found");
//       setErrors({ submit: "Authentication token is missing. Please log in." });
//       return;
//     }

//     const url = "http://localhost:5000/api/user/travelers";

//     try {
//       console.log("Sending request to:", url);
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           prefix: formData.prefix || null,
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           mobile: formData.mobile || null,
//           email: formData.email || null,
//           passport_number: formData.passportNumber || null,
//         }),
//       });

//       console.log("Response status:", response.status);
//       const data = await response.json();
//       console.log("Response data:", data);

//       if (response.ok) {
//         console.log("Traveler created:", data.traveler);
//         setTravelerProfiles([...travelerProfiles, { id: travelerProfiles.length + 1, ...data.traveler }]);
//         setShowAddForm(false);
//         setFormData({
//           prefix: "",
//           firstName: "",
//           lastName: "",
//           mobile: "",
//           email: "",
//           passportNumber: "",
//         });
//         setErrors({});
//       } else {
//         console.error("Error:", data.error);
//         setErrors({ submit: data.error });
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       setErrors({ submit: "Server error" });
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "My Profile":
//         return (
//           <>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold border-b-2 border-yellow-400 pb-1 text-gray-800">
//                 My Profile
//               </h2>
//             </div>
//             <div className="flex gap-4 items-center">
//               <div className="relative w-20 h-20">
//                 <img
//                   src={profileImg}
//                   alt="Profile"
//                   className="rounded-full w-full h-full object-cover border"
//                 />
//                 <div className="absolute bottom-0 right-0 bg-yellow-400 p-1 rounded-full cursor-pointer">
//                   <Pencil size={16} className="text-white" />
//                 </div>
//               </div>
//               <div className="text-sm text-gray-700 space-y-1">
//                 <div className="font-semibold text-lg">Sales</div>
//                 <div className="flex items-center gap-2">
//                   <User className="w-4 h-4" /> User Name: <span className="font-medium">sales2024</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Mail className="w-4 h-4" /> sales@multiflytravel.com
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Phone className="w-4 h-4" /> 9022050461
//                 </div>
//               </div>
//             </div>
//             <div className="mt-2 md:mt-0">
//               <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
//                 <User className="w-4 h-4" />
//                 EDIT PROFILE
//               </button>
//             </div>
//           </>
//         );
//       case "Traveller Profile":
//         return (
//           <>
//             <TravellerProfileSearch
//               title="Traveller Profile"
//               searchCriteriaOptions={["All", "Name", "Mobile"]}
//               defaultSearchCriteria="All"
//               onSearch={(searchType) => console.log("Search:", searchType)}
//               onDelete={(selectAll) => {
//                 if (selectAll) {
//                   setSelectedProfiles(travelerProfiles.map((p) => p.id));
//                 } else if (selectedProfiles.length > 0) {
//                   const updated = travelerProfiles.filter(p => !selectedProfiles.includes(p.id));
//                   setTravelerProfiles(updated);
//                   setSelectedProfiles([]);
//                   console.log("Deleted profiles:", selectedProfiles);
//                 }
//               }}
//               selectedProfiles={selectedProfiles}
//             />

//             <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
//               <Button
//                 type="button"
//                 className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md text-sm"
//                 onClick={handleAddNewProfile}
//               >
//                 {showAddForm ? "Cancel" : "Add New Profile"}
//               </Button>
//             </div>

//             {/* Add New Profile Form */}
//             {showAddForm && (
//               <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded space-y-4 shadow">
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <select
//                     name="prefix"
//                     value={formData.prefix}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded lg:w-24 md:w-24 w-24 sm:w-1/4"
//                     required
//                   >
//                     <option value="" disabled>Prefix</option>
//                     <option value="Mr">Mr</option>
//                     <option value="Mrs">Mrs</option>
//                     <option value="Ms">Ms</option>
//                   </select>
//                   <input
//                     name="firstName"
//                     placeholder="First Name"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded w-full sm:flex-1"
//                     required
//                   />
//                   <input
//                     name="lastName"
//                     placeholder="Last Name"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded w-full sm:flex-1"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <input
//                     name="mobile"
//                     placeholder="Mobile"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded"
//                     pattern="\d{10}"
//                     maxLength="10"
//                     required
//                   />
//                   <input
//                     name="email"
//                     type="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded"
//                     required
//                   />
//                   <input
//                     name="passportNumber"
//                     placeholder="Passport Number"
//                     value={formData.passportNumber}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded"
//                     required
//                   />
//                 </div>
//                 {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
//                 <Button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm"
//                 >
//                   Submit
//                 </Button>
//               </form>
//             )}

//             {/* Display Vendor-Specific Traveler List */}
//             <div className="mt-4 space-y-2">
//               {travelerProfiles.map((profile) => (
//                 <div key={profile.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-2">
//                   <div className="flex items-center space-x-2 mb-2 sm:mb-0">
//                     <input
//                       type="checkbox"
//                       checked={selectedProfiles.includes(profile.id)}
//                       onChange={(e) => {
//                         setSelectedProfiles(
//                           e.target.checked
//                             ? [...selectedProfiles, profile.id]
//                             : selectedProfiles.filter((id) => id !== profile.id)
//                         );
//                       }}
//                       className="accent-lime-400"
//                     />
//                     <span className="text-sm">{`${profile.prefix || ''} ${profile.first_name} ${profile.last_name}`.trim()}</span>
//                   </div>
//                   <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
//                     <span className="text-sm">{profile.mobile || 'N/A'}</span>
//                     <span className="text-sm">{profile.passport_number || profile.id}</span>
//                     <button className="text-blue-500 hover:text-blue-700 text-sm">👁️</button>
//                     <button className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         );
//       default:
//         return <div className="text-center text-gray-500">Coming Soon!</div>;
//     }
//   };
  

//   return (
//     <section className="bg-gray-200 min-h-screen">
//       <Navbar />
//       <div className="p-4">
//         <div className="hidden lg:block">
//           <DashboardHeader />
//         </div>
//         <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:ml-[100px] lg:mr-[100px] lg:gap-6">
//           <Sidebardash activeTab={activeTab} setActiveTab={setActiveTab} sidebarItems={sidebarItems} className="w-full lg:w-1/5" />
//           <div className="flex-1 bg-white rounded-lg shadow p-4">{renderContent()}</div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MyProfile;

// import React, { useState, useEffect } from "react";
// import TravellerProfileSearch from "../components/TravellerProfileSearch";
// import Navbar from "../components/Navbar";
// import DashboardHeader from "../components/DashboardHeader";
// import Sidebardash from "../components/Sidebardash";
// import Button from "../components/Button";
// import { Pencil, User, Mail, Phone } from "lucide-react";
// import profileImg from "../assets/images/profile.jpg";

// const MyProfile = () => {
//   const [activeTab, setActiveTab] = useState("My Profile");
//   const [travelerProfiles, setTravelerProfiles] = useState([]);
//   const [selectedProfiles, setSelectedProfiles] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showCompanyForm, setShowCompanyForm] = useState(false);
//   const [formData, setFormData] = useState({
//     prefix: "",
//     firstName: "",
//     lastName: "",
//     mobile: "",
//     email: "",
//     travelType: "Domestic",
//     passportNumber: "",
//   });
//   const [companyFormData, setCompanyFormData] = useState({
//     companyName: "",
//     companyEmail: "",
//     companyMobile: "",
//   });
//   const [errors, setErrors] = useState({});

//   // Fetch vendor-specific travelers on mount or tab change
//   useEffect(() => {
//     const fetchTravelers = async () => {
//       const token = localStorage.getItem("auth_token") || localStorage.getItem("vendor_token");
//       if (!token) {
//         console.error("No authentication token found");
//         setErrors({ submit: "Authentication token is missing. Please log in." });
//         return;
//       }

//       try {
//         const url = "http://localhost:5000/api/user/travelers";
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         console.log("GET Response status:", response.status);
//         const data = await response.json();
//         console.log("GET Response data:", data);

//         if (response.ok) {
//           const vendorId = 14; // Replace with actual vendor_id from token or context
//           const vendorTravelers = data.travelers.filter(traveler => traveler.vendor_id === vendorId);
//           setTravelerProfiles(vendorTravelers);
//         } else {
//           console.error("Error fetching travelers:", data.error);
//           setErrors({ submit: data.error || "Failed to fetch travelers" });
//         }
//       } catch (error) {
//         console.error("Network error:", error);
//         setErrors({ submit: "Server error" });
//       }
//     };

//     if (activeTab === "Traveller Profile") {
//       fetchTravelers();
//     }
//   }, [activeTab]);

//   const sidebarItems = ["My Profile", "Traveller Profile", "Company Details"];

//   const handleAddNewProfile = () => {
//     setShowAddForm(!showAddForm);
//   };

//   const handleAddCompanyDetails = () => {
//     setShowCompanyForm(!showCompanyForm);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCompanyInputChange = (e) => {
//     const { name, value } = e.target;
//     setCompanyFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     let tempErrors = {};

//     if (!formData.firstName || !formData.lastName) {
//       tempErrors.firstName = "First name and last name are required";
//     }
//     if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
//       tempErrors.mobile = "Mobile number must be exactly 10 digits";
//     }
//     if (!formData.passportNumber) {
//       tempErrors.passportNumber = "required";
//     }
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const validateCompanyForm = () => {
//     let tempErrors = {};

//     if (!companyFormData.companyName) {
//       tempErrors.companyName = "Company name is required";
//     }
//     if (companyFormData.companyMobile && !/^\d{10}$/.test(companyFormData.companyMobile)) {
//       tempErrors.companyMobile = "Mobile number must be exactly 10 digits";
//     }
//     if (!companyFormData.companyEmail) {
//       tempErrors.companyEmail = "Company email is required";
//     } else if (!/\S+@\S+\.\S+/.test(companyFormData.companyEmail)) {
//       tempErrors.companyEmail = "Invalid email format";
//     }
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted with data:", formData);
//     if (!validateForm()) {
//       console.log("Validation failed:", errors);
//       return;
//     }

//     const token = localStorage.getItem("auth_token") || localStorage.getItem("vendor_token");
//     if (!token) {
//       console.error("No authentication token found");
//       setErrors({ submit: "Authentication token is missing. Please log in." });
//       return;
//     }

//     const url = "http://localhost:5000/api/user/travelers";

//     try {
//       console.log("Sending request to:", url);
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           prefix: formData.prefix || null,
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           mobile: formData.mobile || null,
//           email: formData.email || null,
//           passport_number: formData.passportNumber || null,
//         }),
//       });

//       console.log("Response status:", response.status);
//       const data = await response.json();
//       console.log("Response data:", data);

//       if (response.ok) {
//         console.log("Traveler created:", data.traveler);
//         setTravelerProfiles([...travelerProfiles, { id: travelerProfiles.length + 1, ...data.traveler }]);
//         setShowAddForm(false);
//         setFormData({
//           prefix: "",
//           firstName: "",
//           lastName: "",
//           mobile: "",
//           email: "",
//           passportNumber: "",
//         });
//         setErrors({});
//       } else {
//         console.error("Error:", data.error);
//         setErrors({ submit: data.error });
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       setErrors({ submit: "Server error" });
//     }
//   };

//   const handleCompanySubmit = async (e) => {
//     e.preventDefault();
//     console.log("Company form submitted with data:", companyFormData);
//     if (!validateCompanyForm()) {
//       console.log("Company form validation failed:", errors);
//       return;
//     }

//     const token = localStorage.getItem("auth_token") || localStorage.getItem("vendor_token");
//     if (!token) {
//       console.error("No authentication token found");
//       setErrors({ submit: "Authentication token is missing. Please log in." });
//       return;
//     }

//     // const url = "http://localhost:5000/api/user/company"; // Adjust endpoint as needed

//     // try {
//     //   console.log("Sending company request to:", url);
//     //   const response = await fetch(url, {
//     //     method: "POST",
//     //     headers: {
//     //       "Authorization": `Bearer ${token}`,
//     //       "Content-Type": "application/json",
//     //     },
//     //     body: JSON.stringify({
//     //       company_name: companyFormData.companyName,
//     //       company_email: companyFormData.companyEmail,
//     //       company_mobile: companyFormData.companyMobile || null,
//     //     }),
//     //   });

//     //   console.log("Company response status:", response.status);
//     //   const data = await response.json();
//     //   console.log("Company response data:", data);

//     //   if (response.ok) {
//     //     console.log("Company details saved:", data);
//     //     setShowCompanyForm(false);
//     //     setCompanyFormData({
//     //       companyName: "",
//     //       companyEmail: "",
//     //       companyMobile: "",
//     //     });
//     //     setErrors({});
//     //   } else {
//     //     console.error("Error:", data.error);
//     //     setErrors({ submit: data.error });
//     //   }
//     // } catch (error) {
//     //   console.error("Network error:", error);
//     //   setErrors({ submit: "Server error" });
//     // }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "My Profile":
//         return (
//           <>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold border-b-2 border-yellow-400 pb-1 text-gray-800">
//                 My Profile
//               </h2>
//             </div>
//             <div className="flex gap-4 items-center">
//               <div className="relative w-20 h-20">
//                 <img
//                   src={profileImg}
//                   alt="Profile"
//                   className="rounded-full w-full h-full object-cover border"
//                 />
//                 <div className="absolute bottom-0 right-0 bg-yellow-400 p-1 rounded-full cursor-pointer">
//                   <Pencil size={16} className="text-white" />
//                 </div>
//               </div>
//               <div className="text-sm text-gray-700 space-y-1">
//                 <div className="font-semibold text-lg">Sales</div>
//                 <div className="flex items-center gap-2">
//                   <User className="w-4 h-4" /> User Name: <span className="font-medium">sales2024</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Mail className="w-4 h-4" /> sales@multiflytravel.com
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Phone className="w-4 h-4" /> 9022050461
//                 </div>
//               </div>
//             </div>
//             <div className="mt-2 md:mt-0">
//               <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
//                 <User className="w-4 h-4" />
//                 EDIT PROFILE
//               </button>
//             </div>
//           </>
//         );
//       case "Traveller Profile":
//         return (
//           <>
//            <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold border-b-2 border-yellow-400 pb-1 text-gray-800">
//                 Traveller Profile
//               </h2>
//             </div>
//             <TravellerProfileSearch
//               searchCriteriaOptions={["All", "Name", "Mobile"]}
//               defaultSearchCriteria="All"
//               onSearch={(searchType) => console.log("Search:", searchType)}
//               onDelete={(selectAll) => {
//                 if (selectAll) {
//                   setSelectedProfiles(travelerProfiles.map((p) => p.id));
//                 } else if (selectedProfiles.length > 0) {
//                   const updated = travelerProfiles.filter(p => !selectedProfiles.includes(p.id));
//                   setTravelerProfiles(updated);
//                   setSelectedProfiles([]);
//                   console.log("Deleted profiles:", selectedProfiles);
//                 }
//               }}
//               selectedProfiles={selectedProfiles}
//             />

//             <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
//               <Button
//                 type="button"
//                 className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md text-sm"
//                 onClick={handleAddNewProfile}
//               >
//                 {showAddForm ? "Cancel" : "Add New Profile"}
//               </Button>
//             </div>

//             {showAddForm && (
//               <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded space-y-4 shadow">
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <select
//                     name="prefix"
//                     value={formData.prefix}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded lg:w-24 md:w-24 w-24 sm:w-1/4"
//                     required
//                   >
//                     <option value="" disabled>Prefix</option>
//                     <option value="Mr">Mr</option>
//                     <option value="Mrs">Mrs</option>
//                     <option value="Ms">Ms</option>
//                   </select>
//                   <input
//                     name="firstName"
//                     placeholder="First Name"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded w-full sm:flex-1"
//                     required
//                   />
//                   <input
//                     name="lastName"
//                     placeholder="Last Name"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded w-full sm:flex-1"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <input
//                     name="mobile"
//                     placeholder="Mobile"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded"
//                     pattern="\d{10}"
//                     maxLength="10"
//                     required
//                   />
//                   <input
//                     name="email"
//                     type="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded"
//                     required
//                   />
//                   <input
//                     name="passportNumber"
//                     placeholder="Passport Number"
//                     value={formData.passportNumber}
//                     onChange={handleInputChange}
//                     className="border p-2 rounded"
//                     required
//                   />
//                 </div>
//                 {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
//                 <Button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm"
//                 >
//                   Submit
//                 </Button>
//               </form>
//             )}

//             <div className="mt-4 space-y-2">
//               {travelerProfiles.map((profile) => (
//                 <div key={profile.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-2">
//                   <div className="flex items-center space-x-2 mb-2 sm:mb-0">
//                     <input
//                       type="checkbox"
//                       checked={selectedProfiles.includes(profile.id)}
//                       onChange={(e) => {
//                         setSelectedProfiles(
//                           e.target.checked
//                             ? [...selectedProfiles, profile.id]
//                             : selectedProfiles.filter((id) => id !== profile.id)
//                         );
//                       }}
//                       className="accent-lime-400"
//                     />
//                     <span className="text-sm">{`${profile.prefix || ''} ${profile.first_name} ${profile.last_name}`.trim()}</span>
//                   </div>
//                   <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
//                     <span className="text-sm">{profile.mobile || 'N/A'}</span>
//                     <span className="text-sm">{profile.passport_number || profile.id}</span>
//                     <button className="text-blue-500 hover:text-blue-700 text-sm">👁️</button>
//                     <button className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         );
//       case "Company Details":
//         return (
//           <>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold border-b-2 border-yellow-400 pb-1 text-gray-800">
//                 Company Details
//               </h2>
//             </div>
//             <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
//               <Button
//                 type="button"
//                 className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md text-sm"
//                 onClick={handleAddCompanyDetails}
//               >
//                 {showCompanyForm ? "Cancel" : "Add Company Details"}
//               </Button>
//             </div>
//             {showCompanyForm && (
//               <form onSubmit={handleCompanySubmit} className="mt-4 bg-gray-100 p-4 rounded space-y-4 shadow">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <input
//                       name="companyName"
//                       placeholder="Company Name"
//                       value={companyFormData.companyName}
//                       onChange={handleCompanyInputChange}
//                       className="border p-2 rounded w-full"
//                       required
//                     />
//                     {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
//                   </div>
//                   <div>
//                     <input
//                       name="companyEmail"
//                       type="email"
//                       placeholder="Company Email"
//                       value={companyFormData.companyEmail}
//                       onChange={handleCompanyInputChange}
//                       className="border p-2 rounded w-full"
//                       required
//                     />
//                     {errors.companyEmail && <p className="text-red-500 text-sm">{errors.companyEmail}</p>}
//                   </div>
//                   <div>
//                     <input
//                       name="companyMobile"
//                       placeholder="Company Mobile"
//                       value={companyFormData.companyMobile}
//                       onChange={handleCompanyInputChange}
//                       className="border p-2 rounded w-full"
//                       pattern="\d{10}"
//                       maxLength="10"
//                     />
//                     {errors.companyMobile && <p className="text-red-500 text-sm">{errors.companyMobile}</p>}
//                   </div>
//                 </div>
//                 {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
//                 <Button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm"
//                 >
//                   Submit
//                 </Button>
//               </form>
//             )}
//           </>
//         );
//       default:
//         return <div className="text-center text-gray-500">Coming Soon!</div>;
//     }
//   };

//   return (
//     <section className="bg-gray-200 min-h-screen">
//       <Navbar />
//       <div className="p-4">
//         <div className="hidden lg:block">
//           <DashboardHeader />
//         </div>
//         <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:ml-[100px] lg:mr-[100px] lg:gap-6">
//           <Sidebardash activeTab={activeTab} setActiveTab={setActiveTab} sidebarItems={sidebarItems} className="w-full lg:w-1/5" />
//           <div className="flex-1 bg-white rounded-lg shadow p-4">{renderContent()}</div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MyProfile;