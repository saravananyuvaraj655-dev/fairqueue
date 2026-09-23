import { useState } from "react";

export default function Inventory() {
  const [inventory, setInventory] = useState([
    {
      id: "TKT-001",
      category: "VIP",
      section: "A1",
      total: 5000,
      available: 820,
      held: 740,
      sold: 3440,
      price: 2500,
      status: "Healthy",
    },
    {
      id: "TKT-002",
      category: "Premium",
      section: "B1",
      total: 10000,
      available: 1450,
      held: 1280,
      sold: 7270,
      price: 1500,
      status: "Healthy",
    },
    {
      id: "TKT-003",
      category: "Standard",
      section: "C1",
      total: 20000,
      available: 120,
      held: 2180,
      sold: 17700,
      price: 800,
      status: "Low",
    },
    {
      id: "TKT-004",
      category: "Economy",
      section: "D1",
      total: 15000,
      available: 60,
      held: 3320,
      sold: 11620,
      price: 400,
      status: "Low",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showLowOnly, setShowLowOnly] = useState(false);

  const totalInventory = inventory.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const totalAvailable = inventory.reduce(
    (sum, item) => sum + item.available,
    0
  );

  const totalHeld = inventory.reduce(
    (sum, item) => sum + item.held,
    0
  );

  const totalSold = inventory.reduce(
    (sum, item) => sum + item.sold,
    0
  );

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.category
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.section
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.id
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      !showLowOnly || item.status === "Low";

    return matchesSearch && matchesStatus;
  });

  function restock(category) {
    setInventory((current) =>
      current.map((item) =>
        item.category === category
          ? {
              ...item,
              available: item.available + 500,
              total: item.total + 500,
              status:
                item.available + 500 > 500
                  ? "Healthy"
                  : "Low",
            }
          : item
      )
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <p style={styles.overline}>FAIRQUEUE ADMIN</p>

          <h1 style={styles.title}>Ticket Inventory</h1>

          <p style={styles.subtitle}>
            Monitor ticket availability and protect inventory
            from overselling.
          </p>
        </div>

        <div style={styles.protectedBadge}>
          <span style={styles.greenDot}></span>
          INVENTORY PROTECTED
        </div>
      </div>

      {/* METRICS */}
      <div style={styles.metricsGrid}>
        <Metric
          title="TOTAL INVENTORY"
          value={totalInventory.toLocaleString()}
          description="Configured tickets"
        />

        <Metric
          title="AVAILABLE"
          value={totalAvailable.toLocaleString()}
          description="Ready for admission"
        />

        <Metric
          title="HELD"
          value={totalHeld.toLocaleString()}
          description="Temporary reservations"
        />

        <Metric
          title="SOLD"
          value={totalSold.toLocaleString()}
          description="Confirmed tickets"
        />
      </div>

      {/* INVENTORY PROTECTION */}
      <div style={styles.protectionCard}>
        <div style={styles.protectionIcon}>✓</div>

        <div style={{ flex: 1 }}>
          <h2 style={styles.protectionTitle}>
            Overselling Protection Active
          </h2>

          <p style={styles.protectionText}>
            Every ticket allocation must pass an inventory
            availability check before confirmation. This prevents
            multiple users from purchasing the same inventory.
          </p>
        </div>

        <div style={styles.protectionStatus}>
          <span style={styles.greenDot}></span>
          ACTIVE
        </div>
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        <div>
          <h2 style={styles.sectionTitle}>
            Inventory Distribution
          </h2>

          <p style={styles.sectionDescription}>
            Ticket availability by category and section.
          </p>
        </div>

        <div style={styles.actions}>
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />

          <button
            onClick={() => setShowLowOnly(!showLowOnly)}
            style={{
              ...styles.filterButton,
              background: showLowOnly
                ? "#fef2f2"
                : "#ffffff",
              color: showLowOnly
                ? "#dc2626"
                : "#475569",
            }}
          >
            {showLowOnly
              ? "Showing Low Stock"
              : "Show Low Stock"}
          </button>
        </div>
      </div>

      {/* INVENTORY TABLE */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <span>ID</span>
          <span>CATEGORY</span>
          <span>SECTION</span>
          <span>TOTAL</span>
          <span>AVAILABLE</span>
          <span>HELD</span>
          <span>SOLD</span>
          <span>PRICE</span>
          <span>STATUS</span>
          <span>ACTION</span>
        </div>

        {filteredInventory.map((item) => {
          const soldPercentage =
            (item.sold / item.total) * 100;

          return (
            <div
              key={item.id}
              style={styles.tableRow}
            >
              <strong style={styles.ticketId}>
                {item.id}
              </strong>

              <span>{item.category}</span>

              <span style={styles.muted}>
                {item.section}
              </span>

              <strong>
                {item.total.toLocaleString()}
              </strong>

              <div style={styles.availableCell}>
                <strong>
                  {item.available.toLocaleString()}
                </strong>

                <div style={styles.miniBarBackground}>
                  <div
                    style={{
                      ...styles.miniBar,
                      width: `${Math.min(
                        (item.available /
                          item.total) *
                          100 *
                          5,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <span style={styles.heldText}>
                {item.held.toLocaleString()}
              </span>

              <div>
                <strong>
                  {item.sold.toLocaleString()}
                </strong>

                <span style={styles.soldPercentage}>
                  {soldPercentage.toFixed(0)}%
                </span>
              </div>

              <span style={styles.price}>
                ₹{item.price.toLocaleString()}
              </span>

              <Status status={item.status} />

              <button
                onClick={() =>
                  restock(item.category)
                }
                style={styles.restockButton}
              >
                +500
              </button>
            </div>
          );
        })}

        {filteredInventory.length === 0 && (
          <div style={styles.empty}>
            No inventory matching your search.
          </div>
        )}
      </div>

      {/* INVENTORY VISUALIZATION */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              Inventory Utilization
            </h2>

            <p style={styles.cardDescription}>
              Current distribution of the total ticket inventory.
            </p>
          </div>
        </div>

        <div style={styles.utilizationBar}>
          {inventory.map((item) => {
            const width =
              (item.sold / totalInventory) * 100;

            return (
              <div
                key={item.id}
                title={`${item.category}: ${item.sold.toLocaleString()} sold`}
                style={{
                  width: `${width}%`,
                  height: "100%",
                  background:
                    item.status === "Low"
                      ? "#f59e0b"
                      : "#4f46e5",
                }}
              />
            );
          })}
        </div>

        <div style={styles.legend}>
          {inventory.map((item) => (
            <div
              key={item.id}
              style={styles.legendItem}
            >
              <span
                style={{
                  ...styles.legendDot,
                  background:
                    item.status === "Low"
                      ? "#f59e0b"
                      : "#4f46e5",
                }}
              />

              <span>{item.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* INVENTORY RULES */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              Inventory Protection Rules
            </h2>

            <p style={styles.cardDescription}>
              Rules used by FairQueue to prevent inventory
              inconsistencies.
            </p>
          </div>
        </div>

        <div style={styles.rulesGrid}>
          <Rule
            number="01"
            title="Atomic Allocation"
            description="Inventory allocation must happen as one protected transaction."
          />

          <Rule
            number="02"
            title="Temporary Holds"
            description="Tickets are held before payment and returned after expiration."
          />

          <Rule
            number="03"
            title="Capacity Check"
            description="A booking cannot exceed the remaining inventory."
          />

          <Rule
            number="04"
            title="Idempotent Booking"
            description="Repeated booking requests must not create duplicate allocations."
          />
        </div>
      </div>

      {/* NOTE */}
      <div style={styles.note}>
        <div style={styles.noteIcon}>i</div>

        <div>
          <strong style={styles.noteTitle}>
            Backend integration required
          </strong>

          <p style={styles.noteText}>
            The values shown here are frontend development data.
            The real inventory must be maintained by the backend
            using database transactions or another concurrency-safe
            mechanism.
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
   STATUS
========================================================= */

function Status({ status }) {
  const low = status === "Low";

  return (
    <span
      style={{
        ...styles.status,
        background: low ? "#fff7ed" : "#ecfdf5",
        color: low ? "#c2410c" : "#15803d",
      }}
    >
      <span
        style={{
          ...styles.statusDot,
          background: low ? "#f97316" : "#22c55e",
        }}
      />

      {status}
    </span>
  );
}


/* =========================================================
   RULE
========================================================= */

function Rule({
  number,
  title,
  description,
}) {
  return (
    <div style={styles.rule}>
      <div style={styles.ruleNumber}>
        {number}
      </div>

      <div>
        <strong style={styles.ruleTitle}>
          {title}
        </strong>

        <p style={styles.ruleDescription}>
          {description}
        </p>
      </div>
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

  protectedBadge: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "9px 13px",
    borderRadius: "20px",
    background: "#ecfdf5",
    color: "#15803d",
    fontSize: "9px",
    fontWeight: "800",
  },

  greenDot: {
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

  protectionCard: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "19px",
    background: "#ffffff",
    border: "1px solid #bbf7d0",
    borderRadius: "13px",
    marginBottom: "25px",
  },

  protectionIcon: {
    width: "40px",
    height: "40px",
    flexShrink: 0,
    borderRadius: "50%",
    background: "#22c55e",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  protectionTitle: {
    margin: "0 0 4px",
    fontSize: "14px",
  },

  protectionText: {
    margin: 0,
    fontSize: "11px",
    color: "#64748b",
    lineHeight: "1.5",
  },

  protectionStatus: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#15803d",
    fontSize: "9px",
    fontWeight: "800",
  },

  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
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

  actions: {
    display: "flex",
    gap: "8px",
  },

  search: {
    width: "190px",
    padding: "9px 11px",
    border: "1px solid #dbe1ea",
    borderRadius: "7px",
    outline: "none",
    fontSize: "10px",
    background: "#ffffff",
  },

  filterButton: {
    border: "1px solid #dbe1ea",
    borderRadius: "7px",
    padding: "9px 11px",
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
      "0.8fr 1fr 0.7fr 0.8fr 1.1fr 0.8fr 0.9fr 0.8fr 0.8fr 0.7fr",
    gap: "8px",
    alignItems: "center",
    padding: "13px 16px",
    background: "#f8fafc",
    borderBottom: "1px solid #e5e7eb",
    color: "#64748b",
    fontSize: "7px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },

  tableRow: {
    display: "grid",
    gridTemplateColumns:
      "0.8fr 1fr 0.7fr 0.8fr 1.1fr 0.8fr 0.9fr 0.8fr 0.8fr 0.7fr",
    gap: "8px",
    alignItems: "center",
    padding: "16px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "10px",
  },

  ticketId: {
    color: "#4f46e5",
    fontSize: "9px",
  },

  muted: {
    color: "#64748b",
  },

  availableCell: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  miniBarBackground: {
    width: "55px",
    height: "4px",
    background: "#e2e8f0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  miniBar: {
    height: "100%",
    background: "#22c55e",
    borderRadius: "10px",
  },

  heldText: {
    color: "#d97706",
  },

  soldPercentage: {
    display: "block",
    color: "#94a3b8",
    fontSize: "8px",
    marginTop: "2px",
  },

  price: {
    fontWeight: "700",
  },

  status: {
    width: "fit-content",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 7px",
    borderRadius: "20px",
    fontSize: "8px",
    fontWeight: "800",
  },

  statusDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
  },

  restockButton: {
    border: "1px solid #c7d2fe",
    background: "#eef2ff",
    color: "#4f46e5",
    padding: "6px 8px",
    borderRadius: "6px",
    fontSize: "8px",
    fontWeight: "800",
    cursor: "pointer",
  },

  empty: {
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

  utilizationBar: {
    height: "28px",
    display: "flex",
    borderRadius: "7px",
    overflow: "hidden",
    background: "#e2e8f0",
  },

  legend: {
    display: "flex",
    gap: "20px",
    marginTop: "13px",
    flexWrap: "wrap",
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#64748b",
    fontSize: "10px",
  },

  legendDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
  },

  rulesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  rule: {
    display: "flex",
    gap: "12px",
    padding: "15px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "9px",
  },

  ruleNumber: {
    width: "27px",
    height: "27px",
    flexShrink: 0,
    borderRadius: "7px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "8px",
    fontWeight: "800",
  },

  ruleTitle: {
    display: "block",
    fontSize: "11px",
  },

  ruleDescription: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "9px",
    lineHeight: "1.5",
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