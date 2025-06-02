
const BASE_URL = "https://vendor1.onrender.com/api";

// Helper function to get the token from localStorage
const getToken = () => {
  const token = localStorage.getItem("vendor_token");
  console.log("Get Token - Retrieved Token:", token);
  return token;
};

// Helper function to set the token in localStorage
const setToken = (token) => {
  console.log("Set Token - Storing Token:", token);
  localStorage.setItem("vendor_token", token);
};

// Helper function to remove the token from localStorage
const removeToken = () => {
  console.log("Remove Token - Removing Token");
  localStorage.removeItem("vendor_token");
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const text = await response.clone().text(); // Clone to avoid consuming the stream
    try {
      const errorData = JSON.parse(text);
      console.error("Server error details:", errorData);
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status} Error: ${text.substring(0, 100)}...`);
    } catch (e) {
      throw new Error(`Server error: Unable to parse response - ${text.substring(0, 100)}...`);
    }
  }
  const data = await response.json();
  if (data.session_id) {
    setToken(data.session_id); // Store the session_id if present
  }
  return data;
};

// Auth Controller APIs
export const vendorLogin = async (email, password) => {
  console.log("Sending login request to:", `${BASE_URL}/user/login`, "with body:", { email, password });
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken() ? `Bearer ${getToken()}` : undefined,
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const verifyOtp = async (email, otp, newPassword = null) => {
  const body = newPassword ? { email, otp, newPassword } : { email, otp };
  console.log("Sending verifyOTP request to:", `${BASE_URL}/user/verify-otp`, "with body:", body);
  const response = await fetch(`${BASE_URL}/user/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken() ? `Bearer ${getToken()}` : undefined,
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

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
// Flight Search API
export const searchFlights = async (origin, destination, date, returnDate) => {
  const queryParams = new URLSearchParams({
    origin,
    destination,
    date,
  });

  if (returnDate) {
    queryParams.append("returnDate", returnDate);
  }

  const token = getToken();
  const response = await fetch(`${BASE_URL}/flights/search?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

// Live Airport Search API
export const liveAirportSearch = async (term) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/flights/live-airport-search?term=${encodeURIComponent(term)}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

// Price Flight API
export const priceFlight = async (flightOffer) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/flights/price`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ flightOffer }),
  });
  return handleResponse(response);
};

// Seat Map API
export const getSeatMap = async (pricedOffer) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/flights/seatmap`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pricedOffer }),
  });
  return handleResponse(response);
};

// Book Flight API
export const bookFlight = async (pricedOffer, travelers, addons, gstin) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/flights/book`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pricedOffer, travelers, addons, gstin }),
  });
  return handleResponse(response);
};

// Confirm Booking API
export const confirmBooking = async (paymentId, orderId, signature, pricedOffer, travelers, bookingId) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/flights/confirm-booking`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentId, orderId, signature, pricedOffer, travelers, bookingId }),
  });
  return handleResponse(response);
};

// Get Bookings API
export const getBookings = async () => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

// Get Booking By ID API
export const getBookingById = async (amadeusOrderId) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/bookings/${encodeURIComponent(amadeusOrderId)}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

// Cancel Booking API
export const cancelBooking = async (amadeusOrderId) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/bookings/${encodeURIComponent(amadeusOrderId)}/cancel`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

// Get Invoice API
export const getInvoice = async (amadeusOrderId) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/bookings/${encodeURIComponent(amadeusOrderId)}/invoice`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};



