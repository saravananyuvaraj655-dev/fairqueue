import { useState } from "react";

export default function Concurrency() {
  const [testRunning, setTestRunning] = useState(false);

  const [stats, setStats] = useState({
    concurrentUsers: 48250,
    activeRequests: 12840,
    successRequests: 11982,
    failedRequests: 18,
    responseTime: 184,
  });

  const startLoadTest = () => {
    setTestRunning(true);

    setStats({
      concurrentUsers: 50000,
      activeRequests: 15240,
      successRequests: 14982,
      failedRequests: 0,
      responseTime: 192,
    });

    setTimeout(() => {
      setTestRunning(false);
    }, 5000);
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <p style={styles.overline}>FAIRQUEUE ADMIN</p>

          <h1 style={styles.title}>Concurrency Control</h1>

          <p style={styles.subtitle}>
            Monitor concurrent users, request processing and inventory
            consistency.
          </p>
        </div>

        <div
          style={{
            ...styles.statusBadge,
            background: testRunning ? "#fff7ed" : "#ecfdf5",
            color: testRunning ? "#c2410c" : "#15803d",
          }}
        >
          <span
            style={{
              ...styles.statusDot,
              background: testRunning ? "#f97316" : "#22c55e",
            }}
          ></span>

          {testRunning ? "LOAD TEST RUNNING" : "SYSTEM STABLE"}
        </div>
      </div>

      {/* TOP METRICS */}
      <div style={styles.metricsGrid}>

        <MetricCard
          title="CONCURRENT USERS"
          value={stats.concurrentUsers.toLocaleString()}
          description="Current connected users"
          type="users"
        />

        <MetricCard
          title="ACTIVE REQUESTS"
          value={stats.activeRequests.toLocaleString()}
          description="Requests being processed"
          type="requests"
        />

        <MetricCard
          title="SUCCESSFUL REQUESTS"
          value={stats.successRequests.toLocaleString()}
          description="Successfully processed"
          type="success"
        />

        <MetricCard
          title="FAILED REQUESTS"
          value={stats.failedRequests}
          description="Failed operations"
          type="failed"
        />
      </div>

      {/* MAIN GRID */}
      <div style={styles.mainGrid}>

        {/* CONCURRENCY MONITOR */}
        <div style={styles.card}>

          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>
                Concurrent User Load
              </h2>

              <p style={styles.cardDescription}>
                Current system traffic compared with the supported load.
              </p>
            </div>

            <span style={styles.liveBadge}>
              LIVE
            </span>
          </div>

          <div style={styles.loadSection}>

            <div style={styles.loadNumbers}>
              <div>
                <span style={styles.bigNumber}>
                  {stats.concurrentUsers.toLocaleString()}
                </span>

                <span style={styles.usersText}>
                  / 50,000 users
                </span>
              </div>

              <strong style={styles.percentage}>
                {Math.min(
                  Math.round(
                    (stats.concurrentUsers / 50000) * 100
                  ),
                  100
                )}
                %
              </strong>
            </div>

            <div style={styles.progressBackground}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${Math.min(
                    (stats.concurrentUsers / 50000) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>

            <div style={styles.loadFooter}>
              <span>0 users</span>

              <span>Capacity: 50,000</span>
            </div>
          </div>

          {/* REQUEST PROCESSING */}
          <div style={styles.processingGrid}>

            <ProcessingItem
              label="Average Response Time"
              value={`${stats.responseTime} ms`}
              status="NORMAL"
            />

            <ProcessingItem
              label="Request Success Rate"
              value="99.8%"
              status="HEALTHY"
            />

            <ProcessingItem
              label="Queue Processing"
              value="ACTIVE"
              status="RUNNING"
            />

            <ProcessingItem
              label="Overselling"
              value="0"
              status="PROTECTED"
            />

          </div>
        </div>

        {/* INVENTORY PROTECTION */}
        <div style={styles.card}>

          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>
                Inventory Protection
              </h2>

              <p style={styles.cardDescription}>
                Monitor inventory consistency during concurrent requests.
              </p>
            </div>

            <div style={styles.lockIcon}>
              #
            </div>
          </div>

          <InventoryRow
            label="Available Tickets"
            value="2,450"
          />

          <InventoryRow
            label="Reserved Tickets"
            value="7,520"
          />

          <InventoryRow
            label="Confirmed Tickets"
            value="40,030"
          />

          <InventoryRow
            label="Pending Transactions"
            value="250"
          />

          <div style={styles.protectionBox}>

            <div style={styles.protectionIcon}>
              ✓
            </div>

            <div>
              <strong style={styles.protectionTitle}>
                Inventory consistency protected
              </strong>

              <p style={styles.protectionText}>
                Concurrent purchase requests cannot reduce inventory
                below the available quantity.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CONCURRENCY TEST */}
      <div style={styles.card}>

        <div style={styles.testHeader}>

          <div>
            <h2 style={styles.cardTitle}>
              Concurrency Test
            </h2>

            <p style={styles.cardDescription}>
              Simulate high-volume traffic against the booking system.
            </p>
          </div>

          <button
            onClick={startLoadTest}
            disabled={testRunning}
            style={{
              ...styles.testButton,
              opacity: testRunning ? 0.6 : 1,
            }}
          >
            {testRunning
              ? "TEST RUNNING..."
              : "RUN LOAD TEST"}
          </button>

        </div>

        {/* TEST STATS */}
        <div style={styles.testGrid}>

          <TestMetric
            label="TARGET USERS"
            value="50,000"
          />

          <TestMetric
            label="REQUEST RATE"
            value="10,000 / sec"
          />

          <TestMetric
            label="MAX RESPONSE"
            value="250 ms"
          />

          <TestMetric
            label="OVERSOLD ITEMS"
            value="0"
          />

        </div>

        {/* TEST RESULT */}
        <div style={styles.resultBox}>

          <div style={styles.resultIcon}>
            ✓
          </div>

          <div>

            <strong style={styles.resultTitle}>
              Concurrency protection active
            </strong>

            <p style={styles.resultText}>
              The system uses controlled admission and protected
              inventory operations to prevent multiple concurrent
              requests from purchasing the same inventory.
            </p>

          </div>

        </div>

      </div>

      {/* REQUEST PIPELINE */}
      <div style={styles.card}>

        <div style={styles.cardHeader}>

          <div>
            <h2 style={styles.cardTitle}>
              Request Processing Pipeline
            </h2>

            <p style={styles.cardDescription}>
              How a concurrent request is handled by FairQueue.
            </p>
          </div>

        </div>

        <div style={styles.pipeline}>

          <PipelineStep
            number="01"
            title="Incoming Request"
            description="User sends booking request"
          />

          <div style={styles.arrow}>→</div>

          <PipelineStep
            number="02"
            title="Admission Control"
            description="Controls active traffic"
          />

          <div style={styles.arrow}>→</div>

          <PipelineStep
            number="03"
            title="Queue"
            description="Waiting users are ordered"
          />

          <div style={styles.arrow}>→</div>

          <PipelineStep
            number="04"
            title="Inventory Lock"
            description="Protects ticket quantity"
          />

          <div style={styles.arrow}>→</div>

          <PipelineStep
            number="05"
            title="Confirmation"
            description="Successful purchase"
          />

        </div>

      </div>

      {/* INFO */}
      <div style={styles.infoBox}>

        <div style={styles.infoIcon}>
          i
        </div>

        <div>

          <h3 style={styles.infoTitle}>
            Concurrency safety
          </h3>

          <p style={styles.infoText}>
            The dashboard displays concurrency metrics and test results.
            Actual concurrency control, inventory locking and transaction
            safety must be enforced by the backend.
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

    requests: {
      background: "#eff6ff",
      color: "#2563eb",
      icon: "R",
    },

    success: {
      background: "#ecfdf5",
      color: "#15803d",
      icon: "✓",
    },

    failed: {
      background: "#fef2f2",
      color: "#b91c1c",
      icon: "!",
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

        <p style={styles.metricTitle}>
          {title}
        </p>

        <h2 style={styles.metricValue}>
          {value}
        </h2>

        <p style={styles.metricDescription}>
          {description}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   PROCESSING ITEM
========================================================= */

function ProcessingItem({
  label,
  value,
  status,
}) {
  return (
    <div style={styles.processingItem}>

      <span style={styles.processingLabel}>
        {label}
      </span>

      <strong style={styles.processingValue}>
        {value}
      </strong>

      <span style={styles.healthyBadge}>
        {status}
      </span>

    </div>
  );
}


/* =========================================================
   INVENTORY ROW
========================================================= */

function InventoryRow({
  label,
  value,
}) {
  return (
    <div style={styles.inventoryRow}>

      <span style={styles.inventoryLabel}>
        {label}
      </span>

      <strong style={styles.inventoryValue}>
        {value}
      </strong>

    </div>
  );
}


/* =========================================================
   TEST METRIC
========================================================= */

function TestMetric({
  label,
  value,
}) {
  return (
    <div style={styles.testMetric}>

      <span style={styles.testLabel}>
        {label}
      </span>

      <strong style={styles.testValue}>
        {value}
      </strong>

    </div>
  );
}


/* =========================================================
   PIPELINE STEP
========================================================= */

function PipelineStep({
  number,
  title,
  description,
}) {
  return (
    <div style={styles.pipelineStep}>

      <div style={styles.stepNumber}>
        {number}
      </div>

      <strong style={styles.stepTitle}>
        {title}
      </strong>

      <p style={styles.stepDescription}>
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

  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "8px 13px",
    borderRadius: "20px",
    fontSize: "10px",
    fontWeight: "800",
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
    gridTemplateColumns: "1.5fr 1fr",
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

  loadSection: {
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "11px",
  },

  loadNumbers: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "13px",
  },

  bigNumber: {
    fontSize: "28px",
    fontWeight: "800",
  },

  usersText: {
    marginLeft: "7px",
    color: "#94a3b8",
    fontSize: "12px",
  },

  percentage: {
    fontSize: "18px",
    color: "#4f46e5",
  },

  progressBackground: {
    height: "12px",
    background: "#e2e8f0",
    borderRadius: "20px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background: "#4f46e5",
    borderRadius: "20px",
    transition: "width 0.4s ease",
  },

  loadFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    color: "#94a3b8",
    fontSize: "10px",
  },

  processingGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    marginTop: "20px",
    borderTop: "1px solid #f1f5f9",
  },

  processingItem: {
    padding: "15px 12px",
    borderBottom: "1px solid #f1f5f9",
  },

  processingLabel: {
    display: "block",
    color: "#64748b",
    fontSize: "10px",
    marginBottom: "6px",
  },

  processingValue: {
    fontSize: "14px",
    marginRight: "7px",
  },

  healthyBadge: {
    color: "#15803d",
    fontSize: "8px",
    fontWeight: "800",
  },

  inventoryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 0",
    borderBottom: "1px solid #f1f5f9",
  },

  inventoryLabel: {
    color: "#64748b",
    fontSize: "12px",
  },

  inventoryValue: {
    fontSize: "13px",
  },

  lockIcon: {
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

  protectionBox: {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
    padding: "14px",
    background: "#ecfdf5",
    border: "1px solid #bbf7d0",
    borderRadius: "9px",
  },

  protectionIcon: {
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    background: "#22c55e",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  protectionTitle: {
    fontSize: "12px",
    color: "#166534",
  },

  protectionText: {
    margin: "3px 0 0",
    fontSize: "10px",
    color: "#15803d",
    lineHeight: "1.5",
  },

  testHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  testButton: {
    border: "none",
    background: "#111827",
    color: "#ffffff",
    padding: "10px 15px",
    borderRadius: "7px",
    fontSize: "10px",
    fontWeight: "800",
    cursor: "pointer",
  },

  testGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
  },

  testMetric: {
    padding: "16px",
    background: "#f8fafc",
    borderRadius: "9px",
  },

  testLabel: {
    display: "block",
    color: "#64748b",
    fontSize: "9px",
    fontWeight: "700",
    marginBottom: "6px",
  },

  testValue: {
    fontSize: "16px",
  },

  resultBox: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginTop: "18px",
    padding: "15px",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "9px",
  },

  resultIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#3b82f6",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  resultTitle: {
    fontSize: "12px",
    color: "#1e40af",
  },

  resultText: {
    margin: "3px 0 0",
    fontSize: "10px",
    color: "#1e40af",
    lineHeight: "1.5",
  },

  pipeline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    overflowX: "auto",
  },

  pipelineStep: {
    minWidth: "145px",
    padding: "15px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "9px",
  },

  stepNumber: {
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

  stepTitle: {
    display: "block",
    fontSize: "11px",
  },

  stepDescription: {
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