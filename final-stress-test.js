import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

const successfulHolds = new Counter("successful_holds");
const rejectedHolds = new Counter("rejected_holds");
const successfulCheckouts = new Counter("successful_checkouts");
const idempotentReplays = new Counter("idempotent_replays");
const usersWhoWaited = new Counter("users_who_waited");
const queueTimeouts = new Counter("queue_timeouts");

export const options = {
  scenarios: {
    final_stress_test: {
      executor: "per-vu-iterations",
      vus: 50,
      iterations: 1,
      maxDuration: "2m",
    },
  },
};

const BASE_URL = "http://localhost:5000";
const EVENT_ID = "LOADTEST003";

export default function () {
  const userId = `FINAL_${__VU}_${__ITER}`;

  // Different simulated IP for each user.
  const headers = {
    "Content-Type": "application/json",
    "X-Forwarded-For": `10.0.0.${__VU}`,
  };

  // --------------------------------
  // 1. JOIN QUEUE
  // --------------------------------

  const joinResponse = http.post(
    `${BASE_URL}/api/queue/join`,
    JSON.stringify({
      userId,
      eventId: EVENT_ID,
    }),
    { headers }
  );

  check(joinResponse, {
    "queue join = 200": (r) => r.status === 200,
  });

  // --------------------------------
  // 2. WAIT FOR ACTIVE ACCESS
  // --------------------------------

  let active = false;
  let waited = false;

  for (let i = 0; i < 20; i++) {
    const statusResponse = http.get(
      `${BASE_URL}/api/queue/status/${userId}`,
      { headers }
    );

    const data = statusResponse.json();

    if (data.status === "ACTIVE") {
      active = true;
      break;
    }

    if (data.status === "WAITING") {
      waited = true;
    }

    sleep(0.5);
  }

  if (waited) {
    usersWhoWaited.add(1);
  }

  if (!active) {
    queueTimeouts.add(1);
    return;
  }

  // --------------------------------
  // 3. HOLD ONE TICKET
  // --------------------------------

  const holdResponse = http.post(
    `${BASE_URL}/api/booking/hold`,
    JSON.stringify({
      userId,
      eventId: EVENT_ID,
      quantity: 1,
    }),
    { headers }
  );

  if (holdResponse.status === 409) {
    rejectedHolds.add(1);

    http.post(
      `${BASE_URL}/api/queue/leave`,
      JSON.stringify({ userId }),
      { headers }
    );

    return;
  }

  const holdPassed = check(holdResponse, {
    "ticket hold = 200": (r) => r.status === 200,
  });

  if (!holdPassed) {
    return;
  }

  successfulHolds.add(1);

  const holdData = holdResponse.json();
  const bookingId = holdData.bookingId;

  // --------------------------------
  // 4. CHECKOUT
  // --------------------------------

  const idempotencyKey = `FINAL_PAY_${userId}`;

  const checkoutBody = JSON.stringify({
    bookingId,
    userId,
    idempotencyKey,
  });

  const checkoutResponse = http.post(
    `${BASE_URL}/api/booking/checkout`,
    checkoutBody,
    { headers }
  );

  const checkoutPassed = check(checkoutResponse, {
    "checkout = 200": (r) => r.status === 200,
  });

  if (checkoutPassed) {
    successfulCheckouts.add(1);
  }

  // --------------------------------
  // 5. REPEAT SAME CHECKOUT
  // --------------------------------

  const replayResponse = http.post(
    `${BASE_URL}/api/booking/checkout`,
    checkoutBody,
    { headers }
  );

  check(replayResponse, {
    "idempotent replay = 200": (r) => r.status === 200,
  });

  if (
    replayResponse.status === 200 &&
    replayResponse.json().idempotent === true
  ) {
    idempotentReplays.add(1);
  }

  // --------------------------------
  // 6. RELEASE ACTIVE USER
  // --------------------------------

  http.post(
    `${BASE_URL}/api/queue/leave`,
    JSON.stringify({ userId }),
    { headers }
  );
}