import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

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
      return reply.status(200).send({ message: "OK" });
    }
  );
};
