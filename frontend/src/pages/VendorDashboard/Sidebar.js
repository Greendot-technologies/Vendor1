


// import React, { useEffect, useState } from "react";
// import { Menu, X, Home, Users, Settings, Store, Package, Grid, ChevronDown, ChevronRight } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import { MapPin } from "lucide-react";


// export const Sidebar = ({ isSidebarOpen = true, setIsSidebarOpen = () => {} }) => {
//   const location = useLocation();
//   const [isShopManagementOpen, setIsShopManagementOpen] = useState(false);

//   const menuItems = [
//     { icon: <Home size={20} />, label: "Dashboard", path: "/VendorDashboard" },
// { icon: <MapPin size={20} />, label: "Location", path: "/LocationService" },

//     // { icon: <Users size={20} />, label: "UserManagement", path: "/UserManagement" },
//     // { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
//   ];

//   const shopManagementItems = [
//     {  label: "SubCategory", path: "/SubCategory" },
//     { label: "Product Management", path: "/ProductManagement" },
//   ];

//   // Check if any shop management item is active
//   const isShopManagementActive = shopManagementItems.some(item => location.pathname === item.path);

//   useEffect(() => {
//     if (window.innerWidth < 768 && typeof setIsSidebarOpen === "function") {
//       setIsSidebarOpen(false);
//     }
//   }, [location.pathname, setIsSidebarOpen]);

//   // Auto-open shop management if any sub-item is active
//   useEffect(() => {
//     if (isShopManagementActive) {
//       setIsShopManagementOpen(true);
//     }
//   }, [isShopManagementActive]);

//   const toggleShopManagement = () => {
//     setIsShopManagementOpen(!isShopManagementOpen);
//   };

//   return (
//     <>
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}
//       {/* <aside
//         className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out 
//         ${isSidebarOpen ? "w-64" : "w-20"} overflow-y-auto`}
//       >
//         <div className="flex items-center justify-between px-4 py-10 border-b bg-opacity-20 ">   
//           {isSidebarOpen && (
//             <h2 className="text-xl font-bold text-indigo-600">Dashboard</h2>
//           )}
//           <button
//             className="md:hidden text-indigo-600"
//             onClick={() => setIsSidebarOpen((prev) => !prev)}
//           >
//             {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div> */}
//         <aside
//   className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out 
//   ${isSidebarOpen ? "w-64" : "w-20"} overflow-y-auto`}
// >
//   <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">   
//     {isSidebarOpen && (
//       <h2 className="text-xl font-bold text-indigo-600">Dashboard</h2>
//     )}
//     <button
//       className="md:hidden text-indigo-600"
//       onClick={() => setIsSidebarOpen((prev) => !prev)}
//     >
//       {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
//     </button>
//   </div>

//         <nav className="p-4 space-y-2">
//           {/* Regular Menu Items */}
//           {menuItems.map(({ icon, label, path }) => {
//             const isActive = location.pathname === path;
//             return (
//               <Link to={path} key={label}>
//                 <div
//                   className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
//                   ${
//                     isActive
//                       ? "bg-indigo-100 text-indigo-700"
//                       : "text-black-600 hover:bg-indigo-50 hover:text-indigo-600"
//                   }`}
//                 >
//                   <div className="p-1 bg-white rounded-full shadow-sm">{icon}</div>
//                   {isSidebarOpen && <span>{label}</span>}
//                 </div>
//               </Link>
//             );
//           })}

//           {/* Shop Management with Dropdown */}
//           <div>
//             <div
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer
//               ${
//                 isShopManagementActive
//                   ? "bg-indigo-100 text-indigo-700"
//                   : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
//               }`}
//               onClick={toggleShopManagement}
//             >
//               <div className="p-1 bg-white rounded-full shadow-sm">
//                 <Store size={20} />
//               </div>
//               {isSidebarOpen && (
//                 <>
//                   <span className="flex-1">Shop Management</span>
//                   {isShopManagementOpen ? (
//                     <ChevronDown size={16} />
//                   ) : (
//                     <ChevronRight size={16} />
//                   )}
//                 </>
//               )}
//             </div>

//             {/* Sub-menu items */}
//             {isSidebarOpen && isShopManagementOpen && (
//               <div className="ml-4 mt-2 space-y-1">
//                 {shopManagementItems.map(({ icon, label, path }) => {
//                   const isActive = location.pathname === path;
//                   return (
//                     <Link to={path} key={label}>
//                       <div
//                         className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
//                         ${
//                           isActive
//                             ? "bg-indigo-100 text-indigo-700"
//                             : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
//                         }`}
//                       >
//                         <div className="p-1 bg-white rounded-full shadow-sm">{icon}</div>
//                         <span>{label}</span>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </nav>
//       </aside>
//     </>
//   );
// };


import React, { useEffect, useState } from "react";
import { Menu, X, Home, MapPin, Store, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = ({ isSidebarOpen = true, setIsSidebarOpen = () => {} }) => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShopManagementOpen, setIsShopManagementOpen] = useState(false);

  const menuItems = [
    { icon: <Home size={24} />, label: "Dashboard", path: "/VendorDashboard" },
  ];

  const shopManagementItems = [
    { label: "SubCategory", path: "/SubCategory" },
    { label: "Product Management", path: "/ProductManagement" },
  ];

  const locationItem = { icon: <MapPin size={24} />, label: "Location", path: "/LocationService" };

  const isShopManagementActive = shopManagementItems.some(item => location.pathname === item.path);

  useEffect(() => {
    if (window.innerWidth < 768 && typeof setIsSidebarOpen === "function") {
      setIsSidebarOpen(false);
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
  }, [setIsSidebarOpen]);

  useEffect(() => {
    if (isShopManagementActive) setIsShopManagementOpen(true);
  }, [isShopManagementActive]);

  const toggleShopManagement = () => setIsShopManagementOpen(!isShopManagementOpen);
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full transition-all duration-300 shadow-lg z-50 ${
          isSidebarOpen ? "w-64" : "w-16"
        } ${
          isDarkMode
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-800"
        } overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-4 pb-8 border-b border-gray-200">   
          {isSidebarOpen && <h2 className="text-xl font-bold text-indigo-800">Dashboard</h2>}
          <button
            className="md:hidden text-indigo-600"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="mt-6 px-2 space-y-1">
          {menuItems.map(({ icon, label, path }) => (
            <Link to={path} key={label}>
              <div
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(path)
                    ? isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-blue-100 text-blue-900"
                    : isDarkMode
                    ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                    : "hover:bg-gray-200 text-gray-700 hover:text-blue-800"
                }`}
              >
                <div className={isSidebarOpen ? "mr-3" : "mx-auto"}>{icon}</div>
                {isSidebarOpen && <span>{label}</span>}
              </div>
            </Link>
          ))}

          {/* Shop Management */}
          <div className="block">
            <div
              className={`flex items-center px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors duration-200 ${
                isShopManagementActive
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-blue-100 text-blue-900"
                  : isDarkMode
                  ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                  : "hover:bg-gray-200 text-gray-700 hover:text-blue-800"
              }`}
              onClick={toggleShopManagement}
            >
              <Store size={24} className={isSidebarOpen ? "mr-3" : "mx-auto"} />
              {isSidebarOpen && (
                <>
                  <span className="flex-1">Shop Management</span>
                  {isShopManagementOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </>
              )}
            </div>

            {isSidebarOpen && isShopManagementOpen && (
              <div className="ml-8 mt-2 space-y-1">
                {shopManagementItems.map(({ label, path }) => (
                  <Link to={path} key={label}>
                    <div
                      className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        isActive(path)
                          ? isDarkMode
                            ? "bg-gray-700 text-white"
                            : "bg-blue-100 text-blue-900"
                          : isDarkMode
                          ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                          : "hover:bg-gray-200 text-gray-700 hover:text-blue-800"
                      }`}
                    >
                      <span>{label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Location Menu below Shop Management */}
          <Link to={locationItem.path} key={locationItem.label}>
            <div
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive(locationItem.path)
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-blue-100 text-blue-900"
                  : isDarkMode
                  ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                  : "hover:bg-gray-200 text-gray-700 hover:text-blue-800"
              }`}
            >
              <div className={isSidebarOpen ? "mr-3" : "mx-auto"}>{locationItem.icon}</div>
              {isSidebarOpen && <span>{locationItem.label}</span>}
            </div>
          </Link>
        </nav>

        <div className="absolute bottom-4 w-full px-3">
          <div
            className={`flex items-center px-3 py-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span className="text-xs font-semibold">RD</span>
            {isSidebarOpen && (
              <>
                <span className="ml-3 text-sm">Rutuja Dalal</span>
                
                <span className="ml-auto text-xs text-gray-500">rutujad@gmail.com</span>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
