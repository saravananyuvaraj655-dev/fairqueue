import { useState } from "react";

export default function AdmissionControl() {
  const [admissionRate, setAdmissionRate] = useState(200);
  const [isUpdating, setIsUpdating] = useState(false);

  // Temporary development data
  // Later this will come from the backend API.
  const systemData = {
    activeSessions: 180,
    maxSessions: 200,
    queueSize: 38420,
    backendLoad: 72,
    requestsPerSecond: 1850,
  };

  const handleUpdate = async () => {
    setIsUpdating(true);

    // Temporary API simulation
    // Later:
    // await fetch("/api/admin/admission/config", {...})

    setTimeout(() => {
      setIsUpdating(false);
      alert(`Admission rate updated to ${admissionRate} users/batch`);
    }, 700);
  };

  const getLoadStatus = (load) => {
    if (load >= 90) return "HIGH";
    if (load >= 70) return "MODERATE";
    return "NORMAL";
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <p style={styles.overline}>FAIRQUEUE ADMIN</p>
          <h1 style={styles.title}>Admission Control</h1>
          <p style={styles.subtitle}>
            Control the number of users admitted from the virtual waiting room.
          </p>
        </div>

        <div style={styles.liveBadge}>
          <span style={styles.liveDot}></span>
          LIVE
        </div>
      </div>

      {/* Current Admission Rate */}
      <div style={styles.mainGrid}>
        <div style={styles.controlCard}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Admission Rate</h2>
              <p style={styles.cardDescription}>
                Users allowed into the booking system per batch.
              </p>
            </div>

            <div style={styles.iconBox}>↗</div>
          </div>

          <div style={styles.rateDisplay}>
            <span style={styles.rateNumber}>{admissionRate}</span>
            <span style={styles.rateUnit}>users / batch</span>
          </div>

          <div style={styles.inputSection}>
            <label style={styles.label}>Set admission rate</label>

            <div style={styles.inputRow}>
              <input
                type="number"
                min="1"
                value={admissionRate}
                onChange={(e) =>
                  setAdmissionRate(Number(e.target.value))
                }
                style={styles.input}
              />

              <button
                onClick={handleUpdate}
                disabled={isUpdating || admissionRate < 1}
                style={{
                  ...styles.updateButton,
                  opacity: isUpdating ? 0.6 : 1,
                }}
              >
                {isUpdating ? "Updating..." : "UPDATE"}
              </button>
            </div>
          </div>

          <div style={styles.quickControls}>
            <button
              style={styles.secondaryButton}
              onClick={() =>
                setAdmissionRate((rate) => Math.max(1, rate - 50))
              }
            >
              − DECREASE
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() =>
                setAdmissionRate((rate) => rate + 50)
              }
            >
              + INCREASE
            </button>
          </div>

          <div style={styles.infoBox}>
            <strong>Controlled Admission</strong>
            <p>
              The frontend only sends the requested rate to the backend.
              Queue and Redis state are controlled by the backend.
            </p>
          </div>
        </div>

        {/* System Status */}
        <div style={styles.statusCard}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>System Capacity</h2>
              <p style={styles.cardDescription}>
                Current admission and backend conditions.
              </p>
            </div>
          </div>

          <StatusRow
            label="Active Sessions"
            value={`${systemData.activeSessions} / ${systemData.maxSessions}`}
          />

          <StatusRow
            label="Queue Size"
            value={systemData.queueSize.toLocaleString()}
          />

          <StatusRow
            label="Backend Load"
            value={`${systemData.backendLoad}%`}
            status={getLoadStatus(systemData.backendLoad)}
          />

          <StatusRow
            label="Requests / Second"
            value={systemData.requestsPerSecond.toLocaleString()}
          />
        </div>
      </div>

      {/* Session Capacity */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Active Session Capacity</h2>
            <p style={styles.sectionDescription}>
              Monitor how close the system is to the configured admission
              capacity.
            </p>
          </div>

          <span style={styles.capacityText}>
            {systemData.activeSessions} / {systemData.maxSessions}
          </span>
        </div>

        <div style={styles.progressBackground}>
          <div
            style={{
              ...styles.progressFill,
              width: `${
                (systemData.activeSessions / systemData.maxSessions) * 100
              }%`,
            }}
          ></div>
        </div>

        <div style={styles.progressLabels}>
          <span>0 sessions</span>
          <span>{systemData.maxSessions} sessions</span>
        </div>
      </div>

      {/* Queue Information */}
      <div style={styles.bottomGrid}>
        <div style={styles.infoCard}>
          <p style={styles.metricLabel}>WAITING QUEUE</p>
          <h2 style={styles.metricValue}>
            {systemData.queueSize.toLocaleString()}
          </h2>
          <p style={styles.metricDescription}>users currently waiting</p>
        </div>

        <div style={styles.infoCard}>
          <p style={styles.metricLabel}>ADMISSION BATCH</p>
          <h2 style={styles.metricValue}>{admissionRate}</h2>
          <p style={styles.metricDescription}>users per batch</p>
        </div>

        <div style={styles.infoCard}>
          <p style={styles.metricLabel}>BACKEND LOAD</p>
          <h2 style={styles.metricValue}>{systemData.backendLoad}%</h2>
          <p style={styles.metricDescription}>
            {getLoadStatus(systemData.backendLoad)} load
          </p>
        </div>

        <div style={styles.infoCard}>
          <p style={styles.metricLabel}>REQUEST RATE</p>
          <h2 style={styles.metricValue}>
            {systemData.requestsPerSecond.toLocaleString()}
          </h2>
          <p style={styles.metricDescription}>requests per second</p>
        </div>
      </div>

      {/* Warning */}
      <div style={styles.warningBox}>
        <div style={styles.warningIcon}>!</div>

        <div>
          <h3 style={styles.warningTitle}>Backend-controlled admission</h3>

          <p style={styles.warningText}>
            Changes made here must be validated by the backend before being
            applied to the Redis waiting queue. The frontend must never modify
            Redis directly.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STATUS ROW ---------------- */

function StatusRow({ label, value, status }) {
  return (
    <div style={styles.statusRow}>
      <span style={styles.statusLabel}>{label}</span>

      <div style={styles.statusValueContainer}>
        <strong style={styles.statusValue}>{value}</strong>

        {status && (
          <span
            style={{
              ...styles.statusBadge,
              ...(status === "HIGH"
                ? styles.highBadge
                : status === "MODERATE"
                ? styles.moderateBadge
                : styles.normalBadge),
            }}
          >
            {status}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

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
    fontSize: "12px",
    fontWeight: "700",
  },

  liveDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#22c55e",
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  controlCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
  },

  statusCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
  },

  cardDescription: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: "13px",
  },

  iconBox: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "700",
  },

  rateDisplay: {
    marginTop: "28px",
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
  },

  rateNumber: {
    fontSize: "48px",
    fontWeight: "800",
    letterSpacing: "-2px",
  },

  rateUnit: {
    fontSize: "14px",
    color: "#64748b",
  },

  inputSection: {
    marginTop: "28px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  inputRow: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "15px",
    outline: "none",
  },

  updateButton: {
    border: "none",
    borderRadius: "8px",
    padding: "0 22px",
    background: "#111827",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
  },

  quickControls: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  },

  secondaryButton: {
    flex: 1,
    padding: "10px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    color: "#374151",
  },

  infoBox: {
    marginTop: "22px",
    padding: "14px",
    background: "#f8fafc",
    borderRadius: "9px",
    border: "1px solid #e2e8f0",
  },

  statusRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 0",
    borderBottom: "1px solid #eef2f7",
  },

  statusLabel: {
    fontSize: "13px",
    color: "#64748b",
  },

  statusValueContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  statusValue: {
    fontSize: "15px",
  },

  statusBadge: {
    padding: "4px 8px",
    borderRadius: "5px",
    fontSize: "10px",
    fontWeight: "800",
  },

  highBadge: {
    background: "#fee2e2",
    color: "#b91c1c",
  },

  moderateBadge: {
    background: "#fef3c7",
    color: "#a16207",
  },

  normalBadge: {
    background: "#dcfce7",
    color: "#15803d",
  },

  section: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "25px",
    marginBottom: "20px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "17px",
  },

  sectionDescription: {
    margin: "6px 0 0",
    fontSize: "13px",
    color: "#64748b",
  },

  capacityText: {
    fontWeight: "700",
    fontSize: "14px",
  },

  progressBackground: {
    height: "12px",
    background: "#e5e7eb",
    borderRadius: "20px",
    marginTop: "24px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#4f46e5",
    borderRadius: "20px",
    transition: "width 0.3s ease",
  },

  progressLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    color: "#94a3b8",
    fontSize: "11px",
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "20px",
  },

  infoCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
  },

  metricLabel: {
    margin: 0,
    color: "#64748b",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.8px",
  },

  metricValue: {
    margin: "10px 0 3px",
    fontSize: "26px",
    fontWeight: "800",
  },

  metricDescription: {
    margin: 0,
    fontSize: "12px",
    color: "#94a3b8",
  },

  warningBox: {
    display: "flex",
    gap: "14px",
    padding: "18px",
    border: "1px solid #fde68a",
    background: "#fffbeb",
    borderRadius: "12px",
  },

  warningIcon: {
    width: "30px",
    height: "30px",
    flexShrink: 0,
    borderRadius: "50%",
    background: "#f59e0b",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  warningTitle: {
    margin: "2px 0 5px",
    fontSize: "14px",
  },

  warningText: {
    margin: 0,
    color: "#92400e",
    fontSize: "12px",
    lineHeight: "1.5",
  },
};