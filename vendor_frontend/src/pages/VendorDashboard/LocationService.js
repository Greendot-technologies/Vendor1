// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";
// import { toast } from "react-toastify";

// const API_BASE = "http://localhost:5000/api";

// const LocationService = () => {
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const fetchLocations = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("vendor_token");

//       const res = await axios.get(`${API_BASE}/vendor/locations`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const flattened = [];

//       res.data.forEach((country) => {
//         country.states?.forEach((state) => {
//           state.districts?.forEach((district) => {
//             district.cities?.forEach((city) => {
//               city.pincodes?.forEach((pincode) => {
//                 flattened.push({
//                   country: country.name,
//                   state: state.name,
//                   district: district.name,
//                   city: city.name,
//                   pincode: pincode.pincode,
//                   pincode_id: pincode.id,
//                   is_enabled: pincode.is_enabled,
//                 });
//               });
//             });
//           });
//         });
//       });

//       setLocations(flattened);
//     } catch (err) {
//       toast.error("Failed to load locations.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePincode = async (id, currentStatus) => {
//     try {
//       const token = localStorage.getItem("vendor_token");
//       const url = `${API_BASE}/vendor/pincodes/${id}/${currentStatus ? "disable" : "enable"}`;

//       await axios.put(url, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast.success(`Pincode ${currentStatus ? "disabled" : "enabled"} successfully`);
//       fetchLocations();
//     } catch (err) {
//       toast.error("Failed to update pincode.");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   const filteredData = locations.filter((item) => {
//     const keyword = search.toLowerCase();
//     return (
//       item.city.toLowerCase().includes(keyword) ||
//       item.district.toLowerCase().includes(keyword) ||
//       item.pincode.toLowerCase().includes(keyword)
//     );
//   });

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="flex">
//       <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
//       <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"} w-full`}>
//         <div className="sticky top-0 z-20 bg-white shadow-sm">
//           <Header title="Pincode Management" setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
//         </div>
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Pincode List</h2>

//           <input
//             type="text"
//             placeholder="Search by city, district or pincode"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border px-4 py-2 rounded-md mb-4 w-full md:w-1/2"
//           />

//           <table className="w-full table-auto border">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="p-2 border">Sr.no</th>
//                 <th className="p-2 border">Country</th>
//                 <th className="p-2 border">State</th>
//                 <th className="p-2 border">District</th>
//                 <th className="p-2 border">City</th>
//                 <th className="p-2 border">Pincode</th>
//                 <th className="p-2 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan={7} className="text-center p-4">Loading...</td></tr>
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((item, index) => (
//                   <tr key={item.pincode_id}>
//                     <td className="p-2 border">{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                     <td className="p-2 border">{item.country}</td>
//                     <td className="p-2 border">{item.state}</td>
//                     <td className="p-2 border">{item.district}</td>
//                     <td className="p-2 border">{item.city}</td>
//                     <td className="p-2 border">{item.pincode}</td>
//                     <td className="p-2 border">
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={item.is_enabled}
//                           onChange={() => togglePincode(item.pincode_id, item.is_enabled)}
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative transition-all duration-300">
//                           <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
//                         </div>
//                       </label>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr><td colSpan={7} className="text-center p-4 text-gray-500">No data found.</td></tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination Controls */}
//           <div className="flex justify-between items-center mt-4">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//               disabled={currentPage === 1}
//             >
//               Prev
//             </button>
//             <p>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</p>
//             <button
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//               disabled={currentPage * itemsPerPage >= filteredData.length}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationService;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { toast } from "react-toastify";

// const API_BASE = "http://localhost:5000/api";

const API_BASE = "http://35.154.158.45:5000/api";

const LocationService = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    country_id: "",
    state_id: "",
    district_id: "",
    city_id: "",
    pincode_id: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [pincodes, setPincodes] = useState([]);

  // Fetch locations for the logged-in vendor
  const fetchLocations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("vendor_token");
      const res = await axios.get(`${API_BASE}/vendor-locations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(res.data.locations);
    } catch (err) {
      toast.error("Failed to load locations.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch countries (public API)
  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${API_BASE}/vendor-locations/countries`);
      setCountries(res.data.countries);
    } catch (err) {
      toast.error("Failed to load countries.");
      console.error(err);
    }
  };

  // Fetch states by country (public API)
  const fetchStates = async (country_id) => {
    if (!country_id) {
      setStates([]);
      return;
    }
    try {
      const res = await axios.get(
        `${API_BASE}/vendor-locations/states/${country_id}`
      );
      setStates(res.data.states);
    } catch (err) {
      toast.error("Failed to load states.");
      console.error(err);
    }
  };

  // Fetch districts by state (public API)
  const fetchDistricts = async (state_id) => {
    if (!state_id) {
      setDistricts([]);
      return;
    }
    try {
      const res = await axios.get(
        `${API_BASE}/vendor-locations/districts/${state_id}`
      );
      setDistricts(res.data.districts);
    } catch (err) {
      toast.error("Failed to load districts.");
      console.error(err);
    }
  };

  // Fetch cities by district (public API)
  const fetchCities = async (district_id) => {
    if (!district_id) {
      setCities([]);
      return;
    }
    try {
      const res = await axios.get(
        `${API_BASE}/vendor-locations/cities/${district_id}`
      );
      setCities(res.data.cities);
    } catch (err) {
      toast.error("Failed to load cities.");
      console.error(err);
    }
  };

  // Fetch pincodes by city (public API)
  const fetchPincodes = async (city_id) => {
    if (!city_id) {
      setPincodes([]);
      return;
    }
    try {
      const res = await axios.get(
        `${API_BASE}/vendor-locations/pincodes/${city_id}`
      );
      setPincodes(res.data.pincodes);
    } catch (err) {
      toast.error("Failed to load pincodes.");
      console.error(err);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Cascade fetch calls for dependent dropdowns
    if (name === "country_id") {
      setFormData((prev) => ({
        ...prev,
        state_id: "",
        district_id: "",
        city_id: "",
        pincode_id: "",
      }));
      setStates([]);
      setDistricts([]);
      setCities([]);
      setPincodes([]);
      fetchStates(value);
    } else if (name === "state_id") {
      setFormData((prev) => ({
        ...prev,
        district_id: "",
        city_id: "",
        pincode_id: "",
      }));
      setDistricts([]);
      setCities([]);
      setPincodes([]);
      fetchDistricts(value);
    } else if (name === "district_id") {
      setFormData((prev) => ({ ...prev, city_id: "", pincode_id: "" }));
      setCities([]);
      setPincodes([]);
      fetchCities(value);
    } else if (name === "city_id") {
      setFormData((prev) => ({ ...prev, pincode_id: "" }));
      setPincodes([]);
      fetchPincodes(value);
    }
  };

  // Submit new location
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("vendor_token");
      await axios.post(`${API_BASE}/vendor-locations`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Location added successfully");
      setIsModalOpen(false);
      setFormData({
        country_id: "",
        state_id: "",
        district_id: "",
        city_id: "",
        pincode_id: "",
      });
      fetchLocations();
    } catch (err) {
      toast.error("Failed to add location.");
      console.error(err);
    }
  };

  // Toggle location status
  const toggleLocationStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("vendor_token");
      await axios.put(
        `${API_BASE}/vendor-locations/toggle/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(
        `Location ${currentStatus ? "disabled" : "enabled"} successfully`
      );
      fetchLocations();
    } catch (err) {
      toast.error("Failed to update location status.");
      console.error(err);
    }
  };

  // Fetch initial data
  useEffect(() => {
    fetchLocations();
    fetchCountries();
  }, []);

  // Filter and paginate data
  const filteredData = locations.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.country_name.toLowerCase().includes(keyword) ||
      item.state_name.toLowerCase().includes(keyword) ||
      item.district_name.toLowerCase().includes(keyword) ||
      item.city_name.toLowerCase().includes(keyword) ||
      item.pincode.toLowerCase().includes(keyword)
    );
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } w-full`}
      >
        <div className="sticky top-0 z-20 bg-white shadow-sm">
          <Header
            title="Location Management"
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Location List</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Location
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by country, state, district, city, or pincode"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-md mb-4 w-full md:w-1/2"
          />

          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Sr.no</th>
                <th className="p-2 border">Country</th>
                <th className="p-2 border">State</th>
                <th className="p-2 border">District</th>
                <th className="p-2 border">City</th>
                <th className="p-2 border">Pincode</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="p-2 border">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="p-2 border">{item.country_name}</td>
                    <td className="p-2 border">{item.state_name}</td>
                    <td className="p-2 border">{item.district_name}</td>
                    <td className="p-2 border">{item.city_name}</td>
                    <td className="p-2 border">{item.pincode}</td>
                    <td className="p-2 border">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.is_enabled}
                          onChange={() =>
                            toggleLocationStatus(item.id, item.is_enabled)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative transition-all duration-300">
                          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-500">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <p>
              Page {currentPage} of{" "}
              {Math.ceil(filteredData.length / itemsPerPage)}
            </p>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={currentPage * itemsPerPage >= filteredData.length}
            >
              Next
            </button>
          </div>

          {/* Modal for Adding Location */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Add New Location</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <select
                      name="country_id"
                      value={formData.country_id}
                      onChange={handleInputChange}
                      className="border px-3 py-2 rounded w-full"
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <select
                      name="state_id"
                      value={formData.state_id}
                      onChange={handleInputChange}
                      className="border px-3 py-2 rounded w-full"
                      required
                      disabled={!formData.country_id}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      District
                    </label>
                    <select
                      name="district_id"
                      value={formData.district_id}
                      onChange={handleInputChange}
                      className="border px-3 py-2 rounded w-full"
                      required
                      disabled={!formData.state_id}
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <select
                      name="city_id"
                      value={formData.city_id}
                      onChange={handleInputChange}
                      className="border px-3 py-2 rounded w-full"
                      required
                      disabled={!formData.district_id}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Pincode
                    </label>
                    <select
                      name="pincode_id"
                      value={formData.pincode_id}
                      onChange={handleInputChange}
                      className="border px-3 py-2 rounded w-full"
                      required
                      disabled={!formData.city_id}
                    >
                      <option value="">Select Pincode</option>
                      {pincodes.map((pincode) => (
                        <option key={pincode.id} value={pincode.id}>
                          {pincode.pincode}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationService;
