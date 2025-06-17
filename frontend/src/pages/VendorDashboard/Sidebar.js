


import React, { useEffect, useState } from "react";
import { Menu, X, Home, Users, Settings, Store, Package, Grid, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = ({ isSidebarOpen = true, setIsSidebarOpen = () => {} }) => {
  const location = useLocation();
  const [isShopManagementOpen, setIsShopManagementOpen] = useState(false);

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/VendorDashboard" },
    // { icon: <Users size={20} />, label: "UserManagement", path: "/UserManagement" },
    // { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  const shopManagementItems = [
    { icon: <Grid size={20} />, label: "SubCategory", path: "/SubCategory" },
    { icon: <Package size={20} />, label: "Product Management", path: "/ProductManagement" },
  ];

  // Check if any shop management item is active
  const isShopManagementActive = shopManagementItems.some(item => location.pathname === item.path);

  useEffect(() => {
    if (window.innerWidth < 768 && typeof setIsSidebarOpen === "function") {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, setIsSidebarOpen]);

  // Auto-open shop management if any sub-item is active
  useEffect(() => {
    if (isShopManagementActive) {
      setIsShopManagementOpen(true);
    }
  }, [isShopManagementActive]);

  const toggleShopManagement = () => {
    setIsShopManagementOpen(!isShopManagementOpen);
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out 
        ${isSidebarOpen ? "w-64" : "w-20"} overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {isSidebarOpen && (
            <h2 className="text-xl font-bold text-indigo-600">Dashboard</h2>
          )}
          <button
            className="md:hidden text-indigo-600"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {/* Regular Menu Items */}
          {menuItems.map(({ icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link to={path} key={label}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  <div className="p-1 bg-white rounded-full shadow-sm">{icon}</div>
                  {isSidebarOpen && <span>{label}</span>}
                </div>
              </Link>
            );
          })}

          {/* Shop Management with Dropdown */}
          <div>
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer
              ${
                isShopManagementActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
              onClick={toggleShopManagement}
            >
              <div className="p-1 bg-white rounded-full shadow-sm">
                <Store size={20} />
              </div>
              {isSidebarOpen && (
                <>
                  <span className="flex-1">Shop Management</span>
                  {isShopManagementOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </>
              )}
            </div>

            {/* Sub-menu items */}
            {isSidebarOpen && isShopManagementOpen && (
              <div className="ml-4 mt-2 space-y-1">
                {shopManagementItems.map(({ icon, label, path }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link to={path} key={label}>
                      <div
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
                        ${
                          isActive
                            ? "bg-indigo-100 text-indigo-700"
                            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                        }`}
                      >
                        <div className="p-1 bg-white rounded-full shadow-sm">{icon}</div>
                        <span>{label}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};