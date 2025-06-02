

import React from "react";
import SearchCard from "../components/SearchCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = ({ onLoginSuccess, adminData, onLogout, setAdminData }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-500 to-green-800)">
      {/* Navbar */}
      <Navbar
        onGetStarted={() => navigate("/admin-signup")}
       
      />

      {/* Centered Content */}
      <div className="flex flex-1 items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-whit-500 mb-4">
            Welcome to AgriVedh Portal
          </h1>
          <p className="text-lg text-gray-600">
            Manage your  sales, and profile – all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
