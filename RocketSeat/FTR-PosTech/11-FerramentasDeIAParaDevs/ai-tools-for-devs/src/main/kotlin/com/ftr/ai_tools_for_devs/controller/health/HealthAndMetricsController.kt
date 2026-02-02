package com.ftr.ai_tools_for_devs.controller.health

import io.sentry.Sentry
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * REST controller for health checks and monitoring.
 *
 * Base path: `/health`
 *
 * Provides endpoints for liveness probes and Sentry integration testing.
 */
@RestController
@RequestMapping("/health")
class HealthAndMetricsController {

    /**
     * Simple liveness probe.
     *
     * **HTTP:** `GET /health/ping`
     *
     * @return [ResponseEntity] wrapping [String] with body `"pong"` and status 200 OK
     */
    @GetMapping("/ping")
    fun ping(): ResponseEntity<String> {
        return ResponseEntity.ok("pong")
    }

    /**
     * Triggers a test exception and reports it to Sentry.
     *
     * **HTTP:** `POST /health/sentry/exception-test`
     *
     * Used to verify Sentry error tracking integration. The exception is caught and reported;
     * the endpoint still returns success.
     *
     * @return [ResponseEntity] with no body and status 204 No Content
     */
    @PostMapping("/sentry/exception-test")
    fun sentryExceptionTest(): ResponseEntity<Void> {
        try {
            throw Exception("Test exception")
        } catch (e: Exception) {
            Sentry.captureException(e)
        }

        return ResponseEntity.noContent().build()
    }
}