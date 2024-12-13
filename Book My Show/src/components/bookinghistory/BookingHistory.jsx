import React, { useState } from "react";
import "./BookingHistory.css";

const bookingsData = {
  previous: [
    // Example data
    { id: "B001", title: "Movie A", theatre: "Theatre X", timing: "2024-11-01T18:30", seats: "A1, A2", price: 300, paid: 600 },
    { id: "B002", title: "Movie B", theatre: "Theatre Y", timing: "2024-10-20T15:00", seats: "B1, B2", price: 400, paid: 800 },
  ],
  upcoming: [
    // Example data
    { id: "B003", title: "Movie C", theatre: "Theatre Z", timing: "2024-12-15T20:00", seats: "C1, C2", price: 350, paid: 700 },
    { id: "B004", title: "Movie D", theatre: "Theatre X", timing: "2024-12-25T18:00", seats: "D1, D2", price: 500, paid: 1000 },
  ],
};

const BookingHistory = () => {
  const [activeTab, setActiveTab] = useState("previous");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const bookings = bookingsData[activeTab]
    .filter((booking) => new Date(booking.timing) !== "Invalid Date") // Remove invalid transactions
    .sort((a, b) => 
      activeTab === "previous" 
        ? new Date(b.timing) - new Date(a.timing)
        : new Date(a.timing) - new Date(b.timing)
    );

  const paginatedBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="booking-history">
      <h2>Booking History</h2>
      <div className="tabs">
        <button
          className={activeTab === "previous" ? "active" : ""}
          onClick={() => handleTabChange("previous")}
        >
          Previous Bookings
        </button>
        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => handleTabChange("upcoming")}
        >
          Upcoming Bookings
        </button>
      </div>
      <div className="bookings-list">
        {paginatedBookings.map((booking) => (
          <div key={booking.id} className="booking-item">
            <div>
              <strong>{booking.title}</strong> at {booking.theatre}
              <p>
                {new Date(booking.timing).toLocaleString()} | Seats: {booking.seats}
              </p>
              <p>
                Ticket Price: ₹{booking.price} | Amount Paid: ₹{booking.paid}
              </p>
            </div>
            <div className="booking-id">ID: {booking.id}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(bookings.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
