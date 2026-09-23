import { useEffect, useState } from "react";
import axios from "axios";

export default function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const userId =
                    localStorage.getItem("fairqueue_user_id");

                if (!userId) {
                    setError("User not logged in");
                    setLoading(false);
                    return;
                }

                const API_URL =
                    process.env.NEXT_PUBLIC_API_URL ||
                    "http://localhost:5000";

                const response = await axios.get(
                    `${API_URL}/api/user/${userId}/tickets`
                );

                setTickets(
                    response.data.tickets || []
                );
            } catch (err) {
                console.error(
                    "Failed to fetch tickets:",
                    err
                );

                setError(
                    "Unable to load tickets."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: "40px" }}>
                Loading tickets...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: "40px" }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1>My Tickets</h1>

            {tickets.length === 0 ? (
                <p>No confirmed tickets found.</p>
            ) : (
                tickets.map((ticket) => (
                    <div
                        key={ticket.bookingId}
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            marginTop: "20px",
                            borderRadius: "10px"
                        }}
                    >
                        <h3>
                            Booking ID:{" "}
                            {ticket.bookingId}
                        </h3>

                        <p>
                            Event:{" "}
                            {ticket.eventId}
                        </p>

                        <p>
                            Quantity:{" "}
                            {ticket.quantity}
                        </p>

                        <p>
                            Amount: ₹
                            {ticket.amount}
                        </p>

                        <p>
                            Status:{" "}
                            {ticket.status}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}