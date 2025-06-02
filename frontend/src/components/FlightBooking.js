
import FlightSearchCard from "./FlightSearchCard";

export default function FlightBooking() {
  return (
    <div className="flex flex-col">
      <div className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 text-center">
        Book a flight
      </div>
      <div className="flex justify-center">
        <FlightSearchCard />
      </div>
    </div>
  );
}