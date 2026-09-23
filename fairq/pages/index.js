import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>FairQueue | Fair & Reliable Ticket Booking</title>
                <meta
                    name="description"
                    content="FairQueue handles high-demand ticket booking using adaptive traffic control, bot protection, virtual waiting rooms and atomic inventory reservation."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <div style={styles.page}>

                {/* NAVBAR */}
                <header style={styles.navbar}>
                    <div style={styles.logo}>
                        🎟️ FairQueue
                    </div>

                    <nav style={styles.navLinks}>
                        <Link
                            href="/user/events"
                            style={styles.navLink}
                        >
                            Events
                        </Link>

                        <Link
                            href="/user/dashboard"
                            style={styles.navLink}
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/user/my-tickets"
                            style={styles.navLink}
                        >
                            My Tickets
                        </Link>
                    </nav>
                </header>

                {/* HERO */}
                <main>

                    <section style={styles.hero}>

                        <div style={styles.badge}>
                            ⚡ High-Concurrency Ticketing
                        </div>

                        <h1 style={styles.heroTitle}>
                            Fair Access.
                            <br />
                            Reliable Booking.
                            <br />
                            <span style={styles.highlight}>
                                Zero Overselling.
                            </span>
                        </h1>

                        <p style={styles.heroText}>
                            FairQueue protects ticketing systems during
                            extreme traffic by controlling incoming requests,
                            managing a fair waiting room and safely reserving
                            limited inventory.
                        </p>

                        <div style={styles.buttons}>

                            <Link
                                href="/user/events"
                                style={styles.primaryButton}
                            >
                                Browse Events
                            </Link>

                            <Link
                                href="/user/dashboard"
                                style={styles.secondaryButton}
                            >
                                User Dashboard
                            </Link>

                        </div>

                    </section>

                    {/* CORE FEATURES */}
                    <section style={styles.section}>

                        <h2 style={styles.sectionTitle}>
                            How FairQueue Works
                        </h2>

                        <p style={styles.sectionText}>
                            Every booking request passes through multiple
                            protection layers before tickets are confirmed.
                        </p>

                        <div style={styles.featureGrid}>

                            <FeatureCard
                                icon="⚡"
                                title="Adaptive Traffic"
                                text="Measures server performance and dynamically controls the safe incoming request rate."
                            />

                            <FeatureCard
                                icon="🛡️"
                                title="Bot Protection"
                                text="Applies server-side request rate limiting to protect the platform from abusive traffic."
                            />

                            <FeatureCard
                                icon="🚦"
                                title="Virtual Waiting Room"
                                text="Places users in a fair FIFO queue during periods of extreme demand."
                            />

                            <FeatureCard
                                icon="🔄"
                                title="Controlled Admission"
                                text="Limits the number of users entering the booking area and applies backpressure."
                            />

                            <FeatureCard
                                icon="🎟️"
                                title="Atomic Reservation"
                                text="Atomically reduces available inventory so simultaneous requests cannot oversell tickets."
                            />

                            <FeatureCard
                                icon="⏱️"
                                title="Temporary Hold"
                                text="Selected tickets are reserved for a limited period before checkout."
                            />

                        </div>

                    </section>

                    {/* WORKFLOW */}
                    <section style={styles.workflowSection}>

                        <h2 style={styles.sectionTitle}>
                            FairQueue Booking Flow
                        </h2>

                        <div style={styles.workflow}>

                            <FlowStep text="User" />
                            <Arrow />

                            <FlowStep text="Event" />
                            <Arrow />

                            <FlowStep text="Adaptive Traffic Gate" />
                            <Arrow />

                            <FlowStep text="Bot Protection" />
                            <Arrow />

                            <FlowStep text="Virtual Waiting Room" />
                            <Arrow />

                            <FlowStep text="Controlled Admission" />
                            <Arrow />

                            <FlowStep text="Ticket Selection" />
                            <Arrow />

                            <FlowStep text="Atomic Inventory Reservation" />
                            <Arrow />

                            <FlowStep text="5-Minute Hold" />
                            <Arrow />

                            <FlowStep text="Checkout / Payment" />
                            <Arrow />

                            <FlowStep text="Confirmed Ticket" />

                        </div>

                    </section>

                    {/* SYSTEM STATUS */}
                    <section style={styles.statusSection}>

                        <div style={styles.statusCard}>

                            <div>
                                <div style={styles.statusTitle}>
                                    FairQueue Protection
                                </div>

                                <div style={styles.statusText}>
                                    Built for sudden traffic spikes and
                                    simultaneous ticket demand.
                                </div>
                            </div>

                            <div style={styles.statusOnline}>
                                <span style={styles.onlineDot}></span>
                                System Ready
                            </div>

                        </div>

                    </section>

                </main>

                {/* FOOTER */}
                <footer style={styles.footer}>
                    <div>
                        © 2026 FairQueue
                    </div>

                    <div>
                        High-Concurrency Ticket Booking Platform
                    </div>
                </footer>

            </div>
        </>
    );
}


/* ============================================
   FEATURE CARD
============================================ */

function FeatureCard({
    icon,
    title,
    text
}) {
    return (
        <div style={styles.featureCard}>

            <div style={styles.featureIcon}>
                {icon}
            </div>

            <h3 style={styles.featureTitle}>
                {title}
            </h3>

            <p style={styles.featureText}>
                {text}
            </p>

        </div>
    );
}


/* ============================================
   FLOW STEP
============================================ */

function FlowStep({ text }) {
    return (
        <div style={styles.flowStep}>
            {text}
        </div>
    );
}


/* ============================================
   ARROW
============================================ */

function Arrow() {
    return (
        <div style={styles.arrow}>
            ↓
        </div>
    );
}


/* ============================================
   STYLES
============================================ */

const styles = {

    page: {
        minHeight: "100vh",
        background:
            "linear-gradient(180deg, #07111f 0%, #0b1728 50%, #07111f 100%)",
        color: "#ffffff",
        fontFamily:
            "Arial, Helvetica, sans-serif"
    },

    navbar: {
        height: "72px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 7%",
        borderBottom:
            "1px solid rgba(255,255,255,0.08)",
        background:
            "rgba(7,17,31,0.95)",
        position: "sticky",
        top: 0,
        zIndex: 10
    },

    logo: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#22c55e"
    },

    navLinks: {
        display: "flex",
        gap: "28px",
        alignItems: "center"
    },

    navLink: {
        color: "#dbeafe",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "500"
    },

    hero: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "100px 25px 90px",
        textAlign: "center"
    },

    badge: {
        display: "inline-block",
        padding: "9px 18px",
        borderRadius: "999px",
        background: "rgba(34,197,94,0.12)",
        border:
            "1px solid rgba(34,197,94,0.3)",
        color: "#4ade80",
        fontSize: "14px",
        marginBottom: "25px"
    },

    heroTitle: {
        fontSize: "clamp(42px, 7vw, 78px)",
        lineHeight: "1.05",
        margin: 0,
        fontWeight: "800",
        letterSpacing: "-2px"
    },

    highlight: {
        color: "#22c55e"
    },

    heroText: {
        maxWidth: "800px",
        margin: "30px auto 0",
        color: "#94a3b8",
        fontSize: "18px",
        lineHeight: "1.8"
    },

    buttons: {
        marginTop: "38px",
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap"
    },

    primaryButton: {
        background:
            "linear-gradient(90deg, #22c55e, #06b6d4)",
        color: "#04111d",
        padding: "15px 28px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "700"
    },

    secondaryButton: {
        background: "transparent",
        color: "#ffffff",
        padding: "15px 28px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "700",
        border:
            "1px solid rgba(255,255,255,0.2)"
    },

    section: {
        maxWidth: "1150px",
        margin: "0 auto",
        padding: "70px 25px"
    },

    sectionTitle: {
        fontSize: "36px",
        textAlign: "center",
        marginBottom: "15px"
    },

    sectionText: {
        maxWidth: "700px",
        margin: "0 auto 45px",
        textAlign: "center",
        color: "#94a3b8",
        lineHeight: "1.7"
    },

    featureGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "22px"
    },

    featureCard: {
        padding: "28px",
        borderRadius: "16px",
        background:
            "rgba(15,23,42,0.9)",
        border:
            "1px solid rgba(255,255,255,0.08)",
        boxShadow:
            "0 15px 40px rgba(0,0,0,0.25)"
    },

    featureIcon: {
        fontSize: "30px",
        marginBottom: "15px"
    },

    featureTitle: {
        fontSize: "20px",
        margin: "0 0 10px"
    },

    featureText: {
        color: "#94a3b8",
        lineHeight: "1.7",
        margin: 0
    },

    workflowSection: {
        maxWidth: "950px",
        margin: "0 auto",
        padding: "70px 25px"
    },

    workflow: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px"
    },

    flowStep: {
        width: "100%",
        maxWidth: "600px",
        padding: "16px 20px",
        textAlign: "center",
        borderRadius: "10px",
        background:
            "linear-gradient(90deg, #132238, #102b35)",
        border:
            "1px solid rgba(34,197,94,0.25)",
        color: "#e2e8f0",
        fontWeight: "600"
    },

    arrow: {
        color: "#22c55e",
        fontSize: "25px",
        fontWeight: "700"
    },

    statusSection: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 25px 90px"
    },

    statusCard: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        padding: "28px",
        borderRadius: "16px",
        background:
            "rgba(15,23,42,0.9)",
        border:
            "1px solid rgba(34,197,94,0.2)"
    },

    statusTitle: {
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "7px"
    },

    statusText: {
        color: "#94a3b8",
        lineHeight: "1.6"
    },

    statusOnline: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#4ade80",
        fontWeight: "700",
        whiteSpace: "nowrap"
    },

    onlineDot: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#22c55e",
        display: "inline-block",
        boxShadow:
            "0 0 10px rgba(34,197,94,0.8)"
    },

    footer: {
        padding: "25px 7%",
        borderTop:
            "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        justifyContent: "space-between",
        gap: "15px",
        flexWrap: "wrap",
        color: "#64748b",
        fontSize: "13px"
    }

};