// import React, { useState, useEffect } from "react";

// import { Menu, X, LayoutDashboard, Book, User, DollarSign, Settings, LogOut } from "lucide-react";

// import logo from "../assets/images/logo.png";

// import Button from "./Button";

// import { Link, useNavigate } from "react-router-dom";

// import Input from "./Input";

// import { vendorLogin, verifyOtp, logoutVendor } from "../services/apiService";

// import { useAuth } from "../context/AuthContext";

// import {jwtDecode} from "jwt-decode"; // Correct import for ES6 modules

// export default function Navbar({ onLoginSuccess }) {

//   const { authData, login, logout } = useAuth();

//   const [isOpen, setIsOpen] = useState(false);

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   const [newPassword, setNewPassword] = useState("");

//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [error, setError] = useState("");

//   const [showOtpModal, setShowOtpModal] = useState(false);

//   const [otp, setOtp] = useState("");

//   const [otpError, setOtpError] = useState("");

//   const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false);

//   const [passwordChangeRequired, setPasswordChangeRequired] = useState(false);

//   const [otpSent, setOtpSent] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {

//     const token = localStorage.getItem("vendor_token");

//     if (token && !authData) {

//       try {

//         const decoded = jwtDecode(token);

//         const userName = decoded.name || decoded.email.split("@")[0];

//         login({ token, name: userName, email: decoded.email });

//       } catch (e) {

//         console.error("Failed to decode token:", e);

//         localStorage.removeItem("vendor_token");

//       }

//     }

//   }, [authData, login]);

//   const handleSignIn = async () => {

//     try {

//       setError("");

//       const response = await vendorLogin(email, password);

//       console.log("Login Response:", response);

//       if (response.status === "otp_sent") {

//         setShowOtpModal(true);

//         setOtpSent(true);

        

//         // Check if password change is required (first-time login)

//         if (response.password_changed === false || response.message?.includes("first time") || response.message?.includes("set your password")) {

//           setIsFirstTimeLogin(true);

//           setPasswordChangeRequired(true);

//         } else {

//           setIsFirstTimeLogin(false);

//           setPasswordChangeRequired(false);

//         }

//       } else if (response.status === "success" && response.token) {

//         // Direct login without OTP (if OTP is disabled)

//         const token = response.token;

//         const decoded = jwtDecode(token);

//         const userName = decoded.name || email.split("@")[0];

//         login({ token, name: userName, email: decoded.email });

        

//         if (onLoginSuccess) onLoginSuccess({ token, role });

        

//         // Role-based navigation

//         const role = response.role || decoded.role;

//         if (role === "vendor") {

//           navigate("/Dashboard");

//         } else if (role === "company") {

//           navigate("/CompanyDashboard ");

//         } else {

//           navigate("/Dashboard");

//         }

//       } else {

//         throw new Error(response.message || "Unexpected response from login");

//       }

//     } catch (err) {

//       console.error("Login failed:", err.message, err.stack);

//       setError(err.message || "Login failed. Please try again.");

//     }

//   };

//   const handleVerifyOtp = async () => {

//     try {

//       setOtpError("");

      

//       // Validate OTP

//       if (!otp || otp.length !== 6) {

//         setOtpError("Please enter a valid 6-digit OTP.");

//         return;

//       }

      

//       // Validate new password if required

//       if (passwordChangeRequired) {

//         if (!newPassword) {

//           setOtpError("Please provide a new password.");

//           return;

//         }

        

//         if (newPassword.length < 8) {

//           setOtpError("Password must be at least 8 characters long.");

//           return;

//         }

        

//         if (newPassword !== confirmPassword) {

//           setOtpError("Passwords do not match.");

//           return;

//         }

//       }

      

//       const data = await verifyOtp(email, otp, passwordChangeRequired ? newPassword : null);

//       console.log("OTP Verification Response:", data);

      

//       if (data.status === "success" || data.status === "password_changed" || data.status === "logged_in") {

//         const token = data.session_id || data.token;

        

//         if (!token) {

//           throw new Error("No authentication token received");

//         }

        

//         const decoded = jwtDecode(token);

//         const userName = decoded.name || email.split("@")[0];

        

//         // Store token and login user

//         localStorage.setItem("vendor_token", token);

//         login({ token, name: userName, email: decoded.email || email });

        

//         // Close modal and reset form

//         setShowOtpModal(false);

//         setOtp("");

//         setNewPassword("");

//         setConfirmPassword("");

//         setPasswordChangeRequired(false);

//         setIsFirstTimeLogin(false);

//         setOtpSent(false);

        

//         if (onLoginSuccess) onLoginSuccess();

        

//         // Role-based navigation

//         const role = data.role || decoded.role;

        

//         if (data.status === "logged_in" || data.status === "success") {

//           if (role === "vendor") {

//             navigate("/Dashboard");

//           } else if (role === "company") {

//             navigate("/CompanyDashboard", { replace: true });

//           } else {

//             navigate("/Dashboard");

//           }

//         } else if (data.status === "password_changed") {

//           // After password change, redirect to appropriate dashboard

//           if (role === "vendor") {

//             navigate("/Dashboard");

//           } else if (role === "company") {

//             navigate("/CompanyDashboard", { replace: true });

//           } else {

//             navigate("/Dashboard");

//           }

//         }

//       } else {

//         throw new Error(data.error || data.message || "OTP verification failed");

//       }

//     } catch (err) {

//       console.error("OTP verification failed:", err.message, err.stack);

//       setOtpError(err.message || "Failed to verify OTP. Please try again.");

//     }

//   };

//   const closeOtpModal = () => {

//     setShowOtpModal(false);

//     setOtp("");

//     setNewPassword("");

//     setConfirmPassword("");

//     setOtpError("");

//     setIsFirstTimeLogin(false);

//     setPasswordChangeRequired(false);

//     setOtpSent(false);

//   };

//   const handleLogout = async () => {

//     try {

//       const response = await logoutVendor();

//       if (response.status === "success") {

//         localStorage.removeItem("vendor_token");

//         logout();

//         setIsDropdownOpen(false);

//         setIsOpen(false);

//         navigate("/");

//       } else {

//         throw new Error("Logout failed");

//       }

//     } catch (err) {

//       console.error("Logout failed:", err.message);

//       // Force logout even if API call fails

//       localStorage.removeItem("vendor_token");

//       logout();

//       setIsDropdownOpen(false);

//       setIsOpen(false);

//       navigate("/");

//     }

//   };

//   const handlePasswordChange = (e) => {

//     setNewPassword(e.target.value);

//     if (confirmPassword && e.target.value !== confirmPassword) {

//       setOtpError("Passwords do not match.");

//     } else {

//       setOtpError("");

//     }

//   };

//   const handleConfirmPasswordChange = (e) => {

//     setConfirmPassword(e.target.value);

//     if (newPassword && e.target.value !== newPassword) {

//       setOtpError("Passwords do not match.");

//     } else {

//       setOtpError("");

//     }

//   };

//   return (

//     <header className="w-full flex flex-col md:flex-row justify-between items-center py-3 px-4 sm:px-6 bg-white shadow-md relative">

//       {/* Logo and Mobile Menu Button */}

//       <div className="flex justify-between items-center w-full md:w-auto">

//         <img src={logo} alt="Logo" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto" />

//         <button className="md:hidden text-black focus:outline-none" onClick={() => setIsOpen(!isOpen)}>

//           {isOpen ? <X size={24} /> : <Menu size={24} />}

//         </button>

//       </div>

//       {/* Desktop Navigation and Auth */}

//       <div className="hidden md:flex items-center space-x-4">

//         {authData ? (

//           <div className="relative">

//             <button

//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}

//               className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"

//             >

//               <span className="font-medium">{authData.name}</span>

//               <span className="bg-gray-200 text-gray-600 rounded-full h-8 w-8 flex items-center justify-center font-semibold">

//                 {authData.name.charAt(0).toUpperCase()}

//               </span>

//             </button>

//             {isDropdownOpen && (

//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">

//                 <Link

//                   to="/dashboard"

//                   className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

//                   onClick={() => setIsDropdownOpen(false)}

//                 >

//                   <LayoutDashboard size={18} className="mr-2" />

//                   Dashboard

//                 </Link>

//                 <Link

//                   to="/my-bookings"

//                   className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

//                   onClick={() => setIsDropdownOpen(false)}

//                 >

//                   <Book size={18} className="mr-2" />

//                   My Bookings

//                 </Link>

//                 <Link

//                   to="/accounts"

//                   className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

//                   onClick={() => setIsDropdownOpen(false)}

//                 >

//                   <User size={18} className="mr-2" />

//                   Accounts

//                 </Link>

//                 <Link

//                   to="/sales"

//                   className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

//                   onClick={() => setIsDropdownOpen(false)}

//                 >

//                   <DollarSign size={18} className="mr-2" />

//                   Sales

//                 </Link>

//                 <Link

//                   to="/my-profile"

//                   className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

//                   onClick={() => setIsDropdownOpen(false)}

//                 >

//                   <Settings size={18} className="mr-2" />

//                   My Profile

//                 </Link>

//                 <hr className="my-1" />

//                 <button

//                   onClick={handleLogout}

//                   className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"

//                 >

//                   <LogOut size={18} className="mr-2" />

//                   Logout

//                 </button>

//               </div>

//             )}

//           </div>

//         ) : (

//           <div className="flex items-center space-x-3">

//             <Input

//               type="email"

//               placeholder="Email"

//               value={email}

//               onChange={(e) => setEmail(e.target.value)}

//               className="w-32 lg:w-40"

//               iconType="username"

//             />

//             <Input

//               type="password"

//               placeholder="Password"

//               value={password}

//               onChange={(e) => setPassword(e.target.value)}

//               className="w-32 lg:w-40"

//               iconType="password"

//             />

//             <Button 

//               onClick={handleSignIn} 

//               className="bg-black hover:bg-gray-800 text-white rounded-full px-4 py-2 transition-colors"

//               disabled={!email || !password}

//             >

//               Sign In

//             </Button>

//           </div>

//         )}

//       </div>

//       {/* Mobile Menu */}

//       <div

//         className={`absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 transition-all duration-300 ${

//           isOpen ? "block" : "hidden"

//         } md:hidden z-40`}

//       >

//         {authData ? (

//           <div className="relative w-full px-4">

//             <button

//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}

//               className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mx-auto transition-colors"

//             >

//               <span className="font-medium">{authData.name}</span>

//               <span className="bg-gray-200 text-gray-600 rounded-full h-6 w-6 flex items-center justify-center text-sm font-semibold">

//                 {authData.name.charAt(0).toUpperCase()}

//               </span>

//             </button>

//             {isDropdownOpen && (

//               <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">

//                 <Link

//                   to="/dashboard"

//                   className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

//                   onClick={() => {setIsDropdownOpen(false); setIsOpen(false);}}

//                 >

//                   <LayoutDashboard size={18} className="mr-2" />

//                   Dashboard

//                 </Link>

//                 <Link

//                   to="/my-bookings"

//                   className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

//                   onClick={() => {setIsDropdownOpen(false); setIsOpen(false);}}

//                 >

//                   <Book size={18} className="mr-2" />

//                   My Bookings

//                 </Link>

//                 <Link

//                   to="/accounts"

//                   className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

//                   onClick={() => {setIsDropdownOpen(false); setIsOpen(false);}}

//                 >

//                   <User size={18} className="mr-2" />

//                   Accounts

//                 </Link>

//                 <Link

//                   to="/sales"

//                   className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

//                   onClick={() => {setIsDropdownOpen(false); setIsOpen(false);}}

//                 >

//                   <DollarSign size={18} className="mr-2" />

//                   Sales

//                 </Link>

//                 <Link

//                   to="/my-profile"

//                   className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

//                   onClick={() => {setIsDropdownOpen(false); setIsOpen(false);}}

//                 >

//                   <Settings size={18} className="mr-2" />

//                   My Profile

//                 </Link>

//                 <hr className="my-1" />

//                 <button

//                   onClick={handleLogout}

//                   className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"

//                 >

//                   <LogOut size={18} className="mr-2" />

//                   Logout

//                 </button>

//               </div>

//             )}

//           </div>

//         ) : (

//           <div className="flex flex-col items-center space-y-3 w-full px-4">

//             <Input

//               type="email"

//               placeholder="Email"

//               value={email}

//               onChange={(e) => setEmail(e.target.value)}

//               className="w-full"

//               iconType="username"

//             />

//             <Input

//               type="password"

//               placeholder="Password"

//               value={password}

//               onChange={(e) => setPassword(e.target.value)}

//               className="w-full"

//               iconType="password"

//             />

//             <Button 

//               onClick={handleSignIn} 

//               className="bg-black hover:bg-gray-800 text-white rounded-full px-4 py-2 w-full transition-colors"

//               disabled={!email || !password}

//             >

//               Sign In

//             </Button>

//           </div>

//         )}

//       </div>

//       {/* Display login error */}

//       {error && !showOtpModal && (

//         <div className="absolute top-full left-0 w-full bg-red-50 border border-red-200 px-4 py-2 z-30">

//           <p className="text-sm text-red-600 text-center">{error}</p>

//         </div>

//       )}

//       {/* OTP Modal */}

//       {showOtpModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto">

//             <h2 className="text-xl font-semibold text-center mb-2">

//               {passwordChangeRequired ? "Complete Account Setup" : "OTP Verification"}

//             </h2>

            

//             <p className="text-center text-sm text-gray-600 mb-4">

//               {passwordChangeRequired 

//                 ? `Welcome! This is your first login. Please verify your email and set a new password.`

//                 : `Enter the OTP sent to ${email}`

//               }

//             </p>

            

//             {otpError && (

//               <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">

//                 <p className="text-red-600 text-sm text-center">{otpError}</p>

//               </div>

//             )}

            

//             <div className="space-y-4">

//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-1">

//                   6-Digit OTP

//                 </label>

//                 <Input

//                   type="text"

//                   placeholder="Enter OTP"

//                   value={otp}

//                   onChange={(e) => {

//                     const inputVal = e.target.value.replace(/\D/g, "");

//                     if (inputVal.length <= 6) setOtp(inputVal);

//                   }}

//                   className="w-full text-center text-lg tracking-widest"

//                   showIcon={false}

//                   maxLength={6}

//                 />

//               </div>

              

//               {passwordChangeRequired && (

//                 <>

//                   <div>

//                     <label className="block text-sm font-medium text-gray-700 mb-1">

//                       New Password

//                     </label>

//                     <Input

//                       type="password"

//                       placeholder="Enter new password (min 8 characters)"

//                       value={newPassword}

//                       onChange={handlePasswordChange}

//                       className="w-full"

//                       showIcon={false}

//                     />

//                   </div>

                  

//                   <div>

//                     <label className="block text-sm font-medium text-gray-700 mb-1">

//                       Confirm New Password

//                     </label>

//                     <Input

//                       type="password"

//                       placeholder="Confirm new password"

//                       value={confirmPassword}

//                       onChange={handleConfirmPasswordChange}

//                       className="w-full"

//                       showIcon={false}

//                     />

//                   </div>

                  

//                   <div className="bg-blue-50 border border-blue-200 rounded-md p-3">

//                     <p className="text-blue-800 text-xs">

//                       Password requirements:

//                     </p>

//                     <ul className="text-blue-700 text-xs mt-1 list-disc list-inside">

//                       <li>At least 8 characters long</li>

//                       <li>Both passwords must match</li>

//                     </ul>

//                   </div>

//                 </>

//               )}

//             </div>

            

//             <div className="flex justify-end space-x-3 mt-6">

//               <Button 

//                 onClick={closeOtpModal} 

//                 className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 transition-colors"

//               >

//                 Cancel

//               </Button>

//               <Button 

//                 onClick={handleVerifyOtp} 

//                 className="bg-black hover:bg-gray-800 text-white px-6 py-2 transition-colors"

//                 disabled={!otp || (passwordChangeRequired && (!newPassword || !confirmPassword))}

//               >

//                 {passwordChangeRequired ? "Setup Account" : "Verify OTP"}

//               </Button>

//             </div>

//           </div>

//         </div>

//       )}

      

//       {/* Click outside to close dropdown */}

//       {isDropdownOpen && (

//         <div 

//           className="fixed inset-0 z-30" 

//           onClick={() => setIsDropdownOpen(false)}

//         />

//       )}

//     </header>

//   );

// }





import React, { useState, useEffect } from "react";

import { Menu, X, LayoutDashboard, Book, User, DollarSign, Settings, LogOut } from "lucide-react";

import logo from "../assets/images/logo-removebg-preview.png";

import Button from "./Button";

import { Link, useNavigate, useLocation } from "react-router-dom";

import Input from "./Input";

import { vendorLogin, verifyOtp, logoutVendor } from "../services/apiService";

import { useAuth } from "../context/AuthContext";

import {jwtDecode} from "jwt-decode"; // Correct import for ES6 modules

export default function Navbar({ onLoginSuccess }) {

  const { authData, login, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [showOtpModal, setShowOtpModal] = useState(false);

  const [otp, setOtp] = useState("");

  const [otpError, setOtpError] = useState("");

  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false);

  const [passwordChangeRequired, setPasswordChangeRequired] = useState(false);

  const [otpSent, setOtpSent] = useState(false);

  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();

  // Role-based navigation helper

  const getRoleBasedDashboard = (role) => {

    switch(role) {

      case "vendor":

        return "/VendorDashboard";

      case "company":

        return "/CompanyDashboard";

      default:

        return "/VendorDashboard";

    }

  };

  // Get role-based menu items

  const getRoleBasedMenuItems = (role) => {

    const commonItems = [

      { to: getRoleBasedDashboard(role), icon: LayoutDashboard, label: "Dashboard" },

      { to: "/my-profile", icon: Settings, label: "My Profile" }

    ];

    

    if (role === "vendor") {

      return [

        ...commonItems.slice(0, 1), // Dashboard

        

        ...commonItems.slice(1) // My Profile

      ];

    } else if (role === "company") {

      return [

        ...commonItems.slice(0, 1), // Dashboard

        { to: "/company-bookings", icon: Book, label: "Company Bookings" },

        { to: "/employees", icon: User, label: "Employees" },

        { to: "/company-sales", icon: DollarSign, label: "Company Sales" },

        ...commonItems.slice(1) // My Profile

      ];

    }

    

    return commonItems;

  };

  useEffect(() => {

    const token = localStorage.getItem("vendor_token");

    if (token && !authData) {

      try {

        const decoded = jwtDecode(token);

        const userName = decoded.name || decoded.email.split("@")[0];

        const role = decoded.role;

        

        // Store role for navigation

        setUserRole(role);

        

        login({ 

          token, 

          name: userName, 

          email: decoded.email || decoded.email,

          role: role

        });

        

        // Check if user is on wrong dashboard and redirect

        const currentPath = location.pathname;

        const correctDashboard = getRoleBasedDashboard(role);

        

        if ((role === "vendor" && currentPath === "/VendorDashboard") ||

            (role === "company" && currentPath === "/CompanyDashboard")) {

          navigate(correctDashboard, { replace: true });

        }

        

      } catch (e) {

        console.error("Failed to decode token:", e);

        localStorage.removeItem("vendor_token");

        setUserRole(null);

      }

    }

  }, [authData, login, location.pathname, navigate]);

  const handleSignIn = async () => {

    try {

      setError("");

      const response = await vendorLogin(email, password);

      console.log("Login Response:", response);

      if (response.status === "otp_sent") {

        setShowOtpModal(true);

        setOtpSent(true);

        

        // Store role for later use

        setUserRole(response.role);

        

        // Check if password change is required (first-time login)

        if (response.password_changed === false || response.message?.includes("first time") || response.message?.includes("set your password")) {

          setIsFirstTimeLogin(true);

          setPasswordChangeRequired(true);

        } else {

          setIsFirstTimeLogin(false);

          setPasswordChangeRequired(false);

        }

      } else if (response.status === "success" && response.token) {

        // Direct login without OTP (if OTP is disabled)

        const token = response.token;

        const decoded = jwtDecode(token);

        const userName = decoded.name || email.split("@")[0];

        const role = response.role || decoded.role;

        

        setUserRole(role);

        

        login({ 

          token, 

          name: userName, 

          email: decoded.email || email,

          role: role

        });

        

        localStorage.setItem("vendor_token", token);

        

        if (onLoginSuccess) onLoginSuccess({ token, role });

        

        // Role-based navigation

        const dashboardPath = getRoleBasedDashboard(role);

        navigate(dashboardPath, { replace: true });

        

      } else {

        throw new Error(response.message || "Unexpected response from login");

      }

    } catch (err) {

      console.error("Login failed:", err.message, err.stack);

      setError(err.message || "Login failed. Please try again.");

    }

  };

  const handleVerifyOtp = async () => {

    try {

      setOtpError("");

      

      // Validate OTP

      if (!otp || otp.length !== 6) {

        setOtpError("Please enter a valid 6-digit OTP.");

        return;

      }

      

      // Validate new password if required

      if (passwordChangeRequired) {

        if (!newPassword) {

          setOtpError("Please provide a new password.");

          return;

        }

        

        if (newPassword.length < 8) {

          setOtpError("Password must be at least 8 characters long.");

          return;

        }

        

        if (newPassword !== confirmPassword) {

          setOtpError("Passwords do not match.");

          return;

        }

      }

      

      const data = await verifyOtp(email, otp, passwordChangeRequired ? newPassword : null);

      console.log("OTP Verification Response:", data);

      

      if (data.status === "success" || data.status === "password_changed" || data.status === "logged_in") {

        const token = data.session_id || data.token;

        

        if (!token) {

          throw new Error("No authentication token received");

        }

        

        const decoded = jwtDecode(token);

        const userName = decoded.name || email.split("@")[0];

        const role = data.role || decoded.role || userRole;

        

        // Store token and login user

        localStorage.setItem("vendor_token", token);

        

        setUserRole(role);

        

        login({ 

          token, 

          name: userName, 

          email: decoded.email || email,

          role: role

        });

        

        // Close modal and reset form

        setShowOtpModal(false);

        setOtp("");

        setNewPassword("");

        setConfirmPassword("");

        setPasswordChangeRequired(false);

        setIsFirstTimeLogin(false);

        setOtpSent(false);

        

        if (onLoginSuccess) onLoginSuccess({ token, role });

        

        // Role-based navigation with replace to prevent going back

        const dashboardPath = getRoleBasedDashboard(role);

        navigate(dashboardPath, { replace: true });

        

      } else {

        throw new Error(data.error || data.message || "OTP verification failed");

      }

    } catch (err) {

      console.error("OTP verification failed:", err.message, err.stack);

      setOtpError(err.message || "Failed to verify OTP. Please try again.");

    }

  };

  const closeOtpModal = () => {

    setShowOtpModal(false);

    setOtp("");

    setNewPassword("");

    setConfirmPassword("");

    setOtpError("");

    setIsFirstTimeLogin(false);

    setPasswordChangeRequired(false);

    setOtpSent(false);

  };

  const handleLogout = async () => {

    try {

      const response = await logoutVendor();

      if (response.status === "success") {

        localStorage.removeItem("vendor_token");

        setUserRole(null);

        logout();

        setIsDropdownOpen(false);

        setIsOpen(false);

        // Clear form data

        setEmail("");

        setPassword("");

        navigate("/", { replace: true });

      } else {

        throw new Error("Logout failed");

      }

    } catch (err) {

      console.error("Logout failed:", err.message);

      // Force logout even if API call fails

      localStorage.removeItem("vendor_token");

      setUserRole(null);

      logout();

      setIsDropdownOpen(false);

      setIsOpen(false);

      setEmail("");

      setPassword("");

      navigate("/", { replace: true });

    }

  };

  const handlePasswordChange = (e) => {

    setNewPassword(e.target.value);

    if (confirmPassword && e.target.value !== confirmPassword) {

      setOtpError("Passwords do not match.");

    } else {

      setOtpError("");

    }

  };

  const handleConfirmPasswordChange = (e) => {

    setConfirmPassword(e.target.value);

    if (newPassword && e.target.value !== newPassword) {

      setOtpError("Passwords do not match.");

    } else {

      setOtpError("");

    }

  };

  // Get menu items based on user role

  const menuItems = authData?.role ? getRoleBasedMenuItems(authData.role) : [];

  return (

    <header className="w-full flex flex-col md:flex-row justify-between items-center py-3 px-4 sm:px-6 h-[50px] sm:h-10 md:h-[50px] lg:h-[50px] bg-green-350 shadow-md relative">

      {/* Logo and Mobile Menu Button */}

      <div className="flex justify-between items-center w-full md:w-auto">

        <img src={logo} alt="Logo" className="h-[40px] sm:h-[20px] md:h-[85px] lg:h-[100px] w-[150px] bg-white-400 mt-10px" />

        <button className="md:hidden text-black focus:outline-none" onClick={() => setIsOpen(!isOpen)}>

          {isOpen ? <X size={24} /> : <Menu size={24} />}

        </button>

      </div>

      {/* Desktop Navigation and Auth */}

      <div className="hidden md:flex items-center space-x-4">

        {authData ? (

          <div className="relative">

            <button

              onClick={() => setIsDropdownOpen(!isDropdownOpen)}

              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"

            >

              <span className="font-medium">{authData.name}</span>

              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">

                {authData.role?.toUpperCase() || 'USER'}

              </span>

              <span className="bg-gray-200 text-gray-600 rounded-full h-8 w-8 flex items-center justify-center font-semibold">

                {authData.name.charAt(0).toUpperCase()}

              </span>

            </button>

            {isDropdownOpen && (

              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">

                {menuItems.map((item, index) => (

                  <Link

                    key={index}

                    to={item.to}

                    className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

                    onClick={() => setIsDropdownOpen(false)}

                  >

                    <item.icon size={18} className="mr-2" />

                    {item.label}

                  </Link>

                ))}

                <hr className="my-1" />

                <button

                  onClick={handleLogout}

                  className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"

                >

                  <LogOut size={18} className="mr-2" />

                  Logout

                </button>

              </div>

            )}

          </div>

        ) : (

          <div className="flex items-center space-x-3">

            <Input

              type="email"

              placeholder="Email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              className="w-32 lg:w-40"

              iconType="username"

            />

            <Input

              type="password"

              placeholder="Password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              className="w-32 lg:w-40"

              iconType="password"

            />

            <Button 

              onClick={handleSignIn} 

              className="bg-black hover:bg-gray-800 text-white rounded-full px-4 py-2 transition-colors"

              disabled={!email || !password}

            >

              Sign In

            </Button>

          </div>

        )}

      </div>

      {/* Mobile Menu */}

      <div

        className={`absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 transition-all duration-300 ${

          isOpen ? "block" : "hidden"

        } md:hidden z-40`}

      >

        {authData ? (

          <div className="relative w-full px-4">

            <button

              onClick={() => setIsDropdownOpen(!isDropdownOpen)}

              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mx-auto transition-colors"

            >

              <span className="font-medium">{authData.name}</span>

              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">

                {authData.role?.toUpperCase() || 'USER'}

              </span>

              <span className="bg-gray-200 text-gray-600 rounded-full h-6 w-6 flex items-center justify-center text-sm font-semibold">

                {authData.name.charAt(0).toUpperCase()}

              </span>

            </button>

            {isDropdownOpen && (

              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">

                {menuItems.map((item, index) => (

                  <Link

                    key={index}

                    to={item.to}

                    className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"

                    onClick={() => {setIsDropdownOpen(false); setIsOpen(false);}}

                  >

                    <item.icon size={18} className="mr-2" />

                    {item.label}

                  </Link>

                ))}

                <hr className="my-1" />

                <button

                  onClick={handleLogout}

                  className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"

                >

                  <LogOut size={18} className="mr-2" />

                  Logout

                </button>

              </div>

            )}

          </div>

        ) : (

          <div className="flex flex-col items-center space-y-3 w-full px-4">

            <Input

              type="email"

              placeholder="Email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              className="w-full"

              iconType="username"

            />

            <Input

              type="password"

              placeholder="Password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              className="w-full"

              iconType="password"

            />

            <Button 

              onClick={handleSignIn} 

              className="bg-black hover:bg-gray-800 text-white rounded-full px-4 py-2 w-full transition-colors"

              disabled={!email || !password}

            >

              Sign In

            </Button>

          </div>

        )}

      </div>

      {/* Display login error */}

      {error && !showOtpModal && (

        <div className="absolute top-full left-0 w-full bg-red-50 border border-red-200 px-4 py-2 z-30">

          <p className="text-sm text-red-600 text-center">{error}</p>

        </div>

      )}

      {/* OTP Modal */}

      {showOtpModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto">

            <h2 className="text-xl font-semibold text-center mb-2">

              {passwordChangeRequired ? "Complete Account Setup" : "OTP Verification"}

            </h2>

            

            <p className="text-center text-sm text-gray-600 mb-4">

              {passwordChangeRequired 

                ? `Welcome! This is your first login. Please verify your email and set a new password.`

                : `Enter the OTP sent to ${email}`

              }

            </p>

            

            {otpError && (

              <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">

                <p className="text-red-600 text-sm text-center">{otpError}</p>

              </div>

            )}

            

            <div className="space-y-4">

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">

                  6-Digit OTP

                </label>

                <Input

                  type="text"

                  placeholder="Enter OTP"

                  value={otp}

                  onChange={(e) => {

                    const inputVal = e.target.value.replace(/\D/g, "");

                    if (inputVal.length <= 6) setOtp(inputVal);

                  }}

                  className="w-full text-center text-lg tracking-widest"

                  showIcon={false}

                  maxLength={6}

                />

              </div>

              

              {passwordChangeRequired && (

                <>

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">

                      New Password

                    </label>

                    <Input

                      type="password"

                      placeholder="Enter new password (min 8 characters)"

                      value={newPassword}

                      onChange={handlePasswordChange}

                      className="w-full"

                      showIcon={false}

                    />

                  </div>

                  

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">

                      Confirm New Password

                    </label>

                    <Input

                      type="password"

                      placeholder="Confirm new password"

                      value={confirmPassword}

                      onChange={handleConfirmPasswordChange}

                      className="w-full"

                      showIcon={false}

                    />

                  </div>

                  

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">

                    <p className="text-blue-800 text-xs">

                      Password requirements:

                    </p>

                    <ul className="text-blue-700 text-xs mt-1 list-disc list-inside">

                      <li>At least 8 characters long</li>

                      <li>Must contain uppercase, lowercase, and number</li>

                      <li>Both passwords must match</li>

                    </ul>

                  </div>

                </>

              )}

            </div>

            

            <div className="flex justify-end space-x-3 mt-6">

              <Button 

                onClick={closeOtpModal} 

                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 transition-colors"

              >

                Cancel

              </Button>

              <Button 

                onClick={handleVerifyOtp} 

                className="bg-black hover:bg-gray-800 text-white px-6 py-2 transition-colors"

                disabled={!otp || (passwordChangeRequired && (!newPassword || !confirmPassword))}

              >

                {passwordChangeRequired ? "Setup Account" : "Verify OTP"}

              </Button>

            </div>

          </div>

        </div>

      )}

      

      {/* Click outside to close dropdown */}

      {isDropdownOpen && (

        <div 

          className="fixed inset-0 z-30" 

          onClick={() => setIsDropdownOpen(false)}

        />

      )}

    </header>

  );

}