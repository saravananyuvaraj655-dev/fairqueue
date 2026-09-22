import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

http.setResponseCallback(
  http.expectedStatuses(200, 409)
);

const successfulHolds = new Counter("successful_holds");
const rejectedHolds = new Counter("rejected_holds");

export const options = {
  scenarios: {
    concurrency_test: {
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
  const userId = `LOADTEST_${__VU}`;

  // --------------------------------
  // 1. Join FairQueue
  // --------------------------------

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
    "queue join request returned 200": (r) => r.status === 200,
  });

  // Give the queue processor time to activate the user.
  sleep(2);

  // --------------------------------
  // 2. Try to hold 1 ticket
  // --------------------------------

  const holdResponse = http.post(
    `${BASE_URL}/api/booking/hold`,
    JSON.stringify({
      userId,
      eventId: EVENT_ID,
      quantity: 1,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (holdResponse.status === 200) {
    successfulHolds.add(1);
  }

  if (holdResponse.status === 409) {
    rejectedHolds.add(1);
  }

  check(holdResponse, {
    "hold succeeded or inventory rejected": (r) =>
      r.status === 200 || r.status === 409,
  });
}