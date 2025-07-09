
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import InputField from "../components/InputField";
// // import TabButton from "../components/TabButton";
// // import TripTypeButton from "../components/TripTypeButton";
// // import AirportInput from "../components/AirportInput";
// // import PassengerDropdown from "../section/PassengerDropdown";
// // import { User, Briefcase } from "lucide-react";
// // import Button from "../components/Button";

// // const SearchForm = () => {
// //   const [tripType, setTripType] = useState("one-way");
// //   const [departure, setDeparture] = useState("");
// //   const [destination, setDestination] = useState("");
// //   const [departureDate, setDepartureDate] = useState("");
// //   const [returnDate, setReturnDate] = useState("");
// //   const [isSeatDropdownOpen, setSeatDropdownOpen] = useState(false);
// //   const [selectedSeat, setSelectedSeat] = useState("Economy");
// //   const [error, setError] = useState("");
// //   const [totalPassengers, setTotalPassengers] = useState(1);
// //   const navigate = useNavigate();

// //   const handlePassengerChange = (newTotal) => {
// //     setTotalPassengers(newTotal); // Update state when passenger count changes
// //   };



// //   const handleSearch = async () => {
// //     if (!departure || !destination || !departureDate) {
// //       setError("Please fill all fields");
// //       return;
// //     }

// //     try {
// //       setError("");
// //       const response = await axios.get(
// //         "http://localhost:5000/api/flights/search",
// //         {
// //           params: {
// //             origin: departure.toUpperCase(),
// //             destination: destination.toUpperCase(),
// //             date: departureDate,
// //           },
// //         }
// //       );

// //       navigate("/results", {
// //         state: {
// //           flights: response.data.flights,
// //           passengers: totalPassengers,
// //           departure,
// //           destination,
// //           departureDate,
// //           returnDate,
// //           selectedSeat, // Adding seat class if you want to use it later
// //         },
// //       });
// //     } catch (err) {
// //       if (err.response?.status === 401) {
// //         setError("Your session has expired. Please log in again.");
// //         localStorage.removeItem("sessionToken"); // Clear the invalid token
// //         setTimeout(() => {
// //           navigate("/login");
// //         }, 2000);
// //       } else {
// //         setError("Failed to fetch flights. Please try again.");
// //       }
// //       console.error("Error fetching flights:", err);
// //     }
// //   };

// //   return (
// //     <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg">
// //       <div className="flex space-x-4 text-gray-300 mb-4">
// //         <TabButton title="Flight" active />
// //         <TabButton title="Hotel" />
// //         <TabButton title="Car Rental" />
// //         <TabButton title="Things To Do" />
// //       </div>

// //       <div className="flex space-x-3 mb-6">
// //         <TripTypeButton
// //           title="One-way"
// //           active={tripType === "one-way"}
// //           onClick={() => setTripType("one-way")}
// //         />
// //         <TripTypeButton
// //           title="Round Trip"
// //           active={tripType === "round-trip"}
// //           onClick={() => setTripType("round-trip")}
// //         />
// //         <TripTypeButton
// //           title="Multi-city"
// //           active={tripType === "multi-city"}
// //           onClick={() => setTripType("multi-city")}
// //         />
// //       </div>

// //       <div className="grid grid-cols-2 gap-4">
// //         <AirportInput label="From" value={departure} setValue={setDeparture} />
// //         <AirportInput
// //           label="To"
// //           value={destination}
// //           setValue={setDestination}
// //         />
// //       </div>

// //       <div className="grid grid-cols-2 gap-4 mt-4">
// //         <div>
// //           <label className="block text-white mb-1">Departure Date</label>
// //           <input
// //             type="date"
// //             value={departureDate}
// //             onChange={(e) => setDepartureDate(e.target.value)}
// //             className="w-full p-3 rounded-lg bg-gray-700 text-white"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-white mb-1">Return Date</label>
// //           <input
// //             type="date"
// //             value={returnDate}
// //             onChange={(e) => setReturnDate(e.target.value)}
// //             className="w-full p-3 rounded-lg bg-gray-700 text-white"
// //             disabled={tripType === "one-way"}
// //           />
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-2 gap-4 mt-4">
// //         <PassengerDropdown onPassengerChange={handlePassengerChange} />

// //         <div className="relative">
// //           <label className="block text-white mb-1">Seat Class</label>
// //           <button
// //             className="flex items-center w-full p-3 rounded-lg bg-gray-700 text-white text-left"
// //             onClick={() => setSeatDropdownOpen(!isSeatDropdownOpen)}
// //           >
// //             <Briefcase className="w-5 h-5 mr-2" />
// //             {selectedSeat}
// //           </button>

// //           {isSeatDropdownOpen && (
// //             <div className="absolute mt-2 bg-gray-800 p-4 rounded-lg shadow-lg w-full">
// //               {["Economy", "Business", "First Class"].map((seat) => (
// //                 <button
// //                   key={seat}
// //                   className={`w-full p-2 text-white text-left hover:bg-gray-700 rounded ${
// //                     selectedSeat === seat ? "bg-gray-700" : ""
// //                   }`}
// //                   onClick={() => {
// //                     setSelectedSeat(seat);
// //                     setSeatDropdownOpen(false);
// //                   }}
// //                 >
// //                   {seat}
// //                 </button>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

// //       <Button
// //         className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full text-lg font-medium"
// //         onClick={handleSearch}
// //       >
// //         Search
// //       </Button>
// //     </div>
// //   );
// // };

// // export default SearchForm;
// import React, { useState, useEffect, useRef } from "react";

// const SearchForm = () => {
//   const [formData, setFormData] = useState({
//     from: "",
//     to: "",
//     departureDate: "",
//     fromIata: "",
//     toIata: "",
//   });
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [activeField, setActiveField] = useState("");
//   const [flights, setFlights] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const suggestionsRef = useRef(null);

//   // Handle clicks outside the suggestions dropdown to close it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearchAirport = async (query) => {
//     if (!query) {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://localhost:5000/api/flights/live-airport-search?term=${encodeURIComponent(query)}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch airport suggestions");
//       }
//       const data = await response.json();
//       setSuggestions(data || []);
//       setShowSuggestions(true);
//     } catch (error) {
//       setError("Failed to fetch airport suggestions. Please try again.");
//       console.error("Error fetching airport suggestions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchFlights = async () => {
//     const { fromIata, toIata, departureDate } = formData;

//     if (!fromIata || !toIata || !departureDate) {
//       setError("Please select origin, destination, and departure date.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       const response = await fetch(
//         `http://localhost:5000/api/flights/search?origin=${fromIata}&destination=${toIata}&date=${departureDate}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to search flights");
//       }
//       const data = await response.json();
//       if (data.status === "success") {
//         setFlights(data.flights || []);
//       } else {
//         setError(data.error || "No flights found.");
//       }
//     } catch (error) {
//       setError("Failed to search flights. Please try again.");
//       console.error("Error searching flights:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectAirport = (airport, field) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: airport.label,
//       [`${field}Iata`]: airport.value,
//     }));
//     setShowSuggestions(false);
//     setSuggestions([]);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <div className="flex flex-col md:flex-row gap-4 md:items-center w-full max-w-4xl">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             placeholder="From"
//             value={formData.from}
//             onChange={(e) => {
//               const value = e.target.value;
//               setFormData((prev) => ({ ...prev, from: value, fromIata: "" }));
//               handleSearchAirport(value);
//               setActiveField("from");
//             }}
//             className="border p-2 rounded w-full"
//             disabled={loading}
//           />
//           {showSuggestions && activeField === "from" && suggestions.length > 0 && (
//             <ul
//               ref={suggestionsRef}
//               className="absolute z-10 bg-white border mt-1 w-full max-h-48 overflow-y-auto rounded shadow-md"
//             >
//               {suggestions.map((airport, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleSelectAirport(airport, "from")}
//                   className="cursor-pointer px-3 py-2 hover:bg-gray-100"
//                 >
//                   {airport.label}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="relative flex-1">
//           <input
//             type="text"
//             placeholder="To"
//             value={formData.to}
//             onChange={(e) => {
//               const value = e.target.value;
//               setFormData((prev) => ({ ...prev, to: value, toIata: "" }));
//               handleSearchAirport(value);
//               setActiveField("to");
//             }}
//             className="border p-2 rounded w-full"
//             disabled={loading}
//           />
//           {showSuggestions && activeField === "to" && suggestions.length > 0 && (
//             <ul
//               ref={suggestionsRef}
//               className="absolute z-10 bg-white border mt-1 w-full max-h-48 overflow-y-auto rounded shadow-md"
//             >
//               {suggestions.map((airport, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleSelectAirport(airport, "to")}
//                   className="cursor-pointer px-3 py-2 hover:bg-gray-100"
//                 >
//                   {airport.label}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <input
//           type="date"
//           value={formData.departureDate}
//           onChange={(e) =>
//             setFormData((prev) => ({ ...prev, departureDate: e.target.value }))
//           }
//           className="border p-2 rounded flex-1"
//           disabled={loading}
//         />

//         <button
//           onClick={handleSearchFlights}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
//           disabled={loading}
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//       </div>

//       {error && (
//         <div className="mt-4 text-red-600 text-center">{error}</div>
//       )}

//       {flights.length > 0 && (
//         <div className="mt-6 w-full max-w-4xl">
//           <h2 className="text-xl font-bold mb-4">Flight Results</h2>
//           <div className="grid gap-4">
//             {flights.map((flight, index) => (
//               <div key={index} className="border p-4 rounded shadow">
//                 <h3 className="font-semibold">
//                   Flight {flight.itineraries[0].segments[0].departure.iataCode} to{" "}
//                   {flight.itineraries[0].segments[0].arrival.iataCode}
//                 </h3>
//                 <p>Price: {flight.price.total} {flight.price.currency}</p>
//                 <p>Airline: {flight.itineraries[0].segments[0].airlineName}</p>
//                 <p>Departure: {flight.itineraries[0].segments[0].departure.at}</p>
//                 <p>Arrival: {flight.itineraries[0].segments[0].arrival.at}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchForm;