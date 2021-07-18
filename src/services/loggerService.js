// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
  console.log("Initialized Logging");
  // Sentry.init({
  //   dsn: "https://5e6ec62cad924788b6d56fe731e29a26@o920490.ingest.sentry.io/5866117",
  //   integrations: [new Integrations.BrowserTracing()],

  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0,
  // });
}
export default { init };
