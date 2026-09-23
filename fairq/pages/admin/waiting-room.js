import { useState } from "react";

export default function WaitingRoom() {
  const [queueOpen, setQueueOpen] = useState(true);
  const [autoAdmission, setAutoAdmission] = useState(true);
  const [admissionRate, setAdmissionRate] = useState(1200);
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    {
      position: 1,
      id: "USR-98231",
      name: "Arun Kumar",
      joined: "14:02:11",
      waitTime: "03:12",
      status: "Ready",
    },
    {
      position: 2,
      id: "USR-98232",
      name: "Rahul S",
      joined: "14:02:14",
      waitTime: "03:09",
      status: "Ready",
    },
    {
      position: 3,
      id: "USR-98233",
      name: "Karthik M",
      joined: "14:02:18",
      waitTime: "03:05",
      status: "Ready",
    },
    {
      position: 4,
      id: "USR-98234",
      name: "Vignesh R",
      joined: "14:02:24",
      waitTime: "02:59",
      status: "Ready",
    },
    {
      position: 5,
      id: "USR-98235",
      name: "Sanjay P",
      joined: "14:02:29",
      waitTime: "02:54",
      status: "Waiting",
    },
    {
      position: 6,
      id: "USR-98236",
      name: "Ajay Kumar",
      joined: "14:02:35",
      waitTime: "02:48",
      status: "Waiting",
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.id.toLowerCase().includes(value) ||
      user.name.toLowerCase().includes(value)
    );
  });

  function admitUser(id) {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status: "Admitted",
            }
          : user
      )
    );
  }

  function removeUser(id) {
    setUsers((current) =>
      current.filter((user) => user.id !== id)
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <div style={styles.header}>
        <div>
          <div style={styles.breadcrumb}>
            ADMIN / WAITING ROOM
          </div>

          <h1 style={styles.title}>
            Waiting Room
          </h1>

          <p style={styles.subtitle}>
            Monitor the virtual queue and control user
            admission into the protected booking system.
          </p>
        </div>

        <div style={styles.headerStatus}>
          <span style={styles.liveDot}></span>
          LIVE QUEUE
        </div>
      </div>

      {/* TOP METRICS */}

      <div style={styles.metrics}>
        <Metric
          label="USERS IN QUEUE"
          value="18,642"
          change="+428 / min"
        />

        <Metric
          label="CURRENT POSITION"
          value="1,248"
          change="Average"
        />

        <Metric
          label="ADMISSION RATE"
          value={`${admissionRate}/min`}
          change="Configured"
        />

        <Metric
          label="AVG WAIT TIME"
          value="14m 32s"
          change="-2m 14s"
        />

        <Metric
          label="QUEUE STATUS"
          value={queueOpen ? "OPEN" : "PAUSED"}
          change={
            autoAdmission
              ? "Auto admission"
              : "Manual admission"
          }
        />
      </div>

      {/* CONTROL PANEL */}

      <div style={styles.controlCard}>
        <div>
          <h2 style={styles.cardTitle}>
            Queue Controls
          </h2>

          <p style={styles.cardSubtitle}>
            Control how users are admitted from the virtual
            queue.
          </p>
        </div>

        <div style={styles.controls}>
          <Control
            title="Queue"
            description={
              queueOpen
                ? "Accepting users"
                : "Temporarily paused"
            }
          >
            <Toggle
              enabled={queueOpen}
              onChange={setQueueOpen}
            />
          </Control>

          <Control
            title="Auto Admission"
            description={
              autoAdmission
                ? "Automatically admitting users"
                : "Manual admission"
            }
          >
            <Toggle
              enabled={autoAdmission}
              onChange={setAutoAdmission}
            />
          </Control>

          <div style={styles.rateControl}>
            <div>
              <strong style={styles.controlTitle}>
                Admission Rate
              </strong>

              <p style={styles.controlDescription}>
                Users admitted per minute
              </p>
            </div>

            <div style={styles.rateInput}>
              <input
                type="number"
                value={admissionRate}
                onChange={(e) =>
                  setAdmissionRate(
                    Number(e.target.value)
                  )
                }
                style={styles.rateField}
              />

              <span style={styles.rateUnit}>
                / min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUEUE VISUALIZATION */}

      <div style={styles.visualCard}>
        <div style={styles.visualHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              Queue Distribution
            </h2>

            <p style={styles.cardSubtitle}>
              Current users across the FairQueue admission
              pipeline.
            </p>
          </div>

          <div style={styles.capacity}>
            <span>CAPACITY</span>
            <strong>40,000</strong>
          </div>
        </div>

        <div style={styles.queueBar}>
          <div
            style={{
              ...styles.queueFilled,
              width: "46.6%",
            }}
          />
        </div>

        <div style={styles.queueLegend}>
          <Legend
            label="Waiting"
            value="18,642"
            type="waiting"
          />

          <Legend
            label="Admitted"
            value="40,000"
            type="admitted"
          />

          <Legend
            label="Available"
            value="21,358"
            type="available"
          />
        </div>
      </div>

      {/* USER TABLE */}

      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              Queue Users
            </h2>

            <p style={styles.cardSubtitle}>
              Users currently waiting for admission.
            </p>
          </div>

          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>
              ⌕
            </span>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search user..."
              style={styles.searchInput}
            />
          </div>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>POSITION</th>
                <th style={styles.th}>USER</th>
                <th style={styles.th}>JOINED</th>
                <th style={styles.th}>WAIT TIME</th>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>
                    <div style={styles.position}>
                      #{user.position}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.user}>
                      <div style={styles.avatar}>
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <strong style={styles.userName}>
                          {user.name}
                        </strong>

                        <span style={styles.userId}>
                          {user.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>
                    {user.joined}
                  </td>

                  <td style={styles.td}>
                    {user.waitTime}
                  </td>

                  <td style={styles.td}>
                    <Status status={user.status} />
                  </td>

                  <td style={styles.td}>
                    {user.status !== "Admitted" && (
                      <div style={styles.actions}>
                        <button
                          style={styles.admitButton}
                          onClick={() =>
                            admitUser(user.id)
                          }
                        >
                          Admit
                        </button>

                        <button
                          style={styles.removeButton}
                          onClick={() =>
                            removeUser(user.id)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    style={styles.empty}
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAIRQUEUE FLOW */}

      <div style={styles.flowCard}>
        <div>
          <h2 style={styles.flowTitle}>
            Virtual Queue Flow
          </h2>

          <p style={styles.flowDescription}>
            FairQueue separates incoming traffic from the
            protected booking system.
          </p>
        </div>

        <div style={styles.flow}>
          <FlowStep
            number="01"
            title="Incoming Traffic"
            text="Large traffic spike"
          />

          <FlowLine />

          <FlowStep
            number="02"
            title="Virtual Queue"
            text="Users wait here"
          />

          <FlowLine />

          <FlowStep
            number="03"
            title="Controlled Admission"
            text={`${admissionRate}/min`}
          />

          <FlowLine />

          <FlowStep
            number="04"
            title="Booking System"
            text="Protected capacity"
          />
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   METRIC
========================================================= */

function Metric({
  label,
  value,
  change,
}) {
  return (
    <div style={styles.metricCard}>
      <span style={styles.metricLabel}>
        {label}
      </span>

      <strong style={styles.metricValue}>
        {value}
      </strong>

      <span style={styles.metricChange}>
        {change}
      </span>
    </div>
  );
}


/* =========================================================
   CONTROL
========================================================= */

function Control({
  title,
  description,
  children,
}) {
  return (
    <div style={styles.control}>
      <div>
        <strong style={styles.controlTitle}>
          {title}
        </strong>

        <p style={styles.controlDescription}>
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}


/* =========================================================
   TOGGLE
========================================================= */

function Toggle({
  enabled,
  onChange,
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      style={{
        ...styles.toggle,
        background: enabled
          ? "#4f46e5"
          : "#cbd5e1",
      }}
    >
      <span
        style={{
          ...styles.toggleKnob,
          transform: enabled
            ? "translateX(18px)"
            : "translateX(0)",
        }}
      />
    </button>
  );
}


/* =========================================================
   STATUS
========================================================= */

function Status({ status }) {
  let style = styles.waiting;

  if (status === "Ready") {
    style = styles.ready;
  }

  if (status === "Admitted") {
    style = styles.admitted;
  }

  return (
    <span
      style={{
        ...styles.status,
        ...style,
      }}
    >
      <span style={styles.statusDot}></span>
      {status}
    </span>
  );
}


/* =========================================================
   LEGEND
========================================================= */

function Legend({
  label,
  value,
  type,
}) {
  let dotStyle = styles.waitingDot;

  if (type === "admitted") {
    dotStyle = styles.admittedDot;
  }

  if (type === "available") {
    dotStyle = styles.availableDot;
  }

  return (
    <div style={styles.legend}>
      <span
        style={{
          ...styles.legendDot,
          ...dotStyle,
        }}
      />

      <span style={styles.legendLabel}>
        {label}
      </span>

      <strong style={styles.legendValue}>
        {value}
      </strong>
    </div>
  );
}


/* =========================================================
   FLOW STEP
========================================================= */

function FlowStep({
  number,
  title,
  text,
}) {
  return (
    <div style={styles.flowStep}>
      <div style={styles.flowNumber}>
        {number}
      </div>

      <strong style={styles.flowStepTitle}>
        {title}
      </strong>

      <span style={styles.flowStepText}>
        {text}
      </span>
    </div>
  );
}


/* =========================================================
   FLOW LINE
========================================================= */

function FlowLine() {
  return (
    <div style={styles.flowLine}>
      →
    </div>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "34px 42px",
    background: "#f8fafc",
    color: "#172033",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "25px",
  },

  breadcrumb: {
    color: "#6366f1",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "1px",
    marginBottom: "7px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
    letterSpacing: "-0.8px",
  },

  subtitle: {
    margin: "7px 0 0",
    color: "#64748b",
    fontSize: "11px",
  },

  headerStatus: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "8px 11px",
    borderRadius: "7px",
    background: "#ecfdf5",
    color: "#15803d",
    fontSize: "8px",
    fontWeight: "800",
  },

  liveDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#22c55e",
  },

  metrics: {
    display: "grid",
    gridTemplateColumns:
      "repeat(5, minmax(0, 1fr))",
    gap: "13px",
    marginBottom: "18px",
  },

  metricCard: {
    padding: "16px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
  },

  metricLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: "8px",
    fontWeight: "800",
    letterSpacing: "0.7px",
  },

  metricValue: {
    display: "block",
    marginTop: "8px",
    fontSize: "20px",
    letterSpacing: "-0.5px",
  },

  metricChange: {
    display: "block",
    marginTop: "5px",
    color: "#16a34a",
    fontSize: "8px",
    fontWeight: "700",
  },

  controlCard: {
    padding: "20px",
    marginBottom: "15px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "13px",
  },

  cardSubtitle: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "9px",
  },

  controls: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "18px",
  },

  control: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    padding: "13px",
    border: "1px solid #eef2f7",
    borderRadius: "8px",
    background: "#fafbfc",
  },

  controlTitle: {
    display: "block",
    fontSize: "9px",
  },

  controlDescription: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "7px",
  },

  toggle: {
    width: "38px",
    height: "21px",
    flexShrink: 0,
    padding: "2px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },

  toggleKnob: {
    display: "block",
    width: "17px",
    height: "17px",
    borderRadius: "50%",
    background: "#ffffff",
    transition: "0.2s",
  },

  rateControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "13px",
    border: "1px solid #eef2f7",
    borderRadius: "8px",
    background: "#fafbfc",
  },

  rateInput: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #dbe1ea",
    borderRadius: "6px",
    background: "#ffffff",
    overflow: "hidden",
  },

  rateField: {
    width: "65px",
    height: "28px",
    border: "none",
    outline: "none",
    padding: "0 7px",
    fontSize: "8px",
  },

  rateUnit: {
    paddingRight: "7px",
    color: "#94a3b8",
    fontSize: "7px",
  },

  visualCard: {
    padding: "20px",
    marginBottom: "15px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
  },

  visualHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  capacity: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "3px",
  },

  capacitySpan: {
    color: "#94a3b8",
  },

  capacity: {
    color: "#64748b",
    fontSize: "8px",
    fontWeight: "800",
    textAlign: "right",
  },

  queueBar: {
    height: "16px",
    marginTop: "20px",
    borderRadius: "10px",
    background: "#e2e8f0",
    overflow: "hidden",
  },

  queueFilled: {
    height: "100%",
    borderRadius: "10px",
    background: "#6366f1",
  },

  queueLegend: {
    display: "flex",
    gap: "28px",
    marginTop: "13px",
  },

  legend: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  legendDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
  },

  waitingDot: {
    background: "#6366f1",
  },

  admittedDot: {
    background: "#22c55e",
  },

  availableDot: {
    background: "#cbd5e1",
  },

  legendLabel: {
    color: "#64748b",
    fontSize: "8px",
  },

  legendValue: {
    fontSize: "8px",
  },

  tableCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  tableHeader: {
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #eef2f7",
  },

  searchBox: {
    width: "230px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #dbe1ea",
    borderRadius: "7px",
  },

  searchIcon: {
    paddingLeft: "9px",
    color: "#94a3b8",
    fontSize: "13px",
  },

  searchInput: {
    flex: 1,
    height: "100%",
    border: "none",
    outline: "none",
    padding: "0 8px",
    fontSize: "8px",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  },

  th: {
    padding: "11px 15px",
    textAlign: "left",
    background: "#fafbfc",
    borderBottom: "1px solid #eef2f7",
    color: "#94a3b8",
    fontSize: "7px",
    fontWeight: "800",
    letterSpacing: "0.7px",
  },

  td: {
    padding: "13px 15px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "8px",
    whiteSpace: "nowrap",
  },

  position: {
    color: "#4f46e5",
    fontWeight: "800",
  },

  user: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  avatar: {
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "9px",
    fontWeight: "800",
  },

  userName: {
    display: "block",
    fontSize: "8px",
  },

  userId: {
    display: "block",
    marginTop: "2px",
    color: "#94a3b8",
    fontSize: "7px",
  },

  status: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 7px",
    borderRadius: "5px",
    fontSize: "7px",
    fontWeight: "800",
  },

  statusDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "currentColor",
  },

  ready: {
    background: "#ecfdf5",
    color: "#15803d",
  },

  waiting: {
    background: "#eef2ff",
    color: "#4f46e5",
  },

  admitted: {
    background: "#f0fdf4",
    color: "#16a34a",
  },

  actions: {
    display: "flex",
    gap: "5px",
  },

  admitButton: {
    border: "none",
    background: "#4f46e5",
    color: "#ffffff",
    padding: "5px 8px",
    borderRadius: "5px",
    fontSize: "7px",
    fontWeight: "700",
    cursor: "pointer",
  },

  removeButton: {
    border: "1px solid #fecaca",
    background: "#ffffff",
    color: "#dc2626",
    padding: "5px 8px",
    borderRadius: "5px",
    fontSize: "7px",
    fontWeight: "700",
    cursor: "pointer",
  },

  empty: {
    padding: "35px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "9px",
  },

  flowCard: {
    marginTop: "15px",
    padding: "20px",
    background: "#111827",
    color: "#ffffff",
    borderRadius: "10px",
  },

  flowTitle: {
    margin: 0,
    fontSize: "13px",
  },

  flowDescription: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "9px",
  },

  flow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20px",
  },

  flowStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "130px",
    textAlign: "center",
  },

  flowNumber: {
    width: "29px",
    height: "29px",
    borderRadius: "50%",
    background: "#312e81",
    color: "#a5b4fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "8px",
    fontWeight: "800",
  },

  flowStepTitle: {
    marginTop: "7px",
    fontSize: "9px",
  },

  flowStepText: {
    marginTop: "3px",
    color: "#64748b",
    fontSize: "7px",
  },

  flowLine: {
    flex: 1,
    textAlign: "center",
    color: "#475569",
    fontSize: "15px",
  },
};