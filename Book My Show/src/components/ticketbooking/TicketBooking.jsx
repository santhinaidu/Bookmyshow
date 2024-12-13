import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TicketBooking.css";
import { Link } from "react-router-dom";

function TicketBooking() {
    const [theaters, setTheaters] = useState([]);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        // Fetch theater data
        axios
            .get("https://mocki.io/v1/510e9776-abf0-4e0c-8150-f4bd188521c3")
            .then((response) => {
                setTheaters(response.data);
            })
            .catch((err) => console.error("Error fetching theater data:", err));

        // Generate dynamic dates (next 7 days)
        const today = new Date();
        const tempDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            return {
                day: date.toLocaleDateString("en-US", { weekday: "short" }),
                date: date.getDate(),
                month: date.toLocaleDateString("en-US", { month: "short" }),
                fullDate: date.toISOString().split("T")[0],
            };
        });
        setDates(tempDates);
        setSelectedDate(tempDates[0].fullDate);
    }, []);

    return (
        <div className="ticket-booking-container">
            {/* Movie Header */}
            <h1>Amaran (Telugu) - Telugu</h1>
            <div className="tags">
                <span>UA</span>
                <span>Action</span>
                <span>Drama</span>
                <span>Thriller</span>
            </div>
            <hr />

            <div className="dataandfilters">

            {/* Date Navigation */}
            <div className="date-selector">
                {dates.map((date, index) => (
                    <div
                        key={index}
                        className={`date-item ${
                            selectedDate === date.fullDate ? "active" : ""
                        }`}
                        onClick={() => setSelectedDate(date.fullDate)}
                    >
                        <span className="day">{date.day}</span>
                        <span className="date">{date.date}</span>
                        <span className="month">{date.month}</span>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="filters">
                <select>
                    <option>Filter Price Range</option>
                </select>
                <select>
                    <option>Filter Show Timings</option>
                </select>
                <button className="search-button">🔍</button>
            </div>

            </div>
            <hr />

            {/* Theater List */}
            <ul className="theater-list">
                {theaters.map((theater, index) => (
                    <li key={index} className="theater-item">
                        <div className="theater-info">
                            <i className="bi bi-heart"></i>
                            <strong>{theater.Theatrename}</strong>:{" "}
                            <span>{theater.Area}</span>
                        </div>
                        <div className="amenities">
                            <span>
                                <i className="bi bi-phone"></i> M-Ticket
                            </span>
                            <span>
                                <i className="bi bi-house-door"></i> Food & Beverage
                            </span>
                        </div>
                     <div className="showtimes">
                  <Link to={"/SeatLayout"}><button>11:30 AM</button>
                    <button>02:30 PM</button>
                    <button>06:30 PM</button>
                    <button>09:30 PM</button></Link>  
                </div>
                <div className="note">
                    {index % 2 === 0 ? "Non-cancellable" : "Cancellation Available"}
                </div>
                        
                    </li>
                  
                ))}

            </ul>
        </div>
    );
}

export default TicketBooking;