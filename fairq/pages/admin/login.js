import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    // Frontend demo authentication
    setTimeout(() => {
      setLoading(false);

      if (
        email === "admin@fairqueue.com" &&
        password === "admin123"
      ) {
        window.location.href = "/admin/dashboard";
      } else {
        setError(
          "Invalid admin credentials. Please try again."
        );
      }
    }, 900);
  }

  return (
    <div style={styles.page}>
      {/* LEFT PANEL */}
      <div style={styles.leftPanel}>
        <div style={styles.brand}>
          <div style={styles.logo}>FQ</div>

          <div>
            <strong style={styles.brandName}>
              FairQueue
            </strong>

            <span style={styles.brandSub}>
              Admin Control Center
            </span>
          </div>
        </div>

        <div style={styles.hero}>
          <span style={styles.eyebrow}>
            VIRTUAL QUEUE INFRASTRUCTURE
          </span>

          <h1 style={styles.heroTitle}>
            Control traffic.
            <br />
            Protect capacity.
            <br />
            Keep bookings fair.
          </h1>

          <p style={styles.heroText}>
            Manage events, admission control, inventory,
            concurrency and real-time queue operations from
            one centralized dashboard.
          </p>
        </div>

        <div style={styles.featureList}>
          <Feature
            title="Controlled Admission"
            description="Regulate how many users enter the booking system."
          />

          <Feature
            title="Inventory Protection"
            description="Prevent overselling during extreme traffic."
          />

          <Feature
            title="Real-Time Monitoring"
            description="Observe queues, sessions and system health."
          />
        </div>

        <div style={styles.footerText}>
          FairQueue Administration System
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.rightPanel}>
        <div style={styles.loginContainer}>
          <div style={styles.mobileLogo}>
            <div style={styles.logo}>FQ</div>

            <strong>FairQueue</strong>
          </div>

          <div style={styles.loginHeader}>
            <span style={styles.smallLabel}>
              ADMINISTRATOR
            </span>

            <h2 style={styles.loginTitle}>
              Welcome back
            </h2>

            <p style={styles.loginSubtitle}>
              Sign in to access the FairQueue control center.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {/* EMAIL */}
            <label style={styles.label}>
              ADMIN EMAIL
            </label>

            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>@</span>

              <input
                type="email"
                placeholder="admin@fairqueue.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                style={styles.input}
              />
            </div>

            {/* PASSWORD */}
            <label style={styles.label}>
              PASSWORD
            </label>

            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>*</span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={styles.input}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={styles.showButton}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* ERROR */}
            {error && (
              <div style={styles.errorBox}>
                <span style={styles.errorIcon}>!</span>

                <span>{error}</span>
              </div>
            )}

            {/* LOGIN */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.loginButton,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Authenticating..."
                : "Sign in to Dashboard"}

              {!loading && (
                <span style={styles.arrow}>
                  →
                </span>
              )}
            </button>
          </form>

          {/* SECURITY */}
          <div style={styles.security}>
            <div style={styles.lockIcon}>
              ✓
            </div>

            <div>
              <strong style={styles.securityTitle}>
                Secure administrator access
              </strong>

              <p style={styles.securityText}>
                Only authorized administrators should access
                this control center.
              </p>
            </div>
          </div>

          {/* DEMO */}
          <div style={styles.demoBox}>
            <span style={styles.demoLabel}>
              DEVELOPMENT DEMO
            </span>

            <div style={styles.demoCredentials}>
              <span>
                Email:
                <strong>
                  admin@fairqueue.com
                </strong>
              </span>

              <span>
                Password:
                <strong>admin123</strong>
              </span>
            </div>
          </div>

          <p style={styles.copyright}>
            © 2026 FairQueue. Administration Console.
          </p>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   FEATURE
========================================================= */

function Feature({
  title,
  description,
}) {
  return (
    <div style={styles.feature}>
      <div style={styles.featureIcon}>
        ✓
      </div>

      <div>
        <strong style={styles.featureTitle}>
          {title}
        </strong>

        <p style={styles.featureDescription}>
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
    display: "flex",
    background: "#f8fafc",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#172033",
  },

  /* LEFT */

  leftPanel: {
    width: "52%",
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "42px 60px",
    background: "#111827",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
  },

  logo: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "#4f46e5",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "900",
    letterSpacing: "-0.5px",
  },

  brandName: {
    display: "block",
    fontSize: "15px",
  },

  brandSub: {
    display: "block",
    marginTop: "2px",
    color: "#94a3b8",
    fontSize: "9px",
  },

  hero: {
    marginTop: "115px",
    maxWidth: "590px",
  },

  eyebrow: {
    display: "inline-block",
    color: "#a5b4fc",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    marginBottom: "15px",
  },

  heroTitle: {
    margin: 0,
    fontSize: "42px",
    lineHeight: "1.12",
    letterSpacing: "-1.5px",
    fontWeight: "750",
  },

  heroText: {
    maxWidth: "510px",
    marginTop: "20px",
    color: "#94a3b8",
    fontSize: "13px",
    lineHeight: "1.7",
  },

  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "17px",
    marginTop: "52px",
  },

  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },

  featureIcon: {
    width: "24px",
    height: "24px",
    flexShrink: 0,
    borderRadius: "7px",
    background: "#312e81",
    color: "#a5b4fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "800",
  },

  featureTitle: {
    display: "block",
    fontSize: "11px",
  },

  featureDescription: {
    margin: "3px 0 0",
    color: "#64748b",
    fontSize: "9px",
    lineHeight: "1.5",
  },

  footerText: {
    marginTop: "auto",
    color: "#475569",
    fontSize: "9px",
  },

  /* RIGHT */

  rightPanel: {
    flex: 1,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "35px",
    boxSizing: "border-box",
    background: "#ffffff",
  },

  loginContainer: {
    width: "100%",
    maxWidth: "410px",
  },

  mobileLogo: {
    display: "none",
  },

  loginHeader: {
    marginBottom: "27px",
  },

  smallLabel: {
    color: "#4f46e5",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  loginTitle: {
    margin: "7px 0 5px",
    fontSize: "29px",
    letterSpacing: "-0.7px",
  },

  loginSubtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "11px",
    lineHeight: "1.5",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "18px",
    color: "#475569",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    height: "43px",
    border: "1px solid #dbe1ea",
    borderRadius: "8px",
    background: "#ffffff",
    boxSizing: "border-box",
  },

  inputIcon: {
    width: "40px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "700",
  },

  input: {
    flex: 1,
    height: "100%",
    border: "none",
    outline: "none",
    fontSize: "11px",
    color: "#172033",
    background: "transparent",
  },

  showButton: {
    border: "none",
    background: "transparent",
    color: "#4f46e5",
    fontSize: "9px",
    fontWeight: "700",
    padding: "10px",
    cursor: "pointer",
  },

  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "13px",
    padding: "10px",
    borderRadius: "7px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    fontSize: "9px",
  },

  errorIcon: {
    width: "17px",
    height: "17px",
    borderRadius: "50%",
    background: "#ef4444",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "9px",
    fontWeight: "800",
  },

  loginButton: {
    width: "100%",
    height: "44px",
    marginTop: "20px",
    border: "none",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },

  arrow: {
    fontSize: "16px",
  },

  security: {
    display: "flex",
    gap: "10px",
    marginTop: "22px",
    padding: "13px",
    borderRadius: "8px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },

  lockIcon: {
    width: "25px",
    height: "25px",
    flexShrink: 0,
    borderRadius: "7px",
    background: "#ecfdf5",
    color: "#15803d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "800",
  },

  securityTitle: {
    display: "block",
    fontSize: "9px",
  },

  securityText: {
    margin: "3px 0 0",
    color: "#94a3b8",
    fontSize: "8px",
    lineHeight: "1.5",
  },

  demoBox: {
    marginTop: "15px",
    padding: "11px",
    borderRadius: "7px",
    background: "#eef2ff",
    border: "1px solid #c7d2fe",
  },

  demoLabel: {
    display: "block",
    color: "#4f46e5",
    fontSize: "8px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    marginBottom: "7px",
  },

  demoCredentials: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    color: "#64748b",
    fontSize: "8px",
  },

  copyright: {
    textAlign: "center",
    margin: "22px 0 0",
    color: "#cbd5e1",
    fontSize: "8px",
  },
};