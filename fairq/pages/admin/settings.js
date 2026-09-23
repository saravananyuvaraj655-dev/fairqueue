import { useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    eventName: "IPL Final 2026",
    maxConcurrentUsers: 40000,
    admissionRate: 1200,
    queueEnabled: true,
    autoAdmission: true,
    inventoryProtection: true,
    autoReleaseHolds: true,
    notifications: true,
    maintenanceMode: false,
  });

  const [saved, setSaved] = useState(false);

  function updateSetting(key, value) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  }

  function saveSettings() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <div style={styles.header}>
        <div>
          <div style={styles.breadcrumb}>
            ADMIN / SETTINGS
          </div>

          <h1 style={styles.title}>
            Settings
          </h1>

          <p style={styles.subtitle}>
            Configure FairQueue admission, queue and system
            protection behaviour.
          </p>
        </div>

        <div style={styles.headerActions}>
          <div style={styles.systemStatus}>
            <span style={styles.statusDot}></span>
            SYSTEM ONLINE
          </div>

          <button
            onClick={saveSettings}
            style={styles.saveButton}
          >
            Save Changes
          </button>
        </div>
      </div>

      {saved && (
        <div style={styles.successMessage}>
          <span style={styles.successIcon}>✓</span>
          Settings saved successfully.
        </div>
      )}

      {/* EVENT SETTINGS */}

      <Section
        title="Event Configuration"
        description="Basic configuration for the active FairQueue event."
      >
        <div style={styles.grid}>
          <SettingField
            label="EVENT NAME"
            description="Name displayed to users."
          >
            <input
              value={settings.eventName}
              onChange={(e) =>
                updateSetting(
                  "eventName",
                  e.target.value
                )
              }
              style={styles.input}
            />
          </SettingField>

          <SettingField
            label="MAX CONCURRENT USERS"
            description="Maximum users allowed inside the protected booking system."
          >
            <input
              type="number"
              value={settings.maxConcurrentUsers}
              onChange={(e) =>
                updateSetting(
                  "maxConcurrentUsers",
                  Number(e.target.value)
                )
              }
              style={styles.input}
            />
          </SettingField>

          <SettingField
            label="ADMISSION RATE / MINUTE"
            description="Number of queued users admitted per minute."
          >
            <input
              type="number"
              value={settings.admissionRate}
              onChange={(e) =>
                updateSetting(
                  "admissionRate",
                  Number(e.target.value)
                )
              }
              style={styles.input}
            />
          </SettingField>
        </div>
      </Section>

      {/* QUEUE SETTINGS */}

      <Section
        title="Queue & Admission"
        description="Control how users move from the virtual queue into the booking system."
      >
        <ToggleRow
          title="Virtual Queue"
          description="Place excess traffic into a controlled waiting queue."
          enabled={settings.queueEnabled}
          onChange={(value) =>
            updateSetting("queueEnabled", value)
          }
        />

        <ToggleRow
          title="Automatic Admission"
          description="Automatically admit users according to the configured admission rate."
          enabled={settings.autoAdmission}
          onChange={(value) =>
            updateSetting("autoAdmission", value)
          }
        />
      </Section>

      {/* PROTECTION */}

      <Section
        title="System Protection"
        description="Protect inventory and booking capacity during high traffic."
      >
        <ToggleRow
          title="Inventory Protection"
          description="Prevent overselling by validating inventory before order confirmation."
          enabled={settings.inventoryProtection}
          onChange={(value) =>
            updateSetting(
              "inventoryProtection",
              value
            )
          }
        />

        <ToggleRow
          title="Automatic Hold Release"
          description="Release expired ticket reservations automatically."
          enabled={settings.autoReleaseHolds}
          onChange={(value) =>
            updateSetting(
              "autoReleaseHolds",
              value
            )
          }
        />
      </Section>

      {/* NOTIFICATIONS */}

      <Section
        title="Notifications"
        description="Configure administrator alerts and system notifications."
      >
        <ToggleRow
          title="Admin Notifications"
          description="Receive alerts when important system thresholds are reached."
          enabled={settings.notifications}
          onChange={(value) =>
            updateSetting(
              "notifications",
              value
            )
          }
        />
      </Section>

      {/* DANGER ZONE */}

      <div style={styles.dangerCard}>
        <div>
          <div style={styles.dangerLabel}>
            DANGER ZONE
          </div>

          <h2 style={styles.dangerTitle}>
            Maintenance Mode
          </h2>

          <p style={styles.dangerDescription}>
            Temporarily stop new users from entering the
            booking flow while administrators perform
            maintenance.
          </p>
        </div>

        <div style={styles.dangerAction}>
          <span
            style={{
              ...styles.maintenanceStatus,
              color: settings.maintenanceMode
                ? "#dc2626"
                : "#64748b",
            }}
          >
            {settings.maintenanceMode
              ? "ACTIVE"
              : "INACTIVE"}
          </span>

          <Toggle
            enabled={settings.maintenanceMode}
            onChange={(value) =>
              updateSetting(
                "maintenanceMode",
                value
              )
            }
            danger
          />
        </div>
      </div>

      {/* CONFIG SUMMARY */}

      <div style={styles.summaryCard}>
        <div>
          <h2 style={styles.summaryTitle}>
            Current Configuration
          </h2>

          <p style={styles.summaryDescription}>
            Quick overview of the active FairQueue
            configuration.
          </p>
        </div>

        <div style={styles.summaryGrid}>
          <SummaryItem
            label="Event"
            value={settings.eventName}
          />

          <SummaryItem
            label="Capacity"
            value={`${settings.maxConcurrentUsers.toLocaleString()} users`}
          />

          <SummaryItem
            label="Admission"
            value={`${settings.admissionRate.toLocaleString()}/min`}
          />

          <SummaryItem
            label="Queue"
            value={
              settings.queueEnabled
                ? "Enabled"
                : "Disabled"
            }
          />

          <SummaryItem
            label="Inventory"
            value={
              settings.inventoryProtection
                ? "Protected"
                : "Unprotected"
            }
          />

          <SummaryItem
            label="Maintenance"
            value={
              settings.maintenanceMode
                ? "Active"
                : "Inactive"
            }
          />
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   SECTION
========================================================= */

function Section({
  title,
  description,
  children,
}) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>
          {title}
        </h2>

        <p style={styles.sectionDescription}>
          {description}
        </p>
      </div>

      <div style={styles.sectionBody}>
        {children}
      </div>
    </div>
  );
}


/* =========================================================
   SETTING FIELD
========================================================= */

function SettingField({
  label,
  description,
  children,
}) {
  return (
    <div style={styles.field}>
      <label style={styles.fieldLabel}>
        {label}
      </label>

      <p style={styles.fieldDescription}>
        {description}
      </p>

      {children}
    </div>
  );
}


/* =========================================================
   TOGGLE ROW
========================================================= */

function ToggleRow({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div style={styles.toggleRow}>
      <div>
        <strong style={styles.toggleTitle}>
          {title}
        </strong>

        <p style={styles.toggleDescription}>
          {description}
        </p>
      </div>

      <Toggle
        enabled={enabled}
        onChange={onChange}
      />
    </div>
  );
}


/* =========================================================
   TOGGLE
========================================================= */

function Toggle({
  enabled,
  onChange,
  danger = false,
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      style={{
        ...styles.toggle,
        background: enabled
          ? danger
            ? "#dc2626"
            : "#4f46e5"
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
   SUMMARY ITEM
========================================================= */

function SummaryItem({
  label,
  value,
}) {
  return (
    <div style={styles.summaryItem}>
      <span style={styles.summaryLabel}>
        {label}
      </span>

      <strong style={styles.summaryValue}>
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

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  systemStatus: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 10px",
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

  saveButton: {
    border: "none",
    background: "#4f46e5",
    color: "#ffffff",
    padding: "9px 14px",
    borderRadius: "7px",
    fontSize: "9px",
    fontWeight: "800",
    cursor: "pointer",
  },

  successMessage: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "11px 13px",
    marginBottom: "16px",
    borderRadius: "8px",
    background: "#ecfdf5",
    border: "1px solid #bbf7d0",
    color: "#15803d",
    fontSize: "9px",
    fontWeight: "700",
  },

  successIcon: {
    width: "17px",
    height: "17px",
    borderRadius: "50%",
    background: "#22c55e",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "9px",
  },

  section: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    marginBottom: "15px",
    overflow: "hidden",
  },

  sectionHeader: {
    padding: "17px 20px",
    borderBottom: "1px solid #eef2f7",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "13px",
  },

  sectionDescription: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "9px",
  },

  sectionBody: {
    padding: "19px 20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "18px",
  },

  field: {
    minWidth: 0,
  },

  fieldLabel: {
    display: "block",
    color: "#475569",
    fontSize: "8px",
    fontWeight: "800",
    letterSpacing: "0.6px",
  },

  fieldDescription: {
    minHeight: "27px",
    margin: "5px 0 8px",
    color: "#94a3b8",
    fontSize: "8px",
    lineHeight: "1.45",
  },

  input: {
    width: "100%",
    height: "36px",
    boxSizing: "border-box",
    border: "1px solid #dbe1ea",
    borderRadius: "7px",
    padding: "0 10px",
    outline: "none",
    color: "#334155",
    fontSize: "9px",
    background: "#ffffff",
  },

  toggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "14px 0",
    borderBottom: "1px solid #f1f5f9",
  },

  toggleTitle: {
    display: "block",
    fontSize: "10px",
  },

  toggleDescription: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "8px",
  },

  toggle: {
    width: "38px",
    height: "21px",
    flexShrink: 0,
    padding: "2px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "0.2s",
  },

  toggleKnob: {
    display: "block",
    width: "17px",
    height: "17px",
    borderRadius: "50%",
    background: "#ffffff",
    transition: "0.2s",
  },

  dangerCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "19px 20px",
    marginBottom: "15px",
    background: "#ffffff",
    border: "1px solid #fecaca",
    borderRadius: "10px",
  },

  dangerLabel: {
    color: "#dc2626",
    fontSize: "8px",
    fontWeight: "800",
    letterSpacing: "0.8px",
  },

  dangerTitle: {
    margin: "5px 0 0",
    fontSize: "13px",
  },

  dangerDescription: {
    maxWidth: "650px",
    margin: "5px 0 0",
    color: "#94a3b8",
    fontSize: "9px",
    lineHeight: "1.5",
  },

  dangerAction: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  maintenanceStatus: {
    fontSize: "8px",
    fontWeight: "800",
  },

  summaryCard: {
    padding: "20px",
    background: "#111827",
    color: "#ffffff",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  summaryTitle: {
    margin: 0,
    fontSize: "13px",
  },

  summaryDescription: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "9px",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(6, minmax(0, 1fr))",
    gap: "10px",
    marginTop: "18px",
  },

  summaryItem: {
    padding: "11px",
    borderRadius: "7px",
    background: "#1e293b",
  },

  summaryLabel: {
    display: "block",
    color: "#64748b",
    fontSize: "7px",
    fontWeight: "800",
    textTransform: "uppercase",
  },

  summaryValue: {
    display: "block",
    marginTop: "6px",
    color: "#e2e8f0",
    fontSize: "9px",
  },
};