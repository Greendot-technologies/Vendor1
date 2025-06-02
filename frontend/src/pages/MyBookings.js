
import ItinerarySearchComponent from "../components/ItinerarySearchComponent";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import Sidebardash from "../components/Sidebardash";
import TravelCalendarSection from "../components/TravelCalendarSection";
import { useState } from "react";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("Itineraries");

  const sidebarItems = [
    "Itineraries",
    "Return Ticket Itinerary",
    "View Cancellations",
    "Travel Calendar",
    "Re-Issue Itinerary",
    "IRCTC Refund Pending",
    "Rail Request",
    "Rail Rebook",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Itineraries":
        return (
          <ItinerarySearchComponent
            title="Itinerary Search"
            searchCriteriaOptions={["Reference No", "PNR", "Pax Name", "Email", "Mobile", "Offline Itineraries"]}
            defaultSearchCriteria="Reference No"
            additionalFields={["Search Text"]}
            mandatoryFields={["Search Criteria", "Service", "Status", "From Date", "To Date"]}
          />
        );
      case "Return Ticket Itinerary":
        return (
          <ItinerarySearchComponent
            title="Return Ticket Itinerary"
            searchCriteriaOptions={["Reference No","PNR", "Pax Name", "Email", "Mobile", "Offline Itineraries"]}
            defaultSearchCriteria="Reference No"
            additionalFields={["Search Text","Airline"]}
            mandatoryFields={["Search Criteria", "Payment Status", "Status", "From Date", "To Date"]}
          />
        );
      case "View Cancellations":
        return (
          <ItinerarySearchComponent
            title="Cancellations"
            searchCriteriaOptions={["Cancellation Id","Transaction Id"]}
            defaultSearchCriteria="Cancellation Id"
            additionalFields={["Search Text"]}
            mandatoryFields={["Search Criteria", "Service", "Status", "From Date", "To Date"]}
          />
        );
      case "Re-Issue Itinerary":
        return (
          <ItinerarySearchComponent
            title="Re-Issue Itinerary Search"
            searchCriteriaOptions={["Cancellation Id","Transaction Id", "PNR"]}
            defaultSearchCriteria="Cancellation Id"
            additionalFields={["Search Text"]}
            mandatoryFields={["Search Criteria", "From Date", "To Date"]}
          />
        );
      case "IRCTC Refund Pending":
        return (
          <ItinerarySearchComponent
            title="IRCTC Refund Pending"
            searchCriteriaOptions={["Reference No", "PNR", "Pax Name", "Email", "Mobile", "Offline Itineraries"]}
            defaultSearchCriteria="Reference No"
            additionalFields={["Search Text"]}
            mandatoryFields={["Search Criteria", "From Date", "To Date"]}
          />
        );  
      case "Rail Request":    
        return (
          <ItinerarySearchComponent
            title="Rail Request"
            searchCriteriaOptions={["Pax Name", "Email", "Mob No.", "Request Id"]}
            defaultSearchCriteria="Pax Name"
            additionalFields={["Search Text"]}
            mandatoryFields={["Search Criteria", "From Date", "To Date"]}
          />
        );
      case "Rail Rebook": 
        return (
          <ItinerarySearchComponent
            title="Rail Rebook"
            searchCriteriaOptions={["Reference No", "PNR", "Pax Name", "Email", "Mobile", "Offline Itineraries"]}
            defaultSearchCriteria="Reference No"
            additionalFields={["Search Text"]}
            mandatoryFields={["Search Criteria", "From Date", "To Date"]}
          />
        );
      case "Travel Calendar":
        return <TravelCalendarSection />;
      default:
        return <div className="text-center text-gray-500">Coming Soon!</div>;
    }
  };

  return (
    <section className="bg-gray-200 min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="p-4">
        {/* Show DashboardHeader only on large devices */}
        <div className="hidden lg:block">
          <DashboardHeader />
        </div>
         
        {/* Layout Wrapper */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:ml-[100px] lg:mr-[100px] lg:gap-6">
          {/* Sidebar (top on mobile, left on large screens) */}
          <Sidebardash activeTab={activeTab} setActiveTab={setActiveTab} sidebarItems={sidebarItems} />

          {/* Main Section */}
          <div className="flex-1 bg-white rounded-lg shadow p-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBookings;