


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiMenu } from "react-icons/fi";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
// import profilePlaceholder from "../../Assets/Images/profile.jpg";
import baseURL from "../../services/productApi"; // Adjust the import path as needed

// Base URL aligned with backend
// const BASE_URL = "http://localhost:5000/api";

// Token management
const getToken = () => localStorage.getItem("vendor_token");
const removeToken = () => {
  localStorage.removeItem("vendor_token");
  localStorage.removeItem("user");
  sessionStorage.clear();
};

// Response handler
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Network error" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json().catch(() => ({}));
};

// Correct logout API call
const logoutVendor = async () => {
  console.log("Sending logout request to:", `${baseURL}/user/logout`);
  const response = await fetch(`${baseURL}/user/logout`, {
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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const safeJSONParse = (value) => {
    try {
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.error("Failed to parse JSON from localStorage:", err);
      return null;
    }
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      console.error("Token decode error:", err);
      return true;
    }
  };

  const handleSessionExpired = () => {
    Swal.fire({
      icon: "error",
      title: "Session Expired",
      text: "Your session has expired. Please log in again.",
      showConfirmButton: false,
      timer: 2000,
    });

    removeToken();
    caches.keys().then((names) => names.forEach((name) => caches.delete(name)));

    setUser(null);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const storedUser = safeJSONParse(localStorage.getItem("user"));
    const token = getToken();

    if (token && isTokenExpired(token)) {
      handleSessionExpired();
    } else if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = async () => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      handleSessionExpired();
      return;
    }

    try {
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

      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Logging out...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      await logoutVendor();

      removeToken();
      caches.keys().then((names) => names.forEach((name) => caches.delete(name)));
      setUser(null);
      setIsUserDropdownOpen(false);

      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        text: "You have been successfully logged out.",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => navigate("/", { replace: true }), 1500);
    } catch (error) {
      console.error("Logout error:", error);

      if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        handleSessionExpired();
      } else if (error.message.includes("Network") || error.message.includes("fetch")) {
        Swal.fire({
          icon: "warning",
          title: "Network Error",
          text: "Could not connect to server, but you have been logged out locally.",
          confirmButtonText: "OK",
        });
        removeToken();
        setUser(null);
        setIsUserDropdownOpen(false);
        navigate("/", { replace: true });
      } else {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: `An error occurred: ${error.message}`,
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  return (
    <header className="bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-sm h-20 px-6 sticky top-0 z-50 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 hover:text-gray-800">
          <FiMenu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Vendor</h2>
      </div>

      <div className="flex items-center space-x-6">
        {/* User Dropdown */}
        <div className="relative">
          <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center gap-3">
            {/* <img src={user?.photo || profilePlaceholder} alt="User" className="h-8 w-8 rounded-full object-cover" /> */}
            <span className="text-gray-700 hidden md:inline">{user?.name || "Vendor"}</span>
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
