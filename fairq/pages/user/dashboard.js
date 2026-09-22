import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="dashboard">

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">
          🎟️ FairQueue
        </div>

        <div className="nav-links">
          <Link href="/user/dashboard">
            Dashboard
          </Link>

          <Link href="/user/events">
            Events
          </Link>

          <Link href="/user/my-tickets">
            My Tickets
          </Link>

          <Link href="/user/profile">
            Profile
          </Link>
        </div>

        <div className="user-info">
          <div className="avatar">
            Y
          </div>

          <div>
            <div className="username">
              User
            </div>

            <div className="role">
              Customer
            </div>
          </div>
        </div>

      </nav>


      {/* Main Content */}
      <main className="main-content">

        <div className="welcome-section">

          <p className="welcome-small">
            Welcome back 👋
          </p>

          <h1>
            Your Dashboard
          </h1>

          <p>
            Manage your tickets, bookings and queue status.
          </p>

        </div>


        {/* Statistics */}
        <div className="stats-grid">

          <div className="stat-card">
            <span>🎟️</span>

            <h3>My Tickets</h3>

            <strong>2</strong>

            <p>Confirmed bookings</p>
          </div>


          <div className="stat-card">
            <span>🔒</span>

            <h3>Active Hold</h3>

            <strong>0</strong>

            <p>No active reservation</p>
          </div>


          <div className="stat-card">
            <span>🚪</span>

            <h3>Queue Status</h3>

            <strong>Ready</strong>

            <p>No active queue</p>
          </div>

        </div>


        {/* Queue */}
        <div className="queue-card">

          <div>

            <h2>
              🚪 Booking Queue
            </h2>

            <p>
              Your current booking session
            </p>

          </div>

          <div className="queue-status">
            ● READY
          </div>

          <div className="queue-empty">

            <h3>
              You are not currently in a booking queue.
            </h3>

            <p>
              Select an event to start booking.
            </p>

            <Link
              href="/user/events"
              className="primary-button"
            >
              Browse Events
            </Link>

          </div>

        </div>


        {/* Events */}
        <section className="events-section">

          <div className="section-heading">

            <div>
              <h2>
                Upcoming Events
              </h2>

              <p>
                Browse events and book your tickets.
              </p>
            </div>

            <Link href="/user/events">
              View All →
            </Link>

          </div>


          <div className="event-grid">

            <div className="event-card">

              <div className="event-image">
                🎟️
              </div>

              <div className="event-content">

                <h3>
                  College Fest 2026
                </h3>

                <p>
                  📅 October 10, 2026
                </p>

                <p>
                  📍 College Auditorium
                </p>

                <div className="event-bottom">

                  <strong>
                    ₹500
                  </strong>

                  <Link
                    href="/user/events"
                    className="book-button"
                  >
                    Book Ticket
                  </Link>

                </div>

              </div>

            </div>


            <div className="event-card">

              <div className="event-image">
                🤖
              </div>

              <div className="event-content">

                <h3>
                  AI & Tech Summit
                </h3>

                <p>
                  📅 October 20, 2026
                </p>

                <p>
                  📍 Technology Hall
                </p>

                <div className="event-bottom">

                  <strong>
                    ₹300
                  </strong>

                  <Link
                    href="/user/events"
                    className="book-button"
                  >
                    Book Ticket
                  </Link>

                </div>

              </div>

            </div>


            <div className="event-card">

              <div className="event-image">
                💻
              </div>

              <div className="event-content">

                <h3>
                  Hackathon 2026
                </h3>

                <p>
                  📅 November 05, 2026
                </p>

                <p>
                  📍 Innovation Center
                </p>

                <div className="event-bottom">

                  <strong>
                    ₹200
                  </strong>

                  <Link
                    href="/user/events"
                    className="book-button"
                  >
                    Book Ticket
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}