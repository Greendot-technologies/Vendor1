

import { useState } from "react";
import Button from "./Button"; // Assuming you have a Button component

const TravellerProfileSearch = ({ 
  title, 
  searchCriteriaOptions, 
  defaultSearchCriteria, 
  onSearch, 
  onDelete,
  selectedProfiles,
}) => {
  const [searchType, setSearchType] = useState(defaultSearchCriteria || "All");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchType);
  };

  return (
  
    <form onSubmit={handleSearch} className="p-4">
  {/* Title Row with Add New Profile aligned to right */}
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold">{title}</h2>
    {/* <Button
      type="button"
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md text-sm"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      Add New Profile
    </Button> */}
  </div>

  {/* Search Options Row */}
  <div className="flex flex-wrap items-center gap-3 mb-4">
    {/* Search Dropdown */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <label className="text-sm font-medium">Select Search Type</label>
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm w-40"
      >
        {searchCriteriaOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>

    {/* Search Button */}
    <Button
      type="submit"
      className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-md text-sm"
    >
      Search
    </Button>

    {/* Select All Checkbox */}
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        onChange={(e) => {
          if (onDelete) onDelete(e.target.checked);
        }}
        className="accent-lime-500"
      />
      Select All
    </label>

    {/* Delete Button */}
    <Button
      type="button"
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md text-sm"
      onClick={() => onDelete(false)}
      disabled={selectedProfiles.length === 0}
    >
      Delete
    </Button>
  </div>
</form>

  );
};

export default TravellerProfileSearch;