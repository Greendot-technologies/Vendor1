

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiMenu } from "react-icons/fi";
import { FaPlane, FaCar, FaHotel } from "react-icons/fa";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
// import profilePlaceholder from "../../Assets/Images/profile.jpg";

// API Base URL
const API_BASE_URL = "https://vendor1.onrender.com"; // Change to your backend URL
const BASE_URL = "https://vendor1.onrender.com"; // Add BASE_URL for the new logout function

// Token management functions
const getToken = () => {
  return localStorage.getItem("token");
};

const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.clear();
};

// Response handler function
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Network error" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json().catch(() => ({}));
};

// New logout function
export const logoutVendor = async () => {
  console.log("Sending logout request to:", `${BASE_URL}/user/logout`);
  const response = await fetch(`${BASE_URL}/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
  });
  removeToken();
  return handleResponse(response);
};

export const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isTravelDropdownOpen, setIsTravelDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Helper to safely parse JSON
  const safeJSONParse = (value) => {
    try {
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.error("Failed to parse JSON from localStorage:", err);
      return null;
    }
  };

  // Token expiration checker
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (err) {
      console.error("Token decode error:", err);
      return true;
    }
  };

  // Session expired handler
  const handleSessionExpired = () => {
    Swal.fire({
      icon: "error",
      title: "Session Expired",
      text: "Your session has expired. Please log in again.",
      showConfirmButton: false,
      timer: 2000,
    });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    caches.keys().then((names) => names.forEach((name) => caches.delete(name)));

    setUser(null);
    navigate("/", { replace: true });
  };

  // Load user data on mount
  useEffect(() => {
    const storedUser = safeJSONParse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      handleSessionExpired();
    } else if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Comprehensive logout function for navbar
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    // Check if token exists and is not expired
    if (!token || isTokenExpired(token)) {
      handleSessionExpired();
      return;
    }

    try {
      // Show confirmation dialog before logout
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout",
        cancelButtonText: "Cancel"
      });

      if (!result.isConfirmed) {
        return; // User cancelled logout
      }

      // Show loading state
      Swal.fire({
        title: "Logging out...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Use the logoutVendor function for API call
      await logoutVendor();
      
      // Clear all user data and caches
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.clear();
      
      // Clear browser caches
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }

      // Clear component state
      setUser(null);
      setIsUserDropdownOpen(false);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        text: "You have been successfully logged out.",
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigate to home/login page
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
      
    } catch (error) {
      console.error("Logout error:", error);
      
      // Handle different types of errors
      if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        handleSessionExpired();
      } else if (error.message.includes("Network") || error.message.includes("fetch")) {
        // Network error - still clear local data but show warning
        Swal.fire({
          icon: "warning",
          title: "Network Error",
          text: "Could not connect to server, but you have been logged out locally.",
          confirmButtonText: "OK",
        });
        
        // Clear local data even if server request failed
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        sessionStorage.clear();
        setUser(null);
        setIsUserDropdownOpen(false);
        navigate("/", { replace: true });
      } else {
        // Other errors
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: `An error occurred: ${error.message}`,
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  const travelOptions = [
    { icon: <FaPlane />, label: "Flights" },
    { icon: <FaCar />, label: "Cab Bookings" },
    { icon: <FaHotel />, label: "Hotel Reservations" },
  ];

  return (
    <header className="bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-sm h-20 px-6 sticky top-0 z-50 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 hover:text-gray-800">
          <FiMenu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800"> Company</h2>
      </div>

      <div className="flex items-center space-x-6">
        {/* Travel Dropdown */}
        {/* <div className="relative">
          <button
            onClick={() => setIsTravelDropdownOpen(!isTravelDropdownOpen)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <span className="hidden md:inline">Travel</span>
            <FiChevronDown />
          </button>
          {isTravelDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              {travelOptions.map((option, index) => (
                <div key={index} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <span className="mr-2">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div> */}

        {/* User Dropdown */}
        <div className="relative">
          <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center gap-3">
            {/* <img
              src={user?.photo || profilePlaceholder}
              alt="User"
              className="h-8 w-8 rounded-full object-cover"
            /> */}
            <span className="text-gray-700 hidden md:inline">{user?.name || "Admin"}</span>
            <FiChevronDown className="text-gray-600" />
          </button>

          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Settings</div>
              <div
                className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setIsUserDropdownOpen(false);
                }}
              >
                <FiLogOut className="mr-2" /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};