const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const os = require("os");
const {
    monitorEventLoopDelay
} = require("perf_hooks");
// =====================================================
// EXPRESS APP
// =====================================================

const app = express();

const PORT = process.env.PORT || 5000;


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());
// =====================================================
// REAL REQUEST LATENCY MONITOR
// =====================================================

app.use((req, res, next) => {

    const start =
        process.hrtime.bigint();

    res.on("finish", () => {

        const end =
            process.hrtime.bigint();

        const latencyMs =
            Number(end - start) /
            1_000_000;

        latencySamples.push(
            latencyMs
        );

        if (
            latencySamples.length >
            MAX_LATENCY_SAMPLES
        ) {

            latencySamples.shift();
        }
    });

    next();
});

// =====================================================
// P95 LATENCY
// =====================================================

function getAverageLatency() {

    if (latencySamples.length === 0) {
        return 0;
    }

    const total =
        latencySamples.reduce(
            (sum, value) =>
                sum + value,
            0
        );

    return total /
        latencySamples.length;
}

function getP95Latency() {

    if (latencySamples.length === 0) {
        return 0;
    }

    const sorted =
        [...latencySamples]
            .sort((a, b) => a - b);

    const index =
        Math.ceil(
            sorted.length * 0.95
        ) - 1;

    return sorted[
        Math.max(0, index)
    ];
}

// =====================================================
// NODE.JS EVENT LOOP DELAY
// =====================================================

function getEventLoopDelayMs() {

    const delay =
        eventLoopMonitor.mean /
        1e6;

    eventLoopMonitor.reset();

    if (!Number.isFinite(delay)) {
        return 0;
    }

    return delay;
}

// =====================================================
// NODE.JS EVENT LOOP DELAY
// =====================================================

function getEventLoopDelayMs() {

    const delay =
        eventLoopMonitor.mean /
        1e6;

    eventLoopMonitor.reset();

    if (!Number.isFinite(delay)) {
        return 0;
    }

    return delay;
}

// =====================================================
// ADAPTIVE TRAFFIC GATE
// =====================================================

function adaptiveTrafficGate(
    req,
    res,
    next
) {

    const currentSecond =
        Math.floor(
            Date.now() / 1000
        );

    // New second
    if (
        trafficCounter.second !==
        currentSecond
    ) {

        trafficCounter = {

            second: currentSecond,

            count: 0
        };
    }

    // Count every incoming request
    trafficCounter.count++;

    const currentLimit =
        adaptiveTraffic.limitRPS;

    // Reject when the server's
    // current safe capacity is reached
    if (
        trafficCounter.count >
        currentLimit
    ) {

        return res.status(429).json({

            success: false,

            blocked: true,

            reason:
                "SERVER_BACKPRESSURE",

            performanceLevel:
                adaptiveTraffic.level,

            currentRPS:
                trafficCounter.count,

            allowedRPS:
                currentLimit,

            retryAfter: 1,

            message:
                "Server is currently under high traffic. Please retry shortly."
        });
    }

    next();
}

// =====================================================
// ENVIRONMENT CHECK
// =====================================================

console.log(
    "MongoDB URI loaded:",
    process.env.MONGODB_URI ? "YES" : "NO"
);


// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {

        console.log("================================");
        console.log("✅ Connected to MongoDB Atlas");
        console.log("================================");

    })
    .catch((error) => {

        console.log("❌ MongoDB Error:");
        console.log(error.message);

    });


// =====================================================
// EVENT MODEL
// =====================================================

const eventSchema = new mongoose.Schema(

    {

        eventId: {
            type: String,
            required: true,
            unique: true
        },

        title: {
            type: String,
            required: true
        },

        date: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        totalTickets: {
            type: Number,
            required: true
        },

        availableTickets: {
            type: Number,
            required: true
        }

    },

    {
        timestamps: true
    }

);


const Event = mongoose.model("Event", eventSchema);


// =====================================================
// BOOKING MODEL
// =====================================================

const bookingSchema = new mongoose.Schema(

    {

        bookingId: {
            type: String,
            required: true,
            unique: true
        },

        eventId: {
            type: String,
            required: true
        },

        userId: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        amount: {
    type: Number,
    required: true
},

idempotencyKey: {
    type: String,
    unique: true,
    sparse: true
},

        status: {
            type: String,
            enum: [
                "HELD",
                "CONFIRMED",
                "EXPIRED",
                "CANCELLED"
            ],
            default: "HELD"
        },

        holdExpiresAt: {
            type: Date
        }

    },

    {
        timestamps: true
    }

);


const Booking = mongoose.model(
    "Booking",
    bookingSchema
);


// =====================================================
// TEMPORARY REDIS SIMULATION
// =====================================================
//
// In production:
// Redis would be used.
//
// For hackathon:
// JavaScript memory is used.
//
// These Maps behave like temporary Redis storage.
// =====================================================


// Virtual waiting queue
// =====================================================
// FAIRQUEUE TEMPORARY HIGH-CONCURRENCY STORAGE
// =====================================================

// Queue for each event
// eventId -> array of users
const waitingQueue =[];

// Users currently admitted to booking
// userId -> user session
const activeUsers = new Map();

// Temporary ticket holds
// We will use this in the next step
const ticketHolds = new Map();

// Rate-limit tracking
// IP -> { count, startTime }
const requestTracker = new Map();

// Used to avoid duplicate queue requests
const processingUsers = new Set();

// Queue sequence
let queueCounter = 0;

const HOLD_DURATION = 5 * 60 * 1000;
// =====================================================
// SYSTEM CONFIGURATION
// =====================================================

// Maximum users allowed inside the booking area
const MAX_ACTIVE_USERS = 10;

// How many requests are allowed from one IP
const MAX_REQUESTS_PER_MINUTE = 60;

// Rate-limit window
const RATE_LIMIT_WINDOW = 60 * 1000;
// =====================================================
// HELPER FUNCTIONS
// =====================================================
// =====================================================
// ADAPTIVE TRAFFIC GATE CONFIGURATION
// =====================================================

const MIN_TRAFFIC_RPS = 300;
const START_TRAFFIC_RPS = 1000;
const MAX_TRAFFIC_RPS = 3000;

// Adaptive controller runs every second
const ADAPTIVE_INTERVAL = 1000;

// Increase/decrease speed
const HEALTHY_INCREASE_FACTOR = 1.20;
const MODERATE_INCREASE_FACTOR = 1.05;
const HIGH_LOAD_DECREASE_FACTOR = 0.70;

// =====================================================
// ADAPTIVE TRAFFIC STATE
// =====================================================

let adaptiveTraffic = {
    limitRPS: START_TRAFFIC_RPS,

    currentRPS: 0,

    cpuUsage: 0,

    averageLatencyMs: 0,

    p95LatencyMs: 0,

    eventLoopDelayMs: 0,

    level: "MEDIUM",

    lastUpdated: Date.now()
};

// Requests arriving during the current second
let trafficCounter = {
    second: Math.floor(Date.now() / 1000),
    count: 0
};

// Latency samples
const latencySamples = [];

const MAX_LATENCY_SAMPLES = 500;

// Event loop monitor
const eventLoopMonitor =
    monitorEventLoopDelay({
        resolution: 20
    });

eventLoopMonitor.enable();

// Generate unique ID
// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Generate unique ID

function generateId(prefix) {

    return (
        prefix +
        "_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );

}


// =====================================================
// REAL SYSTEM CPU USAGE
// =====================================================

let previousCpuSnapshot = null;

function getCpuSnapshot() {

    const cpus = os.cpus();

    let idle = 0;
    let total = 0;

    for (const cpu of cpus) {

        idle += cpu.times.idle;

        total +=
            cpu.times.user +
            cpu.times.nice +
            cpu.times.sys +
            cpu.times.irq +
            cpu.times.idle;
    }

    return {
        idle,
        total
    };
}

function getSystemCpuUsage() {

    const current =
        getCpuSnapshot();

    if (!previousCpuSnapshot) {

        previousCpuSnapshot =
            current;

        return 0;
    }

    const idleDiff =
        current.idle -
        previousCpuSnapshot.idle;

    const totalDiff =
        current.total -
        previousCpuSnapshot.total;

    previousCpuSnapshot =
        current;

    if (totalDiff <= 0) {
        return 0;
    }

    const usage =
        (1 - idleDiff / totalDiff) * 100;

    return Math.max(
        0,
        Math.min(100, usage)
    );

}
// =====================================================
// PERFORMANCE ANALYSER
// =====================================================

function analyseServerPerformance() {

    const cpu =
        getSystemCpuUsage();

    const averageLatency =
        getAverageLatency();

    const p95Latency =
        getP95Latency();

    const eventLoopDelay =
        getEventLoopDelayMs();

    const currentRPS =
        trafficCounter.count;

    let level;

    // HIGH LOAD
    if (
        cpu >= 80 ||
        p95Latency >= 300 ||
        eventLoopDelay >= 100
    ) {

        level = "HIGH";

    }

    // MEDIUM LOAD
    else if (
        cpu >= 55 ||
        p95Latency >= 150 ||
        eventLoopDelay >= 50
    ) {

        level = "MEDIUM";

    }

    // LOW LOAD
    else {

        level = "LOW";
    }

    let newLimit =
        adaptiveTraffic.limitRPS;

    // HEALTHY → increase
    if (level === "LOW") {

        newLimit =
            newLimit *
            HEALTHY_INCREASE_FACTOR;
    }

    // MEDIUM → slowly increase
    else if (level === "MEDIUM") {

        newLimit =
            newLimit *
            MODERATE_INCREASE_FACTOR;
    }

    // HIGH → decrease
    else {

        newLimit =
            newLimit *
            HIGH_LOAD_DECREASE_FACTOR;
    }

    // Keep between 300 and 3000
    newLimit =
        Math.max(
            MIN_TRAFFIC_RPS,
            Math.min(
                MAX_TRAFFIC_RPS,
                newLimit
            )
        );

    adaptiveTraffic = {

        limitRPS:
            Math.round(newLimit),

        currentRPS:
            currentRPS,

        cpuUsage:
            Number(
                cpu.toFixed(2)
            ),

        averageLatencyMs:
            Number(
                averageLatency.toFixed(2)
            ),

        p95LatencyMs:
            Number(
                p95Latency.toFixed(2)
            ),

        eventLoopDelayMs:
            Number(
                eventLoopDelay.toFixed(2)
            ),

        level,

        lastUpdated:
            Date.now()
    };

    // Reset request counter
    trafficCounter = {

        second:
            Math.floor(
                Date.now() / 1000
            ),

        count: 0
    };

    console.log(
        `[ADAPTIVE] ` +
        `CPU=${adaptiveTraffic.cpuUsage}% | ` +
        `P95=${adaptiveTraffic.p95LatencyMs}ms | ` +
        `Loop=${adaptiveTraffic.eventLoopDelayMs}ms | ` +
        `RPS=${adaptiveTraffic.currentRPS} | ` +
        `LIMIT=${adaptiveTraffic.limitRPS} | ` +
        `LEVEL=${adaptiveTraffic.level}`
    );
}
// Analyse performance every second
setInterval(
    analyseServerPerformance,
    ADAPTIVE_INTERVAL
);


// =====================================================
// BOT PROTECTION
// =====================================================

function botProtection(req, res, next) {

    const ip =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        "unknown";


    const now = Date.now();

    const WINDOW = 60 * 1000;

    const MAX_REQUESTS = 60;


    let tracker =
        requestTracker.get(ip);


    if (!tracker) {

        tracker = {
            count: 0,
            start: now
        };

        requestTracker.set(ip, tracker);

    }


    // Reset after one minute

    if (now - tracker.start > WINDOW) {

        tracker.count = 0;

        tracker.start = now;

    }


    tracker.count++;


    // Too many requests

    if (tracker.count > MAX_REQUESTS) {

        return res.status(429).json({

            success: false,

            blocked: true,

            message:
                "Too many requests. Please wait before trying again."

        });

    }


    next();

}


// =====================================================
// REQUEST GATE
// =====================================================
//
// This acts like a simplified load-balancing/request gate.
//
// Instead of allowing everyone to directly access booking,
// requests are controlled here.
// =====================================================

function requestGate(req, res, next) {

    const userId =
        req.body.userId ||
        req.headers["x-user-id"];


    if (!userId) {

        return res.status(400).json({

            success: false,

            message: "User ID is required"

        });

    }


    req.userId = userId;


    // Already active

    if (activeUsers.has(userId)) {

        return next();

    }


    // Allow if active capacity exists

    if (
        activeUsers.size <
        MAX_ACTIVE_USERS
    ) {

        activeUsers.set(userId, {

            enteredAt: Date.now()

        });


        return next();

    }


    // Otherwise user goes into queue

    const alreadyQueued =
        waitingQueue.find(
            user => user.userId === userId
        );


    if (!alreadyQueued) {

        queueCounter++;


        waitingQueue.push({

            queueId: queueCounter,

            userId: userId,

            joinedAt: Date.now(),

            priority: calculatePriority(
                userId
            )

        });

    }


    return res.status(202).json({

        success: false,

        queued: true,

        message:
            "High traffic detected. You have been placed in the virtual waiting room.",

        position:
            getQueuePosition(userId),

        totalWaiting:
            waitingQueue.length

    });

}


// =====================================================
// PRIORITY CALCULATION
// =====================================================
//
// For the hackathon we use:
//
// 1. Existing active users
// 2. Earlier queue entry
// 3. Normal users get FIFO order
//
// You can later add:
// verified user,
// registered user,
// accessibility priority,
// VIP,
// etc.
// =====================================================

function calculatePriority(userId) {

    return 1;

}


// =====================================================
// GET QUEUE POSITION
// =====================================================

function getQueuePosition(userId) {

    const index =
        waitingQueue.findIndex(
            user => user.userId === userId
        );


    if (index === -1) {

        return 0;

    }


    return index + 1;

}


// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {

    res.json({

        success: true,

        message:
            "FairQueue backend is running",

        status: "ONLINE",

        mongodb:
            mongoose.connection.readyState === 1
                ? "CONNECTED"
                : "DISCONNECTED",

        activeUsers:
            activeUsers.size,

        waitingUsers:
            waitingQueue.length,

        activeHolds:
            ticketHolds.size

    });

});


// =====================================================
// DATABASE TEST
// =====================================================

app.get("/api/db-test", (req, res) => {

    if (
        mongoose.connection.readyState === 1
    ) {

        return res.json({

            success: true,

            message:
                "MongoDB Atlas is connected"

        });

    }


    res.status(500).json({

        success: false,

        message:
            "MongoDB is not connected"

    });

});


// =====================================================
// CREATE EVENT
// =====================================================

app.post("/api/events", async (req, res) => {

    try {

        const {

            eventId,
            title,
            date,
            location,
            price,
            totalTickets

        } = req.body;


        if (
            !eventId ||
            !title ||
            !date ||
            !location ||
            price === undefined ||
            totalTickets === undefined
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All event fields are required"

            });

        }


        const existingEvent =
            await Event.findOne({
                eventId
            });


        if (existingEvent) {

            return res.status(409).json({

                success: false,

                message:
                    "Event already exists"

            });

        }


        const event =
            new Event({

                eventId,

                title,

                date,

                location,

                price,

                totalTickets,

                availableTickets:
                    totalTickets

            });


        await event.save();


        res.status(201).json({

            success: true,

            message:
                "Event created successfully",

            event

        });


    } catch (error) {

        console.error(
            "Create Event Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to create event",

            error:
                error.message

        });

    }

});


// =====================================================
// GET ALL EVENTS
// =====================================================

app.get(
    "/api/events",
    async (req, res) => {

        try {

            const events =
                await Event.find()
                    .sort({
                        createdAt: -1
                    });


            res.json({

                success: true,

                events

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch events"

            });

        }

    }
);


// =====================================================
// GET SINGLE EVENT
// =====================================================

app.get(
    "/api/events/:id",
    async (req, res) => {

        try {

            const event =
                await Event.findOne({

                    eventId:
                        req.params.id

                });


            if (!event) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Event not found"

                });

            }


            res.json({

                success: true,

                event

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch event"

            });

        }

    }
);


// =====================================================
// JOIN VIRTUAL WAITING ROOM
// =====================================================

app.post(
    "/api/queue/join",
    adaptiveTrafficGate,
    botProtection,
    (req, res) => {

        const {

            userId,
            eventId

        } = req.body;


        if (!userId || !eventId) {

            return res.status(400).json({

                success: false,

                message:
                    "userId and eventId are required"

            });

        }


        // Already active

        if (activeUsers.has(userId)) {

            return res.json({

                success: true,

                queued: false,

                active: true,

                message:
                    "You already have access to booking."

            });

        }


        // Already in queue

        const existing =
            waitingQueue.find(
                user =>
                    user.userId === userId
            );


        if (existing) {

            return res.json({

                success: true,

                queued: true,

                queueId:
                    existing.queueId,

                position:
                    getQueuePosition(userId),

                message:
                    "You are already in the waiting room."

            });

        }


        // Enter queue

        queueCounter++;


        waitingQueue.push({

            queueId:
                queueCounter,

            userId,

            eventId,

            joinedAt:
                Date.now(),

            priority:
                calculatePriority(
                    userId
                )

        });


        res.json({

            success: true,

            queued: true,

            queueId:
                queueCounter,

            position:
                waitingQueue.length,

            message:
                "You have entered the FairQueue waiting room."

        });

    }
);


// =====================================================
// CHECK QUEUE STATUS
// =====================================================

app.get(
    "/api/queue/status/:userId",
    (req, res) => {

        const userId =
            req.params.userId;


        // User already active

        if (
            activeUsers.has(userId)
        ) {

            return res.json({

                success: true,

                status: "ACTIVE",

                position: 0,

                message:
                    "You can continue booking."

            });

        }


        const position =
            getQueuePosition(userId);


        if (position === 0) {

            return res.json({

                success: true,

                status: "NOT_IN_QUEUE",

                position: 0

            });

        }


        res.json({

            success: true,

            status: "WAITING",

            position,

            totalWaiting:
                waitingQueue.length,

            estimatedWaitSeconds:
                position * 3

        });

    }
);


// =====================================================
// MOVE USERS FROM QUEUE TO ACTIVE
// =====================================================
//
// This simulates the virtual queue dispatcher.
// =====================================================

function processWaitingQueue() {

    while (

        activeUsers.size <
            MAX_ACTIVE_USERS &&

        waitingQueue.length > 0

    ) {

        const nextUser =
            waitingQueue.shift();


        activeUsers.set(
            nextUser.userId,
            {

                enteredAt:
                    Date.now(),

                eventId:
                    nextUser.eventId

            }

        );

    }

}


// Process queue every second

setInterval(
    processWaitingQueue,
    1000
);


// =====================================================
// RELEASE ACTIVE USER
// =====================================================

app.post(
    "/api/queue/leave",
    (req, res) => {

        const {
            userId
        } = req.body;


        if (!userId) {

            return res.status(400).json({

                success: false,

                message:
                    "userId is required"

            });

        }


        activeUsers.delete(
            userId
        );


        processWaitingQueue();


        res.json({

            success: true,

            message:
                "Booking session released."

        });

    }
);


// =====================================================
// CREATE TICKET HOLD
// =====================================================
//
// CRITICAL PART FOR OVERSELLING PROTECTION.
//
// We atomically reduce availableTickets
// in MongoDB.
//
// Example:
//
// 10 tickets available
//
// User A requests 2
// DB becomes 8
//
// User B requests 9
//
// Request fails because only 8 remain.
// =====================================================

app.post(
    "/api/booking/hold",
    botProtection,
    async (req, res) => {

        try {

            const {

                userId,
                eventId,
                quantity

            } = req.body;


            if (
                !userId ||
                !eventId ||
                !quantity
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "userId, eventId and quantity are required"

                });

            }


            // User must have queue access

            if (
                !activeUsers.has(
                    userId
                )
            ) {

                return res.status(403).json({

                    success: false,

                    queued: true,

                    message:
                        "Please enter the booking area through FairQueue first."

                });

            }


            if (
                quantity < 1 ||
                quantity > 10
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "You can hold between 1 and 10 tickets."

                });

            }


            // =========================================
            // ATOMIC INVENTORY UPDATE
            // =========================================

            const event =
                await Event.findOneAndUpdate(

                    {

                        eventId,

                        availableTickets:
                            {
                                $gte:
                                    quantity
                            }

                    },

                    {

                        $inc:
                            {
                                availableTickets:
                                    -quantity
                            }

                    },

                    {
    returnDocument: "after"
}

                );


            // No tickets available

            if (!event) {

                return res.status(409).json({

                    success: false,

                    oversold: false,

                    message:
                        "Tickets are no longer available."

                });

            }


            // =========================================
            // CREATE HOLD
            // =========================================

            const bookingId =
                generateId("BOOK");


            const expiresAt =
                new Date(
                    Date.now() +
                    HOLD_DURATION
                );


            const booking =
                new Booking({

                    bookingId,

                    eventId,

                    userId,

                    quantity,

                    amount:
                        event.price *
                        quantity,

                    status:
                        "HELD",

                    holdExpiresAt:
                        expiresAt

                });


            await booking.save();


            ticketHolds.set(
                bookingId,
                {

                    bookingId,

                    eventId,

                    userId,

                    quantity,

                    expiresAt:
                        expiresAt.getTime()

                }
            );


            res.json({

                success: true,

                status: "HELD",

                bookingId,

                eventId,

                quantity,

                amount:
                    event.price *
                    quantity,

                expiresAt,

                message:
                    "Tickets held successfully for 5 minutes."

            });


        } catch (error) {

            console.error(
                "Ticket Hold Error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to hold tickets.",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// CHECKOUT
// =====================================================

app.post(
    "/api/booking/checkout",
    async (req, res) => {

        try {

            const {
                bookingId,
                userId,
                idempotencyKey
            } = req.body;


            // ==========================================
            // VALIDATION
            // ==========================================

            if (
                !bookingId ||
                !userId ||
                !idempotencyKey
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "bookingId, userId and idempotencyKey are required"

                });

            }


            // ==========================================
            // CHECK EXISTING IDEMPOTENT REQUEST
            // ==========================================

            const existingByKey =
                await Booking.findOne({
                    idempotencyKey
                });


            if (existingByKey) {

                // Key belongs to another booking
                if (
                    existingByKey.bookingId !==
                    bookingId
                ) {

                    return res.status(409).json({

                        success: false,

                        message:
                            "This idempotency key is already associated with another booking."

                    });

                }


                // Key already processed
                if (
                    existingByKey.status ===
                    "CONFIRMED"
                ) {

                    return res.json({

                        success: true,

                        status: "CONFIRMED",

                        bookingId:
                            existingByKey.bookingId,

                        idempotent: true,

                        message:
                            "Checkout already processed. Returning the existing confirmed booking."

                    });

                }

            }


            // ==========================================
            // GET BOOKING
            // ==========================================

            const booking =
                await Booking.findOne({
                    bookingId
                });


            if (!booking) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Booking not found"

                });

            }


            // ==========================================
            // USER VALIDATION
            // ==========================================

            if (
                booking.userId !==
                userId
            ) {

                return res.status(403).json({

                    success: false,

                    message:
                        "Unauthorized booking access"

                });

            }


            // ==========================================
            // ALREADY CONFIRMED
            // ==========================================

            if (
                booking.status ===
                "CONFIRMED"
            ) {

                // If this request uses the same key,
                // return the same booking.
                if (
                    booking.idempotencyKey ===
                    idempotencyKey
                ) {

                    return res.json({

                        success: true,

                        status: "CONFIRMED",

                        bookingId:
                            booking.bookingId,

                        idempotent: true,

                        message:
                            "Checkout already completed."

                    });

                }


                return res.status(409).json({

                    success: false,

                    message:
                        "This booking has already been confirmed."

                });

            }


            // ==========================================
            // MUST BE HELD
            // ==========================================

            if (
                booking.status !==
                "HELD"
            ) {

                return res.status(409).json({

                    success: false,

                    message:
                        `Booking is ${booking.status}`

                });

            }


            // ==========================================
            // CHECK HOLD EXPIRY
            // ==========================================

            if (
                !booking.holdExpiresAt ||
                new Date() >
                booking.holdExpiresAt
            ) {

                await expireBooking(
                    booking
                );


                return res.status(410).json({

                    success: false,

                    message:
                        "Ticket hold expired."

                });

            }


            // ==========================================
            // ATOMIC CHECKOUT
            // ==========================================
            //
            // Only ONE concurrent request can change
            // this booking from HELD → CONFIRMED.
            //
            // This is the important concurrency part.
            // ==========================================

            const confirmedBooking =
                await Booking.findOneAndUpdate(

                    {
                        bookingId,

                        userId,

                        status: "HELD",

                        holdExpiresAt: {
                            $gt: new Date()
                        }
                    },

                    {
                        $set: {
                            status: "CONFIRMED",

                            holdExpiresAt:
                                null,

                            idempotencyKey
                        }
                    },

                    {
                        returnDocument: "after"
                    }

                );


            // ==========================================
            // RACE CONDITION / RETRY
            // ==========================================

            if (!confirmedBooking) {

                const currentBooking =
                    await Booking.findOne({
                        bookingId
                    });


                if (
                    currentBooking &&
                    currentBooking.status ===
                        "CONFIRMED" &&
                    currentBooking.idempotencyKey ===
                        idempotencyKey
                ) {

                    return res.json({

                        success: true,

                        status: "CONFIRMED",

                        bookingId:
                            currentBooking.bookingId,

                        idempotent: true,

                        message:
                            "Checkout already processed. Returning the existing booking."

                    });

                }


                return res.status(409).json({

                    success: false,

                    message:
                        "Checkout could not be completed because the booking state changed."

                });

            }


            // ==========================================
            // REMOVE TEMPORARY HOLD
            // ==========================================

            ticketHolds.delete(
                bookingId
            );


            // ==========================================
            // SUCCESS
            // ==========================================

            res.json({

                success: true,

                status:
                    "CONFIRMED",

                bookingId:
                    confirmedBooking.bookingId,

                amount:
                    confirmedBooking.amount,

                quantity:
                    confirmedBooking.quantity,

                idempotent:
                    false,

                message:
                    "Payment successful. Ticket confirmed."

            });


        } catch (error) {

            console.error(
                "Idempotent Checkout Error:",
                error
            );


            // ==========================================
            // UNIQUE KEY RACE
            // ==========================================

            if (
                error.code === 11000
            ) {

                const existing =
                    await Booking.findOne({
                        idempotencyKey:
                            req.body.idempotencyKey
                    });


                if (
                    existing &&
                    existing.bookingId ===
                        req.body.bookingId &&
                    existing.status ===
                        "CONFIRMED"
                ) {

                    return res.json({

                        success: true,

                        status:
                            "CONFIRMED",

                        bookingId:
                            existing.bookingId,

                        idempotent:
                            true,

                        message:
                            "Checkout already processed."

                    });

                }

            }


            res.status(500).json({

                success: false,

                message:
                    "Checkout failed."

            });

        }

    }
);

// =====================================================
// EXPIRE BOOKING
// =====================================================

async function expireBooking(
    booking
) {

    try {

        if (
            booking.status !==
            "HELD"
        ) {

            return;

        }


        // Return tickets

        await Event.findOneAndUpdate(

            {
                eventId:
                    booking.eventId
            },

            {

                $inc:
                    {
                        availableTickets:
                            booking.quantity
                    }

            }

        );


        booking.status =
            "EXPIRED";


        booking.holdExpiresAt =
            null;


        await booking.save();


        ticketHolds.delete(
            booking.bookingId
        );


        console.log(
            `⏰ Hold expired: ${booking.bookingId}`
        );


    } catch (error) {

        console.error(
            "Expire Booking Error:",
            error
        );

    }

}


// =====================================================
// AUTOMATIC HOLD EXPIRATION
// =====================================================

setInterval(
    async () => {

        const now =
            Date.now();


        for (
            const [
                bookingId,
                hold
            ]
            of ticketHolds
        ) {

            if (
                now >=
                hold.expiresAt
            ) {

                const booking =
                    await Booking.findOne({
                        bookingId
                    });


                if (booking) {

                    await expireBooking(
                        booking
                    );

                }

            }

        }

    },
    5000
);


// =====================================================
// GET BOOKING
// =====================================================

app.get(
    "/api/booking/:bookingId",
    async (req, res) => {

        try {

            const booking =
                await Booking.findOne({

                    bookingId:
                        req.params.bookingId

                });


            if (!booking) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Booking not found"

                });

            }


            res.json({

                success: true,

                booking

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch booking"

            });

        }

    }
);


// =====================================================
// GET USER TICKETS
// =====================================================

app.get(
    "/api/user/:userId/tickets",
    async (req, res) => {

        try {

            const bookings =
                await Booking.find({

                    userId:
                        req.params.userId,

                    status:
                        "CONFIRMED"

                })
                .sort({
                    createdAt: -1
                });


            res.json({

                success: true,

                tickets:
                    bookings

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch tickets"

            });

        }

    }
);


// =====================================================
// ADMIN / SYSTEM STATUS
// =====================================================
//
// Useful for your friend's admin dashboard.
// =====================================================

app.get(
    "/api/admin/system-status",
    (req, res) => {

        res.json({

            success: true,

            system: {

                status: "ONLINE",

                activeUsers:
                    activeUsers.size,

                waitingUsers:
                    waitingQueue.length,

                activeHolds:
                    ticketHolds.size,

                maxActiveUsers:
                    MAX_ACTIVE_USERS,

                queueCapacity:
                    "Unlimited (simulation)",

                botProtection:
                    "ACTIVE",

                oversellingProtection:
                    "ACTIVE",

                virtualQueue:
                    "ACTIVE",

                ticketHold:
                    "ACTIVE"

            }

        });

    }
);


// =====================================================
// ADMIN QUEUE INFORMATION
// =====================================================

app.get(
    "/api/admin/queue",
    (req, res) => {

        res.json({

            success: true,

            queue:
                waitingQueue,

            activeUsers:
                Array.from(
                    activeUsers.entries()
                ).map(
                    ([userId, data]) => ({

                        userId,

                        ...data

                    })
                )

        });

    }
);


// =====================================================
// DELETE EVENT
// =====================================================

app.delete(
    "/api/events/:id",
    async (req, res) => {

        try {

            const event =
                await Event.findOneAndDelete({

                    eventId:
                        req.params.id

                });


            if (!event) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Event not found"

                });

            }


            res.json({

                success: true,

                message:
                    "Event deleted successfully"

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete event"

            });

        }

    }
);


// =====================================================
// START SERVER
// =====================================================

app.listen(
    PORT,
    () => {

        console.log(
            "================================"
        );

        console.log(
            "🚀 FairQueue Backend Started"
        );

        console.log(
            `🌐 http://localhost:${PORT}`
        );

        console.log(
            "🛡️ Bot Protection: ACTIVE"
        );

        console.log(
            "🚦 Virtual Queue: ACTIVE"
        );

        console.log(
            "🎟️ Ticket Hold: ACTIVE"
        );

        console.log(
            "🔒 Overselling Protection: ACTIVE"
        );

        console.log(
            "================================"
        );

    }
);