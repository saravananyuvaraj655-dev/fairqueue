import { useState } from "react";

export default function Dashboard() {
  const [systemLive, setSystemLive] = useState(true);

  // Temporary development data.
  // Later these values will come from backend APIs / Socket.IO.
  const metrics = {
    concurrentUsers: 48250,
    queueSize: 38420,
    admissionRate: 200,
    activeSessions: 180,
    maxSessions: 200,
    backendLoad: 72,
    requestsPerSecond: 1850,
    availableTickets: 2450,
    reservedTickets: 7520,
    confirmedTickets: 40030,
  };

  const queuePercentage = Math.min(
    Math.round((metrics.queueSize / 50000) * 100),
    100
  );

  const sessionPercentage = Math.round(
    (metrics.activeSessions / metrics.maxSessions) * 100
  );

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <p style={styles.overline}>FAIRQUEUE ADMIN</p>

          <h1 style={styles.title}>Dashboard</h1>

          <p style={styles.subtitle}>
            Real-time overview of queue, admission, traffic and inventory.
          </p>
        </div>

        <button
          onClick={() => setSystemLive(!systemLive)}
          style={{
            ...styles.systemStatus,
            background: systemLive ? "#ecfdf5" : "#fef2f2",
            color: systemLive ? "#15803d" : "#b91c1c",
          }}
        >
          <span
            style={{
              ...styles.statusDot,
              background: systemLive ? "#22c55e" : "#ef4444",
            }}
          ></span>

          {systemLive ? "SYSTEM LIVE" : "SYSTEM PAUSED"}
        </button>
      </div>

      {/* TOP METRICS */}
      <div style={styles.metricsGrid}>
        <MetricCard
          title="CONCURRENT USERS"
          value={metrics.concurrentUsers.toLocaleString()}
          description="Users currently connected"
          type="users"
        />

        <MetricCard
          title="WAITING QUEUE"
          value={metrics.queueSize.toLocaleString()}
          description="Users waiting for admission"
          type="queue"
        />

        <MetricCard
          title="ADMISSION RATE"
          value={metrics.admissionRate}
          description="Users admitted per batch"
          type="admission"
        />

        <MetricCard
          title="BACKEND LOAD"
          value={`${metrics.backendLoad}%`}
          description={`${metrics.requestsPerSecond.toLocaleString()} req/sec`}
          type="load"
        />
      </div>

      {/* MAIN SECTION */}
      <div style={styles.mainGrid}>
        {/* QUEUE OVERVIEW */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Waiting Room</h2>

              <p style={styles.cardDescription}>
                Current virtual queue status.
              </p>
            </div>

            <span style={styles.liveBadge}>LIVE</span>
          </div>

          <div style={styles.queueNumbers}>
            <div>
              <span style={styles.bigNumber}>
                {metrics.queueSize.toLocaleString()}
              </span>

              <span style={styles.smallText}> users waiting</span>
            </div>

            <span style={styles.queuePercentage}>
              {queuePercentage}%
            </span>
          </div>

          <div style={styles.progressBackground}>
            <div
              style={{
                ...styles.queueProgress,
                width: `${queuePercentage}%`,
              }}
            ></div>
          </div>

          <div style={styles.progressLabels}>
            <span>Queue</span>
            <span>50,000 capacity</span>
          </div>

          {/* Queue stats */}
          <div style={styles.smallStats}>
            <SmallStat
              label="Admission Batch"
              value={metrics.admissionRate}
            />

            <SmallStat
              label="Active Sessions"
              value={`${metrics.activeSessions}/${metrics.maxSessions}`}
            />

            <SmallStat
              label="Requests/sec"
              value={metrics.requestsPerSecond.toLocaleString()}
            />
          </div>
        </div>

        {/* INVENTORY */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Inventory</h2>

              <p style={styles.cardDescription}>
                Current ticket inventory state.
              </p>
            </div>

            <div style={styles.inventoryIcon}>#</div>
          </div>

          <InventoryRow
            label="Available"
            value={metrics.availableTickets}
            type="available"
          />

          <InventoryRow
            label="Reserved"
            value={metrics.reservedTickets}
            type="reserved"
          />

          <InventoryRow
            label="Confirmed"
            value={metrics.confirmedTickets}
            type="confirmed"
          />

          <div style={styles.inventoryTotal}>
            <span>Total Inventory</span>

            <strong>
              {(
                metrics.availableTickets +
                metrics.reservedTickets +
                metrics.confirmedTickets
              ).toLocaleString()}
            </strong>
          </div>

          <div style={styles.inventoryProtection}>
            <span style={styles.checkIcon}>✓</span>

            <span>Overselling protection active</span>
          </div>
        </div>
      </div>

      {/* SECOND ROW */}
      <div style={styles.secondGrid}>
        {/* ACTIVE SESSIONS */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Active Sessions</h2>

              <p style={styles.cardDescription}>
                Current admitted users.
              </p>
            </div>

            <strong style={styles.sessionValue}>
              {metrics.activeSessions}
            </strong>
          </div>

          <div style={styles.progressBackground}>
            <div
              style={{
                ...styles.sessionProgress,
                width: `${sessionPercentage}%`,
              }}
            ></div>
          </div>

          <div style={styles.progressLabels}>
            <span>0</span>

            <span>
              Capacity {metrics.maxSessions}
            </span>
          </div>

          <div style={styles.sessionInfo}>
            <div>
              <span style={styles.sessionLabel}>
                Current
              </span>

              <strong>
                {metrics.activeSessions}
              </strong>
            </div>

            <div>
              <span style={styles.sessionLabel}>
                Available
              </span>

              <strong>
                {metrics.maxSessions - metrics.activeSessions}
              </strong>
            </div>
          </div>
        </div>

        {/* SYSTEM HEALTH */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>System Health</h2>

              <p style={styles.cardDescription}>
                Current backend operating conditions.
              </p>
            </div>
          </div>

          <HealthRow
            label="Backend"
            value="Operational"
            status="HEALTHY"
          />

          <HealthRow
            label="Redis"
            value="Connected"
            status="HEALTHY"
          />

          <HealthRow
            label="Database"
            value="Connected"
            status="HEALTHY"
          />

          <HealthRow
            label="Queue Worker"
            value="Running"
            status="ACTIVE"
          />
        </div>

        {/* ALERTS */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Alerts</h2>

              <p style={styles.cardDescription}>
                Recent system events.
              </p>
            </div>

            <span style={styles.alertCount}>3</span>
          </div>

          <AlertItem
            severity="CRITICAL"
            message="Backend error rate increased"
            time="10:42"
          />

          <AlertItem
            severity="WARNING"
            message="Queue above 40,000 users"
            time="10:40"
          />

          <AlertItem
            severity="INFO"
            message="Admission rate updated"
            time="10:35"
          />
        </div>
      </div>

      {/* TRAFFIC OVERVIEW */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              Traffic Overview
            </h2>

            <p style={styles.cardDescription}>
              Request activity during the current monitoring window.
            </p>
          </div>

          <span style={styles.requestsLabel}>
            {metrics.requestsPerSecond.toLocaleString()} req/sec
          </span>
        </div>

        <div style={styles.chart}>
          <div style={styles.yAxis}>
            <span>2K</span>
            <span>1.5K</span>
            <span>1K</span>
            <span>500</span>
            <span>0</span>
          </div>

          <div style={styles.chartArea}>
            <div style={styles.chartLine}></div>
            <div style={styles.chartLine}></div>
            <div style={styles.chartLine}></div>
            <div style={styles.chartLine}></div>

            <div style={styles.chartBars}>
              <ChartBar height="45%" />
              <ChartBar height="58%" />
              <ChartBar height="50%" />
              <ChartBar height="70%" />
              <ChartBar height="62%" />
              <ChartBar height="84%" />
              <ChartBar height="75%" />
              <ChartBar height="92%" />
              <ChartBar height="80%" />
              <ChartBar height="96%" />
              <ChartBar height="88%" />
              <ChartBar height="94%" />
            </div>
          </div>
        </div>
      </div>

      {/* FAIRQUEUE FLOW */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              FairQueue Request Flow
            </h2>

            <p style={styles.cardDescription}>
              High-level view of how traffic is controlled.
            </p>
          </div>
        </div>

        <div style={styles.flow}>
          <FlowStep
            number="01"
            title="Incoming Traffic"
            description="Users enter the system"
          />

          <div style={styles.arrow}>→</div>

          <FlowStep
            number="02"
            title="Waiting Room"
            description="Users receive queue position"
          />

          <div style={styles.arrow}>→</div>

          <FlowStep
            number="03"
            title="Admission Control"
            description="Controlled batches enter"
          />

          <div style={styles.arrow}>→</div>

          <FlowStep
            number="04"
            title="Booking"
            description="Users access inventory"
          />

          <div style={styles.arrow}>→</div>

          <FlowStep
            number="05"
            title="Confirmation"
            description="Purchase completed"
          />
        </div>
      </div>

      {/* INFO */}
      <div style={styles.infoBox}>
        <div style={styles.infoIcon}>i</div>

        <div>
          <h3 style={styles.infoTitle}>
            Dashboard data
          </h3>

          <p style={styles.infoText}>
            The values currently shown are development data for the
            dashboard UI. They should later be replaced by real-time
            backend metrics and Socket.IO events.
          </p>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  title,
  value,
  description,
  type,
}) {
  const config = {
    users: {
      background: "#eef2ff",
      color: "#4f46e5",
      icon: "U",
    },

    queue: {
      background: "#eff6ff",
      color: "#2563eb",
      icon: "Q",
    },

    admission: {
      background: "#ecfdf5",
      color: "#15803d",
      icon: "A",
    },

    load: {
      background: "#fff7ed",
      color: "#c2410c",
      icon: "L",
    },
  };

  const current = config[type];

  return (
    <div style={styles.metricCard}>
      <div
        style={{
          ...styles.metricIcon,
          background: current.background,
          color: current.color,
        }}
      >
        {current.icon}
      </div>

      <div>
        <p style={styles.metricTitle}>{title}</p>

        <h2 style={styles.metricValue}>{value}</h2>

        <p style={styles.metricDescription}>
          {description}
        </p>
      </div>
    </div>
  );
}


/* =========================================================
   SMALL STAT
========================================================= */

function SmallStat({ label, value }) {
  return (
    <div style={styles.smallStat}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}


/* =========================================================
   INVENTORY ROW
========================================================= */

function InventoryRow({
  label,
  value,
  type,
}) {
  const colors = {
    available: "#15803d",
    reserved: "#a16207",
    confirmed: "#2563eb",
  };

  return (
    <div style={styles.inventoryRow}>
      <div style={styles.inventoryLabel}>
        <span
          style={{
            ...styles.inventoryDot,
            background: colors[type],
          }}
        ></span>

        {label}
      </div>

      <strong>{value.toLocaleString()}</strong>
    </div>
  );
}


/* =========================================================
   HEALTH ROW
========================================================= */

function HealthRow({
  label,
  value,
  status,
}) {
  return (
    <div style={styles.healthRow}>
      <span>{label}</span>

      <div style={styles.healthRight}>
        <strong>{value}</strong>

        <span style={styles.healthBadge}>
          <span style={styles.healthDot}></span>
          {status}
        </span>
      </div>
    </div>
  );
}


/* =========================================================
   ALERT ITEM
========================================================= */

function AlertItem({
  severity,
  message,
  time,
}) {
  const config = {
    CRITICAL: {
      background: "#fee2e2",
      color: "#b91c1c",
    },

    WARNING: {
      background: "#fef3c7",
      color: "#a16207",
    },

    INFO: {
      background: "#dbeafe",
      color: "#1d4ed8",
    },
  };

  const current = config[severity];

  return (
    <div style={styles.alertItem}>
      <span
        style={{
          ...styles.alertSeverity,
          background: current.background,
          color: current.color,
        }}
      >
        {severity}
      </span>

      <div style={styles.alertContent}>
        <strong>{message}</strong>

        <span>{time}</span>
      </div>
    </div>
  );
}


/* =========================================================
   CHART BAR
========================================================= */

function ChartBar({ height }) {
  return (
    <div
      style={{
        ...styles.chartBar,
        height,
      }}
    ></div>
  );
}


/* =========================================================
   FLOW STEP
========================================================= */

function FlowStep({
  number,
  title,
  description,
}) {
  return (
    <div style={styles.flowStep}>
      <div style={styles.flowNumber}>{number}</div>

      <strong style={styles.flowTitle}>{title}</strong>

      <p style={styles.flowDescription}>
        {description}
      </p>
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
    marginBottom: "30px",
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
    color: "#64748b",
    fontSize: "14px",
  },

  systemStatus: {
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "9px 13px",
    borderRadius: "20px",
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

  metricCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "13px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
  },

  metricIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "16px",
  },

  metricTitle: {
    margin: 0,
    fontSize: "10px",
    fontWeight: "700",
    color: "#64748b",
    letterSpacing: "0.7px",
  },

  metricValue: {
    margin: "5px 0 2px",
    fontSize: "25px",
    fontWeight: "800",
  },

  metricDescription: {
    margin: 0,
    fontSize: "11px",
    color: "#94a3b8",
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  secondGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
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

  liveBadge: {
    padding: "5px 9px",
    borderRadius: "5px",
    background: "#ecfdf5",
    color: "#15803d",
    fontSize: "9px",
    fontWeight: "800",
  },

  queueNumbers: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "13px",
  },

  bigNumber: {
    fontSize: "32px",
    fontWeight: "800",
  },

  smallText: {
    color: "#94a3b8",
    fontSize: "12px",
  },

  queuePercentage: {
    fontSize: "18px",
    color: "#4f46e5",
    fontWeight: "800",
  },

  progressBackground: {
    height: "11px",
    background: "#e2e8f0",
    borderRadius: "20px",
    overflow: "hidden",
  },

  queueProgress: {
    height: "100%",
    background: "#4f46e5",
    borderRadius: "20px",
  },

  sessionProgress: {
    height: "100%",
    background: "#22c55e",
    borderRadius: "20px",
  },

  progressLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "7px",
    fontSize: "10px",
    color: "#94a3b8",
  },

  smallStats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "22px",
  },

  smallStat: {
    padding: "12px",
    background: "#f8fafc",
    borderRadius: "8px",
  },

  inventoryIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "9px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  inventoryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 0",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "13px",
  },

  inventoryLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#64748b",
  },

  inventoryDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
  },

  inventoryTotal: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "17px",
    fontSize: "13px",
  },

  inventoryProtection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "17px",
    padding: "10px",
    borderRadius: "7px",
    background: "#ecfdf5",
    color: "#15803d",
    fontSize: "10px",
    fontWeight: "700",
  },

  checkIcon: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#22c55e",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  sessionValue: {
    fontSize: "25px",
  },

  sessionInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },

  sessionLabel: {
    display: "block",
    fontSize: "10px",
    color: "#94a3b8",
    marginBottom: "4px",
  },

  healthRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "12px",
  },

  healthRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  healthBadge: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 7px",
    borderRadius: "5px",
    background: "#ecfdf5",
    color: "#15803d",
    fontSize: "8px",
    fontWeight: "800",
  },

  healthDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#22c55e",
  },

  alertCount: {
    minWidth: "25px",
    height: "25px",
    borderRadius: "50%",
    background: "#fee2e2",
    color: "#b91c1c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "800",
  },

  alertItem: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "13px 0",
    borderBottom: "1px solid #f1f5f9",
  },

  alertSeverity: {
    padding: "5px 6px",
    borderRadius: "4px",
    fontSize: "7px",
    fontWeight: "800",
  },

  alertContent: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    fontSize: "10px",
  },

  requestsLabel: {
    padding: "6px 9px",
    background: "#eff6ff",
    color: "#2563eb",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: "700",
  },

  chart: {
    display: "flex",
    height: "230px",
  },

  yAxis: {
    width: "35px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "5px",
    color: "#94a3b8",
    fontSize: "9px",
  },

  chartArea: {
    position: "relative",
    flex: 1,
    borderLeft: "1px solid #e2e8f0",
    borderBottom: "1px solid #e2e8f0",
  },

  chartLine: {
    height: "1px",
    background: "#f1f5f9",
    marginTop: "43px",
  },

  chartBars: {
    position: "absolute",
    left: "20px",
    right: "20px",
    bottom: "0",
    top: "0",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-around",
    gap: "8px",
  },

  chartBar: {
    flex: 1,
    maxWidth: "35px",
    background: "#4f46e5",
    borderRadius: "4px 4px 0 0",
  },

  flow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    overflowX: "auto",
  },

  flowStep: {
    minWidth: "145px",
    padding: "15px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "9px",
  },

  flowNumber: {
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
    marginBottom: "10px",
  },

  flowTitle: {
    display: "block",
    fontSize: "11px",
  },

  flowDescription: {
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

  infoBox: {
    display: "flex",
    gap: "12px",
    padding: "17px",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "11px",
  },

  infoIcon: {
    width: "28px",
    height: "28px",
    flexShrink: 0,
    borderRadius: "50%",
    background: "#3b82f6",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  infoTitle: {
    margin: "2px 0 4px",
    fontSize: "13px",
    color: "#1e40af",
  },

  infoText: {
    margin: 0,
    fontSize: "11px",
    lineHeight: "1.5",
    color: "#1e40af",
  },
};