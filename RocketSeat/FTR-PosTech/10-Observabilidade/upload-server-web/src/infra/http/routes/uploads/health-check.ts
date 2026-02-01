import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { log } from "@/infra/utils/logger";

const healthCheckRouteDocSchema = {
  summary: "Health Check",
  description: "Health Check for the application",
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
};

export const healthCheckRouter: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/health",
    { schema: healthCheckRouteDocSchema },
    async (_request, reply) => {
      log.info("Health check successfully completed. Application is running properly.");

      log.info(`this is a pretty long log message to test the log grouping in the new relic apm. Let's see if it works. This is a second log message to test the log grouping in the new relic apm. \nrouting this object to test a pretty long message in the new relic apm.\n ${JSON.stringify({ message: "this is a test message to test the log grouping in the new relic apm", prettyLongMessage: "this is a pretty long message to test the log grouping in the new relic apm. Let's see if it works. This is a second log message to test the log grouping in the new relic apm." }, null, 2)}`);
      return reply.status(200).send({ message: "OK no ECS" });
    }
  );
};
