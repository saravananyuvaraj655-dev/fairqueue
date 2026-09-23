import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function BookingPage() {

    const router = useRouter();

    const { eventId } = router.query;

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [error, setError] = useState("");


    // ==========================================
    // GET EVENT
    // ==========================================

    useEffect(() => {

        if (!eventId) return;

        const loadEvent = async () => {

            try {

                const response = await axios.get(
                    ` https://fairqueue-1.onrender.com/api/events/${eventId}`
                );

                if (!response.data.success) {
                    throw new Error("Event not found");
                }

                setEvent(response.data.event);

            } catch (error) {

                console.error(error);

                setError("Unable to load event.");

            } finally {

                setLoading(false);

            }

        };

        loadEvent();

    }, [eventId]);


    // ==========================================
    // JOIN FAIRQUEUE
    // ==========================================

    const joinQueue = async () => {
    try {
        setJoining(true);
        setError("");

        // Create user ID only once
        let userId = localStorage.getItem(
            "fairqueue_user_id"
        );

        if (!userId) {
            userId =
                "USER_" +
                Date.now() +
                "_" +
                Math.random()
                    .toString(36)
                    .substring(2, 8);

            localStorage.setItem(
                "fairqueue_user_id",
                userId
            );
        }

        // Remember selected event
        localStorage.setItem(
            "fairqueue_event_id",
            eventId
        );

        const response = await axios.post(
            "https://fairqueue-1.onrender.com/api/queue/join",
            {
                userId,
                eventId
            }
        );

        console.log(
            "Queue response:",
            response.data
        );

        // ==================================
        // RATE LIMIT / SERVER BACKPRESSURE
        // ==================================

        if (response.status === 429) {
            setError(
                response.data.message ||
                "Too many requests. Please wait."
            );

            return;
        }

        // ==================================
        // ALWAYS GO TO WAITING ROOM
        // ==================================

        router.push(
            `/user/waiting-room?eventId=${eventId}`
        );

    } catch (error) {
        console.error(
            "Queue Join Error:",
            error
        );

        setError(
            error.response?.data?.message ||
            "Unable to join FairQueue."
        );
    } finally {
        setJoining(false);
    }
};


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="page-center">
                <h2>Loading event...</h2>
            </div>
        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error && !event) {

        return (
            <div className="page-center">
                <h2>⚠️ {error}</h2>
            </div>
        );

    }


    // ==========================================
    // EVENT NOT FOUND
    // ==========================================

    if (!event) {

        return (
            <div className="page-center">
                <h2>Event not found</h2>
            </div>
        );

    }


    // ==========================================
    // MAIN
    // ==========================================

    return (

        <div className="events-page">

            <main className="events-container">

                <div className="page-header">

                    <p>FairQueue</p>

                    <h1>
                        {event.title}
                    </h1>

                    <span>
                        Join the fair virtual queue
                        before selecting your tickets.
                    </span>

                </div>


                <div className="event-card">

                    <div className="event-content">

                        <h2>
                            {event.title}
                        </h2>

                        <p>
                            📅 {event.date}
                        </p>

                        <p>
                            📍 {event.location}
                        </p>

                        <p>
                            🎟️ Available:
                            {" "}
                            {event.availableTickets}
                        </p>

                        <p>
                            💰 Price:
                            {" "}
                            ₹{event.price}
                        </p>


                        {error && (
                            <p style={{ color: "red" }}>
                                ⚠️ {error}
                            </p>
                        )}


                        <button
                            onClick={joinQueue}
                            disabled={joining}
                            className="book-button"
                        >

                            {joining
                                ? "Joining FairQueue..."
                                : "Join FairQueue"
                            }

                        </button>

                    </div>

                </div>

            </main>

        </div>

    );

}