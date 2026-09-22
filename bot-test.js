import http from "k6/http";
import { check } from "k6";
import { Counter } from "k6/metrics";

const allowedRequests = new Counter("allowed_requests");
const blockedRequests = new Counter("blocked_requests");

export const options = {
  vus: 1,
  iterations: 100,
};

const BASE_URL = "http://localhost:5000";

export default function () {
  const response = http.post(
    `${BASE_URL}/api/booking/hold`,
    JSON.stringify({
      userId: "BOT_TEST_USER",
      eventId: "LOADTEST002",
      quantity: 1,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 429) {
    blockedRequests.add(1);
  } else {
    allowedRequests.add(1);
  }

  check(response, {
    "server responded": (r) =>
      r.status === 200 ||
      r.status === 403 ||
      r.status === 409 ||
      r.status === 429,
  });
}