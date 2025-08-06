// // src/context/AuthContext.js
// import React, { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [authData, setAuthData] = useState(null); // Store user data or token

//   const login = (userData) => {
//     setAuthData(userData);
//     localStorage.setItem("auth_token", userData.token); // Store token in localStorage
//   };

//   const logout = () => {
//     setAuthData(null);
//     localStorage.removeItem("auth_token");
//   };

//   return (
//     <AuthContext.Provider value={{ authData, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null);

  // Check for existing token on app startup
  useEffect(() => {
    const token = localStorage.getItem("vendor_token"); // Use the correct key
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        // Check if token is expired
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          console.log("Token expired, clearing storage");
          logout();
          return;
        }

        // Restore user data from token or localStorage
        const storedUser = localStorage.getItem("user");
        let userData = {
          token,
          name: decoded.name || decoded.email?.split("@")[0] || "User",
          email: decoded.email,
          role: decoded.role
        };

        // If we have stored user data, use that instead
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            userData = {
              token,
              ...parsedUser
            };
          } catch (error) {
            console.error("Error parsing stored user data:", error);
          }
        }

        setAuthData(userData);
      } catch (error) {
        console.error("Error decoding token:", error);
        logout(); // Clear invalid token
      }
    }
  }, []);

  const login = (userData) => {
    console.log("AuthContext login:", userData);
    setAuthData(userData);
    
    // Store token with the correct key that your app uses
    localStorage.setItem("vendor_token", userData.token);
    
    // Store user data for persistence
    const userToStore = {
      name: userData.name,
      email: userData.email,
      role: userData.role
    };
    localStorage.setItem("user", JSON.stringify(userToStore));
  };

  const logout = () => {
    console.log("AuthContext logout");
    setAuthData(null);
    
    // Clear all the keys your app uses
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token"); // Remove this too in case it exists
    sessionStorage.clear();
  };

  const value = {
    authData,
    login,
    logout,
    isAuthenticated: !!authData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};