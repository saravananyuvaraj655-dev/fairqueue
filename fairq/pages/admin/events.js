import { useState } from "react";

export default function Event() {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [event, setEvent] = useState({
    name: "FairQueue IPL Ticket Booking",
    description:
      "High-concurrency ticket booking event managed through the FairQueue virtual queue system.",
    venue: "MA Chidambaram Stadium",
    city: "Chennai",
    date: "2026-10-15",
    startTime: "18:30",
    endTime: "22:30",

    totalCapacity: 40000,
    availableTickets: 40000,

    ticketPrice: 1500,
    maxTicketsPerUser: 4,

    maxConcurrentUsers: 50000,
    admissionRate: 500,

    queueEnabled: true,
    autoAdmission: true,
    inventoryProtection: true,

    status: "Upcoming",
  });

  const handleChange = (field, value) => {
    setEvent((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setIsEditing(false);

    // Later:
    // POST/PATCH /api/admin/event
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <div style={styles.header}>
        <div>
          <p style={styles.breadcrumb}>Admin / Events</p>

          <h1 style={styles.title}>Event Management</h1>

          <p style={styles.subtitle}>
            Create, view and manage ticket booking events.
          </p>
        </div>

        <div style={styles.headerActions}>
          {!isEditing && (
            <button
              style={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              Edit Event
            </button>
          )}
        </div>
      </div>

      {/* SAVE MESSAGE */}

      {saved && (
        <div style={styles.successMessage}>
          Event details updated successfully.
        </div>
      )}

      {/* EVENT STATUS */}

      <div style={styles.statusCard}>
        <div>
          <p style={styles.statusLabel}>EVENT STATUS</p>

          <div style={styles.statusRow}>
            <span style={styles.statusDot}></span>

            <strong>{event.status}</strong>
          </div>
        </div>

        <div style={styles.statusInfo}>
          <div>
            <span style={styles.smallLabel}>Total Capacity</span>

            <strong>
              {Number(event.totalCapacity).toLocaleString()}
            </strong>
          </div>

          <div>
            <span style={styles.smallLabel}>Available Tickets</span>

            <strong>
              {Number(event.availableTickets).toLocaleString()}
            </strong>
          </div>

          <div>
            <span style={styles.smallLabel}>Admission Rate</span>

            <strong>{event.admissionRate}/sec</strong>
          </div>
        </div>
      </div>

      {/* BASIC INFORMATION */}

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>Basic Information</h2>

            <p style={styles.cardSubtitle}>
              Basic information about the event.
            </p>
          </div>
        </div>

        <div style={styles.formGrid}>
          <FormField
            label="Event Name"
            value={event.name}
            editing={isEditing}
            onChange={(value) => handleChange("name", value)}
          />

          <FormField
            label="Venue"
            value={event.venue}
            editing={isEditing}
            onChange={(value) => handleChange("venue", value)}
          />

          <FormField
            label="City"
            value={event.city}
            editing={isEditing}
            onChange={(value) => handleChange("city", value)}
          />

          <div style={styles.field}>
            <label style={styles.label}>Status</label>

            {isEditing ? (
              <select
                value={event.status}
                onChange={(e) =>
                  handleChange("status", e.target.value)
                }
                style={styles.input}
              >
                <option>Upcoming</option>
                <option>Live</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            ) : (
              <div style={styles.viewValue}>
                {event.status}
              </div>
            )}
          </div>

          <div style={styles.fieldFull}>
            <label style={styles.label}>Description</label>

            {isEditing ? (
              <textarea
                value={event.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                rows={4}
                style={styles.textarea}
              />
            ) : (
              <div style={styles.viewValue}>
                {event.description}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DATE AND TIME */}

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>Date & Time</h2>

            <p style={styles.cardSubtitle}>
              Configure when the event will take place.
            </p>
          </div>
        </div>

        <div style={styles.formGrid}>
          <FormField
            label="Event Date"
            type="date"
            value={event.date}
            editing={isEditing}
            onChange={(value) => handleChange("date", value)}
          />

          <FormField
            label="Start Time"
            type="time"
            value={event.startTime}
            editing={isEditing}
            onChange={(value) => handleChange("startTime", value)}
          />

          <FormField
            label="End Time"
            type="time"
            value={event.endTime}
            editing={isEditing}
            onChange={(value) => handleChange("endTime", value)}
          />
        </div>
      </section>

      {/* INVENTORY */}

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>Ticket Inventory</h2>

            <p style={styles.cardSubtitle}>
              Configure ticket capacity and purchasing limits.
            </p>
          </div>
        </div>

        <div style={styles.formGrid}>
          <NumberField
            label="Total Capacity"
            value={event.totalCapacity}
            editing={isEditing}
            onChange={(value) =>
              handleChange("totalCapacity", value)
            }
          />

          <NumberField
            label="Available Tickets"
            value={event.availableTickets}
            editing={isEditing}
            onChange={(value) =>
              handleChange("availableTickets", value)
            }
          />

          <NumberField
            label="Ticket Price"
            value={event.ticketPrice}
            editing={isEditing}
            onChange={(value) =>
              handleChange("ticketPrice", value)
            }
          />

          <NumberField
            label="Max Tickets Per User"
            value={event.maxTicketsPerUser}
            editing={isEditing}
            onChange={(value) =>
              handleChange("maxTicketsPerUser", value)
            }
          />
        </div>
      </section>

      {/* CONCURRENCY */}

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>Concurrency & Admission</h2>

            <p style={styles.cardSubtitle}>
              Configure how users enter the booking system.
            </p>
          </div>
        </div>

        <div style={styles.formGrid}>
          <NumberField
            label="Maximum Concurrent Users"
            value={event.maxConcurrentUsers}
            editing={isEditing}
            onChange={(value) =>
              handleChange("maxConcurrentUsers", value)
            }
          />

          <NumberField
            label="Admission Rate"
            value={event.admissionRate}
            editing={isEditing}
            onChange={(value) =>
              handleChange("admissionRate", value)
            }
          />
        </div>

        <div style={styles.settingsList}>
          <ToggleRow
            label="Virtual Queue"
            description="Place users in the waiting room before admission."
            enabled={event.queueEnabled}
            editing={isEditing}
            onChange={(value) =>
              handleChange("queueEnabled", value)
            }
          />

          <ToggleRow
            label="Automatic Admission"
            description="Automatically admit users according to the admission rate."
            enabled={event.autoAdmission}
            editing={isEditing}
            onChange={(value) =>
              handleChange("autoAdmission", value)
            }
          />

          <ToggleRow
            label="Inventory Protection"
            description="Prevent ticket overselling during concurrent bookings."
            enabled={event.inventoryProtection}
            editing={isEditing}
            onChange={(value) =>
              handleChange("inventoryProtection", value)
            }
          />
        </div>
      </section>

      {/* FAIRQUEUE FLOW */}

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>FairQueue Event Flow</h2>

            <p style={styles.cardSubtitle}>
              Users are controlled before entering the booking stage.
            </p>
          </div>
        </div>

        <div style={styles.flow}>
          <FlowBox
            number="01"
            title="Users"
            description="Traffic"
          />

          <FlowArrow />

          <FlowBox
            number="02"
            title="Rate Check"
            description="Bot Protection"
          />

          <FlowArrow />

          <FlowBox
            number="03"
            title="Waiting Room"
            description="Redis Queue"
          />

          <FlowArrow />

          <FlowBox
            number="04"
            title="Admission"
            description="Controlled Entry"
          />

          <FlowArrow />

          <FlowBox
            number="05"
            title="Inventory"
            description="Atomic Reserve"
          />

          <FlowArrow />

          <FlowBox
            number="06"
            title="Checkout"
            description="Order"
          />
        </div>
      </section>

      {/* ACTIONS */}

      {isEditing && (
        <div style={styles.bottomActions}>
          <button
            style={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            style={styles.saveButton}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function FormField({
  label,
  value,
  editing,
  onChange,
  type = "text",
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>

      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={styles.input}
        />
      ) : (
        <div style={styles.viewValue}>{value}</div>
      )}
    </div>
  );
}

function NumberField({
  label,
  value,
  editing,
  onChange,
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>

      {editing ? (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={styles.input}
        />
      ) : (
        <div style={styles.viewValue}>
          {Number(value).toLocaleString()}
        </div>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  enabled,
  editing,
  onChange,
}) {
  return (
    <div style={styles.toggleRow}>
      <div>
        <strong style={styles.toggleTitle}>{label}</strong>

        <p style={styles.toggleDescription}>
          {description}
        </p>
      </div>

      {editing ? (
        <button
          onClick={() => onChange(!enabled)}
          style={{
            ...styles.toggle,
            background: enabled ? "#0f172a" : "#cbd5e1",
          }}
        >
          <span
            style={{
              ...styles.toggleCircle,
              transform: enabled
                ? "translateX(20px)"
                : "translateX(0)",
            }}
          />
        </button>
      ) : (
        <span
          style={{
            ...styles.enabledBadge,
            background: enabled ? "#dcfce7" : "#f1f5f9",
            color: enabled ? "#15803d" : "#64748b",
          }}
        >
          {enabled ? "Enabled" : "Disabled"}
        </span>
      )}
    </div>
  );
}

function FlowBox({
  number,
  title,
  description,
}) {
  return (
    <div style={styles.flowBox}>
      <div style={styles.flowNumber}>{number}</div>

      <strong style={styles.flowTitle}>{title}</strong>

      <span style={styles.flowDescription}>
        {description}
      </span>
    </div>
  );
}

function FlowArrow() {
  return (
    <div style={styles.flowArrow}>
      →
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "32px",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#0f172a",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  breadcrumb: {
    margin: "0 0 7px",
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "600",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    margin: "7px 0 0",
    color: "#64748b",
    fontSize: "14px",
  },

  headerActions: {
    display: "flex",
    gap: "10px",
  },

  editButton: {
    border: "none",
    background: "#0f172a",
    color: "#ffffff",
    padding: "11px 18px",
    borderRadius: "9px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },

  successMessage: {
    marginBottom: "20px",
    padding: "13px 16px",
    background: "#dcfce7",
    border: "1px solid #bbf7d0",
    color: "#166534",
    borderRadius: "9px",
    fontSize: "13px",
    fontWeight: "700",
  },

  statusCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
    padding: "20px",
    marginBottom: "24px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
  },

  statusLabel: {
    margin: "0 0 7px",
    color: "#94a3b8",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    fontSize: "14px",
  },

  statusDot: {
    width: "9px",
    height: "9px",
    background: "#22c55e",
    borderRadius: "50%",
  },

  statusInfo: {
    display: "flex",
    gap: "35px",
  },

  smallLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: "10px",
    marginBottom: "5px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "24px",
    marginBottom: "24px",
  },

  cardHeader: {
    marginBottom: "20px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "800",
  },

  cardSubtitle: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: "13px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "20px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
  },

  fieldFull: {
    gridColumn: "1 / -1",
  },

  label: {
    marginBottom: "8px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#334155",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "13px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    resize: "vertical",
    fontFamily: "inherit",
    fontSize: "13px",
    outline: "none",
  },

  viewValue: {
    minHeight: "18px",
    padding: "11px 12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    color: "#334155",
    fontSize: "13px",
  },

  settingsList: {
    marginTop: "24px",
    borderTop: "1px solid #e2e8f0",
  },

  toggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "16px 0",
    borderBottom: "1px solid #e2e8f0",
  },

  toggleTitle: {
    fontSize: "13px",
  },

  toggleDescription: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: "11px",
  },

  toggle: {
    width: "44px",
    height: "24px",
    border: "none",
    borderRadius: "20px",
    padding: "2px",
    cursor: "pointer",
    transition: "background 0.2s",
  },

  toggleCircle: {
    display: "block",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#ffffff",
    transition: "transform 0.2s",
  },

  enabledBadge: {
    padding: "6px 9px",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: "800",
  },

  flow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    overflowX: "auto",
    padding: "8px 0",
  },

  flowBox: {
    minWidth: "120px",
    padding: "14px 10px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    background: "#f8fafc",
    textAlign: "center",
  },

  flowNumber: {
    width: "27px",
    height: "27px",
    margin: "0 auto 8px",
    borderRadius: "50%",
    background: "#0f172a",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "9px",
    fontWeight: "800",
  },

  flowTitle: {
    display: "block",
    fontSize: "11px",
  },

  flowDescription: {
    display: "block",
    marginTop: "4px",
    color: "#64748b",
    fontSize: "9px",
  },

  flowArrow: {
    color: "#94a3b8",
    fontSize: "20px",
    flexShrink: 0,
  },

  bottomActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    paddingBottom: "30px",
  },

  cancelButton: {
    padding: "11px 18px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    background: "#ffffff",
    color: "#334155",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },

  saveButton: {
    padding: "11px 20px",
    border: "none",
    borderRadius: "9px",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },
};