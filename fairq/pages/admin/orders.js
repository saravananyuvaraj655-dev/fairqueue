import { useState } from "react";

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [orders, setOrders] = useState([
    {
      id: "FQ-10482",
      customer: "Arun Kumar",
      event: "IPL Final 2026",
      ticket: "VIP",
      quantity: 2,
      amount: "₹8,000",
      status: "Confirmed",
      time: "2 min ago",
    },
    {
      id: "FQ-10481",
      customer: "Rahul S",
      event: "IPL Final 2026",
      ticket: "Premium",
      quantity: 3,
      amount: "₹9,000",
      status: "Confirmed",
      time: "4 min ago",
    },
    {
      id: "FQ-10480",
      customer: "Karthik M",
      event: "IPL Final 2026",
      ticket: "Regular",
      quantity: 2,
      amount: "₹3,000",
      status: "Processing",
      time: "6 min ago",
    },
    {
      id: "FQ-10479",
      customer: "Vignesh R",
      event: "IPL Final 2026",
      ticket: "VIP",
      quantity: 1,
      amount: "₹4,000",
      status: "Confirmed",
      time: "8 min ago",
    },
    {
      id: "FQ-10478",
      customer: "Sanjay P",
      event: "IPL Final 2026",
      ticket: "Regular",
      quantity: 4,
      amount: "₹6,000",
      status: "Cancelled",
      time: "10 min ago",
    },
    {
      id: "FQ-10477",
      customer: "Ajay Kumar",
      event: "IPL Final 2026",
      ticket: "Premium",
      quantity: 2,
      amount: "₹6,000",
      status: "Confirmed",
      time: "13 min ago",
    },
  ]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    const searchValue = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchValue) ||
      order.customer.toLowerCase().includes(searchValue) ||
      order.event.toLowerCase().includes(searchValue);

    return matchesStatus && matchesSearch;
  });

  function cancelOrder(id) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <div style={styles.header}>
        <div>
          <div style={styles.breadcrumb}>
            ADMIN / ORDERS
          </div>

          <h1 style={styles.title}>
            Orders
          </h1>

          <p style={styles.subtitle}>
            Monitor and manage ticket bookings processed
            through FairQueue.
          </p>
        </div>

        <div style={styles.headerStatus}>
          <span style={styles.statusDot}></span>
          ORDER SYSTEM ONLINE
        </div>
      </div>

      {/* METRICS */}

      <div style={styles.metrics}>
        <Metric
          label="TOTAL ORDERS"
          value="10,482"
          change="+12.4%"
        />

        <Metric
          label="CONFIRMED"
          value="9,841"
          change="93.9%"
        />

        <Metric
          label="PROCESSING"
          value="428"
          change="4.1%"
        />

        <Metric
          label="CANCELLED"
          value="213"
          change="2.0%"
        />

        <Metric
          label="REVENUE"
          value="₹2.84 Cr"
          change="+18.7%"
        />
      </div>

      {/* MAIN CARD */}

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              Recent Orders
            </h2>

            <p style={styles.cardSubtitle}>
              Live order activity from the booking system
            </p>
          </div>

          <button
            style={styles.exportButton}
            onClick={() =>
              alert("Export functionality will connect to the backend.")
            }
          >
            Export Orders
          </button>
        </div>

        {/* FILTER BAR */}

        <div style={styles.filterBar}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>
              ⌕
            </span>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search order, customer or event..."
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filters}>
            {[
              "All",
              "Confirmed",
              "Processing",
              "Cancelled",
            ].map((status) => (
              <button
                key={status}
                onClick={() =>
                  setStatusFilter(status)
                }
                style={{
                  ...styles.filterButton,
                  ...(statusFilter === status
                    ? styles.activeFilter
                    : {}),
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  ORDER
                </th>

                <th style={styles.th}>
                  CUSTOMER
                </th>

                <th style={styles.th}>
                  EVENT
                </th>

                <th style={styles.th}>
                  TICKET
                </th>

                <th style={styles.th}>
                  QTY
                </th>

                <th style={styles.th}>
                  AMOUNT
                </th>

                <th style={styles.th}>
                  STATUS
                </th>

                <th style={styles.th}>
                  TIME
                </th>

                <th style={styles.th}>
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td style={styles.td}>
                    <strong style={styles.orderId}>
                      {order.id}
                    </strong>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.customer}>
                      <div style={styles.avatar}>
                        {order.customer
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <span>
                        {order.customer}
                      </span>
                    </div>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.eventName}>
                      {order.event}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.ticketBadge}>
                      {order.ticket}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {order.quantity}
                  </td>

                  <td style={styles.td}>
                    <strong>
                      {order.amount}
                    </strong>
                  </td>

                  <td style={styles.td}>
                    <StatusBadge
                      status={order.status}
                    />
                  </td>

                  <td
                    style={{
                      ...styles.td,
                      color: "#64748b",
                    }}
                  >
                    {order.time}
                  </td>

                  <td style={styles.td}>
                    {order.status !==
                      "Cancelled" && (
                      <button
                        style={styles.cancelButton}
                        onClick={() =>
                          cancelOrder(order.id)
                        }
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    style={styles.empty}
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}

        <div style={styles.tableFooter}>
          <span>
            Showing{" "}
            <strong>
              {filteredOrders.length}
            </strong>{" "}
            of {orders.length} orders
          </span>

          <div style={styles.pagination}>
            <button style={styles.pageButton}>
              ←
            </button>

            <button
              style={{
                ...styles.pageButton,
                ...styles.currentPage,
              }}
            >
              1
            </button>

            <button style={styles.pageButton}>
              2
            </button>

            <button style={styles.pageButton}>
              3
            </button>

            <button style={styles.pageButton}>
              →
            </button>
          </div>
        </div>
      </div>

      {/* ORDER FLOW */}

      <div style={styles.flowCard}>
        <div>
          <h2 style={styles.flowTitle}>
            FairQueue Order Flow
          </h2>

          <p style={styles.flowDescription}>
            Every order passes through controlled admission
            before inventory is finally committed.
          </p>
        </div>

        <div style={styles.flow}>
          <FlowStep
            number="01"
            title="Queue"
            text="User waits"
          />

          <FlowLine />

          <FlowStep
            number="02"
            title="Admission"
            text="Capacity check"
          />

          <FlowLine />

          <FlowStep
            number="03"
            title="Inventory"
            text="Ticket reserved"
          />

          <FlowLine />

          <FlowStep
            number="04"
            title="Payment"
            text="Payment verified"
          />

          <FlowLine />

          <FlowStep
            number="05"
            title="Order"
            text="Booking confirmed"
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
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  let badgeStyle = styles.confirmed;

  if (status === "Processing") {
    badgeStyle = styles.processing;
  }

  if (status === "Cancelled") {
    badgeStyle = styles.cancelled;
  }

  return (
    <span
      style={{
        ...styles.statusBadge,
        ...badgeStyle,
      }}
    >
      <span style={styles.badgeDot}></span>
      {status}
    </span>
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
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "27px",
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

  statusDot: {
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
    marginBottom: "20px",
  },

  metricCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "17px",
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
    fontSize: "21px",
    letterSpacing: "-0.5px",
  },

  metricChange: {
    display: "block",
    marginTop: "5px",
    color: "#16a34a",
    fontSize: "8px",
    fontWeight: "700",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "11px",
    overflow: "hidden",
  },

  cardHeader: {
    padding: "20px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eef2f7",
  },

  cardTitle: {
    margin: 0,
    fontSize: "15px",
  },

  cardSubtitle: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "9px",
  },

  exportButton: {
    border: "1px solid #dbe1ea",
    background: "#ffffff",
    color: "#334155",
    padding: "8px 12px",
    borderRadius: "7px",
    fontSize: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },

  filterBar: {
    padding: "14px 22px",
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    borderBottom: "1px solid #eef2f7",
  },

  searchBox: {
    width: "310px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #dbe1ea",
    borderRadius: "7px",
    background: "#ffffff",
  },

  searchIcon: {
    paddingLeft: "10px",
    color: "#94a3b8",
    fontSize: "14px",
  },

  searchInput: {
    flex: 1,
    height: "100%",
    border: "none",
    outline: "none",
    padding: "0 9px",
    fontSize: "9px",
    color: "#334155",
  },

  filters: {
    display: "flex",
    gap: "5px",
  },

  filterButton: {
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#64748b",
    padding: "7px 10px",
    borderRadius: "6px",
    fontSize: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },

  activeFilter: {
    background: "#eef2ff",
    borderColor: "#c7d2fe",
    color: "#4f46e5",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1050px",
  },

  th: {
    padding: "11px 13px",
    textAlign: "left",
    color: "#94a3b8",
    fontSize: "7px",
    fontWeight: "800",
    letterSpacing: "0.7px",
    background: "#fafbfc",
    borderBottom: "1px solid #eef2f7",
  },

  td: {
    padding: "13px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "9px",
    whiteSpace: "nowrap",
  },

  orderId: {
    color: "#4f46e5",
    fontSize: "9px",
  },

  customer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  avatar: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "9px",
    fontWeight: "800",
  },

  eventName: {
    color: "#334155",
  },

  ticketBadge: {
    display: "inline-block",
    padding: "4px 7px",
    borderRadius: "5px",
    background: "#f1f5f9",
    color: "#475569",
    fontSize: "7px",
    fontWeight: "700",
  },

  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 7px",
    borderRadius: "5px",
    fontSize: "7px",
    fontWeight: "800",
  },

  badgeDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "currentColor",
  },

  confirmed: {
    background: "#ecfdf5",
    color: "#15803d",
  },

  processing: {
    background: "#fffbeb",
    color: "#b45309",
  },

  cancelled: {
    background: "#fef2f2",
    color: "#dc2626",
  },

  cancelButton: {
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
    fontSize: "10px",
  },

  tableFooter: {
    padding: "13px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#94a3b8",
    fontSize: "8px",
  },

  pagination: {
    display: "flex",
    gap: "4px",
  },

  pageButton: {
    minWidth: "25px",
    height: "25px",
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#64748b",
    borderRadius: "5px",
    fontSize: "8px",
    cursor: "pointer",
  },

  currentPage: {
    background: "#4f46e5",
    borderColor: "#4f46e5",
    color: "#ffffff",
  },

  flowCard: {
    marginTop: "18px",
    padding: "20px 22px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "11px",
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
    minWidth: "100px",
  },

  flowNumber: {
    width: "29px",
    height: "29px",
    borderRadius: "50%",
    background: "#eef2ff",
    color: "#4f46e5",
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
    color: "#94a3b8",
    fontSize: "7px",
  },

  flowLine: {
    flex: 1,
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "15px",
  },
};