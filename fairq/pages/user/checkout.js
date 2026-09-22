import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Checkout() {

    const router = useRouter();

    const { bookingId } = router.query;

    const [booking, setBooking] = useState(null);

    const [loading, setLoading] = useState(true);

    const [processing, setProcessing] = useState(false);

    const [error, setError] = useState("");

    const [timeLeft, setTimeLeft] = useState(0);


    // ==========================================
    // LOAD BOOKING
    // ==========================================

    useEffect(() => {

        if (!router.isReady || !bookingId) {
            return;
        }

        const loadBooking = async () => {

            try {

                setLoading(true);

                setError("");

                console.log(
                    "Loading booking:",
                    bookingId
                );


                const response = await axios.get(
                    `http://localhost:5000/api/booking/${bookingId}`
                );


                console.log(
                    "Booking response:",
                    response.data
                );


                if (!response.data.success) {

                    throw new Error(
                        response.data.message ||
                        "Booking not found"
                    );

                }


                const loadedBooking =
                    response.data.booking;


                setBooking(
                    loadedBooking
                );


                // Calculate remaining time
                if (
                    loadedBooking.holdExpiresAt
                ) {

                    const expiresAt =
                        new Date(
                            loadedBooking.holdExpiresAt
                        ).getTime();

                    const remaining =
                        Math.max(
                            0,
                            Math.floor(
                                (expiresAt -
                                    Date.now()) /
                                1000
                            )
                        );

                    setTimeLeft(
                        remaining
                    );

                }


            } catch (error) {

                console.error(
                    "Booking Load Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Unable to load booking."
                );

            } finally {

                setLoading(false);

            }

        };


        loadBooking();

    }, [router.isReady, bookingId]);


    // ==========================================
    // HOLD COUNTDOWN
    // ==========================================

    useEffect(() => {

        if (
            !booking ||
            !booking.holdExpiresAt
        ) {
            return;
        }


        const interval =
            setInterval(() => {

                const expiresAt =
                    new Date(
                        booking.holdExpiresAt
                    ).getTime();


                const remaining =
                    Math.max(
                        0,
                        Math.floor(
                            (expiresAt -
                                Date.now()) /
                            1000
                        )
                    );


                setTimeLeft(
                    remaining
                );


                if (
                    remaining <= 0
                ) {

                    clearInterval(
                        interval
                    );

                }

            }, 1000);


        return () => {

            clearInterval(
                interval
            );

        };

    }, [booking]);


    // ==========================================
    // FORMAT TIME
    // ==========================================

    const formatTime = (seconds) => {

        const minutes =
            Math.floor(
                seconds / 60
            );

        const secs =
            seconds % 60;


        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0")
        );

    };


    // ==========================================
    // CHECKOUT
    // ==========================================

   const handleCheckout = async () => {

    try {

        const userId =
            localStorage.getItem(
                "fairqueue_user_id"
            );

        const storageKey =
            `fairqueue_idempotency_${bookingId}`;

        let idempotencyKey =
            localStorage.getItem(storageKey);

        if (!idempotencyKey) {

            idempotencyKey =
                "PAY_" +
                Date.now() +
                "_" +
                Math.random()
                    .toString(36)
                    .substring(2, 10);

            localStorage.setItem(
                storageKey,
                idempotencyKey
            );
        }

        const response =
            await axios.post(
                "http://localhost:5000/api/booking/checkout",
                {
                    bookingId,
                    userId,
                    idempotencyKey
                }
            );

        console.log(
            "Checkout response:",
            response.data
        );
     router.push(
        "/user/events");
        // continue with your existing success logic

    } catch (error) {

        console.error(
            "Checkout error:",
            error
        );

    }
};
    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="page-center">

                <h2>
                    Loading your booking...
                </h2>

                <p>
                    Please wait.
                </p>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (
        error &&
        !booking
    ) {

        return (

            <div className="page-center">

                <h2>
                    ⚠️ {error}
                </h2>

                <button
                    className="book-button"
                    onClick={() =>
                        router.push(
                            "/user/events"
                        )
                    }
                >
                    Back to Events
                </button>

            </div>

        );

    }


    // ==========================================
    // BOOKING NOT FOUND
    // ==========================================

    if (!booking) {

        return (

            <div className="page-center">

                <h2>
                    Booking not found
                </h2>

            </div>

        );

    }


    // ==========================================
    // EXPIRED
    // ==========================================

    if (
        timeLeft <= 0 &&
        booking.status === "HELD"
    ) {

        return (

            <div className="events-page">

                <main className="events-container">

                    <div className="page-header">

                        <p>
                            🎟️ FairQueue
                        </p>

                        <h1>
                            Hold Expired
                        </h1>

                        <span>
                            Your ticket reservation has expired.
                        </span>

                    </div>


                    <div className="event-card">

                        <div className="event-content">

                            <h2>
                                ⏰ Time expired
                            </h2>

                            <p>
                                The 5-minute ticket hold
                                is no longer valid.
                            </p>


                            <button
                                className="book-button"
                                onClick={() =>
                                    router.push(
                                        "/user/events"
                                    )
                                }
                            >
                                Back to Events
                            </button>

                        </div>

                    </div>

                </main>

            </div>

        );

    }


    // ==========================================
    // MAIN CHECKOUT PAGE
    // ==========================================

    return (

        <div className="events-page">

            <main className="events-container">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="page-header">

                    <p>
                        🎟️ FairQueue
                    </p>

                    <h1>
                        Checkout
                    </h1>

                    <span>
                        Complete your booking before
                        the hold expires.
                    </span>

                </div>


                {/* ==================================
                    BOOKING CARD
                ================================== */}

                <div className="event-card">

                    <div className="event-content">


                        <h2>
                            Your Ticket Reservation
                        </h2>


                        <hr />


                        {/* BOOKING ID */}

                        <p>

                            <strong>
                                Booking ID:
                            </strong>

                            <br />

                            {booking.bookingId}

                        </p>


                        {/* EVENT */}

                        <p>

                            <strong>
                                Event ID:
                            </strong>

                            <br />

                            {booking.eventId}

                        </p>


                        {/* QUANTITY */}

                        <p>

                            <strong>
                                Tickets:
                            </strong>

                            <br />

                            {booking.quantity}

                        </p>


                        {/* AMOUNT */}

                        <p>

                            <strong>
                                Total Amount:
                            </strong>

                            <br />

                            ₹{booking.amount}

                        </p>


                        {/* STATUS */}

                        <p>

                            <strong>
                                Status:
                            </strong>

                            <br />

                            {booking.status}

                        </p>


                        {/* ==================================
                            COUNTDOWN
                        ================================== */}

                        <div
                            style={{
                                padding: "20px",
                                marginTop: "20px",
                                marginBottom: "20px",
                                borderRadius: "12px",
                                background: "#f1f1ff",
                                textAlign: "center"
                            }}
                        >

                            <p
                                style={{
                                    marginBottom: "5px"
                                }}
                            >
                                ⏳ Ticket Hold Expires In
                            </p>

                            <h1
                                style={{
                                    margin: 0
                                }}
                            >
                                {formatTime(
                                    timeLeft
                                )}
                            </h1>

                            <p
                                style={{
                                    marginTop: "8px",
                                    color: "#666"
                                }}
                            >
                                Complete checkout before
                                the timer reaches zero.
                            </p>

                        </div>


                        {/* ==================================
                            ERROR
                        ================================== */}

                        {error && (

                            <div
                                style={{
                                    padding: "12px",
                                    marginBottom: "15px",
                                    borderRadius: "8px",
                                    background: "#ffe5e5"
                                }}
                            >

                                <p
                                    style={{
                                        color: "red",
                                        margin: 0
                                    }}
                                >
                                    ⚠️ {error}
                                </p>

                            </div>

                        )}


                        {/* ==================================
                            PAY BUTTON
                        ================================== */}

                        <button
                            className="book-button"
                            onClick={handleCheckout}
                            disabled={
                                processing ||
                                timeLeft <= 0 ||
                                booking.status !== "HELD"
                            }
                        >

                            {processing
                                ? "Processing Payment..."
                                : `Pay ₹${booking.amount}`
                            }

                        </button>


                        {/* INFO */}

                        <p
                            style={{
                                marginTop: "15px",
                                fontSize: "14px",
                                color: "#666"
                            }}
                        >
                            🔒 Your ticket inventory remains
                            reserved while the hold is active.
                        </p>

                    </div>

                </div>

            </main>

        </div>

    );

}