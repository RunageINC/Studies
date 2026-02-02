package com.ftr.ai_tools_for_devs

import io.sentry.Sentry
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AiToolsForDevsApplication

fun main(args: Array<String>) {
	Sentry.init { options ->
		options.dsn = "https://0129edf56e375d66eef31874c99b9646@o4510812372074496.ingest.us.sentry.io/4510812379676672"
		// When first trying Sentry it's good to see what the SDK is doing:
		options.isDebug = true
	}

	runApplication<AiToolsForDevsApplication>(*args)
}
