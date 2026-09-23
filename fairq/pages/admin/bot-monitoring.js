import { useState } from "react";

export default function BotMonitoring() {
  const [filter, setFilter] = useState("ALL");

  // Temporary development data.
  // Later this will come from the backend API.
  const [requests, setRequests] = useState([
    {
      id: 1,
      time: "10:42:18",
      source: "Session XYZ",
      reason: "Too many requests",
      action: "RATE LIMITED",
      status: "RATE LIMITED",
    },
    {
      id: 2,
      time: "10:41:52",
      source: "Session ABC",
      reason: "Suspicious request pattern",
      action: "BLOCKED",
      status: "BLOCKED",
    },
    {
      id: 3,
      time: "10:41:20",
      source: "Session PQR",
      reason: "Verification required",
      action: "VERIFICATION",
      status: "VERIFICATION",
    },
    {
      id: 4,
      time: "10:40:46",
      source: "Session LMN",
      reason: "Normal traffic",
      action: "ALLOWED",
      status: "NORMAL",
    },
    {
      id: 5,
      time: "10:40:12",
      source: "Session DEF",
      reason: "Too many requests",
      action: "RATE LIMITED",
      status: "RATE LIMITED",
    },
    {
      id: 6,
      time: "10:39:38",
      source: "Session GHI",
      reason: "Suspicious pattern",
      action: "BLOCKED",
      status: "BLOCKED",
    },
    {
      id: 7,
      time: "10:38:54",
      source: "Session JKL",
      reason: "Normal traffic",
      action: "ALLOWED",
      status: "NORMAL",
    },
  ]);

  const normalCount = 45210;
  const rateLimitedCount = 420;
  const verificationCount = 85;
  const blockedCount = 35;

  const filteredRequests =
    filter === "ALL"
      ? requests
      : requests.filter((request) => request.status === filter);

  const handleBlock = (id) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              action: "BLOCKED",
              status: "BLOCKED",
              reason: "Admin blocked session",
            }
          : request
      )
    );

    // Later:
    // POST /api/admin/bot/block
  };

  const handleUnblock = (id) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              action: "ALLOWED",
              status: "NORMAL",
              reason: "Admin unblocked session",
            }
          : request
      )
    );

    // Later:
    // POST /api/admin/bot/unblock
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <p style={styles.overline}>FAIRQUEUE ADMIN</p>

          <h1 style={styles.title}>Bot Monitoring</h1>

          <p style={styles.subtitle}>
            Monitor suspicious traffic, rate limits and blocked requests.
          </p>
        </div>

        <div style={styles.liveBadge}>
          <span style={styles.liveDot}></span>
          LIVE MONITORING
        </div>
      </div>

      {/* METRIC CARDS */}
      <div style={styles.metricsGrid}>
        <MetricCard
          title="NORMAL REQUESTS"
          value={normalCount.toLocaleString()}
          description="Requests allowed"
          type="normal"
        />

        <MetricCard
          title="RATE LIMITED"
          value={rateLimitedCount.toLocaleString()}
          description="Requests throttled"
          type="warning"
        />

        <MetricCard
          title="VERIFICATION"
          value={verificationCount.toLocaleString()}
          description="Verification required"
          type="verification"
        />

        <MetricCard
          title="BLOCKED"
          value={blockedCount.toLocaleString()}
          description="Requests blocked"
          type="blocked"
        />
      </div>

      {/* TRAFFIC OVERVIEW */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Request Behaviour</h2>

              <p style={styles.cardDescription}>
                Traffic classification over the current monitoring window.
              </p>
            </div>

            <span style={styles.liveSmall}>LIVE</span>
          </div>

          <div style={styles.chart}>
            <div style={styles.chartYAxis}>
              <span>50K</span>
              <span>40K</span>
              <span>30K</span>
              <span>20K</span>
              <span>10K</span>
              <span>0</span>
            </div>

            <div style={styles.chartArea}>
              <div style={styles.gridLine}></div>
              <div style={styles.gridLine}></div>
              <div style={styles.gridLine}></div>
              <div style={styles.gridLine}></div>
              <div style={styles.gridLine}></div>

              <div style={styles.bars}>
                <Bar height="72%" label="10:00" />
                <Bar height="61%" label="10:10" />
                <Bar height="82%" label="10:20" />
                <Bar height="68%" label="10:30" />
                <Bar height="91%" label="10:40" />
                <Bar height="76%" label="10:50" />
              </div>
            </div>
          </div>

          <div style={styles.chartLegend}>
            <span>
              <span style={styles.legendDotNormal}></span>
              Normal
            </span>

            <span>
              <span style={styles.legendDotWarning}></span>
              Rate Limited
            </span>

            <span>
              <span style={styles.legendDotBlocked}></span>
              Blocked
            </span>
          </div>
        </div>

        {/* SECURITY STATUS */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Protection Status</h2>

              <p style={styles.cardDescription}>
                Current bot and rate-limit protection state.
              </p>
            </div>
          </div>

          <ProtectionRow
            label="Rate Limiting"
            status="ACTIVE"
          />

          <ProtectionRow
            label="Bot Detection"
            status="ACTIVE"
          />

          <ProtectionRow
            label="Request Verification"
            status="ACTIVE"
          />

          <ProtectionRow
            label="IP Protection"
            status="ACTIVE"
          />

          <div style={styles.securityInfo}>
            <div style={styles.securityIcon}>✓</div>

            <div>
              <strong style={styles.securityTitle}>
                Protection systems operational
              </strong>

              <p style={styles.securityText}>
                Suspicious traffic is being monitored before reaching the
                booking system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REQUEST TABLE */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <div>
            <h2 style={styles.cardTitle}>Request Activity</h2>

            <p style={styles.cardDescription}>
              Recent traffic classification and actions.
            </p>
          </div>

          <div style={styles.filters}>
            {[
              "ALL",
              "NORMAL",
              "RATE LIMITED",
              "VERIFICATION",
              "BLOCKED",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                style={{
                  ...styles.filterButton,
                  ...(filter === item ? styles.activeFilter : {}),
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>TIME</th>
                <th style={styles.th}>SOURCE / IDENTIFIER</th>
                <th style={styles.th}>REASON</th>
                <th style={styles.th}>ACTION</th>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>CONTROL</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td style={styles.td}>
                    <span style={styles.time}>
                      {request.time}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <strong style={styles.source}>
                      {request.source}
                    </strong>
                  </td>

                  <td style={styles.td}>
                    {request.reason}
                  </td>

                  <td style={styles.td}>
                    <ActionBadge action={request.action} />
                  </td>

                  <td style={styles.td}>
                    <StatusBadge status={request.status} />
                  </td>

                  <td style={styles.td}>
                    {request.status === "BLOCKED" ? (
                      <button
                        style={styles.unblockButton}
                        onClick={() => handleUnblock(request.id)}
                      >
                        UNBLOCK
                      </button>
                    ) : (
                      <button
                        style={styles.blockButton}
                        onClick={() => handleBlock(request.id)}
                      >
                        BLOCK
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="6" style={styles.emptyState}>
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* IMPORTANT INFO */}
      <div style={styles.infoBox}>
        <div style={styles.infoIcon}>i</div>

        <div>
          <h3 style={styles.infoTitle}>
            Backend-controlled protection
          </h3>

          <p style={styles.infoText}>
            Bot detection, rate limiting and blocking must be enforced by
            backend services. This dashboard only displays monitoring data
            and sends authorized administrative actions to the backend.
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
    normal: {
      background: "#ecfdf5",
      color: "#15803d",
      icon: "✓",
    },

    warning: {
      background: "#fffbeb",
      color: "#a16207",
      icon: "!",
    },

    verification: {
      background: "#eff6ff",
      color: "#1d4ed8",
      icon: "?",
    },

    blocked: {
      background: "#fef2f2",
      color: "#b91c1c",
      icon: "×",
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
   BAR
========================================================= */

function Bar({ height, label }) {
  return (
    <div style={styles.barColumn}>
      <div
        style={{
          ...styles.bar,
          height,
        }}
      ></div>

      <span style={styles.barLabel}>{label}</span>
    </div>
  );
}

/* =========================================================
   PROTECTION ROW
========================================================= */

function ProtectionRow({ label, status }) {
  return (
    <div style={styles.protectionRow}>
      <span style={styles.protectionLabel}>
        {label}
      </span>

      <span style={styles.activeBadge}>
        <span style={styles.activeDot}></span>
        {status}
      </span>
    </div>
  );
}

/* =========================================================
   ACTION BADGE
========================================================= */

function ActionBadge({ action }) {
  let style = styles.actionNormal;

  if (action === "RATE LIMITED") {
    style = styles.actionWarning;
  }

  if (action === "BLOCKED") {
    style = styles.actionBlocked;
  }

  if (action === "VERIFICATION") {
    style = styles.actionVerification;
  }

  return (
    <span style={{ ...styles.actionBadge, ...style }}>
      {action}
    </span>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  let style = styles.statusNormal;

  if (status === "RATE LIMITED") {
    style = styles.statusWarning;
  }

  if (status === "BLOCKED") {
    style = styles.statusBlocked;
  }

  if (status === "VERIFICATION") {
    style = styles.statusVerification;
  }

  return (
    <span style={{ ...styles.statusBadge, ...style }}>
      {status}
    </span>
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

  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "8px 13px",
    borderRadius: "20px",
    background: "#ecfdf3",
    color: "#15803d",
    fontSize: "11px",
    fontWeight: "700",
  },

  liveDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#22c55e",
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
    fontSize: "18px",
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

  grid: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "23px",
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

  liveSmall: {
    padding: "5px 8px",
    borderRadius: "5px",
    background: "#ecfdf5",
    color: "#15803d",
    fontSize: "9px",
    fontWeight: "800",
  },

  chart: {
    display: "flex",
    height: "230px",
    marginTop: "10px",
  },

  chartYAxis: {
    width: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "25px",
    color: "#94a3b8",
    fontSize: "9px",
  },

  chartArea: {
    position: "relative",
    flex: 1,
    borderLeft: "1px solid #e2e8f0",
    borderBottom: "1px solid #e2e8f0",
  },

  gridLine: {
    height: "1px",
    background: "#f1f5f9",
    marginTop: "38px",
  },

  bars: {
    position: "absolute",
    left: "25px",
    right: "25px",
    bottom: "0",
    top: "0",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },

  barColumn: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "7px",
  },

  bar: {
    width: "30px",
    background: "#4f46e5",
    borderRadius: "5px 5px 0 0",
    minHeight: "10px",
  },

  barLabel: {
    fontSize: "9px",
    color: "#94a3b8",
  },

  chartLegend: {
    display: "flex",
    gap: "20px",
    marginTop: "15px",
    fontSize: "11px",
    color: "#64748b",
  },

  legendDotNormal: {
    display: "inline-block",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#22c55e",
    marginRight: "5px",
  },

  legendDotWarning: {
    display: "inline-block",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#f59e0b",
    marginRight: "5px",
  },

  legendDotBlocked: {
    display: "inline-block",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#ef4444",
    marginRight: "5px",
  },

  protectionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "17px 0",
    borderBottom: "1px solid #f1f5f9",
  },

  protectionLabel: {
    fontSize: "13px",
    color: "#475569",
  },

  activeBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 9px",
    borderRadius: "6px",
    background: "#ecfdf5",
    color: "#15803d",
    fontSize: "9px",
    fontWeight: "800",
  },

  activeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#22c55e",
  },

  securityInfo: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    padding: "13px",
    background: "#f8fafc",
    borderRadius: "9px",
  },

  securityIcon: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    background: "#dcfce7",
    color: "#15803d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "800",
  },

  securityTitle: {
    fontSize: "12px",
  },

  securityText: {
    margin: "3px 0 0",
    fontSize: "10px",
    color: "#64748b",
    lineHeight: "1.5",
  },

  tableCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    overflow: "hidden",
    marginBottom: "20px",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
  },

  tableHeader: {
    padding: "22px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eef2f7",
  },

  filters: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },

  filterButton: {
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#64748b",
    padding: "7px 10px",
    borderRadius: "6px",
    fontSize: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },

  activeFilter: {
    background: "#111827",
    color: "#ffffff",
    borderColor: "#111827",
  },

  tableContainer: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "13px 18px",
    textAlign: "left",
    fontSize: "9px",
    color: "#64748b",
    letterSpacing: "0.7px",
    fontWeight: "700",
    background: "#f8fafc",
    borderBottom: "1px solid #eef2f7",
  },

  td: {
    padding: "16px 18px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "12px",
    color: "#475569",
  },

  time: {
    fontFamily: "monospace",
    color: "#64748b",
    fontSize: "11px",
  },

  source: {
    color: "#334155",
  },

  actionBadge: {
    display: "inline-block",
    padding: "5px 7px",
    borderRadius: "5px",
    fontSize: "8px",
    fontWeight: "800",
  },

  actionNormal: {
    background: "#dcfce7",
    color: "#15803d",
  },

  actionWarning: {
    background: "#fef3c7",
    color: "#a16207",
  },

  actionBlocked: {
    background: "#fee2e2",
    color: "#b91c1c",
  },

  actionVerification: {
    background: "#dbeafe",
    color: "#1d4ed8",
  },

  statusBadge: {
    display: "inline-block",
    padding: "5px 7px",
    borderRadius: "5px",
    fontSize: "8px",
    fontWeight: "800",
  },

  statusNormal: {
    background: "#ecfdf5",
    color: "#15803d",
  },

  statusWarning: {
    background: "#fffbeb",
    color: "#a16207",
  },

  statusBlocked: {
    background: "#fef2f2",
    color: "#b91c1c",
  },

  statusVerification: {
    background: "#eff6ff",
    color: "#1d4ed8",
  },

  blockButton: {
    border: "1px solid #fecaca",
    background: "#fff",
    color: "#b91c1c",
    borderRadius: "6px",
    padding: "6px 9px",
    fontSize: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },

  unblockButton: {
    border: "1px solid #bbf7d0",
    background: "#fff",
    color: "#15803d",
    borderRadius: "6px",
    padding: "6px 9px",
    fontSize: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },

  emptyState: {
    textAlign: "center",
    padding: "45px",
    color: "#94a3b8",
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
    color: "#fff",
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