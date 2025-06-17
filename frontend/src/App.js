


import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import { logoutVendor } from "./services/apiService";
// import FlightBooking from "./components/FlightBooking";
// import FlightResult from "./pages/FligthResults";
import { AuthProvider } from "./context/AuthContext";
// import Dashboard from "./pages/Dashboard";
// import MyBookings from "./pages/MyBookings";
// import Accounts from "./pages/Accounts";
// import Sales from "./pages/Sales";
// import Profile from "./pages/Profile";
// import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";
import VendorDashboard from "./pages/VendorDashboard/VendorDashboard";
import ProductManagement from "./pages/VendorDashboard/ProductManagement";
import SubCategory from "./pages/VendorDashboard/SubCategory";
import ShopManagement from './pages/VendorDashboard/ShopManagement';

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
