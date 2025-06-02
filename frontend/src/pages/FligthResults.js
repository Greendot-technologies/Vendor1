
// // import React, { useState, useEffect, useCallback } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import Button from "../components/Button";
// // import FilterSection from "../section/FilterSection";
// // import HorizontalSearchForm from "../section/HorizontalSearchForm";
// // import BookingResponse from "../pages/BookingResponse";

// // const FlightResults = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [originalFlights, setOriginalFlights] = useState(location.state?.flights || []);
// //   const [passengers, setPassengers] = useState(location.state?.passengers || 1);
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// //   const [filteredFlights, setFilteredFlights] = useState(originalFlights);

// //   // Initialize searchFormData from location.state
// //   const searchFormData = {
// //     departure: location.state?.departure || "",
// //     destination: location.state?.destination || "",
// //     departureDate: location.state?.departureDate || "",
// //     returnDate: location.state?.returnDate || "",
// //     passengers: location.state?.passengers || 1,
// //   };

// //   useEffect(() => {
// //     // Update filteredFlights only if originalFlights changes
// //     if (JSON.stringify(filteredFlights) !== JSON.stringify(originalFlights)) {
// //       setFilteredFlights(originalFlights);
// //     }
// //   }, [originalFlights]);

// //   const formatDuration = (duration) => {
// //     const match = duration.match(/PT(\d+)H(?:(\d+)M)?/);
// //     if (!match) return duration.replace("PT", "").toLowerCase();
// //     const hours = match[1].padStart(2, "0");
// //     const minutes = match[2] ? match[2].padStart(2, "0") : "00";
// //     return `${hours}h ${minutes}m`;
// //   };

// //   const calculateStops = (segments) => {
// //     return segments.length - 1;
// //   };

// //   const calculateRewards = (price) => {
// //     return Math.floor(price / 10);
// //   };

// //   const filterFlights = (criteria) => {
// //     let result = [...originalFlights];
// //     if (criteria.priceRange) {
// //       result = result.filter((flight) => parseFloat(flight.price.grandTotal) <= criteria.priceRange);
// //     }
// //     if (criteria.stops.length > 0) {
// //       result = result.filter((flight) => {
// //         const stopsCount = calculateStops(flight.itineraries[0].segments);
// //         return (
// //           (criteria.stops.includes("nonStop") && stopsCount === 0) ||
// //           (criteria.stops.includes("oneStop") && stopsCount === 1) ||
// //           (criteria.stops.includes("twoPlusStops") && stopsCount >= 2)
// //         );
// //       });
// //     }
// //     if (criteria.airlines.length > 0) {
// //       result = result.filter((flight) =>
// //         flight.validatingAirlineCodes.some((code) => criteria.airlines.includes(code))
// //       );
// //     }
// //     if (criteria.departureTimes.length > 0) {
// //       result = result.filter((flight) => {
// //         const departureHour = new Date(flight.itineraries[0].segments[0].departure.at).getUTCHours();
// //         return (
// //           (criteria.departureTimes.includes("morning") && departureHour >= 6 && departureHour < 12) ||
// //           (criteria.departureTimes.includes("afternoon") && departureHour >= 12 && departureHour < 18) ||
// //           (criteria.departureTimes.includes("evening") && departureHour >= 18 && departureHour < 24)
// //         );
// //       });
// //     }
// //     if (criteria.arrivalTimes.length > 0) {
// //       result = result.filter((flight) => {
// //         const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
// //         const arrivalHour = new Date(lastSegment.arrival.at).getUTCHours();
// //         return (
// //           (criteria.arrivalTimes.includes("morning") && arrivalHour >= 6 && arrivalHour < 12) ||
// //           (criteria.arrivalTimes.includes("afternoon") && arrivalHour >= 12 && arrivalHour < 18) ||
// //           (criteria.arrivalTimes.includes("evening") && arrivalHour >= 18 && arrivalHour < 24)
// //         );
// //       });
// //     }
// //     setFilteredFlights(result);
// //   };

// //   const handleSearchUpdate = useCallback(
// //     (newSearchData) => {
// //       // Only update if the search parameters have changed and flights data exists
// //       const isDifferent =
// //         newSearchData.departure !== searchFormData.departure ||
// //         newSearchData.destination !== searchFormData.destination ||
// //         newSearchData.departureDate !== searchFormData.departureDate ||
// //         newSearchData.returnDate !== searchFormData.returnDate ||
// //         newSearchData.passengers !== searchFormData.passengers;

// //       if (isDifferent && newSearchData.flights && newSearchData.flights.length > 0) {
// //         setOriginalFlights(newSearchData.flights);
// //         setPassengers(newSearchData.passengers);
// //         navigate("/flight-results", {
// //           state: {
// //             flights: newSearchData.flights,
// //             passengers: newSearchData.passengers,
// //             departure: newSearchData.departure,
// //             destination: newSearchData.destination,
// //             departureDate: newSearchData.departureDate,
// //             returnDate: newSearchData.returnDate,
// //           },
// //           replace: true,
// //         });
// //       }
// //     },
// //     [navigate, searchFormData.departure, searchFormData.destination, searchFormData.departureDate, searchFormData.returnDate, searchFormData.passengers]
// //   );

// //   const handleBookNow = async (flight) => {
// //     const departureSegment = flight.itineraries[0].segments[0];
// //     const arrivalSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
// //     const departureTime = new Date(departureSegment.departure.at).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hour12: false,
// //     });
// //     const arrivalTime = new Date(arrivalSegment.arrival.at).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hour12: false,
// //     });
// //     const duration = formatDuration(flight.itineraries[0].duration);
// //     const stops = calculateStops(flight.itineraries[0].segments);

// //     const requestData = {
// //       flightOffer: flight,
// //     };

// //     console.log("Sending request data:", JSON.stringify(requestData, null, 2));

// //     try {
// //       const response = await fetch("http://localhost:3000/api/flights/price", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(requestData),
// //       });

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
// //       }

// //       const data = await response.json();
// //       console.log("API response:", data);

// //       const transformedResponse = {
// //         departure: flight.itineraries[0].segments[0].departure,
// //         arrival: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival,
// //         departureTime: departureTime,
// //         arrivalTime: arrivalTime,
// //         duration: duration,
// //         stops: stops,
// //         aircraft: "AIRBUS JET",
// //         fare: parseFloat(flight.price.grandTotal) || 5387,
// //         discount: 213.45,
// //         insurance: 199,
// //         additionalDiscount: 37.55,
// //         totalAmount: parseFloat(flight.price.grandTotal) || 5335,
// //       };

// //       navigate("/booking", { state: { bookingResponse: transformedResponse } });
// //     } catch (error) {
// //       console.error("Error calling price API:", error.message);
// //       alert("Failed to fetch price details. Please try again or contact support.");
// //     }
// //   };

// //   return (
// //     <div
// //       className="min-h-screen bg-gray-100"
// //       style={{
// //         backgroundImage: `url('https://images.unsplash.com/photo-1507521628349-6e9b9a9a1f1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundAttachment: "fixed",
// //       }}
// //     >
// //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
// //         <div className="sticky top-0 z-[2000] bg-opacity-95 backdrop-blur-md">
// //           <HorizontalSearchForm initialData={searchFormData} onSearch={handleSearchUpdate} />
// //         </div>

// //         <div className="flex flex-col lg:flex-row gap-6">
// //           <div className="lg:w-1/4 lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] z-[1500]">
// //             <FilterSection
// //               isOpen={isFilterOpen}
// //               onClose={() => setIsFilterOpen(false)}
// //               flights={originalFlights}
// //               onFilterChange={filterFlights}
// //             />
// //             <button
// //               className="lg:hidden mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
// //               onClick={() => setIsFilterOpen(!isFilterOpen)}
// //             >
// //               {isFilterOpen ? "Close Filters" : "Open Filters"}
// //             </button>
// //           </div>

// //           <div className="lg:w-3/4">
// //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white bg-opacity-90 backdrop-blur-md p-4 rounded-xl shadow-md">
// //               <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 drop-shadow-lg">MultiflyTravel</h1>
// //               <div className="flex flex-col sm:flex-row sm:space-x-4 text-gray-700 mt-2 sm:mt-0">
// //                 <p className="text-sm sm:text-base drop-shadow-md">
// //                   {filteredFlights[0]?.itineraries[0]?.segments[0]?.departure.iataCode || "N/A"} -{" "}
// //                   {filteredFlights[0]?.itineraries[0]?.segments[filteredFlights[0]?.itineraries[0]?.segments.length - 1]?.arrival.iataCode || "N/A"}
// //                 </p>
// //                 <p className="text-sm sm:text-base drop-shadow-md">
// //                   {filteredFlights[0]?.itineraries[0]?.segments[0]?.departure.at
// //                     ? new Date(filteredFlights[0].itineraries[0].segments[0].departure.at).toLocaleDateString("en-US", { day: "numeric", month: "short" })
// //                     : "N/A"}
// //                 </p>
// //                 <p className="text-sm sm:text-base drop-shadow-md">{passengers} Passenger{passengers !== 1 ? "s" : ""}</p>
// //               </div>
// //             </div>

// //             <div className="max-h-[calc(100vh-12rem)] overflow-y-auto no-scroll space-y-4 pr-2">
// //               {filteredFlights.length > 0 ? (
// //                 filteredFlights.map((flight, index) => {
// //                   const departureSegment = flight.itineraries[0].segments[0];
// //                   const arrivalSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
// //                   const departureTime = departureSegment.departure.at
// //                     ? new Date(departureSegment.departure.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
// //                     : "N/A";
// //                   const arrivalTime = arrivalSegment.arrival.at
// //                     ? new Date(arrivalSegment.arrival.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
// //                     : "N/A";
// //                   const duration = flight.itineraries[0].duration ? formatDuration(flight.itineraries[0].duration) : "N/A";
// //                   const stops = calculateStops(flight.itineraries[0].segments);
// //                   const price = flight.price?.grandTotal
// //                     ? parseFloat(flight.price.grandTotal).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
// //                     : "N/A";
// //                   const rewards = flight.price?.grandTotal ? calculateRewards(parseFloat(flight.price.grandTotal)) : 0;
// //                   const currency = flight.price?.currency || "USD";

// //                   return (
// //                     <div
// //                       key={index}
// //                       className="bg-white bg-opacity-95 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between"
// //                     >
// //                       <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
// //                         <div className="flex space-x-2">
// //                           {flight.validatingAirlineCodes.map((code, idx) => (
// //                             <div
// //                               key={idx}
// //                               className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full shadow-md"
// //                             ></div>
// //                           ))}
// //                         </div>
// //                         <div className="text-sm text-gray-700 font-medium">
// //                           {flight.validatingAirlineCodes.map((code, idx) => (
// //                             <span key={idx}>
// //                               {code} {flight.itineraries[0].segments[idx]?.number || "N/A"}
// //                               {idx < flight.validatingAirlineCodes.length - 1 && " + "}
// //                             </span>
// //                           ))}
// //                         </div>
// //                       </div>

// //                       <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-2 sm:mt-0">
// //                         <div className="text-center">
// //                           <p className="text-lg sm:text-xl font-bold text-gray-800">{departureTime}</p>
// //                           <p className="text-xs sm:text-sm text-gray-600">
// //                             {departureSegment.departure.iataCode || "N/A"},{" "}
// //                             {departureSegment.departure.terminal ? `T${departureSegment.departure.terminal}` : "T N/A"}
// //                           </p>
// //                         </div>
// //                         <div className="text-center">
// //                           <p className="text-sm text-gray-600 font-medium">{duration}</p>
// //                           <p className="text-xs text-gray-500">{stops} stop{stops !== 1 ? "s" : ""}</p>
// //                           <div className="flex items-center justify-center mt-1">
// //                             <div className="h-px w-6 sm:w-8 bg-gray-400"></div>
// //                             <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
// //                             <div className="h-px w-6 sm:w-8 bg-gray-400"></div>
// //                           </div>
// //                         </div>
// //                         <div className="text-center">
// //                           <p className="text-lg sm:text-xl font-bold text-gray-800">{arrivalTime}</p>
// //                           <p className="text-xs sm:text-sm text-gray-600">
// //                             {arrivalSegment.arrival.iataCode || "N/A"},{" "}
// //                             {arrivalSegment.arrival.terminal ? `T${arrivalSegment.arrival.terminal}` : "T N/A"}
// //                           </p>
// //                         </div>
// //                       </div>

// //                       <div className="text-left sm:text-right mt-2 sm:mt-0">
// //                         <p className="text-xs sm:text-sm text-green-600 font-semibold">FILLING FAST</p>
// //                         <p className="text-lg sm:text-xl font-bold text-gray-800">
// //                           {currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$"}{price}
// //                         </p>
// //                         <p className="text-xs sm:text-sm text-indigo-600">+ Earn {rewards.toLocaleString("en-US")} Multifly Points</p>
// //                         <button
// //                           className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 w-full sm:w-auto"
// //                           onClick={() => handleBookNow(flight)}
// //                         >
// //                           Book Now
// //                         </button>
// //                       </div>
// //                     </div>
// //                   );
// //                 })
// //               ) : (
// //                 <p className="text-white text-lg sm:text-xl drop-shadow-md text-center py-6">No flights found with the applied filters.</p>
// //               )}
// //             </div>

// //             <div className="flex justify-center mt-6">
// //               <Button
// //                 className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-md hover:shadow-lg transition duration-300"
// //                 onClick={() => navigate("/")}
// //               >
// //                 Back to Search
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FlightResults;

// import React, { useState, useEffect, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import FilterSection from "../section/FilterSection";
// import HorizontalSearchForm from "../section/HorizontalSearchForm";
// import BookingResponse from "../pages/BookingResponse";

// const FlightResults = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Initialize state from location.state
//   const initialState = location.state || {};
//   const { flights = [], initialData = {} } = initialState;
//   const [originalFlights, setOriginalFlights] = useState(flights);
//   const [passengers, setPassengers] = useState(initialData.passengers || 1);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [filteredFlights, setFilteredFlights] = useState(originalFlights);

//   // Initialize searchFormData from initialData
//   const searchFormData = {
//     departure: initialData.departure || "",
//     destination: initialData.destination || "",
//     departureDate: initialData.departureDate || "",
//     returnDate: initialData.returnDate || "",
//     passengers: initialData.passengers || 1,
//   };

//   useEffect(() => {
//     // Update filteredFlights only if originalFlights changes
//     if (JSON.stringify(filteredFlights) !== JSON.stringify(originalFlights)) {
//       setFilteredFlights(originalFlights);
//     }
//   }, [originalFlights]);

//   const formatDuration = (duration) => {
//     const match = duration.match(/PT(\d+)H(?:(\d+)M)?/);
//     if (!match) return duration.replace("PT", "").toLowerCase();
//     const hours = match[1].padStart(2, "0");
//     const minutes = match[2] ? match[2].padStart(2, "0") : "00";
//     return `${hours}h ${minutes}m`;
//   };

//   const calculateStops = (segments) => {
//     return segments.length - 1;
//   };

//   const calculateRewards = (price) => {
//     return Math.floor(price / 10);
//   };

//   const filterFlights = (criteria) => {
//     let result = [...originalFlights];
//     if (criteria.priceRange) {
//       result = result.filter((flight) => parseFloat(flight.price.grandTotal) <= criteria.priceRange);
//     }
//     if (criteria.stops.length > 0) {
//       result = result.filter((flight) => {
//         const stopsCount = calculateStops(flight.itineraries[0].segments);
//         return (
//           (criteria.stops.includes("nonStop") && stopsCount === 0) ||
//           (criteria.stops.includes("oneStop") && stopsCount === 1) ||
//           (criteria.stops.includes("twoPlusStops") && stopsCount >= 2)
//         );
//       });
//     }
//     if (criteria.airlines.length > 0) {
//       result = result.filter((flight) =>
//         flight.validatingAirlineCodes.some((code) => criteria.airlines.includes(code))
//       );
//     }
//     if (criteria.departureTimes.length > 0) {
//       result = result.filter((flight) => {
//         const departureHour = new Date(flight.itineraries[0].segments[0].departure.at).getUTCHours();
//         return (
//           (criteria.departureTimes.includes("morning") && departureHour >= 6 && departureHour < 12) ||
//           (criteria.departureTimes.includes("afternoon") && departureHour >= 12 && departureHour < 18) ||
//           (criteria.departureTimes.includes("evening") && departureHour >= 18 && departureHour < 24)
//         );
//       });
//     }
//     if (criteria.arrivalTimes.length > 0) {
//       result = result.filter((flight) => {
//         const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
//         const arrivalHour = new Date(lastSegment.arrival.at).getUTCHours();
//         return (
//           (criteria.arrivalTimes.includes("morning") && arrivalHour >= 6 && arrivalHour < 12) ||
//           (criteria.arrivalTimes.includes("afternoon") && arrivalHour >= 12 && arrivalHour < 18) ||
//           (criteria.arrivalTimes.includes("evening") && arrivalHour >= 18 && arrivalHour < 24)
//         );
//       });
//     }
//     setFilteredFlights(result);
//   };

//   const handleSearchUpdate = useCallback(
//     (newSearchData) => {
//       // Only update if the search parameters have changed and flights data exists
//       const isDifferent =
//         newSearchData.departure !== searchFormData.departure ||
//         newSearchData.destination !== searchFormData.destination ||
//         newSearchData.departureDate !== searchFormData.departureDate ||
//         newSearchData.returnDate !== searchFormData.returnDate ||
//         newSearchData.passengers !== searchFormData.passengers;

//       if (isDifferent && newSearchData.flights && newSearchData.flights.length > 0) {
//         setOriginalFlights(newSearchData.flights);
//         setPassengers(newSearchData.passengers);
//         navigate("/flight-results", {
//           state: {
//             flights: newSearchData.flights,
//             initialData: {
//               departure: newSearchData.departure,
//               destination: newSearchData.destination,
//               departureDate: newSearchData.departureDate,
//               returnDate: newSearchData.returnDate,
//               passengers: newSearchData.passengers,
//             },
//           },
//           replace: true,
//         });
//       }
//     },
//     [navigate, searchFormData.departure, searchFormData.destination, searchFormData.departureDate, searchFormData.returnDate, searchFormData.passengers]
//   );

//   // const handleBookNow = async (flight) => {
//   //   const departureSegment = flight.itineraries[0].segments[0];
//   //   const arrivalSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
//   //   const departureTime = new Date(departureSegment.departure.at).toLocaleTimeString([], {
//   //     hour: "2-digit",
//   //     minute: "2-digit",
//   //     hour12: false,
//   //   });
//   //   const arrivalTime = new Date(arrivalSegment.arrival.at).toLocaleTimeString([], {
//   //     hour: "2-digit",
//   //     minute: "2-digit",
//   //     hour12: false,
//   //   });
//   //   const duration = formatDuration(flight.itineraries[0].duration);
//   //   const stops = calculateStops(flight.itineraries[0].segments);

//   //   const requestData = {
//   //     flightOffer: flight,
//   //   };

//   //   console.log("Sending request data:", JSON.stringify(requestData, null, 2));

//   //   try {
//   //     const response = await fetch("http://localhost:3000/api/flights/price", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(requestData),
//   //     });

//   //     if (!response.ok) {
//   //       const errorText = await response.text();
//   //       throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//   //     }

//   //     const data = await response.json();
//   //     console.log("API response:", data);

//   //     const transformedResponse = {
//   //       departure: flight.itineraries[0].segments[0].departure,
//   //       arrival: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival,
//   //       departureTime: departureTime,
//   //       arrivalTime: arrivalTime,
//   //       duration: duration,
//   //       stops: stops,
//   //       aircraft: "AIRBUS JET",
//   //       fare: parseFloat(flight.price.grandTotal) || 5387,
//   //       discount: 213.45,
//   //       insurance: 199,
//   //       additionalDiscount: 37.55,
//   //       totalAmount: parseFloat(flight.price.grandTotal) || 5335,
//   //     };

//   //     navigate("/booking", { state: { bookingResponse: transformedResponse } });
//   //   } catch (error) {
//   //     console.error("Error calling price API:", error.message);
//   //     alert("Failed to fetch price details. Please try again or contact support.");
//   //   }
//   // };

// //   const handleBookNow = async (flight) => {
// //   const departureSegment = flight.itineraries[0].segments[0];
// //   const arrivalSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
// //   const departureTime = new Date(departureSegment.departure.at).toLocaleTimeString([], {
// //     hour: "2-digit",
// //     minute: "2-digit",
// //     hour12: false,
// //   });
// //   const arrivalTime = new Date(arrivalSegment.arrival.at).toLocaleTimeString([], {
// //     hour: "2-digit",
// //     minute: "2-digit",
// //     hour12: false,
// //   });
// //   const duration = formatDuration(flight.itineraries[0].duration);
// //   const stops = calculateStops(flight.itineraries[0].segments);

// //   const requestData = {
// //     flightOffer: flight, // Send the entire flight object as expected by the backend
// //   };

// //   console.log("Sending request data:", JSON.stringify(requestData, null, 2));

// //   try {
// //     const response = await fetch("http://localhost:3000/api/flights/price", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         // Include authorization token if required by verifyToken middleware
// //         Authorization: `Bearer ${localStorage.getItem('token') || ''}`, // Adjust token storage as needed
// //       },
// //       body: JSON.stringify(requestData),
// //     });

// //     if (!response.ok) {
// //       const errorText = await response.text();
// //       throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
// //     }

// //     const data = await response.json();
// //     console.log("API response:", data);

// //     const transformedResponse = {
// //       departure: flight.itineraries[0].segments[0].departure,
// //       arrival: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival,
// //       departureTime: departureTime,
// //       arrivalTime: arrivalTime,
// //       duration: duration,
// //       stops: stops,
// //       aircraft: "AIRBUS JET",
// //       fare: parseFloat(flight.price.grandTotal) || 5387,
// //       discount: 213.45,
// //       insurance: 199,
// //       additionalDiscount: 37.55,
// //       totalAmount: parseFloat(flight.price.grandTotal) || 5335,
// //     };

// //     navigate("/booking", { state: { bookingResponse: transformedResponse } });
// //   } catch (error) {
// //     console.error("Error calling price API:", error.message);
// //     alert("Failed to fetch price details. Please try again or contact support.");
// //   }
// // };

// const handleBookNow = async (flight) => {
//   const departureSegment = flight.itineraries[0].segments[0];
//   const arrivalSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
//   const departureTime = new Date(departureSegment.departure.at).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });
//   const arrivalTime = new Date(arrivalSegment.arrival.at).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });
//   const duration = formatDuration(flight.itineraries[0].duration);
//   const stops = calculateStops(flight.itineraries[0].segments);

//   const requestData = {
//     flightOffer: flight, // Send the entire flight object as expected by the backend
//   };

//   console.log("Sending request data:", JSON.stringify(requestData, null, 2));

//   try {
//     const response = await fetch("http://localhost:3000/api/flights/price", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Updated to use auth_token from localStorage
//         Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
//       },
//       body: JSON.stringify(requestData),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//     }

//     const data = await response.json();
//     console.log("API response:", data);

//     const transformedResponse = {
//       departure: flight.itineraries[0].segments[0].departure,
//       arrival: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival,
//       departureTime: departureTime,
//       arrivalTime: arrivalTime,
//       duration: duration,
//       stops: stops,
//       aircraft: "AIRBUS JET",
//       fare: parseFloat(flight.price.grandTotal) || 5387,
//       discount: 213.45,
//       insurance: 199,
//       additionalDiscount: 37.55,
//       totalAmount: parseFloat(flight.price.grandTotal) || 5335,
//     };

//     navigate("/booking", { state: { bookingResponse: transformedResponse } });
//   } catch (error) {
//     console.error("Error calling price API:", error.message);
//     alert("Failed to fetch price details. Please try again or contact support.");
//   }
// };

//   return (
//     <div
//       className="min-h-screen bg-gray-100"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1507521628349-6e9b9a9a1f1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
//         <div className="sticky top-0 z-[2000] bg-opacity-95 backdrop-blur-md">
//           <HorizontalSearchForm initialData={searchFormData} onSearch={handleSearchUpdate} />
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="lg:w-1/4 lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] z-[1500]">
//             <FilterSection
//               isOpen={isFilterOpen}
//               onClose={() => setIsFilterOpen(false)}
//               flights={originalFlights}
//               onFilterChange={filterFlights}
//             />
//             <button
//               className="lg:hidden mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//             >
//               {isFilterOpen ? "Close Filters" : "Open Filters"}
//             </button>
//           </div>

//           <div className="lg:w-3/4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white bg-opacity-90 backdrop-blur-md p-4 rounded-xl shadow-md">
//               <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 drop-shadow-lg">MultiflyTravel</h1>
//               <div className="flex flex-col sm:flex-row sm:space-x-4 text-gray-700 mt-2 sm:mt-0">
//                 <p className="text-sm sm:text-base drop-shadow-md">
//                   {filteredFlights[0]?.itineraries[0]?.segments[0]?.departure.iataCode || "N/A"} -{" "}
//                   {filteredFlights[0]?.itineraries[0]?.segments[filteredFlights[0]?.itineraries[0]?.segments.length - 1]?.arrival.iataCode || "N/A"}
//                 </p>
//                 <p className="text-sm sm:text-base drop-shadow-md">
//                   {filteredFlights[0]?.itineraries[0]?.segments[0]?.departure.at
//                     ? new Date(filteredFlights[0].itineraries[0].segments[0].departure.at).toLocaleDateString("en-US", { day: "numeric", month: "short" })
//                     : "N/A"}
//                 </p>
//                 <p className="text-sm sm:text-base drop-shadow-md">{passengers} Passenger{passengers !== 1 ? "s" : ""}</p>
//               </div>
//             </div>

//             <div className="max-h-[calc(100vh-12rem)] overflow-y-auto no-scroll space-y-4 pr-2">
//               {filteredFlights.length > 0 ? (
//                 filteredFlights.map((flight, index) => {
//                   const departureSegment = flight.itineraries[0].segments[0];
//                   const arrivalSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
//                   const departureTime = departureSegment.departure.at
//                     ? new Date(departureSegment.departure.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
//                     : "N/A";
//                   const arrivalTime = arrivalSegment.arrival.at
//                     ? new Date(arrivalSegment.arrival.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
//                     : "N/A";
//                   const duration = flight.itineraries[0].duration ? formatDuration(flight.itineraries[0].duration) : "N/A";
//                   const stops = calculateStops(flight.itineraries[0].segments);
//                   const price = flight.price?.grandTotal
//                     ? parseFloat(flight.price.grandTotal).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
//                     : "N/A";
//                   const rewards = flight.price?.grandTotal ? calculateRewards(parseFloat(flight.price.grandTotal)) : 0;
//                   const currency = flight.price?.currency || "USD";

//                   return (
//                     <div
//                       key={index}
//                       className="bg-white bg-opacity-95 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between"
//                     >
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
//                         <div className="flex space-x-2">
//                           {flight.validatingAirlineCodes.map((code, idx) => (
//                             <div
//                               key={idx}
//                               className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full shadow-md"
//                             ></div>
//                           ))}
//                         </div>
//                         <div className="text-sm text-gray-700 font-medium">
//                           {flight.validatingAirlineCodes.map((code, idx) => (
//                             <span key={idx}>
//                               {code} {flight.itineraries[0].segments[idx]?.number || "N/A"}
//                               {idx < flight.validatingAirlineCodes.length - 1 && " + "}
//                             </span>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-2 sm:mt-0">
//                         <div className="text-center">
//                           <p className="text-lg sm:text-xl font-bold text-gray-800">{departureTime}</p>
//                           <p className="text-xs sm:text-sm text-gray-600">
//                             {departureSegment.departure.iataCode || "N/A"},{" "}
//                             {departureSegment.departure.terminal ? `T${departureSegment.departure.terminal}` : "T N/A"}
//                           </p>
//                         </div>
//                         <div className="text-center">
//                           <p className="text-sm text-gray-600 font-medium">{duration}</p>
//                           <p className="text-xs text-gray-500">{stops} stop{stops !== 1 ? "s" : ""}</p>
//                           <div className="flex items-center justify-center mt-1">
//                             <div className="h-px w-6 sm:w-8 bg-gray-400"></div>
//                             <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
//                             <div className="h-px w-6 sm:w-8 bg-gray-400"></div>
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <p className="text-lg sm:text-xl font-bold text-gray-800">{arrivalTime}</p>
//                           <p className="text-xs sm:text-sm text-gray-600">
//                             {arrivalSegment.arrival.iataCode || "N/A"},{" "}
//                             {arrivalSegment.arrival.terminal ? `T${arrivalSegment.arrival.terminal}` : "T N/A"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="text-left sm:text-right mt-2 sm:mt-0">
//                         <p className="text-xs sm:text-sm text-green-600 font-semibold">FILLING FAST</p>
//                         <p className="text-lg sm:text-xl font-bold text-gray-800">
//                           {currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$"}{price}
//                         </p>
//                         <p className="text-xs sm:text-sm text-indigo-600">+ Earn {rewards.toLocaleString("en-US")} Multifly Points</p>
//                         <button
//                           className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 w-full sm:w-auto"
//                           onClick={() => handleBookNow(flight)}
//                         >
//                           Book Now
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="text-white text-lg sm:text-xl drop-shadow-md text-center py-6">No flights found with the applied filters.</p>
//               )}
//             </div>

//             <div className="flex justify-center mt-6">
//               <Button
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-md hover:shadow-lg transition duration-300"
//                 onClick={() => navigate("/")}
//               >
//                 Back to Search
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlightResults;