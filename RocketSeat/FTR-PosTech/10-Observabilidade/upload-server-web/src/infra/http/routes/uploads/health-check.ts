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
      log.info("Health check successfully completed. Application is running properly.")
      return reply.status(200).send({ message: "OK no ECS" });
    }
  );
};
