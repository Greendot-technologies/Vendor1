// import ItinerarySearchComponent from "../components/ItinerarySearchComponent";
// import Navbar from "../components/Navbar";
// import DashboardHeader from "../components/DashboardHeader";
// import Sidebardash from "../components/Sidebardash";
// import { useState } from "react";

// const Sales = () => {
//   const [activeTab, setActiveTab] = useState("Sales Report");

//   const sidebarItems = [
//     "Sales Report",
//     "Sales Statement",
//     "Invoice Download",
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Sales Report":
//         return (
//           <ItinerarySearchComponent
//             title="Sales Report"
//             searchCriteriaOptions={["2024-25", "2025-26"]}
//             defaultSearchCriteria="2025-26"
//             mandatoryFields={["Service", "Report", "Financial Year", "From Date", "To Date"]}
//           />
//         );
//       case "Sales Statement":
//         return (
//           <ItinerarySearchComponent
//             title="Sales Statement"
//             searchCriteriaOptions={["2024-25", "2025-26"]}
//             defaultSearchCriteria="2025-26"
//             mandatoryFields={["Service", "Financial Year", "From Date", "To Date"]}
//             isAccountPage={true}
//             activeTab={activeTab}
//           />
//         );
//       case "Invoice Download":
//         return (
//           <ItinerarySearchComponent
//             title="Invoice Download"
//             searchCriteriaOptions={["2024-25", "2025-26"]}
//             defaultSearchCriteria="2025-26"
//             mandatoryFields={["Financial Year", "From Date", "To Date"]}
//             isAccountPage={true}
//             activeTab={activeTab}
//           />
//         );
//       default:
//         return <div className="text-center text-gray-500">Coming Soon!</div>;
//     }
//   };

//   return (
//     <section className="bg-gray-200 min-h-screen">
//       {/* Top Navbar */}
//       <Navbar />

//       {/* Page Content */}
//       <div className="p-4">
//         {/* Show DashboardHeader only on large devices */}
//         <div className="hidden lg:block">
//           <DashboardHeader />
//         </div>

//         {/* Layout Wrapper */}
//         <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:ml-[100px] lg:mr-[100px] lg:gap-6">
//           {/* Sidebar (top on mobile, left on large screens) */}
//           <Sidebardash activeTab={activeTab} setActiveTab={setActiveTab} sidebarItems={sidebarItems} />

//           {/* Main Section */}
//           <div className="flex-1 bg-white rounded-lg shadow p-4">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Sales;