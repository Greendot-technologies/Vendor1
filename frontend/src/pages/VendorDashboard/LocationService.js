

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { toast } from "react-toastify";

const API_BASE = "http://localhost:5000/api";

const LocationService = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("vendor_token");

      const res = await axios.get(`${API_BASE}/vendor/locations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const flattened = [];

      res.data.forEach((country) => {
        country.states?.forEach((state) => {
          state.districts?.forEach((district) => {
            district.cities?.forEach((city) => {
              city.pincodes?.forEach((pincode) => {
                flattened.push({
                  country: country.name,
                  state: state.name,
                  district: district.name,
                  city: city.name,
                  pincode: pincode.pincode,
                  pincode_id: pincode.id,
                  is_enabled: pincode.is_enabled,
                });
              });
            });
          });
        });
      });

      setLocations(flattened);
    } catch (err) {
      toast.error("Failed to load locations.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePincode = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("vendor_token");
      const url = `${API_BASE}/vendor/pincodes/${id}/${currentStatus ? "disable" : "enable"}`;

      await axios.put(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`Pincode ${currentStatus ? "disabled" : "enabled"} successfully`);
      fetchLocations();
    } catch (err) {
      toast.error("Failed to update pincode.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const filteredData = locations.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.city.toLowerCase().includes(keyword) ||
      item.district.toLowerCase().includes(keyword) ||
      item.pincode.toLowerCase().includes(keyword)
    );
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"} w-full`}>
        <div className="sticky top-0 z-20 bg-white shadow-sm">
          <Header title="Pincode Management" setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Pincode List</h2>

          <input
            type="text"
            placeholder="Search by city, district or pincode"
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
                <tr><td colSpan={7} className="text-center p-4">Loading...</td></tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item.pincode_id}>
                    <td className="p-2 border">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="p-2 border">{item.country}</td>
                    <td className="p-2 border">{item.state}</td>
                    <td className="p-2 border">{item.district}</td>
                    <td className="p-2 border">{item.city}</td>
                    <td className="p-2 border">{item.pincode}</td>
                    <td className="p-2 border">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.is_enabled}
                          onChange={() => togglePincode(item.pincode_id, item.is_enabled)}
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
                <tr><td colSpan={7} className="text-center p-4 text-gray-500">No data found.</td></tr>
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
            <p>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</p>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={currentPage * itemsPerPage >= filteredData.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationService;
