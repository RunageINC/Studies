import { trace } from "@opentelemetry/api";
import pino from "pino";

// Add trace/span context to every log so they appear in Grafana Cloud and link to traces.
// Pino transport may run in a worker where context.active() has no span; injecting here
// (at log time in the request context) ensures trace_id and span_id are sent to OTLP.
const formatters = {
  log(logObject) {
    const span = trace.getActiveSpan();
    if (span) {
      const ctx = span.spanContext();
      return {
        ...logObject,
        trace_id: ctx.traceId,
        span_id: ctx.spanId,
        trace_flags: ctx.traceFlags,
      };
    }
    return logObject;
  },
};

// Create pino logger with OpenTelemetry transport
// This will automatically send logs to Grafana Loki via OpenTelemetry OTLP
const log = pino(
  {
    level: "debug",
    formatters,
  },
  pino.transport({
    targets: [
      // OpenTelemetry transport - sends logs to Grafana Loki
      {
        target: "pino-opentelemetry-transport",
        level: "debug",
        options: {
          loggerName: process.env.OTEL_SERVICE_NAME || "upload-server",
          serviceVersion: "1.0.0",
        },
      },
      // Development console output
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              target: "pino-pretty",
              level: "debug",
              options: {
                name: "dev-terminal",
                colorize: true,
                levelFirst: true,
                include: "level,time",
                translateTime: "yyyy-mm-dd HH:MM:ss Z",
              },
            },
          ]
        : []),
    ],
  })
);

export { log };
