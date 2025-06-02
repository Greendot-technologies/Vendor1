// import React from "react";

// const BookingResponse = ({ bookingResponse }) => {
//   const {
//     departure = { iataCode: "N/A", terminal: "N/A", at: "" },
//     arrival = { iataCode: "N/A", terminal: "N/A", at: "" },
//     departureTime = "N/A",
//     arrivalTime = "N/A",
//     duration = "N/A",
//     stops = 0,
//     aircraft = "AIRBUS JET",
//     fare = 5387,
//     discount = 213.45,
//     insurance = 199,
//     additionalDiscount = 37.55,
//     totalAmount = 5335,
//   } = bookingResponse || {};

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
//       <h2 className="text-2xl font-bold text-indigo-800 mb-4">Review your flight details</h2>
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg mb-4">
//         <div>
//           <p className="text-sm text-gray-600">DEPART</p>
//           <p className="font-semibold">
//             {departure.iataCode} → {arrival.iataCode}
//           </p>
//           <p className="text-xs text-gray-500">
//             {new Date(departure.at).toLocaleDateString("en-US", {
//               day: "2-digit",
//               month: "short",
//             }) || "N/A"}
//           </p>
//         </div>
//         <div className="text-center mt-2 sm:mt-0">
//           <p className="text-lg font-bold">{departureTime}</p>
//           <p className="text-xs text-gray-600">
//             {departure.iataCode}, Terminal {departure.terminal}
//           </p>
//         </div>
//         <div className="text-center mt-2 sm:mt-0">
//           <p className="text-sm text-gray-600">{duration}</p>
//           <p className="text-xs text-gray-500">{stops} stop{stops !== 1 ? "s" : ""}</p>
//           <div className="flex items-center justify-center mt-1">
//             <div className="h-px w-6 bg-gray-400"></div>
//             <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
//             <div className="h-px w-6 bg-gray-400"></div>
//           </div>
//         </div>
//         <div className="text-center mt-2 sm:mt-0">
//           <p className="text-lg font-bold">{arrivalTime}</p>
//           <p className="text-xs text-gray-600">
//             {arrival.iataCode}, Terminal {arrival.terminal}
//           </p>
//         </div>
//       </div>
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg">
//         <div>
//           <p className="text-sm text-gray-600">Aircraft</p>
//           <p className="font-semibold">{aircraft}</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-600">Travel Class</p>
//           <p className="font-semibold">Economy</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-600">Check-In Baggage</p>
//           <p className="font-semibold">Adult - 15kg</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-600">Cabin Baggage</p>
//           <p className="font-semibold">Adult - 7kg</p>
//         </div>
//       </div>
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold text-gray-800">Fare Summary</h3>
//         <div className="space-y-2 mt-2">
//           <div className="flex justify-between">
//             <span>Fare</span>
//             <span>₹{fare}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Instant Discount</span>
//             <span>₹{discount}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Insurance</span>
//             <span>₹{insurance}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Discount</span>
//             <span>₹{additionalDiscount}</span>
//           </div>
//           <div className="flex justify-between font-bold text-lg">
//             <span>Total Amount:</span>
//             <span>₹{totalAmount}</span>
//           </div>
//         </div>
//         <div className="mt-4">
//           <p className="text-sm text-gray-600">INFO: Meal, seat, rescheduling & cancellation are chargeable.</p>
//         </div>
//         <div className="mt-6 flex justify-between">
//           <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200">
//             Log in to your Multifly account
//           </button>
//           <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200">
//             Continue as Guest
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingResponse;