import { useState } from "react";

export default function Holds() {
  const [holds, setHolds] = useState([
    {
      id: "HLD-1024",
      user: "USR-84721",
      ticket: "TKT-45891",
      quantity: 2,
      created: "10:42:18",
      expires: "10:47:18",
      status: "Active",
    },
    {
      id: "HLD-1023",
      user: "USR-63214",
      ticket: "TKT-45876",
      quantity: 4,
      created: "10:41:52",
      expires: "10:46:52",
      status: "Active",
    },
    {
      id: "HLD-1022",
      user: "USR-41982",
      ticket: "TKT-45861",
      quantity: 1,
      created: "10:40:31",
      expires: "10:45:31",
      status: "Active",
    },
    {
      id: "HLD-1021",
      user: "USR-29451",
      ticket: "TKT-45844",
      quantity: 3,
      created: "10:39:47",
      expires: "10:44:47",
      status: "Expired",
    },
  ]);

  const [autoRelease, setAutoRelease] = useState(true);

  const activeHolds = holds.filter(
    (hold) => hold.status === "Active"
  );

  const heldTickets = activeHolds.reduce(
    (total, hold) => total + hold.quantity,
    0
  );

  function releaseHold(id) {
    setHolds((current) =>
      current.map((hold) =>
        hold.id === id
          ? { ...hold, status: "Released" }
          : hold
      )
    );
  }

  function releaseAll() {
    setHolds((current) =>
      current.map((hold) =>
        hold.status === "Active"
          ? { ...hold, status: "Released" }
          : hold
      )
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <p style={styles.overline}>FAIRQUEUE ADMIN</p>

          <h1 style={styles.title}>Ticket Holds</h1>

          <p style={styles.subtitle}>
            Monitor temporary ticket reservations and automatic
            inventory release.
          </p>
        </div>

        <button
          onClick={() => setAutoRelease(!autoRelease)}
          style={{
            ...styles.autoButton,
            background: autoRelease ? "#ecfdf5" : "#fef2f2",
            color: autoRelease ? "#15803d" : "#b91c1c",
          }}
        >
          <span
            style={{
              ...styles.statusDot,
              background: autoRelease ? "#22c55e" : "#ef4444",
            }}
          />

          Auto Release {autoRelease ? "ON" : "OFF"}
        </button>
      </div>

      {/* METRICS */}
      <div style={styles.metricsGrid}>
        <Metric
          title="ACTIVE HOLDS"
          value={activeHolds.length}
          description="Currently holding tickets"
        />

        <Metric
          title="HELD TICKETS"
          value={heldTickets}
          description="Tickets temporarily reserved"
        />

        <Metric
          title="HOLD TIME"
          value="5 min"
          description="Automatic expiration"
        />

        <Metric
          title="AUTO RELEASE"
          value={autoRelease ? "ON" : "OFF"}
          description="Expired holds are released"
        />
      </div>

      {/* INFORMATION */}
      <div style={styles.infoCard}>
        <div style={styles.infoIcon}>H</div>

        <div>
          <h2 style={styles.infoTitle}>
            How Ticket Holds Work
          </h2>

          <p style={styles.infoText}>
            When a user starts the booking process, FairQueue
            temporarily holds the selected tickets. If the user
            completes payment, the hold becomes a confirmed booking.
            If the hold expires, the inventory is automatically
            returned to the available pool.
          </p>
        </div>
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        <div>
          <h2 style={styles.sectionTitle}>
            Active Ticket Holds
          </h2>

          <p style={styles.sectionDescription}>
            Real-time view of temporarily reserved inventory.
          </p>
        </div>

        <button
          onClick={releaseAll}
          style={styles.releaseAllButton}
        >
          Release All Active Holds
        </button>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <span>HOLD ID</span>
          <span>USER</span>
          <span>TICKET</span>
          <span>QTY</span>
          <span>CREATED</span>
          <span>EXPIRES</span>
          <span>STATUS</span>
          <span>ACTION</span>
        </div>

        {holds.map((hold) => (
          <div
            key={hold.id}
            style={styles.tableRow}
          >
            <strong style={styles.holdId}>
              {hold.id}
            </strong>

            <span style={styles.muted}>
              {hold.user}
            </span>

            <span style={styles.muted}>
              {hold.ticket}
            </span>

            <span style={styles.quantity}>
              {hold.quantity}
            </span>

            <span style={styles.time}>
              {hold.created}
            </span>

            <span style={styles.time}>
              {hold.expires}
            </span>

            <StatusBadge status={hold.status} />

            {hold.status === "Active" ? (
              <button
                onClick={() => releaseHold(hold.id)}
                style={styles.releaseButton}
              >
                Release
              </button>
            ) : (
              <span style={styles.noAction}>
                —
              </span>
            )}
          </div>
        ))}

        {holds.length === 0 && (
          <div style={styles.emptyState}>
            No ticket holds available.
          </div>
        )}
      </div>

      {/* LIFECYCLE */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              Hold Lifecycle
            </h2>

            <p style={styles.cardDescription}>
              Ticket inventory moves through these states.
            </p>
          </div>
        </div>

        <div style={styles.lifecycle}>
          <LifecycleStep
            number="01"
            title="Available"
            description="Ticket is available in inventory."
          />

          <Arrow />

          <LifecycleStep
            number="02"
            title="Held"
            description="User temporarily reserves ticket."
          />

          <Arrow />

          <LifecycleStep
            number="03"
            title="Payment"
            description="User completes checkout."
          />

          <Arrow />

          <LifecycleStep
            number="04"
            title="Confirmed"
            description="Ticket becomes a confirmed booking."
          />
        </div>
      </div>

      {/* EXPIRATION RULE */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              Hold Policy
            </h2>

            <p style={styles.cardDescription}>
              Current temporary reservation rules.
            </p>
          </div>
        </div>

        <div style={styles.policyGrid}>
          <Policy
            title="Maximum Hold Duration"
            value="5 minutes"
          />

          <Policy
            title="Automatic Release"
            value={autoRelease ? "Enabled" : "Disabled"}
          />

          <Policy
            title="Inventory Restoration"
            value="Immediate"
          />

          <Policy
            title="Payment Confirmation"
            value="Required"
          />
        </div>
      </div>

      {/* DEVELOPMENT NOTE */}
      <div style={styles.note}>
        <div style={styles.noteIcon}>i</div>

        <div>
          <strong style={styles.noteTitle}>
            Development data
          </strong>

          <p style={styles.noteText}>
            The holds displayed on this page are currently frontend
            mock data. In production, holds should be created,
            expired and released by the backend using transactional
            inventory control.
          </p>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   METRIC
========================================================= */

function Metric({
  title,
  value,
  description,
}) {
  return (
    <div style={styles.metric}>
      <span style={styles.metricTitle}>
        {title}
      </span>

      <strong style={styles.metricValue}>
        {value}
      </strong>

      <span style={styles.metricDescription}>
        {description}
      </span>
    </div>
  );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const config = {
    Active: {
      background: "#ecfdf5",
      color: "#15803d",
      dot: "#22c55e",
    },

    Expired: {
      background: "#fff7ed",
      color: "#c2410c",
      dot: "#f97316",
    },

    Released: {
      background: "#f1f5f9",
      color: "#64748b",
      dot: "#94a3b8",
    },
  };

  const current = config[status];

  return (
    <span
      style={{
        ...styles.badge,
        background: current.background,
        color: current.color,
      }}
    >
      <span
        style={{
          ...styles.badgeDot,
          background: current.dot,
        }}
      />

      {status}
    </span>
  );
}


/* =========================================================
   LIFECYCLE STEP
========================================================= */

function LifecycleStep({
  number,
  title,
  description,
}) {
  return (
    <div style={styles.lifecycleStep}>
      <div style={styles.lifecycleNumber}>
        {number}
      </div>

      <strong style={styles.lifecycleTitle}>
        {title}
      </strong>

      <p style={styles.lifecycleDescription}>
        {description}
      </p>
    </div>
  );
}


/* =========================================================
   ARROW
========================================================= */

function Arrow() {
  return (
    <div style={styles.arrow}>
      →
    </div>
  );
}


/* =========================================================
   POLICY
========================================================= */

function Policy({
  title,
  value,
}) {
  return (
    <div style={styles.policy}>
      <span style={styles.policyTitle}>
        {title}
      </span>

      <strong style={styles.policyValue}>
        {value}
      </strong>
    </div>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "32px",
    color: "#172033",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
  },

  overline: {
    margin: 0,
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    color: "#64748b",
  },

  title: {
    margin: "6px 0 5px",
    fontSize: "30px",
    fontWeight: "750",
  },

  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },

  autoButton: {
    border: "none",
    borderRadius: "20px",
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "10px",
    fontWeight: "800",
    cursor: "pointer",
  },

  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "20px",
  },

  metric: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "19px",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
  },

  metricTitle: {
    display: "block",
    fontSize: "9px",
    color: "#64748b",
    fontWeight: "800",
    letterSpacing: "0.7px",
  },

  metricValue: {
    display: "block",
    margin: "7px 0 3px",
    fontSize: "25px",
  },

  metricDescription: {
    fontSize: "10px",
    color: "#94a3b8",
  },

  infoCard: {
    display: "flex",
    gap: "13px",
    padding: "19px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "13px",
    marginBottom: "25px",
  },

  infoIcon: {
    width: "38px",
    height: "38px",
    flexShrink: 0,
    borderRadius: "9px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  infoTitle: {
    margin: "2px 0 5px",
    fontSize: "14px",
  },

  infoText: {
    margin: 0,
    color: "#64748b",
    fontSize: "11px",
    lineHeight: "1.6",
  },

  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "13px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "18px",
  },

  sectionDescription: {
    margin: "4px 0 0",
    color: "#64748b",
    fontSize: "11px",
  },

  releaseAllButton: {
    border: "1px solid #fecaca",
    background: "#ffffff",
    color: "#dc2626",
    padding: "9px 13px",
    borderRadius: "7px",
    fontSize: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },

  tableCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "13px",
    overflow: "hidden",
    marginBottom: "20px",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
  },

  tableHeader: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr 1fr 0.5fr 1fr 1fr 1fr 0.8fr",
    padding: "13px 18px",
    background: "#f8fafc",
    borderBottom: "1px solid #e5e7eb",
    color: "#64748b",
    fontSize: "8px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },

  tableRow: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr 1fr 0.5fr 1fr 1fr 1fr 0.8fr",
    alignItems: "center",
    padding: "16px 18px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "10px",
  },

  holdId: {
    color: "#4f46e5",
    fontSize: "10px",
  },

  muted: {
    color: "#64748b",
  },

  quantity: {
    fontWeight: "700",
  },

  time: {
    color: "#64748b",
    fontFamily: "monospace",
    fontSize: "10px",
  },

  badge: {
    width: "fit-content",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 8px",
    borderRadius: "20px",
    fontSize: "8px",
    fontWeight: "800",
  },

  badgeDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
  },

  releaseButton: {
    width: "fit-content",
    border: "1px solid #fecaca",
    background: "#fff",
    color: "#dc2626",
    padding: "6px 9px",
    borderRadius: "6px",
    fontSize: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },

  noAction: {
    color: "#cbd5e1",
  },

  emptyState: {
    padding: "40px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "12px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "23px",
    marginBottom: "20px",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
  },

  cardHeader: {
    marginBottom: "20px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "17px",
  },

  cardDescription: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: "12px",
  },

  lifecycle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    overflowX: "auto",
  },

  lifecycleStep: {
    minWidth: "155px",
    padding: "15px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "9px",
  },

  lifecycleNumber: {
    width: "26px",
    height: "26px",
    borderRadius: "7px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "9px",
    fontWeight: "800",
    marginBottom: "9px",
  },

  lifecycleTitle: {
    display: "block",
    fontSize: "11px",
  },

  lifecycleDescription: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "9px",
    lineHeight: "1.4",
  },

  arrow: {
    color: "#94a3b8",
    fontSize: "20px",
    flexShrink: 0,
  },

  policyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
  },

  policy: {
    padding: "15px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
  },

  policyTitle: {
    display: "block",
    color: "#94a3b8",
    fontSize: "9px",
    marginBottom: "7px",
  },

  policyValue: {
    fontSize: "12px",
  },

  note: {
    display: "flex",
    gap: "11px",
    padding: "16px",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "10px",
  },

  noteIcon: {
    width: "27px",
    height: "27px",
    flexShrink: 0,
    borderRadius: "50%",
    background: "#3b82f6",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  noteTitle: {
    display: "block",
    color: "#1e40af",
    fontSize: "11px",
    marginBottom: "3px",
  },

  noteText: {
    margin: 0,
    color: "#1e40af",
    fontSize: "10px",
    lineHeight: "1.5",
  },
};