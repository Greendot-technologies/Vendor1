


import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import { logoutVendor } from "./services/apiService";

import { AuthProvider } from "./context/AuthContext";

import VendorDashboard from "./pages/VendorDashboard/VendorDashboard";
import ProductManagement from "./pages/VendorDashboard/ProductManagement";
import SubCategory from "./pages/VendorDashboard/SubCategory";
import ShopManagement from './pages/VendorDashboard/ShopManagement';
import LocationService from "./pages/VendorDashboard/LocationService";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [vendorData, setVendorData] = useState(null);

  const handleLoginSuccess = (vendor) => {
    console.log("Login success - Vendor data:", vendor);
    setIsAuthenticated(true);
    setVendorData(vendor);
  };

  const handleLogout = async () => {
    try {
      await logoutVendor();
      setIsAuthenticated(false);
      setVendorData(null);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onLoginSuccess={handleLoginSuccess}
                vendorData={vendorData}
                onLogout={handleLogout}
                setVendorData={setVendorData}
              />
            }
          />
       
          <Route path="/VendorDashboard" element={<VendorDashboard />} />
          <Route path="/LocationService" element={<LocationService />} />
          
          {/* Vendor Dashboard Routes */}
          <Route path="/SubCategory" element={<SubCategory/>} />
          <Route path="/ProductManagement" element={<ProductManagement />} />
          <Route path="/ShopManagement" element={<ShopManagement />} />
          
          
          {/* Optional fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
