import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function TicketSelection() {

    const router = useRouter();

    const { eventId } = router.query;

    const [event, setEvent] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [holding, setHolding] = useState(false);
    const [error, setError] = useState("");


    // ==========================================
    // GET EVENT
    // ==========================================

    useEffect(() => {

        if (!eventId) return;

        const loadEvent = async () => {

            try {

                const response = await axios.get(
                    `http://localhost:5000/api/events/${eventId}`
                );

                if (!response.data.success) {
                    throw new Error("Event not found");
                }

                setEvent(
                    response.data.event
                );

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load event."
                );

            } finally {

                setLoading(false);

            }

        };

        loadEvent();

    }, [eventId]);


    // ==========================================
    // HOLD TICKETS
    // ==========================================

    const holdTickets = async () => {

    try {

        setHolding(true);
        setError("");

        const userId =
            localStorage.getItem(
                "fairqueue_user_id"
            );

        // ==========================================
        // CHECK USER SESSION
        // ==========================================

        if (!userId) {

            setError(
                "User session not found."
            );

            router.push(
                "/user/events"
            );

            return;

        }


        // ==========================================
        // CHECK QUEUE ACCESS BEFORE HOLD
        // ==========================================

        const queueResponse =
            await axios.get(
                `http://localhost:5000/api/queue/status/${userId}`
            );

        console.log(
            "Queue access before hold:",
            queueResponse.data
        );


        if (
            queueResponse.data.status !==
            "ACTIVE"
        ) {

            setError(
                "Your booking session is no longer active. Returning to the waiting room..."
            );

            router.push(
                `/user/waiting-room?eventId=${eventId}`
            );

            return;

        }


        // ==========================================
        // VALIDATE QUANTITY
        // ==========================================

        if (
            quantity < 1 ||
            quantity > 10
        ) {

            setError(
                "Please select between 1 and 10 tickets."
            );

            return;

        }


        // ==========================================
        // HOLD TICKETS
        // ==========================================

        console.log(
            "Holding tickets:",
            {
                userId,
                eventId,
                quantity
            }
        );


        const response = await axios.post(
            "http://localhost:5000/api/booking/hold",
            {
                userId,
                eventId,
                quantity
            }
        );


        console.log(
            "Hold response:",
            response.data
        );


        // ==========================================
        // SUCCESS
        // ==========================================

        if (
            response.data.success
        ) {

            localStorage.setItem(
                "fairqueue_booking_id",
                response.data.bookingId
            );

            localStorage.setItem(
                "fairqueue_event_id",
                eventId
            );

            localStorage.setItem(
                "fairqueue_ticket_quantity",
                String(quantity)
            );

            router.push(
                `/user/checkout?bookingId=${response.data.bookingId}`
            );

            return;

        }


        setError(
            response.data.message ||
            "Unable to hold tickets."
        );


    } catch (error) {

        console.error(
            "Ticket Hold Error:",
            error
        );


        // ==========================================
        // 403
        // ==========================================

        if (
            error.response?.status === 403
        ) {

            setError(
                "Your FairQueue session expired. Please re-enter the waiting room."
            );

            setTimeout(() => {

                router.push(
                    `/user/waiting-room?eventId=${eventId}`
                );

            }, 1000);

            return;

        }


        // ==========================================
        // OTHER ERRORS
        // ==========================================

        setError(
            error.response?.data?.message ||
            "Unable to hold tickets."
        );


    } finally {

        setHolding(false);

    }

};

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="page-center">
                <h2>
                    Loading ticket options...
                </h2>
            </div>
        );

    }


    if (!event) {

        return (
            <div className="page-center">
                <h2>
                    Event not found
                </h2>
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

                    <p>
                        🎟️ FairQueue
                    </p>

                    <h1>
                        Select Your Tickets
                    </h1>

                    <span>
                        {event.title}
                    </span>

                </div>


                <div
                    className="event-card"
                >

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


                        <hr />


                        <h3>
                            Number of Tickets
                        </h3>


                        <select
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    Number(e.target.value)
                                )
                            }
                        >

                            {Array.from(
                                {
                                    length:
                                        Math.min(
                                            10,
                                            event.availableTickets
                                        )
                                },
                                (_, index) => (
                                    <option
                                        key={index + 1}
                                        value={index + 1}
                                    >
                                        {index + 1}
                                    </option>
                                )
                            )}

                        </select>


                        <h3>
                            Total: ₹
                            {event.price * quantity}
                        </h3>


                        {error && (

                            <p
                                style={{
                                    color: "red"
                                }}
                            >
                                ⚠️ {error}
                            </p>

                        )}


                        <button
                            onClick={holdTickets}
                            disabled={
                                holding ||
                                event.availableTickets < 1
                            }
                            className="book-button"
                        >

                            {holding
                                ? "Holding Tickets..."
                                : "Hold Tickets"
                            }

                        </button>

                    </div>

                </div>

            </main>

        </div>

    );

}