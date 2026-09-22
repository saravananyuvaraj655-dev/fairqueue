import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

const activeUsers = new Counter("active_users");
const waitingUsers = new Counter("waiting_users");

export const options = {
  scenarios: {
    backpressure_test: {
      executor: "per-vu-iterations",
      vus: 30,
      iterations: 1,
      maxDuration: "30s",
    },
  },
};

const BASE_URL = "http://localhost:5000";
const EVENT_ID = "LOADTEST002";

export default function () {
  const userId = `BPTEST_${__VU}`;

  const joinResponse = http.post(
    `${BASE_URL}/api/queue/join`,
    JSON.stringify({
      userId,
      eventId: EVENT_ID,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(joinResponse, {
    "queue join successful": (r) => r.status === 200,
  });

  // Wait for queue processor
  sleep(2);

  const statusResponse = http.get(
    `${BASE_URL}/api/queue/status/${userId}`
  );

  check(statusResponse, {
    "queue status received": (r) => r.status === 200,
  });

  const data = statusResponse.json();

  if (data.status === "ACTIVE") {
    activeUsers.add(1);
  }

  if (data.status === "WAITING") {
    waitingUsers.add(1);
  }
}