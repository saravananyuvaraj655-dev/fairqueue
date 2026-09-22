import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

// ==========================================
// HELPER FUNCTION
// ==========================================

const fetchEventsFromServer = async () => {
    const response = await axios.get(
        "http://localhost:5000/api/events"
    );

    if (!response.data.success) {
        throw new Error("Failed to fetch events");
    }

    return response.data.events;
};


// ==========================================
// EVENTS COMPONENT
// ==========================================

export default function Events() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // GET EVENTS
    // ==========================================

    useEffect(() => {

        const loadEvents = async () => {

            try {

                const data = await fetchEventsFromServer();

                console.log("Events received:", data);

                setEvents(data);

            } catch (error) {

                console.error("Event Fetch Error:", error);

                setError(
                    "Unable to connect to FairQueue server."
                );

            } finally {

                setLoading(false);

            }

        };

        loadEvents();

    }, []);


    // ==========================================
    // REST OF YOUR CODE
    // ==========================================


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="page-center">

                <h2>
                    Loading events...
                </h2>

                <p>
                    Connecting to FairQueue server
                </p>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="page-center">

                <h2>
                    ⚠️ {error}
                </h2>

                <p>
                    Make sure the Express server
                    and MongoDB are running.
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="retry-button"
                >
                    Retry
                </button>

            </div>

        );

    }


    // ==========================================
    // NO EVENTS
    // ==========================================

    if (events.length === 0) {

        return (

            <div className="events-page">

                <nav className="navbar">

                    <div className="logo">
                        🎟️ FairQueue
                    </div>

                    <div className="nav-links">

                        <Link href="/user/dashboard">
                            Dashboard
                        </Link>

                        <Link href="/user/events">
                            Events
                        </Link>

                        <Link href="/user/my-tickets">
                            My Tickets
                        </Link>

                    </div>

                </nav>

                <main className="events-container">

                    <div className="page-header">

                        <p>
                            FairQueue
                        </p>

                        <h1>
                            Upcoming Events
                        </h1>

                        <span>
                            No events are currently available.
                        </span>

                    </div>

                </main>

            </div>

        );

    }


    // ==========================================
    // MAIN PAGE
    // ==========================================

    return (

        <div className="events-page">


            {/* ==================================
                NAVBAR
            ================================== */}

            <nav className="navbar">

                <div className="logo">

                    🎟️ FairQueue

                </div>


                <div className="nav-links">

                    <Link href="/user/dashboard">
                        Dashboard
                    </Link>

                    <Link href="/user/events">
                        Events
                    </Link>

                    <Link href="/user/my-tickets">
                        My Tickets
                    </Link>

                </div>

            </nav>


            {/* ==================================
                MAIN CONTENT
            ================================== */}

            <main className="events-container">


                {/* ==================================
                    PAGE HEADER
                ================================== */}

                <div className="page-header">

                    <p>
                        FairQueue
                    </p>

                    <h1>
                        Upcoming Events
                    </h1>

                    <span>
                        Select an event to start your booking.
                    </span>

                </div>


                {/* ==================================
                    EVENT GRID
                ================================== */}

                <div className="event-grid">

                    {events.map((event) => (

                        <div
                            className="event-card"
                            key={event.eventId}
                        >


                            {/* EVENT IMAGE */}

                            <div className="event-image">

                                🎟️

                            </div>


                            {/* EVENT CONTENT */}

                            <div className="event-content">


                                {/* TITLE */}

                                <h2>
                                    {event.title}
                                </h2>


                                {/* DATE */}

                                <p>
                                    📅 {event.date}
                                </p>


                                {/* LOCATION */}

                                <p>
                                    📍 {event.location}
                                </p>


                                {/* TICKET INFORMATION */}

                                <div className="ticket-info">


                                    {/* PRICE */}

                                    <div>

                                        <span>
                                            Starting from
                                        </span>

                                        <strong>
                                            ₹{event.price}
                                        </strong>

                                    </div>


                                    {/* AVAILABLE TICKETS */}

                                    <div>

                                        <span>
                                            Available
                                        </span>

                                        <strong>
                                            {event.availableTickets}
                                        </strong>

                                    </div>


                                </div>


                                {/* BOOK BUTTON */}

                                <Link
                                    href={`/user/booking/${event.eventId}`}
                                    className="book-button"
                                >

                                    Book Ticket

                                </Link>


                            </div>

                        </div>

                    ))}

                </div>

            </main>

        </div>

    );}