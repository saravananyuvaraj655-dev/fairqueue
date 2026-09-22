import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function WaitingRoom() {

    const router = useRouter();

    const { eventId } = router.query;

    const [position, setPosition] = useState(null);
    const [totalWaiting, setTotalWaiting] = useState(0);
    const [estimatedWait, setEstimatedWait] = useState(0);
    const [status, setStatus] = useState("LOADING");


    useEffect(() => {

        if (!router.isReady) return;

        const userId = localStorage.getItem(
            "fairqueue_user_id"
        );

        if (!userId) {

            router.push("/user/events");

            return;

        }


        const checkQueue = async () => {

            try {

                const response = await axios.get(
                    `http://localhost:5000/api/queue/status/${userId}`
                );

                console.log(
                    "Queue status:",
                    response.data
                );


                // ==================================
                // ACTIVE
                // ==================================

                if (
                    response.data.status === "ACTIVE"
                ) {

                    setStatus("ACTIVE");

                    router.push( `/user/ticket-selection?eventId=${eventId}`);

                    return;

                }

                // ==================================
                // WAITING
                // ==================================

                if (
                    response.data.status === "WAITING"
                ) {

                    setStatus("WAITING");

                    setPosition(
                        response.data.position
                    );

                    setTotalWaiting(
                        response.data.totalWaiting
                    );

                    setEstimatedWait(
                        response.data.estimatedWaitSeconds
                    );

                }


                // ==================================
                // NOT IN QUEUE
                // ==================================

                if (
                    response.data.status ===
                    "NOT_IN_QUEUE"
                ) {

                    setStatus("NOT_IN_QUEUE");

                }

            } catch (error) {

                console.error(
                    "Queue Status Error:",
                    error
                );

            }

        };


        // First check
        checkQueue();


        // Check every 3 seconds
        const interval = setInterval(
            checkQueue,
            3000
        );


        return () => {
            clearInterval(interval);
        };

    }, [router.isReady, eventId, router]);


    // ==========================================
    // LOADING
    // ==========================================

    if (
        status === "LOADING"
    ) {

        return (
            <div className="page-center">

                <h2>
                    Joining FairQueue...
                </h2>

                <p>
                    Please wait.
                </p>

            </div>
        );

    }


    // ==========================================
    // MAIN WAITING ROOM
    // ==========================================

    return (

        <div className="events-page">

            <main className="events-container">

                <div className="page-header">

                    <p>
                        🎟️ FairQueue
                    </p>

                    <h1>
                        Virtual Waiting Room
                    </h1>

                    <span>
                        Your position is controlled
                        fairly by the server.
                    </span>

                </div>


                <div
                    className="event-card"
                    style={{
                        textAlign: "center"
                    }}
                >

                    <div className="event-content">

                        <h2>
                            ⏳ You are in the queue
                        </h2>


                        <div>

                            <h1>
                                #{position}
                            </h1>

                            <p>
                                Your Queue Position
                            </p>

                        </div>


                        <p>
                            👥 Total Waiting:
                            {" "}
                            {totalWaiting}
                        </p>


                        <p>
                            ⏱️ Estimated Wait:
                            {" "}
                            {estimatedWait}
                            {" "}
                            seconds
                        </p>


                        <p>
                            Please keep this page open.
                        </p>


                        <p>
                            The system will automatically
                            move you forward.
                        </p>

                    </div>

                </div>

            </main>

        </div>

    );

}